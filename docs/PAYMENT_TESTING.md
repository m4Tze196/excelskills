# Payment Testing Guide

## 📋 Übersicht

Vollständiger Test-Guide für die PayPal-Zahlungsintegration.

**Was wird getestet:**
1. ✅ Complete Payment Flow (End-to-End)
2. ✅ Security Features (Rate Limiting, Validation)
3. ✅ Error Handling
4. ✅ Webhook Processing
5. ✅ Database Integrity

## Test-Umgebungen

### 1. Local Development

**Setup:**
```bash
# 1. Install dependencies
npm install

# 2. Configure .env.local
cp .env.example .env.local
# Add your Supabase & PayPal Sandbox credentials

# 3. Run migrations
npm run db:migrate

# 4. Start dev server
npm run dev
```

**Access:**
- Frontend: http://localhost:3000
- API: http://localhost:3000/api

### 2. PayPal Sandbox

**Setup:**
1. Gehe zu https://developer.paypal.com/dashboard
2. Melde dich an
3. Wähle **Sandbox** Environment
4. Nutze Sandbox Test Accounts

**Test Accounts:**

PayPal erstellt automatisch:
- **Personal Account** (Buyer): Zum Testen von Zahlungen
- **Business Account** (Seller): Dein App-Account

**Test Credit Cards:**

| Card Type  | Number              | Exp   | CVV |
|------------|---------------------|-------|-----|
| Visa       | 4032039933765469    | 02/27 | 123 |
| Mastercard | 5425233430109903    | 02/27 | 123 |
| Amex       | 374245455400001     | 02/27 | 1234|

### 3. Staging Environment

**URL:** https://staging.excelskills.com

**Credentials:**
- PayPal: Sandbox Mode
- Supabase: Separate Staging Project
- Same as Production setup

## Test Cases

### TC-001: Successful Payment Flow

**Ziel:** User kauft Credits erfolgreich

**Voraussetzungen:**
- User ist eingeloggt
- Genug PayPal Balance (Sandbox)

**Schritte:**

1. Navigiere zu `/payment`
2. Wähle "Standard" Package (10€ / 10 Credits)
3. Klicke "Buy Credits"
4. PayPal Popup öffnet sich
5. Logge ein mit Sandbox Buyer Account
6. Bestätige Zahlung
7. Warte auf Redirect zur Success Page

**Erwartetes Ergebnis:**

✅ **Frontend:**
- Success Page wird angezeigt
- "Payment Successful" Message
- Credits Added angezeigt (10)
- New Balance sichtbar

✅ **Database:**
```sql
-- Check transaction was created
SELECT * FROM transactions
WHERE user_id = 'YOUR_USER_ID'
AND type = 'purchase'
ORDER BY created_at DESC
LIMIT 1;

-- Result should show:
-- type: 'purchase'
-- amount_euro: 10.00
-- credits_amount: 10.00
-- status: 'completed'
```

✅ **User Profile:**
```sql
-- Check credits were added
SELECT credits_remaining FROM user_profiles
WHERE id = 'YOUR_USER_ID';

-- Credits should be increased by 10
```

✅ **Audit Log:**
```sql
-- Check all events were logged
SELECT event_type, status FROM payment_audit_log
WHERE user_id = 'YOUR_USER_ID'
ORDER BY created_at DESC
LIMIT 3;

-- Should show:
-- 1. 'order_created' - success
-- 2. 'payment_captured' - success
-- 3. 'credits_added' - success
```

---

### TC-002: Payment Cancellation

**Ziel:** User bricht Zahlung ab

**Schritte:**

1. Navigiere zu `/payment`
2. Wähle Package
3. Klicke "Buy Credits"
4. PayPal Popup öffnet sich
5. **Klicke "Cancel"** in PayPal

**Erwartetes Ergebnis:**

✅ **Frontend:**
- Redirect zu `/payment/cancel`
- "Payment Cancelled" Message
- Option to retry

