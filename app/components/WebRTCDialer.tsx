"use client";

import React, { useState, useEffect } from "react";
import AuthForms from "./AuthForms";
import DialerTabs from "./DialerTabs";

export default function WebRTCDialer() {
  // Authentication View Configurations Matrix
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loginPhone, setLoginPhone] = useState("");
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regCountry, setRegCountry] = useState("UG");

  // Telemetry Ledger States
  const [member, setMember] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("dialer");

  // Media Capture Elements
  const [phoneNumber, setPhoneNumber] = useState("");
  const [callActive, setCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState("Ready");
  const [timer, setTimer] = useState(0);

  // ==========================================
  // 1. AUTHENTICATED LOGIC EVENT SUBMISSIONS
  // ==========================================
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCallStatus("Checking system node archives...");
    
    // Grabs password value safely out of the current structural target properties definition
    // @ts-ignore
    const userPassword = e.currentTarget.password?.value || "";

    try {
      const res = await fetch("/api/voip/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          loginPhoneNumber: loginPhone, 
          loginPassword: userPassword,
          action: "LOGIN" 
        })
      });
      const data = await res.json();
      if (data.success) {
        setMember(data.member);
        setIsLoggedIn(true);
        setCallStatus("Secure Session Established.");
      } else if (data.error === "NOT_REGISTERED") {
        setShowRegister(true);
      } else {
        setCallStatus(data.msg || "Authentication credentials failed.");
      }
    } catch {
      setCallStatus("Network handshake error.");
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCallStatus("Transmitting node allocation parameters...");
    
    // @ts-ignore
    const userPassword = e.currentTarget.password?.value || "";

    try {
      const res = await fetch("/api/voip/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          newName: regName, 
          newPhone: regPhone, 
          country: regCountry, 
          password: userPassword,
          action: "REGISTER" 
        })
      });
      const data = await res.json();
      alert(data.msg);
      
      // Wipe values out cleanly right after complete onboarding submission
      setRegName("");
      setRegPhone("");
      setShowRegister(false);
      setCallStatus("Ready");
    } catch {
      alert("Registration request failed.");
      setCallStatus("Ready");
    }
  };

  // ==========================================
  // 2. TIMED SESSION LEDGER RECORD LOOPS
  // ==========================================
  useEffect(() => {
    let callInterval: any;
    if (callActive) {
      callInterval = setInterval(() => setTimer(t => t + 1), 1000);
    } else {
      setTimer(0);
    }
    return () => clearInterval(callInterval);
  }, [callActive]);

  // ==========================================
  // 3. DIALER DIALING KEYPAD LOGIC PIPELINES
  // ==========================================
  const handleKeypressValue = (digit: string) => {
    setPhoneNumber(prev => {
      if (prev === "" && digit !== "+" && digit !== "0") {
        const prefix = (member?.country || member?.nodeCountry) === "KE" ? "+254" : "+256";
        return prefix + digit;
      }
      return prev + digit;
    });
  };

  const startCall = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setCallActive(true);
      setCallStatus("Voice Session Live via WebRTC Node");
    } catch {
      setCallStatus("Microphone access blocked.");
    }
  };

  const terminateCall = async () => {
    setCallActive(false);
    setCallStatus("Syncing ledger billing transactions...");
    
    const activeUserId = member?.userId || member?.id || 1;

    try {
      const res = await fetch("/api/voip/call-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          userId: activeUserId, 
          destinationNo: phoneNumber, 
          durationSecs: timer 
        })
      });
      const data = await res.json();
      if (data.success) {
        setMember((prev: any) => ({ ...prev, balance: data.remainingBalance }));
        setCallStatus(`Call Cleared. Fee: UGX ${data.deductedCost}`);
      }
    } catch {
      setCallStatus("Call ended. Ledger syncing offline.");
    }
    setPhoneNumber("");
  };

  // ==========================================
  // 4. SECURITY CONTAINER DISPLAY BALANCER
  // ==========================================
  if (!isLoggedIn) {
    return (
      <AuthForms
        showRegister={showRegister}
        setShowRegister={setShowRegister}
        loginPhone={loginPhone}
        setLoginPhone={setLoginPhone}
        regName={regName}
        setRegName={setRegName}
        regPhone={regPhone}
        setRegPhone={setRegPhone}
        regCountry={regCountry}
        setRegCountry={setRegCountry}
        handleLoginSubmit={handleLoginSubmit}
        handleRegisterSubmit={handleRegisterSubmit}
        callStatus={callStatus}
      />
    );
  }

  return (
    <div style={{ backgroundColor: "#1e293b", padding: "20px", borderRadius: "16px", border: "1px solid #334155", boxSizing: "border-box", width: "100%" }}>
      
      {/* ACCOUNT DETAILS TELEMETRY MONITOR HEADER PANEL */}
      <div style={{ backgroundColor: "#0f172a", padding: "12px", borderRadius: "8px", fontSize: "12px", display: "flex", flexDirection: "column", gap: "6px", marginBottom: "15px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div><span style={{ color: "#64748b" }}>MEMBER:</span> <strong style={{ color: "#ffffff" }}>{member?.name || "Kika Subscriber"}</strong></div>
          <div><span style={{ color: "#64748b" }}>NODE:</span> <strong style={{ color: "#e2e8f0" }}>{member?.country || "UG"} ({member?.carrierMapping || "MTN"})</strong></div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #1e293b", paddingTop: "6px" }}>
          <div><span style={{ color: "#64748b" }}>PROXY NUMBER:</span> <strong style={{ color: "#38bdf8" }}>{member?.virtualLine || "Unallocated"}</strong></div>
          <div><span style={{ color: "#64748b" }}>WALLET:</span> <strong style={{ color: "#4ade80" }}>{(member?.balance || 0).toLocaleString()} UGX</strong></div>
        </div>
      </div>

      {/* VIEW PANEL SELECTION CONSOLE */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px", marginBottom: "20px" }}>
        {["dialer", "contacts", "history"].map(tab => (
          <button key={tab} type="button" onClick={() => setActiveTab(tab)} style={{ padding: "10px 0", backgroundColor: activeTab === tab ? "#334155" : "#0f172a", color: activeTab === tab ? "#38bdf8" : "#94a3b8", border: "none", borderRadius: "4px", fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", cursor: "pointer", outline: "none" }}>
            {tab}
          </button>
        ))}
      </div>

      {/* DISPATCH TO SECURE SUB-COMPONENTS ENGINE */}
      <DialerTabs
        activeTab={activeTab}
        member={member}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        callActive={callActive}
        callStatus={callStatus}
        timer={timer}
        handleKeypressValue={handleKeypressValue}
        startCall={startCall}
        terminateCall={terminateCall}
      />

      <button onClick={() => { setIsLoggedIn(false); setMember(null); setPhoneNumber(""); }} style={{ width: "100%", marginTop: "20px", padding: "8px", backgroundColor: "transparent", color: "#ef4444", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", outline: "none" }}>
        🔒 Close Secure Terminal Session
      </button>
    </div>
  );
}
