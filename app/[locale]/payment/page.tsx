'use client'

/**
 * Payment Page - Buy Credits
 *
 * Displays credit packages with PayPal checkout
 * Features: Package selection, PayPal integration, trust badges
 */

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { PayPalButton } from '@/components/payment/PayPalButton'
import { CREDIT_PACKAGES } from '@/lib/paypal/client'
import type { User } from '@supabase/supabase-js'

export default function PaymentPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPackage, setSelectedPackage] = useState<string | null>('STANDARD')
  const [creditsRemaining, setCreditsRemaining] = useState(0)

  // Check authentication
  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login?redirect=/payment')
        return
      }

      setUser(user)

      // Fetch credit balance
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

    checkAuth()
  }, [router])

  const handlePaymentSuccess = (data: any) => {
    // Update credit balance
    setCreditsRemaining(data.credits_remaining)

    // Show success message and redirect
    setTimeout(() => {
      router.push('/payment/success?credits=' + data.credits_added)
    }, 1000)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  const packages = Object.entries(CREDIT_PACKAGES)

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">Buy Credits</h1>
          <p className="text-lg text-muted-foreground">
            Choose a package to continue using the Excel AI Assistant
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-muted px-4 py-2">
            <span className="text-sm text-muted-foreground">Current Balance:</span>
            <span className="text-lg font-bold text-primary">
              {creditsRemaining.toFixed(2)}€
            </span>
          </div>
        </div>

        {/* Package Grid */}
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {packages.map(([key, pkg]) => {
              const totalCredits = pkg.credits + pkg.bonus
              const isSelected = selectedPackage === key

              return (
                <button
                  key={key}
                  onClick={() => setSelectedPackage(key)}
                  className={`relative rounded-xl border-2 p-6 text-left transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/5 shadow-lg'
                      : 'border-border hover:border-primary/50 hover:shadow'
                  }`}
                >
                  {/* Popular badge */}
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase text-primary-foreground">
                        Popular
                      </span>
                    </div>
                  )}

                  {/* Best value badge */}
                  {pkg.bonus > 0 && (
                    <div className="absolute -top-3 right-4">
                      <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                        +{((pkg.bonus / pkg.credits) * 100).toFixed(0)}% Bonus
                      </span>
                    </div>
                  )}

                  <div className="mb-4">
                    <div className="text-3xl font-bold">{pkg.euro}€</div>
                    <div className="text-sm text-muted-foreground">{pkg.label}</div>
                  </div>

                  <div className="mb-4 space-y-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-semibold text-primary">
                        {totalCredits}
                      </span>
                      <span className="text-sm text-muted-foreground">credits</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{pkg.description}</div>
                  </div>

                  {isSelected && (
                    <div className="absolute bottom-4 left-4 flex items-center gap-1 text-xs font-semibold text-primary">
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Selected
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* PayPal Checkout */}
          {selectedPackage && (
            <div className="mx-auto max-w-md">
              <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
                <h3 className="mb-4 text-xl font-semibold">Complete Purchase</h3>

                <div className="mb-6 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Package:</span>
                    <span className="font-semibold">
                      {CREDIT_PACKAGES[selectedPackage as keyof typeof CREDIT_PACKAGES].label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Credits:</span>
                    <span className="font-semibold">
                      {CREDIT_PACKAGES[selectedPackage as keyof typeof CREDIT_PACKAGES].credits +
                        CREDIT_PACKAGES[selectedPackage as keyof typeof CREDIT_PACKAGES].bonus}
                      €
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2 text-base">
                    <span className="font-semibold">Total:</span>
                    <span className="text-xl font-bold text-primary">
                      {CREDIT_PACKAGES[selectedPackage as keyof typeof CREDIT_PACKAGES].euro}€
                    </span>
                  </div>
                </div>

                <PayPalButton
                  packageId={selectedPackage.toLowerCase()}
                  amount={CREDIT_PACKAGES[selectedPackage as keyof typeof CREDIT_PACKAGES].euro}
                  credits={
                    CREDIT_PACKAGES[selectedPackage as keyof typeof CREDIT_PACKAGES].credits +
                    CREDIT_PACKAGES[selectedPackage as keyof typeof CREDIT_PACKAGES].bonus
                  }
                  onSuccess={handlePaymentSuccess}
                />

                {/* Trust badges */}
                <div className="mt-6 border-t border-border pt-4 text-center text-xs text-muted-foreground">
                  <div className="mb-2 flex items-center justify-center gap-4">
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
                      <span>Secure SSL</span>
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
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                      <span>PayPal Buyer Protection</span>
                    </div>
                  </div>
                  <p>
                    Safe & secure payment processing.
                    <br />
                    Credits are added instantly after payment.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="rounded-lg border border-border bg-card p-4">
              <summary className="cursor-pointer font-semibold">
                How do credits work?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Credits are used to pay for AI chat messages. Each message costs
                based on the length and complexity. 1 credit = 1 euro worth of
                usage.
              </p>
            </details>
            <details className="rounded-lg border border-border bg-card p-4">
              <summary className="cursor-pointer font-semibold">
                Do credits expire?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                No! Your credits never expire. Use them whenever you need.
              </p>
            </details>
            <details className="rounded-lg border border-border bg-card p-4">
              <summary className="cursor-pointer font-semibold">
                Can I get a refund?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Yes, unused credits can be refunded within 14 days of purchase,
                as per EU consumer protection laws.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}
