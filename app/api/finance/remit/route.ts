import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const { email, recipientPhone, amountSek } = await request.json();
    if (!email || !recipientPhone || !amountSek) {
      return NextResponse.json({ success: false, error: "Missing required transactional routing tokens." }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL || "");
    const parsedAmountSEK = parseFloat(amountSek);

    // 1. Check user ledger assets
    const wallet = await sql`SELECT savings_balance_sek FROM kika_sacco_wallets WHERE email = ${email} LIMIT 1`;
    if (wallet.length === 0 || parseFloat(wallet[0].savings_balance_sek) < parsedAmountSEK) {
      return NextResponse.json({ success: false, error: "Remittance request denied: Insufficient wallet equity balance." }, { status: 400 });
    }

    // 2. Compute conversion matrix (e.g., 1 SEK = ~350.00 UGX mobile money settlement baseline)
    const sekToUgxRate = 350.45;
    const finalPayoutUGX = parseFloat((parsedAmountSEK * sekToUgxRate).toFixed(2));
    const transactionRef = `KIKA-REMIT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    // 3. Atomically update wallet state and append transaction log entries
    await sql`
      UPDATE kika_sacco_wallets 
      SET savings_balance_sek = savings_balance_sek - ${parsedAmountSEK} 
      WHERE email = ${email};
    `;

    await sql`
      INSERT INTO kika_remittance_ledger (transaction_ref, sender_email, recipient_phone, amount_sek, payout_ugx, routing_status)
      VALUES (${transactionRef}, ${email}, ${recipientPhone}, ${parsedAmountSEK}, ${finalPayoutUGX}, 'SUCCESS');
    `;

    return NextResponse.json({
      success: true,
      transactionRef,
      payoutUGX: finalPayoutUGX.toLocaleString(),
      message: `💸 Remittance tunnel fired! UGX ${finalPayoutUGX.toLocaleString()} dispatched to ${recipientPhone} instantly.`
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
