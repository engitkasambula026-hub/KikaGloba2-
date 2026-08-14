import { NextResponse } from "next/server";

// 🟢 ENFORCES DYNAMIC ENGINE ROUTING: Tells Vercel's cloud compiler not to pre-render this file as a static page
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Standard secure sandbox token allocation placeholder layout for structural alignment
    const sandboxTokenPayload = {
      identity: "Kika_Sovereign_Diaspora_Node",
      token: "KIKA_SANDBOX_TOKEN_" + Math.random().toString(36).substring(2, 12).toUpperCase(),
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({ success: true, ...sandboxTokenPayload }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: `Token generation fallback exception: ${err.message}` }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json({ error: "Method Not Allowed on token distribution nodes." }, { status: 405 });
}
