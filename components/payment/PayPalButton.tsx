'use client'

/**
 * PayPal Button Component
 *
 * Integrates PayPal Checkout with ExcelSkills payment flow
 * Handles order creation, approval, and capture
 */

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

declare global {
  interface Window {
    paypal?: any
  }
}

interface PayPalButtonProps {
  packageId: string
  amount: number
  credits: number
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

export function PayPalButton({
  packageId,
  amount,
  credits,
  onSuccess,
  onError,
}: PayPalButtonProps) {
  const paypalRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Load PayPal SDK
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID_SANDBOX
    const environment = process.env.NEXT_PUBLIC_PAYPAL_ENV || 'sandbox'

    if (!clientId) {
      setError('PayPal is not configured')
      setLoading(false)
      return
    }

    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR`
    script.async = true

    script.onload = () => {
      if (window.paypal && paypalRef.current) {
        window.paypal
          .Buttons({
            style: {
              layout: 'vertical',
              color: 'gold',
              shape: 'rect',
              label: 'paypal',
              height: 50,
            },

            // Create order on backend
            createOrder: async () => {
              try {
                const response = await fetch('/api/payment/create-order', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ packageId }),
                })

                const data = await response.json()

                if (!response.ok) {
                  throw new Error(data.message || 'Failed to create order')
                }

                return data.orderId
              } catch (err: any) {
                setError(err.message)
                throw err
              }
            },

            // Handle approval
            onApprove: async (data: any) => {
              try {
                const response = await fetch('/api/payment/capture-order', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ orderId: data.orderID }),
                })

                const result = await response.json()

                if (!response.ok) {
                  throw new Error(result.message || 'Payment capture failed')
                }

                if (onSuccess) {
                  onSuccess(result)
                } else {
                  // Redirect to success page
                  router.push('/payment/success')
                }
              } catch (err: any) {
                setError(err.message)
                if (onError) {
                  onError(err)
                }
              }
            },

            // Handle cancel
            onCancel: () => {
              setError('Payment was cancelled')
            },

            // Handle error
            onError: (err: any) => {
              console.error('PayPal error:', err)
              setError('An error occurred with PayPal')
              if (onError) {
                onError(err)
              }
            },
          })
          .render(paypalRef.current)

        setLoading(false)
      }
    }

    script.onerror = () => {
      setError('Failed to load PayPal')
      setLoading(false)
    }

    document.body.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [packageId, amount, credits, onSuccess, onError, router])

  if (error) {
    return (
      <div className="rounded-lg border border-red-500 bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-400">
        <strong>Error:</strong> {error}
      </div>
    )
  }

  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      )}
      <div ref={paypalRef} />
    </div>
  )
}
