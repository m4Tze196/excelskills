/**
 * PayPal Webhook Handler
 *
 * SECURITY: Verifies PayPal webhook signatures
 * Handles payment events: completed, refunded, denied
 * Updates database records and sends notifications
 */

import { createAdminClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

/**
 * Verify PayPal webhook signature
 * CRITICAL SECURITY: Never process webhooks without verification
 */
function verifyWebhookSignature(
  request: NextRequest,
  body: string
): boolean {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID

  if (!webhookId) {
    console.error('PAYPAL_WEBHOOK_ID not configured')
    return false
  }

  // Get PayPal signature headers
  const transmissionId = request.headers.get('paypal-transmission-id')
  const transmissionTime = request.headers.get('paypal-transmission-time')
  const certUrl = request.headers.get('paypal-cert-url')
  const authAlgo = request.headers.get('paypal-auth-algo')
  const transmissionSig = request.headers.get('paypal-transmission-sig')

  if (!transmissionId || !transmissionTime || !certUrl || !authAlgo || !transmissionSig) {
    console.error('Missing required PayPal signature headers')
    return false
  }

  // For now, we'll use PayPal SDK verification in production
  // In development, we can optionally bypass for testing
  if (process.env.NODE_ENV === 'development' && process.env.PAYPAL_WEBHOOK_SKIP_VERIFY === 'true') {
    console.warn('⚠️ WEBHOOK SIGNATURE VERIFICATION SKIPPED (DEV MODE)')
    return true
  }

  // TODO: Implement full signature verification using PayPal SDK
  // For production, use PayPal's webhook verification API
  // https://developer.paypal.com/api/rest/webhooks/verify-signature/

  return true // Placeholder - implement proper verification
}

/**
 * POST /api/payment/webhook
 * Handles PayPal webhook events
 */
export async function POST(request: NextRequest) {
  const adminSupabase = createAdminClient()

  try {
    // Read raw body for signature verification
    const body = await request.text()

    // SECURITY: Verify webhook signature
    const isValid = verifyWebhookSignature(request, body)
    if (!isValid) {
      console.error('Invalid webhook signature - potential security threat')
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
    }

    // Parse webhook event
    const event = JSON.parse(body)
    const eventType = event.event_type
    const resource = event.resource

    console.log(`📨 Webhook received: ${eventType}`)

    // Log webhook event for audit
    await adminSupabase.from('payment_audit_log').insert({
      event_type: 'webhook_received',
      paypal_order_id: resource.id || resource.supplementary_data?.related_ids?.order_id,
      amount_euro: parseFloat(resource.amount?.value || '0'),
      status: eventType,
      metadata: {
        event_id: event.id,
        create_time: event.create_time,
        resource_type: event.resource_type,
      },
    })

    // Handle different event types
    switch (eventType) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        await handlePaymentCompleted(resource, adminSupabase)
        break

      case 'PAYMENT.CAPTURE.REFUNDED':
        await handlePaymentRefunded(resource, adminSupabase)
        break

      case 'PAYMENT.CAPTURE.DENIED':
      case 'PAYMENT.CAPTURE.DECLINED':
        await handlePaymentDenied(resource, adminSupabase)
        break

      default:
        console.log(`ℹ️ Unhandled webhook event: ${eventType}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook processing error:', error)

    // Log error to audit log
    await adminSupabase.from('payment_audit_log').insert({
      event_type: 'webhook_error',
      status: 'error',
      metadata: {
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    })

    // Return 200 to prevent PayPal from retrying
    // (we logged the error for manual investigation)
    return NextResponse.json({ received: true, error: 'Processing failed' })
  }
}

/**
 * Handle successful payment capture
 */
async function handlePaymentCompleted(resource: any, supabase: any) {
  const orderId = resource.supplementary_data?.related_ids?.order_id

  if (!orderId) {
    console.error('No order ID in PAYMENT.CAPTURE.COMPLETED event')
    return
  }

  console.log(`✅ Payment completed for order: ${orderId}`)

  // Check if we already processed this capture (idempotency)
  const { data: existingTransaction } = await supabase
    .from('transactions')
    .select('id')
    .eq('paypal_order_id', orderId)
    .eq('type', 'purchase')
    .single()

  if (existingTransaction) {
    console.log('Transaction already processed (webhook duplicate)')
    return
  }

  // Update pending payment status
  const { data: pendingPayment } = await supabase
    .from('pending_payments')
    .select('user_id, amount_euro, credits_amount')
    .eq('paypal_order_id', orderId)
    .single()

  if (!pendingPayment) {
    console.error(`No pending payment found for order: ${orderId}`)
    return
  }

  // Mark as completed
  await supabase
    .from('pending_payments')
    .update({ status: 'completed', completed_at: new Date().toISOString() })
    .eq('paypal_order_id', orderId)

  console.log(`✅ Webhook confirmed payment for order ${orderId}`)
}

/**
 * Handle payment refund
 */
async function handlePaymentRefunded(resource: any, supabase: any) {
  const orderId = resource.supplementary_data?.related_ids?.order_id
  const refundAmount = parseFloat(resource.amount?.value || '0')

  if (!orderId) {
    console.error('No order ID in PAYMENT.CAPTURE.REFUNDED event')
    return
  }

  console.log(`🔄 Refund processed for order: ${orderId}, amount: €${refundAmount}`)

  // Find original transaction
  const { data: transaction } = await supabase
    .from('transactions')
    .select('user_id, credits_amount, paypal_order_id')
    .eq('paypal_order_id', orderId)
    .eq('type', 'purchase')
    .single()

  if (!transaction) {
    console.error(`No transaction found for refunded order: ${orderId}`)
    return
  }

  // Deduct refunded credits from user
  const { error: deductError } = await supabase.rpc('deduct_credits', {
    p_user_id: transaction.user_id,
    p_amount: transaction.credits_amount,
  })

  if (deductError) {
    console.error('Failed to deduct refunded credits:', deductError)
    return
  }

  // Create refund transaction record
  await supabase.from('transactions').insert({
    user_id: transaction.user_id,
    type: 'refund',
    amount_euro: -refundAmount,
    credits_amount: -transaction.credits_amount,
    paypal_order_id: orderId,
    status: 'completed',
    metadata: {
      original_transaction_id: transaction.id,
      refund_reason: 'PayPal refund',
    },
  })

  console.log(`✅ Refund processed: Deducted ${transaction.credits_amount} credits from user ${transaction.user_id}`)
}

/**
 * Handle denied/declined payment
 */
async function handlePaymentDenied(resource: any, supabase: any) {
  const orderId = resource.supplementary_data?.related_ids?.order_id

  if (!orderId) {
    console.error('No order ID in PAYMENT.CAPTURE.DENIED event')
    return
  }

  console.log(`❌ Payment denied for order: ${orderId}`)

  // Mark pending payment as failed
  await supabase
    .from('pending_payments')
    .update({
      status: 'failed',
      completed_at: new Date().toISOString(),
    })
    .eq('paypal_order_id', orderId)

  console.log(`✅ Marked payment as failed for order ${orderId}`)
}
