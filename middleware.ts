import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  if (url.pathname.startsWith('/categories/')) {
    const originalPath = url.pathname;
    
    // 1. Decode to handle %20, %26, etc.
    let decoded = decodeURIComponent(originalPath);
    
    // 2. Strict slugification matching your page generator
    let slugified = decoded
      .replace('/categories/', '')
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9\s-]/g, '') // 🌟 Strips out commas, periods, colons, etc.
      .replace(/\s+/g, '-')         // Replaces spaces with a single hyphen
      .replace(/-+/g, '-');         // Collapses accidental double hyphens

    const expectedPath = `/categories/${slugified}`;

    // If the incoming path has a comma or messy structure, force-redirect to the clean slug
    if (originalPath !== expectedPath) {
      return NextResponse.redirect(new URL(expectedPath, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/categories/:path*',
};
