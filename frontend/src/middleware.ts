// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl

  if (url.pathname === '/admin') {
    url.pathname = '/admin/dashboard'
    return NextResponse.redirect(url)
  } else if (url.pathname === '/admin/services') {
    url.pathname = '/admin/services/manage'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
