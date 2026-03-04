import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/community',
  '/article',
  '/answer',
  '/snippet',
  '/task',
  '/bookmark',
  '/question',
  '/calendar',
  '/notification',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // if the route is protected, check for a token or session cookie
  const token = request.cookies.get('token')?.value;

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const signInUrl = request.nextUrl.clone();
      signInUrl.pathname = '/sign-in';
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

// The matcher must be statically analyzable by Next.js. We include both the
// base path and a wildcard subpath to catch nested routes (e.g. /dashboard/*).
export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/profile',
    '/profile/:path*',
    '/community',
    '/community/:path*',
    '/article',
    '/article/:path*',
    '/answer',
    '/answer/:path*',
    '/snippet',
    '/snippet/:path*',
    '/task',
    '/task/:path*',
    '/bookmark',
    '/bookmark/:path*',
    '/question',
    '/question/:path*',
    '/calendar',
    '/calendar/:path*',
    '/notification',
    '/notification/:path*',
  ],
};
