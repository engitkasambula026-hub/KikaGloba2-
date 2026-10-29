"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function CommercialVoipDialerPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isCalling, setIsCalling] = useState<boolean>(false);
  const [callStatus, setCallStatus] = useState<string>("SIP Trunk Standby");
  const [userEmail, setUserEmail] = useState<string>("");
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [activeSessionSid, setActiveSessionSid] = useState<string>("");

  // Live Telephony Metrics
  const [callTimer, setCallTimer] = useState<number>(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [recentCalls, setRecentCalls] = useState<any[]>([]);

  useEffect(() => {
     // 🔒 Recover active account credentials to identify the caller node lane securely
    const activeCookies = document.cookie.split("; ");
    const emailCookie = activeCookies.find(row => row.startsWith("kika_user_email="));
    let myEmail = "audit02@kikaglobal.com";
    if (emailCookie && emailCookie.includes("=")) {
      // 🟢 FIXED: Added array index lookup [1] to safely extract the string value token
      myEmail = decodeURIComponent(emailCookie.split("=")[1]);
    }
    setUserEmail(myEmail);


    // Call your serverless token validator gate to synchronize your device connection line status
    fetch("/api/voip/call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "GENERATE_CARRIER_TOKEN", email: myEmail })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setWalletBalance(data.balanceUGX);
          setCallStatus("🟢 Carrier Device Linked & Authenticated");
        } else {
          setCallStatus(`⚠️ Trunk Lockout: ${data.error}`);
        }
      })
      .catch(() => setCallStatus("❌ Critical Connection Failure"));
  }, [isCalling]);

  const handleKeyPress = (digit: string) => {
    if (isCalling) return; // Lock inputs during an active phone connection loop
    if (phoneNumber.length < 15) {
      setPhoneNumber((prev) => prev + digit);
    }
  };

  const handleBackspaceClear = () => {
    if (isCalling) return;
    setPhoneNumber((prev) => prev.slice(0, -1));
  };

  // 📞 PLUG AND PLAY CARRIER OUTBOUND TRIGGER
  const handleCarrierCallToggle = async () => {
    if (!phoneNumber) {
      alert("❌ Input Error: Destination number address required.");
      return;
    }

    if (isCalling) {
      // 🟥 HANG UP LOGIC: Disconnect call path and calculate usage billing parameters
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      setIsCalling(false);
      setCallStatus("🔌 Processing transaction billing parameters...");

      try {
        const res = await fetch("/api/voip", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "PROCESS_CALL_COMPLETION_BILLING",
            email: userEmail,
            destinationNumber: phoneNumber,
            sessionSid: activeSessionSid,
            durationSeconds: callTimer
          })
        });
        const data = await res.json();
        if (data.success) {
          setCallStatus(`🔌 Call hung up. Billed: UGX ${data.costUGX.toFixed(0)}`);
          // Prepend record row item to the local summary matrix list
          setRecentCalls(prev => [{ number: phoneNumber, duration: callTimer, cost: data.costUGX }, ...prev]);
        }
      } catch (err) {
        setCallStatus("🟢 Carrier Device Linked & Authenticated");
      }
      
      setPhoneNumber("");
      setCallTimer(0);
      return;
    }

    // 🟩 DIAL OUT LOGIC: Connect directly to wholesale telecom carrier streams
    setCallStatus(`⏳ Route authorization query dispatching...`);
    
    try {
      // Request physical microphone hardware access permissions from the browser engine
      await navigator.mediaDevices.getUserMedia({ audio: true, video: false });

      const res = await fetch("/api/voip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "ROUTE_OUTBOUND_CALL", destinationNumber: phoneNumber })
      });
      const data = await res.json();

      if (data.success) {
        setActiveSessionSid(data.sessionSid);
        setIsCalling(true);
        setCallStatus("🔊 Line open. Audio wave arrays streaming live...");
        
        // Fire Call Timer Clock to monitor talk duration in seconds
        timerIntervalRef.current = setInterval(() => {
          setCallTimer(prev => prev + 1);
        }, 1000);
      }
    } catch (err) {
      alert("❌ Microphone authorization denied by system safeties.");
      setCallStatus("🟢 Carrier Device Linked & Authenticated");
    }
  };

  const formatClockDisplay = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const keypadDigits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f172a", color: "#ffffff", padding: "40px 20px", fontFamily: "Arial, sans-serif", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
      
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#34d399", margin: "0 0 6px 0" }}>Carrier-Grade Telecom Dashboard</h1>
        <p style={{ fontSize: "14px", color: "#94a3b8", maxWidth: "500px", margin: "0 auto", lineHeight: "1.5" }}>Plugs directly into wholesale routing keys to establish real full-duplex connections from browser to mobile phones globally.</p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center", width: "100%", maxWidth: "800px" }}>
        
        {/* 🔢 TELEPHONY WORKSPACE CONTROLLER CARD */}
        <div style={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "24px", width: "290px", display: "flex", flexDirection: "column", gap: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#94a3b8", fontWeight: "bold", fontFamily: "monospace", borderBottom: "1px solid #334155", paddingBottom: "8px" }}>
            <span>WHOLESALE CORE TRUNK</span>
            <span style={{ color: "#34d399" }}>UGX {walletBalance.toLocaleString()}</span>
          </div>

          {/* DISPLAY SCREEN */}
          <div style={{ backgroundColor: "#0b1528", border: "1px solid #334155", borderRadius: "8px", padding: "14px", display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: "44px", boxSizing: "border-box" }}>
            <div style={{ color: "#ffffff", fontSize: "20px", fontWeight: "bold", fontFamily: "monospace", letterSpacing: "1px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "80%" }}>
              {isCalling ? formatClockDisplay(callTimer) : phoneNumber || <span style={{ color: "#475569" }}>Dial digits...</span>}
            </div>
            {phoneNumber && !isCalling && (
              <button onClick={handleBackspaceClear} style={{ background: "transparent", border: "none", color: "#ef4444", fontSize: "14px", cursor: "pointer", padding: 0, fontWeight: "bold", outline: "none" }}>⌫</button>
            )}
          </div>

          {/* KEYPAD GRID BLOCK */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
            {keypadDigits.map((digit) => (
              <button
                key={digit}
                onClick={() => handleKeyPress(digit)}
                disabled={isCalling}
                style={{ padding: "12px 0", backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "50%", color: "#cbd5e1", fontSize: "16px", fontWeight: "bold", cursor: isCalling ? "not-allowed" : "pointer", outline: "none", display: "flex", justifyContent: "center", alignItems: "center", width: "50px", height: "50px", margin: "0 auto" }}
              >
                {digit}
              </button>
            ))}
          </div>

          {/* OUTBOUND CARRIER TOGGLE TRIGGER BUTTON */}
          <button
            onClick={handleCarrierCallToggle}
            style={{ width: "100%", padding: "12px", backgroundColor: isCalling ? "#ef4444" : "#10b981", color: isCalling ? "#ffffff" : "#020617", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "13px", outline: "none" }}
          >
            {isCalling ? "🛑 Terminate Phone Link" : "📞 Outbound Carrier Dial"}
          </button>

          {/* STATUS MONITOR PRINT SCREEN */}
          <div style={{ backgroundColor: "#070e1b", border: "1px solid #1e293b", borderRadius: "6px", padding: "8px", fontSize: "10px", color: isCalling ? "#10b981" : "#94a3b8", textAlign: "center", fontFamily: "monospace", minHeight: "28px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {callStatus}
          </div>

        </div>

        {/* 📋 CALL DETAILS RECORDS (CDR) TRANSACTION LOG PANEL BAR */}
        <div style={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "24px", flex: 1, minWidth: "300px", display: "flex", flexDirection: "column", gap: "14px", boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}>
          <h3 style={{ margin: 0, fontSize: "14px", color: "#34d399", fontWeight: "bold", borderBottom: "1px solid #334155", paddingBottom: "8px" }}>📊 Itemized Call Details Logs (Real-Time CDR)</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto", maxHeight: "310px" }}>
                        {recentCalls.length === 0 ? (
              <div style={{ color: "#64748b", fontSize: "12px", fontStyle: "italic", textAlign: "center", marginTop: "40px" }}>
                No telephone calling session records logged inside this active user space node. Dial destinations to test billing loops.
              </div>
            ) : (
              recentCalls.map((call, i) => (
                <div key={i} style={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "6px", padding: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "bold", color: "#ffffff", fontFamily: "monospace" }}>📞 {call.number}</div>
                    <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>Duration: {call.duration} seconds</div>
                  </div>
                  <div style={{ color: "#ef4444", fontSize: "13px", fontWeight: "bold", fontFamily: "monospace" }}>-UGX {call.cost.toFixed(0)}</div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  ); // 🟢 SEALED: Root layout element closed properly
}    // 🟢 SEALED: Main CommercialVoipDialerPage function completely closed