✅ **Database:**
```sql
-- No transaction should be created
SELECT * FROM transactions
WHERE paypal_order_id = 'ORDER_ID';
-- Should return 0 rows

-- Pending payment might exist
SELECT status FROM pending_payments
WHERE paypal_order_id = 'ORDER_ID';
-- status: 'created' (not completed)
```

---

### TC-003: Rate Limiting

**Ziel:** Rate Limit schützt vor Spam

**Schritte:**

1. Erstelle 6 Zahlungen innerhalb 1 Stunde:
   ```bash
   for i in {1..6}; do
     curl -X POST http://localhost:3000/api/payment/create-order \
       -H "Content-Type: application/json" \
       -H "Cookie: YOUR_SESSION_COOKIE" \
       -d '{"packageId":"starter"}'
   done
   ```

**Erwartetes Ergebnis:**

✅ **First 5 Requests:**
- HTTP 200 OK
- Order ID returned

❌ **6th Request:**
- HTTP 429 Too Many Requests
- Error: "Rate limit exceeded"

✅ **Database:**
```sql
SELECT count FROM rate_limits
WHERE user_id = 'YOUR_USER_ID'
AND action = 'create_order';
-- count: 5
```

---

### TC-004: Amount Validation

**Ziel:** Server erkennt manipulierte Beträge

**Schritte:**

1. Erstelle Order für 5€ Package:
   ```bash
   curl -X POST http://localhost:3000/api/payment/create-order \
     -H "Content-Type: application/json" \
     -d '{"packageId":"starter"}' # 5€
   ```

2. Simuliere PayPal Response mit falschem Betrag:
   ```typescript
   // In capture-order route temporarily modify:
   const paidAmount = 50.00 // Instead of actual 5.00
   ```

**Erwartetes Ergebnis:**

❌ **Capture fails:**
- HTTP 400 Bad Request
- Error: "Amount mismatch detected"

✅ **Audit Log:**
```sql
SELECT * FROM payment_audit_log
WHERE event_type = 'amount_mismatch_detected';

-- Should show:
-- metadata: {
--   expected: 5.00,
--   actual: 50.00,
--   order_id: 'ORDER_ID'
-- }
```

---

### TC-005: Ownership Verification

**Ziel:** User kann nur eigene Orders capturen

**Schritte:**

1. User A erstellt Order
2. User B versucht Order zu capturen:
   ```bash
   curl -X POST http://localhost:3000/api/payment/capture-order \
     -H "Cookie: USER_B_SESSION" \
     -d '{"orderId":"USER_A_ORDER_ID"}'
   ```

**Erwartetes Ergebnis:**

❌ **Capture fails:**
- HTTP 400 Bad Request
- Error: "Order not found" (or "Unauthorized")

✅ **Audit Log:**
```sql
SELECT * FROM payment_audit_log
WHERE event_type = 'unauthorized_capture_attempt';
-- Should log the attempt
```

---

### TC-006: Idempotency Check

**Ziel:** Doppelte Captures werden verhindert

**Schritte:**

1. Erstelle und capture Order erfolgreich
2. Versuche dieselbe Order erneut zu capturen:
   ```bash
   curl -X POST http://localhost:3000/api/payment/capture-order \
     -d '{"orderId":"ALREADY_CAPTURED_ORDER_ID"}'
   ```

**Erwartetes Ergebnis:**

❌ **Second capture fails:**
- HTTP 400 Bad Request
- Error: "Order already processed"

✅ **Database:**
```sql
-- Only ONE transaction should exist
SELECT COUNT(*) FROM transactions
WHERE paypal_order_id = 'ORDER_ID';
-- COUNT: 1 (not 2!)
```

---

### TC-007: Webhook Processing

**Ziel:** Webhooks werden korrekt verarbeitet

**Schritte:**

1. Nutze PayPal Webhook Simulator:
   - Gehe zu https://developer.paypal.com/dashboard
   - Apps & Credentials > Your App > Webhooks
   - Klicke "Webhook events > Show"
   - Wähle "PAYMENT.CAPTURE.COMPLETED"
   - Klicke "Send Test"

