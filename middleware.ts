import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  // 🟢 UNIVERSAL SECURE MATCHBOARD FILTER: Scans every path on the network
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export async function middleware(request: NextRequest) {
  const currentUrl = request.nextUrl.clone();
  const { pathname } = request.nextUrl;

  // 🟢 EXPLICIT INFRASTRUCTURE WHITELIST: Never intercept login, register, or their data API channels
  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/api/login" ||
    pathname === "/api/register"
  ) {
    return NextResponse.next();
  }

  // Audit check the visitor's browser engine cookies for an official active user login token
  const isSessionAuthenticated = request.cookies.get("kika_session_active");

  if (!isSessionAuthenticated || isSessionAuthenticated.value !== "true") {
    console.log(`🔌 [SECURITY INTERCEPT] Protected path [${pathname}] blocked. Redirecting to Login Gate.`);
    
    // Smoothly force redirect the unauthenticated device straight to your login page entrance
    currentUrl.pathname = "/login";
    return NextResponse.redirect(currentUrl);
  }

  // Grant full access pass if the session cookie is verified green inside the browser
  return NextResponse.next();
}
