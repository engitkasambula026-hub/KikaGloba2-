import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// 🟢 GLOBAL CONCURRENT MULTI-NODE SWITCHBOARD MATRIX
if (!(global as any).kikaFullDuplexSwitchboard) {
  (global as any).kikaFullDuplexSwitchboard = {};
}

export async function GET() {
  const switchboard = (global as any).kikaFullDuplexSwitchboard;
  return NextResponse.json({ success: true, activeNodes: Object.keys(switchboard) }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    
    // Normalizes action routes across all device types cleanly
    const action = rawBody.action || "STREAM_AUDIO_CHUNK";
    const callerId = (rawBody.callerId || "PHONE_A").trim().toUpperCase();
    const targetId = (rawBody.targetId || "PHONE_B").trim().toUpperCase();
    
    // Extracts the raw voice bytes from the body payload
    const incomingVoiceString = rawBody.audioChunkBase64 || rawBody.audioOfferPayload || "";

    const switchboard = (global as any).kikaFullDuplexSwitchboard;

    // ==========================================
    // A. INCOMING PACKET DISPATCH (WRITE MODE)
    // ==========================================
    if (action === "STREAM_AUDIO_CHUNK" && callerId) {
      switchboard[callerId] = {
        status: "TALKING",
        audioChunkBase64: incomingVoiceString, // 🟢 MATCHED FIXED VARIABLE FLAG
        timestamp: Date.now()
      };
      return NextResponse.json({ success: true }, { status: 200 });
    }
    
    // ==========================================
    // B. OUTBOUND PACKET FETCH (READ MODE)
    // ==========================================
    if (action === "PULL_LIVE_AUDIO" && targetId) {
      const targetPayload = switchboard[targetId] || { status: "IDLE", audioChunkBase64: "" };
      return NextResponse.json({ success: true, activePayload: targetPayload }, { status: 200 });
    }
    
    // ==========================================
    // C. CLEAR CACHE ON HANG UP
    // ==========================================
    if (action === "DISCONNECT_STREAM" && callerId) {
      delete switchboard[callerId];
      console.log(`🔌 [SWITCHBOARD] Cleared memory seat cache for: ${callerId}`);
      return NextResponse.json({ success: true, message: "Seat flushed cleanly." });
    }

    return NextResponse.json({ error: "Invalid action parameters mapping." }, { status: 400 });

  } catch (err: any) {
    console.error("[VOIP CORE SERVER EXCEPTION]:", err);
    return NextResponse.json({ error: "Gateway multi-thread failure loop triggered" }, { status: 500 });
  }
}
