# Payment Security - Sicherheitskonzept

## 🔒 Übersicht

Dieses Dokument beschreibt alle Sicherheitsmaßnahmen der PayPal-Zahlungsintegration.

**Sicherheitsziele:**
1. ✅ PCI-DSS Level 1 Compliance
2. ✅ GDPR Compliance (EU-Datenschutz)
3. ✅ Fraud Prevention (Betrugsschutz)
4. ✅ Data Privacy (Datenschutz)
5. ✅ Audit Trail (Nachvollziehbarkeit)

## PCI-DSS Compliance

### Was ist PCI-DSS?

**Payment Card Industry Data Security Standard** - Sicherheitsstandard für Kreditkartendaten.

**Level 1**: Strengstes Level für Merchants mit >6M Transaktionen/Jahr.

### Compliance-Maßnahmen

#### 1. Keine Kartendaten gespeichert

✅ **PayPal handelt alle Payment Data**
- Keine Kreditkartennummern
- Keine CVV Codes
- Keine Ablaufdaten
- Keine Cardholder Names

```typescript
// ❌ FALSCH - NIEMALS MACHEN!
const cardNumber = request.body.cardNumber // Illegal!

// ✅ RICHTIG - PayPal handled alles
const orderId = await paypal.createOrder({
  amount: { value: '10.00', currency_code: 'EUR' }
})
```

#### 2. HTTPS Obligatorisch

✅ **Alle Kommunikation verschlüsselt**

```typescript
// next.config.ts
export default {
  // Force HTTPS redirect
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
        destination: 'https://excelskills.com/:path*',
        permanent: true,
      },
    ]
  },
}
```

#### 3. Server-Side Processing

✅ **Kritische Operationen nur Backend**

```typescript
// ❌ FALSCH - Client-side ist unsicher!
function addCredits(userId: string, credits: number) {
  // Kann manipuliert werden!
  localStorage.setItem('credits', credits)
}

// ✅ RICHTIG - Server-side ist sicher
async function addCredits(userId: string, credits: number) {
  // Server validiert ALLES
  const result = await supabase.rpc('add_credits', {
    p_user_id: userId,
    p_amount: credits,
  })
  return result
}
```

#### 4. Audit Logging

✅ **Vollständige Nachvollziehbarkeit**

Alle Payment-Events werden geloggt:
- Order Creation
- Payment Capture
- Webhook Receipt
- Amount Mismatches
- Errors

```typescript
await supabase.from('payment_audit_log').insert({
  event_type: 'order_created',
  user_id: user.id,
  paypal_order_id: orderId,
  amount_euro: 10.0,
  ip_address: request.ip,
  user_agent: request.headers['user-agent'],
  status: 'success',
  metadata: { package: 'standard' },
})
```

## Fraud Prevention (Betrugsschutz)

### 1. Rate Limiting

**Verhindert automatisierte Angriffe**

```typescript
// Max 5 Payment Attempts pro Stunde
const { data: rateLimitData } = await supabase
  .from('rate_limits')
  .select('count')
  .eq('user_id', user.id)
  .eq('action', 'create_order')
  .gte('window_start', oneHourAgo)
  .single()

if (rateLimitData && rateLimitData.count >= 5) {
  return NextResponse.json(
    { error: 'Rate limit exceeded. Try again in 1 hour.' },
    { status: 429 }
  )
}
```

**Vorteile:**
- Verhindert Brute-Force Attacks
- Schützt vor Payment Spam
- Reduziert Server-Last

### 2. IP Tracking

**Jeder Request wird geloggt**

```typescript
const ipAddress =
  request.headers.get('x-forwarded-for') ||
  request.headers.get('x-real-ip') ||
  'unknown'

await auditLog({
  event_type: 'order_created',
  ip_address: ipAddress,
  user_agent: request.headers.get('user-agent'),
})
```

**Nutzen:**
- Erkennung verdächtiger Patterns
- Geolocation-basierte Fraud Detection
- IP-Blocking bei Missbrauch

### 3. Amount Validation (SERVER-SIDE!)

**KRITISCH: Server muss bezahlten Betrag prüfen!**

```typescript
// PayPal gibt uns den ECHTEN bezahlten Betrag
const paidAmount = parseFloat(
  captureResult.purchaseUnits?.[0]?.payments?.captures?.[0]?.amount?.value || '0'
)

// Erwarteter Betrag aus pending_payment
const expectedAmount = pendingPayment.amount_euro

// SICHERHEITS-CHECK
if (Math.abs(paidAmount - expectedAmount) > 0.01) {
  // ALARM: Amount Mismatch!
  await auditLog({
    event_type: 'amount_mismatch_detected',
    metadata: {
      expected: expectedAmount,
      actual: paidAmount,
      order_id: orderId,
    },
  })

  return { error: 'Amount mismatch' }
}
```

**Warum wichtig?**

Ohne Server-Side Validation könnte Angreifer:
1. Order für 5€ Package erstellen
2. Bei PayPal nur 1€ zahlen
3. Client manipulieren um 50€ Package zu erhalten

