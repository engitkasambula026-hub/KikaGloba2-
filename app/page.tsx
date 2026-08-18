"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ServiceOption {
  name: string;
  description: string;
  targetPath: string;
}

interface DropdownCategory {
  categoryName: string;
  options: ServiceOption[];
}

export default function KikaEcosystemLandingFortress() {
  const router = useRouter();
  
  // Interactive navigation interface state trackers
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [teaserService, setTeaserService] = useState<ServiceOption | null>(null);

  // Automatically closes any open dropdowns if a user clicks on the main body background canvas
  useEffect(() => {
    const handleGlobalClickClose = () => setActiveDropdown(null);
    window.addEventListener("click", handleGlobalClickClose);
    return () => window.removeEventListener("click", handleGlobalClickClose);
  }, []);

  // 🟢 YOUR SYSTEM NAVIGATION MENU DATA MATRIX STRUCTURE (PRESERVED PRECISELY)
  const ecosystemMenu: DropdownCategory[] = [
    {
      categoryName: "Registering Hub",
      options: [
        { name: "Diaspora Membership Enrollment", description: "Statutory profile configuration pipeline synchronizing your verified identity parameters straight inside the secure KiKa Global Registry node infrastructure.", targetPath: "/register" },
        { name: "Sacco Corporate Grouping", description: "Initialize collaborative membership pooling profiles to authorize combined savings accounts and multi-signatory investment validation tracks.", targetPath: "/register" }
      ]
    },
    {
      categoryName: "Financial Hub Services",
      options: [
        { name: "Available Wallet Capital", description: "Real-time ledger overview tracking your available transactional balances and liquid investment liquidity lines mapped cleanly to cloud SQL database fields.", targetPath: "/services/ledger" },
        { name: "Cooperative Sacco Shares", description: "Automated wealth accumulation trackers displaying your accumulated asset shares valued natively at 10,000 UGX per unit allocation point.", targetPath: "/services/ledger" },
        { name: "Trust Escrow Reserves", description: "Automated compliance buffer systems securing 25% of transiting remittance capital from cellular network fraud vectors.", targetPath: "/services/ledger" }
      ]
    },
    {
      categoryName: "Business & Commerce",
      options: [
        { name: "Cross-Border Trade Matrix", description: "Direct B2B import/export clearinghouse routers enabling diaspora entrepreneurs to track physical goods manifests across sub-Saharan freight corridors.", targetPath: "/register" },
        { name: "Micro-SME Capital Funding", description: "Automated credit underwriting pipelines linking verified cooperative savings accounts straight to low-interest commercial trade financing pools.", targetPath: "/register" }
      ]
    },
    {
      categoryName: "Ecosystem Portals",
      options: [
        { name: "Job Matchmaker Engine", description: "Aggregated international job vacancy search node seamlessly linking skilled diaspora professionals straight to cross-border institutional career lines.", targetPath: "/register" },
        { name: "Technical Innovation Board", description: "Regional tech incubation indices tracking ongoing project development metrics, code milestones, and collaborative engineering tracks.", targetPath: "/register" },
        { name: "Placements & Scholarships Matrix", description: "Connect university researchers to dissertation data nodes, international academic internships, and global educational placements.", targetPath: "/register" },
        { name: "Ecosystem Rules & Terms", description: "Statutory multi-tenant regulatory guidelines, operational user parameter frameworks, and corporate compliance structures.", targetPath: "/register" },
        { name: "Data Privacy Policy", description: "Strict Uganda PDPO and NITA-U data sovereignty and encryption compliance rules protecting multi-device data streams.", targetPath: "/register" },
        { name: "Legacy Foundation History", description: "The founding roadmap, charter variables, and social vision honoring the Kika co-founder legacy and cross-border milestones.", targetPath: "/register" }
      ]
    }
  ];

  // Handles state evaluation without cross-origin edge interceptions
  const handleServiceScrutiny = (option: ServiceOption) => {
    const cookiesArray = document.cookie.split("; ");
    const hasActiveSession = cookiesArray.find(row => row.startsWith("kika_session_active="));
    
    if (hasActiveSession && hasActiveSession.split("=")[1] === "true") {
      router.push(option.targetPath);
    } else {
      setTeaserService(option);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#020617", color: "#f8fafc", fontFamily: "sans-serif", position: "relative" }}>
      
      {/* HEADER COMPONENT: INTERACTIVE BRAND NAVIGATION BAR */}
      <nav style={{ backgroundColor: "#0b1528", borderBottom: "1px solid #1e293b", padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 40 }}>
        
        <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }} onClick={() => router.push("/")}>
          <span style={{ fontSize: "22px" }}>🌍</span>
          <span style={{ fontSize: "14px", fontWeight: "900", color: "#10b981", letterSpacing: "0.5px" }}>KIKA GLOBAL VENTURES</span>
        </div>

        {/* AUTOMATED HORIZONTAL MENU DROPDOWNS LOOP */}
        <div style={{ display: "flex", gap: "28px" }} onClick={(e) => e.stopPropagation()}>
          
          <div style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "6px", padding: "4px 10px", color: "#10b981", fontSize: "11px", fontWeight: "bold", fontFamily: "monospace", display: "flex", alignItems: "center" }}>
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
          <button onClick={() => router.push("/login")} style={{ background: "transparent", border: "1px solid #334155", color: "#ffffff", padding: "8px 16px", borderRadius: "6px", fontSize: "12.5px", fontWeight: "bold", cursor: "pointer" }}>Sign In</button>
          <button onClick={() => router.push("/register")} style={{ background: "#10b981", border: "none", color: "#020617", padding: "8px 16px", borderRadius: "6px", fontSize: "12.5px", fontWeight: "bold", cursor: "pointer" }}>Enroll</button>
        </div>
      </nav>
      {/* CORE BRAND INSCRIPTION COPY WRITING HEADER */}
      <header style={{ maxWidth: "850px", margin: "0 auto", padding: "110px 20px 50px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "42px", fontWeight: "900", color: "#ffffff", margin: "0 0 18px 0", lineHeight: "1.2", letterSpacing: "-0.5px" }}>
          Cross-Border Diaspora Automation <br />
          <span style={{ color: "#3b82f6" }}>Ecosystem</span>
        </h1>
        <p style={{ fontSize: "15.5px", color: "#64748b", lineHeight: "1.7", margin: "0 0 35px 0" }}>
          Unified technical channels bridging global communication, remittance capital trunks, and local cooperative SACCO ledgers seamlessly from your disk. Explore active options inside the dropdown navigation panels above.
        </p>
      </header>

      {/* MID-LEVEL PROMINENT SERVICE SHORTCUT QUICK BUTTON PANELS GRID ROW */}
      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 20px 80px 20px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "25px" }}>
        
        {/* ACTION BUTTON CARD 1: VOICE TRANSMISSION CORE */}
        <div 
          onClick={() => handleServiceScrutiny({ name: "🎙️ Low-Tariff Full-Duplex VoIP", description: "Disrupting traditional telecom tariffs. High-velocity PCM sound wave streaming delivering ultra-cheap voice tunnels directly to KiKa diaspora membership networks.", targetPath: "/services/voip" })}
          style={{ backgroundColor: "#0b1329", padding: "30px", borderRadius: "14px", border: "1px solid #1e293b", cursor: "pointer", transition: "0.2s" }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = "#34d399"}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = "#1e293b"}
        >
          <h3 style={{ color: "#ffffff", margin: "0 0 8px 0", fontSize: "18px", fontWeight: "bold" }}>🗣️ Voice Link</h3>
          <p style={{ color: "#64748b", margin: 0, fontSize: "13px", lineHeight: "1.6" }}>Open secure 3x3 circular layout dialpad keypad consoles to fire outbound proxy calls over production network paths.</p>
        </div>

        {/* ACTION BUTTON CARD 2: BANK REMITTANCE LEDGER TRUNK */}
        <div 
          onClick={() => handleServiceScrutiny({ name: "CNY Remittance & Core Banking Bridge", description: "Automating send-money pathways from international bank channels straight to East African Mobile Money wallets (MTN MoMo & Airtel Money) via secure corporate clearinghouses.", targetPath: "/services/ledger" })}
          style={{ backgroundColor: "#0b1329", padding: "30px", borderRadius: "14px", border: "1px solid #1e293b", cursor: "pointer", transition: "0.2s" }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = "#3b82f6"}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = "#1e293b"}
        >
          <h3 style={{ color: "#ffffff", margin: "0 0 8px 0", fontSize: "18px", fontWeight: "bold" }}>💳 Remittance Trunk</h3>
          <p style={{ color: "#64748b", margin: 0, fontSize: "13px", lineHeight: "1.6" }}>Access multi-country exchange calculation rate windows to route capital straight to local sub-Saharan wallet registers.</p>
        </div>
      </main>

      {/* 🛡️ THE INFAILLIBLE INTERACTIVE GATED TEASER TEXT WINDOW MODAL BOX SHEET */}
      {teaserService && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(2, 6, 23, 0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999, backdropFilter: "blur(5px)" }}>
          <div style={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "16px", padding: "35px", maxWidth: "460px", width: "90%", boxSizing: "border-box", textAlign: "center", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
            
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>🔒</div>
            <h3 style={{ color: "#ffffff", fontSize: "18px", margin: "0 0 10px 0", fontWeight: "bold" }}>{teaserService.name}</h3>
            
            <p style={{ color: "#94a3b8", fontSize: "13.5px", lineHeight: "1.6", margin: "0 0 25px 0" }}>
              {teaserService.description}
              <br /><br />
              <strong style={{ color: "#cbd5e1" }}>If you are interested in activating this core service module, please click on the registry authorization button beneath to secure your official profile.</strong>
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button 
                onClick={() => { setTeaserService(null); router.push("/register"); }}
                style={{ width: "100%", padding: "14px", backgroundColor: "#10b981", color: "#020617", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "bold", cursor: "pointer", boxShadow: "0 4px 14px rgba(16, 185, 129, 0.3)" }}
              >
                Enroll inside Member Registry
              </button>
              <button 
                onClick={() => setTeaserService(null)}
                style={{ width: "100%", padding: "12px", backgroundColor: "transparent", color: "#64748b", border: "none", fontSize: "13px", fontWeight: "bold", cursor: "pointer" }}
              >
                Dismiss Window
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
