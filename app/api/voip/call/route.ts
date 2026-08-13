import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// 🟢 FULL-DUPLEX MATRIX: Dynamic global lookup pool to map unlimited concurrent device streams
if (!(global as any).kikaFullDuplexSwitchboard) {
  (global as any).kikaFullDuplexSwitchboard = {};
}

export async function GET() {
  return NextResponse.json({ 
    activeNodes: Object.keys((global as any).kikaFullDuplexSwitchboard) 
  }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    const { action, callerId, targetId, audioChunkBase64 } = rawBody;

    const switchboard = (global as any).kikaFullDuplexSwitchboard;

    // A. BROADCAST SEAT REGISTER: Captures and stores audio bytes under the specific phone's ID
    if (action === "STREAM_AUDIO_CHUNK" && callerId) {
      switchboard[callerId] = {
        status: "TALKING",
        audioChunkBase64: audioChunkBase64 || "",
        timestamp: Date.now()
      };
      return NextResponse.json({ success: true }, { status: 200 });
    }
    
    // B. RECEIVE SEAT AUDIT: Fetches the voice bytes belonging explicitly to the target phone
    if (action === "PULL_LIVE_AUDIO" && targetId) {
      const targetPayload = switchboard[targetId] || { status: "IDLE", audioChunkBase64: "" };
      return NextResponse.json({ success: true, activePayload: targetPayload }, { status: 200 });
    }
    
    // C. CLEAR SEAT CONTEXT ON HANGUP
    if (action === "DISCONNECT_STREAM" && callerId) {
      delete switchboard[callerId];
      console.log(`🔌 [FULL-DUPLEX SWITCHBOARD] Cleared network seat cache for: ${callerId}`);
      return NextResponse.json({ success: true, message: "Seat cleared." });
    }

    return NextResponse.json({ error: "Missing matrix routing parameters." }, { status: 400 });

  } catch (err: any) {
    return NextResponse.json({ error: "Gateway multi-thread failure" }, { status: 500 });
  }
}
