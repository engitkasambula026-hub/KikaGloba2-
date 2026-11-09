import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// GET Request: Fetches all registered demographic accounts and real-time login audit traces
export async function GET(request: Request) {
  try {
    const sql = neon(process.env.DATABASE_URL || "");
    
    // Pull full user listing rows
    const members = await sql`
      SELECT member_id, full_name, email, savings_balance_sek, credit_underwriting_score, account_status, last_login_at, registration_ip 
      FROM sacco_members 
      ORDER BY joined_at DESC;
    `;
    
    // Pull top 15 critical access security logs
    const logs = await sql`
      SELECT * FROM kika_access_logs 
      ORDER BY timestamp DESC 
      LIMIT 15;
    `;
    
    return NextResponse.json({ success: true, members, logs });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// POST Request: Administrative toggle action to INSTANTLY block, restrict, or approve an account
export async function POST(request: Request) {
  try {
    const { targetEmail, newStatus } = await request.json();
    
    if (!targetEmail || !newStatus) {
      return NextResponse.json({ success: false, error: "Missing required governance parameters." }, { status: 400 });
    }

    // Safety validation step: Prevent the main admin profile from locking itself out
    if (targetEmail === "engitkasambula026@gmail.com" && newStatus !== "ACTIVE") {
      return NextResponse.json({ success: false, error: "Security Exception: Master Super-Admin root row cannot be restricted." }, { status: 403 });
    }

    const sql = neon(process.env.DATABASE_URL || "");

    // Apply the administrative block execution flag to the ledger row
    await sql`
      UPDATE sacco_members 
      SET account_status = ${newStatus} 
      WHERE email = ${targetEmail};
    `;

    return NextResponse.json({ 
      success: true, 
      message: `🔒 Target profile [${targetEmail}] status successfully modified to: ${newStatus}` 
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
