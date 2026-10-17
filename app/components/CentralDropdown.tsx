"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; 
import { navigationTraffic } from "../config/navigation";

export default function CentralDropdown() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoveredSub, setHoveredSub] = useState<any | null>(null);
  const [hoverPos, setHoverPos] = useState({ top: 0, left: 0 });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const hasActiveSession = document.cookie.includes("kika_session_active=true");
    setIsLoggedIn(hasActiveSession);

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenIndex(null);
        setHoveredSub(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const dropdownSections = navigationTraffic.filter(
    (section: any) => section.submenus && section.submenus.length > 0
  );

  const handleMouseEnterItem = (e: React.MouseEvent, subItem: any) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    if (isLoggedIn) return; // Hide hover preview windows for logged-in active sessions
    
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverPos({
      top: rect.top + window.scrollY - 10,
      left: rect.right + window.scrollX + 8
    });
    setHoveredSub(subItem);
  };

  const handleMouseLeaveItem = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setHoveredSub(null);
    }, 150);
  };

  // 🦾 DYNAMIC MULTI-ROUTER CORRIDOR
  const handleLinkExecutionGate = (e: React.MouseEvent, subItem: any) => {
    if (!isLoggedIn) {
      // Guests bypass routing parameters and are prompted with onboarding overlays
      return;
    }

    setOpenIndex(null);
    setHoveredSub(null);

    const rawLabel = (subItem.label || subItem.title || subItem.name || "").trim().toLowerCase();
    const pathTarget = subItem.path || subItem.href || "#";

    // 🏗️ PRECISION INTERCEPT: Targets only your explicit supply chain compliance options rows
    if (rawLabel.includes("supply chain") || rawLabel.includes("compliance") || subItem.name === "supply_chain") {
      e.preventDefault();
      router.push("/supply-chain");
    } else if (pathTarget !== "#") {
      e.preventDefault();
      router.push(pathTarget);
    }
  };

  return (
    <div ref={containerRef} style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "center" }}>
      {dropdownSections.map((section: any, index: number) => (
        <div key={index} style={{ position: "relative" }}>
          
          {/* 🟢 RESTORED: Main Header text title buttons now cleanly toggle drop menus again with zero freezing */}
          <button
            onClick={() => { setOpenIndex(openIndex === index ? null : index); setHoveredSub(null); }}
            style={{
              backgroundColor: "transparent",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "600",
              whiteSpace: "nowrap",
              padding: "4px 8px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              outline: "none"
            }}
          >
            {section.title || section.label || section.name} ▼
          </button>

          {/* Submenu Item Floating Box Wrapper */}
          {openIndex === index && (
            <div style={{ position: "absolute", top: "100%", left: "0", marginTop: "8px", width: "240px", backgroundColor: "#0b1528", border: "1px solid #1e293b", borderRadius: "8px", boxShadow: "0 10px 25px rgba(0,0,0,0.5)", padding: "10px 0", zIndex: 50 }}>
              {section.submenus?.map((sub: any, subIndex: number) => {
                const backupText = `Access decentralized ${sub.label} ecosystem parameters.`;
                const summaryDescription = sub.previewText || sub.description || backupText;
                const pathTarget = sub.path || sub.href || "#";

                return (
                  <div
                    key={subIndex}
                    onMouseEnter={(e) => handleMouseEnterItem(e, { ...sub, computedText: summaryDescription })}
                    onMouseLeave={handleMouseLeaveItem}
                    style={{ position: "relative" }}
                  >
                    <Link href={isLoggedIn ? pathTarget : sub.path || "/login"} onClick={(e) => handleLinkExecutionGate(e, sub)} style={{ textDecoration: "none" }}>
                      <div 
                        style={{ padding: "8px 16px", color: "#cbd5e1", fontSize: "12px", cursor: "pointer", transition: "background 0.2s" }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(16, 185, 129, 0.1)"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                      >
                        {sub.label || sub.title || sub.name}
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}

      {/* 🧭 FLOATING SIDE-WINDOW DRAWER PANEL FOR UN-AUTHENTICATED GUESTS */}
      {hoveredSub && (
        <div 
          onMouseEnter={() => { if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current); }}
          onMouseLeave={() => setHoveredSub(null)}
          style={{ position: "absolute" as const, top: `${hoverPos.top}px`, left: `${hoverPos.left}px`, width: "250px", backgroundColor: "#0b1528", border: "1px solid #3b82f6", borderRadius: "8px", padding: "14px", boxShadow: "0 20px 40px rgba(0,0,0,0.6)", zIndex: 200, pointerEvents: "auto", display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <div style={{ fontWeight: "bold", fontSize: "12.5px", color: "#ffffff", display: "flex", alignItems: "center", gap: "6px" }}>
            🤝 {hoveredSub.label}
          </div>
          <p style={{ margin: 0, color: "#94a3b8", fontSize: "11px", lineHeight: "1.4" }}>{hoveredSub.computedText}</p>
          <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
            <Link href="/login" onClick={() => { setOpenIndex(null); setHoveredSub(null); }} style={{ flex: 1, textDecoration: "none" }}>
              <button style={{ width: "100%", padding: "8px", backgroundColor: "#3b82f6", color: "#ffffff", border: "none", borderRadius: "4px", fontSize: "11px", fontWeight: "bold", cursor: "pointer", outline: "none" }}>🔐 Login</button>
            </Link>
            <Link href="/signup" onClick={() => { setOpenIndex(null); setHoveredSub(null); }} style={{ flex: 1, textDecoration: "none" }}>
              <button style={{ width: "100%", padding: "8px", backgroundColor: "#10b981", color: "#0b1528", border: "none", borderRadius: "4px", fontSize: "11px", fontWeight: "bold", cursor: "pointer", outline: "none" }}>📝 Enroll</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
