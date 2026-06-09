"use client";
import React, { useState, useEffect, useRef } from "react";

export default function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (menuName: string) => {
    setActiveDropdown(activeDropdown === menuName ? null : menuName);
  };

  const navigateTo = (path: string) => {
    setActiveDropdown(null);
    window.location.href = path;
  };

  return (
    <div ref={navRef}>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, height: "70px", backgroundColor: "#0f172a", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 30px", zIndex: 1000, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
        
        {/* HOMEPAGE BRAND LINK */}
        <div onClick={() => navigateTo("/")} style={{ fontWeight: "bold", fontSize: "22px", letterSpacing: "1px", cursor: "pointer" }}>
          KIKA GLOBAL
        </div>
        
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button onClick={() => navigateTo("/")} style={{ background: "none", border: "none", color: "#ffffff", fontSize: "15px", cursor: "pointer", padding: "8px 12px", borderRadius: "6px" }}>
            Home
          </button>
          
          {/* JOBS DROPDOWN MENU */}
          <div style={{ position: "relative" }}>
            <button onClick={() => toggleDropdown("jobs")} style={{ background: "none", border: "none", color: "#ffffff", fontSize: "15px", cursor: "pointer", padding: "8px 12px" }}>
              Jobs Hub {activeDropdown === "jobs" ? "▲" : "▼"}
            </button>
            {activeDropdown === "jobs" && (
              <div style={{ position: "absolute", top: "50px", left: 0, width: "240px", backgroundColor: "#ffffff", boxShadow: "0 10px 15px rgba(0,0,0,0.1)", padding: "8px 0", borderRadius: "8px", border: "1px solid #e2e8f0", zIndex: 1010 }}>
                <button onClick={() => navigateTo("/jobs/search")} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "10px 20px", color: "#1e293b", cursor: "pointer", fontSize: "14px" }}>🔍 Search Remote Work</button>
                <button onClick={() => navigateTo("/jobs/employer")} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "10px 20px", color: "#1e293b", cursor: "pointer", fontSize: "14px" }}>📤 Post Vacancy (Employer)</button>
                <button onClick={() => navigateTo("/jobs/talent")} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "10px 20px", color: "#1e293b", cursor: "pointer", fontSize: "14px" }}>👥 Join Talent Pool</button>
              </div>
            )}
          </div>

          {/* BUSINESS HUB DROPDOWN MENU */}
          <div style={{ position: "relative" }}>
            <button onClick={() => toggleDropdown("businessHub")} style={{ background: "none", border: "none", color: "#ffffff", fontSize: "15px", cursor: "pointer", padding: "8px 12px" }}>
              Business Hub {activeDropdown === "businessHub" ? "▲" : "▼"}
            </button>
            {activeDropdown === "businessHub" && (
              <div style={{ position: "absolute", top: "50px", left: 0, width: "250px", backgroundColor: "#ffffff", boxShadow: "0 10px 15px rgba(0,0,0,0.1)", padding: "8px 0", borderRadius: "8px", border: "1px solid #e2e8f0", zIndex: 1010 }}>
                <button onClick={() => navigateTo("/business-hub/investments")} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "10px 20px", color: "#1e293b", cursor: "pointer", fontSize: "14px" }}>🏢 Continental Investments</button>
                <button onClick={() => navigateTo("/business-hub/market")} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "10px 20px", color: "#1e293b", cursor: "pointer", fontSize: "14px" }}>📈 Market and Stock</button>
                <button onClick={() => navigateTo("/business-hub/registry")} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "10px 20px", color: "#1e293b", cursor: "pointer", fontSize: "14px" }}>🌍 Diaspora Registry</button>
              </div>
            )}
          </div>

          {/* SERVICES DROPDOWN MENU */}
          <div style={{ position: "relative" }}>
            <button onClick={() => toggleDropdown("services")} style={{ background: "none", border: "none", color: "#ffffff", fontSize: "15px", cursor: "pointer", padding: "8px 12px" }}>
              Services Hub {activeDropdown === "services" ? "▲" : "▼"}
            </button>
            {activeDropdown === "services" && (
              <div style={{ position: "absolute", top: "50px", right: 0, width: "240px", backgroundColor: "#ffffff", boxShadow: "0 10px 15px rgba(0,0,0,0.1)", padding: "8px 0", borderRadius: "8px", border: "1px solid #e2e8f0", zIndex: 1010 }}>
                <button onClick={() => navigateTo("/services/savings")} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "10px 20px", color: "#1e293b", cursor: "pointer", fontSize: "14px" }}>💼 Coop Savings</button>
                <button onClick={() => navigateTo("/services/send-money")} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "10px 20px", color: "#1e293b", cursor: "pointer", fontSize: "14px" }}>🏦 Send Money</button>
                <button onClick={() => navigateTo("/services/voip")} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "10px 20px", color: "#1e293b", cursor: "pointer", fontSize: "14px" }}>📞 VoIP Calling</button>
              </div>
            )}
          </div>

          {/* CONTACT / AUTH DROPDOWN MENU */}
          <div style={{ position: "relative" }}>
            <button onClick={() => toggleDropdown("contact")} style={{ background: "none", border: "none", color: "#ffffff", fontSize: "15px", cursor: "pointer", padding: "8px 12px" }}>
              Account Center {activeDropdown === "contact" ? "▲" : "▼"}
            </button>
            {activeDropdown === "contact" && (
              <div style={{ position: "absolute", top: "50px", right: 0, width: "200px", backgroundColor: "#ffffff", boxShadow: "0 10px 15px rgba(0,0,0,0.1)", padding: "8px 0", borderRadius: "8px", border: "1px solid #e2e8f0", zIndex: 1010 }}>
                <button onClick={() => navigateTo("/auth/login")} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "10px 20px", color: "#1e293b", cursor: "pointer", fontSize: "14px" }}>🔑 User Login</button>
                <button onClick={() => navigateTo("/auth/register")} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "10px 20px", color: "#1e293b", cursor: "pointer", fontSize: "14px" }}>➕ Create New User</button>
                <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "10px 20px", color: "#1e293b", cursor: "pointer", fontSize: "14px", borderTop: "1px solid #f1f5f9" }}>📍 Office Directory</button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
