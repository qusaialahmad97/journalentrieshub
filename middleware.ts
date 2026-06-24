import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path starts with /categories/
  if (pathname.startsWith('/categories/')) {
    const lowercasePath = pathname.toLowerCase();

    // If the original path is different from the lowercase one, redirect!
    if (pathname !== lowercasePath) {
      return NextResponse.redirect(new URL(lowercasePath, request.url));
    }
  }

  return NextResponse.next();
}

// Ensure this only runs on your category pages
export const config = {
  matcher: '/categories/:path*',
};