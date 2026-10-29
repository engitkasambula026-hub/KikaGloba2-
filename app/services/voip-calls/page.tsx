"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function VoipCallsStreamingPage() {
  const router = useRouter();
  const [mySeatId, setMySeatId] = useState<string>("THINKPAD_A");
  const [targetPhoneId, setTargetPhoneId] = useState<string>("THINKPAD_B");
  const [trunkStatus, setTrunkStatus] = useState<string>("IDLE");
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
   // 🟢 FIXED: Safe array wrapper initialization to bypass server-client hydration time shifts completely
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  useEffect(() => {
    // Populate the baseline logging array node safely ONLY after client-side hydration completes
    setConsoleLogs([
      `[${new Date().toLocaleTimeString()}] 📞 Un-Restricted Full-Duplex PCM Trunk armed.`
    ]);
  }, []);


  // WebRTC Native Hardware Media Stream System References
  const localStreamRef = useRef<MediaStream | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const addLogEntry = (msg: string) => {
    setConsoleLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 10)]);
  };

  useEffect(() => {
    // ⏱️ AUTOMATED BACKGROUND RECEIVER LOOP: Scans your database every 2 seconds for incoming sound data strings
    pollingIntervalRef.current = setInterval(async () => {
      if (!mySeatId) return;
      try {
        const res = await fetch("/api/route", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "GET_SIGNAL", seatId: mySeatId.trim() })
        });
        const data = await res.json();
        
        // If a valid data array vector returns from Neon SQL rows, instantly play it
        if (data.success && data.signal && data.signal[0]?.sdp_data) {
          handleIncomingSoundBits(data.signal[0].sdp_data);
        }
      } catch (err) {
        console.error("Signaling download loop intercept error:", err);
      }
    }, 2000);

    return () => {
      if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
      shutdownMicrophoneCircuits();
    };
  }, [mySeatId, isAudioMuted]);

  const handleIncomingSoundBits = (base64AudioPayload: string) => {
    if (isAudioMuted) {
      setTrunkStatus("AUDIBLE");
      return;
    }
    
    setTrunkStatus("TALKING");
    try {
      // Direct binary string translation pass from base64 data streams
      const decodedBinary = window.atob(base64AudioPayload);
      const audioBufferArray = new Uint8Array(decodedBinary.length);
      for (let i = 0; i < decodedBinary.length; i++) {
        audioBufferArray[i] = decodedBinary.charCodeAt(i);
      }

      const audioBlob = new Blob([audioBufferArray], { type: "audio/wav; codecs=opus" });
      const audioBlobUrl = URL.createObjectURL(audioBlob);

      if (audioPlayerRef.current) {
        audioPlayerRef.current.src = audioBlobUrl;
        audioPlayerRef.current.play().catch((e) => console.log("Autoplay barrier caught:", e));
      }
    } catch (err) {
      console.error("Audio bit stream compilation error:", err);
    }
  };

  const toggleMicrophoneTransmitter = async () => {
    if (isTransmitting) {
      shutdownMicrophoneCircuits();
      return;
    }

    addLogEntry(`🎙️ Engaging hardware PCM capture matrix...`);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      localStreamRef.current = stream;
      setIsTransmitting(true);
      setTrunkStatus("TALKING");
      addLogEntry(`🟩 Codec-Free PCM Wave Engine Active.`);

      // Package mic frequencies into 1-second binary vectors to push down your API database switches
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = async (event) => {
        if (event.data.size > 0 && targetPhoneId && isTransmitting) {
          const buffer = await event.data.arrayBuffer();
          const uint8 = new Uint8Array(buffer);
          let binary = "";
          for (let i = 0; i < uint8.length; i++) {
            binary += String.fromCharCode(uint8[i]);
          }
          const base64Vector = window.btoa(binary);

          // Pushes the sound wave data directly via your verified 'PUT_SIGNAL' endpoint socket
          await fetch("/api/route", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "PUT_SIGNAL", seatId: targetPhoneId.trim(), sdp: base64Vector })
          });
        }
      };
      mediaRecorder.start(1000); // Send sound chunks smoothly every 1 second

    } catch (err: any) {
      addLogEntry(`❌ Audio hardware connection aborted: Permission denied.`);
    }
  };

  const toggleSpeakerMuteState = () => {
    const nextState = !isAudioMuted;
    setIsAudioMuted(nextState);
    if (!nextState) {
      addLogEntry(`🔊 Speaker channel unmuted! Connecting to audio tracks...`);
    } else {
      addLogEntry(`Muted speaker output.`);
    }
  };

  const shutdownMicrophoneCircuits = async () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }
    setIsTransmitting(false);
    setTrunkStatus("IDLE");
    addLogEntry(`🛑 Communication path disconnected.`);
    
    if (targetPhoneId) {
      await fetch("/api/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "CONSUME_SIGNAL", seatId: targetPhoneId.trim() })
      });
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f172a", color: "#ffffff", padding: "40px 20px", fontFamily: "Arial, sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyCenter: "center" }}>
      
      {/* HTML5 AUDIO LAYER NODE ELEMENT */}
      <audio ref={audioPlayerRef} autoPlay style={{ display: "none" }} />

      <header style={{ width: "100%", maxWidth: "500px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <span style={{ fontSize: "12px", color: "#34d399", fontWeight: "bold", fontFamily: "monospace" }}>🎚️ KIKA P2P VOIP HUB</span>
        <button onClick={() => router.push("/")} style={{ background: "transparent", border: "1px solid #ef4444", color: "#ef4444", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "11px", fontWeight: "bold" }}>Return to Main Hub</button>
      </header>

      <div style={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "26px", maxWidth: "500px", width: "100%", display: "flex", flexDirection: "column", gap: "20px", boxSizing: "border-box" }}>
        
        <div style={{ textAlign: "center", borderBottom: "1px solid #334155", paddingBottom: "14px" }}>
          <h2 style={{ color: trunkStatus === "TALKING" ? "#10b981" : trunkStatus === "AUDIBLE" ? "#f59e0b" : "#64748b", fontSize: "15px", fontWeight: "900", margin: 0, fontFamily: "monospace" }}>
            TRUNK CONNECTION STATUS: {trunkStatus}
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "11px", color: "#94a3b8", fontWeight: "bold", marginBottom: "6px" }}>MY SEAT ID</label>
            <input type="text" value={mySeatId} onChange={(e) => setMySeatId(e.target.value)} style={{ width: "100%", padding: "10px", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "6px", color: "#ffffff", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "11px", color: "#94a3b8", fontWeight: "bold", marginBottom: "6px" }}>TARGET PHONE ID</label>
            <input type="text" value={targetPhoneId} onChange={(e) => setTargetPhoneId(e.target.value)} style={{ width: "100%", padding: "10px", backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "6px", color: "#ffffff", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button onClick={toggleMicrophoneTransmitter} style={{ width: "100%", padding: "12px", backgroundColor: isTransmitting ? "#ef4444" : "#10b981", color: isTransmitting ? "#ffffff" : "#0f172a", border: "none", borderRadius: "6px", fontWeight: "bold", fontSize: "13px", cursor: "pointer", outline: "none" }}>
            {isTransmitting ? "🛑 Stop Audio Transmitter" : "🎤 Activate Microphone Transmitter"}
          </button>
          
          <button onClick={toggleSpeakerMuteState} style={{ width: "100%", padding: "12px", backgroundColor: isAudioMuted ? "#f59e0b" : "#3b82f6", color: "#ffffff", border: "none", borderRadius: "6px", fontWeight: "bold", fontSize: "13px", cursor: "pointer", outline: "none" }}>
            {isAudioMuted ? "🔒 Unmute Speaker & Connect Audio Channel" : "🔊 Speaker Audio Stream Connected"}
          </button>
        </div>

        <div style={{ backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "12px", minHeight: "110px", display: "flex", flexDirection: "column", gap: "6px" }}>
          {consoleLogs.map((log, index) => {
            const isSuccess = log.includes("🟩") || log.includes("🔊");
            return <div key={index} style={{ fontSize: "11px", fontFamily: "monospace", color: isSuccess ? "#10b981" : "#94a3b8" }}>{log}</div>;
          })}
        </div>

      </div>
    </div>
  );
}
