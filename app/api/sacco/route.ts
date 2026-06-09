// app/api/sacco/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Global instantiation layer protecting against local development engine hot-reload memory fatigue
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { memberSacco, membershipType, idType, idNumber, sharesCapital, agreeTerms } = body;

    // 1. Strict Server-Side Data Validation Engine
    if (!memberSacco || !membershipType || !idType || !idNumber || !sharesCapital) {
      return NextResponse.json(
        { error: "Registration Rejected: Missing required compliance metrics." },
        { status: 400 }
      );
    }

    if (!agreeTerms) {
      return NextResponse.json(
        { error: "Compliance Violation: You must authorize the FIA regulatory parameters." },
        { status: 400 }
      );
    }

    const numericShares = parseFloat(sharesCapital);
    if (isNaN(numericShares) || numericShares < 0) {
      return NextResponse.json(
        { error: "Invalid Allocation: Initial capital investment must be a positive value." },
        { status: 400 }
      );
    }

    // 2. Commit Profile Entry directly to SQLite Ledger Subsystem
    const newSubscription = await prisma.saccoSubscription.create({
      data: {
        memberSacco,
        membershipType,
        idType,
        idNumber,
        sharesCapital: numericShares,
        balanceUGX: numericShares, // Initial deposit funds our running cash ledger pool
        complianceAgreed: true,
        status: "ACTIVE"
      }
    });

    console.log(`[SACCO Registry Node] Successfully activated subscription profile ${newSubscription.id}`);

    // 3. Dispatch success payload back to frontend UI loop
    return NextResponse.json({
      success: true,
      message: "SACCO Shareholder Subscription profile successfully initialized.",
      subscriptionId: newSubscription.id,
      assignedCooperative: newSubscription.memberSacco,
      currentLiquidityPool: newSubscription.balanceUGX
    }, { status: 201 });

  } catch (error: any) {
    console.error("KIKA SACCO CORE ROUTING EXCEPTION:", error);
    return NextResponse.json(
      { error: "Internal system node communication timeout. Ledger record aborted." },
      { status: 500 }
    );
  }
}
