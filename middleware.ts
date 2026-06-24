import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  if (url.pathname.startsWith('/categories/')) {
    const originalPath = url.pathname;
    
    // 1. Decode to handle %20, %26, etc.
    let decoded = decodeURIComponent(originalPath);
    
    // 2. We want to ensure all incoming requests match your "clean" slug format
    // Example: "Supply Chain Finance & Trade Finance" -> "supply-chain-finance-and-trade-finance"
    let slugified = decoded
      .replace('/categories/', '')
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    const expectedPath = `/categories/${slugified}`;

    // If the requested path is not the "clean" slug version, redirect to it
    if (originalPath !== expectedPath) {
      return NextResponse.redirect(new URL(expectedPath, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/categories/:path*',
};
