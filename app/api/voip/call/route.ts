import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// 📡 UN-RESTRICTED DUAL-STREAM GLOBAL MEDIA NODE POOL
if (!(global as any).kikaDuplexSwitchboardMatrix) {
  (global as any).kikaDuplexSwitchboardMatrix = new Map();
}

export async function GET() {
  const switchboard = (global as any).kikaDuplexSwitchboardMatrix;
  return NextResponse.json({ 
    success: true, 
    activeNodeStreams: Array.from(switchboard.keys()),
    timestamp: Date.now() 
  }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    const { action, callerId, targetId, audioChunkBase64 } = rawBody;

    const switchboard = (global as any).kikaDuplexSwitchboardMatrix;

    // 1. INBOUND DATA CAPTURE TRACKER
    if (action === "STREAM_AUDIO_CHUNK" && callerId) {
      // Safely overwrite the specific seat cache with high-velocity data strings
      switchboard.set(callerId.trim().toUpperCase(), {
        audioChunkBase64: audioChunkBase64 || "",
        timestamp: Date.now()
      });
      return NextResponse.json({ success: true }, { status: 200 });
    }
    
    // 2. OUTBOUND DATA TRANSMISSION ROUTER
    if (action === "PULL_LIVE_AUDIO" && targetId) {
      const livePayload = switchboard.get(targetId.trim().toUpperCase()) || { audioChunkBase64: "", timestamp: 0 };
      return NextResponse.json({ success: true, activePayload: livePayload }, { status: 200 });
    }
    
    // 3. SECURE SEAT TERMINATION FLUSH
    if (action === "DISCONNECT_STREAM" && callerId) {
      switchboard.delete(callerId.trim().toUpperCase());
      console.log(`🔌 [VOIP SWITCHBOARD] Flushed cross-device matrix lane for: ${callerId}`);
      return NextResponse.json({ success: true, message: "Trunk line reset successful." });
    }

    return NextResponse.json({ error: "Malformed signaling configuration keys." }, { status: 400 });

  } catch (err: any) {
    return NextResponse.json({ error: `Gateway switchboard critical failure: ${err.message}` }, { status: 500 });
  }
}
