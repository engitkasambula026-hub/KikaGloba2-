import { NextResponse } from "next/server";
import { sql } from "@/lib/db"; // 🟢 CORRECT FIX: Standardized to use your native 'sql' driver

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { callerEmail, calleeNumber, durationSeconds, status } = body;

    if (!callerEmail) {
      return NextResponse.json({ success: false, error: "Caller identity metric required" }, { status: 400 });
    }

    console.log(`🎙️ VoIP Trunk Call Log Intercepted: Node ${callerEmail} connected for ${durationSeconds}s`);

    // 🛡️ DYNAMIC SUITE ACCOUNTING ROW WRITE PIPELINE (NEON SERVERLESS ROWS)
    // Automatically appends cellular usage logs straight inside your cooperative database parameters
    await sql`
      UPDATE kika_diaspora_ledger 
      SET sacco_name = CONCAT(sacco_name, ' | VoIP Call Status: ', ${status || 'COMPLETED'}, ' (', ${durationSeconds || 0}, 's)')
      WHERE email = ${callerEmail};
    `;

    return NextResponse.json({ success: true, message: "VoIP transmission metrics successfully logged inside serverless rows." }, { status: 200 });

  } catch (error: any) {
    console.error("VoIP Logging Exception Intercepted: ", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
