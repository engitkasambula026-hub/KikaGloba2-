import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // 1. Intercept anyone attempting to open the administrative route
  if (url.pathname.startsWith('/admin')) {
    // In production, we extract the active session token or login cookie
    const sessionCookie = request.cookies.get('kika_auth_session')?.value;
    const userEmail = request.cookies.get('kika_auth_email')?.value;

    // TEMPORARY GLOBAL BYPASS FOR ROOT DEVELOPER: Change this rule if you want to strictly tie it to a cookie check
    const masterAdminEmail = "engitkasambula026@gmail.com";

    // 2. If an unauthenticated user or an incorrect email tries to breach the path, trigger a hard redirect
    if (userEmail !== masterAdminEmail) {
      url.pathname = '/'; // Override path to target the landing page
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// 🎯 Configure the exact path matrix patterns this middleware shield monitors
export const config = {
  matcher: ['/admin/:path*'],
};
