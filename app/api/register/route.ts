import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { fullName, email, password, hostCountry, idType, idNumber, saccoId } = await req.json();

    if (!email || !password || !fullName || !idNumber) {
      return NextResponse.json({ error: "Missing required identity or account credentials." }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL!);

    const existingUser = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (existingUser.length > 0) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await sql`
      INSERT INTO users (
        full_name, email, password_hash, host_country, id_type, id_number, sacco_member_id, kyc_status
      )
      VALUES (
        ${fullName}, 
        ${email}, 
        ${hashedPassword}, 
        ${hostCountry}, 
        ${idType}, 
        ${idNumber}, 
        ${saccoId || null},
        'PENDING_VERIFICATION'
      )
      RETURNING id, full_name, email, host_country, id_type, id_number, kyc_status, created_at;
    `;

    return NextResponse.json({
      message: "Ecosystem account created under regional KYC compliance rules.",
      user: newUser[0],
    }, { status: 201 });

  } catch (error) {
    console.error("KYC Registration Error:", error);
    return NextResponse.json({ error: "Failed to process legal registration." }, { status: 500 });
  }
}