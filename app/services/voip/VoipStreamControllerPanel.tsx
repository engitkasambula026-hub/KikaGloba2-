"use client";

import React, { useState, useRef, useEffect } from "react";

export default function VoipStreamControllerPanel() {
  const [lineState, setLineState] = useState("IDLE"); // IDLE, TALKING, AUDIBLE
  const [mySeatId, setMySeatId] = useState("");
  const [targetSeatId, setTargetSeatId] = useState("");
  const [logs, setLogs] = useState<string[]>([]);

  const localStreamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<any>(null);
  const nativeAudioTagRef = useRef<HTMLAudioElement | null>(null);
  const lastTimestampRef = useRef<number>(0);
  const wakeLockCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const addLog = (msg: string) => { setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]); };

  useEffect(() => {
    const mobileCheck = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setMySeatId(mobileCheck ? "PHONE_A" : "THINKPAD");
    setTargetSeatId(mobileCheck ? "PHONE_B" : "PHONE_A");
    addLog("📟 KiKa Multi-Node Full-Duplex Router Ready.");
  }, []);

  // 🟢 CANVAS HARDWARE WAKE-LOCK: Forces mobile kernels to keep media threads running high-priority
  useEffect(() => {
    let animationId: number;
    const runWakeLock = () => {
      if (wakeLockCanvasRef.current) {
        const ctx = wakeLockCanvasRef.current.getContext("2d");
        if (ctx) { ctx.fillStyle = Math.random() > 0.5 ? "#020617" : "#0f172a"; ctx.fillRect(0, 0, 1, 1); }
      }
      animationId = requestAnimationFrame(runWakeLock);
    };
    runWakeLock();
    return () => cancelAnimationFrame(animationId);
  }, []);

  const startMicrophoneTransmission = async () => {
    if (!mySeatId || !targetSeatId) {
      alert("⚠️ Configuration Error: Assign both localized Seat ID and Target ID nodes.");
      return;
    }
    setLineState("TALKING");
    addLog(`🎙️ Initializing hardware voice capture matrix... My Seat: ${mySeatId}`);

    try {
      // 🟢 SELF-CORRECTING HOST IDENTIFIER: Dynamically tracks your precise vercel.app domain link automatically
      const liveCloudHostOrigin = window.location.origin;

      const micStream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
        video: false
      });
      localStreamRef.current = micStream;

      const mediaRecorder = new MediaRecorder(micStream, { mimeType: "audio/webm; codecs=opus" });
      
      mediaRecorder.ondataavailable = async (event) => {
        if (event.data.size > 0) {
          const reader = new FileReader();
          reader.readAsDataURL(event.data);
          reader.onloadend = async () => {
            const dataUrlParts = reader.result?.toString().split(",");
            const extractedVoiceString = dataUrlParts && dataUrlParts.length > 1 ? dataUrlParts[1] : "";

            if (extractedVoiceString) {
              await fetch(`${liveCloudHostOrigin}/api/voip/call`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  action: "STREAM_AUDIO_CHUNK",
                  callerId: mySeatId.trim().toUpperCase(),
                  targetId: targetSeatId.trim().toUpperCase(),
                  audioChunkBase64: extractedVoiceString
                })
              });
            }
          };
        }
      };

      mediaRecorder.start(250); // High-velocity 250ms chunks to achieve fluid continuous stream patterns
      addLog("🟢 Microphone locked. Pumping digital voice data strings live over Vercel cloud endpoints.");

    } catch (err: any) {
      addLog(`❌ Audio hardware connection aborted: ${err.message}`);
      setLineState("IDLE");
    }
  };

  // 🟢 NATIVE HARDWARE UNMUTE BRIDGE: Manual handshake that forces iOS & Android to unlock the speaker
  const unmuteAndConnectSpeakerNode = () => {
    setLineState("AUDIBLE");
    addLog("🔊 Speaker channel unmuted! Synchronizing with global production data streams...");

    const liveCloudHostOrigin = window.location.origin;

    if (nativeAudioTagRef.current) {
      nativeAudioTagRef.current.play().catch(() => {});
    }

    intervalRef.current = setInterval(async () => {
      try {
        const res = await fetch(`${liveCloudHostOrigin}/api/voip/call`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "PULL_LIVE_AUDIO", targetId: targetSeatId.trim().toUpperCase() })
        });
        const data = await res.json();

        if (data.activePayload && data.activePayload.audioChunkBase64) {
          const frameTimestamp = data.activePayload.timestamp || 0;

          if (frameTimestamp !== lastTimestampRef.current && nativeAudioTagRef.current) {
            lastTimestampRef.current = frameTimestamp;
            // Feed the clean uncorrupted voice data string natively right into the open HTML5 speaker channel
            nativeAudioTagRef.current.src = `data:audio/webm;base64,${data.activePayload.audioChunkBase64}`;
            nativeAudioTagRef.current.play().catch(() => {});
          }
        }
      } catch (e) { console.error(e); }
    }, 250);
  };

  const closeVoicePipeline = async () => {
    if (localStreamRef.current) localStreamRef.current.getTracks().forEach(t => t.stop());
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (nativeAudioTagRef.current) nativeAudioTagRef.current.pause();

    const liveCloudHostOrigin = window.location.origin;
    await fetch(`${liveCloudHostOrigin}/api/voip/call`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "DISCONNECT_STREAM", callerId: mySeatId.toUpperCase() })
    });
    setLineState("IDLE");
    addLog("🛑 Voice session terminated. Channels cleanly flushed.");
  };

  const inputStyle = { padding: "10px 14px", background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "#ffffff", fontSize: "14px", width: "100%", boxSizing: "border-box" as const, outline: "none" };

  return (
    <div style={{ background: "#1e293b", padding: "24px", borderRadius: "16px", border: "1px solid #334155", marginBottom: "20px" }}>
      <h4 style={{ color: "#ffffff", margin: "0 0 12px 0", fontSize: "14px" }}>UN-RESTRICTED FULL-DUPLEX SWITCH PANEL</h4>
      
      <canvas ref={wakeLockCanvasRef} width="1" height="1" style={{ display: "none" }} />
      <audio ref={nativeAudioTagRef} style={{ display: "none" }} preload="auto" playsInline />

      {lineState === "IDLE" && (
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: "10px", color: "#94a3b8", marginBottom: "4px", textTransform: "uppercase" }}>My Seat ID</label>
            <input type="text" value={mySeatId} onChange={e => setMySeatId(e.target.value)} style={inputStyle} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: "10px", color: "#94a3b8", marginBottom: "4px", textTransform: "uppercase" }}>Target Phone ID</label>
            <input type="text" value={targetSeatId} onChange={e => setTargetSeatId(e.target.value)} style={inputStyle} />
          </div>
        </div>
      )}

      <div style={{ background: "#0f172a", padding: "12px", borderRadius: "8px", color: lineState !== "IDLE" ? "#34d399" : "#64748b", fontWeight: "bold", textAlign: "center", marginBottom: "15px", fontSize: "14px" }}>
        TRUNK CONNECTION STATUS: {lineState.replace("_", " ")}
      </div>

      {lineState === "IDLE" && (
        <button onClick={startMicrophoneTransmission} style={{ width: "100%", padding: "14px", background: "#34d399", color: "#0f172a", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", boxShadow: "0 4px 14px rgba(52, 211, 153, 0.2)" }}>
          🚀 Activate Microphone Transmitter
        </button>
      )}

      {lineState === "TALKING" && (
        <button onClick={unmuteAndConnectSpeakerNode} style={{ width: "100%", padding: "14px", background: "#fbbf24", color: "#0f172a", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", marginBottom: "10px", boxShadow: "0 4px 14px rgba(251, 191, 36, 0.2)" }}>
          🔓 Unmute Speaker & Connect Audio Channel
        </button>
      )}

      {lineState !== "IDLE" && (
        <button onClick={closeVoicePipeline} style={{ width: "100%", padding: "14px", background: "#ef4444", color: "#ffffff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", marginTop: "5px" }}>
          📴 Hang Up Voice Session
        </button>
      )}

      <div style={{ marginTop: "15px", background: "#0f172a", padding: "10px", borderRadius: "6px", fontFamily: "monospace", fontSize: "11px", color: "#34d399", minHeight: "80px", maxHeight: "110px", overflowY: "auto" }}>
        {logs.map((l, i) => <div key={i}>{l}</div>)}
      </div>
    </div>
  );
}
