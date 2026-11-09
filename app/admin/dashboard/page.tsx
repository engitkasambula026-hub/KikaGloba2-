"use client";
import React, { useState, useEffect } from "react";

export default function AdminConsoleDashboard() {
  const [members, setMembers] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchEcosystemMetrics() {
    try {
      const res = await fetch("/api/admin/moderation");
      const data = await res.json();
      if(data.success) {
        setMembers(data.members);
        setLogs(data.logs);
      }
    } catch (err) {
      console.error("Failed loading data matrix rows", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEcosystemMetrics();
  }, []);

  async function handleStatusChange(email: string, name: string, status: string) {
    const confirmAction = confirm(`Execute governance status switch to ${status} for ${name}?`);
    if(!confirmAction) return;

    const res = await fetch("/api/admin/moderation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetEmail: email, newStatus: status, targetName: name })
    });
    const data = await res.json();
    alert(data.message || data.error);
    fetchEcosystemMetrics();
  }

  if (loading) return <div style={{ padding: "40px", backgroundColor: "#0f172a", color: "#ffffff", height: "100vh", fontFamily: "sans-serif" }}>⚡ Gathering KiKa Security Telemetry Matrix...</div>;

  // Compute key account volume metrics dynamically
  const totalAccounts = members.length;
  const pendingClearance = members.filter(m => m.account_status === "PENDING_ADMIN_APPROVAL").length;
  // Add this block inside your component right before the return statement:
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  useEffect(() => {
    // Pull the active email from local browser session memory slots
    const storedEmail = localStorage.getItem("kika_user_email") || sessionStorage.getItem("kika_user_email");
    setAdminEmail(storedEmail);
  }, []);

  // Hard governance lock check
  if (adminEmail !== "engitkasambula026@gmail.com") {
    return (
      <div style={{ padding: "50px", backgroundColor: "#0f172a", color: "#ffffff", height: "100vh", textAlign: "center", fontFamily: "sans-serif" }}>
        <h2 style={{ color: "#ef4444" }}>🛑 ACCESS DENIED: Security Exception</h2>
        <p style={{ color: "#94a3b8" }}>Your digital signature does not possess Super-Admin governance permissions for the KiKa Core Matrix.</p>
        <a href="/" style={{ color: "#38bdf8", fontWeight: "bold", textDecoration: "none" }}>← Return to Public Corridor</a>
      </div>
    );
  }

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
                        <button onClick={() => handleStatusChange(user.email, user.full_name, 'ACTIVE')} style={{ padding: "6px 12px", backgroundColor: "#16a34a", color: "#ffffff", border: "none", borderRadius: "6px", fontSize: "11px", fontWeight: "bold", cursor: "pointer", marginRight: "6px" }}>🔓 Approve & Trigger Email</button>
                      )}
                      {user.account_status !== "BLOCKED" && user.email !== "engitkasambula026@gmail.com" && (
                        <button onClick={() => handleStatusChange(user.email, user.full_name, 'BLOCKED')} style={{ padding: "6px 12px", backgroundColor: "#dc2626", color: "#ffffff", border: "none", borderRadius: "6px", fontSize: "11px", fontWeight: "bold", cursor: "pointer" }}>🛑 Block</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* LOG SECTION */}
        <section style={{ backgroundColor: "#1e293b", padding: "24px", borderRadius: "12px", border: "1px solid #334155" }}>
          <h2 style={{ margin: "0 0 12px 0", fontSize: "18px", color: "#fbbf24" }}>🔒 Real-Time System Access Logs & Login Inspection</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontFamily: "monospace", fontSize: "12px" }}>
            {logs.map((log: any) => (
              <div key={log.log_id} style={{ padding: "10px", backgroundColor: "#0f172a", borderRadius: "6px", border: "1px solid #334155", display: "flex", justifyContent: "space-between" }}>
                <div>
                  <span style={{ color: log.event_type.includes("ACTIVE") ? "#34d399" : "#ef4444" }}>[{log.event_type}]</span>
                  <span style={{ color: "#ffffff", marginLeft: "8px" }}>{log.user_email}</span>
                </div>
                <div style={{ color: "#94a3b8" }}>{new Date(log.timestamp).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
