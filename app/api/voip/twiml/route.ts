import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const toNumber = formData.get("To")?.toString() || "";
    const maxSeconds = Number(formData.get("MaxSeconds") || 60);

    const VoiceResponse = twilio.twiml.VoiceResponse;
    const twiml = new VoiceResponse();

    if (!toNumber) {
      twiml.say("No destination number provided. Disconnecting.");
    } else {
      const dial = twiml.dial({
        callerId: process.env.TWILIO_CALLER_ID || "+46100000000",
        timeLimit: Math.max(10, maxSeconds) // Hard cut-off when prepaid wallet reaches 0.00 SEK
      });
      dial.number(toNumber);
    }

    return new NextResponse(twiml.toString(), {
      status: 200,
      headers: { "Content-Type": "text/xml" }
    });
  } catch (err: any) {
    return new NextResponse(`<Response><Say>Switching error.</Say></Response>`, {
      status: 200,
      headers: { "Content-Type": "text/xml" }
    });
  }
}
