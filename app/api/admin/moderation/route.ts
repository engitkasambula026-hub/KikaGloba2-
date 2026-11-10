import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { Resend } from "resend";

// Initialize your verified Vercel email pipeline key natively
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL || "");
    
    // Pull full user listing rows matching active dashboard states
    const members = await sql`
      SELECT member_id, full_name, email, savings_balance_sek, credit_underwriting_score, account_status, last_login_at 
      FROM sacco_members 
      ORDER BY joined_at DESC;
    `;
    
    // Pull advanced telemetry logs including device and browser footprints
    const logs = await sql`
      SELECT log_id, user_email, event_type, ip_address, platform_browser, device_type, timestamp 
      FROM kika_access_logs 
      ORDER BY timestamp DESC 
      LIMIT 25;
    `;
    
    return NextResponse.json({ success: true, members, logs });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { targetEmail, newStatus, targetName } = await request.json();
    if (!targetEmail || !newStatus) {
      return NextResponse.json({ success: false, error: "Missing governance parameters." }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL || "");

    // Update member's status flag atomically inside Neon DB
    await sql`
      UPDATE sacco_members 
      SET account_status = ${newStatus} 
      WHERE email = ${targetEmail};
    `;

    // Append log event tracking the administrative action into the ledger
    await sql`
      INSERT INTO kika_access_logs (user_email, event_type, ip_address, user_agent)
      VALUES (${targetEmail}, ${`ADMIN_STATUS_${newStatus}`}, '127.0.0.1', 'KiKa Governance Engine');
    `;

    // IF APPROVED: Automatically fire an authentic enterprise notification email via Resend
    if (newStatus === "ACTIVE") {
      await resend.emails.send({
        from: "KiKa Global Ventures <telecom@kika-ecosystem.com>",
        to: targetEmail,
        subject: "🎉 ACCOUNT APPROVED: Your KiKa Diaspora Portal Is Fully Active",
        html: `
          <div style="font-family: sans-serif; padding: 24px; color: #0f172a; background-color: #f8fafc;">
            <h2 style="color: #a855f7;">🌍 KiKa Global Ventures SE</h2>
            <p>Hello <strong>${targetName || "Valued Member"}</strong>,</p>
            <p>We are pleased to inform you that your registration application has been successfully audited and manually cleared by our senior ecosystem administrators.</p>
            <div style="padding: 16px; background-color: #ffffff; border-left: 4px solid #10b981; margin: 16px 0;">
              <strong>Account Status:</strong> 🟢 ACTIVE / VERIFIED ACCRUAL<br/>
              <strong>Services Unlocked:</strong> SACCO Pools, Market Tickers, and Remittance Tunnels.
            </div>
            <p>You can now log in securely using your credentials at <a href="https://kika-ecosystem.com">kika-ecosystem.com</a>.</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;"/>
            <small style="color: #64748b;">Ecosystem Governance Operations | Stockholm, Sweden Staging Infrastructure</small>
          </div>
        `
      });
    }

    return NextResponse.json({ success: true, message: `Status updated to ${newStatus} and alert dispatched successfully.` });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
