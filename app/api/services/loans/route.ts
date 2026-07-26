import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // 🟢 CRITICAL: Imports your central PostgreSQL client node

// A. GET ROUTE: Fetches accredited national loan products from PostgreSQL
export async function GET() {
  try {
    const activeProducts = await prisma.loanProduct.findMany();
    return NextResponse.json(activeProducts, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: `Loan directory read timeout: ${error.message}` }, { status: 500 });
  }
}

// B. POST ROUTE: Processes incoming loan enrollment applications securely
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, userEmail, loanProductId, requestedAmount, saccoSharesUGX, repaymentPlan } = body;

    // 1. Mandatory Data Presence Check
    if (!userId || !loanProductId || !requestedAmount || !saccoSharesUGX) {
      return NextResponse.json({ error: "Validation Rejected: Missing critical financial metrics." }, { status: 400 });
    }

    // 2. Query product specifications from PostgreSQL to verify compliance
    const targetProduct = await prisma.loanProduct.findUnique({ where: { id: loanProductId } });
    if (!targetProduct) {
      return NextResponse.json({ error: "Product Not Found: Invalid loan allocation code." }, { status: 404 });
    }

    // 3. Verification: Ensure member shares meet the equity matching rules
    if (saccoSharesUGX < targetProduct.minSaccoShares) {
      return NextResponse.json({ 
        error: `Eligibility Check Failed: Minimum required Sacco equity pool is ${targetProduct.minSaccoShares.toLocaleString()} UGX.` 
      }, { status: 403 });
    }

    // 4. Log the immutable loan application ledger entry directly into your cloud Neon DB
    const secureApplication = await prisma.loanApplication.create({
      data: {
        loanProductId,
        userId,
        userEmail,
        requestedAmount: parseFloat(requestedAmount),
        saccoSharesUGX: parseFloat(saccoSharesUGX),
        repaymentPlan,
        status: "PENDING"
      }
    });

    return NextResponse.json({
      success: true,
      message: "Loan dossier logged into the national review terminal. Compliance checking initiated.",
      applicationId: secureApplication.id
    }, { status: 201 });

  } catch (error: any) {
    console.error("[LOAN BACKEND ROUTE ERROR]:", error);
    return NextResponse.json({ error: `Internal execution pipeline error: ${error.message}` }, { status: 500 });
  }
}
