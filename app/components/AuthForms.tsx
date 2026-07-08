"use client";

import { useState } from "react";

interface AuthFormsProps {
  handleRegisterSubmit: (payload: {
    name: string;
    phone: string;
    password: string;
    nodeRegion: string;
  }) => Promise<void>;
}

export default function AuthForms({ handleRegisterSubmit }: AuthFormsProps) {
  const [nameInput, setNameInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("+256");
  const [passwordInput, setPasswordInput] = useState("");
  const [nodeRegionInput, setNodeRegionInput] = useState("Uganda (MTN / Airtel Network Node)");
  const [processingState, setProcessingState] = useState("");

  const onLocalRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessingState("Processing proxy node activation...");

    const cleanPayload = {
      name: nameInput,
      phone: phoneInput,
      password: passwordInput,
      nodeRegion: nodeRegionInput,
    };

    try {
      await handleRegisterSubmit(cleanPayload);
    } catch (err) {
      setProcessingState("Error: Local gateway submission failed.");
    }
  };

  return (
    <div style={{
      width: "100%",
      maxWidth: "450px",
      backgroundColor: "#0B1528",
      border: "1px solid #1E293B",
      padding: "24px",
      borderRadius: "16px",
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
      margin: "0 auto",
      boxSizing: "border-box",
      fontFamily: "sans-serif"
    }}>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#F1F5F9", margin: "0 0 6px 0" }}>
          Secure Member Calling Gate
        </h2>
        <p style={{ fontSize: "13px", color: "#94A3B8", margin: "0" }}>
          Configure your proxy node credentials to sync the active device
        </p>
      </div>

      <form onSubmit={onLocalRegisterSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        
        {/* Full Member Name Input */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {/* 🛠️ ALIGNED FIXED STYLE: Corrected 'uppercase: "true"' to standard 'textTransform: "uppercase"' */}
          <label style={{ fontSize: "11px", fontWeight: "600", color: "#CBD5E1", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Full Member Name
          </label>
          <input
            type="text"
            required
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="e.g. Kika-global"
            style={{
              width: "100%",
              boxSizing: "border-box",
              backgroundColor: "#020617",
              border: "1px solid #334155",
              borderRadius: "8px",
              padding: "10px 14px",
              fontSize: "14px",
              color: "#F8FAFC",
              outline: "none"
            }}
          />
        </div>

        {/* Phone Configuration Link Number Input */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "11px", fontWeight: "600", color: "#CBD5E1", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Phone Configuration Link Number
          </label>
          <input
            type="tel"
            required
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
            placeholder="e.g. +2567021234567"
            style={{
              width: "100%",
              boxSizing: "border-box",
              backgroundColor: "#020617",
              border: "1px solid #334155",
              borderRadius: "8px",
              padding: "10px 14px",
              fontSize: "14px",
              fontFamily: "monospace",
              color: "#F8FAFC",
              outline: "none"
            }}
          />
        </div>

        {/* Security Password Input */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "11px", fontWeight: "600", color: "#CBD5E1", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Security Node Password / Key
          </label>
          <input
            type="password"
            required
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="••••••••••••"
            style={{
              width: "100%",
              boxSizing: "border-box",
              backgroundColor: "#020617",
              border: "1px solid #334155",
              borderRadius: "8px",
              padding: "10px 14px",
              fontSize: "14px",
              color: "#F8FAFC",
              outline: "none"
            }}
          />
        </div>

        {/* Network Node Region Selection Dropdown */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "11px", fontWeight: "600", color: "#CBD5E1", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Target Destination Node Region
          </label>
          <select
            value={nodeRegionInput}
            onChange={(e) => setNodeRegionInput(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              backgroundColor: "#020617",
              border: "1px solid #334155",
              borderRadius: "8px",
              padding: "10px 14px",
              fontSize: "14px",
              color: "#F8FAFC",
              outline: "none",
              cursor: "pointer"
            }}
          >
            <option value="Uganda (MTN / Airtel Network Node)">Uganda (MTN / Airtel Network Node)</option>
            <option value="Kenya (Safaricom / Airtel Network Node)">Kenya (Safaricom / Airtel Network Node)</option>
            <option value="Tanzania (Vodacom / Tigo Network Node)">Tanzania (Vodacom / Tigo Network Node)</option>
            <option value="International Cross-Border Node">International Cross-Border Node</option>
          </select>
        </div>

        {/* Execution Submit Action Button Panel */}
        <div style={{ paddingTop: "8px" }}>
          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#2563EB",
              color: "#FFFFFF",
              fontWeight: "bold",
              padding: "12px 16px",
              borderRadius: "8px",
              fontSize: "14px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)"
            }}
          >
            Submit Proxy Node Request
          </button>
        </div>
      </form>

      {/* Dynamic Status Reporting Strip */}
      {processingState && (
        <div style={{
          marginTop: "16px",
          textAlign: "center",
          fontSize: "12px",
          fontFamily: "monospace",
          color: "#60A5FA",
          backgroundColor: "rgba(30, 58, 138, 0.4)",
          border: "1px solid rgba(30, 58, 138, 0.5)",
          padding: "8px 12px",
          borderRadius: "8px"
        }}>
          {processingState}
        </div>
      )}
    </div>
  );
}
