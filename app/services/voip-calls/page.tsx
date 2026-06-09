"use client";

import React from "react";
// Connects directly to your optimized keypad grid dialer component
import WebRTCDialer from "../../components/WebRTCDialer";

export default function VoipCallPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f172a", padding: "40px 20px", color: "#f8fafc", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: "550px", margin: "0 auto" }}>
        
        {/* DASHBOARD TERMINAL EXIT NAV BUTTON */}
        <button 
          onClick={() => { window.location.href = "/"; }} 
          style={{ background: "none", border: "none", color: "#38bdf8", fontSize: "16px", fontWeight: "bold", cursor: "pointer", padding: "0", marginBottom: "30px" }}
        >
          ← Exit Communication Portal
        </button>

        <div style={{ borderBottom: "1px solid #334155", paddingBottom: "20px", marginBottom: "30px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "900", margin: "0 0 8px 0", color: "#ffffff" }}>🎙️ KIKA Diaspora Voice Link</h1>
          <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.5", margin: "0" }}>
            High-fidelity, ultra-low cost WebRTC bridge connecting global diaspora nodes directly to standard cellular arrays in East Africa.
          </p>
        </div>

        {/* SECURE INTERACTIVE WEB-DIALER COMPONENT */}
        <WebRTCDialer />

      </div>
    </div>
  );
}
