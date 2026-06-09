"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
// 🌟 FIXED: Correct Next.js link import package location
import Link from "next/link"; 
// 🌟 FIXED: Directly import configuration to map the four dropdown components automatically
import { navigationTraffic, NavigationSection } from "../config/navigation";

export default function CentralDropdown() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close open dropdown window containers if clicking anywhere else out of bounds
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenIndex(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter out standalone link items (like Home and Networks) to isolate the 4 dropdown blocks
  const dropdownSections = navigationTraffic.filter(
    (section) => section.submenus && section.submenus.length > 0
  );

  return (
    <div 
      ref={containerRef} 
      style={{ 
        display: "flex", 
        gap: "35px", 
        justifyContent: "center", 
        alignItems: "center" 
      }}
    >
      {dropdownSections.map((section: NavigationSection, sectionIdx: number) => (
        <div key={sectionIdx} style={{ position: "relative", display: "inline-block" }}>
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === sectionIdx ? null : sectionIdx)}
            style={{
              background: "transparent",
              border: "none",
              color: "#ffffff", // Crisp white to stand out against the blue background banner
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: 600,
              padding: "10px 15px",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "opacity 0.2s"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {section.name} 
            <span style={{ fontSize: "10px" }}>
              {openIndex === sectionIdx ? "▲" : "▼"}
            </span>
          </button>

          {/* Render target submenu lists if active index matches trigger toggle */}
          {openIndex === sectionIdx && section.submenus && (
            <div
              style={{
                position: "absolute",
                top: "45px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "white",
                minWidth: "290px",
                boxShadow: "0px 10px 30px rgba(0,0,0,0.15)",
                borderRadius: "12px",
                padding: "10px",
                zIndex: 2000,
              }}
            >
              {section.submenus.map((sub, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setOpenIndex(null);
                    router.push(sub.path);
                  }}
                  style={{
                    padding: "12px 14px",
                    cursor: "pointer",
                    borderRadius: "8px",
                    transition: "background 0.2s",
                    textAlign: "left"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <div style={{ color: "#0f172a", fontWeight: "bold", fontSize: "14px" }}>
                    {sub.name}
                  </div>
                  {sub.desc && (
                    <div style={{ color: "#64748b", fontSize: "11px", marginTop: "3px", lineHeight: 1.3 }}>
                      {sub.desc}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
