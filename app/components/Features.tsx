import React from "react";

export default function Features() {
  return (
    <section style={{ padding: "80px 20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "30px" }}>
        <div style={{ backgroundColor: "#ffffff", padding: "35px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
          <h3 style={{ fontSize: "20px", marginTop: 0, marginBottom: "15px" }}>💼 Global Employment Channel</h3>
          <p style={{ color: "#64748b", lineHeight: 1.6, margin: 0 }}>Algorithmic remote pipelines linking international professionals to verified vacancies across active economic trade blocks.</p>
        </div>
        <div style={{ backgroundColor: "#ffffff", padding: "35px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
          <h3 style={{ fontSize: "20px", marginTop: 0, marginBottom: "15px" }}>🌐 Trade Network Systems</h3>
          <p style={{ color: "#64748b", lineHeight: 1.6, margin: 0 }}>Unifying global chambers of commerce, asset equity allocations, and multi-continental trade directories onto a single grid.</p>
        </div>
        <div style={{ backgroundColor: "#ffffff", padding: "35px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
          <h3 style={{ fontSize: "20px", marginTop: 0, marginBottom: "15px" }}>⚡ Smart Digital Services</h3>
          <p style={{ color: "#64748b", lineHeight: 1.6, margin: 0 }}>Deploying specialized diaspora escrow structures, identity document verification channels, and high-volume VoIP systems.</p>
        </div>
      </div>
    </section>
  );
}