2. Oder nutze curl:
   ```bash
   curl -X POST http://localhost:3000/api/payment/webhook \
     -H "Content-Type: application/json" \
     -d '{
       "event_type": "PAYMENT.CAPTURE.COMPLETED",
       "resource": {
         "id": "CAPTURE_ID",
         "amount": { "value": "10.00", "currency_code": "EUR" },
         "supplementary_data": {
           "related_ids": { "order_id": "YOUR_ORDER_ID" }
         }
       }
     }'
   ```

**Erwartetes Ergebnis:**

✅ **Webhook accepted:**
- HTTP 200 OK
- Response: `{"received":true}`

✅ **Database:**
```sql
-- Webhook event logged
SELECT * FROM payment_audit_log
WHERE event_type = 'webhook_received'
ORDER BY created_at DESC
LIMIT 1;

-- Pending payment updated
SELECT status FROM pending_payments
WHERE paypal_order_id = 'ORDER_ID';
-- status: 'completed'
```

---

### TC-008: Refund Processing

**Ziel:** Refunds werden korrekt verarbeitet

**Schritte:**

1. Erstelle erfolgreiche Zahlung (TC-001)
2. Refund über PayPal Dashboard:
   - Gehe zu PayPal Sandbox Dashboard
   - Finde die Transaction
   - Klicke "Refund"

3. Oder sende Refund Webhook:
   ```bash
   curl -X POST http://localhost:3000/api/payment/webhook \
     -H "Content-Type: application/json" \
     -d '{
       "event_type": "PAYMENT.CAPTURE.REFUNDED",
       "resource": {
         "amount": { "value": "10.00" },
         "supplementary_data": {
           "related_ids": { "order_id": "ORDER_ID" }
         }
       }
     }'
   ```

**Erwartetes Ergebnis:**

✅ **Credits deducted:**
```sql
SELECT credits_remaining FROM user_profiles
WHERE id = 'USER_ID';
-- Credits reduced by 10
```

✅ **Refund transaction created:**
```sql
SELECT * FROM transactions
WHERE type = 'refund'
AND paypal_order_id = 'ORDER_ID';

-- Should show:
-- type: 'refund'
-- amount_euro: -10.00
-- credits_amount: -10.00
```

---

### TC-009: Failed Payment

**Ziel:** Fehlgeschlagene Zahlungen werden korrekt behandelt

**Schritte:**

1. Nutze PayPal Test Card mit insufficient funds
2. Oder sende Denied Webhook:
   ```bash
   curl -X POST http://localhost:3000/api/payment/webhook \
     -H "Content-Type: application/json" \
     -d '{
       "event_type": "PAYMENT.CAPTURE.DENIED",
       "resource": {
         "supplementary_data": {
           "related_ids": { "order_id": "ORDER_ID" }
         }
       }
     }'
   ```

**Erwartetes Ergebnis:**

✅ **Pending payment marked failed:**
```sql
SELECT status FROM pending_payments
WHERE paypal_order_id = 'ORDER_ID';
-- status: 'failed'
```

❌ **No credits added:**
```sql
SELECT COUNT(*) FROM transactions
WHERE paypal_order_id = 'ORDER_ID'
AND type = 'purchase';
-- COUNT: 0
```

---

### TC-010: Transaction History

**Ziel:** User kann Transaction History sehen

**Schritte:**

1. Erstelle mehrere Zahlungen (verschiedene Packages)
2. Navigiere zu `/account/transactions`

**Erwartetes Ergebnis:**

✅ **Page displays:**
- Current credit balance
- Table with all transactions:
  - Date & Time
  - Type (Purchase/Refund/Deduction)
  - Amount (€)
  - Credits
  - Status
- Color-coded status badges
- Sorted by date (newest first)

✅ **Data accuracy:**
- All transactions present
- Amounts match database
- Balance matches profile

## Automated Tests

### Unit Tests

**Test Payment Utilities:**

