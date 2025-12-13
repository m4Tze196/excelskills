/**
 * PayPal Capture Order API Route
 *
 * Captures approved PayPal payment and credits user account
 *
 * SECURITY CRITICAL:
 * - Server-side verification only (never trust client)
 * - Validates amount matches expected
 * - Prevents double-crediting (idempotency)
 * - Atomic database transactions
 * - Complete audit trail
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/server'
import { createPayPalClient } from '@/lib/paypal/client'

export async function POST(request: NextRequest) {
  const adminSupabase = createAdminClient()
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'

  try {
    // Step 1: Authenticate user
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Please log in' },
        { status: 401 }
      )
    }

    // Step 2: Parse request
    const body = await request.json()
    const { orderId } = body

    if (!orderId || typeof orderId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request', message: 'Order ID is required' },
        { status: 400 }
      )
    }

    // Step 3: Check for existing pending payment (idempotency check)
    const { data: pendingPayment, error: pendingError } = await adminSupabase
      .from('pending_payments')
      .select('*')
      .eq('paypal_order_id', orderId)
      .single()

    if (pendingError || !pendingPayment) {
      // Log suspicious activity
      await adminSupabase.from('payment_audit_log').insert({
        user_id: user.id,
        action: 'payment_capture_failed_no_pending',
        details: { paypal_order_id: orderId, error: 'No pending payment found' },
        ip_address: ip,
        user_agent: userAgent,
      })

      return NextResponse.json(
        { error: 'Invalid payment', message: 'Payment order not found' },
        { status: 404 }
      )
    }

    // Step 4: Verify ownership
    if (pendingPayment.user_id !== user.id) {
      // SECURITY: User trying to capture someone else's payment!
      await adminSupabase.from('payment_audit_log').insert({
        user_id: user.id,
        action: 'payment_capture_failed_ownership',
        details: {
          paypal_order_id: orderId,
          actual_owner: pendingPayment.user_id,
          attempted_by: user.id,
        },
        ip_address: ip,
        user_agent: userAgent,
      })

      return NextResponse.json(
        { error: 'Forbidden', message: 'Payment does not belong to you' },
        { status: 403 }
      )
    }

    // Step 5: Check if already captured (idempotency)
    if (pendingPayment.status === 'completed') {
      return NextResponse.json({
        success: true,
        message: 'Payment already processed',
        credits_remaining: 0, // Will be fetched below
      })
    }

    // Step 6: Capture payment with PayPal
    const paypalClient = createPayPalClient()

    const captureRequest = {
      id: orderId,
    }

    const { result: captureResult } = await paypalClient.orders.capture(captureRequest)

    // Step 7: Verify capture success
    if (captureResult.status !== 'COMPLETED') {
      // Update pending payment status
      await adminSupabase
        .from('pending_payments')
        .update({ status: 'failed' })
        .eq('id', pendingPayment.id)

      await adminSupabase.from('payment_audit_log').insert({
        user_id: user.id,
        action: 'payment_capture_failed',
        details: {
          paypal_order_id: orderId,
          status: captureResult.status,
        },
        ip_address: ip,
        user_agent: userAgent,
      })

      return NextResponse.json(
        {
          error: 'Payment failed',
          message: `Payment status: ${captureResult.status}`,
        },
        { status: 400 }
      )
    }

    // Step 8: Verify amount matches (CRITICAL SECURITY CHECK!)
    const paidAmount = parseFloat(
      captureResult.purchaseUnits?.[0]?.payments?.captures?.[0]?.amount?.value || '0'
    )
    const expectedAmount = pendingPayment.amount_euro

    if (Math.abs(paidAmount - expectedAmount) > 0.01) {
      // SECURITY: Amount mismatch detected!
      await adminSupabase.from('payment_audit_log').insert({
        user_id: user.id,
        action: 'payment_capture_amount_mismatch',
        details: {
          paypal_order_id: orderId,
          expected_amount: expectedAmount,
          paid_amount: paidAmount,
        },
        ip_address: ip,
        user_agent: userAgent,
      })

      return NextResponse.json(
        {
          error: 'Payment verification failed',
          message: 'Amount mismatch detected',
        },
        { status: 400 }
      )
    }

    // Step 9: Create transaction record FIRST (before crediting)
    const { data: transaction, error: transactionError } = await adminSupabase
      .from('transactions')
      .insert({
        user_id: user.id,
        type: 'purchase',
        amount_euro: paidAmount,
        credits_amount: pendingPayment.credits_amount,
        status: 'completed',
        payment_provider: 'paypal',
        payment_id: orderId,
        metadata: {
          paypal_capture_id: captureResult.id,
          paypal_payer_email: captureResult.payer?.emailAddress,
          paypal_payer_id: captureResult.payer?.payerId,
        },
      })
      .select()
      .single()

    if (transactionError || !transaction) {
      console.error('Failed to create transaction:', transactionError)
      return NextResponse.json(
        { error: 'Database error', message: 'Failed to record transaction' },
        { status: 500 }
      )
    }

    // Step 10: Credit user account (using database function for safety)
    const { error: creditError } = await adminSupabase.rpc('add_credits', {
      p_user_id: user.id,
      p_credits_amount: pendingPayment.credits_amount,
      p_transaction_id: transaction.id,
    })

    if (creditError) {
      console.error('Failed to add credits:', creditError)

      // Mark transaction as failed
      await adminSupabase
        .from('transactions')
        .update({ status: 'failed' })
        .eq('id', transaction.id)

      return NextResponse.json(
        { error: 'Credit error', message: 'Failed to add credits to account' },
        { status: 500 }
      )
    }

    // Step 11: Update pending payment status
    await adminSupabase
      .from('pending_payments')
      .update({ status: 'completed' })
      .eq('id', pendingPayment.id)

    // Step 12: Audit log successful capture
    await adminSupabase.from('payment_audit_log').insert({
      user_id: user.id,
      action: 'payment_captured_success',
      details: {
        paypal_order_id: orderId,
        amount_euro: paidAmount,
        credits_added: pendingPayment.credits_amount,
        transaction_id: transaction.id,
      },
      ip_address: ip,
      user_agent: userAgent,
    })

    // Step 13: Fetch updated credit balance
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('credits_remaining')
      .eq('id', user.id)
      .single()

    return NextResponse.json({
      success: true,
      message: 'Payment successful! Credits have been added to your account.',
      credits_added: pendingPayment.credits_amount,
      credits_remaining: profile?.credits_remaining || 0,
      transaction_id: transaction.id,
    })
  } catch (error: any) {
    console.error('Capture order error:', error)

    // Log error
    await adminSupabase.from('payment_audit_log').insert({
      user_id: null,
      action: 'payment_capture_error',
      details: {
        error: error.message,
        stack: error.stack?.substring(0, 500),
      },
      ip_address: ip,
      user_agent: userAgent,
    })

    return NextResponse.json(
      {
        error: 'Payment processing failed',
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    )
  }
}
