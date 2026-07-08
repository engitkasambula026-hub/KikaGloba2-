// app/page.tsx - Restored Kika Global Landing Master Template
"use client";

import Link from "next/link";
import CentralDropdown from "./components/CentralDropdown";

export default function KikaLandingPage() {
  return (
    <main style={{
      minHeight: "100vh", backgroundColor: "#0F172A", color: "#F8FAFC",
      fontFamily: "sans-serif", display: "flex", flexDirection: "column", boxSizing: "border-box"
    }}>
      {/* 🧭 TOP MASTER HEADER NAVIGATION BAR CONTAINER */}
      <header style={{
        width: "100%", backgroundColor: "#0B1528", borderBottom: "1px solid #1E293B",
        padding: "16px 24px", display: "flex", justifyContent: "space-between",
        alignItems: "center", boxSizing: "border-box"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "24px", fontWeight: "bold", color: "#3B82F6", letterSpacing: "0.05em" }}>
            KIKA GLOBAL
          </span>
          <span style={{ backgroundColor: "#1E293B", color: "#10B981", fontSize: "11px", fontWeight: "bold", padding: "4px 8px", borderRadius: "6px", fontFamily: "monospace" }}>
            PORT 3000 ACTIVE
          </span>
        </div>

        {/* 🌟 Central Dropdown Link Hub - Renders your navigation blocks automatically */}
        <nav style={{ display: "flex", gap: "20px" }}>
          <CentralDropdown />
        </nav>
      </header>

      {/* 🚀 MAIN HERO WELCOME SPACE MATRIX PANEL */}
      <section style={{
        flex: "1", display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", textAlign: "center", padding: "40px 20px", maxWidth: "800px", margin: "0 auto"
      }}>
        <h1 style={{ fontSize: "42px", fontWeight: "bold", color: "#FFF", marginBottom: "16px", lineHeight: "1.2" }}>
          Cross-Border Diaspora Automation Ecosystem
        </h1>
        <p style={{ fontSize: "16px", color: "#94A3B8", maxWidth: "600px", margin: "0 0 32px 0", lineHeight: "1.6" }}>
          Unified technical channels bridging global communication, remittance capital trunks, and local cooperative SACCO ledgers seamlessly from your disk.
        </p>

        {/* Rapid Deployment Link Quick-Launch Cards Grid Array */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", width: "100%" }}>
          <Link href="/services/voip" style={{ textDecoration: "none", padding: "20px", backgroundColor: "#0B1528", border: "1px solid #1E293B", borderRadius: "14px", color: "#FFF", textAlign: "left" }}>
            <div style={{ fontSize: "20px", marginBottom: "6px" }}>🎙️ Voice Link</div>
            <div style={{ fontSize: "12px", color: "#94A3B8" }}>Open secure 3x3 circular layout dialpad keypad consoles to fire outbound proxy calls.</div>
          </Link>

          <Link href="/services/send-money" style={{ textDecoration: "none", padding: "20px", backgroundColor: "#0B1528", border: "1px solid #1E293B", borderRadius: "14px", color: "#FFF", textAlign: "left" }}>
            <div style={{ fontSize: "20px", marginBottom: "6px" }}>💳 Remittance Trunk</div>
            <div style={{ fontSize: "12px", color: "#94A3B8" }}>Access multi-country exchange calculation rate windows to route capital.</div>
          </Link>
        </div>
      </section>
    </main>
  );
}
