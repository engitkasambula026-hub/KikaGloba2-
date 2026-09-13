"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; 
import { navigationTraffic } from "../config/navigation";

export default function CentralDropdown() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close open dropdown window containers if clicking anywhere else
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter out standalone link items to isolate dropdown blocks
  const dropdownSections = navigationTraffic.filter(
    (section: any) => section.submenus && section.submenus.length > 0
  );

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
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
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
              gap: "4px"
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
              {section.submenus?.map((sub: any, subIndex: number) => (
                <Link key={subIndex} href={sub.path || sub.href || "#"} style={{ textDecoration: "none" }}>
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
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}