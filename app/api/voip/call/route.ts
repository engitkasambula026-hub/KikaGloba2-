import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Capture data rows straight from Twilio's live status callback headers
    const callSid = formData.get("CallSid") as string;
    const durationSecondsStr = formData.get("CallDuration") as string;
    const destinationNumber = formData.get("To") as string; 
    const subscriberEmail = formData.get("CustomEmailHeader") as string || "engitkasambula026@gmail.com";

    if (!callSid || !durationSecondsStr || !destinationNumber) {
      return NextResponse.json({ success: true, message: "Standby Core Operational: Awaiting transactional data string inputs." }, { status: 200 });
    }

    const durationSeconds = parseInt(durationSecondsStr, 10);
    const sql = neon(process.env.DATABASE_URL || "");

    // 1. Identify destination country prefix from raw dialed string digits
    const cleanedDigits = destinationNumber.replace(/[^0-9]/g, "");
    let matchedTariff = await sql`
      SELECT wholesale_rate_usd_min FROM kika_telecom_tariffs 
      WHERE ${cleanedDigits} LIKE country_prefix || '%' 
      LIMIT 1
    `;

    // Baseline fallback rate ($0.1110 USD/min) if custom rows do not populate
    const wholesaleUSDPerMinute = matchedTariff.length > 0 ? parseFloat(matchedTariff.wholesale_rate_usd_min) : 0.1110;
    const wholesaleUSDPerSecond = wholesaleUSDPerMinute / 60;

    // 2. Apply current global exchange market multiplier (USD to SEK)
    const usdToSekExchangeRate = 10.6540; 

    // 3. APPLY EXPLICIT 35% MARGIN RETAIL MATHEMATICAL FORMULA
    // Wholesale Cost per second in USD
    const totalWholesaleUSD = durationSeconds * wholesaleUSDPerSecond;
    // Base Wholesale Cost translated directly to Swedish Krona (SEK)
    const wholesaleSEKCost = totalWholesaleUSD * usdToSekExchangeRate;
    // Add exactly your 35% markup to determine retail value
    const grossRetailChargeSEK = parseFloat((wholesaleSEKCost * 1.35).toFixed(4));

    // 4. ATOMIC LEDGER BALANCING MUTATION SINK
    // Deduct the exact per-second SEK charge from the subscriber's voucher wallet row
    await sql`
      UPDATE kika_user_wallets 
      SET balance_sek = GREATEST(0.0000, balance_sek - ${grossRetailChargeSEK}), updated_at = NOW() 
      WHERE email = ${subscriberEmail};
    `;

    // Log the transaction securely into your permanent enterprise double-entry audit tables
    await sql`
      INSERT INTO kika_cdr_ledger (call_sid, subscriber_email, destination_number, duration_seconds, wholesale_cost_usd, retail_charge_sek, exchange_rate_usd_sek)
      VALUES (${callSid}, ${subscriberEmail}, ${destinationNumber}, ${durationSeconds}, ${totalWholesaleUSD}, ${grossRetailChargeSEK}, ${usdToSekExchangeRate})
      ON CONFLICT (call_sid) DO NOTHING;
    `;

    return NextResponse.json({
      success: true,
      callSid,
      durationSeconds,
      wholesaleUSD: totalWholesaleUSD.toFixed(4),
      retailDeductedSEK: grossRetailChargeSEK.toFixed(4),
      exchangeRateApplied: usdToSekExchangeRate
    });
  } catch (err: any) {
    console.error("Billing Engine Exception Error: ", err.message);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
