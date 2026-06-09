"use client";

import React, { useState } from "react";
import { navigationData } from "../config/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, relativePath: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (typeof window !== "undefined") {
      let finalPath = relativePath;
      
      // Strict Fallback Protection Engine:
      // If the incoming config path says /services/voip or /services/voip-call,
      // it is automatically corrected to the exact working /services/voip-calls route.
      if (finalPath === "/services/voip" || finalPath === "/services/voip-call") {
        finalPath = "/services/voip-calls";
      }

      const absoluteTarget = `${window.location.origin}${finalPath}`;
      window.location.assign(absoluteTarget);
    }
  };

  return (
    <nav style={{ backgroundColor: "#0f172a", borderBottom: "1px solid #1e293b", padding: "0 20px", fontFamily: "Arial, sans-serif", position: "relative", zIndex: 50 }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        
        <a href="/" style={{ fontSize: "22px", fontWeight: "900", color: "#ffffff", textDecoration: "none", letterSpacing: "1px" }}>
          🚀 KIKA PLATFORM
        </a>

        <div style={{ position: "relative" }}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{ backgroundColor: "transparent", border: "none", color: "#94a3b8", fontSize: "16px", fontWeight: "600", cursor: "pointer", padding: "10px 15px", display: "flex", alignItems: "center", gap: "6px" }}
          >
            {navigationData.name || "Core Services"} <span style={{ fontSize: "12px", transition: "transform 0.2s", display: "inline-block", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
          </button>

          {isOpen && (
            <div style={{ position: "absolute", top: "55px", right: 0, width: "320px", backgroundColor: "#1e293b", borderRadius: "8px", border: "1px solid #334155", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)", padding: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
              {(navigationData.submenus || []).map((submenu: any, index: number) => (
                <a
                  key={index}
                  href={submenu.path}
                  onClick={(e) => handleNavigation(e, submenu.path)}
                  style={{ display: "block", padding: "12px", borderRadius: "6px", textDecoration: "none", transition: "background 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#334155"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  <div style={{ color: "#ffffff", fontSize: "14px", fontWeight: "bold", marginBottom: "3px" }}>
                    {submenu.name}
                  </div>
                  <div style={{ color: "#94a3b8", fontSize: "12px", lineHeight: "1.4" }}>
                    {submenu.desc}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}
