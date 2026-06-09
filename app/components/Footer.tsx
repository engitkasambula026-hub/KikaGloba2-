"use client";
import React from "react";

interface FooterProps {
  contactSectionRef: React.RefObject<any>;
}

export default function Footer({ contactSectionRef }: FooterProps) {
  return (
    <footer ref={contactSectionRef} style={{ backgroundColor: "#0f172a", color: "#94a3b8", padding: "60px 40px", borderTop: "1px solid #1e293b", scrollMarginTop: "70px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h4 style={{ color: "#ffffff", marginBottom: "20px", fontSize: "18px" }}>Global Headquarters Contact Directory</h4>
        <p style={{ margin: "8px 0", fontSize: "14px" }}>📍 100 International Parkway, Suite 450, New York, NY 10001, United States</p>
        <p style={{ margin: "8px 0", fontSize: "14px" }}>📞 Phone Line Channel: +1 (555) 234-5678</p>
        <p style={{ margin: "8px 0", fontSize: "14px" }}>✉️ Operations Network Inbox: operations@kika-global.com</p>
      </div>
    </footer>
  );
}
