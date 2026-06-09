"use client";

import React from "react";
import RemittanceForm from "../../components/RemittanceForm";

export default function SendMoneyPage() {
  const corporateMatrix = [
    { instrument: "USD (Global US Dollar)", buying: "3,680 UGX", selling: "3,740 UGX", channel: "Instant Bank/MoMo" },
    { instrument: "GBP (British Pound Sterling)", buying: "4,680 UGX", selling: "4,760 UGX", channel: "Instant Bank/MoMo" },
    { instrument: "EUR (European Union Union)", buying: "3,950 UGX", selling: "4,030 UGX", channel: "Instant Bank/MoMo" },
    { instrument: "KES (Kenya Shilling)", buying: "27.80 UGX", selling: "28.90 UGX", channel: "M-Pesa Express Node" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", padding: "40px 20px", color: "#1e293b", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        <button 
          onClick={() => { window.location.href = "/"; }} 
          style={{ background: "none", border: "none", color: "#2563eb", fontSize: "16px", fontWeight: "bold", cursor: "pointer", padding: "0", marginBottom: "25px" }}
        >
          ← Return to KIKA Global Homepage
        </button>
        
        <h1 style={{ fontSize: "38px", color: "#0f172a", marginBottom: "10px", fontWeight: "900", letterSpacing: "-0.5px" }}>
          🏦 Multi-Channel Capital Remittance Hub
        </h1>
        
        <p style={{ color: "#64748b", marginBottom: "40px", lineHeight: "1.6", maxWidth: "800px", fontSize: "16px" }}>
          Ecosystem gateway infrastructure linking global card holders, clearing banks, and regional mobile money operators directly to asset recipients and SACCO cooperative projects.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "4px", alignItems: "start" }}>
          
          <div style={{ paddingRight: "15px" }}>
            <RemittanceForm />
          </div>

          <div style={{ backgroundColor: "#ffffff", padding: "30px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)", border: "1px solid #e2e8f0" }}>
            <h3 style={{ marginTop: "0", marginBottom: "6px", color: "#0f172a", fontSize: "19px", fontWeight: "800" }}>
              📊 Live Liquidity & FX Settlement Desk
            </h3>
            <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "25px" }}>
              KIKA Global cross-border corridor conversion indexes updated real-time against central market clearers.
            </p>

            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e2e8f0", textAlign: "left", color: "#475569" }}>
                  <th style={{ padding: "12px 6px", fontWeight: "700" }}>Currency Node</th>
                  <th style={{ padding: "12px 6px", fontWeight: "700" }}>We Buy</th>
                  <th style={{ padding: "12px 6px", fontWeight: "700" }}>We Sell</th>
                  <th style={{ padding: "12px 6px", fontWeight: "700", textAlign: "right" }}>Network Latency</th>
                </tr>
              </thead>
              <tbody>
                {corporateMatrix.map((item, keyId) => (
                  <tr key={keyId} style={{ borderBottom: "1px solid #f1f5f9", color: "#334155" }}>
                    <td style={{ padding: "14px 6px", fontWeight: "600", color: "#0f172a" }}>{item.instrument}</td>
                    <td style={{ padding: "14px 6px", color: "#2563eb", fontWeight: "bold" }}>{item.buying}</td>
                    <td style={{ padding: "14px 6px", color: "#16a34a", fontWeight: "bold" }}>{item.selling}</td>
                    <td style={{ padding: "14px 6px", textAlign: "right", color: "#64748b", fontSize: "12px" }}>{item.channel}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: "25px", backgroundColor: "#fffbeb", padding: "15px", borderRadius: "10px", border: "1px solid #fef3c7", fontSize: "13px", color: "#92400e", lineHeight: "1.5" }}>
              ⚠️ <strong>Ecosystem Compliance Directive:</strong> To satisfy corporate anti-fraud mandates, capital transfers targeted directly to institutional SACCO share pools must execute via approved banking settlement channels only. Mobile clearing lines are subject to standard transaction limits.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}