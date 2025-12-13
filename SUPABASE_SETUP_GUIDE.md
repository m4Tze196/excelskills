# 🚀 Supabase Setup Guide - ExcelSkills Payment System

Dieser Guide führt dich durch die **Supabase-Datenbank-Konfiguration** für das PayPal-Payment-System.

---

## ✅ Schritt 1: Service Role Key hinzufügen

Du hast bereits den **anon key** bereitgestellt. Jetzt benötigen wir noch den **service_role key**.

### So findest du ihn:

1. Gehe zu deinem **Supabase Dashboard**: https://supabase.com/dashboard/project/vzsxnjdhlzlokqnxvsky
2. Klicke auf **Settings** (linke Sidebar)
3. Klicke auf **API**
4. Scrolle zu **Project API keys**
5. Kopiere den **`service_role` key** (beginnt mit `eyJhbGc...`)

### ⚠️ WICHTIG:
- Dieser Key ist **GEHEIM**!
- Niemals im Frontend nutzen!
- Niemals in Git committen!
- Nur für Server-Side API Routes!

### Wo eintragen:

Öffne `/home/user/excelskills/.env.local` und ersetze:

```bash
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

mit dem echten Key:

```bash
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## ✅ Schritt 2: Database Schema ausführen

Jetzt müssen wir die **Datenbank-Tabellen** in Supabase erstellen.

### Option A: Supabase SQL Editor (empfohlen)

1. Gehe zu: https://supabase.com/dashboard/project/vzsxnjdhlzlokqnxvsky/sql/new
2. Öffne die Datei: `/home/user/excelskills/supabase/migrations/001_initial_schema.sql`
3. Kopiere den **gesamten Inhalt**
4. Füge ihn in den **SQL Editor** ein
5. Klicke auf **Run** (oben rechts)

### Option B: Supabase CLI (fortgeschritten)

```bash
# Installiere Supabase CLI (falls noch nicht installiert)
npm install -g supabase

# Linke dein Projekt
supabase link --project-ref vzsxnjdhlzlokqnxvsky

# Führe Migration aus
supabase db push
```

### ✅ Erfolgreiche Ausführung:

Du solltest sehen:
- ✅ 5 neue Tabellen erstellt: `user_profiles`, `transactions`, `pending_payments`, `payment_audit_log`, `rate_limits`
- ✅ Row Level Security (RLS) aktiviert
- ✅ Trigger und Funktionen erstellt

---

## ✅ Schritt 3: Authentication aktivieren

### Email/Password Authentication einschalten:

1. Gehe zu: https://supabase.com/dashboard/project/vzsxnjdhlzlokqnxvsky/auth/providers
2. Aktiviere **Email** Provider (sollte schon aktiv sein)
3. Konfiguriere **Email Templates** (optional):
   - Confirm signup
   - Reset password
   - Magic link

### Optional: Social Login (Google, GitHub, etc.)

Später können wir hinzufügen:
- Google OAuth
- GitHub OAuth
- Facebook Login

Vorerst reicht **Email/Password**!

---

## ✅ Schritt 4: Datenbank-Überprüfung

Prüfe, ob alles korrekt eingerichtet wurde:

1. Gehe zu: https://supabase.com/dashboard/project/vzsxnjdhlzlokqnxvsky/editor
2. Du solltest sehen:

```
public
├── user_profiles
├── transactions
├── pending_payments
├── payment_audit_log
└── rate_limits
```

3. Klicke auf **`user_profiles`** → sollte leer sein (noch keine User)

---

## ✅ Schritt 5: Test-User erstellen (optional)

Erstelle einen Test-User über den SQL Editor:

```sql
-- Test-User mit 100 Credits erstellen
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
)
VALUES (
  uuid_generate_v4(),
  'test@excelskills.com',
  crypt('testpassword123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW()
);

-- User-Profil wird automatisch erstellt via Trigger!
```

**Oder nutze die Supabase Auth UI** (kommt in nächsten Schritten).

---

## ✅ Schritt 6: Environment Variables überprüfen

Stelle sicher, dass `.env.local` vollständig ist:

```bash
# Supabase (MUSS ausgefüllt sein)
✅ NEXT_PUBLIC_SUPABASE_URL=https://vzsxnjdhlzlokqnxvsky.supabase.co
✅ NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
✅ SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Anthropic (sollte schon ausgefüllt sein)
✅ ANTHROPIC_API_KEY=sk-ant-...

# PayPal (kommt später)
⏳ NEXT_PUBLIC_PAYPAL_CLIENT_ID_SANDBOX=...
⏳ PAYPAL_CLIENT_SECRET_SANDBOX=...
```

---

## ✅ Schritt 7: Test die Verbindung

Starte deinen Dev-Server:

```bash
npm run dev
```

Öffne die Browser-Console und teste:

```javascript
// In Browser Console
const { createClient } = await import('/lib/supabase/client.ts')
const supabase = createClient()
const { data, error } = await supabase.from('user_profiles').select('*')
console.log('Supabase connected:', data)
```

Wenn `data: []` zurückkommt → ✅ **Verbindung erfolgreich!**

---

## 🔒 Security Checklist

Vor dem Weitergehen, bestätige:

- ✅ `.env.local` ist in `.gitignore` (sollte schon sein)
- ✅ `SUPABASE_SERVICE_ROLE_KEY` niemals ins Git committed
- ✅ Row Level Security (RLS) ist auf allen Tabellen aktiviert
- ✅ Database-URL enthält kein Passwort im Klartext

---

## 📋 Nächste Schritte

Nach erfolgreicher Einrichtung:

1. ✅ **Authentication UI** bauen (Login/Signup)
2. ✅ **Credits-System** von localStorage → Supabase migrieren
3. ✅ **PayPal-Integration** starten

---

## 🆘 Probleme?

### Fehler: "relation 'user_profiles' does not exist"
→ SQL-Migration wurde nicht ausgeführt. Wiederhole **Schritt 2**.

### Fehler: "Invalid API key"
→ Überprüfe `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`

### Fehler: "Row Level Security policy violation"
→ Du versuchst ohne Authentifizierung auf Daten zuzugreifen. Login zuerst!

---

## ✅ Setup abgeschlossen!

Sobald du:
1. ✅ Service Role Key hinzugefügt hast
2. ✅ SQL-Schema ausgeführt hast
3. ✅ Auth aktiviert hast

Können wir mit **Phase 2: Authentication UI** weitermachen! 🚀
