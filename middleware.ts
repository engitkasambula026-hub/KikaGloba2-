import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  // 🟢 ENFORCES UNIVERSAL SITE GATEKEEPING: Intercepts all page routes except backend system assets
  matcher: "/((?!_next/static|_next/image|favicon.ico|api/auth/login).*)",
};

export async function middleware(request: NextRequest) {
  // 1. Establish your secret alpha-numeric master pass token
  const MASTER_GATEPASS_SECRET = "KikaGlobalStaging2026";
  
  const currentUrl = request.nextUrl.clone();
  
  // 2. Check if the user is attempting to submit the gatepass password form fields
  if (request.nextUrl.pathname === "/gatepass-authorize") {
    return NextResponse.next();
  }

  // 3. Audit check the visitor's browser cookie files for an active access pass
  const hasPassToken = request.cookies.get("kika_gatepass_approved");

  if (!hasPassToken || hasPassToken.value !== MASTER_GATEPASS_SECRET) {
    // Redirect unverified network traffic straight to the security authorization wall
    currentUrl.pathname = "/gatepass-authorize";
    return NextResponse.redirect(currentUrl);
  }

  return NextResponse.next();
}
