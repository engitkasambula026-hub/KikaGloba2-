// app/api/login/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";

// Unified safe-load module fallback tracking strategy
let ormEngine: any = null;
try {
  const dbModule = require("@/lib/db");
  ormEngine = dbModule.db || dbModule.default;
} catch (e) {
  try {
    const prismaModule = require("@/lib/prisma");
    ormEngine = prismaModule.prisma || prismaModule.default;
  } catch (err) {
    console.error("[INTERNAL DATA LAYER DEADLOCK]: Could not locate a valid db or prisma instance.");
  }
}

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // 1. Structural Field Input Safeguard Validation Node
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required credentials." }, 
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    if (!ormEngine) {
      return NextResponse.json(
        { error: "Database client adapter is completely unconfigured." }, 
        { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const sanitizedEmail = email.toLowerCase().trim();

    // 2. Polymorphic Identity Schema Verification Matrix Lookup
    // Checks for DiasporaMember mapping model; falls back safely to default user mapping model
    const targetModel = ormEngine.diasporaMember || ormEngine.user;
    if (!targetModel) {
      return NextResponse.json(
        { error: "Target data cluster schema structure cannot be verified." }, 
        { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const matchedUser = await targetModel.findUnique({
      where: { email: sanitizedEmail }
    });

    if (!matchedUser) {
      return NextResponse.json(
        { error: "Invalid email or password credential combination." }, 
        { status: 401, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    // 3. Cryptographic Matching Evaluation Layer (Supports Hash and Plain Fallback)
    const incomingHash = crypto.createHash("sha256").update(password).digest("hex");
    const operationalDbPassword = matchedUser.passwordHash || matchedUser.password;
    
    const isPasswordValid = (operationalDbPassword === incomingHash) || (operationalDbPassword === password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password credential combination." }, 
        { status: 401, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    // 4. Retrieve Associated VoIP Balance Layer Safely
    let currentBalanceUGX = 5000.0; // Default fallback configuration deposit parameter
    try {
      if (ormEngine.voipAccount) {
        const voipAcct = await ormEngine.voipAccount.findFirst({
          where: { memberId: matchedUser.id }
        });
        if (voipAcct) {
          currentBalanceUGX = voipAcct.balanceUGX ?? 5000.0;
        }
      }
    } catch (balErr) {
      console.log("VoIP asset balance query bypassed smoothly.");
    }

    // 5. Authorize Access and Disburse Node Session Context
    return NextResponse.json({
      success: true,
      message: "Portal identity verified successfully.",
      session: {
        memberId: matchedUser.id,
        fullName: matchedUser.firstName ? `${matchedUser.firstName} ${matchedUser.lastName || ""}`.trim() : (matchedUser.name || "Diaspora Member"),
        email: matchedUser.email,
        currentCountry: matchedUser.currentCountry || "Global Node",
        originDistrict: matchedUser.originDistrict || "Inland Node",
        voipBalanceUGX: currentBalanceUGX
      }
    }, { 
      status: 200, 
      headers: { "Access-Control-Allow-Origin": "*" } 
    });

  } catch (err: any) {
    console.error("[CRITICAL PORTAL AUTH ROUTE FAILURE]:", err);
    return NextResponse.json(
      { error: "Internal server error during identity validation." }, 
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
