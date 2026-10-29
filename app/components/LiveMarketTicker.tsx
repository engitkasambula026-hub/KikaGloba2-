"use client";

import React, { useState, useEffect } from "react";

interface LiveTickerData {
  ticker: string;
  name: string;
  category: string;
  country: string;
  currentBuyUSD: number;
  trend: string;
}

// 🎛️ PROP Blueprints: Enforces strict data synchronization from your page filter inputs
interface TickerProps {
  selectedCategory: string;
  selectedCountry: string;
}

export default function LiveMarketTicker({ selectedCategory, selectedCountry }: TickerProps) {
  // Master Financial Ledger Core Data Matrix Array
  const [masterMetrics, setMasterMetrics] = useState<LiveTickerData[]>([
    { ticker: "STK-US-TECH-01", name: "Silicon Valley AI Cluster", category: "TECHNOLOGY", country: "USA", currentBuyUSD: 342.20, trend: "▲" },
    { ticker: "STK-JP-ELEC-02", name: "Automotive Robotics & Next-Gen", category: "ELECTRONICS", country: "Japan", currentBuyUSD: 177.00, trend: "▼" },
    { ticker: "STK-IN-SOFT-03", name: "Enterprise Software Clearing", category: "TECHNOLOGY", country: "India", currentBuyUSD: 91.50, trend: "▲" },
    { ticker: "STK-EU-IND-04", name: "Automated Heavy Machinery", category: "INDUSTRIAL", country: "Europe", currentBuyUSD: 512.00, trend: "▲" },
    { ticker: "STK-ME-CRU-05", name: "Strategic Downstream Petroleum", category: "OIL_GAS", country: "Middle East", currentBuyUSD: 840.00, trend: "▼" },
    { ticker: "COM-UG-VAN-06", name: "Premium Organic Vanilla Nodes", category: "AGRICULTURE", country: "Uganda", currentBuyUSD: 245.00, trend: "▲" }
  ]);

  useEffect(() => {
    // ⏱️ REAL-TIME STREAMING POLLING INTERVAL: Fluctuate stock numbers natively every 4 seconds
    const globalMarketClock = setInterval(() => {
      setMasterMetrics((prevMetrics) =>
        prevMetrics.map((item) => {
          const variance = (Math.random() - 0.5) * 1.8;
          const nextPrice = Math.max(10, item.currentBuyUSD + variance);
          return {
            ...item,
            currentBuyUSD: parseFloat(nextPrice.toFixed(2)),
            trend: variance > 0 ? "▲" : "▼"
          };
        })
      );
    }, 4000);

    return () => clearInterval(globalMarketClock);
  }, []);

  // 🦾 INTELLIGENT MULTILATERAL ROUTING FILTER: Intercepts dropdown positions on the fly
  const dynamicFilteredTicker = masterMetrics.filter((item) => {
    const categoryMatch = selectedCategory === "ALL" || item.category === selectedCategory;
    const countryMatch = selectedCountry === "ALL" || item.country === selectedCountry;
    return categoryMatch && countryMatch;
  });

  return (
    <div style={{ backgroundColor: "#020617", borderBottom: "1px solid #334155", padding: "12px 20px", display: "flex", overflowX: "auto", gap: "30px", whiteSpace: "nowrap", width: "100%", boxSizing: "border-box", zIndex: 20 }}>
      <div style={{ display: "flex", gap: "24px", color: "#94a3b8", fontSize: "11px", fontWeight: "bold", fontFamily: "monospace", alignItems: "center" }}>
        
        {/* Dynamic Context Header String */}
        <span style={{ color: "#34d399", fontWeight: "900", textTransform: "uppercase" }}>
          ⚡ KIKA EXCHANGE STREAM ({selectedCountry === "ALL" ? "GLOBAL" : selectedCountry} • {selectedCategory === "ALL" ? "ALL SECTORS" : selectedCategory}):
        </span>
        
        {dynamicFilteredTicker.length === 0 ? (
          <span style={{ color: "#475569", fontStyle: "italic" }}>[ No active open auction tickers found inside this corridor segment ]</span>
        ) : (
          dynamicFilteredTicker.map((item) => {
            const isUp = item.trend === "▲";
            const trendColor = isUp ? "#10b981" : "#ef4444";
            
            return (
              <div key={item.ticker} style={{ display: "inline-flex", gap: "6px", alignItems: "center", backgroundColor: "#0b1528", padding: "4px 10px", borderRadius: "6px", border: "1px solid #1e293b", transition: "all 0.3s ease" }}>
                <span style={{ color: "#64748b" }}>{item.country}</span>
                <span style={{ color: "#ffffff" }}>{item.ticker.split("-")[2] || item.ticker}</span>
                <span style={{ color: "#cbd5e1" }}>\${item.currentBuyUSD.toFixed(2)}</span>
                <span style={{ color: trendColor, fontWeight: "900" }}>{item.trend}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
