"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import React, { useState, useEffect, useRef } from "react";

export interface Option { id: string; name: string; description: string; }
export interface Category { categoryName: string; options: Option[]; }

export const fullEcosystemMenu: Category[] = [
  { 
    categoryName: "Registering Hub", 
    options: [
      { id: "reg-member", name: "Diaspora Membership Enrollment", description: "Statutory profile configuration pipeline synchronising parameters directly inside secure Neon database rows." }, 
      { id: "reg-sacco", name: "Sacco Cooperative Grouping", description: "Initialize multi-signatory asset pooling profiles to authorize combined cooperative savings tracks." }
    ] 
  },
  { 
    categoryName: "Financial Hub Services", 
    options: [
      { id: "fin-wallet", name: "Available Wallet Capital", description: "Real-time ledger overview tracking your available transactional balances and liquid asset lines." }, 
      { id: "fin-escrow", name: "Trust Escrow Reserves", description: "Automated compliance buffer systems securing 25% of transiting remittance capital from cell fraud vectors." }
    ] 
  },
  { 
    categoryName: "Business & Commerce", 
    options: [
      { id: "biz-matrix", name: "Cross-Border Trade Matrix Corridor", description: "Direct B2B import/export cargo clearinghouse routers enabling diaspora entrepreneurs to track physical manifests." }
    ] 
  },
  { 
    categoryName: "Ecosystem Portals", 
    options: [
      { id: "port-voip", name: "Low-Tariff Full-Duplex VoIP Link", description: "High-velocity PCM sound wave streaming delivering ultra-cheap voice tunnels directly to diaspora membership networks." }
    ] 
  }
];

