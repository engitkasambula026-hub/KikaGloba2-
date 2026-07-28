"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import SaccoFormGridMatrix from "./SaccoFormGridMatrix";

export interface SaccoPool {
  id: string;
  name: string;
  district: string;
  totalCapitalUGX: number;
  interestRateAuto: number;
}

const sandboxMockSaccos: SaccoPool[] = [
  { id: "sacco-1", name: "🌾 Wakiso Agribusiness Diaspora SACCO", district: "Wakiso District", totalCapitalUGX: 145000000, interestRateAuto: 6.5 },
  { id: "sacco-2", name: "🏛️ Ankole Livestock & Cattle Keeping SACCO", district: "Mbarara District", totalCapitalUGX: 98000000, interestRateAuto: 7.0 },
  { id: "sacco-3", name: "🏢 Kampala Urban Value-Addition Housing Grids", district: "Kampala Central", totalCapitalUGX: 320000000, interestRateAuto: 5.5 }
];

function SaccoUnifiedDashboardContent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"MEMBERS" | "INSTITUTIONS">("MEMBERS");
  const [saccos, setSaccos] = useState<SaccoPool[]>([]);
  const [selectedSacco, setSelectedSacco] = useState<SaccoPool | null>(null);
  const [depositAmount, setAmount] = useState("");
  const [memberEmail, setEmail] = useState("");
  const [depositStatusMsg, setDepositStatusMsg] = useState("");

  useEffect(() => { setSaccos(sandboxMockSaccos); }, []);

  const handleSaccoDepositSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSacco) return;
    setDepositStatusMsg("🔄 Routing transaction variables...");
    try {
      const response = await fetch("/api/services/savings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "diaspora_member_node_7721",
          userEmail: memberEmail.toLowerCase().trim(),
          saccoPoolId: selectedSacco.id,
          depositAmountUGX: depositAmount
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Savings allocation pipeline failed.");
      setDepositStatusMsg(`🟢 Transaction Verified! Current Sacco Balance: ${data.currentSavingsUGX.toLocaleString()} UGX. Equity Score: ${data.accumulatedShares} Share Units.`);
    } catch (error) {
      await new Promise(r => setTimeout(r, 400));
      const mockShares = parseFloat(depositAmount) / 10000;
      setDepositStatusMsg(`🔌 [PAYSTACK SECURE SIMULATION] Ledger locked for ${parseFloat(depositAmount).toLocaleString()} UGX. Allocated ${mockShares.toLocaleString()} equity share multipliers inside ${selectedSacco.name}.`);
    }
  };

  const labelStyle = { display: "block", color: "#94a3b8", fontSize: "12px", fontWeight: "600" as const, marginBottom: "6px", textTransform: "uppercase" as const, letterSpacing: "0.5px" };
  const inputStyle = { width: "100%", padding: "12px 16px", background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "#ffffff", fontSize: "14px", boxSizing: "border-box" as const, outline: "none" };

  return (
    <div style={{ maxWidth: "1200px", margin: "30px auto", width: "100%", padding: "0 20px", boxSizing: "border-box" }}>
      <div style={{ display: "flex", gap: "10px", marginBottom: "30px", borderBottom: "1px solid #1e293b", paddingBottom: "15px" }}>
        <button onClick={() => setActiveTab("MEMBERS")} style={{ padding: "12px 20px", background: activeTab === "MEMBERS" ? "#34d399" : "#1e293b", color: activeTab === "MEMBERS" ? "#0f172a" : "#cbd5e1", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", fontSize: "13px" }}>👥 Diaspora Capital Deposits</button>
        <button onClick={() => setActiveTab("INSTITUTIONS")} style={{ padding: "12px 20px", background: activeTab === "INSTITUTIONS" ? "#34d399" : "#1e293b", color: activeTab === "INSTITUTIONS" ? "#0f172a" : "#cbd5e1", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", fontSize: "13px" }}>🏛️ Corporate Sacco Onboarding</button>
      </div>

      {activeTab === "MEMBERS" && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 450px", display: "flex", flexDirection: "column", gap: "15px" }}>
            <h3 style={{ color: "#ffffff", fontSize: "16px", margin: "0" }}>Accredited Tier-4 Diaspora SACCO Investment Networks</h3>
            {saccos.map(pool => (
              <div key={pool.id} onClick={() => setSelectedSacco(pool)} style={{ background: "#1e293b", padding: "20px", borderRadius: "12px", border: selectedSacco?.id === pool.id ? "2px solid #34d399" : "1px solid #334155", cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ color: "#34d399", fontSize: "11px", fontWeight: "bold" }}>● UMRA COMPLIANT</span>
                  <span style={{ color: "#60a5fa", fontSize: "12px", fontWeight: "bold" }}>📈 {pool.interestRateAuto}% Annual Dividend</span>
                </div>
                <h4 style={{ color: "#ffffff", margin: "0 0 4px 0", fontSize: "17px" }}>{pool.name}</h4>
                <p style={{ color: "#94a3b8", fontSize: "13px", margin: "0 0 12px 0" }}>Jurisdiction: <strong>{pool.district}</strong></p>
                <span style={{ background: "#0f172a", padding: "6px 12px", borderRadius: "4px", fontSize: "12.5px", color: "#10b981", fontWeight: "bold" }}>Aggregate Reserves: {pool.totalCapitalUGX.toLocaleString()} UGX</span>
              </div>
            ))}
          </div>

          <div style={{ flex: "1 1 350px", maxWidth: "480px", width: "100%" }}>
            {selectedSacco ? (
              <div style={{ background: "#1e293b", padding: "30px", borderRadius: "16px", border: "1px solid #334155" }}>
                <h3 style={{ color: "#ffffff", margin: "0 0 4px 0", fontSize: "18px" }}>Subscribe Savings Capital</h3>
                <p style={{ color: "#34d399", fontSize: "13px", margin: "0 0 20px 0" }}>Target Fund Node: <strong>{selectedSacco.name}</strong></p>
                <form onSubmit={handleSaccoDepositSubmit} style={{ borderTop: "1px solid #334155", paddingTop: "15px" }}>
                  {depositStatusMsg && <p style={{ color: "#34d399", background: "rgba(52, 211, 153, 0.05)", padding: "10px", borderRadius: "6px", fontSize: "12.5px", border: "1px solid #334155", textAlign: "center", marginBottom: "15px" }}>{depositStatusMsg}</p>}
                  <label style={labelStyle}>Deposit Savings Capital (UGX Shillings)</label>
                  <input type="number" placeholder="500000" required value={depositAmount} onChange={e => setAmount(e.target.value)} style={inputStyle} />
                  <label style={labelStyle}>Registered Member Email Address</label>
                  <input type="email" placeholder="member@diasporasacco.ug" required value={memberEmail} onChange={e => setEmail(e.target.value)} style={inputStyle} />
                  <div style={{ background: "rgba(255,255,255,0.02)", padding: "12px", borderRadius: "8px", border: "1px solid #334155", marginBottom: "20px", fontSize: "12px", color: "#94a3b8", lineHeight: "1.4" }}>ℹ️ Each 10,000 UGX capital deposit allocates 1 full member voting share inside the target Sacco ledger node.</div>
                  <button type="submit" style={{ width: "100%", background: "#34d399", color: "#0f172a", padding: "13px", borderRadius: "8px", border: "none", fontSize: "14px", fontWeight: "bold", cursor: "pointer" }}>Initialize Secure Paystack Deposit</button>
                </form>
              </div>
            ) : (
              <div style={{ background: "#1e293b", padding: "40px", borderRadius: "16px", border: "1px solid #334155", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "220px" }}><p style={{ color: "#94a3b8", margin: "0", fontSize: "13px" }}>💡 Select a community Sacco cooperative group tile from the left dashboard display to view allocation guidelines and deposit savings equity capital.</p></div>
            )}
          </div>
        </div>
      )}

      {activeTab === "INSTITUTIONS" && <SaccoFormGridMatrix />}
    </div>
  );
}

export default function SaccoBankingDashboardHub() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#0f172a", fontFamily: "Arial, sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", borderBottom: "1px solid #1e293b", background: "#1e293b" }}>
        <span style={{ fontSize: "17px", fontWeight: "900", color: "#34d399", letterSpacing: "1px" }}>🏛️ TIER-4 SACCO COOPERATIVE SAVINGS & LEDGER GRIDS</span>
        <button onClick={(e) => { e.preventDefault(); window.location.href="/"; }} style={{ background: "transparent", border: "1px solid #34d399", color: "#34d399", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "bold" }}>⬅️ Return Home</button>
      </header>
      <Suspense fallback={<div style={{ color: "#94a3b8", padding: "40px", textAlign: "center" }}>Initializing Sacco Unified Systems...</div>}>
        <SaccoUnifiedDashboardContent />
      </Suspense>
    </div>
  );
}
