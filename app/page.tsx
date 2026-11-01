"use client";

// 🟢 FIXED CALIBRATION: Assembled with hooks, refs, and effects optimized for live production
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

  // Security session state tracking variables injected cleanly
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

  // --- 🏛️ NEW INTEGRATED FINTECH PORTAL REGISTERS ---
  const [activeFintechTab, setActiveFintechTab] = useState<"VOIP" | "REMITTANCE" | "SAVINGS">("VOIP");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [amountUSD, setAmountUSD] = useState("");
  const [saccoBalanceUGX, setSaccoBalanceUGX] = useState(1850000); 
  const [sharesOwned, setSharesOwned] = useState(50);
  const [depositUGX, setDepositUGX] = useState("");
  const [fintechHistory, setFintechHistory] = useState<any[]>([]);

  // --- 🎙️ SIMULATED OUTBOUND SIGNAL TRACERS ---
  const [dialedDigits, setDialedDigits] = useState("");
  const [callStatus, setCallStatus] = useState("Standby Outbound Core Ready");

  // --- 🧮 TRANSFORMATION COEFFICIENTS ---
  const fixedFeeUSD = 0.50;
  const exchangeRateUGX = 3700.00;
  const sharePriceUGX = 10000.00;

  const calculatedPayoutUGX = (() => {
    const inputVal = parseFloat(amountUSD);
    if (isNaN(inputVal) || inputVal <= fixedFeeUSD) return 0;
    return (inputVal - fixedFeeUSD) * exchangeRateUGX;
  })();

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

  // ❌ EXPLICIT SESSION CLEAR ACTION GATE
  const handleGlobalSignOut = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
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

    const TOTAL_LIMIT = 15 * 60 * 1000; 
    const WARNING_BUFFER = 10 * 1000;   
    const TIME_BEFORE_WARNING = TOTAL_LIMIT - WARNING_BUFFER; 

    const triggerHardLockdown = () => {
      alert("🔒 Security Lock: Your session has ended due to 15 minutes of inactivity.");
      handleGlobalSignOut();
    };

    const runSecurityLifecycle = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        const keepsSessionAlive = window.confirm("⚠️ Inactivity Alert: Your session will expire in 10 seconds. Do you want to stay logged in?");
        if (keepsSessionAlive) {
          runSecurityLifecycle();
        } else {
          triggerHardLockdown();
        }
      }, TIME_BEFORE_WARNING);
    };

    const resetOnUserMovement = () => {
      runSecurityLifecycle();
    };

    const interactionEvents = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];
    runSecurityLifecycle();

    interactionEvents.forEach(evt => document.addEventListener(evt, resetOnUserMovement));
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      interactionEvents.forEach(evt => document.removeEventListener(evt, resetOnUserMovement));
    };
  }, [mounted]);

  // --- 💸 LIVE ACTION CORRIDOR 01: REMITTANCE ---
  const executeRemittanceTransaction = async () => {
    if (!recipientPhone || !amountUSD || calculatedPayoutUGX <= 0) {
      alert("❌ Input Error: Please provide valid recipient digits and a positive value.");
      return;
    }
    setDbStatusText("⏳ CLEARING LIQUIDITY CHANNELS IN NEON POSTGRESQL...");
    try {
      const response = await fetch("/api/remittance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "PROCESS_DIASPORA_REMITTANCE",
          senderEmail: regEmail || "engitkasambula026@gmail.com",
          recipientPhone,
          amountUSD
        })
      });
      const data = await response.json();
      if (data.success) {
        setDbStatusText(`🟢 SETTLED: UGX ${data.payoutVolumeUGX.toLocaleString()} Disbursed.`);
        setFintechHistory((prev) => [
          { type: "REMIT", phone: recipientPhone, usd: amountUSD, ugx: data.payoutVolumeUGX },
          ...prev
        ]);
        setAmountUSD("");
        setRecipientPhone("");
      } else {
        setDbStatusText(`❌ DISBURSEMENT REJECTED: ${data.error}`);
      }
    } catch (err) {
      setDbStatusText("❌ Network pipeline exception. Verify your environment keys.");
    }
  };

  // --- 🏛️ LIVE ACTION CORRIDOR 02: SACCO CONTRIBUTIONS ---
  const executeSaccoContribution = async () => {
    const cashInputUGX = parseFloat(depositUGX);
    if (isNaN(cashInputUGX) || cashInputUGX <= 0) {
      alert("❌ Validation Mismatch: Input a positive volume to mint fractional tokens.");
      return;
    }
    setDbStatusText("⏳ COMMITTING FRACTIONAL CAPITALS TO LEDGER POOLS...");
    try {
      const response = await fetch("/api/remittance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "PROCESS_SACCO_DEPOSIT",
          senderEmail: regEmail || "engitkasambula026@gmail.com",
          depositVolumeUGX: cashInputUGX
        })
      });
      const data = await response.json();
      if (data.success) {
        setDbStatusText(`✨ MINTED: Ledger row compiled successfully.`);
        setSaccoBalanceUGX(data.newBalanceUGX);
        setSharesOwned(data.newSharesOwned);
        setFintechHistory((prev) => [
          { type: "SACCO", phone: "LEDGER_CORE", usd: (cashInputUGX / exchangeRateUGX).toFixed(2), ugx: cashInputUGX },
          ...prev
        ]);
        setDepositUGX("");
      } else {
        setDbStatusText(`❌ DATABASE BLOCK: ${data.error}`);
      }
    } catch (err) {
      setDbStatusText("❌ Network pipeline failure updating Neon tables.");
    }
  };

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
        <p style={{ color: "#475569", fontSize: "14px", margin: 0, lineHeight: "1.5" }}>
          A decentralized financial, labor, and telecommunications matrix for sub-Saharan communities worldwide.
        </p>
      </header>

      {/* 📥 3. REGISTRATION MODULE PANEL */}
      <section style={{ maxWidth: "600px", margin: "0 auto 40px auto", background: "#f8fafc", border: "1px solid #e2e8f0", padding: "24px", borderRadius: "12px" }}>
        <form onSubmit={executeNeonRegistration} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input type="text" placeholder="Full Legal Name" value={regName} onChange={(e) => setRegName(e.target.value)} style={{ padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px" }} />
          <input type="email" placeholder="Email Address (Required)" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} style={{ padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px" }} />
          <input type="text" placeholder="Passport Number" value={passportNum} onChange={(e) => setPassportNum(e.target.value)} style={{ padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px" }} />
          <select value={hostCountry} onChange={(e) => setHostCountry(e.target.value)} style={{ padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px" }}>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Sweden">Sweden</option>
            <option value="United States">United States</option>
            <option value="South Africa">South Africa</option>
          </select>
          <input type="text" placeholder="Cooperative SACCO Affiliate Name" value={saccoName} onChange={(e) => setSaccoName(e.target.value)} style={{ padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px" }} />
          <button type="submit" style={{ padding: "12px", background: "#10b981", color: "#ffffff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
            💾 Commit Credentials to Neon Ledger
          </button>
        </form>
        <div style={{ marginTop: "12px", fontSize: "11px", fontFamily: "monospace", color: "#64748b", textAlign: "center" }}>{dbStatusText}</div>
      </section>
      {/* 🚀 4. INTEGRATED FINTECH COCKPIT COOPERATIVE WORKSPACE */}
      <div style={{ maxWidth: "1200px", margin: "40px auto", padding: "0 20px", display: "flex", flexDirection: "column", gap: "20px" }}>
        
        {/* TAB BUTTON ROW */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", borderBottom: "2px solid #e2e8f0", paddingBottom: "10px" }}>
          <button type="button" onClick={() => setActiveFintechTab("VOIP")} style={{ padding: "10px 20px", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: "bold", background: activeFintechTab === "VOIP" ? "#10b981" : "#e2e8f0", color: activeFintechTab === "VOIP" ? "#ffffff" : "#0f172a" }}>
            🎙️ Service 03: Outbound VoIP Core
          </button>
          <button type="button" onClick={() => setActiveFintechTab("REMITTANCE")} style={{ padding: "10px 20px", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: "bold", background: activeFintechTab === "REMITTANCE" ? "#10b981" : "#e2e8f0", color: activeFintechTab === "REMITTANCE" ? "#ffffff" : "#0f172a" }}>
            💳 Service 02: Automated Remittance
          </button>
          <button type="button" onClick={() => setActiveFintechTab("SAVINGS")} style={{ padding: "10px 20px", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: "bold", background: activeFintechTab === "SAVINGS" ? "#10b981" : "#e2e8f0", color: activeFintechTab === "SAVINGS" ? "#ffffff" : "#0f172a" }}>
            📊 Service 04: Cooperative SACCO & Shares
          </button>
        </div>

        {/* DOUBLE COLUMN SPLIT GRAPHIC PANEL */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "stretch" }}>
          
          {/* INTERACTIVE COMPONENT SWITCH CARD LEFT */}
          <div style={{ flex: "1 1 500px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px", boxSizing: "border-box" }}>
            
            {/* TAB CARD 01: OUTBOUND KEYPAD TRACK */}
            {activeFintechTab === "VOIP" && (
              <div>
                <h3 style={{ margin: "0 0 4px 0", color: "#0f172a", fontSize: "16px" }}>🎙️ Wholesale SIP Telephony Console</h3>
                <p style={{ margin: "0 0 16px 0", fontSize: "12px", color: "#64748b" }}>Your new production trunks are running. Dial numbers without symbols to bridge active media paths over port 5060.</p>
                
                <div style={{ background: "#0b1528", padding: "16px", borderRadius: "8px", border: "1px solid #1e293b", marginBottom: "16px", textAlign: "right" }}>
                  <div style={{ fontSize: "24px", fontWeight: "bold", color: "#ffffff", fontFamily: "monospace", minHeight: "36px" }}>{dialedDigits || "0"}</div>
                  <div style={{ fontSize: "11px", color: "#10b981", marginTop: "4px", fontFamily: "monospace" }}>{callStatus}</div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                  {["1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "0", "◀"].map((btn) => (
                    <button type="button" key={btn} onClick={() => btn === "◀" ? setDialedDigits(p => p.slice(0, -1)) : setDialedDigits(p => p + btn)} style={{ padding: "14px", background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "6px", color: "#0f172a", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>{btn}</button>
                  ))}
                </div>
                <button type="button" onClick={() => { setCallStatus("Routing Trunk Invite Packet via kika-global-voip-tester..."); alert(`🚀 Live SIP Outbound Triggered via Vercel Normalizer for number: ${dialedDigits}! Configure your Samsung Mizudroid to monitor core voice channels.`); }} style={{ width: "100%", padding: "14px", background: "#10b981", color: "#ffffff", border: "none", borderRadius: "6px", fontWeight: "bold", marginTop: "12px", cursor: "pointer" }}>📞 Transmit Calls Down Trunk</button>
              </div>
            )}

            {/* TAB CARD 02: REMITTANCE CHANNELS */}
            {activeFintechTab === "REMITTANCE" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <h3 style={{ margin: "0 0 4px 0", color: "#0f172a", fontSize: "16px" }}>💳 Automated Micro-Tariff Cash Ingestion</h3>
                  <p style={{ margin: "0 0 0 0", fontSize: "12px", color: "#64748b" }}>Deploy international deposits onto the ledger. Transactions carry a flat sub-dollar $0.50 processing fee before bridging to mobile nodes.</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontSize: "11px", fontWeight: "bold", color: "#64748b" }}>RECIPIENT TELEPHONE HANDSET TARGET</label>
                  <input type="text" placeholder="e.g. 256785529623" value={recipientPhone} onChange={(e) => setRecipientPhone(e.target.value)} style={{ padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px", color: "#0f172a" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontSize: "11px", fontWeight: "bold", color: "#64748b" }}>VOLUME INFLOW QUANTITY (USD)</label>
                  <input type="number" placeholder="0.00" value={amountUSD} onChange={(e) => setAmountUSD(e.target.value)} style={{ padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px", color: "#0f172a" }} />
                </div>
                <div style={{ background: "#ffffff", border: "1px dashed #cbd5e1", padding: "12px", borderRadius: "6px", fontSize: "11px", fontFamily: "monospace", display: "flex", flexDirection: "column", gap: "4px", color: "#475569" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>Fixed Low Tariff:</span><span style={{ color: "#ef4444" }}>-$0.50 USD</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>Wholesale FX Ratio:</span><span style={{ color: "#10b981" }}>1 USD = 3,700 UGX</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", borderTop: "1px solid #e2e8f0", paddingTop: "4px", marginTop: "2px" }}><span>Net Disbursed Payout:</span><span style={{ color: "#10b981" }}>UGX {calculatedPayoutUGX.toLocaleString()}</span></div>
                </div>
                <button type="button" onClick={executeRemittanceTransaction} style={{ padding: "12px", background: "#0f172a", color: "#ffffff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>🚀 Settle Live Remittance Corridor</button>
              </div>
            )}

            {/* TAB CARD 03: FRACTIONAL SACCO DIVIDEND TRACKER */}
            {activeFintechTab === "SAVINGS" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <h3 style={{ margin: "0 0 4px 0", color: "#0f172a", fontSize: "16px" }}>📊 Service 04: Cooperative Asset Pool</h3>
                  <p style={{ margin: "0 0 0 0", fontSize: "12px", color: "#64748b" }}>Accumulate community capital rows inside Neon PostgreSQL tables. Every 10,000 UGX deposit automatically mints a fractional share.</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div style={{ background: "#ffffff", padding: "12px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                    <span style={{ fontSize: "10px", color: "#64748b", fontWeight: "bold" }}>TOTAL CAPITAL POOL</span>
                    <div style={{ fontSize: "16px", fontWeight: "bold", color: "#10b981", fontFamily: "monospace", marginTop: "2px" }}>UGX {saccoBalanceUGX.toLocaleString()}</div>
                  </div>
                  <div style={{ background: "#ffffff", padding: "12px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                    <span style={{ fontSize: "10px", color: "#64748b", fontWeight: "bold" }}>FRACTIONAL TOKENS MINTED</span>
                    <div style={{ fontSize: "16px", fontWeight: "bold", color: "#3b82f6", fontFamily: "monospace", marginTop: "2px" }}>{sharesOwned} SHARES</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontSize: "11px", fontWeight: "bold", color: "#64748b" }}>CAPITALIZATION VALUE INPUT (UGX)</label>
                  <input type="number" placeholder="e.g. 50000" value={depositUGX} onChange={(e) => setDepositUGX(e.target.value)} style={{ padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px", color: "#0f172a" }} />
                </div>
                <button type="button" onClick={executeSaccoContribution} style={{ padding: "12px", background: "#10b981", color: "#ffffff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>🏛️ Deposit Capital & Mint Tokens</button>
              </div>
            )}

          </div>
          {/* REAL-TIME LEDGER MONITORING ROW RIGHT */}
          <div style={{ flex: "1 1 350px", background: "#0b1528", border: "1px solid #1e293b", borderRadius: "12px", padding: "24px", boxSizing: "border-box", display: "flex", flexDirection: "column", color: "#ffffff" }}>
            <h3 style={{ margin: "0 0 2px 0", fontSize: "14px", color: "#10b981", letterSpacing: "0.5px" }}>📊 Institutional Ledger Monitoring Strings</h3>
            <span style={{ fontSize: "10px", color: "#64748b", fontFamily: "monospace", marginBottom: "16px" }}>STREAMING STREAM CORRIDORS // NEON LIVE NODE</span>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", overflowY: "auto", maxHeight: "340px" }}>
              {fintechHistory.length === 0 ? (
                <div style={{ color: "#64748b", fontSize: "11px", fontStyle: "italic", textAlign: "center", marginTop: "110px", fontFamily: "monospace" }}>[WAITING_FOR_LIVE_FINANCIAL_STRING_DATA_PACKETS]</div>
              ) : (
                fintechHistory.map((tx, idx) => (
                  <div key={idx} style={{ background: "#1e293b", border: "1px solid #334155", padding: "10px", borderRadius: "6px", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "monospace", fontSize: "12px" }}>
                    <div>
                      <div style={{ fontWeight: "bold", color: tx.type === "REMIT" ? "#38bdf8" : "#10b981" }}>{tx.type === "REMIT" ? "📲 Payout Sent" : "🏛️ SACCO Capital"}</div>
                      <div style={{ fontSize: "10px", color: "#64748b", marginTop: "1px" }}>Amount: ${tx.usd} USD</div>
                    </div>
                    <div style={{ color: "#10b981", fontWeight: "bold" }}>+UGX {tx.ugx.toLocaleString()}</div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>

      {/* 📋 5. TEASER DRAWER MODULE DETAILS GRID */}
      <section style={{ maxWidth: "1200px", margin: "40px auto", padding: "0 16px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
        
        {/* SERVICE 01 */}
        <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "20px", borderRadius: "10px" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "700", margin: "0 0 6px 0" }}>📝 Service 01: Diaspora Asset Registry</h3>
          <p style={{ fontSize: "13px", color: "#475569", margin: "0 0 12px 0" }}>Certify your demographic node within the global network for asset shielding and cooperative registry pools.</p>
          <button type="button" onClick={() => toggleExpand("assetRegistry")} style={{ background: "transparent", border: "none", color: "#10b981", fontWeight: "bold", cursor: "pointer", padding: 0 }}>
            {expanded.assetRegistry ? "▲ Collapse View" : "▼ Read More Details"}
          </button>
          {expanded.assetRegistry && <div style={{ marginTop: "10px", fontSize: "12px", color: "#64748b", borderTop: "1px dashed #cbd5e1", paddingTop: "8px" }}>Production mapping layers active under sub-Saharan constitutional regulatory frameworks. Rows attach securely to immutable workspace partitions.</div>}
        </div>

        {/* SERVICE 02 */}
        <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "20px", borderRadius: "10px" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "700", margin: "0 0 6px 0" }}>💳 Service 02: Automated Remittance Tunnels</h3>
          <p style={{ fontSize: "13px", color: "#475569", margin: "0 0 12px 0" }}>Execute low-cost mobile wallet remittance streams protected by dynamic multi-currency compliance buffers.</p>
          <button type="button" onClick={() => toggleExpand("remittance")} style={{ background: "transparent", border: "none", color: "#10b981", fontWeight: "bold", cursor: "pointer", padding: 0 }}>
            {expanded.remittance ? "▲ Collapse View" : "▼ Read More Details"}
          </button>
          {expanded.remittance && <div style={{ marginTop: "10px", fontSize: "12px", color: "#64748b", borderTop: "1px dashed #cbd5e1", paddingTop: "8px" }}>Linked directly via production API endpoints using serverless database tracking layers to complete high-yield mobile wallet liquidations.</div>}
        </div>

        {/* SERVICE 03 */}
        <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "20px", borderRadius: "10px" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "700", margin: "0 0 6px 0" }}>🎙️ Service 03: Low-Tariff VoIP Trunk</h3>
          <p style={{ fontSize: "13px", color: "#475569", margin: "0 0 12px 0" }}>Full-duplex voice circuits engineered to bypass high international tariffs over WebRTC communication gateways.</p>
          <button type="button" onClick={() => toggleExpand("voip")} style={{ background: "transparent", border: "none", color: "#10b981", fontWeight: "bold", cursor: "pointer", padding: 0 }}>
            {expanded.voip ? "▲ Collapse View" : "▼ Read More Details"}
          </button>
          {expanded.voip && <div style={{ marginTop: "10px", fontSize: "12px", color: "#64748b", borderTop: "1px dashed #cbd5e1", paddingTop: "8px" }}>Outbound lines connect securely down custom Twilio termination networks. Real-time billing calculations update Neon balances automatically.</div>}
        </div>

      </section>

      {/* 🧱 6. FOOTER STAGING COMPLIANCE */}
      <footer style={{ borderTop: "1px solid #e2e8f0", padding: "24px 16px", textAlign: "center", fontSize: "12px", color: "#64748b" }}>
        KiKa Global Ventures SE 127 31 Stockholm Staging Infrastructure • NITA-U Secured Framework Compliance © 2026
      </footer>

    </div>
  );
}
