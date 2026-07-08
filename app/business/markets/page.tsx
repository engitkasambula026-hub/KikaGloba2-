// app/business/markets/page.tsx
"use client";

import { useState } from "react";

export default function BusinessMarketsPage() {
  const [activeSegment, setActiveSegment] = useState("EAST_AFRICA");
  const [statusMessage, setStatusMessage] = useState("Status: Commodity Hub Online");

  // Simulated cross-border commodities and exchange parameters
  const marketIndices = [
    { id: 1, region: "EAST_AFRICA", asset: "SACCO Agriculture Pool", valuation: "32,450,000 UGX", trend: "▲ +4.2%" },
    { id: 2, region: "EAST_AFRICA", asset: "Mobile Money Liquidity Index", valuation: "12,800,000 KES", trend: "▲ +1.8%" },
    { id: 3, region: "DIASPORA_NODE", asset: "Cross-Border Trade Remit Flow", valuation: "$45,600 USD", trend: "▼ -0.5%" },
  ];

  return (
    <main style={{
      minHeight: "100vh", backgroundColor: "#0F172A", color: "#F8FAFC",
      padding: "40px 20px", fontFamily: "sans-serif", boxSizing: "border-box"
    }}>
      <div style={{ maxWidth: "650px", margin: "0 auto" }}>
        {/* Header Block Section */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#60A5FA", margin: "0 0 8px 0" }}>
            Kika Regional & Diaspora Markets
          </h1>
          <p style={{ fontSize: "14px", color: "#94A3B8", margin: "0" }}>
            Track live trade vectors, cross-border commerce matrices, and ecosystem liquidity channels.
          </p>
        </div>

        {/* Status Feedback Ledger Strip */}
        <div style={{
          backgroundColor: "#020617", border: "1px solid #1E293B", color: "#10B981",
          fontSize: "12px", padding: "10px", borderRadius: "10px", textAlign: "center",
          fontFamily: "monospace", marginBottom: "20px"
        }}>
          {statusMessage}
        </div>

        {/* Region Vector Toggle Tabs Array */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button
            onClick={() => { setActiveSegment("EAST_AFRICA"); setStatusMessage("Status: Viewing East Africa Nodes"); }}
            style={{
              flex: "1", padding: "10px", borderRadius: "8px", border: "1px solid #334155",
              fontWeight: "600", fontSize: "13px", cursor: "pointer",
              backgroundColor: activeSegment === "EAST_AFRICA" ? "#2563EB" : "#1E293B",
              color: activeSegment === "EAST_AF_RICA" ? "#FFF" : "#CBD5E1"
            }}
          >
            East Africa Corridor
          </button>
          <button
            onClick={() => { setActiveSegment("DIASPORA_NODE"); setStatusMessage("Status: Viewing Global Trunks"); }}
            style={{
              flex: "1", padding: "10px", borderRadius: "8px", border: "1px solid #334155",
              fontWeight: "600", fontSize: "13px", cursor: "pointer",
              backgroundColor: activeSegment === "DIASPORA_NODE" ? "#2563EB" : "#1E293B",
              color: activeSegment === "DIASPORA_NODE" ? "#FFF" : "#CBD5E1"
            }}
          >
            Diaspora Hub Vector
          </button>
        </div>

        {/* Live Market Tracker Grid Array */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {marketIndices
            .filter((item) => item.region === activeSegment)
            .map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: "#0B1528", border: "1px solid #1E293B",
                  padding: "16px", borderRadius: "12px", display: "flex",
                  justifyContent: "space-between", alignItems: "center"
                }}
              >
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "bold", color: "#F1F5F9" }}>{item.asset}</div>
                  <div style={{ fontSize: "11px", color: "#64748B", fontFamily: "monospace", marginTop: "2px" }}>
                    NODE VECTOR ACTIVE
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "15px", fontWeight: "bold", color: "#FFF", fontFamily: "monospace" }}>
                    {item.valuation}
                  </div>
                  <div style={{ fontSize: "12px", color: item.trend.includes("+") ? "#10B981" : "#EF4444", fontWeight: "600", marginTop: "2px" }}>
                    {item.trend}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
