# PayPal Payment Integration - Vollständige Dokumentation

## 📋 Inhaltsverzeichnis

1. [Übersicht](#übersicht)
2. [Architektur](#architektur)
3. [Features](#features)
4. [Credit Packages](#credit-packages)
5. [Zahlungsfluss](#zahlungsfluss)
6. [Sicherheit](#sicherheit)
7. [Datenbank-Schema](#datenbank-schema)
8. [API Endpoints](#api-endpoints)
9. [Testing](#testing)
10. [Deployment](#deployment)

## Übersicht

### Was wurde implementiert?

Eine **produktionsreife PayPal-Zahlungsintegration** für das ExcelSkills-Kreditkaufsystem mit:

✅ **Vollständiger Zahlungsablauf**: Von der Paketauswahl bis zur Gutschrift
✅ **Höchste Sicherheitsstandards**: PCI-DSS Level 1 compliant
✅ **Benutzerfreundlichkeit**: 3-Click Checkout, PayPal Käuferschutz
✅ **Automatisierung**: Webhooks für Echtzeit-Benachrichtigungen
✅ **Audit Trail**: Vollständige Protokollierung aller Transaktionen
✅ **Fraud Prevention**: Rate Limiting, IP-Tracking, Amount Validation

### Technologie-Stack

- **Payment Provider**: PayPal REST API v2
- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Language**: TypeScript
- **Styling**: Tailwind CSS

## Architektur

### System-Komponenten

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND                           │
├─────────────────────────────────────────────────────────┤
│  /payment                  - Package Selection UI       │
│  /payment/success          - Success Page               │
│  /payment/cancel           - Cancellation Page          │
│  /account/transactions     - Transaction History        │
│  components/PayPalButton   - PayPal SDK Integration     │
└─────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────┐
│                    API ROUTES                           │
├─────────────────────────────────────────────────────────┤
│  POST /api/payment/create-order                         │
│    → Creates PayPal order                               │
│    → Stores pending payment                             │
│    → Rate limiting, IP tracking                         │
│                                                          │
│  POST /api/payment/capture-order                        │
│    → Captures PayPal payment                            │
│    → Multi-layer verification                           │
│    → Atomic credit addition                             │
│                                                          │
│  POST /api/payment/webhook                              │
│    → Receives PayPal notifications                      │
│    → Signature verification                             │
│    → Handles refunds, disputes                          │
└─────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────┐
│                   SUPABASE DATABASE                     │
├─────────────────────────────────────────────────────────┤
│  user_profiles            - User info & balance         │
│  transactions             - Payment records             │
│  pending_payments         - In-progress orders          │
│  payment_audit_log        - Complete audit trail        │
│  rate_limits              - Fraud prevention            │
└─────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────┐
│                    PAYPAL API                           │
├─────────────────────────────────────────────────────────┤
│  Orders API               - Create & capture orders     │
│  Webhooks API             - Event notifications         │
│  Signature Verification   - Webhook security            │
└─────────────────────────────────────────────────────────┘
```

### Datenfluss

```
1. USER wählt Credit Package
   ↓
2. FRONTEND sendet POST zu /api/payment/create-order
   ↓
3. SERVER:
   - Prüft Rate Limits
   - Validiert Package
   - Erstellt PayPal Order
   - Speichert pending_payment
   - Loggt Audit Event
   ↓
4. FRONTEND öffnet PayPal Checkout Popup
   ↓
5. USER zahlt bei PayPal
   ↓
6. PAYPAL leitet zurück an App
   ↓
7. FRONTEND sendet POST zu /api/payment/capture-order
   ↓
8. SERVER:
   - Verifiziert Order Ownership
   - Captured Payment bei PayPal
   - Validiert Amount (Server-side!)
   - Fügt Credits hinzu (atomically)
   - Erstellt Transaction Record
   - Updated pending_payment
   ↓
9. FRONTEND zeigt Success Page
   ↓
10. PAYPAL sendet Webhook zu /api/payment/webhook
    ↓
11. SERVER:
    - Verifiziert Signature
    - Bestätigt Payment (Idempotent)
    - Handelt Refunds/Disputes
```

## Features

### 1. Credit Packages

4 vordefinierte Pakete mit Bonus-Credits:

| Package  | Preis | Credits | Bonus  | Total  | Beliebt |
|----------|-------|---------|--------|--------|---------|
| Starter  | 5€    | 5       | 0      | 5      | -       |
| Standard | 10€   | 10      | 0      | 10     | ✅      |
| Plus     | 25€   | 25      | 1.25   | 26.25  | -       |
| Pro      | 50€   | 50      | 5      | 55     | -       |

**Bonus-Berechnung:**
- Plus: 5% Bonus (25 × 0.05 = 1.25)
- Pro: 10% Bonus (50 × 0.10 = 5)

### 2. Payment UI Features

✅ **Responsive Design**: Mobile-first, alle Bildschirmgrößen
✅ **Trust Badges**: SSL, GDPR, PayPal Käuferschutz
✅ **Package Selection**: Visuelles Feedback, "Beliebt" Badge
✅ **Price Display**: Euro-Preise, Credit-Anzahl prominent
✅ **PayPal Button**: Offizielles PayPal SDK, Branding
✅ **FAQ Section**: Häufig gestellte Fragen inline
✅ **Success Animation**: Animated Checkmark, Konfetti-Effekt
✅ **Error Handling**: Nutzerfreundliche Fehlermeldungen

### 3. Security Features

#### PCI-DSS Compliance

✅ **Keine Kartendaten gespeichert**: PayPal handled alle Payment Data
✅ **HTTPS Only**: Alle Kommunikation verschlüsselt
✅ **Server-side Processing**: Kritische Logik nur Backend
✅ **Audit Logging**: Vollständige Nachvollziehbarkeit

#### Fraud Prevention

✅ **Rate Limiting**: Max 5 Payment Attempts/Stunde pro User
✅ **IP Tracking**: Alle Requests werden geloggt
✅ **Amount Validation**: Server prüft Euro-Betrag (nicht Client!)
✅ **Ownership Verification**: User kann nur eigene Orders capturen
✅ **Idempotency Checks**: Verhindert Doppel-Buchungen

#### Webhook Security

✅ **Signature Verification**: PayPal Public Key Verification
✅ **Idempotent Processing**: Doppelte Webhooks werden ignoriert
✅ **Audit Logging**: Alle Events werden protokolliert
✅ **Graceful Error Handling**: Fehler werden geloggt, nicht retried

### 4. Transaction Management

✅ **Complete History**: Alle Transaktionen einsehbar
✅ **Multiple Types**: Purchase, Refund, Deduction
✅ **Status Tracking**: Completed, Pending, Failed
✅ **Receipt Download**: Placeholder für PDF-Belege
✅ **Real-time Updates**: Sofortige Aktualisierung nach Payment

## Credit Packages

### Definition (lib/paypal/client.ts)

```typescript
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
    popular: true, // Badge in UI
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
```

### Helper Functions

```typescript
// Get package by ID
const pkg = getPackageById('standard') // Returns STANDARD package

// Calculate total credits including bonus
const total = calculateTotalCredits('PLUS') // Returns 26.25
```

## Zahlungsfluss

### 1. Create Order

**Endpoint:** `POST /api/payment/create-order`

**Request:**
```json
{
  "packageId": "standard"
}
```

**Verarbeitung:**
1. ✅ User Authentication Check
2. ✅ Rate Limit Check (5/hour)
3. ✅ Package Validation
4. ✅ PayPal Order Creation
5. ✅ Pending Payment Storage
6. ✅ Audit Log Entry

**Response:**
```json
{
  "orderId": "8XY123456789",
  "totalCredits": 10
}
```

**Error Cases:**
- 401: Not authenticated
- 429: Rate limit exceeded
- 400: Invalid package
- 500: PayPal API error

### 2. Capture Order

**Endpoint:** `POST /api/payment/capture-order`

**Request:**
```json
{
  "orderId": "8XY123456789"
}
```

**Multi-Layer Verification:**

1. **Authentication**: User logged in?
2. **Pending Payment Exists**: Order in DB?
3. **Ownership**: User's order?
4. **Not Already Processed**: Idempotency check
5. **PayPal Capture**: Execute capture
6. **Status Check**: Payment COMPLETED?
7. **Amount Validation**: Server-side verification!
8. **Transaction Creation**: Atomic operation
9. **Credit Addition**: Via PostgreSQL function

**KRITISCH: Amount Validation**

```typescript
// Server validates the ACTUAL paid amount
const paidAmount = parseFloat(
  captureResult.purchaseUnits?.[0]?.payments?.captures?.[0]?.amount?.value || '0'
)

if (Math.abs(paidAmount - expectedAmount) > 0.01) {
  // SECURITY BREACH: Amount mismatch!
  await auditLog('amount_mismatch', { expected, actual: paidAmount })
  return { error: 'Amount mismatch' }
}
```

**Response:**
```json
{
  "success": true,
  "credits": 10,
  "newBalance": 25.5
}
```

### 3. Webhook Processing

**Endpoint:** `POST /api/payment/webhook`

**Signature Verification:**
```typescript
// PayPal sends these headers:
const transmissionId = request.headers.get('paypal-transmission-id')
const transmissionTime = request.headers.get('paypal-transmission-time')
const transmissionSig = request.headers.get('paypal-transmission-sig')

// Verify signature using PayPal's Public Key
const isValid = verifyWebhookSignature(headers, body)
if (!isValid) {
  return 401 // Reject invalid webhooks
}
```

**Event Types:**

1. **PAYMENT.CAPTURE.COMPLETED**
   - Bestätigt erfolgreiche Zahlung
   - Idempotency-Check (bereits verarbeitet?)
   - Updated pending_payment Status

2. **PAYMENT.CAPTURE.REFUNDED**
   - Findet Original-Transaktion
   - Deducts Credits from User
   - Creates Refund Transaction Record

3. **PAYMENT.CAPTURE.DENIED**
   - Marks pending_payment as failed
   - Logs event for investigation

## Sicherheit

Siehe separate Datei: [PAYMENT_SECURITY.md](./PAYMENT_SECURITY.md)

## Datenbank-Schema

### user_profiles

```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  credits_remaining DECIMAL(10,2) DEFAULT 10.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Row Level Security:**
```sql
-- Users can only see their own profile
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);
```

### transactions

```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id),
  type TEXT NOT NULL CHECK (type IN ('purchase', 'refund', 'deduction')),
  amount_euro DECIMAL(10,2) NOT NULL,
  credits_amount DECIMAL(10,2) NOT NULL,
  paypal_order_id TEXT,
  status TEXT DEFAULT 'completed',
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Indexes:**
```sql
CREATE INDEX idx_transactions_user ON transactions(user_id);
CREATE INDEX idx_transactions_paypal ON transactions(paypal_order_id);
CREATE INDEX idx_transactions_created ON transactions(created_at DESC);
```

### pending_payments

```sql
CREATE TABLE pending_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id),
  paypal_order_id TEXT UNIQUE NOT NULL,
  amount_euro DECIMAL(10,2) NOT NULL,
  credits_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'created',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);
```

### payment_audit_log

```sql
CREATE TABLE payment_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  user_id UUID REFERENCES user_profiles(id),
  paypal_order_id TEXT,
  amount_euro DECIMAL(10,2),
  ip_address INET,
  user_agent TEXT,
  status TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Retention Policy:**
```sql
-- Delete logs older than 2 years (GDPR compliance)
DELETE FROM payment_audit_log
WHERE created_at < NOW() - INTERVAL '2 years';
```

### rate_limits

```sql
CREATE TABLE rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id),
  action TEXT NOT NULL,
  count INTEGER DEFAULT 1,
  window_start TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## API Endpoints

### POST /api/payment/create-order

Creates a PayPal order for credit purchase.

**Authentication:** Required

**Rate Limit:** 5 requests/hour

**Request Body:**
```typescript
{
  packageId: 'starter' | 'standard' | 'plus' | 'pro'
}
```

**Success Response (200):**
```typescript
{
  orderId: string  // PayPal Order ID
  totalCredits: number
}
```

**Error Responses:**
- `401 Unauthorized`: User not authenticated
- `429 Too Many Requests`: Rate limit exceeded
- `400 Bad Request`: Invalid package ID
- `500 Internal Server Error`: PayPal API error

### POST /api/payment/capture-order

Captures a PayPal payment and credits user account.

**Authentication:** Required

**Request Body:**
```typescript
{
  orderId: string  // PayPal Order ID from create-order
}
```

**Success Response (200):**
```typescript
{
  success: true
  credits: number        // Credits added
  newBalance: number     // New total balance
}
```

**Error Responses:**
- `401 Unauthorized`: User not authenticated
- `400 Bad Request`:
  - Order not found
  - Not user's order
  - Already processed
  - Amount mismatch
- `500 Internal Server Error`: PayPal capture failed

### POST /api/payment/webhook

Receives PayPal webhook notifications.

**Authentication:** PayPal Signature Verification

**Request Headers:**
```
paypal-transmission-id: string
paypal-transmission-time: string
paypal-transmission-sig: string
paypal-cert-url: string
paypal-auth-algo: string
```

**Request Body:** PayPal Webhook Event

**Response (200):**
```typescript
{
  received: true
}
```

## Testing

Siehe separate Datei: [PAYMENT_TESTING.md](./PAYMENT_TESTING.md)

## Deployment

### Environment Variables

**Required for Production:**

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# PayPal Production
NEXT_PUBLIC_PAYPAL_CLIENT_ID_PRODUCTION=your-prod-client-id
PAYPAL_CLIENT_SECRET_PRODUCTION=your-prod-secret
PAYPAL_WEBHOOK_ID=your-prod-webhook-id
NEXT_PUBLIC_PAYPAL_ENV=production

# WICHTIG: Disable development bypass!
PAYPAL_WEBHOOK_SKIP_VERIFY=false

# App Configuration
NEXT_PUBLIC_APP_URL=https://excelskills.com
```

### Pre-Deployment Checklist

- [ ] PayPal Production App erstellt
- [ ] Webhook mit Production URL konfiguriert
- [ ] Environment Variables gesetzt (Vercel/Railway/etc)
- [ ] `PAYPAL_WEBHOOK_SKIP_VERIFY=false` verifiziert
- [ ] Datenbank-Migrationen ausgeführt
- [ ] RLS Policies aktiviert
- [ ] Test-Zahlung durchgeführt
- [ ] Webhook-Empfang getestet
- [ ] Transaction History überprüft
- [ ] Error Monitoring konfiguriert (Sentry/etc)
- [ ] Backup-Strategie implementiert

### Monitoring

**Metriken zu überwachen:**

1. **Payment Success Rate**: % erfolgreicher Zahlungen
2. **Average Transaction Value**: Durchschnittlicher Kaufbetrag
3. **Webhook Delivery Rate**: % empfangener Webhooks
4. **Error Rate**: API-Fehlerquote
5. **Rate Limit Hits**: Anzahl blockierter Requests

**Alerts einrichten für:**

- Payment Success Rate < 95%
- Webhook Failures > 5%
- API Error Rate > 1%
- Ungewöhnlich hohe Transaction Volumes
- Amount Mismatch Detections

### Backup & Recovery

**Tägliche Backups:**
- Supabase: Automatische Backups (Point-in-Time Recovery)
- Audit Logs: Exportieren & Archivieren

**Disaster Recovery Plan:**
1. Datenbank auf letzten stabilen Zustand zurücksetzen
2. Fehlende Transaktionen aus PayPal reconcilieren
3. User Credits manuell korrigieren falls nötig
4. Webhook-Events erneut verarbeiten

## Support & Troubleshooting

### Häufige Probleme

**Problem:** User erhält keine Credits nach Zahlung

**Lösung:**
1. Prüfe `transactions` Tabelle für Order ID
2. Prüfe `pending_payments` Status
3. Prüfe `payment_audit_log` für Fehler
4. PayPal Dashboard → Order Details prüfen
5. Webhook Delivery Status prüfen

**Problem:** Webhook wird nicht empfangen

**Lösung:**
1. Webhook URL in PayPal Dashboard prüfen
2. Server-Logs auf 401/500 Fehler prüfen
3. Signature Verification Logs prüfen
4. PayPal Webhook Simulator testen

### Support-Kontakte

- **PayPal Developer Support**: https://developer.paypal.com/support/
- **Supabase Support**: https://supabase.com/support
- **Interner Support**: [Email/Slack Channel]

## Weitere Ressourcen

- [PayPal Webhook Setup Guide](./PAYPAL_WEBHOOK_SETUP.md)
- [Security Documentation](./PAYMENT_SECURITY.md)
- [Testing Guide](./PAYMENT_TESTING.md)
- [PayPal Orders API](https://developer.paypal.com/docs/api/orders/v2/)
- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
