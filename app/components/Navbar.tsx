"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { navigationTraffic, outreachLink } from "../config/navigation";

export default function Navbar() {
  // Track open dropdown category state via section index
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const router = useRouter();

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, relativePath: string) => {
    e.preventDefault();
    setOpenDropdown(null);
    
    let finalPath = relativePath;
    
    // Strict Fallback Protection Engine
    if (finalPath === "/services/voip" || finalPath === "/services/voip-call") {
      finalPath = "/services/voip-calls";
    }

    router.push(finalPath);
  };

  return (
    <nav style={{ backgroundColor: "#0f172a", borderBottom: "1px solid #1e293b", padding: "0 20px", fontFamily: "Arial, sans-serif", position: "relative", zIndex: 50 }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        
        {/* LOGO NODE */}
        <a 
          href="/" 
          onClick={(e) => { e.preventDefault(); router.push("/"); }}
          style={{ fontSize: "22px", fontWeight: "900", color: "#ffffff", textDecoration: "none", letterSpacing: "1px" }}
        >
          🚀 KIKA PLATFORM
        </a>

        {/* HORIZONTAL MENU FLOW TRACK */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          
          {/* 📞 STATIC OUTREACH LINK */}
          <a
            href={outreachLink.path}
            onClick={(e) => handleNavigation(e, outreachLink.path)}
            style={{ color: "#94a3b8", textDecoration: "none", fontSize: "14px", fontWeight: "600", padding: "10px 5px", transition: "color 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#ffffff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#94a3b8"; }}
          >
            {outreachLink.name}
          </a>

          {/* DYNAMIC SECTIONS GRID MATRIX LOOP */}
          {navigationTraffic.map((section, idx) => (
            <div key={idx} style={{ position: "relative" }}>
              <button
                onClick={() => setOpenDropdown(openDropdown === idx ? null : idx)}
                style={{ backgroundColor: "transparent", border: "none", color: openDropdown === idx ? "#34d399" : "#ffffff", fontSize: "14px", fontWeight: "600", cursor: "pointer", padding: "10px 12px", display: "flex", alignItems: "center", gap: "4px" }}
              >
                {section.name} <span style={{ fontSize: "9px", transition: "transform 0.2s", display: "inline-block", transform: openDropdown === idx ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
              </button>

              {openDropdown === idx && (
                <div style={{ position: "absolute", top: "55px", right: 0, width: "320px", backgroundColor: "#1e293b", borderRadius: "8px", border: "1px solid #334155", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)", padding: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
                  {section.submenus.map((submenu, subIdx) => (
                    <a
                      key={subIdx}
                      href={submenu.path}
                      onClick={(e) => handleNavigation(e, submenu.path)}
                      style={{ display: "block", padding: "10px", borderRadius: "6px", textDecoration: "none", transition: "background 0.2s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#334155"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                    >
                      <div style={{ color: "#34d399", fontSize: "13px", fontWeight: "bold", marginBottom: "2px" }}>
                        {submenu.name}
                      </div>
                      {submenu.desc && (
                        <div style={{ color: "#94a3b8", fontSize: "11px", lineHeight: "1.4" }}>
                          {submenu.desc}
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

        </div>

      </div>
    </nav>
  );
}
