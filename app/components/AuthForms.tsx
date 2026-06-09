"use client";

import React, { useState } from "react";

interface AuthProps {
  showRegister: boolean;
  setShowRegister: (show: boolean) => void;
  loginPhone: string;
  setLoginPhone: (val: string) => void;
  regName: string;
  setRegName: (val: string) => void;
  regPhone: string;
  setRegPhone: (val: string) => void;
  regCountry: string;
  setRegCountry: (val: string) => void;
  handleLoginSubmit: (e: React.FormEvent) => void;
  handleRegisterSubmit: (e: React.FormEvent) => void;
  callStatus: string;
}

export default function AuthForms({
  showRegister,
  setShowRegister,
  loginPhone,
  setLoginPhone,
  regName,
  setRegName,
  regPhone,
  setRegPhone,
  regCountry,
  setRegCountry,
  handleLoginSubmit,
  handleRegisterSubmit,
  callStatus
}: AuthProps) {
  
  // Custom local state reference to catch passwords without breaking top orchestration layout definitions
  const [passwordInput, setPasswordInput] = useState("");

  // Intermediate function packages state attributes seamlessly right on submit events
  const onLocalLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Injects the credential dynamically into a custom dataset object property if needed later
    // @ts-ignore
    e.currentTarget.password = passwordInput;
    handleLoginSubmit(e);
  };

  const onLocalRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    e.currentTarget.password = passwordInput;
    handleRegisterSubmit(e);
  };

  // ==========================================
  // 1. DYNAMIC REGISTRATION INTERFACE PANEL
  // ==========================================
  if (showRegister) {
    return (
      <form onSubmit={onLocalRegisterSubmit} style={{ backgroundColor: "#1e293b", padding: "30px", borderRadius: "16px", border: "1px solid #334155" }}>
        <h3 style={{ margin: "0 0 10px 0", color: "#ffffff", fontSize: "20px", fontWeight: "bold" }}>📝 KIKA Member Registration</h3>
        <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "20px" }}>This phone matrix vector is unlisted. File a privilege request to claim a node wallet profile.</p>
        
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", color: "#94a3b8", fontSize: "11px", fontWeight: "bold", marginBottom: "6px" }}>FULL MEMBER NAME</label>
          <input required type="text" id="kikaRegName" name="newName" value={regName} onChange={(e) => setRegName(e.target.value)} style={{ width: "100%", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "6px", padding: "12px", color: "#ffffff", outline: "none", boxSizing: "border-box" }} />
        </div>
        
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", color: "#94a3b8", fontSize: "11px", fontWeight: "bold", marginBottom: "6px" }}>PRIMARY PHONE NUMBER</label>
          <input required type="tel" id="kikaRegPhone" name="newPhone" placeholder="+256..." value={regPhone} onChange={(e) => setRegPhone(e.target.value)} style={{ width: "100%", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "6px", padding: "12px", color: "#ffffff", outline: "none", boxSizing: "border-box" }} />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", color: "#94a3b8", fontSize: "11px", fontWeight: "bold", marginBottom: "6px" }}>CREATE SECURE ACCOUNT PASSWORD</label>
          <input required type="password" id="kikaRegPass" name="password" placeholder="••••••••••••" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} style={{ width: "100%", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "6px", padding: "12px", color: "#ffffff", outline: "none", boxSizing: "border-box" }} />
        </div>
        
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", color: "#94a3b8", fontSize: "11px", fontWeight: "bold", marginBottom: "6px" }}>NODE REGION COUNTRY LOCATION</label>
          <select id="kikaRegCountry" name="country" value={regCountry} onChange={(e) => setRegCountry(e.target.value)} style={{ width: "100%", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "6px", padding: "12px", color: "#ffffff", outline: "none", boxSizing: "border-box" }}>
            <option value="UG">Uganda (MTN / Airtel Network Node)</option>
            <option value="KE">Kenya (Safaricom Network Node)</option>
          </select>
        </div>
        
        <button type="submit" style={{ width: "100%", padding: "14px", backgroundColor: "#38bdf8", color: "#0f172a", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", marginBottom: "10px" }}>Submit Proxy Node Request</button>
        <button type="button" onClick={() => { setShowRegister(false); setPasswordInput(""); }} style={{ width: "100%", padding: "10px", backgroundColor: "transparent", color: "#94a3b8", border: "none", cursor: "pointer", fontSize: "13px" }}>← Back to Secure Login</button>
      </form>
    );
  }

  // ==========================================
  // 2. PRODUCTION GATEKEEPER LOGIN INTERFACE
  // ==========================================
  return (
    <form onSubmit={onLocalLoginSubmit} style={{ backgroundColor: "#1e293b", padding: "30px", borderRadius: "16px", border: "1px solid #334155", textAlign: "center" }}>
      <span style={{ fontSize: "40px", display: "block", marginBottom: "15px" }}>🔒</span>
      <h3 style={{ margin: "0 0 10px 0", color: "#ffffff", fontSize: "18px", fontWeight: "bold" }}>Secure Member Calling Gate</h3>
      <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "25px", lineHeight: "1.4" }}>Enter your registered KIKA Member phone configuration number to access your localized communication networks.</p>
      
      <div style={{ marginBottom: "15px", textAlign: "left" }}>
        <label style={{ display: "block", color: "#64748b", fontSize: "10px", fontWeight: "bold", marginBottom: "4px" }}>PHONE CONFIGURATION NUMBER</label>
        <input required type="tel" id="kikaLoginPhone" name="loginPhoneNumber" placeholder="e.g. +256701234567" autoComplete="username" value={loginPhone} onChange={(e) => setLoginPhone(e.target.value)} style={{ width: "100%", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "6px", padding: "14px", color: "#ffffff", fontSize: "16px", textAlign: "center", outline: "none", boxSizing: "border-box" }} />
      </div>

      <div style={{ marginBottom: "20px", textAlign: "left" }}>
        <label style={{ display: "block", color: "#64748b", fontSize: "10px", fontWeight: "bold", marginBottom: "4px" }}>ENCRYPTED PASSWORD KEY</label>
        <input required type="password" id="kikaLoginPass" name="loginPassword" placeholder="••••••••" autoComplete="current-password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} style={{ width: "100%", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "6px", padding: "14px", color: "#ffffff", fontSize: "16px", textAlign: "center", outline: "none", boxSizing: "border-box" }} />
      </div>

      <button type="submit" style={{ width: "100%", padding: "14px", backgroundColor: "#16a34a", color: "#ffffff", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "15px", cursor: "pointer" }}>Authorize Terminal Sync</button>
      
      <p style={{ marginTop: "20px", fontSize: "12px", color: "#64748b" }}>Status: {callStatus}</p>
    </form>
  );
}
