import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { neon } from "@neondatabase/serverless";
import nodemailer from "nodemailer";

const ADMIN_EMAIL = "engitkasambula026@gmail.com";

async function isSuperAdminAuthenticated() {
  const cookieStore = await cookies();
  const sessionEmail = cookieStore.get("kika_user_email")?.value?.toLowerCase().trim();
  const sessionActive = cookieStore.get("kika_session_active")?.value;
  return sessionActive === "true" && sessionEmail === ADMIN_EMAIL;
}

export async function GET() {
  try {
    if (!(await isSuperAdminAuthenticated())) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Super-Admin session cookie required." },
        { status: 401 }
      );
    }

    const sql = neon(process.env.DATABASE_URL || "");
    const members = await sql`
      SELECT member_id, full_name, email, savings_balance_sek, credit_underwriting_score, account_status, last_login_at 
      FROM sacco_members 
      ORDER BY joined_at DESC;
    `;
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
    if (!(await isSuperAdminAuthenticated())) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Only Super-Admin can modify account states." },
        { status: 403 }
      );
    }

    const { targetEmail, newStatus, targetName } = await request.json();
    if (!targetEmail || !newStatus) {
      return NextResponse.json({ success: false, error: "Missing governance parameters." }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL || "");
    const cleanTarget = targetEmail.toLowerCase().trim();

    await sql`
      UPDATE sacco_members 
      SET account_status = ${newStatus} 
      WHERE LOWER(TRIM(email)) = ${cleanTarget};
    `;

    await sql`
      INSERT INTO kika_access_logs (user_email, event_type, ip_address, platform_browser, device_type)
      VALUES (${cleanTarget}, ${`ADMIN_STATUS_${newStatus}`}, '127.0.0.1', 'KiKa Governance Engine', 'Server');
    `;

    if (newStatus === "ACTIVE") {
      const gmailUser = process.env.GMAIL_USER?.trim();
      const gmailPass = process.env.GMAIL_APP_PASS?.replace(/\s+/g, "");

      if (gmailUser && gmailPass) {
        try {
          const mailTransporter = nodemailer.createTransport({
            host: "://gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: gmailUser,
              pass: gmailPass,
            },
          });

          await mailTransporter.sendMail({
            from: `"KiKa Global Ventures" <${gmailUser}>`,
            to: cleanTarget,
            subject: "🎉 ACCOUNT APPROVED: Your KiKa Diaspora Portal Is Fully Active",
            html: `
              <div style="font-family: sans-serif; padding: 24px; color: #0f172a; background-color: #f8fafc;">
                <h2 style="color: #a855f7;">🌍 KiKa Global Ventures SE</h2>
                <p>Hello <strong>${targetName || "Valued Member"}</strong>,</p>
                <p>Your registration application has been audited and manually cleared by our senior ecosystem administrators.</p>
                <div style="padding: 16px; background-color: #ffffff; border-left: 4px solid #10b981; margin: 16px 0;">
                  <strong>Account Status:</strong> 🟢 ACTIVE / VERIFIED ACCRUAL<br/>
                  <strong>Services Unlocked:</strong> SACCO Pools, VoIP Vouchers, and Global Remittance Tunnels.
                </div>
                <p>You can now log in securely at <a href="https://kika-ecosystem.com">://kika-ecosystem.com</a>.</p>
              </div>
            `
          });
        } catch (mailErr: any) {
          return NextResponse.json({
            success: true,
            message: `Account approved in DB, but Gmail SMTP rejected send: ${mailErr.message}`
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Status updated to ${newStatus} and confirmation email dispatched to ${cleanTarget}.`
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
