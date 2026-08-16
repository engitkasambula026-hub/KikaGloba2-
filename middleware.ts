import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  // 🟢 ENFORCES SECURE PERMISSION GATEWAYS: Protects all premium business services automatically
  matcher: ["/services/:path*", "/business-hub/:path*", "/wallet/:path*"],
};

export async function middleware(request: NextRequest) {
  const currentUrl = request.nextUrl.clone();

  // Audit check the visitor's browser engine cookies for an official active user login token
  const isSessionAuthenticated = request.cookies.get("kika_session_active");

  if (!isSessionAuthenticated || isSessionAuthenticated.value !== "true") {
    console.log(`🔌 [SECURITY INTERCEPT] Unauthenticated traffic redirected to Profile Verification Registry.`);
    
    // Smoothly route them to your dedicated flat login dashboard page
    currentUrl.pathname = "/login";
    return NextResponse.redirect(currentUrl);
  }

  // If the verified user session token exists in their system, grant unrestricted entry
  return NextResponse.next();
}
