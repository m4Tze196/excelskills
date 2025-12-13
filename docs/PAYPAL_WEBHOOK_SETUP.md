# PayPal Webhook-Einrichtung

## Übersicht

PayPal Webhooks benachrichtigen unsere Anwendung automatisch über Zahlungsereignisse:
- ✅ Zahlung abgeschlossen
- 🔄 Rückerstattung durchgeführt
- ❌ Zahlung abgelehnt/fehlgeschlagen

## Warum Webhooks wichtig sind

**Ohne Webhooks:**
- Benutzer könnte Zahlungsseite vorzeitig schließen
- Server weiß nicht, ob Zahlung erfolgreich war
- Credits werden nicht gutgeschrieben

**Mit Webhooks:**
- PayPal informiert unseren Server direkt
- Zahlungen werden zuverlässig verarbeitet
- Automatische Handhabung von Rückerstattungen

## 🔧 Webhook einrichten (PayPal Sandbox)

### Schritt 1: PayPal Developer Dashboard öffnen

1. Gehe zu https://developer.paypal.com/dashboard
2. Melde dich mit deinem PayPal-Account an
3. Klicke auf **Apps & Credentials**
4. Wähle **Sandbox** (für Tests)

### Schritt 2: Webhook erstellen

1. Scrolle nach unten zu **Webhooks**
2. Klicke auf **Add Webhook**
3. Trage folgende Webhook URL ein:

   **Für lokale Entwicklung (mit ngrok):**
   ```
   https://YOUR-NGROK-URL.ngrok.io/api/payment/webhook
   ```

   **Für Production:**
   ```
   https://excelskills.com/api/payment/webhook
   ```

4. Wähle folgende **Event types**:
   - ✅ `PAYMENT.CAPTURE.COMPLETED`
   - 🔄 `PAYMENT.CAPTURE.REFUNDED`
   - ❌ `PAYMENT.CAPTURE.DENIED`
   - ❌ `PAYMENT.CAPTURE.DECLINED`

5. Klicke **Save**

### Schritt 3: Webhook ID kopieren

Nach dem Speichern zeigt PayPal die **Webhook ID** an (z.B. `8XY12345678901234`):

1. Kopiere diese ID
2. Füge sie in `.env.local` ein:
   ```env
   PAYPAL_WEBHOOK_ID=8XY12345678901234
   ```

### Schritt 4: Server neu starten

```bash
# Server stoppen (Ctrl+C)
# Server neu starten
npm run dev
```

## 🧪 Webhooks testen (lokal)

### Option 1: ngrok verwenden

Da PayPal keine `localhost` URLs aufrufen kann, brauchst du **ngrok**:

#### ngrok installieren

```bash
# Mac mit Homebrew
brew install ngrok

# Oder von https://ngrok.com/download herunterladen
```

#### ngrok starten

```bash
# Terminal 1: Next.js Server starten
npm run dev

# Terminal 2: ngrok Tunnel starten
ngrok http 3000
```

ngrok zeigt eine URL wie:
```
Forwarding: https://abc123.ngrok.io -> http://localhost:3000
```

#### Webhook URL in PayPal aktualisieren

1. Gehe zu PayPal Developer Dashboard > Webhooks
2. Bearbeite deinen Webhook
3. Ändere URL zu: `https://abc123.ngrok.io/api/payment/webhook`
4. Speichere

### Option 2: PayPal Webhook Simulator

PayPal bietet einen Webhook-Simulator zum Testen:

1. Gehe zu https://developer.paypal.com/dashboard
2. Klicke auf deine App
3. Scrolle zu **Webhooks**
4. Klicke auf **Webhook events > Show**
5. Wähle Event-Typ (z.B. `PAYMENT.CAPTURE.COMPLETED`)
6. Klicke **Send Test**

## 📊 Webhook-Logs überprüfen

### Server-Logs (Konsole)

Wenn ein Webhook empfangen wird, siehst du:

```
📨 Webhook received: PAYMENT.CAPTURE.COMPLETED
✅ Payment completed for order: 8XY123456789
✅ Webhook confirmed payment for order 8XY123456789
```

### Datenbank-Logs (Supabase)

Alle Webhook-Events werden in `payment_audit_log` gespeichert:

```sql
SELECT
  event_type,
  paypal_order_id,
  status,
  created_at,
  metadata
FROM payment_audit_log
WHERE event_type = 'webhook_received'
ORDER BY created_at DESC
LIMIT 10;
```

### PayPal Dashboard Logs

1. Gehe zu PayPal Developer Dashboard
2. Klicke auf deine App
3. Scrolle zu **Webhooks**
4. Klicke auf den Webhook
5. Siehe **Recent deliveries**
   - ✅ Grün = Erfolgreich (200 OK)
   - ❌ Rot = Fehlgeschlagen (Fehlercode)

## 🔒 Sicherheit: Webhook-Signatur-Verifizierung

### Warum Signatur-Verifizierung?

**Ohne Verifizierung:**
- Jeder könnte gefälschte Webhooks senden
- Könnte Credits kostenlos gutschreiben
- Sicherheitslücke!

**Mit Verifizierung:**
- Nur PayPal kann gültige Webhooks senden
- Signatur wird mit PayPal Public Key geprüft
- Ungültige Requests werden abgelehnt (401)

