import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { rateLimit } from "@/lib/rateLimit"
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

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // only check authentication for our protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    // use next-auth's helper which reads the correct session cookie
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "anonymous";
    const { success } = await rateLimit.limit(ip);

    if (!success) {
      return NextResponse.json("Too many requests", { status: 429 })
    }
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      const signInUrl = request.nextUrl.clone();
      signInUrl.pathname = '/sign-in';
      return NextResponse.redirect(signInUrl);
    }
    if (pathname.startsWith("/admin")) {
      if (token.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
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
