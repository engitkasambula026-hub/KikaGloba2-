"use client";
// 🟢 FIXED CALIBRATION: Included useRef right next to your useState and useEffect parameters
import React, { useState, useEffect, useRef } from "react";

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

  // 🟢 PASTE HERE: Your 2 new security session state tracking variables injected cleanly
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // State dictionary managing expanded drawers for all 6 core service teaser windows
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({
    assetRegistry: false,
    remittance: false,
    voip: false,
    portfolio: false,
    demographics: false,
    jobMatchmaker: false,
  });
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

    // (Your existing toggle function sits right here)
  const toggleExpand = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 🟢 PASTE HERE: Drop the entire session clear and 15-minute inactivity security lock right here!
  // ❌ EXPLICIT SESSION CLEAR ACTION GATE
  const handleGlobalSignOut = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    document.cookie = "kika_session_active=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "kika_session_active=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; Secure";
    setIsLoggedIn(false);
    window.location.reload(); 
  };

    // 🟢 THREAD 1: Pure client hydration tracker pass
  useEffect(() => {
    setMounted(true);
  }, []);

   // ⏱️ THREAD 2: UPGRADED DUAL-STAGE SECURITY LOCK (15 Min Total, Warning at Final 10 Seconds)
  useEffect(() => {
    if (!mounted) return;

    const hasActiveSession = document.cookie.includes("kika_session_active=true");
    setIsLoggedIn(hasActiveSession);

    if (!hasActiveSession) return;

    // 📊 Core Countdown Intervals
    const TOTAL_LIMIT = 15 * 60 * 1000; // 15 Minutes total session lifespan
    const WARNING_BUFFER = 10 * 1000;   // 10 Seconds warning window duration
    const TIME_BEFORE_WARNING = TOTAL_LIMIT - WARNING_BUFFER; // 14 Minutes, 50 Seconds

    const triggerHardLockdown = () => {
      alert("🔒 Security Lock: Your session has ended due to 15 minutes of inactivity.");
      handleGlobalSignOut();
    };

    const runSecurityLifecycle = () => {
      // 1️⃣ Clear any active running memory loops
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // 2️⃣ Stage Stage A: Wait 14 minutes and 50 seconds, then throw your 10-second warning prompt
      timeoutRef.current = setTimeout(() => {
        
        // Displays a browser confirmation window box layer checking if the user is still there
        const keepsSessionAlive = window.confirm("⚠️ Inactivity Alert: Your session will expire in 10 seconds. Do you want to stay logged in?");
        
        if (keepsSessionAlive) {
          // User clicked "OK" -> Restart the 15-minute clock fresh from zero!
          runSecurityLifecycle();
        } else {
          // User clicked "Cancel" or ignored -> Execute immediate hard lock down pass
          triggerHardLockdown();
        }
      }, TIME_BEFORE_WARNING);
    };

    // Human Interaction Listeners that automatically reset the clock when movement is detected
    const resetOnUserMovement = () => {
      runSecurityLifecycle();
    };

    const interactionEvents = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];
    
    // Launch the master tracking loop instantly on mount
    runSecurityLifecycle();

    interactionEvents.forEach(evt => document.addEventListener(evt, resetOnUserMovement));
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      interactionEvents.forEach(evt => document.removeEventListener(evt, resetOnUserMovement));
    };
  }, [mounted]);



  // 🟢 PATCH: Update your absolute outermost parent container div properties to this bright palette configuration
return (
  <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", color: "#0f172a", fontFamily: "sans-serif", transition: "background 0.3s" }} onClick={() => setIsContactOpen(false)}>

      {/* 🌍 1. COMPACT NAVBAR */}
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

          {/* 🚪 ADAPTIVE CONTROLS: Renders cockpit links and logout triggers when logged in */}
          {isLoggedIn ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Link href="/dashboard" style={{ textDecoration: "none" }}>
                <button style={{ backgroundColor: "#3b82f6", color: "#ffffff", border: "none", padding: "5px 12px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold", cursor: "pointer" }}>
                  🎛️ My Cockpit
                </button>
              </Link>
              <button 
                onClick={handleGlobalSignOut} 
                style={{ background: "transparent", border: "1px solid #ef4444", color: "#ef4444", padding: "4px 10px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold", cursor: "pointer", transition: "all 0.2s" }}
              >
                🚪 Sign Out
              </button>
            </div>
          ) : (
            <Link href="/login" style={{ textDecoration: "none" }}>
              <button style={{ backgroundColor: "#10b981", color: "#0b1528", border: "none", padding: "5px 12px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold", cursor: "pointer" }}>
                🔐 Sign In / Enroll
              </button>
            </Link>
          )}
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

           {/* EXPANDABLE CORRIDOR DETAILS */}
{expanded.assetRegistry && (
  <div style={{ borderTop: "1px solid #1e293b", paddingTop: "10px", marginTop: "10px" }}>
    <p style={{ color: "#cbd5e1", fontSize: "12px", lineHeight: "1.5", margin: 0 }}>
      Integrates cloud relational infrastructure with multi-national identity validation to secure shared pooling tracks natively inside secure data columns.
    </p>
  </div>
)}
</div>

