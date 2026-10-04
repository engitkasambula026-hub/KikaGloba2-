import { NextResponse } from "next/server";
import { sql } from "@/lib/db"; // 🟢 CORRECT FIX: Standardized to use your native 'sql' engine

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, data } = body;

    // 💰 INTERCEPT LIVE TRANSITING CAPITAL SIGNALS FROM PAYSTACK Sockets
    if (event === "charge.success") {
      const email = data.customer.email;
      const amountInCents = data.amount; 
      const amountInActual = amountInCents / 100; // Converts standard Paystack cents to absolute currency values
      const transactionReference = data.reference;

      console.log(`💸 Paystack Payment Success Hook Captured: ${email} transited $${amountInActual}`);

      // 🛡️ DYNAMIC COMPLIANCE BUFFER ACCOUNTING LEDGER UPDATE ROWS
      // Automatically updates your Neon SQL ledger rows when a payment passes through
      await sql`
        UPDATE kika_diaspora_ledger 
        SET sacco_name = CONCAT(sacco_name, ' | Paid Ref: ', ${transactionReference})
        WHERE email = ${email};
      `;

      return NextResponse.json({ success: true, message: "Ledger transaction metrics updated successfully." }, { status: 200 });
    }

    return NextResponse.json({ success: true, message: "Webhook event skipped cleanly." }, { status: 200 });

  } catch (error: any) {
    console.error("Paystack Webhook Exception Intercepted: ", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
