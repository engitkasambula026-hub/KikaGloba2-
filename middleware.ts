import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  // 🟢 UNIVERSAL SECURE MATCHBOARD FILTER: Protects every single path on your site automatically
  // EXCEPT for static assets, image files, the main login interface page, and the registration portals
  matcher: ["/((?!_next/static|_next/image|favicon.ico|login|register|api/login|api/register).*)"],
};

export async function middleware(request: NextRequest) {
  const currentUrl = request.nextUrl.clone();

  // Audit check the visitor's browser engine cookies for an official active user login token cookie pass
  const isSessionAuthenticated = request.cookies.get("kika_session_active");

  if (!isSessionAuthenticated || isSessionAuthenticated.value !== "true") {
    console.log(`🔌 [SECURITY INTERCEPT] Unauthenticated traffic blocked globally. Redirecting phone screen to Profile Verification Registry.`);
    
    // Force redirect the unauthorized browser session straight to your login access board page
    currentUrl.pathname = "/login";
    return NextResponse.redirect(currentUrl);
  }

  // If the verified user session token exists in their system, grant unrestricted entry
  return NextResponse.next();
}
