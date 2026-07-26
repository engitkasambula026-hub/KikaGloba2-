import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-paystack-signature");

    // Cryptographic validation checking to verify this caller is Paystack and not an attacker
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_WEBHOOK_SECRET || "")
      .update(rawBody)
      .digest("hex");

    if (hash !== signature) {
      return NextResponse.json({ error: "Unauthorized Signature" }, { status: 401 });
    }

    const event = JSON.parse(rawBody);

    // Filter incoming events to only execute when charging accounts succeeds
    if (event.event === "charge.success") {
      const { reference, amount } = event.data;

      // Locate the record inside the KiKa database ledger layers
      const existingTransaction = await prisma.transaction.findUnique({
        where: { reference },
      });

      if (existingTransaction && existingTransaction.status === "PENDING") {
        // Atomic ledger operations updating balance levels cleanly inside PostgreSQL
        await prisma.$transaction([
          prisma.transaction.update({
            where: { reference },
            data: { status: "SUCCESS" },
          }),
          prisma.wallet.update({
            where: { id: existingTransaction.walletId },
            data: { balance: { increment: amount } },
          }),
        ]);
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
