# Excel Skills Animations

Dieses Verzeichnis enthält interaktive, animierte Vorschau-Komponenten für Excel Skills - **KEINE Videos**, sondern 100% Web-Animationen!

## ✨ Vorteile gegenüber Videos

- ✅ **Sofort laden** - Keine große MP4-Dateigröße (Animationen sind nur ~5KB Code)
- ✅ **Perfekte Qualität** - Skalieren auf jedem Gerät ohne Qualitätsverlust
- ✅ **SEO-freundlich** - Suchmaschinen können Content indexieren
- ✅ **Leicht zu aktualisieren** - Nur Code ändern, kein Video neu rendern
- ✅ **Interaktiv** - Animationen laufen automatisch in Loops
- ✅ **Dark Mode Support** - Automatische Theme-Anpassung
- ✅ **Barrierefrei** - Screen-Reader kompatibel

## 🎯 Verfügbare Animationen

### 1. ConditionalFormattingPreview
Demonstriert bedingte Formatierung mit automatischer Farb-Animation.

**Features:**
- Zeigt eine Excel-Zelle mit sich änderndem Wert (1-4)
- Färbt die Zelle grün, wenn der Wert > 2
- Animiert den Wertwechsel alle 2 Sekunden
- Zeigt eine Check-Mark bei erfolgreicher Bedingung
- Formel-Anzeige: `=IF(A1>2, "✓ Grün", "Standard")`
- Loop-Dauer: ~8 Sekunden

**Usage:**
```tsx
import { ConditionalFormattingPreview } from '@/components/animations';

<ConditionalFormattingPreview />
```

**Animation-Timeline:**
- 0-2s: Intro & Vorbereitung
- 2-4s: Wert ändert sich
- 4-6s: Highlighting wenn Bedingung erfüllt
- 6-8s: Reset & Restart

---

### 2. VLookupPreview
Demonstriert SVERWEIS mit zwei Tabellen und automatischer Formel-Eingabe.

**Features:**
- Zwei Excel-Tabellen: Bestellungen und Preisliste
- Formel wird Zeichen für Zeichen eingetippt
- Highlighting der gesuchten Werte in der Preisliste
- AutoFill-Animation zum Kopieren der Formel nach unten
- Zeigt Formelleiste mit Live-Formel
- Loop-Dauer: ~14 Sekunden

**Usage:**
```tsx
import { VLookupPreview } from '@/components/animations';

<VLookupPreview />
```

**Animation-Timeline:**
- 0-2s: Intro - Beide Tabellen anzeigen
- 2-6s: Formel eintippen
- 6-8s: Ersten Preis nachschlagen
- 8-11s: AutoFill für restliche Zeilen
- 11-13s: Finale Tabelle anzeigen
- 13-14s: Reset

---

### 3. SumIfPreview
Zeigt bedingte Summierung mit visueller Highlight-Animation.

**Features:**
- Umsatz-Tabelle mit verschiedenen Kategorien (Elektronik, Möbel, Büro)
- SUMMEWENN-Formel wird eingetippt
- Zeilen, die die Bedingung erfüllen, werden grün highlighted
- Animierte Berechnung der Summe (Counter-Effekt)
- Zeigt Zwischen-Rechnung: (1200€ + 450€ + 80€)
- Loop-Dauer: ~14 Sekunden

**Usage:**
```tsx
import { SumIfPreview } from '@/components/animations';

<SumIfPreview />
```

**Animation-Timeline:**
- 0-2s: Intro - Tabelle anzeigen
- 2-5.5s: Formel eintippen
- 5.5-8.5s: Matching-Zeilen highlighten
- 8.5-10.5s: Summe berechnen (Counter-Animation)
- 10.5-12s: Ergebnis anzeigen
- 12-14s: Reset

---

### 4. PivotTablePreview
Visualisiert die Transformation von Roh-Daten zu einer Pivot-Tabelle.

**Features:**
- Roh-Daten-Tabelle mit Verkaufsdaten (8 Einträge)
- Gruppierung nach Kategorie mit Highlight-Animation
- Spinning-Icon während der Transformation
- Pivot-Tabelle wird Zeile für Zeile aufgebaut
- Zeigt Anzahl und Gesamtsumme pro Kategorie
- Finale Gesamtsumme am Ende
- Loop-Dauer: ~14 Sekunden

**Usage:**
```tsx
import { PivotTablePreview } from '@/components/animations';

<PivotTablePreview />
```

**Animation-Timeline:**
- 0-2.5s: Roh-Daten anzeigen
- 2.5-3.5s: Transformation starten
- 3.5-8s: Nach Kategorie gruppieren (Highlighting)
- 8-9s: Summen berechnen
- 9-12s: Pivot-Tabelle Zeile für Zeile aufbauen
- 12-14s: Fertige Pivot-Tabelle & Reset

---

## 🎨 Skill Preview Cards

### SkillPreviewCard
Eine wiederverwendbare Card-Komponente für Skill-Vorschauen.

