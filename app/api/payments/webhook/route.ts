import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json(
        { error: "STRIPE_SECRET_KEY is not configured." },
        { status: 500 }
      );
    }

    const rawBody = await request.text();
    const signature = request.headers.get("stripe-signature") || "";
    const stripe = new Stripe(stripeKey);
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

    let event: Stripe.Event;
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } else {
      event = JSON.parse(rawBody) as Stripe.Event;
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const memberEmail = session.metadata?.member_email?.toLowerCase().trim();
      const amountSEK = parseFloat(session.metadata?.topup_sek || "0");
      const providerLabel = session.metadata?.provider_label || "CARD_SWISH";
      const txRef = `STRIPE-${session.id.slice(-12).toUpperCase()}`;

      if (memberEmail && amountSEK > 0 && session.payment_status === "paid") {
        const sql = neon(process.env.DATABASE_URL || "");

        const updated = await sql`
          UPDATE sacco_members
          SET savings_balance_sek = COALESCE(savings_balance_sek, 0) + ${amountSEK}
          WHERE LOWER(TRIM(email)) = ${memberEmail}
          RETURNING savings_balance_sek;
        `;

        const newBalance = parseFloat(
          updated[0]?.savings_balance_sek || String(amountSEK)
        );

        await sql`
          INSERT INTO sacco_ledger (member_email, tx_type, amount_sek, balance_snapshot_sek, tx_reference)
          VALUES (${memberEmail}, ${`LIVE_TOPUP_${providerLabel.toUpperCase().replace(/[^A-Z0-9]/g, "_")}`}, ${amountSEK}, ${newBalance}, ${txRef})
          ON CONFLICT DO NOTHING;
        `;
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
