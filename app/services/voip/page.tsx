"use client";

import { useEffect } from "react";

export default function VoipRedirectPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Instantly forces a redirect to the working plural dialer view
      window.location.replace("/services/voip-calls");
    }
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Arial, sans-serif" }}>
      <p style={{ color: "#94a3b8", fontSize: "16px", fontWeight: "bold" }}>
        Optimizing KIKA Communications Node Pipeline...
      </p>
    </div>
  );
}
