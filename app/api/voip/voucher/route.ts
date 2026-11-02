import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const { email, voucherCode } = await request.json();
    if (!email || !voucherCode) {
      return NextResponse.json({ success: false, error: "Missing required voucher validation credentials." }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL || "");

    // 1. Verify if the voucher code exists and is unspent
    const voucher = await sql`
      SELECT * FROM kika_airtime_vouchers 
      WHERE voucher_code = ${voucherCode} AND is_redeemed = FALSE 
      LIMIT 1
    `;

    if (voucher.length === 0) {
      return NextResponse.json({ success: false, error: "Invalid, already redeemed, or expired airtime code token." }, { status: 404 });
    }

    const faceValueSEK = parseFloat(voucher.face_value_sek);

    // 2. Perform atomic ledger balance injection to the subscriber's SEK wallet registry
    await sql`
      INSERT INTO kika_user_wallets (email, balance_sek) 
      VALUES (${email}, ${faceValueSEK})
      ON CONFLICT (email) DO UPDATE 
      SET balance_sek = kika_user_wallets.balance_sek + ${faceValueSEK}, updated_at = NOW();
    `;

    // 3. Mark the voucher code row as spent
    await sql`
      UPDATE kika_airtime_vouchers 
      SET is_redeemed = TRUE, redeemed_by = ${email}, redeemed_at = NOW() 
      WHERE voucher_code = ${voucherCode};
    `;

    const wallet = await sql`SELECT balance_sek FROM kika_user_wallets WHERE email = ${email} LIMIT 1`;

    return NextResponse.json({
      success: true,
      message: `🎉 Success! Verified Voucher Redeemed. ${faceValueSEK.toLocaleString()} SEK credited cleanly.`,
      newBalanceSEK: wallet.balance_sek
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
