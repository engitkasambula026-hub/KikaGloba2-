import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// Global Continental Exchange Matrix anchored on Sweden (SEK)
const GLOBAL_CORRIDORS: Record<string, { region: string; currency: string; rateFromSEK: number }> = {
  "Uganda": { region: "Africa", currency: "UGX", rateFromSEK: 350.00 },
  "Kenya": { region: "Africa", currency: "KES", rateFromSEK: 12.20 },
  "Nigeria": { region: "Africa", currency: "NGN", rateFromSEK: 145.00 },
  "South Africa": { region: "Africa", currency: "ZAR", rateFromSEK: 1.72 },
  "Sweden (Local)": { region: "Europe", currency: "SEK", rateFromSEK: 1.00 },
  "United Kingdom": { region: "Europe", currency: "GBP", rateFromSEK: 0.074 },
  "Eurozone (DE/FR/NL)": { region: "Europe", currency: "EUR", rateFromSEK: 0.088 },
  "United States": { region: "North America", currency: "USD", rateFromSEK: 0.095 },
  "Canada": { region: "North America", currency: "CAD", rateFromSEK: 0.13 },
  "United Arab Emirates": { region: "Middle East", currency: "AED", rateFromSEK: 0.35 },
  "India": { region: "Asia", currency: "INR", rateFromSEK: 7.95 }
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email")?.toLowerCase().trim();

    if (!email) {
      return NextResponse.json({ success: false, error: "Member email required." }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL || "");
    const members = await sql`
      SELECT full_name, email, savings_balance_sek, voip_balance_sek, credit_underwriting_score, account_status
      FROM sacco_members WHERE email = ${email} LIMIT 1;
    `;

    if (members.length === 0) {
      return NextResponse.json({ success: false, error: "Member profile not found." }, { status: 404 });
    }

    const ledger = await sql`
      SELECT tx_type, amount_sek, balance_snapshot_sek, tx_reference, created_at
      FROM sacco_ledger WHERE member_email = ${email} ORDER BY created_at DESC LIMIT 10;
    `;

    const remittances = await sql`
      SELECT continental_region, destination_country, target_currency, recipient_name, amount_sek, converted_amount, tx_reference, created_at
      FROM kika_remittances WHERE sender_email = ${email} ORDER BY created_at DESC LIMIT 10;
    `;

    return NextResponse.json({
      success: true,
      profile: members,
      ledger,
      remittances,
      corridors: GLOBAL_CORRIDORS
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, action, amountSEK, destinationCountry, recipientName, recipientPhone } = body;
    const sql = neon(process.env.DATABASE_URL || "");
    const cleanEmail = email?.toLowerCase().trim();
    const parsedAmount = Math.abs(parseFloat(amountSEK));

    if (!cleanEmail || !parsedAmount || parsedAmount <= 0) {
      return NextResponse.json({ success: false, error: "Valid email and SEK amount required." }, { status: 400 });
    }

    const members = await sql`
      SELECT savings_balance_sek, voip_balance_sek, account_status
      FROM sacco_members WHERE email = ${cleanEmail} LIMIT 1;
    `;

       if (members.length === 0 || members[0].account_status !== "ACTIVE") {
      return NextResponse.json({ success: false, error: "Account must be ACTIVE to transact." }, { status: 403 });
    }

    const currentSavings = parseFloat(members[0].savings_balance_sek);
    const currentVoip = parseFloat(members[0].voip_balance_sek || "0");
    const txRef = `KIKA-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    // 1. PURCHASE VOIP LOW-TARIFF CALLING VOUCHER
    if (action === "BUY_VOIP_VOUCHER") {
      if (currentSavings < parsedAmount) {
        return NextResponse.json({ success: false, error: "Insufficient SEK savings balance." }, { status: 400 });
      }
      const newSavings = currentSavings - parsedAmount;
      const newVoip = currentVoip + parsedAmount;

      await sql`
        UPDATE sacco_members
        SET savings_balance_sek = ${newSavings}, voip_balance_sek = ${newVoip}
        WHERE email = ${cleanEmail};
      `;

      await sql`
        INSERT INTO sacco_ledger (member_email, tx_type, amount_sek, balance_snapshot_sek, tx_reference)
        VALUES (${cleanEmail}, 'VOIP_VOUCHER', ${parsedAmount}, ${newSavings}, ${txRef});
      `;

      return NextResponse.json({
        success: true,
        message: `VoIP Voucher (${parsedAmount.toFixed(2)} SEK) credited to calling wallet! Ref: ${txRef}`
      });
    }

    // 2. GLOBAL CONTINENTAL REMITTANCE (SEK SPRINGBOARD)
    if (action === "SEND_REMITTANCE") {
      const corridor = GLOBAL_CORRIDORS[destinationCountry];
      if (!corridor) {
        return NextResponse.json({ success: false, error: "Unsupported destination country." }, { status: 400 });
      }
      if (!recipientName || !recipientPhone) {
        return NextResponse.json({ success: false, error: "Recipient name and phone required." }, { status: 400 });
      }
      if (currentSavings < parsedAmount) {
        return NextResponse.json({ success: false, error: "Insufficient SEK balance for remittance." }, { status: 400 });
      }

      const newSavings = currentSavings - parsedAmount;
      const convertedAmount = parsedAmount * corridor.rateFromSEK;

      await sql`
        UPDATE sacco_members SET savings_balance_sek = ${newSavings} WHERE email = ${cleanEmail};
      `;

      await sql`
        INSERT INTO sacco_ledger (member_email, tx_type, amount_sek, balance_snapshot_sek, tx_reference)
        VALUES (${cleanEmail}, 'REMITTANCE', ${parsedAmount}, ${newSavings}, ${txRef});
      `;

      await sql`
        INSERT INTO kika_remittances (sender_email, continental_region, destination_country, target_currency, recipient_name, recipient_phone, amount_sek, converted_amount, tx_reference)
        VALUES (${cleanEmail}, ${corridor.region}, ${destinationCountry}, ${corridor.currency}, ${recipientName}, ${recipientPhone}, ${parsedAmount}, ${convertedAmount}, ${txRef});
      `;

      return NextResponse.json({
        success: true,
        message: `Dispatched ${parsedAmount.toFixed(2)} SEK (${convertedAmount.toLocaleString()} ${corridor.currency}) to ${recipientName} (${destinationCountry})! Ref: ${txRef}`
      });
    }

    return NextResponse.json({ success: false, error: "Unsupported action." }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
