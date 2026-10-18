import { NextResponse } from "next/server";

export async function GET() {
  try {
    const variance = () => (Math.random() - 0.5) * 2; // Simulates real-time market volatility parameters
    
    const liveTickers = [
      { ticker: "UG-VAN-06", currentBuyUSD: (245.00 + variance()).toFixed(2), currentSellUSD: (255.50 + variance()).toFixed(2), trend: variance() > 0 ? "▲" : "▼" },
      { ticker: "UG-COF-02", currentBuyUSD: (148.50 + variance() * 0.5).toFixed(2), currentSellUSD: (152.00 + variance() * 0.5).toFixed(2), trend: variance() > 0 ? "▲" : "▼" },
      { ticker: "US-TECH-01", currentBuyUSD: (342.20 + variance() * 3).toFixed(2), currentSellUSD: (358.90 + variance() * 3).toFixed(2), trend: variance() > 0 ? "▲" : "▼" },
      { ticker: "JP-ELEC-02", currentBuyUSD: (177.00 + variance()).toFixed(2), currentSellUSD: (182.40 + variance()).toFixed(2), trend: variance() > 0 ? "▲" : "▼" },
      { ticker: "ME-CRU-05", currentBuyUSD: (840.00 + variance() * 5).toFixed(2), currentSellUSD: (865.00 + variance() * 5).toFixed(2), trend: variance() > 0 ? "▲" : "▼" }
    ];

    return NextResponse.json({ success: true, tickers: liveTickers }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
