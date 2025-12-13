'use client'

/**
 * Payment Success Page
 *
 * Shown after successful PayPal payment
 * Displays confirmation and next steps
 */

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [creditsRemaining, setCreditsRemaining] = useState(0)
  const [loading, setLoading] = useState(true)

  const creditsAdded = searchParams.get('credits') || '0'

  useEffect(() => {
    async function fetchBalance() {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login')
        return
      }

      const { data: profile } = await supabase
        .from('user_profiles')
        .select('credits_remaining')
        .eq('id', user.id)
        .single()

      if (profile) {
        setCreditsRemaining(profile.credits_remaining)
      }

      setLoading(false)
    }

    fetchBalance()
  }, [router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md text-center">
        {/* Success Animation */}
        <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <svg
            className="h-12 w-12 text-green-600 dark:text-green-400"
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
        </div>

        <h1 className="mb-4 text-3xl font-bold text-foreground">
          Payment Successful!
        </h1>

        <p className="mb-8 text-lg text-muted-foreground">
          Your credits have been added to your account.
        </p>

        <div className="mb-8 rounded-xl border border-border bg-card p-6">
          <div className="mb-4 text-sm text-muted-foreground">Credits Added</div>
          <div className="mb-6 text-4xl font-bold text-green-600 dark:text-green-400">
            +{parseFloat(creditsAdded).toFixed(2)}€
          </div>

          <div className="border-t border-border pt-4">
            <div className="text-sm text-muted-foreground">New Balance</div>
            <div className="text-2xl font-bold text-primary">
              {creditsRemaining.toFixed(2)}€
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => router.push('/chat')}
            className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Start Chatting
          </button>

          <button
            onClick={() => router.push('/account/transactions')}
            className="w-full rounded-lg border border-border px-6 py-3 font-semibold hover:bg-muted"
          >
            View Transaction History
          </button>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          A confirmation email has been sent to your email address.
        </p>
      </div>
    </div>
  )
}
