/**
 * Signup Page
 *
 * User registration - Create new account with email/password
 */

import { AuthForm } from '@/components/auth/AuthForm'
import { getCurrentUser } from '@/lib/supabase/auth'
import { redirect } from 'next/navigation'

interface SignupPageProps {
  params: Promise<{ locale: string }>
}

export default async function SignupPage({ params }: SignupPageProps) {
  const { locale } = await params

  // Redirect if already logged in
  const user = await getCurrentUser()
  if (user) {
    redirect(`/${locale}/chat`)
  }

  return (
    <div className="mx-auto min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">
            Create Your Account
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Get started with 10 free credits
          </p>
        </div>

        {/* Benefits Banner */}
        <div className="mb-6 rounded-lg border border-primary bg-primary/5 p-4">
          <h3 className="mb-2 font-semibold text-primary">
            What you'll get:
          </h3>
          <ul className="space-y-2 text-sm text-foreground">
            <li className="flex items-start gap-2">
              <svg
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>10 free credits (worth ~€1)</span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Access to Excel AI Chatbot</span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Transaction history & receipt download</span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Secure payment with PayPal</span>
            </li>
          </ul>
        </div>

        {/* Auth Form */}
        <div className="rounded-xl border border-border bg-card p-8 shadow-lg">
          <AuthForm mode="signup" locale={locale} />
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <svg
              className="h-4 w-4 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span>SSL Encrypted</span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              className="h-4 w-4 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span>GDPR</span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              className="h-4 w-4 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            <span>PayPal Käuferschutz</span>
          </div>
        </div>
      </div>
    </div>
  )
}
