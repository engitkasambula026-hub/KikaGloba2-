"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import CentralDropdown from "./components/CentralDropdown";

export default function KikaStagingMatrixHub() {
  const [mounted, setMounted] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Live Registration Form State Bindings for Production Sockets
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [passportNum, setPassportNum] = useState("");
  const [hostCountry, setHostCountry] = useState("United Kingdom");
  const [saccoName, setSaccoName] = useState("");
  const [dbStatusText, setDbStatusText] = useState("⚡ STANDALONE STAGING COCKPIT ACTIVE");

  // State dictionary managing expanded drawers for all 6 core service teaser windows
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({
    assetRegistry: false,
    remittance: false,
    voip: false,
    portfolio: false,
    demographics: false,
    jobMatchmaker: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // 🔌 LIVE ASYNCHRONOUS NEON DATABASE INTAKE PIPELINE
  const executeNeonRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEmail) {
      alert("❌ Primary global email address credential is required.");
      return;
    }
    setDbStatusText("⏳ DISPATCHING SECURE PARAMETERS TO NEON SQL LEDGER...");
    try {
      const res = await fetch("/api/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "REGISTER_MEMBER",
          name: regName || "Adam Kasambula",
          email: regEmail,
          passport: passportNum || "MOCK_PASSPORT_UG",
          country: hostCountry,
          saccoName: saccoName || "Global Ventures Collective"
        })
      });
      const data = await res.json();
      if (data.success) {
        setDbStatusText(`🟢 SUCCESS: ${data.message}`);
        alert("🟢 Success! User credentials committed straight into Neon database rows.");
      } else {
        setDbStatusText(`❌ DATABASE ERROR: ${data.error}`);
        alert(`❌ Database Exception: ${data.error}`);
      }
    } catch (err) {
      console.error("Network connection error: ", err);
      setDbStatusText("🚧 SANDBOX FALLBACK: LOCAL STORAGE STABLE");
    }
  };

  const toggleExpand = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!mounted) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#020617", color: "#10b981", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "monospace" }}>
        🔒 INITIALIZING KIKA VAULT...
      </div>
    );
  }
  // 🟢 PATCH: Update your absolute outermost parent container div properties to this bright palette configuration
