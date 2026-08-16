"use client";

import React, { useState, useRef, useEffect } from "react";

export default function VoipStreamControllerPanel() {
  const [lineState, setLineState] = useState("IDLE"); // IDLE, TALKING, AUDIBLE
  const [mySeatId, setMySeatId] = useState("");
  const [targetSeatId, setTargetSeatId] = useState("");
  const [logs, setLogs] = useState<string[]>([]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const intervalRef = useRef<any>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const lastTimestampRef = useRef<number>(0);

  const addLog = (msg: string) => { setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]); };

  useEffect(() => {
    const mobileCheck = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setMySeatId(mobileCheck ? "PHONE_A" : "THINKPAD");
    setTargetSeatId(mobileCheck ? "PHONE_B" : "PHONE_A");
    addLog("📟 Codec-Free PCM Wave Engine Active.");
  }, []);

  const startMicrophoneTransmission = async () => {
    if (!mySeatId || !targetSeatId) {
      alert("⚠️ Configuration Error: Assign both localized Seat ID and Target ID nodes.");
      return;
    }
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();

    setLineState("TALKING");
    addLog(`🎙️ Engaging hardware PCM capture matrix... My Seat: ${mySeatId}`);

    try {
      const liveCloudHostOrigin = window.location.origin;

      const micStream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
        video: false
      });
      localStreamRef.current = micStream;

      // 🟢 UNIVERSAL PCM ENCODER MATRIX: Converts voice straight into basic numbers
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass({ sampleRate: 16000 }); // Low bandwidth 16kHz for fast mobile data streaming
      audioContextRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(micStream);
      // Process 4096 audio samples per thread cycle cleanly
      const processor = audioCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      source.connect(processor);
      processor.connect(audioCtx.destination);

      processor.onaudioprocess = async (e) => {
        const leftChannelData = e.inputBuffer.getChannelData(0);
        
        // Compact 32-bit floating voice waves into tight 8-bit integers to prevent carrier network packet drops
        const pcmSamplesInt8 = new Int8Array(leftChannelData.length);
        for (let i = 0; i < leftChannelData.length; i++) {
          pcmSamplesInt8[i] = Math.max(-1, Math.min(1, leftChannelData[i])) * 127;
        }

        const binaryString = String.fromCharCode.apply(null, Array.from(pcmSamplesInt8));
        const cleanBase64Vector = btoa(binaryString);

        // Streams raw audio values straight into Vercel cloud switchboard positions
        await fetch(`${liveCloudHostOrigin}/api/voip/call`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "STREAM_AUDIO_CHUNK",
            callerId: mySeatId.trim().toUpperCase(),
            targetId: targetSeatId.trim().toUpperCase(),
            audioChunkBase64: cleanBase64Vector
          })
        });
      };

      addLog("🟢 Audio wave arrays streaming live to production cloud engine.");
    } catch (err: any) {
      addLog(`❌ Audio hardware connection aborted: ${err.message}`);
      setLineState("IDLE");
    }
  };

  const unmuteAndConnectSpeakerNode = () => {
    setLineState("AUDIBLE");
    addLog("🔊 Speaker channel unmuted! Synthesizing cross-device PCM arrays...");

    const liveCloudHostOrigin = window.location.origin;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const playCtx = audioContextRef.current || new AudioContextClass({ sampleRate: 16000 });
    audioContextRef.current = playCtx;

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

          if (frameTimestamp !== lastTimestampRef.current && playCtx.state === "running") {
            lastTimestampRef.current = frameTimestamp;

            // 🟢 UNIVERSAL PCM DECODER: Translates basic numbers back into physical human sound
            const binaryStr = atob(data.activePayload.audioChunkBase64);
            const audioBuffer = playCtx.createBuffer(1, binaryStr.length, 16000);
            const channelOutput = audioBuffer.getChannelData(0);

            for (let i = 0; i < binaryStr.length; i++) {
              const byteValue = binaryStr.charCodeAt(i);
              channelOutput[i] = (byteValue > 127 ? byteValue - 256 : byteValue) / 127;
            }

            const bufferSource = playCtx.createBufferSource();
            bufferSource.buffer = audioBuffer;
            bufferSource.connect(playCtx.destination);
            bufferSource.start();
          }
        }
      } catch (e) { console.error(e); }
    }, 250); // Fluid 250ms audio sample extraction loops
  };

  const closeVoicePipeline = async () => {
    if (processorRef.current) processorRef.current.disconnect();
    if (audioContextRef.current) audioContextRef.current.close();
    if (localStreamRef.current) localStreamRef.current.getTracks().forEach(track => track.stop());
    if (intervalRef.current) clearInterval(intervalRef.current);

    const liveCloudHostOrigin = window.location.origin;
    await fetch(`${liveCloudHostOrigin}/api/voip/call`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "DISCONNECT_STREAM", callerId: mySeatId.toUpperCase() })
    });
    setLineState("IDLE");
    addLog("🛑 Communication session terminated. Registers cleanly flushed.");
  };

  const inputStyle = { padding: "10px 14px", background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "#ffffff", fontSize: "14px", width: "100%", boxSizing: "border-box" as const, outline: "none" };

  return (
    <div style={{ background: "#1e293b", padding: "24px", borderRadius: "16px", border: "1px solid #334155", marginBottom: "20px" }}>
      <h4 style={{ color: "#ffffff", margin: "0 0 12px 0", fontSize: "14px" }}>UN-RESTRICTED FULL-DUPLEX SWITCH PANEL</h4>
      
      <div style={{ background: "#0f172a", padding: "12px", borderRadius: "8px", color: lineState !== "IDLE" ? "#34d399" : "#64748b", fontWeight: "bold", textAlign: "center", marginBottom: "15px", fontSize: "14px" }}>
        TRUNK CONNECTION STATUS: {lineState.replace("_", " ")}
      </div>

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
