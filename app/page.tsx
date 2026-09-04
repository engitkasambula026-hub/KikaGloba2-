"use client";

import React, { useState, useEffect } from "react";

export interface Option { id: string; name: string; description: string; }
export interface Category { categoryName: string; options: Option[]; }

export const fullEcosystemMenu: Category[] = [
  { 
    categoryName: "Registering Hub", 
    options: [
      { id: "reg-m", name: "Diaspora Membership Enrollment", description: "Profile setup." }, 
      { id: "reg-s", name: "Sacco Corporate Grouping", description: "Initialize asset pooling." }
    ] 
  },
  { 
    categoryName: "Financial Hub Services", 
    options: [
      { id: "fin-w", name: "Available Wallet Capital", description: "Real-time ledger overview." }, 
      { id: "fin-s", name: "Cooperative Sacco Shares", description: "Automated share trackers." },
      { id: "fin-e", name: "Trust Escrow Reserves", description: "Automated compliance shields." }
    ] 
  },
  { 
    categoryName: "Business & Commerce", 
    options: [
      { id: "biz-t", name: "Cross-Border Trade Matrix Corridor", description: "Freight customs router tracking custom checkpoint cargo manifests." }
    ] 
  },
  { 
    categoryName: "Ecosystem Portals", 
    options: [
      { id: "port-v", name: "Low-Tariff Full-Duplex VoIP Link", description: "WebRTC audio streaming carrier voice tunnels." }
    ] 
  }
];

