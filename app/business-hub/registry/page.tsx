"use client";
import React from "react";
import RegistrationForm from "../../components/registrationform";

export default function DiasporaRegistryPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", padding: "40px 20px", color: "#1e293b", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: "650px", margin: "0 auto" }}>
        
        {/* HOMEPAGE ROUTING OVERLAY LINK */}
        <button onClick={() => { window.location.href = "/"; }} style={{ background: "none", border: "none", color: "#2563eb", fontSize: "16px", fontWeight: "bold", cursor: "pointer", padding: "0", marginBottom: "25px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
          ← Return to KIKA Global Homepage
        </button>

        <h1 style={{ fontSize: "32px", color: "#0f172a", marginBottom: "10px", fontWeight: "800" }}>🌍 Diaspora Global Registry</h1>
        <p style={{ color: "#64748b", marginBottom: "30px", lineHeight: "1.5" }}>Comprehensive authentication matrix verifying citizenship, domicile locations, structural status, and technical professional attributes.</p>
        
        {/* Mapped perfectly to your actual components folder path */}
        <RegistrationForm />

      </div>
    </div>
  );
}
