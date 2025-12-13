/**
 * PayPal Create Order API Route
 *
 * Creates a PayPal order for credit purchase
 * Security: Requires authentication, validates amounts, logs all actions
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/server'
import { createPayPalClient, getPackageById, calculateTotalCredits } from '@/lib/paypal/client'

export async function POST(request: NextRequest) {
  try {
    // Step 1: Authenticate user
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Please log in to purchase credits' },
        { status: 401 }
      )
    }

    // Step 2: Parse request body
    const body = await request.json()
    const { packageId } = body

    if (!packageId || typeof packageId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request', message: 'Package ID is required' },
        { status: 400 }
      )
    }

    // Step 3: Validate package
    const packageDetails = getPackageById(packageId)
    if (!packageDetails) {
      return NextResponse.json(
        { error: 'Invalid package', message: `Package '${packageId}' not found` },
        { status: 400 }
      )
    }

    const totalCredits = calculateTotalCredits(packageId.toUpperCase() as any)
    const amountEuro = packageDetails.euro

    // Step 4: Rate limiting check (max 5 payment attempts per hour)
    const adminSupabase = createAdminClient()
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()

    const { data: recentAttempts } = await adminSupabase
      .from('payment_audit_log')
      .select('id')
      .eq('user_id', user.id)
      .eq('action', 'payment_order_created')
      .gte('created_at', oneHourAgo)

    if (recentAttempts && recentAttempts.length >= 5) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: 'Too many payment attempts. Please try again later.',
        },
        { status: 429 }
      )
    }

    // Step 5: Create PayPal order
    const paypalClient = createPayPalClient()

    const orderRequest = {
      body: {
        intent: 'CAPTURE' as const,
        purchaseUnits: [
          {
            amount: {
              currencyCode: 'EUR' as const,
              value: amountEuro.toFixed(2),
            },
            description: `ExcelSkills Credits - ${packageDetails.label} Package`,
            customId: `user_${user.id}_package_${packageId}`,
          },
        ],
        applicationContext: {
          brandName: 'ExcelSkills',
          landingPage: 'NO_PREFERENCE' as const,
          userAction: 'PAY_NOW' as const,
          returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
          cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
        },
      },
    }

    const { result: order } = await paypalClient.orders.create(orderRequest)

    if (!order || !order.id) {
      throw new Error('Failed to create PayPal order')
    }

    // Step 6: Store pending payment in database
    const { error: pendingError } = await adminSupabase
      .from('pending_payments')
      .insert({
        user_id: user.id,
        paypal_order_id: order.id,
        amount_euro: amountEuro,
        credits_amount: totalCredits,
        status: 'created',
      })

    if (pendingError) {
      console.error('Failed to create pending payment:', pendingError)
      // Don't fail the request, log it
    }

    // Step 7: Audit log
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    await adminSupabase.from('payment_audit_log').insert({
      user_id: user.id,
      action: 'payment_order_created',
      details: {
        paypal_order_id: order.id,
        package_id: packageId,
        amount_euro: amountEuro,
        credits_amount: totalCredits,
      },
      ip_address: ip,
      user_agent: userAgent,
    })

    // Step 8: Return order ID to frontend
    return NextResponse.json({
      orderId: order.id,
      amount: amountEuro,
      credits: totalCredits,
      package: packageDetails.label,
    })
  } catch (error: any) {
    console.error('Create order error:', error)

    return NextResponse.json(
      {
        error: 'Payment error',
        message: error.message || 'Failed to create payment order',
      },
      { status: 500 }
    )
  }
}