**Mit Validation:**
- Server prüft ECHTEN gezahlten Betrag
- Mismatch wird sofort erkannt
- Credits werden NICHT gutgeschrieben
- Event wird geloggt für Investigation

### 4. Ownership Verification

**User kann nur eigene Orders capturen**

```typescript
// Prüfe: Gehört Order diesem User?
const { data: pendingPayment } = await supabase
  .from('pending_payments')
  .select('user_id')
  .eq('paypal_order_id', orderId)
  .single()

if (pendingPayment.user_id !== user.id) {
  // SICHERHEITS-VERLETZUNG: User versucht fremde Order zu capturen!
  await auditLog({
    event_type: 'unauthorized_capture_attempt',
    user_id: user.id,
    metadata: { order_id: orderId, actual_owner: pendingPayment.user_id },
  })

  return { error: 'Unauthorized' }
}
```

### 5. Idempotency Checks

**Verhindert Doppel-Buchungen**

```typescript
// Prüfe: Wurde Order bereits verarbeitet?
const { data: existingTransaction } = await supabase
  .from('transactions')
  .select('id')
  .eq('paypal_order_id', orderId)
  .eq('type', 'purchase')
  .single()

if (existingTransaction) {
  // Order wurde bereits verarbeitet - Duplikat!
  return { error: 'Order already processed' }
}
```

**Szenarien:**
- User klickt 2x auf "Confirm Payment"
- Webhook wird 2x gesendet (PayPal Retry)
- Browser führt Request 2x aus

**Ohne Idempotency:**
- Credits werden doppelt gutgeschrieben
- User erhält 20 statt 10 Credits für 10€

**Mit Idempotency:**
- Zweiter Request wird erkannt
- Keine Doppel-Buchung
- Error wird retourniert

## Webhook Security

### 1. Signature Verification

**Verhindert gefälschte Webhooks**

```typescript
function verifyWebhookSignature(
  request: NextRequest,
  body: string
): boolean {
  // PayPal sendet Signature-Headers
  const transmissionId = request.headers.get('paypal-transmission-id')
  const transmissionTime = request.headers.get('paypal-transmission-time')
  const transmissionSig = request.headers.get('paypal-transmission-sig')
  const certUrl = request.headers.get('paypal-cert-url')
  const authAlgo = request.headers.get('paypal-auth-algo')

  // Alle Headers müssen vorhanden sein
  if (!transmissionId || !transmissionTime || !transmissionSig) {
    return false
  }

  // Verify Signature mit PayPal Public Key
  // (Full implementation via PayPal SDK)
  return verifyWithPayPalSDK(headers, body)
}
```

**Warum wichtig?**

**Ohne Verification:**
- Jeder kann POST zu /api/payment/webhook senden
- Angreifer könnte gefälschte "PAYMENT.CAPTURE.COMPLETED" senden
- Credits werden kostenlos gutgeschrieben
- Massiver Geldverlust!

**Mit Verification:**
- Nur PayPal kann gültige Signatures erstellen
- Gefälschte Requests werden abgelehnt (401)
- Audit Log erfasst Versuche

### 2. Idempotent Webhook Processing

**PayPal kann Webhooks mehrfach senden**

```typescript
// Prüfe: Wurde Event bereits verarbeitet?
const { data: existingTransaction } = await supabase
  .from('transactions')
  .eq('paypal_order_id', orderId)
  .single()

if (existingTransaction) {
  console.log('Webhook already processed (duplicate)')
  return NextResponse.json({ received: true })
}
```

**PayPal Retry Logic:**
- Nach 1 Stunde (wenn Server antwortet nicht)
- Nach 6 Stunden
- Nach 24 Stunden
- Bis zu 3 Tage lang

### 3. Event Type Validation

**Nur erwartete Events verarbeiten**

```typescript
const validEvents = [
  'PAYMENT.CAPTURE.COMPLETED',
  'PAYMENT.CAPTURE.REFUNDED',
  'PAYMENT.CAPTURE.DENIED',
  'PAYMENT.CAPTURE.DECLINED',
]

if (!validEvents.includes(eventType)) {
  console.log(`Unhandled event type: ${eventType}`)
  return NextResponse.json({ received: true })
}
```

## Data Privacy (GDPR)

### 1. Minimal Data Collection

**Sammle nur notwendige Daten**

✅ **Gespeichert:**
- User ID (UUID)
- Email (für Receipts)
- Transaction Amount
- Credits Amount
- PayPal Order ID (für Support)
- Timestamps

❌ **NICHT gespeichert:**
- Kreditkartennummern
- PayPal Account Details
- Vollständige Namen (optional)
- Adressen (nicht benötigt)

### 2. Data Retention

**Lösche alte Daten automatisch**

```sql
-- Audit Logs: 2 Jahre Retention
DELETE FROM payment_audit_log
WHERE created_at < NOW() - INTERVAL '2 years';

-- Rate Limits: 7 Tage Retention
DELETE FROM rate_limits
WHERE created_at < NOW() - INTERVAL '7 days';
```

### 3. User Data Export

**GDPR Artikel 15: Recht auf Datenportabilität**