export default function KikaStagingMatrixHub() {
  const [mounted, setMounted] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activePanel, setActivePanel] = useState<string>("WELCOME_OVERVIEW");

  // Aligned Form State Models
  const [passportNum, setPassportNum] = useState("");
  const [hostCountry, setHostCountry] = useState("United Kingdom");
  const [saccoName, setSaccoName] = useState("");
  const [voipSeatA, setVoipSeatA] = useState("PHONE_A");
  const [voipSeatB, setVoipSeatB] = useState("PHONE_B");
  const [voipStatus, setVoipStatus] = useState("SWITCHBOARD_IDLE");
  const [remitAmount, setRemitAmount] = useState("150000");
  const [remitTarget, setRemitTarget] = useState("");
  const [remitLogs, setRemitLogs] = useState<string[]>(["Ledger baseline active."]);

  useEffect(() => { setMounted(true); }, []);

  const handleDropdownSelectionIntercept = (opt: Option) => {
    setActiveDropdown(null);
    if (opt.id === "reg-m") setActivePanel("ASSET_REGISTRY");
    else if (opt.id === "reg-s") setActivePanel("SACCO_SAVINGS");
    else if (opt.id.startsWith("fin")) setActivePanel("REMITTANCE_LEDGER");
    else if (opt.id === "port-v") setActivePanel("VOIP_TRUNK");
    else if (opt.id.startsWith("biz")) setActivePanel("COMMERCE_MATRIX");
  };

  if (!mounted) return <div style={{ minHeight: "100vh", backgroundColor: "#020617", color: "#10b981", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "monospace" }}>🔒 LOADING VAULT ARCHITECTURE...</div>;
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#020617", color: "#f8fafc", fontFamily: "sans-serif", padding: "20px" }} onClick={() => setActiveDropdown(null)}>
      
      {/* 🌍 1. PROPORTIONAL FLEX DROPDOWN NAVBAR HEADER CONTAINER */}
      <nav style={{ backgroundColor: "#0b1528", borderBottom: "1px solid #1e293b", padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: "8px", marginBottom: "20px", position: "relative", zIndex: 100 }} onClick={e => e.stopPropagation()}>
        <div style={{ fontWeight: "900", color: "#10b981", cursor: "pointer", fontSize: "16px" }} onClick={() => setActivePanel("WELCOME_OVERVIEW")}>🌍 KIKA GLOBAL VENTURES</div>
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          {fullEcosystemMenu.map((cat, idx) => (
            <div key={idx} style={{ position: "relative" }}>
              <button onClick={() => setActiveDropdown(activeDropdown === cat.categoryName ? null : cat.categoryName)} style={{ background: "transparent", border: "none", color: activeDropdown === cat.categoryName ? "#10b981" : "#cbd5e1", fontWeight: "bold", cursor: "pointer", fontSize: "14px", padding: "8px" }}>{cat.categoryName} ▼</button>
              {activeDropdown === cat.categoryName && (
                <div style={{ position: "absolute", top: "100%", left: 0, backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px", minWidth: "280px", padding: "8px 0", zIndex: 999, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)" }}>
                  {cat.options.map((opt, oIdx) => (
                    <button key={oIdx} onClick={() => handleDropdownSelectionIntercept(opt)} style={{ width: "100%", textAlign: "left", padding: "10px 20px", background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "13px", display: "block" }}>{opt.name}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ color: "#10b981", fontSize: "11px", fontWeight: "bold", fontFamily: "monospace", background: "rgba(16, 185, 129, 0.1)", padding: "6px 12px", borderRadius: "4px" }}>UN-GATED HUB MODE</div>
      </nav>

      <header style={{ maxWidth: "800px", margin: "0 auto 30px auto", padding: "20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "900", color: "#ffffff", letterSpacing: "-0.5px" }}>Cross-Border Diaspora Automation Ecosystem</h1>
        <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: "1.6" }}>A decentralized financial and telecommunications matrix tailored for sub-Saharan diaspora communities. Seamlessly uniting low-tariff full-duplex VoIP lines, automated mobile wallet remittances, and un-splittable cooperative Sacco savings registers.</p>
      </header>

      {/* 🔐 2. CENTRAL RESPONSIVE WORKSPACE VAULT HOUSING GRID */}
      <main style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "30px" }}>
        
        {activePanel === "WELCOME_OVERVIEW" && (
          <section style={{ background: "#0b1329", padding: "40px", borderRadius: "12px", border: "1px dashed #334155", textAlign: "center" }}>
            <h2 style={{ color: "#10b981", margin: "0 0 10px 0" }}>⚡ Welcome to the KiKa Dashboard</h2>
            <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.5" }}>All features are currently set to **un-gated simulation staging mode**. Click any option inside the top dropdown folders to instantly swap workspace screens and test your original layout forms live on the screen!</p>
          </section>
        )}

        {/* INTERFACE A: DIASPORA NATIONAL ASSET INTAKE FORM */}
        {activePanel === "ASSET_REGISTRY" && (
          <section style={{ backgroundColor: "#0f172a", padding: "25px", borderRadius: "12px", border: "#10b981 1px solid" }}>
            <h3 style={{ color: "#ffffff", fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>📝 Diaspora National Asset Registration & Intake Form</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
              <input type="text" placeholder="Enter Passport/ID Details" value={passportNum} onChange={e => setPassportNum(e.target.value)} style={{ padding: "12px", background: "#020617", border: "1px solid #1e293b", borderRadius: "6px", color: "#fff", outline: "none" }} />
              <select value={hostCountry} onChange={e => setHostCountry(e.target.value)} style={{ padding: "12px", background: "#020617", border: "1px solid #1e293b", borderRadius: "6px", color: "#fff", outline: "none" }}>
                <option value="United Kingdom">United Kingdom (UK Node)</option>
                <option value="United States">United States (USA Node)</option>
                <option value="Uganda">Uganda (EAF Node)</option>
              </select>
            </div>
            <button onClick={() => alert("🟢 Fields committed successfully to Neon SQL Ledger!")} style={{ width: "100%", padding: "12px", backgroundColor: "#10b981", border: "none", borderRadius: "6px", color: "#020617", fontWeight: "bold", cursor: "pointer" }}>Commit Profile Registry Fields to Neon SQL Ledger</button>
          </section>
        )}

        {/* INTERFACE B: COOPERATIVE SACCO SAVINGS PORTAL */}
        {activePanel === "SACCO_SAVINGS" && (
          <section style={{ backgroundColor: "#0f172a", padding: "25px", borderRadius: "12px", border: "1px solid #1e293b" }}>
            <h3 style={{ color: "#ffffff", fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>👥 Sacco Cooperative Savings Registration Portal</h3>
            <input type="text" placeholder="Enter Cooperative Group Corporate Name" value={saccoName} onChange={e => setSaccoName(e.target.value)} style={{ width: "100%", padding: "12px", background: "#020617", border: "1px solid #1e293b", borderRadius: "6px", color: "#fff", marginBottom: "15px", outline: "none" }} />
            <button onClick={() => alert("🟢 Sacco Shielding Registry Initialized!")} style={{ width: "100%", padding: "12px", backgroundColor: "#3b82f6", border: "none", borderRadius: "6px", color: "#fff", fontWeight: "bold", cursor: "pointer" }}>Initialize Multi-Signatory Sacco Shielding Registry</button>
          </section>
        )}

        {/* INTERFACE C: WebRTC DUAL FREQUENCY VOICE CONNECTOR SWITCHBOARD */}
        {activePanel === "VOIP_TRUNK" && (
          <section style={{ backgroundColor: "#0f172a", padding: "25px", borderRadius: "12px", border: "1px solid #1e293b" }}>
            <h3 style={{ color: "#ffffff", fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>🎙️ Low-Tariff Full-Duplex VoIP Call Switchboard Control Grid</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
              <input type="text" value={voipSeatA} onChange={e => setVoipSeatA(e.target.value)} style={{ padding: "12px", background: "#020617", border: "1px solid #1e293b", borderRadius: "6px", color: "#fff", outline: "none" }} />
              <input type="text" value={voipSeatB} onChange={e => setVoipSeatB(e.target.value)} style={{ padding: "12px", background: "#020617", border: "1px solid #1e293b", borderRadius: "6px", color: "#fff", outline: "none" }} />
            </div>
            <button onClick={() => { setVoipStatus("CONNECTING_CIRCUITS..."); setTimeout(() => setVoipStatus("CIRCUITS_LIVE_STREAMING_PCM"), 1000); }} style={{ width: "100%", padding: "12px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", marginBottom: "12px" }}>Initialize Calling Trunk Sockets</button>
            <div style={{ background: "#020617", padding: "10px", borderRadius: "6px", border: "1px solid #1e293b", fontSize: "12px", fontFamily: "monospace", color: "#10b981" }}>STATUS: {voipStatus}</div>
          </section>
        )}

        {/* INTERFACE D: FINANCIAL HUB - REMITTANCE BALANCES & LIQUIDITY MATRIX */}
        {activePanel === "REMITTANCE_LEDGER" && (
          <section style={{ backgroundColor: "#0f172a", padding: "25px", borderRadius: "12px", border: "1px solid #1e293b" }}>
            <h3 style={{ color: "#ffffff", fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>💳 Send-Money Remittance & Wallet Liquidity Core</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
              <input type="number" value={remitAmount} onChange={e => setRemitAmount(e.target.value)} style={{ padding: "12px", background: "#020617", border: "1px solid #1e293b", borderRadius: "6px", color: "#fff", outline: "none" }} />
              <input type="text" placeholder="e.g. +256 770 000 000" value={remitTarget} onChange={e => setRemitTarget(e.target.value)} style={{ padding: "12px", background: "#020617", border: "1px solid #1e293b", borderRadius: "6px", color: "#fff", outline: "none" }} />
            </div>
            <button onClick={() => { if (!remitTarget) { alert("❌ Missing target phone line."); return; } setRemitLogs([...remitLogs, `Dispatched ${remitAmount} UGX to target mobile number ${remitTarget}.`]); }} style={{ width: "100%", padding: "12px", backgroundColor: "#10b981", border: "none", borderRadius: "6px", color: "#020617", fontWeight: "bold", cursor: "pointer", marginBottom: "15px" }}>Execute Remittance Transfer Validation Loop</button>
            <div style={{ background: "#020617", padding: "10px", borderRadius: "6px", border: "1px solid #1e293b", fontSize: "12px", fontFamily: "monospace" }}>
              {remitLogs.map((log, i) => <div key={i} style={{ color: "#10b981" }}>• {log}</div>)}
            </div>
          </section>
        )}

        {/* INTERFACE E: BUSINESS COMMERCE FREIGHT CUSTOMS FREIGHT ROADS */}
        {activePanel === "COMMERCE_MATRIX" && (
          <section style={{ backgroundColor: "#0f172a", padding: "25px", borderRadius: "12px", border: "1px solid #1e293b" }}>
            <h3 style={{ color: "#ffffff", fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>💼 Cross-Border Commerce Manifests & Customs Checkpoints</h3>
            <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "15px" }}>B2B Freight logistics matrices tracking cellular and transport border clearance coordinates.</p>
            <div style={{ background: "#020617", padding: "20px", borderRadius: "8px", border: "1px solid #1e293b", textAlign: "center", color: "#10b981", fontWeight: "bold", fontFamily: "monospace" }}>📦 B2B SUBAHRAN ROUTING ACTIVE • MALABA FREIGHT STATION SYNCED PASSED</div>
          </section>
        )}
      </main>

      <footer style={{ backgroundColor: "#0b1528", textAlign: "center", padding: "20px", color: "#64748b", fontSize: "12px", borderTop: "1px solid #1e293b", marginTop: "40px", borderRadius: "8px" }}>
        KiKa Global Ventures Staging Infrastructure • NITA-U Secured Framework Compliance © 2026
      </footer>
    </div>
  );
}

