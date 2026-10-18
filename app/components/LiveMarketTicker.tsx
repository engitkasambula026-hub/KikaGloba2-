"use client";

import React, { useState, useEffect } from "react";

interface LiveTickerData {
  ticker: string;
  currentBuyUSD: number;
  currentSellUSD: number;
  trend: string;
}

export default function LiveMarketTicker() {
  // Initialize immediately with solid benchmark numbers to ensure the UI NEVER renders a blank row
  const [tickerMetrics, setTickerMetrics] = useState<LiveTickerData[]>([
    { ticker: "UG-VAN-06", currentBuyUSD: 245.00, currentSellUSD: 255.50, trend: "▲" },
    { ticker: "UG-COF-02", currentBuyUSD: 148.50, currentSellUSD: 152.00, trend: "▲" },
    { ticker: "US-TECH-01", currentBuyUSD: 342.20, currentSellUSD: 358.90, trend: "▲" },
    { ticker: "JP-ELEC-02", currentBuyUSD: 177.00, currentSellUSD: 182.40, trend: "▼" },
    { ticker: "ME-CRU-05", currentBuyUSD: 840.00, currentSellUSD: 865.00, trend: "▲" }
  ]);

  useEffect(() => {
    // ⏱️ CLIENT-SIDE FINANCIAL CIRCUITS POLLING AUTOMATION
    const streamingInterval = setInterval(() => {
      setTickerMetrics((prevMetrics) =>
        prevMetrics.map((item) => {
          // Generates a mild randomized variance between -$0.80 and +$0.80 to mimic live open auction boards
          const variance = (Math.random() - 0.5) * 1.6;
          const nextBuy = Math.max(10, item.currentBuyUSD + variance);
          // Maintain a clean, logical bid-ask spread margin spacing layer
          const nextSell = nextBuy + (item.currentSellUSD - item.currentBuyUSD);
          
          return {
            ticker: item.ticker,
            currentBuyUSD: parseFloat(nextBuy.toFixed(2)),
            currentSellUSD: parseFloat(nextSell.toFixed(2)),
            trend: variance > 0 ? "▲" : "▼"
          };
        })
      );
    }, 4000); // Triggers automated asset price recalculations every 4 seconds flat

    return () => clearInterval(streamingInterval);
  }, []);

  return (
    <div style={{ backgroundColor: "#020617", borderBottom: "1px solid #334155", padding: "12px 20px", display: "flex", overflowX: "auto", gap: "30px", whiteSpace: "nowrap", width: "100%", boxSizing: "border-box", zIndex: 20 }}>
      <div style={{ display: "flex", gap: "24px", color: "#94a3b8", fontSize: "11px", fontWeight: "bold", fontFamily: "monospace", alignItems: "center" }}>
        <span style={{ color: "#34d399", fontWeight: "900", letterSpacing: "0.5px" }}>⚡ LIVE CORRIDOR STATS:</span>
        
        {tickerMetrics.map((item) => {
          const isUp = item.trend === "▲";
          const trendColor = isUp ? "#10b981" : "#ef4444";
          
          return (
            <div key={item.ticker} style={{ display: "inline-flex", gap: "6px", alignItems: "center", backgroundColor: "#0b1528", padding: "4px 10px", borderRadius: "6px", border: "1px solid #1e293b" }}>
              <span style={{ color: "#ffffff" }}>{item.ticker}</span>
              <span style={{ color: "#cbd5e1" }}>\${item.currentBuyUSD.toFixed(2)}</span>
              <span style={{ color: trendColor, fontWeight: "900" }}>{item.trend}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
