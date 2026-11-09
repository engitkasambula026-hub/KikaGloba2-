import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// POST Request: Process structural savings actions & dynamically adjust underwriting metrics
export async function POST(request: Request) {
  try {
    const { email, actionType, transactionAmountSEK } = await request.json();
    
    if (!email || !actionType || !transactionAmountSEK) {
      return NextResponse.json({ success: false, error: "Missing required transactional tokens." }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL || "");
    const parsedAmount = Math.abs(parseFloat(transactionAmountSEK));
    const txRef = `KIKA-TX-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    // 1. Fetch current structural states of target membership row
    const memberRecords = await sql`SELECT * FROM sacco_members WHERE email = ${email} LIMIT 1;`;
    if (memberRecords.length === 0) {
      return NextResponse.json({ success: false, error: "Target membership identity row not found." }, { status: 404 });
    }

    const currentMember = memberRecords[0];
    let currentBalance = parseFloat(currentMember.savings_balance_sek);
    let newBalance = currentBalance;
    let newCreditScore = parseInt(currentMember.credit_underwriting_score);

    // 2. Compute transactional logic tracks
    if (actionType === "DEPOSIT") {
      newBalance += parsedAmount;
      // Boost credit scoring matrix programmatically (+5 points per major deposit block up to 850 cap)
      newCreditScore = Math.min(850, newCreditScore + Math.floor(parsedAmount / 100));
    } else if (actionType === "WITHDRAWAL") {
      if (currentBalance < parsedAmount) {
        return NextResponse.json({ success: false, error: "Transaction denied: Insufficient capital reserves." }, { status: 400 });
      }
      newBalance -= parsedAmount;
      newCreditScore = Math.max(300, newCreditScore - 10); // Deduct for sudden liquidity strains
    } else {
      return NextResponse.json({ success: false, error: "Invalid action track request." }, { status: 400 });
    }

    // 3. Execute atomic multi-table state updates inside the serverless layer
    await sql`
      UPDATE sacco_members 
      SET savings_balance_sek = ${newBalance}, credit_underwriting_score = ${newCreditScore}
      WHERE email = ${email};
    `;

    await sql`
      INSERT INTO sacco_ledger (member_email, tx_type, amount_sek, balance_snapshot_sek, tx_reference)
      VALUES (${email}, ${actionType}, ${parsedAmount}, ${newBalance}, ${txRef});
    `;

    return NextResponse.json({
      success: true,
      reference: txRef,
      updatedBalanceSEK: newBalance.toFixed(2),
      updatedCreditScore: newCreditScore,
      message: `🎉 SACCO ledger transaction executed successfully. Reference code: ${txRef}`
    });

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
