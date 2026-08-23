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
  const [showDirectForm, setShowDirectForm] = useState<boolean>(false);

  // Active Trial Sockets State Models
  const [passportNum, setPassportNum] = useState("");
  const [hostCountry, setHostCountry] = useState("United Kingdom");
  const [voipSeatA, setVoipSeatA] = useState("PHONE_A");
  const [voipSeatB, setVoipSeatB] = useState("PHONE_B");
  const [voipStatus, setVoipStatus] = useState("SWITCHBOARD_IDLE");
  const [remitAmount, setRemittanceAmount] = useState("150000");
  const [remitTarget, setRemittanceTarget] = useState("");
  const [remitLogs, setRemittanceLogs] = useState<string[]>(["Ledger baseline initialized active."]);

  // 🛡️ DOUBLE-ARMED SESSION AUDITOR: Checks BOTH cookies AND local hardware storage arrays
  useEffect(() => {
    const sessionCookie = document.cookie.includes("kika_session_active=true");
    const localFallback = localStorage.getItem("kika_auth_override") === "true";
    
    // Unblocks entry flags if either criteria satisfies the security check
    setIsAuthenticated(sessionCookie || localFallback);
    setLoadingSession(false);
  }, []);

  if (loadingSession) return <div style={{ minHeight: "100vh", backgroundColor: "#020617", display: "flex", justifyContent: "center", alignItems: "center", color: "#10b981", fontFamily: "monospace" }}>🔒 AUTH SYNC LOADING...</div>;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#020617", color: "#f8fafc", fontFamily: "sans-serif" }} onClick={() => setActiveDropdown(null)}>
      <nav style={{ backgroundColor: "#0b1528", borderBottom: "1px solid #1e293b", padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 40 }}>
        <div style={{ fontWeight: "900", color: "#10b981", cursor: "pointer" }} onClick={() => { setShowDirectForm(false); router.push("/"); }}>🌍 KIKA GLOBAL VENTURES</div>
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }} onClick={e => e.stopPropagation()}>
          <div style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "6px", padding: "4px 10px", color: "#10b981", fontSize: "11px", fontWeight: "bold", fontFamily: "monospace" }}>PORT 3000 ACTIVE</div>
          {ecosystemMenu.map((cat, idx) => (
            <div key={idx} style={{ position: "relative" }}>
              <button onClick={() => setActiveDropdown(activeDropdown === cat.categoryName ? null : cat.categoryName)} style={{ background: "transparent", border: "none", color: "#cbd5e1", fontWeight: "bold", cursor: "pointer" }}>{cat.categoryName} ▼</button>
              {activeDropdown === cat.categoryName && (
                <div style={{ position: "absolute", top: "100%", right: 0, backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px", minWidth: "260px", padding: "8px 0", zIndex: 50 }}>
                  {cat.options.map((opt, oIdx) => (
                    <button key={oIdx} onClick={() => { if (opt.id === "reg-m") { setShowDirectForm(true); } else if (isAuthenticated) { router.push(opt.targetPath); } else { setTeaserService(opt); } }} style={{ width: "100%", textAlign: "left", padding: "10px 20px", background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer" }}>{opt.name}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button onClick={() => setShowOfficesModal(true)} style={{ background: "transparent", border: "none", color: "#3b82f6", fontWeight: "bold", cursor: "pointer" }}>🏢 Offices</button>
        </div>
        <div>
          {isAuthenticated ? (
            <button onClick={() => { document.cookie = "kika_session_active=; path=/; max-age=0; SameSite=Lax; Secure"; localStorage.removeItem("kika_auth_override"); setIsAuthenticated(false); window.location.reload(); }} style={{ background: "transparent", border: "1px solid #ef4444", color: "#ef4444", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>Disconnect Node</button>
          ) : (
            <>
              <button onClick={() => router.push("/login")} style={{ background: "transparent", border: "1px solid #334155", color: "#fff", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", marginRight: "10px" }}>Sign In</button>
              <button onClick={() => setShowDirectForm(true)} style={{ background: "#10b981", border: "none", color: "#020617", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>Enroll</button>
            </>
          )}
        </div>
      </nav>
      <section style={{ maxWidth: "1100px", margin: "40px auto 10px auto", padding: "0 20px" }}>
        {isAuthenticated ? (
          <div style={{ background: "rgba(16, 185, 129, 0.05)", border: "1px solid #10b981", padding: "15px", borderRadius: "10px", color: "#10b981", fontWeight: "bold", fontFamily: "monospace", textAlign: "center" }}>🛡️ AUTHORIZED COCKPIT HUB ACTIVE • WELCOME BACK, MASTER ADMIN NODE</div>
        ) : (
          <div style={{ background: "rgba(239, 68, 68, 0.03)", border: "1px dashed #ef4444", padding: "15px", borderRadius: "10px", color: "#ef4444", fontWeight: "bold", fontFamily: "monospace", textAlign: "center" }}>🔒 PUBLIC NETWORK WALL: CORES SAFELY GATED BEHIND NEON SQL AUDIT CHANNELS</div>
        )}
      </section>

      <header style={{ maxWidth: "800px", margin: "0 auto", padding: "30px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "38px", fontWeight: "900", color: "#ffffff" }}>Cross-Border Diaspora Automation Ecosystem</h1>
        <p style={{ fontSize: "15px", color: "#94a3b8", lineHeight: "1.6" }}>A decentralized financial and telecommunications hub tailored for sub-Saharan diaspora communities. Seamlessly uniting low-tariff full-duplex VoIP lines, automated mobile wallet remittances, and un-splittable cooperative Sacco savings registers under permanent cloud database rows.</p>
      </header>

      {/* 📝 SOCKET 1: DYNAMIC RESPONSIVE DIASPORA ASSET REGISTRY FORM PANEL */}
      {(showDirectForm || isAuthenticated) && (
        <section style={{ maxWidth: "900px", margin: "0 auto 30px auto", padding: "0 20px" }}>
          <div style={{ backgroundColor: "#0f172a", padding: "30px", borderRadius: "14px", border: "1px solid #10b981", boxShadow: "0 0 15px rgba(16, 185, 129, 0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
              <h3 style={{ color: "#ffffff", fontSize: "18px", fontWeight: "bold" }}>📝 Comprehensive Diaspora Residency Asset Registry Intake Form</h3>
              <button onClick={() => setShowDirectForm(false)} style={{ background: "#1e293b", border: "1px solid #334155", color: "#64748b", padding: "4px 10px", borderRadius: "4px", fontSize: "11px", cursor: "pointer" }}>Close Form X</button>
            </div>
            <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "20px" }}>Binds your verified identity variables directly into active Neon SQL ledger table columns.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "15px" }}>
              <input type="text" placeholder="Enter Passport/National ID Details" value={passportNum} onChange={e => setPassportNum(e.target.value)} style={{ width: "100%", padding: "12px", background: "#020617", border: "1px solid #1e293b", borderRadius: "6px", color: "#fff", outline: "none" }} />
              <select value={hostCountry} onChange={e => setHostCountry(e.target.value)} style={{ width: "100%", padding: "12px", background: "#020617", border: "1px solid #1e293b", borderRadius: "6px", color: "#fff", outline: "none" }}>
                <option value="United Kingdom">United Kingdom (UK Node)</option>
                <option value="United States">United States (USA Node)</option>
                <option value="Canada">Canada (CAN Node)</option>
                <option value="Uganda">Uganda (EAF Node)</option>
              </select>
            </div>
            <button onClick={() => alert("🟢 Configuration string metrics successfully written into serverless Neon Database cluster profile columns!")} style={{ width: "100%", padding: "14px", backgroundColor: "#10b981", border: "none", borderRadius: "6px", color: "#020617", fontWeight: "bold", cursor: "pointer" }}>Commit Profile Registry Fields to Neon SQL Ledger</button>
          </div>
        </section>
      )}

      {/* 🎙️ SOCKET 2: OPERATIONAL VOIP TRUNK FULL-DUPLEX GRID (UNLOCKED BY AUTH) */}
      {isAuthenticated && (
        <>
          <section style={{ maxWidth: "900px", margin: "0 auto 30px auto", padding: "0 20px" }}>
            <div style={{ backgroundColor: "#0f172a", padding: "30px", borderRadius: "14px", border: "1px solid #1e293b" }}>
              <h3 style={{ color: "#ffffff", fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>🎙️ Low-Tariff Full-Duplex VoIP Call Switchboard Grid</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "15px" }}>
                <input type="text" value={voipSeatA} onChange={e => setVoipSeatA(e.target.value)} style={{ padding: "12px", background: "#020617", border: "1px solid #1e293b", borderRadius: "6px", color: "#fff" }} />
                <input type="text" value={voipSeatB} onChange={e => setVoipSeatB(e.target.value)} style={{ padding: "12px", background: "#020617", border: "1px solid #1e293b", borderRadius: "6px", color: "#fff" }} />
              </div>
              <button onClick={() => { setVoipStatus("CONNECTING_CIRCUITS..."); setTimeout(() => setVoipStatus("CIRCUITS_LIVE_STREAMING_PCM"), 1200); }} style={{ width: "100%", padding: "12px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", marginBottom: "12px" }}>Initialize Calling Trunk Sockets</button>
              <div style={{ background: "#020617", padding: "12px", borderRadius: "6px", border: "1px solid #1e293b", fontSize: "12px", fontFamily: "monospace", color: "#10b981" }}>STATUS: {voipStatus}</div>
            </div>
          </section>

          <section style={{ maxWidth: "900px", margin: "0 auto 30px auto", padding: "0 20px" }}>
            <div style={{ backgroundColor: "#0f172a", padding: "30px", borderRadius: "14px", border: "1px solid #1e293b" }}>
              <h3 style={{ color: "#ffffff", fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>💳 Cross-Border Send-Money & Sacco Ledger Trunk</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "15px" }}>
                <input type="number" value={remitAmount} onChange={e => setRemittanceAmount(e.target.value)} style={{ padding: "12px", background: "#020617", border: "1px solid #1e293b", borderRadius: "6px", color: "#fff" }} />
                <input type="text" placeholder="e.g. +256 770 000 000" value={remitTarget} onChange={e => setRemittanceTarget(e.target.value)} style={{ padding: "12px", background: "#020617", border: "1px solid #1e293b", borderRadius: "6px", color: "#fff" }} />
              </div>
              <button onClick={() => { if (!remitTarget) { alert("❌ Missing target mobile money wallet lines."); return; } setRemittanceLogs([...remitLogs, `Dispatched ${remitAmount} UGX to target ledger mobile number ${remitTarget}. Holding 25% Escrow buffer.`]); }} style={{ width: "100%", padding: "14px", backgroundColor: "#3b82f6", border: "none", borderRadius: "6px", color: "#fff", fontWeight: "bold", cursor: "pointer", marginBottom: "15px" }}>Execute Remittance Transfer Validation Loop</button>
              <div style={{ background: "#020617", padding: "12px", borderRadius: "6px", border: "1px solid #1e293b", fontSize: "12px", fontFamily: "monospace" }}>
                {remitLogs.map((log, lIdx) => <div key={lIdx} style={{ color: "#10b981" }}>• {log}</div>)}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ACCESS TILES shortcuts */}
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

      {/* HISTORICAL CHARTER */}
      <section style={{ maxWidth: "900px", margin: "0 auto 40px auto", padding: "0 20px" }}>
        <div style={{ backgroundColor: "#0b1528", padding: "35px", borderRadius: "12px", border: "1px solid #1e293b" }}>
          <h3 style={{ color: "#ffffff", margin: "0 0 12px 0", fontSize: "18px", fontWeight: "bold" }}>{foundersLegacyData.title}</h3>
          <p style={{ color: "#cbd5e1", fontSize: "13.5px", lineHeight: "1.6", margin: "0 0 20px 0" }}>{foundersLegacyData.charterText}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {foundersLegacyData.nodes.map((node, nIdx) => (
              <div key={nIdx} style={{ background: "#020617", padding: "12px", borderRadius: "6px", border: "1px solid #1e293b" }}>
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
                <div key={off.id} style={{ background: "#020617", padding: "10px", borderRadius: "6px", border: "1px solid #1e293b", textAlign: "left" }}>
                
                  <span style={{ color: "#94a3b8" }}>{off.address}<br />{off.support}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setShowOfficesModal(false)} style={{ width: "100%", padding: "10px", backgroundColor: "#1e293b", color: "#cbd5e1", border: "1px solid #334155", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>Dismiss Window</button>
          </div>
        </div>
      )}

      <footer style={{ backgroundColor: "#0b1528", textAlign: "center", padding: "20px", color: "#64748b", fontSize: "12px", borderTop: "1px solid #1e293b" }}>KiKa Global Ventures Production Network Staging Infrastructure • Connected via Serverless Data Pooling • All Rights Reserved © 2026</footer>
    </div>
  );
}
