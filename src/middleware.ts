import { NextRequest, NextResponse } from 'next/server'
import { getUrl } from './lib/get-url'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token')
  const pathname = request.nextUrl.pathname

  console.log('middleware', { token, pathname })

  if (pathname === '/' && token) {
    return NextResponse.redirect(new URL(getUrl('/activites')))
  }

  if (pathname.includes('/connect4') && !token) {
    return NextResponse.redirect(new URL(getUrl('/login')))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}