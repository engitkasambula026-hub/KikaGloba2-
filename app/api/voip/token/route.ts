import { NextResponse } from "next/server";
import twilio from "twilio";

const AccessToken = twilio.jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

export async function GET() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID!;
  const authToken = process.env.TWILIO_AUTH_TOKEN!;
  const twimlAppSid = process.env.TWILIO_TWIML_APP_APP_SID!;

  // 1. Initialize structural voice permissions
  const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: twimlAppSid,
    incomingAllow: true,
  });

  // 2. Generate the temporary encryption pass-token
  const token = new AccessToken(accountSid, authToken, "SK_MOCK_API_KEY_FOR_LOCAL_TESTS");
  token.addGrant(voiceGrant);
  token.identity = "kika_diaspora_member";

  return NextResponse.json({ token: token.toJwt() });
}
