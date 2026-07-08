// app/api/register/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";

// Unified safe-load module fallback tracking strategy to avoid local import deadlocks
let ormEngine: any = null;
try {
  const dbModule = require("@/lib/db");
  ormEngine = dbModule.db || dbModule.default;
} catch (e) {
  try {
    const prismaModule = require("@/lib/prisma");
    ormEngine = prismaModule.prisma || prismaModule.default;
  } catch (err) {
    console.error("[DATA CORE CORRELATION DROP]: Could not mount standard ORM context maps.");
  }
}

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      name, 
      email, 
      password, 
      hostCountry, 
      domicileStatus, 
      gpsLocation, 
      profession 
    } = body;

    // 1. Strict Validation Safeguard Node
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Core profile validation inputs (Name, Email, Password) are missing." }, 
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    if (!ormEngine) {
      return NextResponse.json(
        { error: "Ecosystem database engine is completely offline." }, 
        { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    // Targets your active user model mapping inside schema.prisma dynamically
    const targetModel = ormEngine.user;
    const sanitizedEmail = email.toLowerCase().trim();

    // 2. Prevent Duplicate Profile Identity Logs
    const splitCheck = await targetModel.findUnique({ 
      where: { email: sanitizedEmail } 
    });
    
    if (splitCheck) {
      return NextResponse.json(
        { error: "An account with this email address has already been registered." }, 
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    // 3. Cryptographic Password Hashing (SHA-256 for local SQLite safety and speed)
    const passwordHash = crypto.createHash("sha256").update(password).digest("hex");

    // 4. Record Profile Entity to Database Schema
    const newUserNode = await targetModel.create({
      data: {
        name: name.trim(),
        email: sanitizedEmail,
        password: passwordHash, // Saves your hashed string securely
        hostCountry: hostCountry ? hostCountry.trim() : "Sweden",
        domicileStatus: domicileStatus || "TEMPORARY",
        gpsLocation: gpsLocation || "0,0",
        profession: profession ? profession.trim() : "Diaspora National",
        originCountry: "Uganda"
      }
    });

    // 5. Automatically Initialize an Associated VoIP Usage Balance Node with 5000 UGX trial deposit
    try {
      if (ormEngine.voipAccount) {
        // Generates a mock trial Swedish or custom virtual routing number out-of-the-box
        const dynamicVirtualNumber = "+468" + Math.floor(1000000 + Math.random() * 9000000).toString();
        
        await ormEngine.voipAccount.create({
          data: {
            userId: newUserNode.id,
            virtualNumber: dynamicVirtualNumber,
            balanceUGX: 5000.0,
            tierClass: "DIASPORA_STANDARD"
          }
        });
        console.log(`[LEDGER INIT] Created running VoIP wallet for new identity node: ${newUserNode.id}`);
      }
    } catch (voipInitErr) {
      console.warn("VoIP ledger account attachment bypassed smoothly:", voipInitErr);
    }

    return NextResponse.json({
      success: true,
      message: "Diaspora Profile synchronized and registered successfully.",
      userId: newUserNode.id
    }, { 
      status: 201, 
      headers: { "Access-Control-Allow-Origin": "*" } 
    });

  } catch (error: any) {
    console.error("[CRITICAL REGISTRATION ANOMALY]:", error);
    return NextResponse.json(
      { error: "Internal transactional structural compilation failure." }, 
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
