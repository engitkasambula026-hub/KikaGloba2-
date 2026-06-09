"use client";

import React from "react";

interface TabsProps {
  activeTab: string;
  member: any;
  phoneNumber: string;
  setPhoneNumber: (val: string | ((prev: string) => string)) => void;
  callActive: boolean;
  callStatus: string;
  timer: number;
  handleKeypressValue: (digit: string) => void;
  startCall: () => void;
  terminateCall: () => void;
}

export default function DialerTabs({
  activeTab,
  member,
  phoneNumber,
  setPhoneNumber,
  callActive,
  callStatus,
  timer,
  handleKeypressValue,
  startCall,
  terminateCall
}: TabsProps) {
  
  // ==========================================
  // 1. DIALER KEYPAD LOGIC VIEW PANEL
  // ==========================================
  if (activeTab === "dialer") {
    return (
      <div>
        <div style={{ backgroundColor: "#0f172a", padding: "15px", borderRadius: "8px", textAlign: "center", marginBottom: "15px" }}>
          <div style={{ fontSize: "26px", fontWeight: "bold", minHeight: "32px", color: callActive ? "#4ade80" : "#ffffff", letterSpacing: "1px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {phoneNumber || (callActive ? "CONNECTED" : "Enter Target Vector")}
          </div>
          <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>
            Status: {callStatus} {callActive && `[${Math.floor(timer / 60)}m ${timer % 60}s]`}
          </div>
        </div>
        
        {/* Balanced Grid Configuration for Keypad Buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", margin: "0 auto 15px auto", maxWidth: "220px", justifyItems: "center" }}>
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((btn) => (
            <button 
              key={btn} 
              type="button" 
              disabled={callActive} 
              onClick={() => handleKeypressValue(btn)} 
              style={{ 
                width: "50px",
                height: "50px",
                lineHeight: "50px",
                backgroundColor: "#334155", 
                color: "#ffffff", 
                borderRadius: "50%", 
                fontSize: "18px", 
                fontWeight: "bold", 
                cursor: callActive ? "not-allowed" : "pointer", 
                border: "none", 
                outline: "none",
                padding: 0,
                display: "block",
                textAlign: "center"
              }}
            >
              {btn}
            </button>
          ))}
        </div>
        
        {!callActive && phoneNumber && (
          <button onClick={() => setPhoneNumber(prev => typeof prev === "string" ? prev.slice(0, -1) : "")} style={{ width: "100%", backgroundColor: "transparent", color: "#94a3b8", border: "none", cursor: "pointer", fontSize: "11px", marginBottom: "15px", fontWeight: "bold" }}>⌫ ERASE LAST DIGIT</button>
        )}
        
        {!callActive ? (
          <button onClick={startCall} disabled={!phoneNumber} style={{ width: "100%", padding: "14px", backgroundColor: phoneNumber ? "#16a34a" : "#475569", color: "#ffffff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: phoneNumber ? "pointer" : "not-allowed" }}>📞 Initialize Call</button>
        ) : (
          <button onClick={terminateCall} style={{ width: "100%", padding: "14px", backgroundColor: "#dc2626", color: "#ffffff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>🛑 Hang Up Line</button>
        )}
      </div>
    );
  }

  // ==========================================
  // 2. CONTACTS DIRECTORY LAYOUT VIEW PANEL
  // ==========================================
  if (activeTab === "contacts") {
    const activeContactsList = member?.contacts || [];
    
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "250px", overflowY: "auto", paddingRight: "4px" }}>
        {activeContactsList.length === 0 ? (
          <div style={{ color: "#64748b", textAlign: "center", fontSize: "12px", padding: "20px" }}>No registered platform contacts found.</div>
        ) : (
          activeContactsList.map((contact: any, i: number) => (
            <div key={i} style={{ backgroundColor: "#0f172a", padding: "10px 12px", borderRadius: "6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "13px", fontWeight: "bold", color: "#ffffff" }}>{contact.name}</div>
                <div style={{ fontSize: "11px", color: "#64748b", fontFamily: "monospace" }}>{contact.phone || contact.phoneNumber}</div>
              </div>
              <button onClick={() => setPhoneNumber(contact.phone || contact.phoneNumber)} style={{ backgroundColor: "#334155", color: "#38bdf8", border: "none", borderRadius: "4px", padding: "6px 10px", fontSize: "11px", fontWeight: "bold", cursor: "pointer" }}>
                📱 {contact.network || "NODE"}
              </button>
            </div>
          ))
        )}
      </div>
    );
  }

  // ==========================================
  // 3. VOICE HISTORY ACCOUNT LEDGER TRANSACTIONS
  // ==========================================
  if (activeTab === "history") {
    // Hybrid Mapping: Supports both raw mock log layouts and dynamic Prisma relation names (callLogs)
    const activeHistoryLogs = member?.logs || member?.callLogs || [];
    
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "250px", overflowY: "auto", paddingRight: "4px" }}>
        {activeHistoryLogs.length === 0 ? (
          <div style={{ color: "#64748b", textAlign: "center", fontSize: "12px", padding: "20px" }}>No historical ledger records found.</div>
        ) : (
          activeHistoryLogs.map((log: any, i: number) => (
            <div key={i} style={{ backgroundColor: "#0f172a", padding: "10px 12px", borderRadius: "6px", fontSize: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8", marginBottom: "4px" }}>
                <span>{log.date}</span>
                <span style={{ color: "#ef4444", fontWeight: "bold" }}>-{log.cost}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#ffffff" }}>
                <span style={{ fontFamily: "monospace" }}>{log.destination}</span>
                <span style={{ color: "#64748b" }}>Duration: {log.duration}</span>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }

  return null;
}
