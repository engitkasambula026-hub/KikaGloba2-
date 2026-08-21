"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface OfficeFootprint { id: string; flag: string; region: string; address: string; support: string; }
interface ServiceOption { id: string; name: string; description: string; targetPath: string; }
interface DropdownCategory { categoryName: string; options: ServiceOption[]; }

export default function KikaEcosystemLandingFortress() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [teaserService, setTeaserService] = useState<ServiceOption | null>(null);
  const [loadingSession, setLoadingSession] = useState<boolean>(true);
  const [showOfficesModal, setShowOfficesModal] = useState<boolean>(false);

  useEffect(() => {
    const cookiesArray = document.cookie.split("; ");
    const hasActiveSession = cookiesArray.find(row => row.startsWith("kika_session_active="));
    setIsAuthenticated(!!hasActiveSession && hasActiveSession.split("=") === "true");
    setLoadingSession(false);
  }, []);

  // 🟢 IMMUTABLE MONOLITHIC DIRECTORY SLOTS (DECOUPLED FROM SIDEBAR CORRUPTIONS)
  const kikaGlobalOffices: OfficeFootprint[] = [
    { id: "kla-hq", flag: "🇺🇬", region: "East Africa Operational HQ (Kampala)", address: "Plot 12-14, Nakasero Road, Nakasero, Kampala, Uganda", support: "📞 Core Support Line: +256 414 kika_voip_trunk" },
    { id: "ldn-hub", flag: "🇬🇧", region: "United Kingdom Diaspora Hub (London)", address: "Level 4, Canary Wharf Technology Switchboards, London, UK", support: "📞 Virtual Trunk Link: +44 20 7946 0192" }
  ];

  const ecosystemMenu: DropdownCategory[] = [
    { categoryName: "Registering Hub", options: [{ id: "reg-member", name: "Diaspora Membership Enrollment", description: "Secure your official identity profile row inside our automated serverless Neon SQL registry database to unblock premium services instantly.", targetPath: "/login" }, { id: "reg-sacco", name: "Sacco Corporate Grouping", description: "Initialize multi-signatory asset shielding pools to authorize combined cooperative savings tracks and joint remittance pipelines.", targetPath: "/login" }] },
    { categoryName: "Financial Hub Services", options: [{ id: "fin-wallet", name: "Available Wallet Capital", description: "Monitor your transiting remittance assets and liquid capital values live with integrated clearinghouse bank reconciliation footprints.", targetPath: "/services/ledger" }, { id: "fin-sacco", name: "Cooperative Sacco Shares", description: "Track your accumulated wealth accumulation share points valued natively at a statutory 10,000 UGX per unit allocation.", targetPath: "/services/ledger" }, { id: "fin-escrow", name: "Trust Escrow Reserves", description: "Enforce automated compliance holds securing 25% of transiting remittance capital from network fraud vectors.", targetPath: "/services/ledger" }] },
    { categoryName: "Business & Commerce", options: [{ id: "biz-trade", name: "Cross-Border Trade Matrix", description: "Direct B2B import/export cargo clearinghouse routers enabling diaspora entrepreneurs to track physical freight manifests live.", targetPath: "/login" }, { id: "biz-sme", name: "Micro-SME Capital Funding", description: "Automated credit underwriting engines linking verified Sacco savings pools directly to low-interest commercial trade finance lines.", targetPath: "/login" }] },
    { categoryName: "Ecosystem Portals", options: [{ id: "port-voip", name: "Low-Tariff Full-Duplex VoIP Link", description: "Stream ultra-cheap voice tunnels directly to East African mobile networks over un-restricted, hardware-free WebRTC channels.", targetPath: "/services/voip" }, { id: "port-job", name: "Job Matchmaker Engine", description: "Aggregated vacancy search node seamlessly connecting skilled diaspora professionals directly to cross-border institutional career paths.", targetPath: "/login" }, { id: "port-legacy", name: "Legacy Foundation History", description: "The founding roadmap, charter variables, and social vision honoring the Kika co-founder legacy and cross-border milestones.", targetPath: "/login" }] }
  ];

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
            <button onClick={() => { document.cookie = "kika_session_active=; path=/; max-age=0; SameSite=Lax; Secure"; setIsAuthenticated(false); window.location.reload(); }} style={{ background: "transparent", border: "1px solid #ef4444", color: "#ef4444", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>Disconnect Node</button>
          ) : (
            <button onClick={() => router.push("/login")} style={{ background: "#10b981", border: "none", color: "#020617", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>Sign In / Enroll</button>
          )}
        </div>
      </nav>
      <section style={{ maxWidth: "800px", margin: "40px auto 10px auto", padding: "0 20px", textAlign: "center" }}>
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

      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div onClick={() => { if (isAuthenticated) { router.push("/services/voip"); } else { setTeaserService({ id: "v", name: "🎙️ Low-Tariff VoIP Link", description: "Stream ultra-cheap voice tunnels directly to East African mobile networks over un-restricted WebRTC channels.", targetPath: "/services/voip" }); } }} style={{ backgroundColor: "#0b1329", padding: "25px", borderRadius: "12px", border: "1px solid #1e293b", cursor: "pointer" }}>
          <h3 style={{ color: "#ffffff", margin: "0 0 5px 0" }}>🗣️ Voice Link Carrier Trunk</h3>
          <p style={{ color: "#64748b", fontSize: "13px" }}>Open un-restricted WebRTC calling paths encoding audio frequencies directly into PCM chunks for handset cross-talk.</p>
        </div>
        <div onClick={() => { if (isAuthenticated) { router.push("/services/ledger"); } else { setTeaserService({ id: "l", name: "💳 Remittance Ledger Sheets", description: "Monitor transiting remittance assets and liquid capital values live with full database reconciliation footprints.", targetPath: "/services/ledger" }); } }} style={{ backgroundColor: "#0b1329", padding: "25px", borderRadius: "12px", border: "1px solid #1e293b", cursor: "pointer" }}>
          <h3 style={{ color: "#ffffff", margin: "0 0 5px 0" }}>📊 Remittance & Sacco Statement Sheet</h3>
          <p style={{ color: "#64748b", fontSize: "13px" }}>Direct synchronization channels pulling available wallet asset points and trust escrow protective holds in real-time.</p>
        </div>
      </main>

      <section style={{ maxWidth: "900px", margin: "0 auto 40px auto", padding: "0 20px" }}>
        <div style={{ backgroundColor: "#0b1528", padding: "30px", borderRadius: "12px", border: "1px solid #1e293b" }}>
          <h3 style={{ color: "#ffffff", margin: "0 0 10px 0" }}>📜 KiKa Foundational Legacy Charter History</h3>
          <p style={{ color: "#64748b", fontSize: "13px", lineHeight: "1.6" }}>Honoring the historical vision of the KiKa co-founders, the platform is engineered as an immutable community automation baseline. Designed to structurally bridge the macroeconomic wealth imbalances transiting between global diaspora hubs and local East African savings societies, KiKa serves as a continuous, reliable technical trust port.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "15px", color: "#94a3b8", fontSize: "11px", fontFamily: "monospace", marginTop: "15px" }}>
            <div style={{ background: "#020617", padding: "10px", borderRadius: "6px", border: "1px solid #1e293b" }}><strong>📍 REGIONAL SOVEREIGNTY</strong><br />Serverless Relational Matrix Mapping</div>
            <div style={{ background: "#020617", padding: "10px", borderRadius: "6px", border: "1px solid #1e293b" }}><strong>📋 NITA-U DATA COMPLIANCE</strong><br />Encryptions aligned to Uganda PDPO Framework</div>
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
            <button onClick={() => setShowOfficesModal(false)} style={{ width: "100%", padding: "10px", backgroundColor: "#1e293b", color: "#cbd5e1", border: "1px solid #334155", borderRadius: "6px", cursor: "pointer" }}>Dismiss Directories Window</button>
          </div>
        </div>
      )}

      <footer style={{ backgroundColor: "#0b1528", textAlign: "center", padding: "20px", color: "#64748b", fontSize: "12px", borderTop: "1px solid #1e293b" }}>KiKa Global Ventures Production Network Staging Infrastructure • Connected via Serverless Data Pooling • All Rights Reserved © 2026</footer>
    </div>
  );
}
