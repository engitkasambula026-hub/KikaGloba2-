"use client";
import React, { useState, useEffect } from "react";

export default function AdminConsoleDashboard() {
  const [members, setMembers] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    async function verifyAndFetchEcosystemMetrics() {
      try {
        // 1. Fetch telemetry payload metrics natively from cloud database nodes
        const res = await fetch("/api/admin/moderation");
        const data = await res.json();
        
        if (data.success) {
          // 2. Scan active session metrics arrays to check the root admin identity status row
          const activeSessions = data.members || [];
          const adminProfile = activeSessions.find((m: any) => m.email === "engitkasambula026@gmail.com");

          if (adminProfile && adminProfile.account_status === "ACTIVE") {
            setMembers(data.members);
            setLogs(data.logs || []);
            setAuthorized(true);
          } else {
            setAuthorized(false);
          }
        } else {
          setAuthorized(false);
        }
      } catch (err) {
        console.error("Governance Telemetry Error Trace:", err);
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    }

    verifyAndFetchEcosystemMetrics();
  }, []);

  if (loading) return <div style={{ padding: "40px", backgroundColor: "#0f172a", color: "#ffffff", height: "100vh", fontFamily: "sans-serif" }}>⚡ Gathering KiKa Security Telemetry Matrix...</div>;

  // 🛡️ INLINE ACCESS BLOCK GATEWAY SHIELD
  if (authorized === false) {
    return (
      <div style={{ padding: "50px", backgroundColor: "#0f172a", color: "#ffffff", height: "100vh", textAlign: "center", fontFamily: "sans-serif" }}>
        <h2 style={{ color: "#ef4444" }}>🛑 ACCESS DENIED: Security Exception</h2>
        <p style={{ color: "#94a3b8" }}>Your digital signature does not possess Super-Admin governance permissions for the KiKa Core Matrix.</p>
        <a href="/" style={{ color: "#38bdf8", fontWeight: "bold", textDecoration: "none" }}>← Return to Public Corridor</a>
      </div>
    );
  }

  // Compute key account volume metrics dynamically from database sets
  const totalAccounts = members.length;
  const pendingClearance = members.filter(m => m.account_status === "PENDING_ADMIN_APPROVAL").length;

  return (
    <div style={{ backgroundColor: "#0f172a", minHeight: "100vh", padding: "30px", color: "#ffffff", fontFamily: "sans-serif" }}>
      
      {/* HEADER COMMAND CAP AREA */}
      <div style={{ borderBottom: "1px solid #1e293b", paddingBottom: "20px", marginBottom: "30px" }}>
        <span style={{ fontSize: "11px", color: "#a855f7", fontWeight: "bold", fontFamily: "monospace" }}>[ PARENT GOVERNANCE MATRIX ]</span>
        <h1 style={{ margin: "4px 0 0 0", fontSize: "26px", fontWeight: "bold" }}>🌍 KiKa Ecosystem Admin Control Command Center</h1>
      </div>

      {/* METRIC CARD SUMMARY ROW */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
        <div style={{ flex: 1, padding: "20px", backgroundColor: "#1e293b", borderRadius: "8px", border: "1px solid #334155" }}>
          <div style={{ fontSize: "12px", color: "#94a3b8" }}>Total Ecosystem Members Created</div>
          <div style={{ fontSize: "28px", fontWeight: "bold", color: "#ffffff", marginTop: "4px" }}>{totalAccounts} <span style={{ fontSize: "14px", fontWeight: "normal", color: "#64748b" }}>Registered Accounts</span></div>
        </div>
        <div style={{ flex: 1, padding: "20px", backgroundColor: "#1e293b", borderRadius: "8px", border: pendingClearance > 0 ? "1px solid #f59e0b" : "1px solid #334155" }}>
          <div style={{ fontSize: "12px", color: "#94a3b8" }}>Pending Administrative Review Gate</div>
          <div style={{ fontSize: "28px", fontWeight: "bold", color: pendingClearance > 0 ? "#f59e0b" : "#10b981", marginTop: "4px" }}>{pendingClearance} <span style={{ fontSize: "14px", fontWeight: "normal", color: "#64748b" }}>Requires Inspection</span></div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        
        {/* MEMBERSHIP DATA GRID */}
        <section style={{ backgroundColor: "#1e293b", padding: "24px", borderRadius: "12px", border: "1px solid #334155" }}>
          <h2 style={{ margin: "0 0 16px 0", fontSize: "18px", color: "#38bdf8" }}>👤 Demographic User Accounts Registry Ledger</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #334155", color: "#94a3b8" }}>
                  <th style={{ padding: "10px" }}>Full Name</th>
                  <th style={{ padding: "10px" }}>Email Box String</th>
                  <th style={{ padding: "10px" }}>Savings</th>
                  <th style={{ padding: "10px" }}>Account State</th>
                  <th style={{ padding: "10px", textAlign: "right" }}>Governance Action Override Controls</th>
                </tr>
              </thead>
              <tbody>
                {members.map((user: any) => (
                  <tr key={user.member_id} style={{ borderBottom: "1px solid #334155", backgroundColor: user.account_status.includes("PENDING") ? "#291b00" : "transparent" }}>
                    <td style={{ padding: "12px", fontWeight: "bold" }}>{user.full_name}</td>
                    <td style={{ padding: "12px", color: "#cbd5e1" }}>{user.email}</td>
                    <td style={{ padding: "12px", color: "#10b981", fontWeight: "bold" }}>{parseFloat(user.savings_balance_sek).toFixed(2)} SEK</td>
                    <td style={{ padding: "12px" }}>
                      <span style={{ 
                        padding: "4px 8px", 
                        borderRadius: "10px", 
                        fontSize: "11px", 
                        fontWeight: "bold", 
                        backgroundColor: user.account_status === "ACTIVE" ? "#064e3b" : user.account_status.includes("PENDING") ? "#78350f" : "#7f1d1d", 
                        color: user.account_status === "ACTIVE" ? "#34d399" : user.account_status.includes("PENDING") ? "#fcd34d" : "#fca5a5" 
                      }}>
                        {user.account_status}
                      </span>
                    </td>
                    <td style={{ padding: "12px", textAlign: "right" }}>
                      {user.account_status !== "ACTIVE" && (
                        <button onClick={async () => {
                          const confirmAction = confirm(`Execute governance status switch to ACTIVE for ${user.full_name}?`);
                          if(!confirmAction) return;
                          const res = await fetch("/api/admin/moderation", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ targetEmail: user.email, newStatus: "ACTIVE", targetName: user.full_name })
                          });
                          const data = await res.json();
                          alert(data.message || data.error);
                          window.location.reload();
                        }} style={{ padding: "6px 12px", backgroundColor: "#16a34a", color: "#ffffff", border: "none", borderRadius: "6px", fontSize: "11px", fontWeight: "bold", cursor: "pointer", marginRight: "6px" }}>🔓 Approve & Trigger Email</button>
                      )}
                      {user.account_status !== "BLOCKED" && user.email !== "engitkasambula026@gmail.com" && (
                        <button onClick={async () => {
                          const confirmAction = confirm(`Execute governance status switch to BLOCKED for ${user.full_name}?`);
                          if(!confirmAction) return;
                          const res = await fetch("/api/admin/moderation", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ targetEmail: user.email, newStatus: "BLOCKED", targetName: user.full_name })
                          });
                          const data = await res.json();
                          alert(data.message || data.error);
                          window.location.reload();
                        }} style={{ padding: "6px 12px", backgroundColor: "#dc2626", color: "#ffffff", border: "none", borderRadius: "6px", fontSize: "11px", fontWeight: "bold", cursor: "pointer" }}>🛑 Block</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {/* ENHANCED LIVE ACCESS TELEMETRY INSIGHTS PANEL */}
        <section style={{ backgroundColor: "#1e293b", padding: "24px", borderRadius: "12px", border: "1px solid #334155" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h2 style={{ margin: "0", fontSize: "18px", color: "#fbbf24" }}>🔒 Real-Time System Access Logs & Login Inspection</h2>
              <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#94a3b8" }}>Auditing active connection sessions, device footprints, and origin IP maps across the corridor.</p>
            </div>
            <button onClick={() => window.location.reload()} style={{ padding: "6px 12px", backgroundColor: "#334155", color: "#ffffff", border: "1px solid #475569", borderRadius: "6px", fontSize: "11px", cursor: "pointer", fontWeight: "bold" }}>🔄 Refresh Telemetry</button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #334155", color: "#94a3b8" }}>
                  <th style={{ padding: "10px" }}>Connection Timestamp</th>
                  <th style={{ padding: "10px" }}>User Email Account</th>
                  <th style={{ padding: "10px" }}>Auth Event Type</th>
                  <th style={{ padding: "10px" }}>Network IP Location</th>
                  <th style={{ padding: "10px" }}>Device Platform</th>
                  <th style={{ padding: "10px", textAlign: "right" }}>Status Signature</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: "20px", color: "#64748b", textAlign: "center" }}>No active user logs detected inside this environment tracking window yet.</td>
                  </tr>
                ) : (
                  logs.map((log: any) => (
                    <tr key={log.log_id} style={{ borderBottom: "1px solid #334155", backgroundColor: log.event_type.includes("FAILED") ? "#451a03" : "transparent" }}>
                      <td style={{ padding: "12px", color: "#94a3b8", fontFamily: "monospace" }}>{new Date(log.timestamp).toLocaleString()}</td>
                      <td style={{ padding: "12px", fontWeight: "bold", color: "#ffffff" }}>{log.user_email}</td>
                      <td style={{ padding: "12px" }}>
                        <span style={{ fontFamily: "monospace", color: log.event_type.includes("SUCCESS") ? "#34d399" : log.event_type.includes("FAILED") ? "#f87171" : "#a855f7" }}>
                          {log.event_type}
                        </span>
                      </td>
                      <td style={{ padding: "12px", color: "#38bdf8", fontFamily: "monospace" }}>{log.ip_address || "0.0.0.0"}</td>
                      <td style={{ padding: "12px", color: "#cbd5e1" }}>
                        <span style={{ fontSize: "11px", backgroundColor: "#0f172a", padding: "4px 8px", borderRadius: "4px", border: "1px solid #1e293b" }}>
                          💻 {log.device_type || "Desktop"} ({log.platform_browser || "Chrome"})
                        </span>
                      </td>
                      <td style={{ padding: "12px", textAlign: "right" }}>
                        <span style={{ color: log.event_type.includes("SUCCESS") ? "#10b981" : "#f59e0b", fontWeight: "bold" }}>
                          {log.event_type.includes("SUCCESS") ? "✓ Secure Session" : "⚠️ Audit Review"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}
