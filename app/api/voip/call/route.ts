import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, action, destinationNumber, CallSid, DialCallDuration, voucherPin } = body;

    // Connect securely down your serverless Neon PostgreSQL database trunk pool
    const sql = neon(process.env.DATABASE_URL || "");
    const callerId = process.env.TWILIO_NUMBER_CALLER_ID || "+15674065939";

    // 🔐 NODE 01: OUTBOUND CARRIER DIAL ROUTER GATES & DYNAMIC STRING NORMALIZATION
    if (action === "ROUTE_OUTBOUND_CALL" || action === "TWIML_GATEWAY") {
      
      // 🟢 STRIP ALL NON-NUMERIC CHARACTERS COMPLETELY (Removes +, -, spaces, and brackets automatically)
      const rawDialedInput = destinationNumber || body.To || "";
      const dialedDigits = rawDialedInput.replace(/\D/g, "").trim();
      
      if (!dialedDigits) {
        return NextResponse.json({ success: false, error: "Validation Error: Target dialing string cannot be empty." }, { status: 400 });
      }

      // 🦾 LONGEST PREFIX MATCHING ALGORITHM
      const prefixPermutations: string[] = [];
      for (let i = dialedDigits.length; i > 0; i--) {
        prefixPermutations.push(dialedDigits.substring(0, i));
      }

      // 🛑 FIXED: Multi-line query securely wrapped inside valid backticks (``)
      const rateMatches = await sql`
        SELECT prefix_code, country_name, network_operator, retail_rate_ugx_min 
        FROM kika_global_telecom_tariffs 
        WHERE prefix_code = ANY(${prefixPermutations})
        ORDER BY LENGTH(prefix_code) DESC 
        LIMIT 1
      `;

      let matchedRateMin = 450.00;
      let matchedCountry = "International Destination";

      if (rateMatches && rateMatches.length > 0) {
        matchedRateMin = parseFloat(rateMatches[0].retail_rate_ugx_min);
        matchedCountry = rateMatches[0].country_name;
      }

      // Serves clean TwiML commands prepended with an explicit plus symbol for public carriers
      const twimlInstructions = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial callerId="${callerId}" timeout="30">
        <Number>+${dialedDigits}</Number>
    </Dial>
</Response>`;

      return new NextResponse(twimlInstructions, {
        headers: { 
          "Content-Type": "application/xml",
          "X-Kika-Country": matchedCountry,
          "X-Kika-Rate-Min": matchedRateMin.toString()
        }
      });
    }

    // 📝 NODE 02: AUTOMATED PER-SECOND TARIFF WEBHOOK BILLING (Triggered upon call hang-up)
    if (action === "PROCESS_CALL_COMPLETION_BILLING" || action === "STATUS_CALLBACK") {
      const callDurationSeconds = parseInt(DialCallDuration || body.CallDuration || "0", 10);
      const targetPhone = (destinationNumber || body.To || "").replace(/\D/g, "").trim();

      if (!email || !targetPhone || callDurationSeconds <= 0) {
        return NextResponse.json({ success: true, message: "Call session empty. Calculation loops bypassed." });
      }

      const prefixPermutations: string[] = [];
      for (let i = targetPhone.length; i > 0; i--) {
        prefixPermutations.push(targetPhone.substring(0, i));
      }

      const rateMatches = await sql`
        SELECT retail_rate_ugx_sec, country_name FROM kika_global_telecom_tariffs 
        WHERE prefix_code = ANY(${prefixPermutations})
        ORDER BY LENGTH(prefix_code) DESC LIMIT 1
      `;

      const ratePerSecondUGX = rateMatches.length > 0 ? parseFloat(rateMatches[0].retail_rate_ugx_sec) : 7.500000;
      const totalDeductionUGX = parseFloat((callDurationSeconds * ratePerSecondUGX).toFixed(2));

      await sql`UPDATE kika_diaspora_ledger SET balance = balance - ${totalDeductionUGX} WHERE email = ${email}`;
      
      await sql`
        INSERT INTO kika_commercial_voip_cdr (user_email, destination_number, twilio_call_sid, duration_seconds, total_ugx_debited)
        VALUES (${email}, ${'+' + targetPhone}, ${CallSid || body.CallSid || "TRUNK-DIAL"}, ${callDurationSeconds}, ${totalDeductionUGX});
      `;
      
      return NextResponse.json({ success: true, durationSeconds: callDurationSeconds, debitedUGX: totalDeductionUGX });
    }

    // 🎫 NODE 03: VOUCHER REDEMPTION FRAUD-GATE CHECK
    if (action === "REDEEM_VOUCHER_TOKEN") {
      if (!email || !voucherPin) {
        return NextResponse.json({ success: false, error: "Missing identity or voucher PIN token." }, { status: 400 });
      }

      const voucherRows = await sql`SELECT * FROM kika_recharge_vouchers WHERE voucher_pin = ${voucherPin.trim().toUpperCase()}`;
      
      if (!voucherRows || voucherRows.length === 0) {
        return NextResponse.json({ success: false, error: "The input voucher code does not exist in the registry." }, { status: 404 });
      }

      const card = voucherRows[0];
      if (card.is_redeemed) {
        return NextResponse.json({ success: false, error: "This voucher token has already been consumed." }, { status: 400 });
      }

      const creditUGX = parseFloat(card.face_value_ugx);
      await sql`UPDATE kika_recharge_vouchers SET is_redeemed = TRUE, redeemed_by_user = ${email}, redeemed_at = NOW() WHERE voucher_pin = ${card.voucher_pin}`;
      await sql`UPDATE kika_diaspora_ledger SET balance = balance + ${creditUGX} WHERE email = ${email}`;

      return NextResponse.json({ success: true, message: `Loaded UGX ${creditUGX.toLocaleString()} Airtime Credits.` });
    }

    return NextResponse.json({ success: false, error: "Action switch corridor unmapped." }, { status: 404 });
  } catch (globalErr: any) {
    return NextResponse.json({ success: false, error: globalErr.message }, { status: 500 });
  }
}