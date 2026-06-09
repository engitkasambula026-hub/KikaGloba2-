// app/api/remittance/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { 
      senderId, 
      recipientName, 
      recipientCountry, 
      payoutMethod, 
      recipientAccount, 
      amount, 
      currency, 
      gateway, 
      localPayoutEst 
    } = payload;

    // 1. Production Integrity Validation Check
    if (!senderId || !recipientName || !recipientAccount || !amount || !currency) {
      return NextResponse.json(
        { error: "Protocol aborted: Missing vital structural identifiers." },
        { status: 400 }
      );
    }

    if (Number(amount) <= 0) {
      return NextResponse.json(
        { error: "Validation Fault: Value metrics must exceed baseline zero values." },
        { status: 400 }
      );
    }

    // 2. Logging Operations directly to your migrated SQLite Database Core
    const databaseRecord = await prisma.remittanceLog.create({
      data: {
        senderId: `${senderId} [${recipientCountry}]`, // Append country tracking string safely
        recipientName,
        recipientAccount: `[${payoutMethod.toUpperCase()}] ${recipientAccount}`,
        amount: parseFloat(amount),
        currency,
        gateway: gateway || "kika_global_processor",
        status: "PENDING"
      }
    });

    console.log(`[Ledger Entry Logged] Row ID ${databaseRecord.id} saved inside local storage subsystem.`);

    // 3. Dispatch structured Handshake confirmation to frontend form loop
    return NextResponse.json({
      success: true,
      message: "Remittance structure verified and committed to ledger block.",
      transactionId: databaseRecord.id,
      status: databaseRecord.status,
      clearingEstimate: localPayoutEst
    }, { status: 201 });

  } catch (error: any) {
    console.error("KIKA BACKEND CLEARING EXCEPTION:", error);
    return NextResponse.json(
      { error: error.message || "Ecosystem core processing engine fault." },
      { status: 500 }
    );
  }
}
