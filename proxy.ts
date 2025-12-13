/**
 * Next.js Proxy (Middleware)
 *
 * Handles:
 * 1. Supabase auth session refresh
 * 2. Internationalization (i18n) routing
 * 3. Protected route checks
 */

import { updateSession } from '@/lib/supabase/middleware'
import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'

// Create i18n middleware
const intlMiddleware = createMiddleware(routing)

export async function proxy(request: NextRequest) {
  // Step 1: Handle i18n routing
  const intlResponse = intlMiddleware(request)

  // Step 2: Update Supabase session
  const supabaseResponse = await updateSession(request)

  // Merge responses (preserve i18n headers + supabase cookies)
  const response = new NextResponse(intlResponse.body, {
    status: intlResponse.status,
    statusText: intlResponse.statusText,
    headers: intlResponse.headers,
  })

  // Copy Supabase auth cookies to the response
  supabaseResponse.cookies.getAll().forEach((cookie) => {
    response.cookies.set(cookie.name, cookie.value, cookie)
  })

  return response
}

export const config = {
  // Match all routes except static files and API routes
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
