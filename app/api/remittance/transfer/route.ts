import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

const FX_RATES_FROM_USD: Record<string, number> = {
  USD: 1.0,
  UGX: 3720.0,
  KES: 129.5,
  SEK: 10.5,
  EUR: 0.92,
  GBP: 0.79
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      senderEmail,
      transferChannel, // "INTERNAL_MEMBER" | "MOBILE_MONEY" | "BANK_ACCOUNT"
      recipientName,
      recipientIdentifier, // Member email, Mobile Money phone (+256...), or Bank IBAN/Account
      providerOrBank, // e.g., "MTN MoMo Uganda", "Airtel Money", "Swedbank IBAN", "Stanbic Bank"
      targetCurrency, // "UGX" | "KES" | "SEK" | "EUR" | "GBP" | "USD"
      amountUSD
    } = body;

    const cleanSender = senderEmail?.toLowerCase().trim();
    const numericUSD = parseFloat(amountUSD || "0");
    const currency = (targetCurrency || "UGX").toUpperCase();
    const fxRate = FX_RATES_FROM_USD[currency] || 1.0;

    if (!cleanSender || numericUSD < 1 || !recipientIdentifier) {
      return NextResponse.json(
        { success: false, error: "Valid sender, recipient details, and minimum $1.00 USD required." },
        { status: 400 }
      );
    }

    const feeUSD = transferChannel === "INTERNAL_MEMBER" ? 0 : Number((numericUSD * 0.015).toFixed(2)); // 0% internal, 1.5% external
    const totalDebitUSD = Number((numericUSD + feeUSD).toFixed(2));
    const convertedPayout = Number((numericUSD * fxRate).toFixed(2));
    const txRef = `REMIT-${Date.now().toString(36).toUpperCase()}`;

    const sql = neon(process.env.DATABASE_URL || "");

    // Ensure audit table exists
    await sql`
      CREATE TABLE IF NOT EXISTS remittance_transfers (
        id SERIAL PRIMARY KEY,
        tx_reference TEXT UNIQUE NOT NULL,
        sender_email TEXT NOT NULL,
        transfer_channel TEXT NOT NULL,
        recipient_name TEXT,
        recipient_identifier TEXT NOT NULL,
        provider_or_bank TEXT,
        amount_usd NUMERIC(12,2) NOT NULL,
        fee_usd NUMERIC(12,2) NOT NULL,
        target_currency TEXT NOT NULL,
        converted_amount NUMERIC(14,2) NOT NULL,
        fx_rate NUMERIC(12,4) NOT NULL,
        status TEXT NOT NULL DEFAULT 'COMPLETED',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    // Verify sender balance
    const senderRows = await sql`
      SELECT savings_balance_sek, status
      FROM sacco_members
      WHERE LOWER(TRIM(email)) = ${cleanSender}
      LIMIT 1;
    `;

    if (!senderRows.length) {
      return NextResponse.json({ success: false, error: "Sender account not found." }, { status: 404 });
    }

    const currentBalance = parseFloat(senderRows[0].savings_balance_sek || "0");
    if (currentBalance < totalDebitUSD) {
      return NextResponse.json(
        {
          success: false,
          error: `Insufficient wallet balance ($${currentBalance.toFixed(2)} USD available; $${totalDebitUSD.toFixed(2)} USD needed including $${feeUSD.toFixed(2)} fee).`
        },
        { status: 400 }
      );
    }

    // 1. Debit sender USD wallet
    const debited = await sql`
      UPDATE sacco_members
      SET savings_balance_sek = savings_balance_sek - ${totalDebitUSD}
      WHERE LOWER(TRIM(email)) = ${cleanSender}
      RETURNING savings_balance_sek;
    `;
    const newSenderBalance = parseFloat(debited[0].savings_balance_sek || "0");

    // 2. If Internal Member-to-Member transfer, credit recipient immediately
    let payoutStatus = "DISBURSEMENT_QUEUED";
    if (transferChannel === "INTERNAL_MEMBER") {
      const cleanRecipient = recipientIdentifier.toLowerCase().trim();
      const recUpdated = await sql`
        UPDATE sacco_members
        SET savings_balance_sek = COALESCE(savings_balance_sek, 0) + ${numericUSD}
        WHERE LOWER(TRIM(email)) = ${cleanRecipient}
        RETURNING savings_balance_sek;
      `;
      if (!recUpdated.length) {
        // Refund sender if recipient email does not exist
        await sql`
          UPDATE sacco_members
          SET savings_balance_sek = savings_balance_sek + ${totalDebitUSD}
          WHERE LOWER(TRIM(email)) = ${cleanSender};
        `;
        return NextResponse.json(
          { success: false, error: `Recipient member (${cleanRecipient}) not found in KiKa registry.` },
          { status: 404 }
        );
      }
      payoutStatus = "SETTLED_INSTANTLY";

      await sql`
        INSERT INTO sacco_ledger (member_email, tx_type, amount_sek, balance_snapshot_sek, tx_reference)
        VALUES (${cleanRecipient}, 'REMITTANCE_IN_USD', ${numericUSD}, ${parseFloat(recUpdated[0].savings_balance_sek)}, ${txRef});
      `;
    }

    // 3. Log sender debit & remittance audit receipt
    await sql`
      INSERT INTO sacco_ledger (member_email, tx_type, amount_sek, balance_snapshot_sek, tx_reference)
      VALUES (${cleanSender}, ${`REMIT_OUT_${transferChannel}`}, ${-totalDebitUSD}, ${newSenderBalance}, ${txRef});
    `;

    await sql`
      INSERT INTO remittance_transfers (
        tx_reference, sender_email, transfer_channel, recipient_name,
        recipient_identifier, provider_or_bank, amount_usd, fee_usd,
        target_currency, converted_amount, fx_rate, status
      )
      VALUES (
        ${txRef}, ${cleanSender}, ${transferChannel}, ${recipientName || "Beneficiary"},
        ${recipientIdentifier.trim()}, ${providerOrBank || transferChannel}, ${numericUSD}, ${feeUSD},
        ${currency}, ${convertedPayout}, ${fxRate}, ${payoutStatus}
      );
    `;

    return NextResponse.json({
      success: true,
      txReference: txRef,
      status: payoutStatus,
      debitedUSD: totalDebitUSD,
      convertedAmount: convertedPayout,
      targetCurrency: currency,
      newBalanceUSD: newSenderBalance
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
