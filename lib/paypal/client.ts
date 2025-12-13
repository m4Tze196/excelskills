/**
 * PayPal Client Configuration
 *
 * Handles PayPal API authentication and client creation
 * Uses Sandbox for development, Production for live payments
 */

import { PayPalClient } from '@paypal/paypal-server-sdk'

/**
 * Create PayPal client instance
 * Automatically uses Sandbox or Production based on environment
 */
export function createPayPalClient(): PayPalClient {
  const environment = process.env.NEXT_PUBLIC_PAYPAL_ENV || 'sandbox'

  const clientId = environment === 'production'
    ? process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID_PRODUCTION
    : process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID_SANDBOX

  const clientSecret = environment === 'production'
    ? process.env.PAYPAL_CLIENT_SECRET_PRODUCTION
    : process.env.PAYPAL_CLIENT_SECRET_SANDBOX

  if (!clientId || !clientSecret) {
    throw new Error(
      `PayPal credentials not configured for ${environment} environment`
    )
  }

  return new PayPalClient({
    clientCredentialsAuthCredentials: {
      oAuthClientId: clientId,
      oAuthClientSecret: clientSecret,
    },
    environment: environment,
    logging: {
      logLevel: 'info',
      logRequest: { logBody: true },
      logResponse: { logHeaders: true },
    },
  })
}

/**
 * Credit packages available for purchase
 * Euro amounts with corresponding credit values
 */
export const CREDIT_PACKAGES = {
  STARTER: {
    id: 'starter',
    euro: 5,
    credits: 5,
    bonus: 0,
    label: 'Starter',
    description: '~100 messages',
  },
  STANDARD: {
    id: 'standard',
    euro: 10,
    credits: 10,
    bonus: 0,
    label: 'Standard',
    description: '~200 messages',
    popular: true,
  },
  PLUS: {
    id: 'plus',
    euro: 25,
    credits: 25,
    bonus: 1.25, // 5% bonus
    label: 'Plus',
    description: '~500 messages',
  },
  PRO: {
    id: 'pro',
    euro: 50,
    credits: 50,
    bonus: 5, // 10% bonus
    label: 'Pro',
    description: '~1000 messages',
  },
} as const

export type CreditPackageId = keyof typeof CREDIT_PACKAGES

/**
 * Get package details by ID
 */
export function getPackageById(id: string) {
  const packageKey = id.toUpperCase() as CreditPackageId
  return CREDIT_PACKAGES[packageKey] || null
}

/**
 * Calculate total credits including bonus
 */
export function calculateTotalCredits(packageId: CreditPackageId): number {
  const pkg = CREDIT_PACKAGES[packageId]
  return pkg.credits + pkg.bonus
}
