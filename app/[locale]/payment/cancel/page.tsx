'use client'

/**
 * Payment Cancel Page
 *
 * Shown when user cancels PayPal payment
 */

import { useRouter } from 'next/navigation'

export default function PaymentCancelPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md text-center">
        {/* Cancel Icon */}
        <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30">
          <svg
            className="h-12 w-12 text-yellow-600 dark:text-yellow-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="mb-4 text-3xl font-bold text-foreground">
          Payment Cancelled
        </h1>

        <p className="mb-8 text-lg text-muted-foreground">
          Your payment was not completed. No charges were made.
        </p>

        <div className="mb-8 rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">
          <p>
            If you encountered any issues during checkout, please try again or
            contact our support team.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => router.push('/payment')}
            className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Try Again
          </button>

          <button
            onClick={() => router.push('/chat')}
            className="w-full rounded-lg border border-border px-6 py-3 font-semibold hover:bg-muted"
          >
            Back to Chat
          </button>

          <button
            onClick={() => router.push('/support')}
            className="text-sm text-primary hover:underline"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  )
}
