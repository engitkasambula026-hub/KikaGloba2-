import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import twilio from "twilio";

const AccessToken = twilio.jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

// GET: Generate Twilio WebRTC Token & Calculate Max Prepaid Call Duration
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email")?.toLowerCase().trim();
    const dialNumber = searchParams.get("to")?.trim() || "+256";

    if (!email) {
      return NextResponse.json({ success: false, error: "Caller email required." }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL || "");
    const members = await sql`
      SELECT voip_balance_sek, account_status FROM sacco_members
      WHERE LOWER(TRIM(email)) = ${email} LIMIT 1;
    `;

     const member = members[0];
 if (!member || member.account_status !== "ACTIVE") {
   return NextResponse.json({ success: false, error: "Account must be ACTIVE to place VoIP calls." }, { status: 403 });
 }

 const walletSEK = parseFloat(member.voip_balance_sek || "0");

    if (walletSEK < 0.5) {
      return NextResponse.json({
        success: false,
        error: "Insufficient VoIP credit (minimum 0.50 SEK required). Purchase a calling voucher first."
      }, { status: 402 });
    }

    // Match destination prefix to per-second tariff
    const tariffs = await sql`SELECT * FROM kika_voip_tariffs ORDER BY LENGTH(country_prefix) DESC;`;
    const matchedTariff =
      tariffs.find((t: any) => dialNumber.startsWith(t.country_prefix)) || {
        destination_name: "Global Standard Corridor",
        retail_rate_sek_min: "2.5000",
        retail_rate_sek_sec: "0.041667"
      };

    const ratePerSec = parseFloat(matchedTariff.retail_rate_sek_sec);
    const maxSecondsAllowed = Math.floor(walletSEK / ratePerSec);

    // Generate Twilio WebRTC Token if Twilio API keys are present
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const apiKey = process.env.TWILIO_API_KEY;
    const apiSecret = process.env.TWILIO_API_SECRET;
    const twimlAppSid = process.env.TWILIO_TWIML_APP_SID;

    let token = "SANDBOX_SIMULATION_TOKEN";
    if (accountSid && apiKey && apiSecret && twimlAppSid) {
      const voiceGrant = new VoiceGrant({
        outgoingApplicationSid: twimlAppSid,
        incomingAllow: true,
      });

      const accessToken = new AccessToken(accountSid, apiKey, apiSecret, {
        identity: email.replace(/[^a-zA-Z0-9_]/g, "_"),
        ttl: 3600,
      });
      accessToken.addGrant(voiceGrant);
      token = accessToken.toJwt();
    }

    return NextResponse.json({
      success: true,
      token,
      walletSEK,
      tariff: {
        destination: matchedTariff.destination_name,
        ratePerMinSEK: parseFloat(matchedTariff.retail_rate_sek_min),
        ratePerSecSEK: ratePerSec,
        maxSecondsAllowed
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// POST: Settle Exact Per-Second Call Charge & Log CDR
export async function POST(request: Request) {
  try {
    const { email, dialedNumber, durationSeconds, callSid } = await request.json();
    const cleanEmail = email?.toLowerCase().trim();
    const billableSeconds = Math.max(1, Math.ceil(Number(durationSeconds || 0)));

    if (!cleanEmail || !dialedNumber) {
      return NextResponse.json({ success: false, error: "Missing call settlement fields." }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL || "");
    const tariffs = await sql`SELECT * FROM kika_voip_tariffs ORDER BY LENGTH(country_prefix) DESC;`;
    const matchedTariff =
      tariffs.find((t: any) => dialedNumber.startsWith(t.country_prefix)) || {
        retail_rate_sek_sec: "0.041667"
      };

    const ratePerSec = parseFloat(matchedTariff.retail_rate_sek_sec);
    const totalChargeSEK = parseFloat((billableSeconds * ratePerSec).toFixed(4));

    // Deduct exact per-second charge from user's VoIP wallet (never below 0)
    const updated = await sql`
      UPDATE sacco_members
      SET voip_balance_sek = GREATEST(0, voip_balance_sek - ${totalChargeSEK})
      WHERE LOWER(TRIM(email)) = ${cleanEmail}
      RETURNING voip_balance_sek;
    `;

    const settledSid = callSid || `KIKA-CALL-${Date.now()}`;

    await sql`
      INSERT INTO kika_voip_cdr (caller_email, dialed_number, twilio_call_sid, duration_seconds, rate_per_sec_sek, total_billed_sek, call_status)
      VALUES (${cleanEmail}, ${dialedNumber}, ${settledSid}, ${billableSeconds}, ${ratePerSec}, ${totalChargeSEK}, 'COMPLETED');
    `;

     return NextResponse.json({
   success: true,
   billedSeconds: billableSeconds,
   totalChargeSEK,
   remainingVoipSEK: parseFloat(updated[0]?.voip_balance_sek || "0")
 });

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
