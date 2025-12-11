# Excel Skills Animations

Dieses Verzeichnis enthält animierte und statische Vorschau-Komponenten für die Excel Skills.

## Komponenten

### ConditionalFormattingPreview
Eine interaktive Animation, die zeigt, wie bedingte Formatierung in Excel funktioniert.

**Features:**
- Zeigt eine Excel-Zelle mit sich änderndem Wert (1-4)
- Färbt die Zelle grün, wenn der Wert > 2
- Animiert den Wertwechsel alle 2 Sekunden
- Zeigt eine Check-Mark bei erfolgreicher Bedingung
- Responsive Design mit Dark Mode Support

**Usage:**
```tsx
import { ConditionalFormattingPreview } from '@/components/animations';

<ConditionalFormattingPreview />
```

### SkillPreviewCard
Eine wiederverwendbare Card-Komponente für Skill-Vorschauen.

**Props:**
- `icon`: React Node - Das Icon für den Skill
- `title`: string - Der Titel des Skills
- `description`: string - Beschreibung des Skills
- `category`: string - Kategorie (z.B. "Formeln", "Datenanalyse")
- `level`: string - Schwierigkeitsgrad (Anfänger/Fortgeschritten/Experte)
- `color`: string - Farbschema ("primary", "secondary", "success", etc.)

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

## Verfügbare Skill Icons

- `VLookupIcon` - SVERWEIS Funktion
- `PivotTableIcon` - Pivot-Tabellen
- `ConditionalFormattingIcon` - Bedingte Formatierung
- `IndexMatchIcon` - INDEX-VERGLEICH
- `ChartsIcon` - Diagramme & Grafiken
- `SumIfIcon` - SUMMEWENN & SUMMEWENNS
- `DataValidationIcon` - Datenüberprüfung
- `MacrosIcon` - Makros & VBA
- `PowerQueryIcon` - Power Query

## Design-Prinzipien

1. **Minimalistisch** - Klarer Fokus auf die Funktion
2. **Responsive** - Mobile-first Design
3. **Accessible** - Dark Mode Support
4. **Animated** - Smooth Transitions und Hover-Effekte
5. **Branded** - Verwendung des Design-Systems (Farben, Spacing)

## Zukünftige Erweiterungen

- [ ] Weitere animierte Vorschauen für andere Skills (SVERWEIS, Pivot-Tabellen, etc.)
- [ ] Video-Export-Funktion für Social Media
- [ ] Interaktive Tutorial-Overlays
- [ ] Mehrsprachige Unterstützung für Animation-Texte
