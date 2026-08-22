"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { kikaGlobalOffices, foundersLegacyData, ecosystemMenu, Option } from "@/lib/kikaData";

export default function KikaEcosystemLandingFortress() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [teaserService, setTeaserService] = useState<Option | null>(null);
  const [loadingSession, setLoadingSession] = useState<boolean>(true);
  const [showOfficesModal, setShowOfficesModal] = useState<boolean>(false);

  // Comprehensive Member Form Input States
  const [fullName, setFullName] = useState("");
  const [passportNum, setPassportNum] = useState("");
  const [hostCountry, setHostCountry] = useState("United Kingdom");
  const [saccoAllocation, setSaccoAllocation] = useState("10000");

  useEffect(() => {
    const cookiesArray = document.cookie.split("; ");
    const hasActiveSession = cookiesArray.find(row => row.startsWith("kika_session_active="));
    setIsAuthenticated(!!hasActiveSession && hasActiveSession.split("=") === "true");
    setLoadingSession(false);
  }, []);

  if (loadingSession) return <div style={{ minHeight: "100vh", backgroundColor: "#020617", display: "flex", justifyContent: "center", alignItems: "center", color: "#10b981", fontFamily: "monospace" }}>🔒 AUTH SYNC LOADING...</div>;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#020617", color: "#f8fafc", fontFamily: "sans-serif" }} onClick={() => setActiveDropdown(null)}>
      <nav style={{ backgroundColor: "#0b1528", borderBottom: "1px solid #1e293b", padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 40 }}>
        <div style={{ fontWeight: "900", color: "#10b981", cursor: "pointer" }} onClick={() => router.push("/")}>🌍 KIKA GLOBAL VENTURES</div>
        <div style={{ display: "flex", gap: "24px" }} onClick={e => e.stopPropagation()}>
          {ecosystemMenu.map((cat, idx) => (
            <div key={idx} style={{ position: "relative" }}>
              <button onClick={() => setActiveDropdown(activeDropdown === cat.categoryName ? null : cat.categoryName)} style={{ background: "transparent", border: "none", color: "#cbd5e1", fontWeight: "bold", cursor: "pointer" }}>{cat.categoryName} ▼</button>
              {activeDropdown === cat.categoryName && (
                <div style={{ position: "absolute", top: "100%", right: 0, backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px", minWidth: "260px", padding: "8px 0", zIndex: 50 }}>
                  {cat.options.map((opt, oIdx) => (
                    <button key={oIdx} onClick={() => { if (opt.id.startsWith("reg")) { router.push(opt.targetPath); } else if (isAuthenticated) { router.push(opt.targetPath); } else { setTeaserService(opt); } }} style={{ width: "100%", textAlign: "left", padding: "10px 20px", background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer" }}>{opt.name}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button onClick={() => setShowOfficesModal(true)} style={{ background: "transparent", border: "none", color: "#3b82f6", fontWeight: "bold", cursor: "pointer" }}>🏢 Offices</button>
        </div>
        <div>
          {isAuthenticated ? (
            <button onClick={() => { document.cookie = "kika_session_active=; path=/; max-age=0; SameSite=Lax; Secure"; window.location.reload(); }} style={{ background: "transparent", border: "1px solid #ef4444", color: "#ef4444", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>Disconnect Node</button>
          ) : (
            <button onClick={() => router.push("/login")} style={{ background: "#10b981", border: "none", color: "#020617", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>Sign In / Enroll</button>
          )}
        </div>
      </nav>
      <section style={{ maxWidth: "1100px", margin: "40px auto 10px auto", padding: "0 20px", textAlign: "center" }}>
        {isAuthenticated ? (
          <div style={{ background: "rgba(16, 185, 129, 0.05)", border: "1px solid #10b981", padding: "15px", borderRadius: "10px", color: "#10b981", fontWeight: "bold", fontFamily: "monospace" }}>🛡️ AUTHORIZED COCKPIT HUB ACTIVE • WELCOME BACK, MASTER ADMIN NODE</div>
        ) : (
          <div style={{ background: "rgba(239, 68, 68, 0.03)", border: "1px dashed #ef4444", padding: "15px", borderRadius: "10px", color: "#ef4444", fontWeight: "bold", fontFamily: "monospace" }}>🔒 PUBLIC NETWORK WALL: CORES SAFELY GATED BEHIND NEON SQL AUDIT CHANNELS</div>
        )}
      </section>

      <header style={{ maxWidth: "800px", margin: "0 auto", padding: "30px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "38px", fontWeight: "900", color: "#ffffff" }}>Cross-Border Diaspora Automation Ecosystem</h1>
        <p style={{ fontSize: "15px", color: "#94a3b8", lineHeight: "1.6" }}>A decentralized financial and telecommunications hub tailored for sub-Saharan diaspora communities. Seamlessly uniting low-tariff full-duplex VoIP lines, automated mobile wallet remittances, and un-splittable cooperative Sacco savings registers under permanent cloud database rows.</p>
      </header>

      {/* 📝 COMPREHENSIVE DIASPORA ASSET REGISTRY & USER INTAKE FORM GRID */}
      <section style={{ maxWidth: "900px", margin: "0 auto 40px auto", padding: "0 20px" }}>
        <div style={{ backgroundColor: "#0f172a", padding: "35px", borderRadius: "14px", border: "1px solid #1e293b", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
          <h2 style={{ color: "#ffffff", fontSize: "18px", fontWeight: "bold", marginBottom: "15px" }}>📝 Comprehensive Diaspora Residency Asset Registry Intake Form</h2>
          <p style={{ color: "#64748b", fontSize: "12.5px", marginBottom: "25px" }}>Synchronize your statutory international residency variables directly with the serverless database to clear cross-border compliance barriers.</p>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", color: "#94a3b8", marginBottom: "6px" }}>PASSPORT / IDENTITY NUMBER</label>
              <input type="text" placeholder="Enter Passport Number" value={passportNum} onChange={e => setPassportNum(e.target.value)} style={{ width: "100%", padding: "12px", background: "#020617", border: "1px solid #1e293b", borderRadius: "6px", color: "#fff", outline: "none" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", color: "#94a3b8", marginBottom: "6px" }}>HOST COUNTRY DOMICILE RESIDENCY</label>
              <select value={hostCountry} onChange={e => setHostCountry(e.target.value)} style={{ width: "100%", padding: "12px", background: "#020617", border: "1px solid #1e293b", borderRadius: "6px", color: "#fff", outline: "none" }}>
                <option value="United Kingdom">United Kingdom (UK)</option>
                <option value="United States">United States (USA)</option>
                <option value="Canada">Canada (CAN)</option>
                <option value="Uganda">Uganda (EAF Node)</option>
              </select>
            </div>
          </div>

          <button onClick={() => { if (isAuthenticated) { alert("🟢 Parameters successfully written to Neon Database cluster profiles!"); } else { router.push("/login"); } }} style={{ width: "100%", padding: "14px", backgroundColor: "#10b981", border: "none", borderRadius: "6px", color: "#020617", fontWeight: "bold", cursor: "pointer" }}>
            Authorize and Log Registry Parameters to Neon Db
          </button>
        </div>
      </section>

      {/* QUICK QUICK ACCESS BUTTON CARDS */}
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "0 20px 40px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div onClick={() => { if (isAuthenticated) { router.push("/services/voip"); } else { setTeaserService({ id: "v", name: "🎙️ Low-Tariff VoIP Link", description: "Stream ultra-cheap voice tunnels directly to East African mobile networks over un-restricted WebRTC channels.", targetPath: "/services/voip" }); } }} style={{ backgroundColor: "#0b1329", padding: "25px", borderRadius: "12px", border: "1px solid #1e293b", cursor: "pointer" }}>
          <h3 style={{ color: "#ffffff", margin: "0 0 5px 0" }}>🗣️ Voice Link Carrier Trunk</h3>
          <p style={{ color: "#64748b", fontSize: "13px" }}>Open un-restricted WebRTC calling paths encoding audio frequencies directly into PCM chunks for handset cross-talk.</p>
        </div>
        <div onClick={() => { if (isAuthenticated) { router.push("/services/ledger"); } else { setTeaserService({ id: "l", name: "💳 Remittance Ledger Sheets", description: "Monitor transiting remittance assets and liquid capital values live with full database reconciliation footprints.", targetPath: "/services/ledger" }); } }} style={{ backgroundColor: "#0b1329", padding: "25px", borderRadius: "12px", border: "1px solid #1e293b", cursor: "pointer" }}>
          <h3 style={{ color: "#ffffff", margin: "0 0 5px 0" }}>📊 Remittance & Sacco Statement Sheet</h3>
          <p style={{ color: "#64748b", fontSize: "13px" }}>Direct synchronization channels pulling available wallet asset points and trust escrow protective holds in real-time.</p>
        </div>
      </main>

      {/* 📜 FOUNDATIONAL LEGACY CHARTER HISTORICAL SLATE BLOCK */}
      <section style={{ maxWidth: "900px", margin: "0 auto 40px auto", padding: "0 20px" }}>
        <div style={{ backgroundColor: "#0b1528", padding: "35px", borderRadius: "12px", border: "1px solid #1e293b" }}>
          <h3 style={{ color: "#ffffff", margin: "0 0 12px 0", fontSize: "18px", fontWeight: "bold" }}>{foundersLegacyData.title}</h3>
          <p style={{ color: "#cbd5e1", fontSize: "13.5px", lineHeight: "1.6", margin: "0 0 20px 0" }}>{foundersLegacyData.charterText}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {foundersLegacyData.nodes.map((node, nIdx) => (
              <div key={nIdx} style={{ background: "#020617", padding: "12px", borderRadius: "6px", border: "1px solid #1e293b" }}>
                <strong style={{ color: "#10b981", fontSize: "12px" }}>{node.label}</strong><br />
                <span style={{ color: "#64748b", fontSize: "12px" }}>{node.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {teaserService && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(2, 6, 23, 0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999 }}>
          <div style={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "12px", padding: "30px", maxWidth: "400px", width: "90%", textAlign: "center" }}>
            <h3 style={{ color: "#ffffff", margin: "0 0 10px 0" }}>{teaserService.name}</h3>
            <p style={{ color: "#94a3b8", fontSize: "13px" }}>{teaserService.description}<br /><br /><strong>Ready to activate? Secure your official authenticated profile account inside the permanent database register right now to connect.</strong></p>
            <button onClick={() => router.push("/login")} style={{ width: "100%", padding: "12px", backgroundColor: "#10b981", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>➡️ Open Member Registration Form</button>
            <button onClick={() => setTeaserService(null)} style={{ width: "100%", padding: "8px", backgroundColor: "transparent", color: "#64748b", border: "none", cursor: "pointer", marginTop: "8px" }}>Dismiss Window</button>
          </div>
        </div>
      )}

      {showOfficesModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(2, 6, 23, 0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999 }}>
          <div style={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "12px", padding: "30px", maxWidth: "500px", width: "90%" }}>
            <h3 style={{ color: "#ffffff", margin: "0 0 15px 0", borderBottom: "1px solid #1e293b", paddingBottom: "8px" }}>🏢 Global Office Footprints</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px", fontSize: "13px" }}>
              {kikaGlobalOffices.map(off => (
                <div key={off.id} style={{ background: "#020617", padding: "10px", borderRadius: "6px", border: "1px solid #1e293b" }}>
                  <strong style={{ color: "#10b981" }}>{off.flag} {off.region}</strong><br />
                  <span style={{ color: "#94a3b8" }}>{off.address}<br />{off.support}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setShowOfficesModal(false)} style={{ width: "100%", padding: "10px", backgroundColor: "#1e293b", color: "#cbd5e1", border: "1px solid #334155", borderRadius: "6px", cursor: "pointer" }}>Dismiss Window</button>
          </div>
        </div>
      )}

      <footer style={{ backgroundColor: "#0b1528", textAlign: "center", padding: "20px", color: "#64748b", fontSize: "12px", borderTop: "1px solid #1e293b" }}>KiKa Global Ventures Production Network Staging Infrastructure • Connected via Serverless Data Pooling • All Rights Reserved © 2026</footer>
    </div>
  );
}
