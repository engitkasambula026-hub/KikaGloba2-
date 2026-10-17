"use client";

import React, { useState, useEffect } from "react";

interface LiveTickerData {
  ticker: string;
  currentBuyUSD: string;
  currentSellUSD: string;
  trend: string;
}

export default function LiveMarketTicker() {
  const [tickerMetrics, setTickerMetrics] = useState<LiveTickerData[]>([]);

  const streamLiveMarketUpdates = async () => {
    try {
      const res = await fetch("/api/route?action=FETCH_LIVE_MARKET_TICKERS");
      const data = await res.json();
      if (data.success && data.tickers) {
        setTickerMetrics(data.tickers);
      }
    } catch (err) {
      console.error("Market data pipeline error:", err);
    }
  };

  useEffect(() => {
    // Launch the financial circuit instantly on component layout mount
    streamLiveMarketUpdates();

    // ⏱️ AUTOMATED STRATEGIC STREAMING INTERVAL: Hot-reloads live global data feeds every 4 seconds flat
    const streamingInterval = setInterval(() => {
      streamLiveMarketUpdates();
    }, 4000);

    return () => clearInterval(streamingInterval);
  }, []);

  if (tickerMetrics.length === 0) {
    return (
      <div style={{ background: "#020617", borderBottom: "1px solid #334155", padding: "10px 20px", color: "#64748b", fontSize: "11px", fontWeight: "bold", fontFamily: "monospace", textAlign: "center" }}>
        📡 INTERCEPTING LIVE COMMODITY STREAM CHANNELS FROM GLOBAL PIPELINES...
      </div>
    );
  }

  return (
    <div style={{ background: "#020617", borderBottom: "1px solid #334155", padding: "10px 20px", display: "flex", overflowX: "auto", gap: "30px", whiteSpace: "nowrap", boxSizing: "border-box" }}>
      <div style={{ display: "flex", gap: "24px", color: "#94a3b8", fontSize: "11px", fontWeight: "bold", fontFamily: "monospace", alignItems: "center" }}>
        <span style={{ color: "#34d399", position: "relative", display: "inline-flex", paddingRight: "4px" }}>
          ⚡ LIVE MARKET CORRIDORS:
        </span>
        
        {tickerMetrics.map((item) => {
          const isUp = item.trend === "▲";
          const trendColor = isUp ? "#10b981" : "#ef4444";
          
          return (
            <div key={item.ticker} style={{ display: "inline-flex", gap: "6px", alignItems: "center", backgroundColor: "#0b1528", padding: "4px 8px", borderRadius: "4px", border: "1px solid #1e293b" }}>
              <span style={{ color: "#ffffff" }}>{item.ticker.replace("COM-", "").replace("STK-", "")}</span>
              <span style={{ color: "#cbd5e1" }}>\${item.currentBuyUSD}</span>
              <span style={{ color: trendColor, fontWeight: "900" }}>{item.trend}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