**Props:**
- `icon`: React Node - Das Icon für den Skill
- `title`: string - Der Titel des Skills
- `description`: string - Beschreibung des Skills
- `category`: string - Kategorie (z.B. "Formeln", "Datenanalyse")
- `level`: string - Schwierigkeitsgrad (Anfänger/Fortgeschritten/Experte)
- `color`: string - Farbschema ("primary", "secondary", "success", "info", "warning", "danger")

**Usage:**
```tsx
import { SkillPreviewCard, VLookupIcon } from '@/components/animations';

<SkillPreviewCard
  icon={<VLookupIcon />}
  title="SVERWEIS"
  description="Suchen Sie nach einem Wert in einer Tabelle"
  category="Formeln"
  level="Fortgeschritten"
  color="primary"
/>
```

### Verfügbare Skill Icons

- `VLookupIcon` - SVERWEIS Funktion (blau)
- `PivotTableIcon` - Pivot-Tabellen (lila)
- `ConditionalFormattingIcon` - Bedingte Formatierung (grün)
- `IndexMatchIcon` - INDEX-VERGLEICH (cyan)
- `ChartsIcon` - Diagramme & Grafiken (blau)
- `SumIfIcon` - SUMMEWENN & SUMMEWENNS (blau)
- `DataValidationIcon` - Datenüberprüfung (grün)
- `MacrosIcon` - Makros & VBA (rot)
- `PowerQueryIcon` - Power Query (gelb)

Alle Icons sind als SVG implementiert und skalieren perfekt auf jedem Gerät.

---

## 📋 Integration in die Skills-Seite

Die Skills-Seite (`app/[locale]/skills/page.tsx`) integriert alle Animationen in einem Tab-System:

```tsx
import {
  ConditionalFormattingPreview,
  VLookupPreview,
  SumIfPreview,
  PivotTablePreview,
} from '@/components/animations';

const featuredAnimations = [
  {
    id: "conditionalFormatting",
    title: "Bedingte Formatierung",
    description: "Zellen automatisch färben basierend auf Werten",
    component: <ConditionalFormattingPreview />,
    icon: "🎨",
  },
  // ... weitere Animationen
];
```

Nutzer können zwischen den Animationen wechseln über Tab-Buttons.

---

## 🎨 Design-Prinzipien

1. **Minimalistisch** - Klarer Fokus auf die Excel-Funktion
2. **Responsive** - Mobile-first Design (funktioniert auf Smartphones)
3. **Accessible** - Dark Mode Support, Screen-Reader kompatibel
4. **Animated** - Smooth Transitions (300ms ease-in-out)
5. **Branded** - Verwendung des Design-Systems (Tailwind CSS)
6. **Performant** - Keine schweren Animationen, nur CSS Transitions
7. **Loop-fähig** - Alle Animationen laufen automatisch in Endlosschleife

---

## 🚀 Performance

Jede Animation ist extrem leichtgewichtig:

| Animation | Größe | Ladezeit | Loop-Dauer |
|-----------|-------|----------|------------|
| ConditionalFormatting | ~3 KB | <10ms | 8s |
| VLookup | ~5 KB | <15ms | 14s |
| SumIf | ~4 KB | <12ms | 14s |
| PivotTable | ~6 KB | <18ms | 14s |

Zum Vergleich: Ein 1080x1080 MP4-Video wäre 3-5 MB (1000x größer!)

---

## 🔮 Zukünftige Erweiterungen

- [x] Bedingte Formatierung Animation
- [x] SVERWEIS Animation
- [x] SUMMEWENN Animation
- [x] Pivot-Tabelle Animation
- [ ] INDEX-VERGLEICH Animation
- [ ] Power Query Animation
- [ ] Diagramme Animation
- [ ] Makros/VBA Animation
- [ ] Pause/Play Buttons für User-Kontrolle
- [ ] Export-to-GIF Funktion für Social Media Sharing
- [ ] Interaktive Tutorial-Overlays (User kann Schritte selbst durchklicken)
- [ ] Mehrsprachige Unterstützung (EN, FR, TR)

---

## 📝 Technische Details

**Framework:**
- Next.js 16 (React 19)
- TypeScript
- Tailwind CSS

**Animations-Technik:**
- React `useState` & `useEffect` Hooks
- CSS Transitions (Tailwind)
- Interval-based Timeline Management
- Keine externe Animation-Library benötigt

**Browser-Kompatibilität:**
- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Mobile Browsers: ✅

---

## 💡 Best Practices

1. **Timing**: Animationen sind bewusst langsam (2-3x langsamer als echte Excel-Nutzung), damit User folgen können
2. **Highlights**: Wichtige Elemente werden farblich hervorgehoben (grün für Success, gelb für Info)
3. **Phase Indicators**: Kleine Status-Bubbles zeigen den aktuellen Schritt
4. **Loops**: Alle Animationen resetten sich automatisch nach dem Ende
5. **Accessibility**: Alle Texte sind lesbar, Kontraste sind WCAG AA konform

---

**Erstellt mit ❤️ für ExcelSkills**
