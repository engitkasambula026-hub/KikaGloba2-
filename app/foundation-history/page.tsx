"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function FoundationHistoryPage() {
  const router = useRouter();

  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", color: "#ffffff", fontFamily: "Arial, sans-serif", display: "flex", flexDirection: "column", paddingBottom: "30px" }}>
      
      {/* HEADER BANNER SUB-SYSTEM */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", borderBottom: "1px solid #1e293b", background: "#1e293b" }}>
        <span style={{ fontSize: "17px", fontWeight: "900", color: "#34d399", letterSpacing: "1px" }}>🏛️ KIKA GLOBAL FOUNDATION INTERFACE</span>
        <button 
          onClick={() => router.push("/")}
          style={{ background: "transparent", border: "1px solid #34d399", color: "#34d399", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "bold" }}
        >
          ⬅️ Return to Main Hub
        </button>
      </header>

      {/* CORE HISTORICAL TIMELINE PANEL WRAPPER */}
      <div style={{ maxWidth: "850px", margin: "40px auto", background: "#1e293b", padding: "40px", borderRadius: "16px", border: "1px solid #334155", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)", lineHeight: "1.7" }}>
        
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", borderBottom: "1px solid #334155", paddingBottom: "12px" }}>
          <span style={{ fontSize: "28px" }}>🕯️</span>
          <h2 style={{ color: "#ffffff", margin: "0", fontSize: "22px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px" }}>
            The Foundation Charter & Co-Founder Legacy
          </h2>
        </div>

        <p style={paragraphStyle}>
          The KiKa Project was born out of a shared vision between co-founders—conceived not merely as a commercial tech platform, but as a sovereign, social cooperative engine designed to empower sub-Saharan communities and bind the global Ugandan diaspora back to local micro-finance development networks.
        </p>

        <p style={paragraphStyle}>
          Our mission remains centered on removing structural bottlenecks in cross-border wealth transit, shielding migrant workers from predatory employment brokers, and providing real-time data linkages between diaspora savings pools and accredited agricultural and housing cooperatives in Uganda.
        </p>

        {/* MEMORIAL QUOTE FRAMEWORK BLOCK */}
        <div style={{ background: "rgba(52, 211, 153, 0.03)", borderLeft: "4px solid #34d399", padding: "20px", borderRadius: "0 8px 8px 0", fontStyle: "italic", color: "#94a3b8", fontSize: "14px", margin: "30px 0", lineHeight: "1.6" }}>
          "Though my co-founder and provider has physically passed on, the foundational vision we bared together remains the unbreakable blueprint driving this ecosystem forward. This transition into a full-blown Limited (LTD) corporation is engineered explicitly to safeguard that original legacy—creating floating member equity structures that guarantee our community remains the true shareholder of the KiKa vision."
          <br />
          <span style={{ display: "block", marginTop: "12px", color: "#34d399", fontWeight: "bold", fontSize: "12px", fontStyle: "normal", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            — Engineer Adam Kasambula, Co-Founder & Managing Director
          </span>
        </div>

        <h3 style={subHeaderStyle}>Sovereign Cooperative Milestones</h3>
        <p style={paragraphStyle}>
          By registering as a full Limited (LTD) company under the Uganda Registration Services Bureau (URSB), KiKa is scaling its infrastructure to deploy multi-tenant payment routes, secure cryptographic encryption salts for user privacy protection, and automated VoIP networks. We honor our origins by keeping the technology transparent, accountable, and entirely dedicated to economic empowerment.
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", color: "#64748b", borderTop: "1px solid #334155", marginTop: "35px", paddingTop: "15px" }}>
          <span>⚖️ URSB Corporate Compliance Framework</span>
          <span>Kampala, Uganda</span>
        </div>

      </div>
    </div>
  );
}

const paragraphStyle = { color: "#cbd5e1", fontSize: "14.5px", marginBottom: "16px" };
const subHeaderStyle = { color: "#34d399", fontSize: "15px", fontWeight: "bold", textTransform: "uppercase" as const, letterSpacing: "0.5px", marginTop: "25px", marginBottom: "10px" };
