import { NextResponse } from "next/server";
import { db } from "@/lib/db"; 

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    const { name, email, password } = rawBody;

    if (!email || !password) {
      return NextResponse.json({ error: "Validation Rejected: Incomplete profile credentials." }, { status: 400 });
    }

    const targetEmail = email.toLowerCase().trim();

    // 🟢 ABSOLUTE UNIVERSAL MODEL BINDING: Automatically matches any variant of the user table structure
    const userDelegate = (db as any).user || (db as any).profiles || (db as any).member || (db as any).account;
    
    if (!userDelegate) {
      return NextResponse.json({ error: "Database mapping core connection node un-initialized." }, { status: 500 });
    }

    // 1. Audit check the database tables safely for an existing user identity
    const existingUser = await userDelegate.findFirst({
      where: { email: targetEmail }
    });

    if (existingUser) {
      return NextResponse.json({ error: "Sovereign Identity Blocked: This email address is already registered." }, { status: 400 });
    }

    // 2. Commit the member record cleanly inside the active SQL rows
    await userDelegate.create({
      data: {
        name: name || "Diaspora Member",
        email: targetEmail,
        password: password.trim(), 
        role: "DIASPORA_MEMBER"
      }
    });

    return NextResponse.json({
      success: true,
      message: "Statutory profile successfully synchronized inside Neon database ledger."
    }, { status: 201 });

  } catch (error: any) {
    console.error("[REGISTRATION CORE ENGINE FAULT]:", error);
    return NextResponse.json({ error: `Identity ledger processing failure: ${error.message}` }, { status: 500 });
  }
}
