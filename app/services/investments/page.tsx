"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface StockAsset {
  symbol: string;
  name: string;
  priceUSD: number;
  changePercent: number;
  statusTag: string;
}

export default function KikaInvestmentsHubPage() {
  const router = useRouter();
  const [marketTrends, setMarketAssets] = useState<StockAsset[]>([]);

  useEffect(() => {
    // Simulates live streaming trade recommendation ticker tickers pulled from global clearinghouse exchanges
    setMarketAssets([
      { symbol: "NVDA", name: "NVIDIA Corporation (AI Chips Core Node)", priceUSD: 132.40, changePercent: +4.82, statusTag: "🔥 STRONG BUY / HOT CAKE" },
      { symbol: "TSM", name: "Taiwan Semiconductor (Foundry Engine)", priceUSD: 174.10, changePercent: +3.15, statusTag: "📈 ACCUMULATING" },
      { symbol: "KIKA-AGRO", name: "KiKa Wakiso Agribusiness Processing Export", priceUSD: 25.00, changePercent: +12.40, statusTag: "💎 HIGH-YIELD COOPERATIVE" },
      { symbol: "BABA", name: "Alibaba Group Holding (Global Supply Chains)", priceUSD: 84.50, changePercent: -0.92, statusTag: "⚖️ STABLE REBOUND" }
    ]);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#0f172a", color: "#f8fafc", fontFamily: "sans-serif" }}>
      
      {/* HEADER MASTER CONTAINER */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 30px", backgroundColor: "#0b1528", borderBottom: "1px solid #1e293b" }}>
        <span style={{ fontSize: "16px", fontWeight: "900", color: "#3b82f6", letterSpacing: "1px" }}>📈 KIKA GLOBAL INVESTMENT & STOCK PORTAL</span>
        <button onClick={() => router.push("/")} style={{ background: "transparent", border: "1px solid #3b82f6", color: "#3b82f6", padding: "8px 16px", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", cursor: "pointer" }}>⬅️ Return to Main Hub</button>
      </header>

      {/* CENTRAL INFRASTRUCTURE SPACE */}
      <div style={{ flex: 1, maxWidth: "1200px", width: "100%", margin: "0 auto", padding: "30px 20px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "30px" }}>
        
        {/* INVESTMENT INTRO SUMMARY EXPLANATION BANNER */}
        <div style={{ background: "#1e293b", padding: "25px", borderRadius: "16px", border: "1px solid #334155" }}>
          <h2 style={{ margin: "0 0 8px 0", fontSize: "22px", color: "#ffffff" }}>Real-Time Global Exchange Follow-Up</h2>
          <p style={{ margin: 0, color: "#94a3b8", fontSize: "14px", lineHeight: "1.6" }}>
            Bridge your hard-earned diaspora capital trunks into high-performing international equities and certified sub-Saharan value-addition manufacturing cooperatives. Monitor spots, track bid spreads, and maximize return metrics securely through verified ledger settlement channels.
          </p>
        </div>

        {/* 🔮 STOCK TICKER EXCHANGE TRACKING BLOCKS ARRAY GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {marketTrends.map((stock) => (
            <div key={stock.symbol} style={{ background: "#0b1528", padding: "20px", borderRadius: "14px", border: "1px solid #1e293b", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontFamily: "monospace", fontSize: "18px", fontWeight: "bold", color: "#3b82f6" }}>{stock.symbol}</span>
                  <span style={{ fontSize: "11px", fontWeight: "bold", color: stock.changePercent > 0 ? "#10b981" : "#f87171", backgroundColor: "rgba(255,255,255,0.02)", padding: "4px 8px", borderRadius: "4px" }}>
                    {stock.changePercent > 0 ? `+${stock.changePercent}%` : `${stock.changePercent}%`}
                  </span>
                </div>
                <h4 style={{ color: "#ffffff", margin: "0 0 12px 0", fontSize: "14px", fontWeight: "600" }}>{stock.name}</h4>
              </div>
              <div>
                <div style={{ fontSize: "22px", fontWeight: "bold", color: "#ffffff", marginBottom: "8px" }}>${stock.priceUSD.toFixed(2)} <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "normal" }}>USD</span></div>
                <div style={{ fontSize: "11px", fontWeight: "bold", color: "#fbbf24", borderTop: "1px solid #1e293b", paddingTop: "8px", textTransform: "uppercase" }}>{stock.statusTag}</div>
              </div>
            </div>
          ))}
        </div>

        {/* EDUCATIONAL CASE EXAMPLE CALCULATION CARD ROW */}
        <div style={{ background: "#1e293b", padding: "25px", borderRadius: "16px", border: "1px solid #334155" }}>
          <h3 style={{ margin: "0 0 12px 0", fontSize: "16px", color: "#3b82f6", fontWeight: "bold", textTransform: "uppercase" }}>Example Yield Calculations: Buying & Selling to the Highest Bidder</h3>
          <p style={{ margin: "0 0 16px 0", color: "#cbd5e1", fontSize: "13.5px", lineHeight: "1.5" }}>
            When an investor backs a hot cake stock asset (e.g., <strong>KIKA-AGRO</strong>) at a base valuation and liquidates it when value-addition outputs peak, the profit accounting maps natively into cash expansion accounts:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "15px", background: "#0f172a", padding: "20px", borderRadius: "10px", border: "1px solid #334155" }}>
            <div><span style={{ display: "block", color: "#94a3b8", fontSize: "11px" }}>1. INITIAL ALLOCATION</span><strong>$5,000 USD Capital</strong><small style={{ display: "block", color: "#94a3b8" }}>Purchased at $10.00 base rate</small></div>
            <div><span style={{ display: "block", color: "#94a3b8", fontSize: "11px" }}>2. MAXIMUM MARKET BID</span><strong>$25.00 USD per Token</strong><small style={{ display: "block", color: "#94a3b8" }}>Asset appreciation peak value</small></div>
            <div><span style={{ display: "block", color: "#94a3b8", fontSize: "11px" }}>3. EXPANSION CASH OUT</span><strong style={{ color: "#10b981" }}>$12,500 Gross Liquidation</strong><small style={{ display: "block", color: "#10b981" }}>Capital fully pulled from exchange</small></div>
            <div><span style={{ display: "block", color: "#94a3b8", fontSize: "11px" }}>4. NET LEDGER GAIN</span><strong style={{ color: "#3b82f6" }}>+$7,500 Cash Net Profit</strong><small style={{ display: "block", color: "#3b82f6" }}>150% ROI Yield logged to wallet</small></div>
          </div>
        </div>

      </div>
    </div>
  );
}