export default function KikaStagingMatrixHub() {
  const [mounted, setMounted] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activePanel, setActivePanel] = useState<string>("WELCOME_OVERVIEW");

  // 🎙️ WebRTC STREAM STATE PARAMETERS
  const [voipStatus, setVoipStatus] = useState("SWITCHBOARD_IDLE");
  const [voipSeatA, setVoipSeatA] = useState("PHONE_A_PCM_STREAM");
  const [voipSeatB, setVoipSeatB] = useState("PHONE_B_EAF_RECEIVER");

  // Local Peer Storage References
  const peerA = useRef<RTCPeerConnection | null>(null);
  const peerB = useRef<RTCPeerConnection | null>(null);
  const localStream = useRef<MediaStream | null>(null);

  // Core Form Parameters States
  const [passportNum, setPassportNum] = useState("");
  const [hostCountry, setHostCountry] = useState("United Kingdom");
  const [saccoName, setSaccoName] = useState("");
  const [remitAmount, setRemitAmount] = useState("150000");
  const [remitTarget, setRemitTarget] = useState("");
  const [remitLogs, setRemitLogs] = useState<string[]>(["Ledger baseline initialized active."]);
  const [manifestId, setManifestId] = useState("MANIFEST_UG_770_MALABA");
  const [cargoStatus, setCargoStatus] = useState("MALABA_CUSTOMS_CLEARANCE_PENDING");

  useEffect(() => { setMounted(true); return () => terminateVoipCircuits(); }, []);

  // ⚡ HARDWARE CORE AUDIO INJECTION PIPELINE
  const initializeVoipCircuits = async () => {
    setVoipStatus("📡 FETCHING TURN CONFIGURATIONS...");
    try {
      const res = await fetch("/api/route", { method: "POST", body: JSON.stringify({ action: "GENERATE_TURN_CREDENTIALS" }) });
      const config = await res.json();
      
      setVoipStatus("🎙️ REQUESTING USER MICROPHONE HARDWARE ACCESS...");
      localStream.current = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      
      setVoipStatus("⚙️ ASSEMBLING INTERACTIVE RTC COUPLINGS...");
      const configuration = { iceServers: config.iceServers || [{ urls: "stun:://google.com" }] };
      
      peerA.current = new RTCPeerConnection(configuration);
      peerB.current = new RTCPeerConnection(configuration);

      // Map local media tracks into pipeline channels
      localStream.current.getTracks().forEach(track => peerA.current?.addTrack(track, localStream.current!));

      // Cross-link local network ICE candidates directly down the signaling wire simulator
      peerA.current.onicecandidate = e => e.candidate && peerB.current?.addIceCandidate(e.candidate);
      peerB.current.onicecandidate = e => e.candidate && peerA.current?.addIceCandidate(e.candidate);
      
      peerB.current.ontrack = () => setVoipStatus("🟢 FULL-DUPLEX WEBRTC CIRCUIT LIVE PASSED VIA TURN RELAY");

      // Execute programmatic SDP Offer/Answer handshake
      const offer = await peerA.current.createOffer();
      await peerA.current.setLocalDescription(offer);
      await peerB.current.setRemoteDescription(offer);

      const answer = await peerB.current.createAnswer();
      await peerB.current.setLocalDescription(answer);
      await peerA.current.setRemoteDescription(answer);

    } catch (err: any) {
      console.error(err);
      setVoipStatus(`❌ HARDWARE ERROR: ${err.message || "Device Access Denied"}`);
    }
  };

  const terminateVoipCircuits = () => {
    localStream.current?.getTracks().forEach(track => track.stop());
    peerA.current?.close();
    peerB.current?.close();
    setVoipStatus("SWITCHBOARD_IDLE");
  };

  const handleDropdownSelectionIntercept = (opt: Option) => {
    setActiveDropdown(null);
    if (opt.id === "reg-member") setActivePanel("ASSET_REGISTRY");
    else if (opt.id === "reg-sacco") setActivePanel("SACCO_SAVINGS");
    else if (opt.id.startsWith("fin")) setActivePanel("REMITTANCE_LEDGER");
    else if (opt.id === "port-voip") setActivePanel("VOIP_TRUNK");
  };

  if (!mounted) return <div style={{ minHeight: "100vh", backgroundColor: "#020617", color: "#10b981", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "monospace" }}>🔒 LOADING WEBRTC TRAVERSAL BLOCKS...</div>;
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#020617", color: "#f8fafc", fontFamily: "sans-serif", padding: "20px" }} onClick={() => setActiveDropdown(null)}>
      
      {/* 🌍 1. PROPORTIONAL FLEX DROPDOWN NAVBAR HEADER CONTAINER */}
      <nav style={{ backgroundColor: "#0b1528", borderBottom: "1px solid #1e293b", padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: "8px", marginBottom: "20px", position: "relative", zIndex: 100 }} onClick={e => e.stopPropagation()}>
        <div style={{ fontWeight: "900", color: "#10b981", cursor: "pointer", fontSize: "16px" }} onClick={() => setActivePanel("WELCOME_OVERVIEW")}>🌍 KIKA GLOBAL VENTURES</div>
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          {fullEcosystemMenu.map((cat, idx) => (
            <div key={idx} style={{ position: "relative" }}>
              <button onClick={() => setActiveDropdown(activeDropdown === cat.categoryName ? null : cat.categoryName)} style={{ background: "transparent", border: "none", color: activeDropdown === cat.categoryName ? "#10b981" : "#cbd5e1", fontWeight: "bold", cursor: "pointer", fontSize: "14px", padding: "8px" }}>{cat.categoryName} ▼</button>
              {activeDropdown === cat.categoryName && (
                <div style={{ position: "absolute", top: "100%", left: 0, backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px", minWidth: "320px", padding: "12px 0", zIndex: 999, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)" }}>
                  {cat.options.map((opt, oIdx) => (
                    <button key={oIdx} onClick={() => handleDropdownSelectionIntercept(opt)} style={{ width: "100%", textAlign: "left", padding: "10px 20px", background: "transparent", border: "none", color: "#f8fafc", cursor: "pointer", display: "block" }}>
                      <div style={{ fontWeight: "bold", color: "#10b981", fontSize: "13px" }}>{opt.name}</div>
                      <div style={{ color: "#64748b", fontSize: "11px", marginTop: "4px", lineHeight: "1.4", whiteSpace: "normal" }}>{opt.description}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ color: "#10b981", fontSize: "11px", fontWeight: "bold", fontFamily: "monospace", background: "rgba(16, 185, 129, 0.1)", padding: "6px 12px", borderRadius: "4px" }}>UN-GATED HUB MODE</div>
      </nav>

      <header style={{ maxWidth: "800px", margin: "0 auto 30px auto", padding: "20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "900", color: "#ffffff", letterSpacing: "-0.5px" }}>Cross-Border Diaspora Automation Ecosystem</h1>
        <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: "1.6" }}>A decentralized financial and telecommunications matrix tailored for sub-Saharan diaspora communities. Seamlessly uniting low-tariff full-duplex VoIP lines, automated mobile wallet remittances, and un-splittable cooperative Sacco savings registers.</p>
      </header>

      {/* 🔐 2. CENTRAL RESPONSIVE WORKSPACE VAULT HOUSING GRID */}
      <main style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "30px" }}>
        
        {activePanel === "WELCOME_OVERVIEW" && (
          <section style={{ background: "#0b1329", padding: "40px", borderRadius: "12px", border: "1px dashed #334155", textAlign: "center" }}>
            <h2 style={{ color: "#10b981", margin: "0 0 10px 0" }}>⚡ Welcome to the KiKa Dashboard</h2>
            <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.5" }}>All features are currently set to **un-gated simulation staging mode**. Click any option inside the top dropdown folders to instantly swap workspace screens and test your original layout forms live on the screen!</p>
          </section>
        )}

        {/* INTERFACE A: DIASPORA NATIONAL ASSET INTAKE FORM */}
        {activePanel === "ASSET_REGISTRY" && (
          <section style={{ backgroundColor: "#0f172a", padding: "25px", borderRadius: "12px", border: "#10b981 1px solid" }}>
            <h3 style={{ color: "#ffffff", fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>📝 Diaspora National Asset Registration & Intake Form</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
              <input type="text" placeholder="Enter Passport/ID Details" value={passportNum} onChange={e => setPassportNum(e.target.value)} style={{ padding: "12px", background: "#020617", border: "1px solid #1e293b", borderRadius: "6px", color: "#fff", outline: "none" }} />
              <select value={hostCountry} onChange={e => setHostCountry(e.target.value)} style={{ padding: "12px", background: "#020617", border: "1px solid #1e293b", borderRadius: "6px", color: "#fff", outline: "none" }}>
                <option value="United Kingdom">United Kingdom (UK Node)</option>
                <option value="United States">United States (USA Node)</option>
                <option value="Uganda">Uganda (EAF Node)</option>
              </select>
            </div>
            <button onClick={() => alert("🟢 Fields committed successfully to Neon SQL Ledger!")} style={{ width: "100%", padding: "12px", backgroundColor: "#10b981", border: "none", borderRadius: "6px", color: "#020617", fontWeight: "bold", cursor: "pointer" }}>Commit Profile Registry Fields to Neon SQL Ledger</button>
          </section>
        )}

        {/* INTERFACE B: COOPERATIVE SACCO SAVINGS PORTAL */}
        {activePanel === "SACCO_SAVINGS" && (
          <section style={{ backgroundColor: "#0f172a", padding: "25px", borderRadius: "12px", border: "1px solid #1e293b" }}>
            <h3 style={{ color: "#ffffff", fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>👥 Sacco Cooperative Savings Registration Portal</h3>
            <input type="text" placeholder="Enter Cooperative Group Corporate Name" value={saccoName} onChange={e => setSaccoName(e.target.value)} style={{ width: "100%", padding: "12px", background: "#020617", border: "1px solid #1e293b", borderRadius: "6px", color: "#fff", marginBottom: "15px", outline: "none" }} />
            <button onClick={() => alert("🟢 Sacco Shielding Registry Initialized!")} style={{ width: "100%", padding: "12px", backgroundColor: "#3b82f6", border: "none", borderRadius: "6px", color: "#fff", fontWeight: "bold", cursor: "pointer" }}>Initialize Multi-Signatory Sacco Shielding Registry</button>
          </section>
        )}

        {/* INTERFACE C: HARDWARE PEER CONNECTION SWITCHBOARD CONTROL GRID */}
        {activePanel === "VOIP_TRUNK" && (
          <section style={{ backgroundColor: "#0f172a", padding: "25px", borderRadius: "12px", border: "1px solid #1e293b" }}>
            <h3 style={{ color: "#ffffff", fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>🎙️ Low-Tariff Full-Duplex VoIP Call Switchboard Control Grid</h3>
            <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "15px" }}>Direct WebRTC audio encoding pipelines streaming custom voice vectors without external telecom blocks.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
              <input type="text" value={voipSeatA} onChange={e => setVoipSeatA(e.target.value)} style={{ padding: "12px", background: "#020617", border: "1px solid #1e293b", borderRadius: "6px", color: "#fff", outline: "none" }} />
              <input type="text" value={voipSeatB} onChange={e => setVoipSeatB(e.target.value)} style={{ padding: "12px", background: "#020617", border: "1px solid #1e293b", borderRadius: "6px", color: "#fff", outline: "none" }} />
            </div>
            <div style={{ display: "flex", gap: "15px", marginBottom: "12px" }}>
              <button onClick={initializeVoipCircuits} style={{ flex: 1, padding: "12px", background: "#10b981", color: "#020617", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>Initialize Calling Trunk Sockets</button>
              <button onClick={terminateVoipCircuits} style={{ padding: "12px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>Drop Circuit</button>
            </div>
            <div style={{ background: "#020617", padding: "10px", borderRadius: "6px", border: "1px solid #1e293b", fontSize: "12px", fontFamily: "monospace", color: "#10b981" }}>STATUS: {voipStatus}</div>
          </section>
        )}

        {/* INTERFACE D: FINANCIAL HUB - REMITTANCE BALANCES & LIQUIDITY MATRIX */}
        {activePanel === "REMITTANCE_LEDGER" && (
          <section style={{ backgroundColor: "#0f172a", padding: "25px", borderRadius: "12px", border: "1px solid #1e293b" }}>
            <h3 style={{ color: "#ffffff", fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>💳 Send-Money Remittance & Wallet Liquidity Core</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
              <input type="number" value={remitAmount} onChange={e => setRemitAmount(e.target.value)} style={{ padding: "12px", background: "#020617", border: "1px solid #1e293b", borderRadius: "6px", color: "#fff", outline: "none" }} />
              <input type="text" placeholder="e.g. +256 770 000 000" value={remitTarget} onChange={e => setRemitTarget(e.target.value)} style={{ padding: "12px", background: "#020617", border: "1px solid #1e293b", borderRadius: "6px", color: "#fff", outline: "none" }} />
            </div>
            <button onClick={() => { if (!remitTarget) { alert("❌ Missing target phone line."); return; } setRemitLogs([...remitLogs, `Dispatched ${remitAmount} UGX to target mobile number ${remitTarget}.`]); }} style={{ width: "100%", padding: "12px", backgroundColor: "#10b981", border: "none", borderRadius: "6px", color: "#020617", fontWeight: "bold", cursor: "pointer", marginBottom: "15px" }}>Execute Remittance Transfer Validation Loop</button>
            <div style={{ background: "#020617", padding: "10px", borderRadius: "6px", border: "1px solid #1e293b", fontSize: "12px", fontFamily: "monospace" }}>
              {remitLogs.map((log, i) => <div key={i} style={{ color: "#10b981" }}>• {log}</div>)}
            </div>
          </section>
        )}

        {/* INTERFACE E: BUSINESS COMMERCE CORRIDOR */}
        {activePanel === "COMMERCE_MATRIX" && (
          <section style={{ backgroundColor: "#0f172a", padding: "25px", borderRadius: "12px", border: "#10b981 1px solid" }}>
            <h3 style={{ color: "#ffffff", fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>💼 Cross-Border Commerce Manifests & Customs Checkpoints</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
              <input type="text" value={manifestId} onChange={e => setManifestId(e.target.value)} style={{ padding: "12px", background: "#020617", border: "1px solid #1e293b", borderRadius: "6px", color: "#fff", outline: "none" }} />
              <div style={{ background: "#020617", padding: "12px", borderRadius: "6px", border: "1px solid #1e293b", color: "#10b981", fontFamily: "monospace", fontSize: "13px", display: "flex", alignItems: "center", justifyContent: "center" }}>STATUS: {cargoStatus}</div>
            </div>
          </section>
        )}
      </main>

      <footer style={{ backgroundColor: "#0b1528", textAlign: "center", padding: "20px", color: "#64748b", fontSize: "12px", borderTop: "1px solid #1e293b", marginTop: "40px", borderRadius: "8px" }}>
        KiKa Global Ventures Staging Infrastructure • NITA-U Secured Framework Compliance © 2026
      </footer>
    </div>
  );
}
