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
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close open dropdown window containers if clicking anywhere else
  useEffect(() => {
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

  // Filter out standalone link items to isolate dropdown blocks
  const dropdownSections = navigationTraffic.filter(
    (section: any) => section.submenus && section.submenus.length > 0
  );

  // 🦾 DIRECT EDGE INSPECTOR: Validates cookies on the fly the exact millisecond the cursor passes over
  const handleMouseEnterItem = (e: React.MouseEvent, subItem: any) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    
    // Checks the physical browser data keys natively on the fly
    const isUserAuthenticated = document.cookie.includes("kika_session_active=true");
    if (isUserAuthenticated) {
      setHoveredSub(null); // Keep preview gates completely hidden for logged-in members
      return;
    }
    
    const rect = e.currentTarget.getBoundingClientRect();
    // Anchor the mini side-window precisely to the right side of the hovered option link row
    setHoverPos({
      top: rect.top + window.scrollY - 10,
      left: rect.right + window.scrollX + 10
    });
    setHoveredSub(subItem);
  };

  const handleMouseLeaveItem = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setHoveredSub(null);
    }, 180); // Clear 180ms buffer delay that lets the user's cursor transit across the gap into the side window cleanly
  };

  const handleKeepHoverWindowOpen = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  };

  const handleLinkExecutionGate = (e: React.MouseEvent, path: string) => {
    const isUserAuthenticated = document.cookie.includes("kika_session_active=true");
    if (!isUserAuthenticated) {
      e.preventDefault(); // 🛑 SECURE BLOCKAGE: Stops guest browser routing paths instantly
    } else {
      setOpenIndex(null);
      setHoveredSub(null);
      router.push(path); // Grants direct access to the live software consoles
    }
  };

  return (
    <div 
      ref={containerRef} 
      style={{ 
        display: "flex", 
        gap: "10px", 
        justifyContent: "center", 
        alignItems: "center" 
      }}
    >
      {dropdownSections.map((section: any, index: number) => (
        <div key={index} style={{ position: "relative" }}>
          
          {/* Dropdown Title Button */}
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

          {/* Dropdown Content Window */}
          {openIndex === index && (
            <div style={{
              position: "absolute",
              top: "100%",
              left: "0",
              marginTop: "8px",
              width: "220px",
              backgroundColor: "#0b1528",
              border: "1px solid #1e293b",
              borderRadius: "8px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
              padding: "10px 0",
              zIndex: 50
            }}>
              {section.submenus?.map((sub: any, subIndex: number) => {
                // Determine a safe fallback summary paragraph description if your config file is missing text definitions
                const backupText = `Access decentralized ${sub.label || sub.title || sub.name} ecosystem parameters. Authorization node credentials required.`;
                const summaryDescription = sub.previewText || sub.description || backupText;
                const pathTarget = sub.path || sub.href || "#";

                return (
                  <div
                    key={subIndex}
                    onMouseEnter={(e) => handleMouseEnterItem(e, { ...sub, computedText: summaryDescription })}
                    onMouseLeave={handleMouseLeaveItem}
                    style={{ position: "relative" }}
                  >
                    <Link 
                      href={pathTarget} 
                      onClick={(e) => handleLinkExecutionGate(e, pathTarget)}
                      style={{ textDecoration: "none" }}
                    >
                      <div 
                        style={{
                          padding: "8px 16px",
                          color: "#cbd5e1",
                          fontSize: "12px",
                          cursor: "pointer",
                          transition: "background 0.2s"
                        }}
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

      {/* 🧭 PREMIUM HOVER PREVIEW SIDE-WINDOW DRAWER FRAME (WITH TRANSIT CORRIDOR PASS-THROUGH) */}
      {hoveredSub && (
        <div 
          onMouseEnter={handleKeepHoverWindowOpen}
          onMouseLeave={setHoveredSub.bind(null, null)}
          style={{ 
            position: "absolute" as const, 
            top: `${hoverPos.top}px`, 
            left: `${hoverPos.left}px`, 
            width: "250px", 
            backgroundColor: "#0b1528", 
            border: "1px solid #3b82f6", 
            borderRadius: "8px", 
            padding: "14px", 
            boxShadow: "0 20px 40px rgba(0,0,0,0.6)", 
            zIndex: 200, 
            pointerEvents: "auto", // 🛑 Allows mouse interactions inside the window layer
            display: "flex", 
            flexDirection: "column", 
            gap: "10px" 
          }}
        >
          <div style={{ fontWeight: "bold", fontSize: "12.5px", color: "#ffffff", display: "flex", alignItems: "center", gap: "6px" }}>
            🤝 {hoveredSub.label || hoveredSub.title || hoveredSub.name}
          </div>
          
          {/* 📜 Dynamic 2-Line Infrastructure Summary Block */}
          <p style={{ margin: 0, color: "#94a3b8", fontSize: "11px", lineHeight: "1.4" }}>
            {hoveredSub.computedText}
          </p>
          
          {/* 🔐 DOUBLE GATEWAY REGISTRATION SYSTEM LINKS */}
          <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
            <Link href="/login" onClick={() => { setOpenIndex(null); setHoveredSub(null); }} style={{ flex: 1, textDecoration: "none" }}>
              <button style={{ width: "100%", padding: "8px", backgroundColor: "#3b82f6", color: "#ffffff", border: "none", borderRadius: "4px", fontSize: "11px", fontWeight: "bold", cursor: "pointer", outline: "none" }}>
                🔐 Login
              </button>
            </Link>
            <Link href="/signup" onClick={() => { setOpenIndex(null); setHoveredSub(null); }} style={{ flex: 1, textDecoration: "none" }}>
              <button style={{ width: "100%", padding: "8px", backgroundColor: "#10b981", color: "#0b1528", border: "none", borderRadius: "4px", fontSize: "11px", fontWeight: "bold", cursor: "pointer", outline: "none" }}>
                📝 Enroll
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
