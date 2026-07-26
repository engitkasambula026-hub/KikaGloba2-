const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

if (!PAYSTACK_SECRET) {
  throw new Error("Missing PAYSTACK_SECRET_KEY in environment variables.");
}

/**
 * Initializes a Card or Mobile Money collection sequence.
 * This yields a secure payment URL to route your user to.
 */
export async function initializePayment(email: string, amountInUGX: number, reference: string) {
  const response = await fetch("https://paystack.co", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: amountInUGX * 100, // Paystack counts balances in subunit increments
      currency: "UGX",
      reference,
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/services/send-money/verify`,
    }),
  });

  return response.json();
}

/**
 * Verifies a bank account or phone number identity before initiating outlays.
 */
export async function verifyRecipientAccount(accountNumber: string, bankCode: string) {
  const response = await fetch(`https://paystack.co{accountNumber}&bank_code=${bankCode}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` },
  });
  return response.json();
}

/**
 * Executes a Wallet-to-Bank or Wallet-to-Mobile Money financial transfer payout.
 */
export async function initiatePayout(amountInUGX: number, recipientCode: string, reason: string) {
  const response = await fetch("https://paystack.co", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source: "balance",
      amount: amountInUGX * 100,
      recipient: recipientCode,
      reason: reason,
    }),
  });
  return response.json();
}
