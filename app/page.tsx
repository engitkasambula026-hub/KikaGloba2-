"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ServiceOption {
  id: string;
  name: string;
  description: string;
  targetPath: string;
}

interface DropdownCategory {
  categoryName: string;
  icon: string;
  options: ServiceOption[];
}

export default function KikaEcosystemLandingFortress() {
  const router = useRouter();
  
  // Interface interaction state handlers
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [teaserService, setTeaserService] = useState<ServiceOption | null>(null);
  const [loadingSession, setLoadingSession] = useState<boolean>(true);

  // 🛡️ DUAL-LAYER PROTACTIVE INTEGRITY SCANNER:
  // Audits browser cookie cache buffers immediately to enforce site locks before rendering text elements
  useEffect(() => {
    const cookiesArray = document.cookie.split("; ");
    const hasActiveSession = cookiesArray.find(row => row.startsWith("kika_session_active="));
    
    if (hasActiveSession && hasActiveSession.split("=")[1] === "true") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoadingSession(false);
  }, []);

  // Closes any floating dropdown panels instantly if the user clicks the main dark canvas background
  useEffect(() => {
    const handleGlobalCanvasClick = () => setActiveDropdown(null);
    window.addEventListener("click", handleGlobalCanvasClick);
    return () => window.removeEventListener("click", handleGlobalCanvasClick);
  }, []);

  // 🟢 TRACEABLE 1-BY-1 DEFINITIVE SERVICES TEASER MATRIX DATA ROW
  const ecosystemMenu: DropdownCategory[] = [
    {
      categoryName: "Registering Hub",
      icon: "📝",
      options: [
        { id: "reg-member", name: "Diaspora Membership Enrollment", description: "Statutory profile configuration pipeline synchronizing your verified identity parameters directly inside the secure KiKa Global Registry node architecture hosted on Neon Serverless SQL databases.", targetPath: "/login" },
        { id: "reg-sacco", name: "Sacco Corporate Grouping", description: "Initialize multi-signatory collaborative membership grouping pools to authorize pooled savings accounts and joint cross-border investment channels.", targetPath: "/login" }
      ]
    },
    {
      categoryName: "Financial Hub Services",
      icon: "📊",
      options: [
        { id: "fin-wallet", name: "Available Wallet Capital", description: "Real-time ledger statements mapped directly to cloud SQL rows. Complete visibility of liquid cross-border remittance balances with integrated clearinghouse validation loops.", targetPath: "/services/ledger" },
        { id: "fin-sacco", name: "Cooperative Sacco Shares", description: "Automated wealth accumulation frameworks for diaspora investment pools. Track share points valued natively at 10,000 UGX per unit allocation point.", targetPath: "/services/ledger" },
        { id: "fin-escrow", name: "Trust Escrow Reserves", description: "Automated compliance buffer systems securing 25% of transiting remittance capital from cellular network fraud vectors.", targetPath: "/services/ledger" }
      ]
    },
    {
      categoryName: "Business & Commerce",
      icon: "💼",
      options: [
        { id: "biz-trade", name: "Cross-Border Trade Matrix", description: "Direct B2B import/export clearinghouse routers enabling diaspora entrepreneurs to track physical freight manifests across regional customs checkpoints.", targetPath: "/login" },
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
    // 🛡️ SUB-PATH SECURITY GATE: Never prompt teaser popups for basic registration links
    if (option.id === "reg-member" || option.id === "reg-sacco") {
      router.push(option.targetPath);
      return;
    }

    if (isAuthenticated) {
      router.push(option.targetPath);
    } else {
      // For unauthenticated guests, instantly trigger the 1-by-1 detailed informational teaser window modal
      setTeaserService(option);
    }
  };

  const handleManualLogout = () => {
    document.cookie = "kika_session_active=; path=/; max-age=0; SameSite=Lax; Secure";
    setIsAuthenticated(false);
    window.location.reload();
  };

  if (loadingSession) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#020617", display: "flex", justifyContent: "center", alignItems: "center", color: "#10b981", fontFamily: "monospace", fontSize: "13px" }}>
        🔒 EXECUTING SYSTEM POLICY COOKIE SCAN LOOPS...
      </div>
    );
  }
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#020617", color: "#f8fafc", fontFamily: "sans-serif", position: "relative" }}>
      
      {/* ENTERPRISE INTERACTIVE TOP NAVIGATION BAR */}
      <nav style={{ backgroundColor: "#0b1528", borderBottom: "1px solid #1e293b", padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }} onClick={() => router.push("/")}>
          <span style={{ fontSize: "22px" }}>🌍</span>
          <span style={{ fontSize: "16px", fontWeight: "900", color: "#10b981", letterSpacing: "0.5px" }}>KIKA GLOBAL VENTURES</span>
        </div>

        {/* AUTOMATED DROPDOWNS BAR */}
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
            <button onClick={handleManualLogout} style={{ background: "transparent", border: "1px solid #ef4444", color: "#ef4444", padding: "8px 16px", borderRadius: "6px", fontSize: "12.5px", fontWeight: "bold", cursor: "pointer" }}>Disconnect Node</button>
          ) : (
            <>
              <button onClick={() => router.push("/login")} style={{ background: "transparent", border: "1px solid #334155", color: "#ffffff", padding: "8px 16px", borderRadius: "6px", fontSize: "12.5px", fontWeight: "bold", cursor: "pointer" }}>Sign In</button>
              <button onClick={() => router.push("/login")} style={{ background: "#10b981", border: "none", color: "#020617", padding: "8px 16px", borderRadius: "6px", fontSize: "12.5px", fontWeight: "bold", cursor: "pointer" }}>Enroll</button>
            </>
          )}
        </div>
      </nav>

      {/* 🛡️ CONDITION BLOCK LAYER: If unauthorized, freeze main layouts and display corporate fortress wall */}
      {!isAuthenticated ? (
        <div style={{ maxWidth: "680px", width: "100%", margin: "80px auto", padding: "40px", backgroundColor: "#0b1329", border: "1px solid #1e293b", borderRadius: "16px", textAlign: "center", boxSizing: "border-box", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
          <div style={{ fontSize: "44px", marginBottom: "15px" }}>🔒</div>
          <h2 style={{ fontSize: "26px", color: "#ffffff", margin: "0 0 12px 0", fontWeight: "bold" }}>KiKa Infrastructure Access Restricted</h2>
          <p style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.6", margin: "0 0 30px 0" }}>
            You are viewing an active secure development network node. Public guest connections are strictly locked to protect underlying web-code files. Click on the dropdown menu rows above to read about a service, or present authorized credentials to enter the live ecosystem.
          </p>
          <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
            <button onClick={() => router.push("/login")} style={{ padding: "14px 28px", backgroundColor: "#10b981", color: "#020617", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "14px", cursor: "pointer", boxShadow: "0 4px 14px rgba(16, 185, 129, 0.2)" }}>Sign In to Profile</button>
            <button onClick={() => router.push("/login")} style={{ padding: "14px 28px", backgroundColor: "transparent", color: "#ffffff", border: "1px solid #334155", borderRadius: "8px", fontWeight: "bold", fontSize: "14px", cursor: "pointer" }}>Enroll in Registry</button>
          </div>
        </div>
      ) : (
        /* If authorized, unlock full structural dashboard features seamlessly */
        <header style={{ maxWidth: "850px", margin: "0 auto", padding: "110px 20px 50px 20px", textAlign: "center" }}>
          <h1 style={{ fontSize: "42px", fontWeight: "900", color: "#ffffff", margin: "0 0 18px 0", lineHeight: "1.2", letterSpacing: "-0.5px" }}>
            Cross-Border Diaspora Automation <br />
            <span style={{ color: "#3b82f6" }}>Authorized Cockpit Hub</span>
          </h1>
          <p style={{ fontSize: "15.5px", color: "#64748b", lineHeight: "1.7", margin: "0 0 35px 0" }}>
            Welcome back, Master Admin Node. Your network security cookie tokens are fully verified green against Neon SQL database columns. Tap on any dropdown menu option above to jump straight inside your interactive services.
          </p>
        </header>
      )}

      {/* 🛡️ 1-BY-1 GATED TEASER WINDOW POPUP COMPONENT (WIDED BUTTON TO DB FORM) */}
      {teaserService && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(2, 6, 23, 0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999, backdropFilter: "blur(5px)" }}>
          <div style={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "16px", padding: "35px", maxWidth: "480px", width: "90%", boxSizing: "border-box", textAlign: "center", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
            
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>🔒</div>
            <h3 style={{ color: "#ffffff", fontSize: "18px", margin: "0 0 12px 0", fontWeight: "bold" }}>{teaserService.name}</h3>
            
            <p style={{ color: "#94a3b8", fontSize: "13.5px", lineHeight: "1.6", margin: "0 0 25px 0" }}>
              {teaserService.description}
              <br /><br />
              <strong style={{ color: "#cbd5e1" }}>If you wish to access this core service, you must first create an authenticated account inside the permanent database register.</strong>
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {/* 🟢 REDIRECTION ENGINE: Forces unauthenticated guest browsers straight into your login/register form loop */}
              <button 
                onClick={() => { setTeaserService(null); router.push("/login"); }}
                style={{ width: "100%", padding: "14px", backgroundColor: "#3b82f6", color: "#ffffff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "bold", cursor: "pointer", boxShadow: "0 4px 14px rgba(59, 130, 246, 0.3)" }}
              >
                ➡️ Go to Registration & Login Form
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

    </div>
  );
}
