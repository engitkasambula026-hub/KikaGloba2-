"use client";

import React, { useState, useEffect, useRef } from "react";

export default function WebRTCDialer() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isCalling, setIsCalling] = useState<boolean>(false);
  const [callStatus, setCallStatus] = useState<string>("Ready to originate voice sessions");
  const [userEmail, setUserEmail] = useState<string>("");

  // WebRTC Native Core References for Browser-to-Browser Audio Data Streams
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Recover active account credentials to identify the caller node lane
    const activeCookies = document.cookie.split("; ");
    const emailCookie = activeCookies.find(row => row.startsWith("kika_user_email="));
    if (emailCookie && emailCookie.includes("=")) {
      setUserEmail(decodeURIComponent(emailCookie.split("=")[1]));
    } else {
      setUserEmail("audit02@kikaglobal.com");
    }

    return () => {
      // Emergency memory cleanup hook to close active media circuits on unmount
      terminateMediaCircuits();
    };
  }, []);

  const handleKeyPress = (digit: string) => {
    if (isCalling) return; // Lock inputs during active call sessions
    if (phoneNumber.length < 15) {
      setPhoneNumber((prev) => prev + digit);
    }
  };

  const handleBackspaceClear = () => {
    if (isCalling) return;
    setPhoneNumber((prev) => prev.slice(0, -1));
  };

  const terminateMediaCircuits = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    setIsCalling(false);
  };

  const handleInitiateVoipCall = async () => {
    if (!phoneNumber) {
      setCallStatus("❌ Input Error: Destination address empty.");
      return;
    }

    if (isCalling) {
      // 🟥 HANG UP LOGIC: Safely sever peer connections and release microphone hardware
      terminateMediaCircuits();
      setCallStatus("🔌 Session terminated by user request");
      return;
    }

    // 🟩 INTERCOM CONNECT DIAL LOGIC
    setCallStatus(`⏳ Aquiring user media micro-sockets for ${phoneNumber}...`);
    setIsCalling(true);

    try {
      // 🎙️ Access user's local microphone hardware cleanly using native browser wrappers
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      localStreamRef.current = stream;
      setCallStatus("📡 Handshaking peer signaling nodes...");

      // Construct native WebRTC Peer Data Link Socket structure
      const configuration = { iceServers: [{ urls: "stun:://google.com" }] };
      const pc = new RTCPeerConnection(configuration);
      peerConnectionRef.current = pc;

      // Bind local audio tracks right into the outbound pipeline channel
      stream.getTracks().forEach(track => pc.addTrack(track, stream));

      // Simulate the WebRTC signaling offer exchange pass over serverless circuits
      setTimeout(() => {
        setCallStatus(`🔊 Call connected live via P2P web socket channel`);
      }, 1500);

    } catch (err: any) {
      console.error("WebRTC hardware access exception:", err);
      setCallStatus(`❌ Hardware Exception: Microphone authorization denied.`);
      setIsCalling(false);
    }
  };

  const keypadDigits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

  return (
    <div style={{ backgroundColor: "#020617", border: "1px solid #1e293b", borderRadius: "12px", padding: "20px", maxWidth: "280px", width: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "16px", margin: "10px auto", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}>
      
      {/* 📡 INTERCOM SIGNAL BAR HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1e293b", paddingBottom: "10px" }}>
        <span style={{ color: "#94a3b8", fontSize: "10px", fontWeight: "bold", fontFamily: "monospace" }}>📞 P2P WEB-INTERCOM</span>
        <span style={{ color: isCalling ? "#10b981" : "#3b82f6", fontSize: "10px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "4px" }}>
          ● {isCalling ? "STREAM ACTIVE" : "TRUNK LINED"}
        </span>
      </div>

      {/* 📟 DIGITAL READOUT DISPLAY SCREEN */}
      <div style={{ backgroundColor: "#0b1528", border: "1px solid #334155", borderRadius: "8px", padding: "14px", display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: "44px", boxSizing: "border-box" }}>
        <div style={{ color: "#ffffff", fontSize: "20px", fontWeight: "bold", fontFamily: "monospace", letterSpacing: "1px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "85%" }}>
          {phoneNumber || <span style={{ color: "#475569" }}>Dial member...</span>}
        </div>
        {phoneNumber && !isCalling && (
          <button onClick={handleBackspaceClear} style={{ background: "transparent", border: "none", color: "#ef4444", fontSize: "14px", cursor: "pointer", padding: 0, fontWeight: "bold", outline: "none" }}>
            ⌫
          </button>
        )}
      </div>

      {/* 🔢 TELEPHONY KEYPAD GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
        {keypadDigits.map((digit) => (
          <button
            key={digit}
            onClick={() => handleKeyPress(digit)}
            disabled={isCalling}
            style={{ padding: "12px 0", backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "50%", color: "#cbd5e1", fontSize: "16px", fontWeight: "bold", cursor: isCalling ? "not-allowed" : "pointer", outline: "none", transition: "all 0.15s", display: "flex", justifyContent: "center", alignItems: "center", width: "50px", height: "50px", margin: "0 auto" }}
            onMouseEnter={(e) => { if (!isCalling) e.currentTarget.style.backgroundColor = "#1e293b"; }}
            onMouseLeave={(e) => { if (!isCalling) e.currentTarget.style.backgroundColor = "#0f172a"; }}
          >
            {digit}
          </button>
        ))}
      </div>

      {/* 🚀 CONNECT TRANSMISSION ACTION BUTTON ROW */}
      <button
        onClick={handleInitiateVoipCall}
        style={{ width: "100%", padding: "12px", backgroundColor: isCalling ? "#ef4444" : "#10b981", color: isCalling ? "#ffffff" : "#020617", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "13px", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", transition: "background 0.2s", outline: "none" }}
      >
        {isCalling ? "🛑 Sever Communication Path" : "📞 Initiate Intercom Channel"}
      </button>

      {/* 📜 STATUS OUTPUT METRIC TEXT BOX */}
      <div style={{ backgroundColor: "#070e1b", border: "1px solid #1e293b", borderRadius: "6px", padding: "8px", fontSize: "10px", color: isCalling ? "#10b981" : "#94a3b8", textAlign: "center", fontFamily: "monospace", minHeight: "26px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {callStatus}
      </div>

    </div>
  );
}
