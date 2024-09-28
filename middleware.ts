import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './server/services/token-generator'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Exclude /log-in page route from middleware
  if (pathname === '/log-in') {
    return NextResponse.next()
  }

  // Handle API route for /api/log-in
  if (pathname === '/api/auth/log-in') {
    return NextResponse.next() // Skip auth for log-in API
  }

  const token = request.cookies.get('token')?.value

  console.log('Token from cookie:', token) // Debugging log

  // Special handling for root path
  if (pathname === '/') {
    if (token && (await verifyToken(token))) {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL('/log-in', request.url))
    }
  }

  if (!token) {
    console.log('No token found, redirecting to login') // Debugging log
    return NextResponse.redirect(new URL('/log-in', request.url))
  }

  console.log('trying to verify')
  const decodedToken = verifyToken(token)
  if (!decodedToken) {
    console.log('Invalid token, redirecting to login') // Debugging log
    return NextResponse.redirect(new URL('/log-in', request.url))
  }

  // If token is valid, allow the request to proceed
  console.log('Returning after successful decoding')
  return NextResponse.next()
}

// Define the routes for which middleware should run
export const config = {
  matcher: [
    '/log-in',
    '/api/auth/log-in',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/api/((?!auth/log-in).*)',
  ],
}
