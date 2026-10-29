"use client";

import React, { useState, useEffect, useRef } from "react";

export default function WebRTCDialer() {
  const [targetUserEmail, setTargetUserEmail] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [isCalling, setIsCalling] = useState<boolean>(false);
  const [isInCall, setIsInCall] = useState<boolean>(false);
  const [callStatus, setCallStatus] = useState<string>("Intercom System Armed");

  // WebRTC Native Hardware Stream References
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 1. Identify signed-in user email node from cookie logs
    const activeCookies = document.cookie.split("; ");
    const emailCookie = activeCookies.find(row => row.startsWith("kika_user_email="));
    let myEmail = "audit02@kikaglobal.com";
    
    if (emailCookie && emailCookie.includes("=")) {
      myEmail = decodeURIComponent(emailCookie.split("=")[1]);
    }
    setUserEmail(myEmail);

    // 2. BACKGROUND SIGNAL POLLING LOOP: Scans your database every 3 seconds for inbound calls
    const signalingClock = setInterval(async () => {
      if (isInCall) return; // Lock polling loop down during active voice calls
      try {
        const res = await fetch("/api/route", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "POLL_VOIP_SIGNALS", receiverEmail: myEmail })
        });
        const data = await res.json();
        if (data.success && data.signals && data.signals.length > 0) {
          handleInboundSignals(data.signals);
        }
      } catch (err) {
        console.error("Signaling background sync dropped:", err);
      }
    }, 3000);

    return () => {
      clearInterval(signalingClock);
      terminateCallCircuits();
    };
  }, [isInCall, userEmail]);

  // 📡 INBOUND HANDSHAKE PROCESSOR
  const handleInboundSignals = async (signals: any[]) => {
    for (const signal of signals) {
      if (signal.signal_type === "OFFER") {
        const acceptCall = window.confirm(`📞 Incoming P2P Intercom Voice Call from [${signal.caller_email}]! Accept session?`);
        if (!acceptCall) {
          await sendVoipSignal(userEmail, signal.caller_email, "HANGUP", "REJECTED");
          return;
        }
        setTargetUserEmail(signal.caller_email);
        await executeAnswerHandshake(signal);
      }
      if (signal.signal_type === "ANSWER" && peerConnectionRef.current) {
        setCallStatus("🔊 Peer connected! Full-duplex voice stream active.");
        setIsInCall(true);
        const remoteDesc = new RTCSessionDescription(JSON.parse(signal.payload));
        await peerConnectionRef.current.setRemoteDescription(remoteDesc);
      }
      if (signal.signal_type === "ICE_CANDIDATE" && peerConnectionRef.current) {
        try {
          await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(JSON.parse(signal.payload)));
        } catch (e) {
          console.error("Error adding received ICE candidate", e);
        }
      }
      if (signal.signal_type === "HANGUP") {
        alert("🔌 The remote peer has disconnected the communication path.");
        terminateCallCircuits();
      }
    }
  };

  const sendVoipSignal = async (caller: string, receiver: string, type: string, payloadObj: any) => {
    await fetch("/api/route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "SEND_VOIP_SIGNAL",
        callerEmail: caller,
        receiverEmail: receiver,
        signalType: type,
        payload: JSON.stringify(payloadObj)
      })
    });
  };

  const initializePeerConnection = (receiver: string) => {
    const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:://google.com" }] });
    peerConnectionRef.current = pc;

    // Distribute network addresses automatically down the signaling pipe
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        sendVoipSignal(userEmail, receiver, "ICE_CANDIDATE", event.candidate);
      }
    };

    // Catch incoming remote audio stream and feed it directly into the audio tag
    pc.ontrack = (event) => {
      if (remoteAudioRef.current && event.streams) {
        remoteAudioRef.current.srcObject = event.streams[0];
      }
    };

    return pc;
  };

  // 📞 OUTBOUND LOOP ENTRY: Originate Call Session
  const initiateVoipCall = async () => {
    if (!targetUserEmail) {
      alert("❌ Input Error: Destination subscriber email required.");
      return;
    }

    setIsCalling(true);
    setCallStatus(`⏳ Requesting hardware authorization...`);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      localStreamRef.current = stream;

      const pc = initializePeerConnection(targetUserEmail);
      stream.getTracks().forEach(track => pc.addTrack(track, stream));

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      
      setCallStatus(`📡 Ringing [${targetUserEmail}] down database lanes...`);
      await sendVoipSignal(userEmail, targetUserEmail, "OFFER", offer);

    } catch (err: any) {
      alert(`❌ Audio Handshake Intercept: Microphone access denied.`);
      terminateCallCircuits();
    }
  };

  // 📥 ANSWER INBOUND CALL LOOP
  const executeAnswerHandshake = async (offerSignal: any) => {
    setIsCalling(true);
    setCallStatus("⏳ Constructing reciprocal audio streams...");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      localStreamRef.current = stream;

      const pc = initializePeerConnection(offerSignal.caller_email);
      stream.getTracks().forEach(track => pc.addTrack(track, stream));

      const remoteOffer = new RTCSessionDescription(JSON.parse(offerSignal.payload));
      await pc.setRemoteDescription(remoteOffer);

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      await sendVoipSignal(userEmail, offerSignal.caller_email, "ANSWER", answer);
      setCallStatus("🔊 Voice link connected live.");
      setIsInCall(true);
    } catch (err) {
      terminateCallCircuits();
    }
  };

  const terminateCallCircuits = async () => {
    if (targetUserEmail) {
      await sendVoipSignal(userEmail, targetUserEmail, "HANGUP", "DISCONNECTED");
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    setTargetUserEmail("");
    setIsCalling(false);
    setIsInCall(false);
    setCallStatus("Intercom System Armed");
  };

  return (
    <div style={{ backgroundColor: "#020617", border: "1px solid #1e293b", borderRadius: "12px", padding: "20px", maxWidth: "320px", width: "100%", display: "flex", flexDirection: "column", gap: "14px", margin: "20px auto", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
      
      {/* Invisible HTML5 Audio Tag elements that play the peer sound wave streams */}
      <audio ref={remoteAudioRef} autoPlay style={{ display: "none" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1e293b", paddingBottom: "10px" }}>
        <span style={{ color: "#94a3b8", fontSize: "10px", fontWeight: "bold", fontFamily: "monospace" }}>📞 P2P GLOBAL TELEPHONY TRUNK</span>
        <span style={{ color: isInCall ? "#10b981" : "#3b82f6", fontSize: "9px", fontWeight: "bold" }}>
          ● {isInCall ? "FULL-DUPLEX LIVE" : "TRUNK STANDBY"}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label style={{ fontSize: "11px", color: "#64748b", fontWeight: "bold" }}>TARGET MEMBER EMAIL ADDRESS</label>
        <input
          type="email"
          placeholder="e.g. engitkasambula026@gmail.com"
          value={targetUserEmail}
          onChange={(e) => setTargetUserEmail(e.target.value)}
          disabled={isCalling || isInCall}
          style={{ width: "100%", padding: "10px", background: "#0b1528", border: "1px solid #334155", borderRadius: "6px", color: "#ffffff", fontSize: "13px", boxSizing: "border-box", outline: "none" }}
        />
      </div>

      {/* CALL CONTROL TRIGGERS */}
      {!isCalling && !isInCall ? (
        <button onClick={initiateVoipCall} style={{ width: "100%", padding: "12px", backgroundColor: "#10b981", color: "#020617", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "13px", outline: "none" }}>
          🔊 Establish Voice Intercom
        </button>
      ) : (
        <button onClick={terminateCallCircuits} style={{ width: "100%", padding: "12px", backgroundColor: "#ef4444", color: "#ffffff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "13px", outline: "none" }}>
          🛑 Disconnect Communication Path
        </button>
      )}

      {/* REAL TIME CONSOLE PRINT MONITOR */}
      <div style={{ backgroundColor: "#070e1b", border: "1px solid #1e293b", borderRadius: "6px", padding: "10px", fontSize: "10.5px", color: isInCall ? "#10b981" : "#94a3b8", textAlign: "center", fontFamily: "monospace", minHeight: "32px", display: "flex", justifyContent: "center", alignItems: "center", lineHeight: "1.4" }}>
        {callStatus}
      </div>

      <span style={{ fontSize: "9.5px", color: "#475569", textAlign: "center", fontFamily: "sans-serif" }}>Logged as node: <span style={{ color: "#64748b" }}>{userEmail}</span></span>
    </div>
  );
}
