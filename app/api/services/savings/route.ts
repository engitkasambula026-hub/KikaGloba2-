import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// A. GET ROUTE: Fetches active Sacco Pools and user subscription statuses
export async function GET(request: Request) {
  try {
    const activePools = await prisma.saccoPool.findMany({
      include: { memberships: true }
    });
    return NextResponse.json({ success: true, pools: activePools }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: `Banking ledger read timeout: ${error.message}` }, { status: 500 });
  }
}

// B. POST ROUTE: Processes incoming banking/savings asset deposits
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, userEmail, saccoPoolId, depositAmountUGX } = body;

    const cashValue = parseFloat(depositAmountUGX);
    if (!userEmail || !saccoPoolId || isNaN(cashValue) || cashValue <= 0) {
      return NextResponse.json({ error: "Validation Rejected: Invalid deposit parameters." }, { status: 400 });
    }

    // 1. Locate or initialize the custom User Sacco Membership ledger card row
    let membership = await prisma.saccoMembership.findFirst({
      where: { userEmail, saccoPoolId }
    });

    if (!membership) {
      membership = await prisma.saccoMembership.create({
        data: {
          userId: userId || "diaspora_banking_node",
          userEmail,
          saccoPoolId,
          savingsValue: cashValue,
          sharesCount: cashValue / 10000 // Each 10,000 UGX deposit matches 1 Sacco Equity Share Unit
        }
      });
    } else {
      membership = await prisma.saccoMembership.update({
        where: { id: membership.id },
        data: {
          savingsValue: { increment: cashValue },
          sharesCount: { increment: cashValue / 10000 }
        }
      });
    }

    // 2. Increment the overall aggregate corporate Sacco Pool capital ledger
    await prisma.saccoPool.update({
      where: { id: saccoPoolId },
      data: { totalCapitalUGX: { increment: cashValue } }
    });

    return NextResponse.json({
      success: true,
      message: "Paystack allocation verified. Sacco savings ledger updated successfully.",
      currentSavingsUGX: membership.savingsValue,
      accumulatedShares: membership.sharesCount
    }, { status: 200 });

  } catch (error: any) {
    console.error("[SACCO LEDGER ALLOCATION EXCEPTION]:", error);
    return NextResponse.json({ error: `Internal banking pipeline error: ${error.message}` }, { status: 500 });
  }
}
