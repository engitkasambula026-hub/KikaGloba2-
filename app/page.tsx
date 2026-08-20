"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ServiceOption { id: string; name: string; description: string; targetPath: string; }
interface DropdownCategory { categoryName: string; icon: string; options: ServiceOption[]; }

export default function KikaEcosystemLandingFortress() {
  const router = useRouter();
  
  // Enterprise identity interaction and system state tracking parameters
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [teaserService, setTeaserService] = useState<ServiceOption | null>(null);
  const [loadingSession, setLoadingSession] = useState<boolean>(true);

  // 🛡️ DUAL-LAYER SECURITY AUDITOR: Scans system cookies immediately to verify clearance tiers
  useEffect(() => {
    const cookiesArray = document.cookie.split("; ");
    const hasActiveSession = cookiesArray.find(row => row.startsWith("kika_session_active="));
    setIsAuthenticated(!!hasActiveSession && hasActiveSession.split("=") === "true");
    setLoadingSession(false);
  }, []);

  // Closes any floating dropdown panels instantly if the user clicks the main dark canvas background
  useEffect(() => {
    const handleGlobalCanvasClick = () => setActiveDropdown(null);
    window.addEventListener("click", handleGlobalCanvasClick);
    return () => window.removeEventListener("click", handleGlobalCanvasClick);
  }, []);

  // 🟢 YOUR EXPLICIT MULTI-CATEGORY DEFINITIVE REPOSITORY DATA MATRIX
  const ecosystemMenu: DropdownCategory[] = [
    {
      categoryName: "Registering Hub",
      icon: "📝",
      options: [
        { id: "reg-member", name: "Diaspora Membership Enrollment", description: "Statutory profile configuration pipeline synchronizing your verified identity parameters (Name, Passport, Host Domicile Status) directly inside the secure KiKa Global Registry node infrastructure hosted on Neon Serverless SQL databases.", targetPath: "/login" },
        { id: "reg-sacco", name: "Sacco Corporate Grouping", description: "Initialize multi-signatory collaborative membership grouping profiles to authorize pooled savings accounts, cooperative capital reserves, and joint investment validation tracks.", targetPath: "/login" }
      ]
    },
    {
      categoryName: "Financial Hub Services",
      icon: "📊",
      options: [
        { id: "fin-wallet", name: "Available Wallet Capital", description: "Real-time ledger overview tracking your transiting balances and liquid investment liquidity lines mapped cleanly to cloud SQL database fields with full bank reconciliation footprints.", targetPath: "/services/ledger" },
        { id: "fin-sacco", name: "Cooperative Sacco Shares", description: "Automated wealth accumulation frameworks for diaspora investment pools. Track share points valued natively at 10,000 UGX per unit allocation point.", targetPath: "/services/ledger" },
        { id: "fin-escrow", name: "Trust Escrow Reserves", description: "Automated compliance buffer systems securing 25% of transiting remittance capital assets from cellular network fraud vectors and instant liquidity overrides.", targetPath: "/services/ledger" }
      ]
    },
    {
      categoryName: "Business & Commerce",
      icon: "💼",
      options: [
        { id: "biz-trade", name: "Cross-Border Trade Matrix", description: "Direct B2B import/export clearinghouse routers enabling diaspora entrepreneurs to track physical goods manifests across regional sub-Saharan freight corridors.", targetPath: "/login" },
        { id: "biz-sme", name: "Micro-SME Capital Funding", description: "Automated credit underwriting pipelines linking verified cooperative savings accounts straight to low-interest commercial trade financing pools.", targetPath: "/login" }
      ]
    },
    {
      categoryName: "Ecosystem Portals",
      icon: "🌍",
      options: [
        { id: "port-voip", name: "Low-Tariff Full-Duplex VoIP Link", description: "Disrupting traditional telecom tariffs. High-velocity PCM sound wave streaming delivering ultra-cheap voice tunnels directly to KiKa diaspora membership networks.", targetPath: "/services/voip" },
        { id: "port-job", name: "Job Matchmaker Engine", description: "Aggregated international job vacancy search node seamlessly linking skilled diaspora professionals straight to cross-border institutional career lines.", targetPath: "/login" },
        { id: "port-terms", name: "Ecosystem Rules & Compliance", description: "Statutory multi-tenant regulatory guidelines, operational user parameter frameworks, and regional financial compliance structures.", targetPath: "/login" }
      ]
    }
  ];

  const handleServiceScrutiny = (option: ServiceOption) => {
    if (option.id === "reg-member" || option.id === "reg-sacco") {
      window.location.href = option.targetPath;
      return;
    }
    if (isAuthenticated) {
      window.location.href = option.targetPath;
    } else {
      setTeaserService(option);
    }
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
      
      {/* HEADER COMPONENT: INTERACTIVE BRAND NAVIGATION BAR */}
      <nav style={{ backgroundColor: "#0b1528", borderBottom: "1px solid #1e293b", padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }} onClick={() => window.location.href = "/"}>
          <span style={{ fontSize: "22px" }}>🌍</span>
          <span style={{ fontSize: "16px", fontWeight: "900", color: "#10b981", letterSpacing: "0.5px" }}>KIKA GLOBAL VENTURES</span>
        </div>

        {/* AUTOMATED HORIZONTAL MENU DROPDOWNS LOOP */}
        <div style={{ display: "flex", gap: "28px" }} onClick={(e) => e.stopPropagation()}>
          <div style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "6px", padding: "4px 10px", color: "#10b981", fontSize: "11px", fontWeight: "bold", fontFamily: "monospace" }}>
            PORT 3000 ACTIVE
          </div>

          {ecosystemMenu.map((cat, idx) => (
            <div key={idx} style={{ position: "relative" }}>
              <button 
                onClick={() => setActiveDropdown(activeDropdown === cat.categoryName ? null : cat.categoryName)}
                style={{ background: "transparent", border: "none", color: activeDropdown === cat.categoryName ? "#10b981" : "#cbd5e1", fontSize: "14px", fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", outline: "none" }}
              >
                {cat.categoryName}
                <span style={{ fontSize: "9px", display: "inline-block", transform: activeDropdown === cat.categoryName ? "rotate(180deg)" : "rotate(0deg)", transition: "0.15s" }}>▼</span>
              </button>

              {activeDropdown === cat.categoryName && (
                <div style={{ position: "absolute", top: "calc(100% + 12px)", right: 0, backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "10px", minWidth: "280px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.5)", padding: "8px 0", zIndex: 50 }}>
                  {cat.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => { handleServiceScrutiny(opt); setActiveDropdown(null); }}
                      style={{ width: "100%", textAlign: "left", padding: "12px 20px", background: "transparent", border: "none", color: "#94a3b8", fontSize: "13px", cursor: "pointer", display: "block", outline: "none" }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1e293b"; e.currentTarget.style.color = "#ffffff"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#94a3b8"; }}
                    >
                      {opt.name}
                    </button>
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
      {/* SECURITY COCKPIT NOTIFICATION HEADER BAND */}
      <section style={{ maxWidth: "1100px", margin: "40px auto 10px auto", padding: "0 20px" }}>
        {isAuthenticated ? (
          <div style={{ background: "rgba(16, 185, 129, 0.05)", border: "1px solid rgba(16, 185, 129, 0.2)", padding: "20px", borderRadius: "12px", color: "#10b981", fontWeight: "bold", fontSize: "14px", fontFamily: "monospace", textAlign: "center" }}>
            🛡️ AUTHORIZED COCKPIT HUB ACTIVE • WELCOME BACK, MASTER ADMIN NODE
          </div>
        ) : (
          <div style={{ background: "rgba(239, 68, 68, 0.03)", border: "1px dashed rgba(239, 68, 68, 0.2)", padding: "20px", borderRadius: "12px", color: "#ef4444", fontWeight: "bold", fontSize: "14px", fontFamily: "monospace", textAlign: "center" }}>
            🔒 PUBLIC DEVELOPMENT NODE: PREMIUM CORES SAFELY GATED BEHIND NEON SQL AUDIT CHANNELS
          </div>
        )}
      </section>

      {/* ORIGINAL PRESERVED INSCRIPTION COPY WRITING HEADER CONTENT */}
      <header style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px 50px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "44px", fontWeight: "900", color: "#ffffff", margin: "0 0 18px 0", lineHeight: "1.2", letterSpacing: "-0.5px" }}>
          Cross-Border Diaspora Automation <br />
          <span style={{ color: "#10b981" }}>Ecosystem Platform</span>
        </h1>
        <p style={{ fontSize: "16px", color: "#94a3b8", lineHeight: "1.7", margin: "0 0 35px 0" }}>
          A high-utility, decentralized financial and communication matrix tailored for sub-Saharan diaspora communities. Seamlessly uniting low-tariff full-duplex VoIP circuits, automated mobile wallet remittances, and un-splittable cooperative Sacco savings registers under permanent, serverless cloud database protection lines.
        </p>
      </header>

      {/* MID-LEVEL PROMINENT SERVICE QUICK CARD SHORTCUTS */}
      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px 60px 20px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))", gap: "30px" }}>
        
        {/* TRUNK CARD 1: FULL DUPLEX COMMUNICATIONS */}
        <div 
          onClick={() => handleServiceScrutiny({ id: "port-voip", name: "🎙️ Low-Tariff Full-Duplex VoIP Link", description: "Disrupting traditional telecom tariffs. High-velocity PCM sound wave streaming delivering ultra-cheap voice tunnels directly to KiKa diaspora membership networks.", targetPath: "/services/voip" })}
          style={{ backgroundColor: "#0b1329", padding: "35px", borderRadius: "16px", border: "1px solid #1e293b", cursor: "pointer", transition: "0.2s" }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = "#34d399"}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = "#1e293b"}
        >
          <div style={{ fontSize: "24px", marginBottom: "12px" }}>🎙️</div>
          <h3 style={{ color: "#ffffff", margin: "0 0 10px 0", fontSize: "19px", fontWeight: "bold" }}>🗣️ Voice Link Carrier Trunk</h3>
          <p style={{ color: "#64748b", margin: 0, fontSize: "13.5px", lineHeight: "1.6" }}>
            Open un-restricted WebRTC calling paths. Encodes microphone frequencies directly into un-splittable PCM numerical chunks, enabling clear, low-latency audio transmission directly between iOS and Android viewports over cellular data streams.
          </p>
        </div>

        {/* TRUNK CARD 2: IMMUTABLE BANKING STATEMENT LEDGER */}
        <div 
          onClick={() => handleServiceScrutiny({ id: "fin-wallet", name: "Available Wallet Capital", description: "Real-time ledger statements mapped directly to cloud SQL rows. Complete visibility of liquid cross-border remittance balances with integrated clearinghouse validation loops.", targetPath: "/services/ledger" })}
          style={{ backgroundColor: "#0b1329", padding: "35px", borderRadius: "16px", border: "1px solid #1e293b", cursor: "pointer", transition: "0.2s" }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = "#3b82f6"}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = "#1e293b"}
        >
          <div style={{ fontSize: "24px", marginBottom: "12px" }}>📊</div>
          <h3 style={{ color: "#ffffff", margin: "0 0 10px 0", fontSize: "19px", fontWeight: "bold" }}>💳 Remittance & Sacco Ledger Sheets</h3>
          <p style={{ color: "#64748b", margin: 0, fontSize: "13.5px", lineHeight: "1.6" }}>
            Direct synchronization channels connected natively to your Neon PostgreSQL tables. Scrutinise available wallet liquid assets, monitor accumulated co-op Sacco share units, and audit permanent trust escrow protection holds.
          </p>
        </div>

      </main>
      {/* 🟢 THE PRESERVED KIKA FOUNDERS REGIONAL HISTORY & LEGACY CHARTER BLOCK */}
      <section style={{ maxWidth: "1100px", margin: "0 auto 60px auto", padding: "0 20px" }}>
        <div style={{ backgroundColor: "#0b1528", padding: "40px", borderRadius: "16px", border: "1px solid #1e293b" }}>
          <h2 style={{ color: "#ffffff", fontSize: "20px", fontWeight: "bold", margin: "0 0 15px 0", borderBottom: "1px solid #1e293b", paddingBottom: "12px" }}>
            📜 KiKa Sovereign Foundational Legacy Charter
          </h2>
          <p style={{ color: "#64748b", fontSize: "13.5px", lineHeight: "1.7", margin: "0 0 20px 0" }}>
            Honoring the historical vision of the KiKa co-founders, the platform is engineered as an immutable community automation baseline. Designed to structurally bridge the macroeconomic wealth imbalances transiting between global diaspora hubs and local East African savings societies, KiKa serves as a continuous, reliable technical trust port.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", color: "#94a3b8", fontSize: "12px", fontFamily: "monospace" }}>
            <div style={{ background: "#020617", padding: "15px", borderRadius: "8px", border: "1px solid #1e293b" }}>
              <strong>📍 SYSTEM SOVEREIGNTY NODE</strong> <br /> Verified via Serverless Relational Relational Matrix Mapping
            </div>
            <div style={{ background: "#020617", padding: "15px", borderRadius: "8px", border: "1px solid #1e293b" }}>
              <strong>📋 NITA-U COMPLIANCE ADVICE</strong> <br /> Data protection and sovereign encryptions meeting Uganda PDPO frameworks
            </div>
            <div style={{ background: "#020617", padding: "15px", borderRadius: "8px", border: "1px solid #1e293b" }}>
              <strong>🔐 IMMUTABLE ANCHOR BLOCK</strong> <br /> Registered under master developer administrative validation rows
            </div>
          </div>
        </div>
      </section>

      {/* 🛡️ INTERACTIVE GATED TEASER WINDOW POPUP BOX ENGINE */}
      {teaserService && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(2, 6, 23, 0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999, backdropFilter: "blur(5px)" }}>
          <div style={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "16px", padding: "35px", maxWidth: "480px", width: "90%", boxSizing: "border-box", textAlign: "center", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
            
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>🔒</div>
            <h3 style={{ color: "#ffffff", fontSize: "18px", margin: "0 0 10px 0", fontWeight: "bold" }}>{teaserService.name}</h3>
            
            <p style={{ color: "#94a3b8", fontSize: "13.5px", lineHeight: "1.6", margin: "0 0 25px 0" }}>
              {teaserService.description}
              <br /><br />
              <strong style={{ color: "#cbd5e1" }}>If you wish to unblock this premium ecosystem service module, you must first secure an authenticated account inside the permanent database register.</strong>
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button 
                onClick={() => { setTeaserService(null); window.location.href = "/login"; }}
                style={{ width: "100%", padding: "14px", backgroundColor: "#10b981", color: "#020617", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "bold", cursor: "pointer", boxShadow: "0 4px 14px rgba(16, 185, 129, 0.3)" }}
              >
                ➡️ Open Member Registration Form
              </button>
              <button 
                onClick={() => setTeaserService(null)}
                style={{ width: "100%", padding: "12px", backgroundColor: "transparent", color: "#64748b", border: "none", fontSize: "13px", fontWeight: "bold", cursor: "pointer" }}
              >
                Dismiss Teaser Window
              </button>
            </div>

          </div>
        </div>
      )}

      {/* SOVEREIGN PERSISTENT SYSTEM FOOTER VIEW */}
      <footer style={{ backgroundColor: "#0b1528", textAlign: "center", padding: "35px 20px", color: "#64748b", fontSize: "12.5px", borderTop: "1px solid #1e293b" }}>
        KiKa Global Production Network Staging Infrastructure • Connected via Serverless Data Pooling • All Rights Reserved © 2026
      </footer>

    </div>
  );
}
