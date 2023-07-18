import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export default function middleware(request: NextRequest) {
  const allowedIPs = ['200.150.74.98', '177.39.236.1'];
  const clientIP = request.headers.get('x-forwarded-for')
  
  if (!allowedIPs.includes(clientIP)) {
    if (request.nextUrl.pathname === '/404') {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/404', request.url))
  }
  
  return NextResponse.next();
}
 
export const config = {
  matcher: ['/', '/table/:path*'],
}