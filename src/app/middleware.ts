import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const allowedIPs = ['200.150.74.98', '177.39.236.1'];
  const clientIP = request.headers['x-forwarded-for'] || request.headers["x-real-ip"];
  
  if (!allowedIPs.includes(clientIP)) {
    return NextResponse.redirect(new URL('/404', request.url))
  }
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}