```typescript
// GET /api/user/export-data
async function exportUserData(userId: string) {
  const [profile, transactions, auditLogs] = await Promise.all([
    supabase.from('user_profiles').select('*').eq('id', userId).single(),
    supabase.from('transactions').select('*').eq('user_id', userId),
    supabase.from('payment_audit_log').select('*').eq('user_id', userId),
  ])

  return {
    profile,
    transactions,
    auditLogs,
    exportedAt: new Date().toISOString(),
  }
}
```

### 4. User Data Deletion

**GDPR Artikel 17: Recht auf Vergessenwerden**

```typescript
// DELETE /api/user/delete-account
async function deleteUserAccount(userId: string) {
  // 1. Anonymize transactions (keep for accounting)
  await supabase
    .from('transactions')
    .update({ user_id: null, metadata: { deleted: true } })
    .eq('user_id', userId)

  // 2. Delete audit logs
  await supabase.from('payment_audit_log').delete().eq('user_id', userId)

  // 3. Delete profile
  await supabase.from('user_profiles').delete().eq('id', userId)

  // 4. Delete auth account
  await supabase.auth.admin.deleteUser(userId)
}
```

## Row Level Security (RLS)

### User Profiles

```sql
-- Users can only view their own profile
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can only update their own profile
CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);
```

### Transactions

```sql
-- Users can only view their own transactions
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  USING (auth.uid() = user_id);

-- Only system can insert transactions (via API)
CREATE POLICY "System can insert transactions"
  ON transactions FOR INSERT
  WITH CHECK (false); -- Disabled for clients
```

### Pending Payments

```sql
-- Users can view their own pending payments
CREATE POLICY "Users can view own pending payments"
  ON pending_payments FOR SELECT
  USING (auth.uid() = user_id);
```

### Payment Audit Log

```sql
-- NO direct access for users
-- Only accessible via admin/support tools
```

## Environment Security

### 1. Environment Variables

**Niemals in Git committen!**

```bash
# .gitignore
.env.local
.env.production
```

**Sichere Storage:**
- Vercel: Environment Variables Dashboard
- Railway: Environment Variables
- AWS: Secrets Manager
- Self-hosted: Vault, .env Files mit 600 Permissions

### 2. API Keys Rotation

**Regelmäßig Keys rotieren:**

1. PayPal API Credentials: Alle 90 Tage
2. Supabase Service Role Key: Alle 180 Tage
3. Webhook Secret: Bei Verdacht auf Compromise

### 3. Development vs Production

```env
# .env.local (Development)
NEXT_PUBLIC_PAYPAL_ENV=sandbox
PAYPAL_WEBHOOK_SKIP_VERIFY=true # OK für lokale Tests

# .env.production (Production)
NEXT_PUBLIC_PAYPAL_ENV=production
PAYPAL_WEBHOOK_SKIP_VERIFY=false # MUSS false sein!
```

## Security Checklist

### Pre-Deployment

- [ ] Alle Environment Variables gesetzt
- [ ] `PAYPAL_WEBHOOK_SKIP_VERIFY=false` in Production
- [ ] RLS Policies aktiviert und getestet
- [ ] Rate Limits konfiguriert
- [ ] HTTPS erzwungen
- [ ] Audit Logging funktioniert
- [ ] Amount Validation getestet
- [ ] Webhook Signature Verification getestet
- [ ] Idempotency Tests durchgeführt

### Post-Deployment

- [ ] Test-Zahlung durchgeführt
- [ ] Webhook empfangen und verarbeitet
- [ ] Audit Logs überprüft
- [ ] Error Monitoring konfiguriert (Sentry/etc)
- [ ] Alerts eingerichtet
- [ ] Backup-Strategie getestet
- [ ] Incident Response Plan dokumentiert

### Laufender Betrieb

- [ ] Wöchentliche Audit Log Reviews
- [ ] Monatliche Security Scans
- [ ] Quarterly API Key Rotation
- [ ] Jährliche Penetration Tests

## Incident Response

### Bei Sicherheitsvorfall:

1. **Immediate Actions:**
   - PayPal API Zugang deaktivieren
   - Betroffene User benachrichtigen
   - Audit Logs sichern

2. **Investigation:**
   - Audit Logs analysieren
   - Attack Vector identifizieren
   - Extent of Damage bewerten

3. **Remediation:**
   - Vulnerability fixen
   - API Keys rotieren
   - RLS Policies verschärfen

4. **Communication:**
   - User informieren (GDPR Breach Notification)
   - Behörden informieren (falls erforderlich)
   - Post-Mortem erstellen

## Security Contacts

**Internal:**
- Security Team: security@excelskills.com
- On-Call Engineer: [Phone Number]

**External:**
- PayPal Security: security@paypal.com
- Supabase Support: support@supabase.com

**Responsible Disclosure:**
- security@excelskills.com
- Bug Bounty: [Details if applicable]

## Weitere Ressourcen

- [PCI-DSS Compliance Guide](https://www.pcisecuritystandards.org/)
- [GDPR Official Text](https://gdpr-info.eu/)
- [PayPal Security Best Practices](https://developer.paypal.com/docs/security/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
