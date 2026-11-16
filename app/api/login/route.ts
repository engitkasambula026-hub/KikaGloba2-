import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    const sql = neon(process.env.DATABASE_URL || "");
    const cleanEmail = email.toLowerCase().trim();
    const forwardedHeader = request.headers.get("x-forwarded-for");
    const incomingIP = forwardedHeader ? forwardedHeader.split(",")[0].trim() : "0.0.0.0";
    const userAgent = request.headers.get("user-agent") || "Unknown Browser";
    const deviceType = /mobile/i.test(userAgent) ? "Mobile" : "Desktop";

    // 1. Check Admin Control Center approval status first
    const memberCheck = await sql`
      SELECT full_name, account_status FROM sacco_members
      WHERE LOWER(TRIM(email)) = ${cleanEmail}
      LIMIT 1;
    `;

    const memberRow = memberCheck[0];

    if (memberRow && memberRow.account_status !== "ACTIVE") {
      await sql`
        INSERT INTO kika_access_logs (user_email, event_type, ip_address, platform_browser, device_type)
        VALUES (${cleanEmail}, 'LOGIN_BLOCKED_UNAPPROVED', ${incomingIP}, ${userAgent.slice(0, 140)}, ${deviceType});
      `;

      return NextResponse.json(
        {
          success: false,
          error: `Access Restricted: Your account status is ${memberRow.account_status}. Please wait for Admin approval.`
        },
        { status: 403 }
      );
    }

    // 2. Look up password hash across BOTH primary registration tables (users + kika_diaspora_ledger)
    let storedHash: string | null = null;
    let resolvedName: string = memberRow?.full_name || "KiKa Member";

    try {
      const usersRows = await sql`
        SELECT full_name, password_hash FROM users
        WHERE LOWER(TRIM(email)) = ${cleanEmail}
        LIMIT 1;
      `;
      const userRow = usersRows[0];
      if (userRow && userRow.password_hash) {
        storedHash = userRow.password_hash;
        resolvedName = userRow.full_name || resolvedName;
      }
    } catch (_) {}

    if (!storedHash) {
      try {
               const ledgerRows = await sql`
          SELECT name AS full_name, password AS password_hash FROM kika_diaspora_ledger
          WHERE LOWER(TRIM(email)) = ${cleanEmail}
          LIMIT 1;
        `;

        const ledgerRow = ledgerRows[0];
        if (ledgerRow && ledgerRow.password_hash) {
          storedHash = ledgerRow.password_hash;
          resolvedName = ledgerRow.full_name || resolvedName;
        }
      } catch (_) {}
    }

    // 3. Validate password against bcrypt, SHA-256, or direct hash match
    let isPasswordValid = false;
    if (storedHash) {
      if (storedHash.startsWith("$2a$") || storedHash.startsWith("$2b$") || storedHash.startsWith("$2y$")) {
        isPasswordValid = await bcrypt.compare(password, storedHash);
      } else {
        const sha256Hash = crypto.createHash("sha256").update(password).digest("hex");
        isPasswordValid = storedHash === sha256Hash || storedHash === password;
      }
    }

    if (!isPasswordValid) {
      await sql`
        INSERT INTO kika_access_logs (user_email, event_type, ip_address, platform_browser, device_type)
        VALUES (${cleanEmail}, 'LOGIN_FAILED', ${incomingIP}, ${userAgent.slice(0, 140)}, ${deviceType});
      `;

      return NextResponse.json(
        { success: false, error: "Invalid email or password credentials." },
        { status: 401 }
      );
    }

    // 4. Update last login timestamp and record successful login
    await sql`
      UPDATE sacco_members
      SET last_login_at = NOW()
      WHERE LOWER(TRIM(email)) = ${cleanEmail};
    `;

    await sql`
      INSERT INTO kika_access_logs (user_email, event_type, ip_address, platform_browser, device_type)
      VALUES (${cleanEmail}, 'LOGIN_SUCCESS', ${incomingIP}, ${userAgent.slice(0, 140)}, ${deviceType});
    `;

    return NextResponse.json({
      success: true,
      message: "Authentication successful.",
      user: {
        email: cleanEmail,
        fullName: resolvedName,
        role: cleanEmail === "engitkasambula026@gmail.com" ? "SUPER_ADMIN" : "MEMBER"
      }
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Authentication server error." },
      { status: 500 }
    );
  }
}
