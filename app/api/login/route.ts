import { NextResponse } from "next/server";
import { sql } from "@/lib/db"; // 🟢 CORRECT FIX: Imports 'sql' natively matching your library configuration

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Credentials missing" }, { status: 400 });
    }

    // 🛡️ DIRECT SECURE NEON SQL CREDENTIAL VERIFICATION LOOKUP LOOP
    const users = await sql`
      SELECT * FROM kika_diaspora_ledger WHERE email = ${email} LIMIT 1;
    `;

    if (!users || users.length === 0) {
      return NextResponse.json({ success: false, error: "Invalid identity credentials logged." }, { status: 200 });
    }

    const user = users[0];

    // 🔑 BASIC PASS AUTHENTICATOR (HOOKED UP STABLE TO YOUR REGISTER SCHEMA)
    if (user.password !== password) {
      return NextResponse.json({ success: false, error: "Invalid identity credentials logged." }, { status: 200 });
    }

    return NextResponse.json({
      success: true,
      message: "Authorization node session verified successfully.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        country: user.country
      }
    }, { status: 200 });

  } catch (error: any) {
    console.error("Login API Exception Intercepted: ", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
