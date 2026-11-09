"use client";
import React, { useState, useEffect } from "react";

export default function AdminConsoleDashboard() {
  const [members, setMembers] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load live database tables metrics on lifecycle mount
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

  // Dispatch live block/unblock requests to the moderation api core
  async function updateProfileStatus(email: string, status: string) {
    const confirmAction = confirm(`Are you sure you want to change status of ${email} to ${status}?`);
    if(!confirmAction) return;

    const res = await fetch("/api/admin/moderation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetEmail: email, newStatus: status })
    });
    const data = await res.json();
    alert(data.message || data.error);
    fetchEcosystemMetrics(); // Refresh data grids
  }

  if (loading) return <div style={{ padding: "40px", backgroundColor: "#0f172a", color: "#ffffff", height: "100vh", fontFamily: "sans-serif" }}>⚡ Gathering KiKa Security Telemetry Matrix...</div>;

  return (
    <div style={{ backgroundColor: "#0f172a", minHeight: "100vh", padding: "30px", color: "#ffffff", fontFamily: "sans-serif" }}>
      {/* HEADER COMMAND CAP AREA */}
      <div style={{ borderBottom: "1px solid #1e293b", paddingBottom: "20px", marginBottom: "30px" }}>
        <span style={{ fontSize: "11px", color: "#a855f7", fontWeight: "bold", fontFamily: "monospace" }}>[ PARENT GOVERNANCE MATRIX ]</span>
        <h1 style={{ margin: "4px 0 0 0", fontSize: "26px", fontWeight: "bold" }}>🌍 KiKa Ecosystem Admin Control Command Center</h1>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        
        {/* GRID SECTION 1: SYSTEM USER REGISTRY */}
        <section style={{ backgroundColor: "#1e293b", padding: "24px", borderRadius: "12px", border: "1px solid #334155" }}>
          <h2 style={{ margin: "0 0 16px 0", fontSize: "18px", color: "#38bdf8" }}>👤 Active Demographic User Accounts Ledger</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #334155", color: "#94a3b8" }}>
                  <th style={{ padding: "10px" }}>Full Name</th>
                  <th style={{ padding: "10px" }}>Email Box String</th>
                  <th style={{ padding: "10px" }}>Savings (SEK)</th>
                  <th style={{ padding: "10px" }}>Status</th>
                  <th style={{ padding: "10px", textAlign: "right" }}>Governance Action Override Controls</th>
                </tr>
              </thead>
              <tbody>
                {members.map((user: any) => (
                  <tr key={user.member_id} style={{ borderBottom: "1px solid #334155", backgroundColor: user.account_status === "BLOCKED" ? "#451a03" : "transparent" }}>
                    <td style={{ padding: "12px", fontWeight: "bold" }}>{user.full_name}</td>
                    <td style={{ padding: "12px", color: "#cbd5e1" }}>{user.email}</td>
                    <td style={{ padding: "12px", color: "#10b981", fontWeight: "bold" }}>{parseFloat(user.savings_balance_sek).toFixed(2)} SEK</td>
                    <td style={{ padding: "12px" }}>
                      <span style={{ padding: "3px 8px", borderRadius: "10px", fontSize: "11px", fontWeight: "bold", backgroundColor: user.account_status === "ACTIVE" ? "#064e3b" : "#7f1d1d", color: user.account_status === "ACTIVE" ? "#34d399" : "#fca5a5" }}>
                        {user.account_status}
                      </span>
                    </td>
                    <td style={{ padding: "12px", textAlign: "right" }}>
                      {user.account_status === "ACTIVE" ? (
                        <button onClick={() => updateProfileStatus(user.email, 'BLOCKED')} style={{ padding: "6px 12px", backgroundColor: "#dc2626", color: "#ffffff", border: "none", borderRadius: "6px", fontSize: "11px", fontWeight: "bold", cursor: "pointer" }}>🛑 Restrict & Block User</button>
                      ) : (
                        <button onClick={() => updateProfileStatus(user.email, 'ACTIVE')} style={{ padding: "6px 12px", backgroundColor: "#16a34a", color: "#ffffff", border: "none", borderRadius: "6px", fontSize: "11px", fontWeight: "bold", cursor: "pointer" }}>🔓 Reactivate Access</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* GRID SECTION 2: ACCESS AUDIT TRAILS */}
        <section style={{ backgroundColor: "#1e293b", padding: "24px", borderRadius: "12px", border: "1px solid #334155" }}>
          <h2 style={{ margin: "0 0 12px 0", fontSize: "18px", color: "#fbbf24" }}>🔒 Real-Time System Access Logs & Login Inspection</h2>
          <p style={{ margin: "0 0 16px 0", fontSize: "12px", color: "#94a3b8" }}>Dynamic telemetry capturing client entry metrics to prevent dictionary attacks or unauthorized intrusions.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontFamily: "monospace", fontSize: "12px" }}>
            {logs.length === 0 ? (
              <div style={{ color: "#64748b" }}>No connection events captured inside this system cycle trace yet.</div>
            ) : (
              logs.map((log: any) => (
                <div key={log.log_id} style={{ padding: "10px", backgroundColor: "#0f172a", borderRadius: "6px", border: "1px solid #334155", display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ color: log.event_type.includes("SUCCESS") ? "#4deeea" : "#ef4444" }}>[{log.event_type}]</span>
                    <span style={{ color: "#ffffff", marginLeft: "8px" }}>{log.user_email}</span>
                    <span style={{ color: "#64748b", marginLeft: "12px" }}>IP: {log.ip_address}</span>
                  </div>
                  <div style={{ color: "#94a3b8" }}>{new Date(log.timestamp).toLocaleString()}</div>
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
