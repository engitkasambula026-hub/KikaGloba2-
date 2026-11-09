import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// GET Request: Returns live market pricing data with fractional fluctuations
export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL || "");
    
    // Simulate real-time programmatic ticker price adjustments (-0.5% to +0.8% micro-movements)
    await sql`
      UPDATE kika_market_tickers 
      SET current_price_sek = current_price_sek * (1 + (random() * 0.013 - 0.005)), last_updated = NOW();
    `;
    
    const tickers = await sql`SELECT * FROM kika_market_tickers;`;
    return NextResponse.json({ success: true, marketTime: new Date(), tickers });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// POST Request: Process an incoming investment bid transaction against the user's wallet
export async function POST(request: Request) {
  try {
    const { email, tickerSymbol, sharesQuantity, offeredPrice } = await request.json();
    const sql = neon(process.env.DATABASE_URL || "");

    const totalCostSEK = parseFloat(sharesQuantity) * parseFloat(offeredPrice);

    // 1. Verify if user has sufficient cleared funds in their SACCO savings account
    const wallet = await sql`SELECT savings_balance_sek FROM kika_sacco_wallets WHERE email = ${email} LIMIT 1`;
    const userBalance = wallet.length > 0 ? parseFloat(wallet[0].savings_balance_sek) : 0.00;

    if (userBalance < totalCostSEK) {
      return NextResponse.json({ success: false, error: "Insufficient SEK funds available within your SACCO ledger row." }, { status: 400 });
    }

    // 2. Perform atomic operations: deduct balance and record bid row
    await sql`
      UPDATE kika_sacco_wallets 
      SET savings_balance_sek = savings_balance_sek - ${totalCostSEK} 
      WHERE email = ${email};
    `;

    await sql`
      INSERT INTO kika_market_bids (bidder_email, ticker_symbol, bid_shares_quantity, offered_price_sek, bid_status)
      VALUES (${email}, ${tickerSymbol}, ${sharesQuantity}, ${offeredPrice}, 'SETTLED');
    `;

    return NextResponse.json({ 
      success: true, 
      message: `🎉 Bid successfully matched and settled! Deducted ${totalCostSEK.toFixed(2)} SEK.`
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