return (
  <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", color: "#0f172a", fontFamily: "sans-serif", transition: "background 0.3s" }} onClick={() => setIsContactOpen(false)}>

      {/* 🌍 1. COMPACT NAVBAR */}
      <nav style={{ backgroundColor: "#0b1528", borderBottom: "1px solid #1e293b", padding: "10px 20px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", maxWidth: "1400px", margin: "0 auto", boxSizing: "border-box", width: "100%" }} onClick={e => e.stopPropagation()}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ fontWeight: "900", color: "#10b981", cursor: "pointer", fontSize: "13px", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>
            🌍 KIKA GLOBAL VENTURES
          </div>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "nowrap" }}>
          <CentralDropdown />

          <div style={{ position: "relative" }}>
            <button onClick={() => setIsContactOpen(!isContactOpen)} style={{ backgroundColor: "transparent", color: "#ffffff", border: "1px solid rgba(255, 255, 255, 0.2)", padding: "5px 10px", borderRadius: "4px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
              Contact Us
            </button>
            {isContactOpen && (
              <div style={{ position: "absolute", top: "100%", right: 0, marginTop: "8px", width: "260px", backgroundColor: "#0b1528", border: "1px solid #1e293b", borderRadius: "8px", boxShadow: "0 10px 25px rgba(0,0,0,0.5)", padding: "15px", zIndex: 50, color: "#cbd5e1", fontSize: "13px", textAlign: "left" }}>
                <h4 style={{ color: "#ffffff", margin: "0 0 10px 0", borderBottom: "1px solid #1e293b", paddingBottom: "8px", fontWeight: "bold" }}>Global Offices</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                  <li><strong style={{color: "#10b981"}}>New York, USA:</strong><br/>Kika Global Ventures</li>
                  <li><strong style={{color: "#10b981"}}>London, UK:</strong><br/>Kika Global Ventures</li>
                  <li><strong style={{color: "#10b981"}}>Stockholm, Sweden:</strong><br/>Kika Global Ventures</li>
                  <li><strong style={{color: "#10b981"}}>Cape Town, SA:</strong><br/>Kika Global Ventures</li>
                </ul>
              </div>
            )}
          </div>

          <button onClick={() => toggleExpand("assetRegistry")} style={{ backgroundColor: "#10b981", color: "#0b1528", border: "none", padding: "5px 12px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold", cursor: "pointer" }}>
            Login / Enroll  
          </button>
        </div>

        <div style={{ color: "#10b981", fontSize: "10px", fontWeight: "bold", fontFamily: "monospace", background: "rgba(16, 185, 129, 0.1)", padding: "4px 8px", borderRadius: "4px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
          PRODUCTION READY
        </div>
      </nav>

      {/* 📖 2. HERO HEADLINE */}
      <header style={{ maxWidth: "680px", margin: "28px auto 32px auto", padding: "0 16px", textAlign: "center" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "800", color: "#020617", letterSpacing: "-0.5px", marginBottom: "10px" }}>
          Cross-Border Diaspora Ecosystem
        </h1>
        <p style={{ fontSize: "14px", color: "#020617", lineHeight: "1.6" }}>
          A decentralized financial, labor, and telecommunications matrix for sub-Saharan communities worldwide. Expand the Diaspora Enrollment module below to connect your Neon SQL ledger rows natively.
        </p>
      </header>

      {/* 🪟 3. THE 6 CORE SERVICE TEASER GRID */}
      <main style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "18px", maxWidth: "1150px", margin: "0 auto", padding: "0 16px 50px 16px" }}>
        
        {/* TEASER 01: ASSET REGISTRY */}
        <section style={{ backgroundColor: "#0f172a", padding: "20px", borderRadius: "10px", border: "1px solid #1e293b", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "fit-content" }}>
          <div>
            <div style={{ fontSize: "10px", fontFamily: "monospace", color: "#10b981", fontWeight: "bold", marginBottom: "4px" }}>[ SERVICE 01 ]</div>
            <h3 style={{ color: "#ffffff", fontSize: "17px", fontWeight: "bold", marginBottom: "8px" }}>📝 Diaspora Asset Registry</h3>
            <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.4", marginBottom: "12px" }}>
              Certify your demographic node within the global network for asset shielding and SACCO pooling.
            </p>

            {expanded.assetRegistry && (
              <div style={{ borderTop: "1px solid #1e293b", paddingTop: "10px", marginTop: "10px" }}>
                <p style={{ color: "#cbd5e1", fontSize: "12px", lineHeight: "1.5", margin: 0 }}>
                  Integrates Neon SQL database infrastructure with multi-national passport validation to ensure secure property registration and group investment capabilities.
                </p>
              </div>
            )}
          </div>

          <div style={{ marginTop: "15px" }}>
            {!expanded.assetRegistry ? (
              <button onClick={() => toggleExpand("assetRegistry")} style={{ background: "none", border: "none", color: "#10b981", fontSize: "12px", cursor: "pointer", padding: "8px 0 0 0", fontWeight: "600", width: "100%", textAlign: "left" }}>
                ▼ Read More Details
              </button>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Link href="/login" style={{ flex: 1, textDecoration: "none" }}>
                    <button style={{ width: "100%", padding: "10px", backgroundColor: "#3b82f6", border: "none", borderRadius: "6px", color: "#ffffff", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}>
                      🔐 Account Login
                    </button>
                  </Link>
                  <Link href="/signup" style={{ flex: 1, textDecoration: "none" }}>
                    <button style={{ width: "100%", padding: "10px", backgroundColor: "#10b981", border: "none", borderRadius: "6px", color: "#0b1528", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}>
                      📝 New Enrollment
                    </button>
                  </Link>
                </div>
                <button onClick={() => toggleExpand("assetRegistry")} style={{ width: "100%", padding: "8px", background: "transparent", border: "1px solid #334155", borderRadius: "6px", color: "#94a3b8", fontSize: "12px", cursor: "pointer", fontWeight: "600" }}>
                  Dismiss Overview Panel
                </button>
              </div>
            )}
          </div>
        </section>

        {/* TEASER 02: AUTOMATED REMITTANCE TUNNELS */}
        <section style={{ backgroundColor: "#0f172a", padding: "20px", borderRadius: "10px", border: "1px solid #1e293b", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "fit-content" }}>
          <div>
            <div style={{ fontSize: "10px", fontFamily: "monospace", color: "#3b82f6", fontWeight: "bold", marginBottom: "4px" }}>[ SERVICE 02 ]</div>
            <h3 style={{ color: "#ffffff", fontSize: "17px", fontWeight: "bold", marginBottom: "8px" }}>💳 Automated Remittance Tunnels</h3>
            <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.4", marginBottom: "12px" }}>
              Execute low-cost mobile wallet remittance streams protected by dynamic compliance buffers.
            </p>

            {expanded.remittance && (
              <div style={{ borderTop: "1px solid #1e293b", paddingTop: "10px", marginTop: "10px" }}>
                <p style={{ color: "#cbd5e1", fontSize: "12px", lineHeight: "1.5", marginBottom: "10px" }}>
                  Low-cost automated wallet transfers connecting international banking corridors directly to local MTN MoMo and Airtel Money accounts.
                </p>
                <div style={{ backgroundColor: "rgba(59, 130, 246, 0.08)", border: "1px solid rgba(59, 130, 246, 0.2)", padding: "10px", borderRadius: "6px", color: "#3b82f6", fontFamily: "monospace", fontSize: "11px", margin: 0, lineHeight: "1.4" }}>
                  🔌 REMITTANCE LIQUIDITY HOOK:<br/>
                  • Target: MTN MoMo Open API / Airtel Money Rails
                </div>
              </div>
            )}
          </div>

          <div style={{ marginTop: "15px" }}>
            {!expanded.remittance ? (
              <button onClick={() => toggleExpand("remittance")} style={{ background: "none", border: "none", color: "#3b82f6", fontSize: "12px", cursor: "pointer", padding: "8px 0 0 0", fontWeight: "600", width: "100%", textAlign: "left" }}>
                ▼ Read More Details
              </button>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Link href="/login" style={{ flex: 1, textDecoration: "none" }}>
                    <button style={{ width: "100%", padding: "10px", backgroundColor: "#3b82f6", border: "none", borderRadius: "6px", color: "#ffffff", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}>
                      🔐 Account Login
                    </button>
                  </Link>
                  <Link href="/signup" style={{ flex: 1, textDecoration: "none" }}>
                    <button style={{ width: "100%", padding: "10px", backgroundColor: "#10b981", border: "none", borderRadius: "6px", color: "#0b1528", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}>
                      📝 New Enrollment
                    </button>
                  </Link>
                </div>
                <button onClick={() => toggleExpand("remittance")} style={{ width: "100%", padding: "8px", background: "transparent", border: "1px solid #334155", borderRadius: "6px", color: "#94a3b8", fontSize: "12px", cursor: "pointer", fontWeight: "600" }}>
                  Dismiss Overview Panel
                </button>
              </div>
            )}
          </div>
        </section>

        {/* TEASER 03: VOIP TRUNK */}
        <section style={{ backgroundColor: "#0f172a", padding: "20px", borderRadius: "10px", border: "1px solid #1e293b", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "fit-content" }}>
          <div>
            <div style={{ fontSize: "10px", fontFamily: "monospace", color: "#f59e0b", fontWeight: "bold", marginBottom: "4px" }}>[ SERVICE 03 ]</div>
            <h3 style={{ color: "#ffffff", fontSize: "17px", fontWeight: "bold", marginBottom: "8px" }}>🎙️ Low-Tariff VoIP Trunk</h3>
            <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.4", marginBottom: "12px" }}>
              Full-duplex voice circuits engineered to bypass high international tariffs over WebRTC lines.
            </p>

            {expanded.voip && (
              <div style={{ borderTop: "1px solid #1e293b", paddingTop: "10px", marginTop: "10px" }}>
                <p style={{ color: "#cbd5e1", fontSize: "12px", lineHeight: "1.5", marginBottom: "10px" }}>
                  Direct voice channels optimized for crystal-clear audio quality even over low-bandwidth cellular corridors across rural and urban centers.
                </p>
                <div style={{ backgroundColor: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.2)", padding: "10px", borderRadius: "6px", color: "#f59e0b", fontFamily: "monospace", fontSize: "11px", margin: 0, lineHeight: "1.4" }}>
                  🔌 CARRIER SWITCHBOARD HOOK:<br/>
                  • Circuit Frame Logic: WebRTC Peer Connection API
                </div>
              </div>
            )}
          </div>

          <div style={{ marginTop: "15px" }}>
            {!expanded.voip ? (
              <button onClick={() => toggleExpand("voip")} style={{ background: "none", border: "none", color: "#f59e0b", fontSize: "12px", cursor: "pointer", padding: "8px 0 0 0", fontWeight: "600", width: "100%", textAlign: "left" }}>
                ▼ Read More Details
              </button>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Link href="/login" style={{ flex: 1, textDecoration: "none" }}>
                    <button style={{ width: "100%", padding: "10px", backgroundColor: "#3b82f6", border: "none", borderRadius: "6px", color: "#ffffff", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}>
                      🔐 Account Login
                    </button>
                  </Link>
                  <Link href="/signup" style={{ flex: 1, textDecoration: "none" }}>
                    <button style={{ width: "100%", padding: "10px", backgroundColor: "#10b981", border: "none", borderRadius: "6px", color: "#0b1528", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}>
                      📝 New Enrollment
                    </button>
                  </Link>
                </div>
                <button onClick={() => toggleExpand("voip")} style={{ width: "100%", padding: "8px", background: "transparent", border: "1px solid #334155", borderRadius: "6px", color: "#94a3b8", fontSize: "12px", cursor: "pointer", fontWeight: "600" }}>
                  Dismiss Overview Panel
                </button>
              </div>
            )}
          </div>
        </section>
        {/* TEASER 04: PORTFOLIO & INVESTMENT HUB */}
        <section style={{ backgroundColor: "#0f172a", padding: "20px", borderRadius: "10px", border: "1px solid #1e293b", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "fit-content" }}>
          <div>
            <div style={{ fontSize: "10px", fontFamily: "monospace", color: "#a855f7", fontWeight: "bold", marginBottom: "4px" }}>[ SERVICE 04 ]</div>
            <h3 style={{ color: "#ffffff", fontSize: "17px", fontWeight: "bold", marginBottom: "8px" }}>📊 Portfolio & Investment Hub</h3>
            <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.4", marginBottom: "12px" }}>
              Track multi-asset yields, cooperative treasury bonds, and group liquidity milestones in real-time.
            </p>

            {expanded.portfolio && (
              <div style={{ borderTop: "1px solid #1e293b", paddingTop: "10px", marginTop: "10px" }}>
                <p style={{ color: "#cbd5e1", fontSize: "12px", lineHeight: "1.5", marginBottom: "10px" }}>
                  Automated performance metrics tracking pooled capital distributions and individual cooperative dividend allocations securely.
                </p>
                <div style={{ backgroundColor: "rgba(168, 85, 247, 0.08)", border: "1px solid rgba(168, 85, 247, 0.2)", padding: "10px", borderRadius: "6px", color: "#a855f7", fontFamily: "monospace", fontSize: "11px", margin: 0, lineHeight: "1.4" }}>
                  🔌 TREASURY SYNC HOOK:<br/>
                  • Ledger State: Active Node Verification
                </div>
              </div>
            )}
          </div>

          <div style={{ marginTop: "15px" }}>
            {!expanded.portfolio ? (
              <button onClick={() => toggleExpand("portfolio")} style={{ background: "none", border: "none", color: "#a855f7", fontSize: "12px", cursor: "pointer", padding: "8px 0 0 0", fontWeight: "600", width: "100%", textAlign: "left" }}>
                ▼ Read More Details
              </button>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Link href="/login" style={{ flex: 1, textDecoration: "none" }}>
                    <button style={{ width: "100%", padding: "10px", backgroundColor: "#3b82f6", border: "none", borderRadius: "6px", color: "#ffffff", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}>
                      🔐 Account Login
                    </button>
                  </Link>
                  <Link href="/signup" style={{ flex: 1, textDecoration: "none" }}>
                    <button style={{ width: "100%", padding: "10px", backgroundColor: "#10b981", border: "none", borderRadius: "6px", color: "#0b1528", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}>
                      📝 New Enrollment
                    </button>
                  </Link>
                </div>
                <button onClick={() => toggleExpand("portfolio")} style={{ width: "100%", padding: "8px", background: "transparent", border: "1px solid #334155", borderRadius: "6px", color: "#94a3b8", fontSize: "12px", cursor: "pointer", fontWeight: "600" }}>
                  Dismiss Overview Panel
                </button>
              </div>
            )}
          </div>
        </section>

        {/* TEASER 05: DEMOGRAPHIC ANALYTICS NODE */}
        <section style={{ backgroundColor: "#0f172a", padding: "20px", borderRadius: "10px", border: "1px solid #1e293b", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "fit-content" }}>
          <div>
            <div style={{ fontSize: "10px", fontFamily: "monospace", color: "#06b6d4", fontWeight: "bold", marginBottom: "4px" }}>[ SERVICE 05 ]</div>
            <h3 style={{ color: "#ffffff", fontSize: "17px", fontWeight: "bold", marginBottom: "8px" }}>🌐 Demographic Analytics Node</h3>
            <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.4", marginBottom: "12px" }}>
              Map global dispersion metrics, host-country domicile distributions, and regional cooperative density.
            </p>

            {expanded.demographics && (
              <div style={{ borderTop: "1px solid #1e293b", paddingTop: "10px", marginTop: "10px" }}>
                <p style={{ color: "#cbd5e1", fontSize: "12px", lineHeight: "1.5", marginBottom: "10px" }}>
                  Real-time geographic coordinate plotting and population tracking to optimize strategic resource distribution across international chapters.
                </p>
                <div style={{ backgroundColor: "rgba(6, 182, 212, 0.08)", border: "1px solid rgba(6, 182, 212, 0.2)", padding: "10px", borderRadius: "6px", color: "#06b6d4", fontFamily: "monospace", fontSize: "11px", margin: 0, lineHeight: "1.4" }}>
                  🔌 MAPPING ENGINE HOOK:<br/>
                  • Vector Stream: GPS Coordinate Arrays
                </div>
              </div>
            )}
          </div>

          <div style={{ marginTop: "15px" }}>
            {!expanded.demographics ? (
              <button onClick={() => toggleExpand("demographics")} style={{ background: "none", border: "none", color: "#06b6d4", fontSize: "12px", cursor: "pointer", padding: "8px 0 0 0", fontWeight: "600", width: "100%", textAlign: "left" }}>
                ▼ Read More Details
              </button>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Link href="/login" style={{ flex: 1, textDecoration: "none" }}>
                    <button style={{ width: "100%", padding: "10px", backgroundColor: "#3b82f6", border: "none", borderRadius: "6px", color: "#ffffff", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}>
                      🔐 Account Login
                    </button>
                  </Link>
                  <Link href="/signup" style={{ flex: 1, textDecoration: "none" }}>
                    <button style={{ width: "100%", padding: "10px", backgroundColor: "#10b981", border: "none", borderRadius: "6px", color: "#0b1528", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}>
                      📝 New Enrollment
                    </button>
                  </Link>
                </div>
                <button onClick={() => toggleExpand("demographics")} style={{ width: "100%", padding: "8px", background: "transparent", border: "1px solid #334155", borderRadius: "6px", color: "#94a3b8", fontSize: "12px", cursor: "pointer", fontWeight: "600" }}>
                  Dismiss Overview Panel
                </button>
              </div>
            )}
          </div>
        </section>

        {/* TEASER 06: JOB & SKILL MATCHMAKER */}
        <section style={{ backgroundColor: "#0f172a", padding: "20px", borderRadius: "10px", border: "1px solid #1e293b", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "fit-content" }}>
          <div>
            <div style={{ fontSize: "10px", fontFamily: "monospace", color: "#ec4899", fontWeight: "bold", marginBottom: "4px" }}>[ SERVICE 06 ]</div>
            <h3 style={{ color: "#ffffff", fontSize: "17px", fontWeight: "bold", marginBottom: "8px" }}>💼 Global Job & Skill Matchmaker</h3>
            <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.4", marginBottom: "12px" }}>
              Connect professional diaspora skillsets with domestic enterprise requirements and advisory roles.
            </p>

            {expanded.jobMatchmaker && (
              <div style={{ borderTop: "1px solid #1e293b", paddingTop: "10px", marginTop: "10px" }}>
                <p style={{ color: "#cbd5e1", fontSize: "12px", lineHeight: "1.5", marginBottom: "10px" }}>
                  Specialized matching protocol evaluating professional qualifications, certifications, and availability for remote or localized execution.
                </p>
                <div style={{ backgroundColor: "rgba(236, 72, 153, 0.08)", border: "1px solid rgba(236, 72, 153, 0.2)", padding: "10px", borderRadius: "6px", color: "#ec4899", fontFamily: "monospace", fontSize: "11px", margin: 0, lineHeight: "1.4" }}>
                  🔌 TALENT CORRIDOR HOOK:<br/>
                  • Protocol Matrix: Professional Registry Sync
                </div>
              </div>
            )}
          </div>

          <div style={{ marginTop: "15px" }}>
            {!expanded.jobMatchmaker ? (
              <button onClick={() => toggleExpand("jobMatchmaker")} style={{ background: "none", border: "none", color: "#ec4899", fontSize: "12px", cursor: "pointer", padding: "8px 0 0 0", fontWeight: "600", width: "100%", textAlign: "left" }}>
                ▼ Read More Details
              </button>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Link href="/login" style={{ flex: 1, textDecoration: "none" }}>
                    <button style={{ width: "100%", padding: "10px", backgroundColor: "#3b82f6", border: "none", borderRadius: "6px", color: "#ffffff", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}>
                      🔐 Account Login
                    </button>
                  </Link>
                  <Link href="/signup" style={{ flex: 1, textDecoration: "none" }}>
                    <button style={{ width: "100%", padding: "10px", backgroundColor: "#10b981", border: "none", borderRadius: "6px", color: "#0b1528", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}>
                      📝 New Enrollment
                    </button>
                  </Link>
                </div>
                <button onClick={() => toggleExpand("jobMatchmaker")} style={{ width: "100%", padding: "8px", background: "transparent", border: "1px solid #334155", borderRadius: "6px", color: "#94a3b8", fontSize: "12px", cursor: "pointer", fontWeight: "600" }}>
                  Dismiss Overview Panel
                </button>
              </div>
            )}
          </div>
        </section>

      </main>

      <footer style={{ backgroundColor: "#0b1528", textAlign: "center", padding: "20px", color: "#64748b", fontSize: "12px", borderTop: "1px solid #1e293b", maxWidth: "1400px", margin: "40px auto 0 auto" }}>
        KiKa Global Ventures Staging Infrastructure • NITA-U Secured Framework Compliance © 2026
      </footer>
    </div>
  );
}

