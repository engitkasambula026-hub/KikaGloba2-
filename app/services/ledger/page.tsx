"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuditLogLine {
  id: string;
  reference: string;
  type: string;
  amountUGX: number;
  status: string;
  createdAt: string;
  notes: string;
}

export default function KikaProductionLedgerPage() {
  const router = useRouter();
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [saccoShares, setSaccoShares] = useState<number>(0);
  const [escrowReserves, setEscrowReserves] = useState<number>(0);
  const [auditTrail, setAuditTrail] = useState<AuditLogLine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function pullLiveLedgerMetrics() {
      try {
        // Fetches your automated transaction data straight from your database route handler
        const res = await fetch("/api/services/ledger");
        const data = await res.json();
        
        if (res.ok) {
          setWalletBalance(data.walletBalance || 0);
          setSaccoShares(data.saccoShares || 0);
          setEscrowReserves(data.escrowReserves || 0);
          setAuditTrail(data.auditTrail || []);
        }
      } catch (err) {
        console.error("Ledger background sync exception:", err);
      } finally {
        setLoading(false);
      }
    }
    pullLiveLedgerMetrics();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#0f172a", color: "#f8fafc", fontFamily: "sans-serif" }}>
      
      {/* LEDGER COMPONENT CORPORATE NAVIGATION HEADER */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 30px", backgroundColor: "#0b1528", borderBottom: "1px solid #1e293b" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "20px" }}>📊</span>
          <span style={{ fontSize: "16px", fontWeight: "900", color: "#10b981", letterSpacing: "1px" }}>KIKA SOVEREIGN ACCOUNT STATEMENT LEDGER</span>
        </div>
        <button onClick={() => router.push("/")} style={{ background: "transparent", border: "1px solid #3b82f6", color: "#3b82f6", padding: "8px 16px", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", cursor: "pointer", transition: "0.2s" }}>⬅️ Return to Main Hub</button>
      </header>

      {/* CENTRAL INFRASTRUCTURE SPACE */}
      <div style={{ flex: 1, maxWidth: "1200px", width: "100%", margin: "0 auto", padding: "30px 20px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "25px" }}>
        
        {/* SUMMARY METRICS BLOCK CARDS GRID ROW */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          
          {/* CARD 1: RUNNING WALLET BALANCE */}
          <div style={{ background: "#1e293b", padding: "24px", borderRadius: "14px", border: "1px solid #334155", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "bold", textTransform: "uppercase" }}>Available Wallet Capital</span>
              <h2 style={{ fontSize: "28px", color: "#ffffff", margin: "6px 0 0 0", fontWeight: "800" }}>
                {loading ? "Syncing..." : `${walletBalance.toLocaleString()} UGX`}
              </h2>
            </div>
            <div style={{ fontSize: "11px", color: "#10b981", marginTop: "15px", fontWeight: "600" }}>● Clear Settlement Channel Active</div>
          </div>

          {/* CARD 2: COOPERATIVE SACCO SHARES */}
          <div style={{ background: "#1e293b", padding: "24px", borderRadius: "14px", border: "1px solid #334155", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "bold", textTransform: "uppercase" }}>Accumulated Co-op Sacco Shares</span>
              <h2 style={{ fontSize: "28px", color: "#3b82f6", margin: "6px 0 0 0", fontWeight: "800" }}>
                {loading ? "Syncing..." : `${saccoShares.toFixed(2)} Units`}
              </h2>
            </div>
            <div style={{ fontSize: "11px", color: "#3b82f6", marginTop: "15px", fontWeight: "600" }}>📈 Valuation Tier: 1 Share per 10k UGX Allocation</div>
          </div>

          {/* CARD 3: ESCROW STATUTORY RESERVES */}
          <div style={{ background: "#1e293b", padding: "24px", borderRadius: "14px", border: "1px solid #334155", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "bold", textTransform: "uppercase" }}>Trust Escrow Buffer Protection</span>
              <h2 style={{ fontSize: "28px", color: "#eab308", margin: "6px 0 0 0", fontWeight: "800" }}>
                {loading ? "Syncing..." : `${escrowReserves.toLocaleString()} UGX`}
              </h2>
            </div>
            <div style={{ fontSize: "11px", color: "#eab308", marginTop: "15px", fontWeight: "600" }}>🔒 25% Automated Compliance Hold Protected</div>
          </div>

        </div>

        {/* IMMUTABLE TRANSACTION AUDIT STATEMENT GRID SHEET */}
        <div style={{ background: "#0b1528", padding: "25px", borderRadius: "16px", border: "1px solid #1e293b" }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", color: "#ffffff", fontWeight: "bold" }}>Immutable Ledger Transaction History Trail</h3>
          
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8", fontFamily: "monospace" }}>Re-assembling binary financial block registers...</div>
          ) : auditTrail.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#64748b", fontSize: "14px", border: "1px dashed #1e293b", borderRadius: "8px" }}>
              📭 Zero Transaction Footprints Recorded. Initialize a Remittance or Sacco Deposit form loop to populate data.
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #1e293b", color: "#94a3b8" }}>
                    <th style={{ padding: "12px" }}>TIMESTAMP</th>
                    <th style={{ padding: "12px" }}>REFERENCE LINK CODE</th>
                    <th style={{ padding: "12px" }}>CORRIDOR CORRIDOR TRANSACTION ACTION</th>
                    <th style={{ padding: "12px", textAlign: "right" }}>VALUE AMOUNT</th>
                    <th style={{ padding: "12px", textAlign: "center" }}>LINE STATE STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {auditTrail.map((tx) => (
                    <tr key={tx.id} style={{ borderBottom: "1px solid #1e293b", color: "#cbd5e1" }}>
                      <td style={{ padding: "12px", fontFamily: "monospace" }}>{tx.createdAt}</td>
                      <td style={{ padding: "12px", fontFamily: "monospace", color: "#3b82f6" }}>{tx.reference}</td>
                      <td style={{ padding: "12px" }}>
                        <div><strong>{tx.type.replace("_", " ")}</strong></div>
                        <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}>{tx.notes}</div>
                      </td>
                      <td style={{ padding: "12px", textAlign: "right", color: "#10b981", fontWeight: "bold" }}>+{tx.amountUGX.toLocaleString()} UGX</td>
                      <td style={{ padding: "12px", textAlign: "center" }}>
                        <span style={{ fontSize: "11px", fontWeight: "bold", background: "rgba(16, 185, 129, 0.05)", color: "#10b981", padding: "4px 8px", borderRadius: "4px", border: "1px solid rgba(16, 185, 129, 0.1)" }}>{tx.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