### Entwicklungsmodus

In `.env.local` ist die Verifizierung aktuell **deaktiviert**:

```env
PAYPAL_WEBHOOK_SKIP_VERIFY=true
```

⚠️ **NUR für lokale Tests!**

### Production-Modus

Für Production **muss** die Verifizierung aktiviert werden:

```env
# .env.production
PAYPAL_WEBHOOK_SKIP_VERIFY=false
```

Die vollständige Signatur-Verifizierung wird über die PayPal SDK API durchgeführt.

## 🚀 Production Deployment

### Schritt 1: Production App erstellen

1. Gehe zu PayPal Developer Dashboard
2. Wechsle von **Sandbox** zu **Live**
3. Erstelle eine neue App
4. Kopiere **Client ID** und **Secret**

### Schritt 2: Webhook einrichten

1. Füge Webhook mit Production URL hinzu:
   ```
   https://excelskills.com/api/payment/webhook
   ```
2. Wähle dieselben Event-Typen
3. Kopiere die **Webhook ID**

### Schritt 3: Environment Variables setzen

```env
# Production Environment Variables
NEXT_PUBLIC_PAYPAL_CLIENT_ID_PRODUCTION=<your-live-client-id>
PAYPAL_CLIENT_SECRET_PRODUCTION=<your-live-secret>
PAYPAL_WEBHOOK_ID=<your-live-webhook-id>
NEXT_PUBLIC_PAYPAL_ENV=production

# WICHTIG: Verifizierung AKTIVIEREN
PAYPAL_WEBHOOK_SKIP_VERIFY=false
```

## 🐛 Troubleshooting

### Webhook wird nicht empfangen

**Problem:** PayPal sendet Webhooks, aber nichts passiert

**Lösungen:**
1. ✅ Prüfe ngrok Tunnel läuft: `ngrok http 3000`
2. ✅ Prüfe Webhook URL in PayPal korrekt ist
3. ✅ Prüfe Server läuft: `npm run dev`
4. ✅ Prüfe Firewall/Port 3000 offen

### 401 Unauthorized Error

**Problem:** PayPal zeigt "401 Unauthorized" bei Webhook Delivery

**Ursache:** Signature Verification schlägt fehl

**Lösung:**
```env
# Für lokale Tests deaktivieren
PAYPAL_WEBHOOK_SKIP_VERIFY=true
```

### Webhook wird mehrfach empfangen

**Problem:** Dasselbe Event kommt 2-3x an

**Ursache:** PayPal retry-Mechanismus bei langsamer Antwort

**Lösung:** Code ist bereits idempotent (prüft Duplikate)
```typescript
// Webhook handler prüft bereits verarbeitete Orders
const { data: existingTransaction } = await supabase
  .from('transactions')
  .eq('paypal_order_id', orderId)
  .single()

if (existingTransaction) {
  console.log('Already processed (duplicate webhook)')
  return
}
```

### Datenbank zeigt keine neuen Einträge

**Problem:** Webhook empfangen, aber DB nicht aktualisiert

**Prüfen:**
1. ✅ Server-Logs auf Fehler prüfen
2. ✅ Supabase `payment_audit_log` Tabelle checken
3. ✅ `SUPABASE_SERVICE_ROLE_KEY` korrekt in `.env.local`

## 📝 Webhook Event-Beispiele

### PAYMENT.CAPTURE.COMPLETED

```json
{
  "id": "WH-123456789",
  "event_type": "PAYMENT.CAPTURE.COMPLETED",
  "resource": {
    "id": "CAPTURE-123",
    "amount": {
      "value": "10.00",
      "currency_code": "EUR"
    },
    "supplementary_data": {
      "related_ids": {
        "order_id": "ORDER-8XY123456789"
      }
    }
  }
}
```

### PAYMENT.CAPTURE.REFUNDED

```json
{
  "id": "WH-987654321",
  "event_type": "PAYMENT.CAPTURE.REFUNDED",
  "resource": {
    "id": "REFUND-456",
    "amount": {
      "value": "10.00",
      "currency_code": "EUR"
    },
    "supplementary_data": {
      "related_ids": {
        "order_id": "ORDER-8XY123456789"
      }
    }
  }
}
```

## ✅ Checkliste für Go-Live

- [ ] Production PayPal App erstellt
- [ ] Webhook mit Live URL konfiguriert
- [ ] Webhook ID in Production Environment gesetzt
- [ ] `PAYPAL_WEBHOOK_SKIP_VERIFY=false` in Production
- [ ] Webhook Signatur-Verifizierung getestet
- [ ] Test-Zahlung durchgeführt
- [ ] Test-Rückerstattung durchgeführt
- [ ] Logs überprüft (Server + PayPal Dashboard)
- [ ] Datenbank-Einträge verifiziert

## 📚 Weitere Ressourcen

- [PayPal Webhooks Dokumentation](https://developer.paypal.com/docs/api-basics/notifications/webhooks/)
- [Webhook Event Types](https://developer.paypal.com/docs/api-basics/notifications/webhooks/event-names/)
- [Webhook Signature Verification](https://developer.paypal.com/api/rest/webhooks/verify-signature/)
- [ngrok Dokumentation](https://ngrok.com/docs)
