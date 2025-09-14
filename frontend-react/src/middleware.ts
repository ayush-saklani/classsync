import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host');
  const { pathname } = request.nextUrl;

  if (hostname === 'gehutimetable.vercel.app') {
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/view', request.url));
    } else if (pathname.startsWith('/edit')) {
      return NextResponse.redirect(new URL('/view', request.url));
    }
  } else if (hostname === 'classsync.vercel.app') {
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/edit', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/edit/:path*', '/view/:path*'],
};
