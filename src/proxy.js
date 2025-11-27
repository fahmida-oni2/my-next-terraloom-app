import { NextResponse } from 'next/server';

export function proxy(request) {
  const protectedPathPrefix = '/all-kits/'; 
  const loginPath = '/login'; 

  const isProtectedPath = request.nextUrl.pathname.startsWith(protectedPathPrefix);

  const isAuthenticated = request.cookies.has('__session'); 

  if (isProtectedPath && !isAuthenticated) { 
    
    const loginUrl = new URL(loginPath, request.url);
    
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname + request.nextUrl.search);
    
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {

  matcher: [
    '/all-kits/:path*', 
  ],
};