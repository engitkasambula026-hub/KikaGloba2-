// app/api/db/init/route.ts
import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "DATABASE_URL environment variable is missing." },
        { status: 500 }
      );
    }

    const sql = neon(process.env.DATABASE_URL);

    // Automate table provisioning with regional KYC and SACCO fields
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        host_country VARCHAR(100),
        id_type VARCHAR(100),
        id_number VARCHAR(100),
        sacco_member_id VARCHAR(100),
        kyc_status VARCHAR(50) DEFAULT 'PENDING_VERIFICATION',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    return NextResponse.json({
      success: true,
      message: "Neon DB table structure automatically initialized and synced!",
    });
  } catch (error: any) {
    console.error("Database Auto-Init Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}