import { NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json(
        { success: false, error: "STRIPE_SECRET_KEY is not configured." },
        { status: 500 }
      );
    }

    const { email, amountSEK, paymentProvider } = await request.json();
    const cleanEmail = email?.toLowerCase().trim();
    const numericSEK = parseFloat(amountSEK || "0");

    if (!cleanEmail || numericSEK < 10) {
      return NextResponse.json(
        { success: false, error: "Valid email and minimum 10.00 SEK deposit required." },
        { status: 400 }
      );
    }

    const stripe = new Stripe(stripeKey);
    const origin = request.headers.get("origin") || "https://kika-ecosystem.com";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: cleanEmail,
      line_items: [
        {
          price_data: {
            currency: "sek",
            product_data: {
              name: "KiKa Ecosystem Account Credit Top-Up",
              description: `Instant SEK wallet funding for ${cleanEmail}`
            },
            unit_amount: Math.round(numericSEK * 100)
          },
          quantity: 1
        }
      ],
      metadata: {
        member_email: cleanEmail,
        topup_sek: numericSEK.toFixed(2),
        provider_label: paymentProvider || "Visa / Mastercard / Swish"
      },
      success_url: `${origin}/dashboard?payment=success&amount=${numericSEK.toFixed(2)}`,
      cancel_url: `${origin}/dashboard?payment=cancelled`
    });

    return NextResponse.json({ success: true, checkoutUrl: session.url });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
