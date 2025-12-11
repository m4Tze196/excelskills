# Vercel Deployment Setup für ExcelSkills

## 🚀 Schnellstart

Diese Anleitung hilft dir, die ExcelSkills-App auf Vercel zu deployen.

## 📋 Voraussetzungen

1. **GitHub Repository** ist bereits verbunden mit Vercel
2. **Vercel Account** (kostenlos oder Pro)
3. **Anthropic API Key** von https://console.anthropic.com/

## 🔧 Deployment-Schritte

### 1. Vercel Dashboard öffnen

Gehe zu https://vercel.com/dashboard

### 2. Project auswählen

Wähle dein ExcelSkills-Projekt aus der Liste.

### 3. Environment Variables konfigurieren

Gehe zu **Settings** → **Environment Variables** und füge folgende Variablen hinzu:

#### Erforderlich:

```
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxx
```

**Wichtig:** Dies ist der wichtigste Key! Ohne ihn funktioniert der Chat nicht.

#### Optional (bereits in vercel.json konfiguriert):

Die folgenden Variablen sind bereits in `vercel.json` gesetzt, können aber überschrieben werden:

```
NEXT_PUBLIC_BASE_PRICE=0.05
NEXT_PUBLIC_MAX_PRICE=0.50
RATE_LIMIT_MAX_REQUESTS=10
RATE_LIMIT_WINDOW_MS=3600000
```

### 4. Deployment auslösen

#### Option A: Automatisches Deployment
- Jeder Push auf den `main` Branch löst automatisch ein Deployment aus
- Preview-Deployments werden für Pull Requests erstellt

#### Option B: Manuelles Deployment
1. Gehe zu **Deployments**
2. Klicke auf **Redeploy**
3. Bestätige mit **Redeploy**

### 5. Domain prüfen

Deine App ist verfügbar unter:
- **Production:** https://excelskills.vercel.app
- **Custom Domain:** (falls konfiguriert)

## 🔍 Häufige Probleme & Lösungen

### Problem: "Chat funktioniert nicht"

**Lösung:**
1. Prüfe, ob `ANTHROPIC_API_KEY` gesetzt ist
2. Gehe zu **Settings** → **Environment Variables**
3. Stelle sicher, dass der Key für **Production**, **Preview** und **Development** gesetzt ist

### Problem: "Build schlägt fehl"

**Lösung:**
1. Prüfe die Build-Logs unter **Deployments** → [Latest Deployment] → **Building**
2. Häufige Ursachen:
   - TypeScript-Fehler
   - Fehlende Dependencies
   - Syntax-Fehler

### Problem: "Seite lädt, aber Layout ist kaputt"

**Lösung:**
1. Leere den Browser-Cache (Strg+Shift+R / Cmd+Shift+R)
2. Prüfe, ob alle CSS-Dateien korrekt geladen werden (Browser DevTools → Network)
3. Stelle sicher, dass `tailwindcss` in den Dependencies ist

### Problem: "API-Route gibt 500-Fehler"

**Lösung:**
1. Prüfe die Function-Logs: **Deployments** → [Latest Deployment] → **Functions**
2. Häufige Ursachen:
   - Fehlender `ANTHROPIC_API_KEY`
   - Rate Limit erreicht
   - Anthropic API ist down (prüfe: https://status.anthropic.com/)

## 📊 Monitoring & Logs

### Deployment-Logs anzeigen

1. Gehe zu **Deployments**
2. Klicke auf das neueste Deployment
3. Tabs verfügbar:
   - **Building:** Build-Logs
   - **Functions:** API-Route-Logs
   - **Source:** Verwendeter Code

### Real-time Logs

```bash
# Installiere Vercel CLI
npm i -g vercel

# Login
vercel login

# Logs anzeigen
vercel logs
```

## 🔄 Aktualisierungen deployen

### Automatisch (empfohlen):

```bash
# Lokale Änderungen committen
git add .
git commit -m "deine Änderung"
git push origin main

# Vercel deployed automatisch!
```

### Manuell über Vercel CLI:

```bash
vercel --prod
```

## 🌍 Custom Domain hinzufügen

1. Gehe zu **Settings** → **Domains**
2. Klicke auf **Add Domain**
3. Gib deine Domain ein (z.B. `excelskills.com`)
4. Folge den DNS-Anweisungen
5. Warte auf Verifizierung (kann bis zu 48h dauern)

## 📱 Features auf Vercel

### Automatisch verfügbar:

✅ **SSL/HTTPS** - Automatisch aktiviert
✅ **CDN** - Weltweit verteilt
✅ **Edge Functions** - Für schnelle API-Responses
✅ **Analytics** - Usage-Tracking (Vercel Analytics aktivieren)
✅ **Preview Deployments** - Für jeden Pull Request

## 🔐 Sicherheit

### Environment Variables schützen

- **NIEMALS** committen (sind in `.gitignore`)
- Nur über Vercel Dashboard setzen
- Für jede Environment separat konfigurieren:
  - Production
  - Preview
  - Development

### API-Keys rotieren

1. Neuen Key bei Anthropic erstellen
2. In Vercel Environment Variables aktualisieren
3. Redeploy auslösen
4. Alten Key deaktivieren

## 📈 Performance-Optimierung

### Empfohlene Einstellungen:

```json
// vercel.json bereits konfiguriert
{
  "regions": ["fra1"]  // Frankfurt = niedrige Latenz für DE/EU
}
```

### Image-Optimierung

Next.js Image-Komponente wird automatisch optimiert:
- WebP-Konvertierung
- Lazy Loading
- Responsive Images

## 🆘 Support

### Vercel Support:
- Dokumentation: https://vercel.com/docs
- Community: https://github.com/vercel/next.js/discussions

### ExcelSkills Support:
- GitHub Issues: [Repository-Link]
- Email: support@excelskills.com

## ✅ Checkliste vor dem Go-Live

- [ ] `ANTHROPIC_API_KEY` in Production gesetzt
- [ ] Build läuft erfolgreich durch
- [ ] Alle Seiten laden korrekt
- [ ] Chat funktioniert
- [ ] Mobile-Ansicht getestet
- [ ] Custom Domain konfiguriert (optional)
- [ ] Analytics aktiviert (optional)
- [ ] Error-Tracking eingerichtet (z.B. Sentry, optional)

## 🎉 Fertig!

Deine App sollte jetzt live sein unter: https://excelskills.vercel.app

Bei Problemen: Prüfe zuerst die Build-Logs und Function-Logs auf Vercel!
