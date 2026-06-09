import React from "react";

export default function Hero() {
  return (
    <section style={{ background: "linear-gradient(120deg, #0f172a 0%, #2563eb 55%, #16a34a 100%)", color: "#ffffff", padding: "110px 20px", textAlign: "center" }}>
      <div style={{ maxWidth: "850px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "52px", fontWeight: "bold", marginBottom: "20px", lineHeight: 1.2 }}>KIKA Global Outreach</h1>
        <p style={{ fontSize: "20px", opacity: 0.9, marginBottom: "40px" }}>Connecting Diaspora Communities to Global Ecosystems.</p>
      </div>
    </section>
  );
}
