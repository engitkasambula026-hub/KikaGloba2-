"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import CentralDropdown from "./components/CentralDropdown";

export default function KikaStagingMatrixHub() {
  const [mounted, setMounted] = useState(false);

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

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#020617", color: "#f8fafc", fontFamily: "sans-serif" }}>
      
      {/* 🌍 1. COMPACT NAVBAR */}
      <nav style={{ 
        backgroundColor: "#0b1528", 
        borderBottom: "1px solid #1e293b", 
        padding: "10px 24px", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        maxWidth: "1200px",
        margin: "0 auto",
        boxSizing: "border-box"
      }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ fontWeight: "900", color: "#10b981", cursor: "pointer", fontSize: "16px", letterSpacing: "0.5px" }}>
            🌍 KIKA GLOBAL
          </div>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <CentralDropdown />
        </div>

        <div style={{ color: "#10b981", fontSize: "10px", fontWeight: "bold", fontFamily: "monospace", background: "rgba(16, 185, 129, 0.1)", padding: "4px 10px", borderRadius: "4px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
          ACTIVE
        </div>
      </nav>

      {/* 📖 2. HERO HEADLINE */}
      <header style={{ maxWidth: "680px", margin: "28px auto 32px auto", padding: "0 16px", textAlign: "center" }}>
        <h1 style={{ fontSize: "30px", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.5px", marginBottom: "10px" }}>
          Cross-Border Diaspora Ecosystem
        </h1>
        <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: "1.6", margin: "0 auto", maxWidth: "600px" }}>
          A decentralized financial, labor, and telecommunications matrix for sub-Saharan communities worldwide. Select any service preview below to expand or enroll directly.
        </p>
      </header>

      {/* 🪟 3. THE 6 CORE SERVICE TEASER GRID */}
      <main style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
        gap: "18px", 
        maxWidth: "1150px", 
        margin: "0 auto", 
        padding: "0 16px 50px 16px" 
      }}>
        
        {/* TEASER 01: ASSET REGISTRY */}
        <section style={{ backgroundColor: "#0f172a", padding: "20px", borderRadius: "10px", border: "1px solid #1e293b", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "10px", fontFamily: "monospace", color: "#10b981", fontWeight: "bold", marginBottom: "4px" }}>[ SERVICE 01 ]</div>
            <h3 style={{ color: "#ffffff", fontSize: "17px", fontWeight: "bold", marginBottom: "8px" }}>📝 Diaspora Asset Registry</h3>
            <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.4", marginBottom: "12px" }}>
              Certify your demographic node within the global network for asset shielding and SACCO pooling.
            </p>

            {expanded.assetRegistry && (
              <div style={{ borderTop: "1px solid #1e293b", paddingTop: "10px", marginTop: "10px" }}>
                <p style={{ color: "#cbd5e1", fontSize: "12px", lineHeight: "1.5", marginBottom: "10px" }}>
                  Integrates Neon SQL database infrastructure with multi-national passport validation to ensure secure property registration and group investment capabilities.
                </p>
                <ul style={{ color: "#64748b", fontSize: "11px", paddingLeft: "16px", marginBottom: "12px", lineHeight: "1.6" }}>
                  <li>Immutable Neon SQL Ledger Logging</li>
                  <li>Cross-Border Asset Shielding</li>
                  <li>Multi-Signatory Verification</li>
                </ul>
              </div>
            )}
          </div>

          <div>
            {!expanded.assetRegistry ? (
              <button onClick={() => toggleExpand("assetRegistry")} style={{ background: "none", border: "none", color: "#10b981", fontSize: "12px", cursor: "pointer", padding: "8px 0 0 0", fontWeight: "600", width: "100%", textAlign: "left" }}>
                ▼ Read More Details
              </button>
            ) : (
              <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <button onClick={() => toggleExpand("assetRegistry")} style={{ flex: 1, padding: "8px", background: "transparent", border: "1px solid #334155", borderRadius: "6px", color: "#94a3b8", fontSize: "12px", cursor: "pointer" }}>
                  Dismiss
                </button>
                <Link href="/register" style={{ flex: 2, textDecoration: "none" }}>
                  <button style={{ width: "100%", padding: "8px", backgroundColor: "#10b981", border: "none", borderRadius: "6px", color: "#020617", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}>
                    Enroll / Sign Up →
                  </button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* TEASER 02: SEND-MONEY REMITTANCE */}
        <section style={{ backgroundColor: "#0f172a", padding: "20px", borderRadius: "10px", border: "1px solid #1e293b", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "10px", fontFamily: "monospace", color: "#3b82f6", fontWeight: "bold", marginBottom: "4px" }}>[ SERVICE 02 ]</div>
            <h3 style={{ color: "#ffffff", fontSize: "17px", fontWeight: "bold", marginBottom: "8px" }}>💳 Send-Money Remittance</h3>
            <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.4", marginBottom: "12px" }}>
              High-speed cross-border liquidity routing directly to mobile money wallets across East Africa.
            </p>

            {expanded.remittance && (
              <div style={{ borderTop: "1px solid #1e293b", paddingTop: "10px", marginTop: "10px" }}>
                <p style={{ color: "#cbd5e1", fontSize: "12px", lineHeight: "1.5", marginBottom: "10px" }}>
                  Low-cost automated wallet transfers connecting international banking corridors directly to local MTN MoMo and Airtel Money accounts.
                </p>
                <ul style={{ color: "#64748b", fontSize: "11px", paddingLeft: "16px", marginBottom: "12px", lineHeight: "1.6" }}>
                  <li>Direct Cellular Liquidity Tunnels</li>
                  <li>Automated Real-Time Audit Trails</li>
                  <li>Zero Foreign Exchange Surcharge Escrow</li>
                </ul>
              </div>
            )}
          </div>

          <div>
            {!expanded.remittance ? (
              <button onClick={() => toggleExpand("remittance")} style={{ background: "none", border: "none", color: "#3b82f6", fontSize: "12px", cursor: "pointer", padding: "8px 0 0 0", fontWeight: "600", width: "100%", textAlign: "left" }}>
                ▼ Read More Details
              </button>
            ) : (
              <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <button onClick={() => toggleExpand("remittance")} style={{ flex: 1, padding: "8px", background: "transparent", border: "1px solid #334155", borderRadius: "6px", color: "#94a3b8", fontSize: "12px", cursor: "pointer" }}>
                  Dismiss
                </button>
                <Link href="/register" style={{ flex: 2, textDecoration: "none" }}>
                  <button style={{ width: "100%", padding: "8px", backgroundColor: "#3b82f6", border: "none", borderRadius: "6px", color: "#ffffff", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}>
                    Enroll / Transfer →
                  </button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* TEASER 03: VOIP TRUNK */}
        <section style={{ backgroundColor: "#0f172a", padding: "20px", borderRadius: "10px", border: "1px solid #1e293b", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
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
                <ul style={{ color: "#64748b", fontSize: "11px", paddingLeft: "16px", marginBottom: "12px", lineHeight: "1.6" }}>
                  <li>PCM Dual-Channel Stream Processing</li>
                  <li>WebRTC Low-Latency Carrier Sockets</li>
                  <li>Dedicated Diaspora Call Routing</li>
                </ul>
              </div>
            )}
          </div>

          <div>
            {!expanded.voip ? (
              <button onClick={() => toggleExpand("voip")} style={{ background: "none", border: "none", color: "#f59e0b", fontSize: "12px", cursor: "pointer", padding: "8px 0 0 0", fontWeight: "600", width: "100%", textAlign: "left" }}>
                ▼ Read More Details
              </button>
            ) : (
              <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <button onClick={() => toggleExpand("voip")} style={{ flex: 1, padding: "8px", background: "transparent", border: "1px solid #334155", borderRadius: "6px", color: "#94a3b8", fontSize: "12px", cursor: "pointer" }}>
                  Dismiss
                </button>
                <Link href="/register" style={{ flex: 2, textDecoration: "none" }}>
                  <button style={{ width: "100%", padding: "8px", backgroundColor: "#f59e0b", border: "none", borderRadius: "6px", color: "#020617", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}>
                    Enroll / Connect →
                  </button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* TEASER 04: PORTFOLIO INVESTMENT FUND */}
        <section style={{ backgroundColor: "#0f172a", padding: "20px", borderRadius: "10px", border: "1px solid #1e293b", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "10px", fontFamily: "monospace", color: "#8b5cf6", fontWeight: "bold", marginBottom: "4px" }}>[ SERVICE 04 ]</div>
            <h3 style={{ color: "#ffffff", fontSize: "17px", fontWeight: "bold", marginBottom: "8px" }}>📈 Portfolio Investment Fund</h3>
            <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.4", marginBottom: "12px" }}>
              Pooled capital growth instruments enabling collective investment in high-yield local infrastructure.
            </p>

            {expanded.portfolio && (
              <div style={{ borderTop: "1px solid #1e293b", paddingTop: "10px", marginTop: "10px" }}>
                <p style={{ color: "#cbd5e1", fontSize: "12px", lineHeight: "1.5", marginBottom: "10px" }}>
                  Empowers individuals and registered cooperatives to pool capital into audited real estate, commercial farming, and tech equity projects across Africa.
                </p>
                <ul style={{ color: "#64748b", fontSize: "11px", paddingLeft: "16px", marginBottom: "12px", lineHeight: "1.6" }}>
                  <li>Automated Dividend Distribution Ledger</li>
                  <li>Shielded Multi-Sig Capital Pools</li>
                  <li>Audited Quarterly Performance Tracking</li>
                </ul>
              </div>
            )}
          </div>

          <div>
            {!expanded.portfolio ? (
              <button onClick={() => toggleExpand("portfolio")} style={{ background: "none", border: "none", color: "#8b5cf6", fontSize: "12px", cursor: "pointer", padding: "8px 0 0 0", fontWeight: "600", width: "100%", textAlign: "left" }}>
                ▼ Read More Details
              </button>
            ) : (
              <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <button onClick={() => toggleExpand("portfolio")} style={{ flex: 1, padding: "8px", background: "transparent", border: "1px solid #334155", borderRadius: "6px", color: "#94a3b8", fontSize: "12px", cursor: "pointer" }}>
                  Dismiss
                </button>
                <Link href="/register" style={{ flex: 2, textDecoration: "none" }}>
                  <button style={{ width: "100%", padding: "8px", backgroundColor: "#8b5cf6", border: "none", borderRadius: "6px", color: "#ffffff", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}>
                    Enroll / Invest →
                  </button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* TEASER 05: DIASPORA DEMOGRAPHICAL REGISTRY */}
        <section style={{ backgroundColor: "#0f172a", padding: "20px", borderRadius: "10px", border: "1px solid #1e293b", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "10px", fontFamily: "monospace", color: "#ec4899", fontWeight: "bold", marginBottom: "4px" }}>[ SERVICE 05 ]</div>
            <h3 style={{ color: "#ffffff", fontSize: "17px", fontWeight: "bold", marginBottom: "8px" }}>🌐 Demographic Registry</h3>
            <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.4", marginBottom: "12px" }}>
              Global mapping database aggregating skill distributions and consular demographic data.
            </p>

            {expanded.demographics && (
              <div style={{ borderTop: "1px solid #1e293b", paddingTop: "10px", marginTop: "10px" }}>
                <p style={{ color: "#cbd5e1", fontSize: "12px", lineHeight: "1.5", marginBottom: "10px" }}>
                  Maps diaspora population nodes worldwide to facilitate institutional policy advocacy, trade agreements, and targeted community development initiatives.
                </p>
                <ul style={{ color: "#64748b", fontSize: "11px", paddingLeft: "16px", marginBottom: "12px", lineHeight: "1.6" }}>
                  <li>Global Node Distribution Mapping</li>
                  <li>Consular Level Verification Protocols</li>
                  <li>Privacy-Preserving Encrypted Profiles</li>
                </ul>
              </div>
            )}
          </div>

          <div>
            {!expanded.demographics ? (
              <button onClick={() => toggleExpand("demographics")} style={{ background: "none", border: "none", color: "#ec4899", fontSize: "12px", cursor: "pointer", padding: "8px 0 0 0", fontWeight: "600", width: "100%", textAlign: "left" }}>
                ▼ Read More Details
              </button>
            ) : (
              <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <button onClick={() => toggleExpand("demographics")} style={{ flex: 1, padding: "8px", background: "transparent", border: "1px solid #334155", borderRadius: "6px", color: "#94a3b8", fontSize: "12px", cursor: "pointer" }}>
                  Dismiss
                </button>
                <Link href="/register" style={{ flex: 2, textDecoration: "none" }}>
                  <button style={{ width: "100%", padding: "8px", backgroundColor: "#ec4899", border: "none", borderRadius: "6px", color: "#ffffff", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}>
                    Enroll / Register →
                  </button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* TEASER 06: JOB MATCHMAKER ENGINE */}
        <section style={{ backgroundColor: "#0f172a", padding: "20px", borderRadius: "10px", border: "1px solid #1e293b", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "10px", fontFamily: "monospace", color: "#06b6d4", fontWeight: "bold", marginBottom: "4px" }}>[ SERVICE 06 ]</div>
            <h3 style={{ color: "#ffffff", fontSize: "17px", fontWeight: "bold", marginBottom: "8px" }}>💼 Job Matchmaker Engine</h3>
            <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.4", marginBottom: "12px" }}>
              Direct skill-matching engine connecting diaspora professionals with enterprise opportunities.
            </p>

            {expanded.jobMatchmaker && (
              <div style={{ borderTop: "1px solid #1e293b", paddingTop: "10px", marginTop: "10px" }}>
                <p style={{ color: "#cbd5e1", fontSize: "12px", lineHeight: "1.5", marginBottom: "10px" }}>
                  Automated talent engine aligning regional expertise with remote and on-site contracts across corporate, government, and NGO sectors.
                </p>
                <ul style={{ color: "#64748b", fontSize: "11px", paddingLeft: "16px", marginBottom: "12px", lineHeight: "1.6" }}>
                  <li>Automated Skill-to-Contract Parsing</li>
                  <li>Cross-Border Consulting Escrow</li>
                  <li>Verified Credentials Registry</li>
                </ul>
              </div>
            )}
          </div>

          <div>
            {!expanded.jobMatchmaker ? (
              <button onClick={() => toggleExpand("jobMatchmaker")} style={{ background: "none", border: "none", color: "#06b6d4", fontSize: "12px", cursor: "pointer", padding: "8px 0 0 0", fontWeight: "600", width: "100%", textAlign: "left" }}>
                ▼ Read More Details
              </button>
            ) : (
              <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <button onClick={() => toggleExpand("jobMatchmaker")} style={{ flex: 1, padding: "8px", background: "transparent", border: "1px solid #334155", borderRadius: "6px", color: "#94a3b8", fontSize: "12px", cursor: "pointer" }}>
                  Dismiss
                </button>
                <Link href="/register" style={{ flex: 2, textDecoration: "none" }}>
                  <button style={{ width: "100%", padding: "8px", backgroundColor: "#06b6d4", border: "none", borderRadius: "6px", color: "#020617", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}>
                    Enroll / Join Engine →
                  </button>
                </Link>
              </div>
            )}
          </div>
        </section>

      </main>

      {/* 📞 4. FOOTER DIRECTORY */}
      <footer style={{ backgroundColor: "#0b1528", padding: "20px 16px", borderTop: "1px solid #1e293b" }}>
        <div style={{ maxWidth: "1150px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", color: "#cbd5e1", fontSize: "13px" }}>
            <span>🇺🇬 Kampala: +256 700 000 000</span>
            <span style={{ color: "#334155" }}>|</span>
            <span>🇬🇧 London: +44 20 7000 0000</span>
            <span style={{ color: "#334155" }}>|</span>
            <span>🇺🇸 New York: +1 212 000 0000</span>
          </div>
          <div style={{ color: "#64748b", fontSize: "11px", textAlign: "center" }}>
            KiKa Global Ventures Staging Infrastructure • NITA-U Secured Framework Compliance © 2026
          </div>
        </div>
      </footer>
      
    </div>
  );
}