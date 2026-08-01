"use client";

import React, { useState, useRef, useEffect } from "react";

export default function VoipStreamControllerPanel() {
  const [lineState, setLineState] = useState("IDLE"); // IDLE, TALKING, RECEIVING, AUDIBLE
  const [isMobile, setIsMobile] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<any>(null);
  const nativeAudioTagRef = useRef<HTMLAudioElement | null>(null);
  const sourceBufferRef = useRef<SourceBuffer | null>(null);

  const addLog = (msg: string) => { setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]); };

  useEffect(() => {
    const mobileCheck = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(mobileCheck);
    addLog(`📟 Node initialized as: ${mobileCheck ? "iPhone Audio Transmitter" : "ThinkPad Audio Receiver"}`);
  }, []);

  const startIphoneStream = async () => {
    setLineState("TALKING");
    addLog("🎙️ Initializing hardware voice capture on iPhone...");
    try {
      const micStream = await navigator.mediaDevices.getUserMedia({ 
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }, 
        video: false 
      });
      
      const mediaRecorder = new MediaRecorder(micStream, { mimeType: "audio/webm; codecs=opus" });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = async (event) => {
        if (event.data.size > 0) {
          const reader = new FileReader();
          reader.readAsArrayBuffer(event.data); 
          reader.onloadend = async () => {
            if (reader.result) {
              // Convert raw audio array array into a clean base64 data string matrix
              const base64AudioString = btoa(
                new Uint8Array(reader.result as ArrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), "")
              );
              
              await fetch("/api/voip/call", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "STREAM_AUDIO_CHUNK", audioChunkBase64: base64AudioString })
              });
            }
          };
        }
      };

      mediaRecorder.start(250); // Streams fresh speech slices every 250ms
      addLog("🟢 Microphone locked. Streaming continuous human voice blocks!");

    } catch (err: any) {
      addLog(`❌ Audio initialization failure: ${err.message}`);
      setLineState("IDLE");
    }
  };

  const startLaptopReceiver = async () => {
    setLineState("RECEIVING");
    addLog("🔊 Laptop Speaker Receiver active. Auditing cloud pipeline data rows...");
  };

  // 🟢 FIXED MEDIASOURCE BUFFER: Assembles data bytes seamlessly into smooth human speech
  const authorizeAudioPlaybackNode = () => {
    setLineState("AUDIBLE");
    addLog("🔊 Laptop speakers unmuted! Human voice translation buffer active.");

    if (!nativeAudioTagRef.current) return;

    const mediaSource = new MediaSource();
    nativeAudioTagRef.current.src = URL.createObjectURL(mediaSource);

    mediaSource.addEventListener("sourceopen", () => {
      // Initialize an open binary source buffer channel specifically configured for webm audio codecs
      const sourceBuffer = mediaSource.addSourceBuffer("audio/webm; codecs=opus");
      sourceBufferRef.current = sourceBuffer;

      intervalRef.current = setInterval(async () => {
        try {
          const res = await fetch("/api/voip/call", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "PULL_LIVE_AUDIO" })
          });
          const data = await res.json();
          
          if (data.activePayload && data.activePayload.status === "TALKING" && data.activePayload.audioChunkBase64) {
            if (!sourceBuffer.updating && mediaSource.readyState === "open") {
              // Decode base64 voice bytes directly back into raw binary array array frames
              const binaryString = atob(data.activePayload.audioChunkBase64);
              const len = binaryString.length;
              const bytes = new Uint8Array(len);
              for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
              }
              // Append the fresh audio slice directly onto the end of the streaming speaker track
              sourceBuffer.appendBuffer(bytes.buffer);
            }
          }
        } catch (e) { console.error(e); }
      }, 250);
    });

    nativeAudioTagRef.current.play().catch(() => {});
  };

  const closeVoicePipeline = async () => {
    if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (nativeAudioTagRef.current) { nativeAudioTagRef.current.pause(); }
    
    await fetch("/api/voip/call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "DISCONNECT_STREAM" })
    });
    setLineState("IDLE");
    addLog("🛑 Voice session terminated. Channels cleanly flushed.");
  };

  return (
    <div style={{ background: "#1e293b", padding: "24px", borderRadius: "16px", border: "1px solid #334155", marginBottom: "20px" }}>
      <h4 style={{ color: "#ffffff", margin: "0 0 10px 0", fontSize: "14px" }}>LIVE AUDIO FIELD UNIT TRIAL</h4>
      
      {/* NATIVE STREAM PLAYER CHANNEL BLOCK */}
      <audio ref={nativeAudioTagRef} style={{ display: "none" }} preload="auto" />

      <div style={{ background: "#0f172a", padding: "12px", borderRadius: "8px", color: lineState === "AUDIBLE" || lineState === "TALKING" ? "#34d399" : "#64748b", fontWeight: "bold", textAlign: "center", marginBottom: "15px", fontSize: "14px" }}>
        LINE MATRIX STATUS: {lineState.replace("_", " ")}
      </div>

      {lineState === "IDLE" && (
        isMobile ? (
          <button onClick={startIphoneStream} style={{ width: "100%", padding: "12px", background: "#34d399", color: "#0f172a", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>🎙️ Activate iPhone Microphone</button>
        ) : (
          <button onClick={startLaptopReceiver} style={{ width: "100%", padding: "12px", background: "#60a5fa", color: "#0f172a", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>🔊 Open Laptop Speaker Receiver</button>
        )
      )}

      {lineState === "RECEIVING" && !isMobile && (
        <button onClick={authorizeAudioPlaybackNode} style={{ width: "100%", padding: "12px", background: "#10b981", color: "#0f172a", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", marginBottom: "10px" }}>🔓 Unmute & Connect Speaker</button>
      )}

      {lineState !== "IDLE" && (
        <button onClick={closeVoicePipeline} style={{ width: "100%", padding: "12px", background: "#ef4444", color: "#ffffff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", marginTop: "5px" }}>📴 Hang Up Voice Session</button>
      )}

      <div style={{ marginTop: "15px", background: "#0f172a", padding: "10px", borderRadius: "6px", fontFamily: "monospace", fontSize: "11px", color: "#34d399", minHeight: "80px", maxHeight: "110px", overflowY: "auto" }}>
        {logs.map((l, i) => <div key={i}>{l}</div>)}
      </div>
    </div>
  );
}
