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

    const { email, amountUSD, amountSEK, paymentProvider } = await request.json();
    const cleanEmail = email?.toLowerCase().trim();
    const isSwish = paymentProvider === "Swish Sweden";
    const usdAmount = parseFloat(amountUSD || amountSEK || "0");

    if (!cleanEmail || usdAmount < 1) {
      return NextResponse.json(
        { success: false, error: "Valid email and minimum $5.00 USD deposit required." },
        { status: 400 }
      );
    }

    // Swish requires SEK: automatically convert the USD base amount into SEK (1 USD = 10.50 SEK)
    const usdToSekRate = 10.5;
    const checkoutCurrency = isSwish ? "sek" : "usd";
    const chargedAmount = isSwish
      ? Number((usdAmount * usdToSekRate).toFixed(2))
      : Number(usdAmount.toFixed(2));

    const stripe = new Stripe(stripeKey);
    const origin = request.headers.get("origin") || "https://kika-ecosystem.com";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: cleanEmail,
      line_items: [
        {
          price_data: {
            currency: checkoutCurrency,
            product_data: {
              name: "KiKa Ecosystem USD Wallet Top-Up",
              description: isSwish
                ? `$${usdAmount.toFixed(2)} USD credit converted to ${chargedAmount.toFixed(2)} SEK for Swish (${cleanEmail})`
                : `$${usdAmount.toFixed(2)} USD account credit for ${cleanEmail}`
            },
            unit_amount: Math.round(chargedAmount * 100)
          },
          quantity: 1
        }
      ],
      metadata: {
        member_email: cleanEmail,
        paid_currency: checkoutCurrency.toUpperCase(),
        usd_value: usdAmount.toFixed(2),
        topup_sek: usdAmount.toFixed(2), // Stores 1:1 USD unit in ledger so all balances & vouchers stay in USD
        provider_label: paymentProvider || "Visa / Mastercard (USD)"
      },
      success_url: `${origin}/dashboard?payment=success&amount=${usdAmount.toFixed(2)}`,
      cancel_url: `${origin}/dashboard?payment=cancelled`
    });

    return NextResponse.json({ success: true, checkoutUrl: session.url });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
