import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// 🟢 GLOBAL AUDIO PACKET MATRIX: Allocates an active binary data buffer slot inside your ThinkPad's RAM memory
if (!(global as any).kikaVoiceBufferMemory) {
  (global as any).kikaVoiceBufferMemory = { status: "IDLE", audioChunkBase64: "" };
}

export async function GET() {
  return NextResponse.json({ success: true, payload: (global as any).kikaVoiceBufferMemory }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    const { action, audioChunkBase64 } = rawBody;

    // A. CAPTURE SOUND BLOCKS: Receives the binary audio stream coming directly from your iPhone microphone
    if (action === "STREAM_AUDIO_CHUNK") {
      (global as any).kikaVoiceBufferMemory = {
        status: "TALKING",
        audioChunkBase64: audioChunkBase64 || ""
      };
      return NextResponse.json({ success: true }, { status: 200 });
    }
    
    // B. PULL SOUND BLOCKS: Your ThinkPad laptop calls this block every 250ms to grab the voice bytes
    if (action === "PULL_LIVE_AUDIO") {
      return NextResponse.json({ success: true, activePayload: (global as any).kikaVoiceBufferMemory }, { status: 200 });
    }
    
    // C. TEARDOWN PIPELINE
    if (action === "DISCONNECT_STREAM") {
      (global as any).kikaVoiceBufferMemory = { status: "IDLE", audioChunkBase64: "" };
      console.log("🔌 [KIKA VoIP HUB] Binary audio buffers cleanly flushed.");
      return NextResponse.json({ success: true, message: "Buffers cleared." });
    }

    return NextResponse.json({ error: "Invalid action routing parameter." }, { status: 400 });

  } catch (err: any) {
    return NextResponse.json({ error: "Gateway stream negotiation loop failure" }, { status: 500 });
  }
}