```typescript
// lib/paypal/__tests__/client.test.ts
import { getPackageById, calculateTotalCredits } from '../client'

describe('Payment Utilities', () => {
  it('should get package by ID', () => {
    const pkg = getPackageById('standard')
    expect(pkg?.euro).toBe(10)
    expect(pkg?.credits).toBe(10)
  })

  it('should calculate total credits with bonus', () => {
    const total = calculateTotalCredits('PLUS')
    expect(total).toBe(26.25) // 25 + 1.25 bonus
  })

  it('should return null for invalid package', () => {
    const pkg = getPackageById('invalid')
    expect(pkg).toBeNull()
  })
})
```

**Run tests:**
```bash
npm test -- lib/paypal
```

### Integration Tests

**Test API Routes:**

```typescript
// __tests__/api/payment/create-order.test.ts
import { POST } from '@/app/api/payment/create-order/route'

describe('POST /api/payment/create-order', () => {
  it('should create order for valid package', async () => {
    const request = new Request('http://localhost/api/payment/create-order', {
      method: 'POST',
      body: JSON.stringify({ packageId: 'standard' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.orderId).toBeDefined()
    expect(data.totalCredits).toBe(10)
  })

  it('should reject invalid package', async () => {
    const request = new Request('http://localhost/api/payment/create-order', {
      method: 'POST',
      body: JSON.stringify({ packageId: 'invalid' }),
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
  })
})
```

### E2E Tests (Playwright)

```typescript
// e2e/payment.spec.ts
import { test, expect } from '@playwright/test'

test('complete payment flow', async ({ page }) => {
  // 1. Login
  await page.goto('/auth/login')
  await page.fill('[name="email"]', 'test@example.com')
  await page.fill('[name="password"]', 'password123')
  await page.click('button[type="submit"]')

  // 2. Go to payment page
  await page.goto('/payment')
  await expect(page.locator('h1')).toContainText('Buy Credits')

  // 3. Select package
  await page.click('[data-package="standard"]')

  // 4. PayPal popup would open here
  // (Requires PayPal Sandbox automation or mocking)
})
```

**Run E2E tests:**
```bash
npm run test:e2e
```

## Load Testing

### Test Payment System under Load

**Tool:** Artillery

```yaml
# load-test.yml
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 60
      arrivalRate: 10 # 10 users/sec
scenarios:
  - name: 'Create Payment Orders'
    flow:
      - post:
          url: '/api/payment/create-order'
          json:
            packageId: 'standard'
          headers:
            Cookie: '{{ sessionCookie }}'
```

**Run:**
```bash
artillery run load-test.yml
```

**Monitor:**
- Response times
- Error rates
- Database connections
- Rate limit triggers

## Testing Checklist

### Before Each Release

- [ ] All unit tests passing
- [ ] All integration tests passing
- [ ] E2E happy path tested
- [ ] Rate limiting verified
- [ ] Amount validation tested
- [ ] Idempotency verified
- [ ] Webhook processing tested
- [ ] Refund flow tested
- [ ] Transaction history accurate
- [ ] Error messages user-friendly

### Production Smoke Test

- [ ] Test payment with 5€ package
- [ ] Verify credits added
- [ ] Check transaction history
- [ ] Test webhook received
- [ ] Audit logs present
- [ ] Refund test payment
- [ ] Verify credits deducted

## Debugging Tips

### Payment not completing?

1. Check browser console for errors
2. Check server logs (`npm run dev`)
3. Check PayPal Sandbox Dashboard
4. Check Supabase logs
5. Verify environment variables

### Webhook not received?

1. Check ngrok tunnel running
2. Verify webhook URL in PayPal
3. Check server logs for 401/500
4. Test with PayPal Simulator
5. Verify signature validation disabled in dev

### Credits not added?

1. Check `transactions` table
2. Check `pending_payments` status
3. Check `payment_audit_log` for errors
4. Verify RLS policies allow insert
5. Check server logs for SQL errors

## Ressourcen

- [PayPal Sandbox](https://developer.paypal.com/dashboard)
- [PayPal Webhook Simulator](https://developer.paypal.com/dashboard/webhooks/simulator)
- [Supabase Logs](https://supabase.com/dashboard/project/_/logs)
- [Testing Best Practices](./PAYMENT_INTEGRATION.md#testing)