{/* TERMINAL CONTROLS */}
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

           {/* EXPANDABLE CORRIDOR DETAILS */}
{expanded.remittance && (
  <div style={{ borderTop: "1px solid #1e293b", paddingTop: "10px", marginTop: "10px" }}>
    <p style={{ color: "#cbd5e1", fontSize: "12px", lineHeight: "1.5", marginBottom: "10px" }}>
      Low-cost automated wallet transfers connecting international banking corridors directly to local MTN MoMo and Airtel Money accounts.
    </p>
  </div>
)}
</div>

{/* TERMINAL CONTROLS */}
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

            {/* EXPANDABLE CORRIDOR DETAILS */}
            {expanded.voip && (
              <div style={{ borderTop: "1px solid #1e293b", paddingTop: "10px", marginTop: "10px" }}>
                <p style={{ color: "#cbd5e1", fontSize: "12px", lineHeight: "1.5", marginBottom: "10px" }}>
                  Direct voice channels optimized for crystal-clear audio quality even over low-bandwidth cellular corridors across rural and urban centers.
                </p>

                {/* SWEDISH KRONA VOUCHER REDEMPTION COMPONENT */}
                <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "2px dashed #334155" }}>
                  <h4 style={{ margin: "0 0 6px 0", fontSize: "14px", color: "#ffffff", fontWeight: "bold" }}>🎫 KiKa Airtime Voucher Matrix (SEK Core)</h4>
                  <p style={{ margin: "0 0 12px 0", fontSize: "12px", color: "#94a3b8" }}>Redeem official SEK vouchers instantly to capitalize your per-second calling wallet balance.</p>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input type="text" placeholder="Enter alphanumeric SEK code token" id="sekVoucherField" style={{ padding: "10px", border: "1px solid #475569", backgroundColor: "#0f172a", borderRadius: "6px", flex: 1, fontSize: "12px", color: "#ffffff" }} />
                    <button type="button" onClick={async () => {
                      const codeVal = (document.getElementById("sekVoucherField") as HTMLInputElement).value;
                      if(!codeVal) return alert("❌ Input code string is empty.");
                      const response = await fetch("/api/voip/voucher", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({ email: typeof regEmail !== 'undefined' ? regEmail : "engitkasambula026@gmail.com", voucherCode: codeVal })
                      });
                      const resData = await response.json();
                      if(resData.success) {
                        alert(resData.message);
                        if (typeof setDbStatusText !== 'undefined') setDbStatusText(`✨ WALLET CREDIT ACTIVE: Balance updated on rows.`);
                      } else {
                        alert(`❌ Redemption Blocked: ${resData.error}`);
                      }
                    }} style={{ padding: "10px 16px", background: "#10b981", color: "#0b1528", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", cursor: "pointer" }}>Redeem SEK</button>
                  </div>
                </div>

                {/* INTERACTIVE SACCO COOPERATIVE CONSOLE */}
                <div style={{ padding: "20px", backgroundColor: "#1e293b", borderRadius: "8px", marginTop: "20px", border: "1px solid #334155" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                    <div>
                      <span style={{ fontSize: "11px", fontWeight: "bold", color: "#94a3b8", textTransform: "uppercase" }}>Member Registry Asset Matrix</span>
                      <h4 style={{ margin: "2px 0 0 0", color: "#ffffff", fontSize: "15px" }}>Adam Thabit Kasambula</h4>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: "10px", padding: "3px 8px", backgroundColor: "#064e3b", color: "#34d399", borderRadius: "12px", fontWeight: "bold" }}>🟢 VERIFIED ACCRUAL</span>
                    </div>
                  </div>

                  {/* ACCOUNT METRICS BLOCKS */}
                  <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                    <div style={{ flex: 1, padding: "12px", backgroundColor: "#0f172a", borderRadius: "6px", border: "1px solid #334155" }}>
                      <div style={{ fontSize: "11px", color: "#94a3b8" }}>Savings Pool Balance</div>
                      <div style={{ fontSize: "18px", fontWeight: "bold", color: "#ffffff", marginTop: "4px" }}>5,000.00 <span style={{ fontSize: "12px", color: "#a855f7" }}>SEK</span></div>
                    </div>
                    <div style={{ flex: 1, padding: "12px", backgroundColor: "#0f172a", borderRadius: "6px", border: "1px solid #334155" }}>
                      <div style={{ fontSize: "11px", color: "#94a3b8" }}>Underwriting Score</div>
                      <div style={{ fontSize: "18px", fontWeight: "bold", color: "#3b82f6", marginTop: "4px" }}>720 <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "normal" }}>/ 850</span></div>
                    </div>
                  </div>

                  {/* INTERACTIVE BANKING ACTIONS PANELS */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <input type="number" id="saccoAmountInputSlot" placeholder="Enter SEK Amount" style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #475569", backgroundColor: "#0f172a", color: "#ffffff", fontSize: "13px" }} />
                      <select id="saccoActionTypeSelector" style={{ padding: "10px", borderRadius: "6px", border: "1px solid #475569", backgroundColor: "#0f172a", color: "#ffffff", fontSize: "13px" }}>
                        <option value="DEPOSIT">📥 Quick Deposit</option>
                        <option value="WITHDRAWAL">📤 Fund Withdrawal</option>
                      </select>
                    </div>
                    <button type="button" onClick={async () => {
                      const amt = (document.getElementById("saccoAmountInputSlot") as HTMLInputElement).value;
                      const type = (document.getElementById("saccoActionTypeSelector") as HTMLSelectElement).value;
                      if(!amt || parseFloat(amt) <= 0) return alert("❌ Input a valid capital amount.");
                      
                      const response = await fetch("/api/sacco/engine", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({ email: "engitkasambula026@gmail.com", actionType: type, transactionAmountSEK: amt })
                      });
                      const result = await response.json();
                      if(result.success) {
                        alert(`✅ Transaction Settled!\nReference: ${result.reference}\nNew Balance: ${result.updatedBalanceSEK} SEK\nNew Credit Score: ${result.updatedCreditScore}`);
                        window.location.reload();
                      } else {
                        alert(`❌ Core Transaction Rejected: ${result.error}`);
                      }
                    }} style={{ width: "100%", padding: "12px", backgroundColor: "#a855f7", color: "#ffffff", border: "none", borderRadius: "6px", fontWeight: "bold", fontSize: "13px", cursor: "pointer" }}>
                      Commit Action to Cooperative Ledger
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* TERMINAL CONTROLS */}
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

            {/* EXPANDABLE CORRIDOR DETAILS */}
            {expanded.portfolio && (
              <div style={{ borderTop: "1px solid #1e293b", paddingTop: "10px", marginTop: "10px" }}>
                <p style={{ color: "#cbd5e1", fontSize: "12px", lineHeight: "1.5", margin: "0 0 12px 0" }}>
                  Automated performance metrics tracking pooled capital distributions and individual cooperative dividend allocations securely.
                </p>

                {/* REAL-TIME INVESTMENT TICKER & BIDDING SYSTEM */}
                <div style={{ padding: "16px", background: "#1e293b", borderRadius: "8px", marginTop: "12px", border: "1px solid #334155" }}>
                  <h4 style={{ margin: "0 0 8px 0", fontSize: "13px", color: "#ffffff", fontWeight: "bold" }}>📊 Live Diaspora Capital Markets Ticker</h4>
                  <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
                    <div style={{ flex: 1, padding: "10px", background: "#0f172a", borderRadius: "6px", border: "1px solid #334155" }}>
                      <span style={{ fontSize: "11px", fontWeight: "bold", color: "#94a3b8" }}>KIKA-SACCO-BOND</span>
                      <div style={{ fontSize: "15px", fontWeight: "bold", color: "#10b981", marginTop: "2px" }}>150.25 SEK <span style={{ fontSize: "10px", fontWeight: "normal" }}>(+8.5%)</span></div>
                    </div>
                    <div style={{ flex: 1, padding: "10px", background: "#0f172a", borderRadius: "6px", border: "1px solid #334155" }}>
                      <span style={{ fontSize: "11px", fontWeight: "bold", color: "#94a3b8" }}>UGX-MTN-EQUITY</span>
                      <div style={{ fontSize: "15px", fontWeight: "bold", color: "#10b981", marginTop: "2px" }}>1.85 SEK <span style={{ fontSize: "10px", fontWeight: "normal" }}>(+12.0%)</span></div>
                    </div>
                  </div>
                  
                  {/* INTERACTIVE BID SUBMISSION INPUT ROW */}
                  <div style={{ display: "flex", gap: "8px" }}>
                    <select id="tickerSelectorField" style={{ padding: "8px", borderRadius: "6px", border: "1px solid #475569", backgroundColor: "#0f172a", color: "#ffffff", fontSize: "12px" }}>
                      <option value="KIKA-SACCO-BOND">KIKA-SACCO-BOND</option>
                      <option value="UGX-MTN-EQUITY">UGX-MTN-EQUITY</option>
                    </select>
                    <input type="number" id="sharesQtyField" placeholder="Qty (e.g. 10)" style={{ padding: "8px", borderRadius: "6px", border: "1px solid #475569", backgroundColor: "#0f172a", color: "#ffffff", fontSize: "12px", width: "100px" }} />
                    <button type="button" onClick={async () => {
                      const ticker = (document.getElementById("tickerSelectorField") as HTMLSelectElement).value;
                      const qty = (document.getElementById("sharesQtyField") as HTMLInputElement).value;
                      if(!qty) return alert("❌ Specify quantities.");
                      const res = await fetch("/api/finance/ticker", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({ email: typeof regEmail !== 'undefined' ? regEmail : "engitkasambula026@gmail.com", tickerSymbol: ticker, sharesQuantity: qty, offeredPrice: ticker === "KIKA-SACCO-BOND" ? 150.25 : 1.85 })
                      });
                      const data = await res.json();
                      alert(data.success ? data.message : `❌ Order Blocked: ${data.error}`);
                    }} style={{ padding: "8px 12px", background: "#a855f7", color: "#ffffff", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", cursor: "pointer" }}>Bid</button>
                  </div>
                </div>

                {/* AUTOMATED MOBILE MONEY REMITTANCE TUNNEL SYSTEM */}
                <div style={{ padding: "16px", background: "#064e3b", borderRadius: "8px", marginTop: "16px", border: "1px solid #065f46" }}>
                  <h4 style={{ margin: "0 0 4px 0", fontSize: "13px", color: "#34d399", fontWeight: "bold" }}>💳 Automated Diaspora Remittance Tunnel</h4>
                  <p style={{ margin: "0 0 12px 0", fontSize: "11px", color: "#a7f3d0" }}>Instant sub-second mobile money payouts to MTN & Airtel networks mapped to SEK wallet balances.</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <input type="text" id="remitRecipientPhone" placeholder="Recipient Phone (e.g. +256785529623)" style={{ padding: "10px", borderRadius: "6px", border: "1px solid #047857", backgroundColor: "#022c22", color: "#ffffff", fontSize: "12px" }} />
                    <div style={{ display: "flex", gap: "8px" }}>
                      <input type="number" id="remitAmountSEK" placeholder="Amount in SEK (e.g. 200)" style={{ padding: "10px", borderRadius: "6px", border: "1px solid #047857", backgroundColor: "#022c22", color: "#ffffff", fontSize: "12px", flex: 1 }} />
                      <button type="button" onClick={async () => {
                        const phone = (document.getElementById("remitRecipientPhone") as HTMLInputElement).value;
                        const amt = (document.getElementById("remitAmountSEK") as HTMLInputElement).value;
                        if(!phone || !amt) return alert("❌ Fields cannot be empty.");
                        const res = await fetch("/api/finance/remit", {
                          method: "POST",
                          headers: {"Content-Type": "application/json"},
                          body: JSON.stringify({ email: typeof regEmail !== 'undefined' ? regEmail : "engitkasambula026@gmail.com", recipientPhone: phone, amountSek: amt })
                        });
                        const data = await res.json();
                        alert(data.success ? data.message : `❌ Remittance Failed: ${data.error}`);
                      }} style={{ padding: "10px 14px", background: "#10b981", color: "#000000", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", cursor: "pointer" }}>Fire Tunnel</button>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* TERMINAL CONTROLS */}
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

           {/* EXPANDABLE CORRIDOR DETAILS */}
{expanded.demographics && (
  <div style={{ borderTop: "1px solid #1e293b", paddingTop: "10px", marginTop: "10px" }}>
    <p style={{ color: "#cbd5e1", fontSize: "12px", lineHeight: "1.5", margin: 0 }}>
      Real-time geographic coordinate plotting and population tracking to optimize strategic resource distribution across international chapters.
    </p>
  </div>
)}
</div>

{/* TERMINAL CONTROLS */}
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

           {/* EXPANDABLE CORRIDOR DETAILS */}
{expanded.jobMatchmaker && (
  <div style={{ borderTop: "1px solid #1e293b", paddingTop: "10px", marginTop: "10px" }}>
    <p style={{ color: "#cbd5e1", fontSize: "12px", lineHeight: "1.5", margin: 0 }}>
      Specialized matching protocol evaluating professional qualifications, certifications, and availability for remote or localized execution.
    </p>
  </div>
)}
</div>

{/* TERMINAL CONTROLS */}
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
        KiKa Global Ventures SE 127 31 Stockholm Staging Infrastructure• NITA-U Secured Framework Compliance © 2026
      </footer>
    </div>
  );
}

