"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ServiceOption { id: string; name: string; description: string; targetPath: string; }
interface DropdownCategory { categoryName: string; options: ServiceOption[]; }

export default function KikaEcosystemLandingFortress() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [teaserService, setTeaserService] = useState<ServiceOption | null>(null);
  const [loadingSession, setLoadingSession] = useState<boolean>(true);

  useEffect(() => {
    const cookiesArray = document.cookie.split("; ");
    const hasActiveSession = cookiesArray.find(row => row.startsWith("kika_session_active="));
    setIsAuthenticated(!!hasActiveSession && hasActiveSession.split("=")[1] === "true");
    setLoadingSession(false);
  }, []);

  useEffect(() => {
    const handleClose = () => setActiveDropdown(null);
    window.addEventListener("click", handleClose);
    return () => window.removeEventListener("click", handleClose);
  }, []);

  const ecosystemMenu: DropdownCategory[] = [
    {
      categoryName: "Registering Hub",
      options: [
        { id: "reg-member", name: "Diaspora Membership Enrollment", description: "Statutory profile configuration pipeline synchronizing your verified identity parameters directly inside the secure KiKa Global Registry node infrastructure hosted on Neon Serverless SQL databases.", targetPath: "/login" },
        { id: "reg-sacco", name: "Sacco Corporate Grouping", description: "Initialize multi-signatory collaborative membership grouping pools to authorize pooled savings accounts and joint cross-border investment channels.", targetPath: "/login" }
      ]
    },
    {
      categoryName: "Financial Hub Services",
      options: [
        { id: "fin-wallet", name: "Available Wallet Capital", description: "Real-time ledger statements mapped directly to cloud SQL rows. Complete visibility of liquid cross-border remittance balances with integrated clearinghouse validation loops.", targetPath: "/services/ledger" },
        { id: "fin-sacco", name: "Cooperative Sacco Shares", description: "Automated wealth accumulation frameworks for diaspora investment pools. Track share points valued natively at 10,000 UGX per unit allocation point.", targetPath: "/services/ledger" },
        { id: "fin-escrow", name: "Trust Escrow Reserves", description: "Automated compliance buffer systems securing 25% of transiting remittance capital from cellular network fraud vectors.", targetPath: "/services/ledger" }
      ]
    },
    {
      categoryName: "Business & Commerce",
      options: [
        { id: "biz-trade", name: "Cross-Border Trade Matrix", description: "Direct B2B import/export clearinghouse routers enabling diaspora entrepreneurs to track physical freight manifests across regional customs checkpoints.", targetPath: "/login" },
        { id: "biz-sme", name: "Micro-SME Capital Funding", description: "Automated credit underwriting pipelines linking verified cooperative savings accounts straight to low-interest commercial trade financing pools.", targetPath: "/login" }
      ]
    },
    {
      categoryName: "Ecosystem Portals",
      options: [
        { id: "port-voip", name: "Low-Tariff Full-Duplex VoIP Link", description: "Disrupting traditional telecom tariffs. High-velocity PCM sound wave streaming delivering ultra-cheap voice tunnels directly to KiKa diaspora membership networks.", targetPath: "/services/voip" },
        { id: "port-job", name: "Job Matchmaker Engine", description: "Aggregated international job vacancy search node seamlessly linking skilled diaspora professionals straight to cross-border institutional career lines.", targetPath: "/login" },
        { id: "port-terms", name: "Ecosystem Rules & Compliance", description: "Statutory multi-tenant regulatory guidelines, operational user parameter frameworks, and regional financial compliance structures.", targetPath: "/login" }
      ]
    }
  ];

  const handleServiceScrutiny = (option: ServiceOption) => {
    if (option.id === "reg-member" || option.id === "reg-sacco") { window.location.href = option.targetPath; return; }
    if (isAuthenticated) { window.location.href = option.targetPath; } else { setTeaserService(option); }
  };

  if (loadingSession) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#020617", display: "flex", justifyContent: "center", alignItems: "center", color: "#10b981", fontFamily: "monospace", fontSize: "13px" }}>
        🔒 VERIFYING SYSTEM AUTHORIZATION PRIVILEGES...
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#020617", color: "#f8fafc", fontFamily: "sans-serif", position: "relative" }}>
      <nav style={{ backgroundColor: "#0b1528", borderBottom: "1px solid #1e293b", padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }} onClick={() => window.location.href = "/"}>
          <span style={{ fontSize: "22px" }}>🌍</span>
          <span style={{ fontSize: "16px", fontWeight: "900", color: "#10b981", letterSpacing: "0.5px" }}>KIKA GLOBAL VENTURES</span>
        </div>
        <div style={{ display: "flex", gap: "28px" }} onClick={(e) => e.stopPropagation()}>
          <div style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "6px", padding: "4px 10px", color: "#10b981", fontSize: "11px", fontWeight: "bold", fontFamily: "monospace" }}>PORT 3000 ACTIVE</div>
          {ecosystemMenu.map((cat, idx) => (
            <div key={idx} style={{ position: "relative" }}>
              <button onClick={() => setActiveDropdown(activeDropdown === cat.categoryName ? null : cat.categoryName)} style={{ background: "transparent", border: "none", color: activeDropdown === cat.categoryName ? "#10b981" : "#cbd5e1", fontSize: "14px", fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", outline: "none" }}>
                {cat.categoryName} <span style={{ fontSize: "9px" }}>▼</span>
              </button>
              {activeDropdown === cat.categoryName && (
                <div style={{ position: "absolute", top: "calc(100% + 12px)", right: 0, backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "10px", minWidth: "280px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.5)", padding: "8px 0", zIndex: 50 }}>
                  {cat.options.map((opt, oIdx) => (
                    <button key={oIdx} onClick={() => { handleServiceScrutiny(opt); setActiveDropdown(null); }} style={{ width: "100%", textAlign: "left", padding: "12px 20px", background: "transparent", border: "none", color: "#94a3b8", fontSize: "13px", cursor: "pointer", display: "block", outline: "none" }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1e293b"; e.currentTarget.style.color = "#ffffff"; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#94a3b8"; }}>{opt.name}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          {isAuthenticated ? (
            <button onClick={() => { document.cookie = "kika_session_active=; path=/; max-age=0; SameSite=Lax; Secure"; window.location.reload(); }} style={{ background: "transparent", border: "1px solid #ef4444", color: "#ef4444", padding: "8px 16px", borderRadius: "6px", fontSize: "12.5px", fontWeight: "bold", cursor: "pointer" }}>Disconnect Node</button>
          ) : (
            <>
              <button onClick={() => window.location.href = "/login"} style={{ background: "transparent", border: "1px solid #334155", color: "#ffffff", padding: "8px 16px", borderRadius: "6px", fontSize: "12.5px", fontWeight: "bold", cursor: "pointer" }}>Sign In</button>
              <button onClick={() => window.location.href = "/login"} style={{ background: "#10b981", border: "none", color: "#020617", padding: "8px 16px", borderRadius: "6px", fontSize: "12.5px", fontWeight: "bold", cursor: "pointer" }}>Enroll</button>
            </>
          )}
        </div>
      </nav>
      <section style={{ maxWidth: "850px", margin: "0 auto", padding: "50px 20px 20px 20px", textAlign: "center" }}>
        {isAuthenticated ? (
          <div style={{ background: "rgba(16, 185, 129, 0.05)", border: "1px solid rgba(16, 185, 129, 0.2)", padding: "20px", borderRadius: "12px", color: "#10b981", fontWeight: "bold", fontSize: "14px", fontFamily: "monospace" }}>🛡️ AUTHORIZED COCKPIT HUB ACTIVE • WELCOME BACK, MASTER ADMIN NODE</div>
        ) : (
          <div style={{ background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.2)", padding: "20px", borderRadius: "12px", color: "#ef4444", fontWeight: "bold", fontSize: "14px", fontFamily: "monospace" }}>🔒 PUBLIC NETWORK NODE: PREMIUM SERVICES GATED BEHIND IDENTITY VALIDATION RECORDS</div>
        )}
      </section>

      <header style={{ maxWidth: "850px", margin: "0 auto", padding: "20px 20px 50px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "42px", fontWeight: "900", color: "#ffffff", margin: "0 0 18px 0", lineHeight: "1.2", letterSpacing: "-0.5px" }}>Cross-Border Diaspora Automation <br /><span style={{ color: "#10b981" }}>Ecosystem Platform</span></h1>
        <p style={{ fontSize: "15.5px", color: "#64748b", lineHeight: "1.7", margin: "0 0 35px 0" }}>Unified technical channels bridging global communication, remittance capital trunks, and local cooperative SACCO ledgers seamlessly from your disk. Explore active options inside the dropdown navigation panels above.</p>
      </header>

      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 20px 80px 20px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "25px" }}>
        <div onClick={() => handleServiceScrutiny({ id: "port-voip", name: "🎙️ Low-Tariff Full-Duplex VoIP Link", description: "Disrupting traditional telecom tariffs. High-velocity PCM sound wave streaming delivering ultra-cheap voice tunnels directly to KiKa diaspora membership networks.", targetPath: "/services/voip" })} style={{ backgroundColor: "#0b1329", padding: "30px", borderRadius: "14px", border: "1px solid #1e293b", cursor: "pointer" }}>
          <h3 style={{ color: "#ffffff", margin: "0 0 8px 0", fontSize: "18px", fontWeight: "bold" }}>🗣️ Voice Link Trunk</h3>
          <p style={{ color: "#64748b", margin: 0, fontSize: "13px", lineHeight: "1.6" }}>Open secure full-duplex communication panels to execute continuous sound testing across mobile handsets.</p>
        </div>
        <div onClick={() => handleServiceScrutiny({ id: "fin-wallet", name: "Available Wallet Capital", description: "Real-time ledger statements mapped directly to cloud SQL rows. Complete visibility of liquid cross-border remittance balances with integrated clearinghouse validation loops.", targetPath: "/services/ledger" })} style={{ backgroundColor: "#0b1329", padding: "30px", borderRadius: "14px", border: "1px solid #1e293b", cursor: "pointer" }}>
          <h3 style={{ color: "#ffffff", margin: "0 0 8px 0", fontSize: "18px", fontWeight: "bold" }}>📊 Remittance & Sacco Statement Sheet</h3>
          <p style={{ color: "#64748b", margin: 0, fontSize: "13px", lineHeight: "1.6" }}>Access available wallet capital, track trust escrow reserves, and pull immutable financial logs straight from the database.</p>
        </div>
      </main>

      {teaserService && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(2, 6, 23, 0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999, backdropFilter: "blur(5px)" }}>
          <div style={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "16px", padding: "35px", maxWidth: "460px", width: "90%", boxSizing: "border-box", textAlign: "center" }}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>🔒</div>
            <h3 style={{ color: "#ffffff", fontSize: "18px", margin: "0 0 10px 0", fontWeight: "bold" }}>{teaserService.name}</h3>
            <p style={{ color: "#94a3b8", fontSize: "13.5px", lineHeight: "1.6", margin: "0 0 25px 0" }}>{teaserService.description}<br /><br /><strong style={{ color: "#cbd5e1" }}>If you wish to access this core service, you must first create an authenticated account inside the permanent database register.</strong></p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button onClick={() => window.location.href = "/login"} style={{ width: "100%", padding: "14px", backgroundColor: "#10b981", color: "#020617", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "bold", cursor: "pointer" }}>➡️ Enroll or Sign In via Registry Form</button>
              <button onClick={() => setTeaserService(null)} style={{ width: "100%", padding: "12px", backgroundColor: "transparent", color: "#64748b", border: "none", fontSize: "13px", fontWeight: "bold", cursor: "pointer" }}>Dismiss Teaser Window</button>
            </div>
          </div>
        </div>
      )}

      <footer style={{ backgroundColor: "#0b1528", textAlign: "center", padding: "30px 20px", color: "#64748b", fontSize: "12px", borderTop: "1px solid #1e293b" }}>KiKa Global Production Network Staging Infrastructure • Connected via Serverless Data Pooling</footer>
    </div>
  );
}
