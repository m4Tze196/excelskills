export interface Shortcut {
  id: string;
  title: string;
  keys: string[];           // Key codes for detection
  keysDisplay: string[];    // Display labels
  category: 'essential' | 'power' | 'ninja';
  description: string;
  useCase: string;
  timeSaved: {
    perUse: number;         // Sekunden
    dailyUses: number;
    weeklyTotal: number;    // Stunden
  };
  proTip?: string;
  relatedShortcuts: string[];
  difficulty: 1 | 2 | 3;    // 1=easy, 3=complex
  platform: 'windows' | 'mac' | 'both';
  icon: string;             // Emoji
}

export const shortcuts: Shortcut[] = [
  // ESSENTIAL (5)
  {
    id: 'copy',
    title: 'Kopieren',
    keys: ['Control', 'C'],
    keysDisplay: ['Strg', 'C'],
    category: 'essential',
    description: 'Kopiert ausgewählte Zellen in die Zwischenablage',
    useCase: 'Daten von einem Bereich in einen anderen übertragen',
    timeSaved: {
      perUse: 30,
      dailyUses: 50,
      weeklyTotal: 5,
    },
    proTip: 'Strg+Shift+V für Inhalte einfügen (ohne Formatierung)',
    relatedShortcuts: ['paste', 'cut'],
    difficulty: 1,
    platform: 'both',
    icon: '📋',
  },
  {
    id: 'paste',
    title: 'Einfügen',
    keys: ['Control', 'V'],
    keysDisplay: ['Strg', 'V'],
    category: 'essential',
    description: 'Fügt Inhalt aus der Zwischenablage ein',
    useCase: 'Kopierte Daten an neuer Stelle einfügen',
    timeSaved: {
      perUse: 25,
      dailyUses: 50,
      weeklyTotal: 4,
    },
    proTip: 'Strg+Alt+V öffnet "Inhalte einfügen" Dialog',
    relatedShortcuts: ['copy', 'cut'],
    difficulty: 1,
    platform: 'both',
    icon: '📥',
  },
  {
    id: 'cut',
    title: 'Ausschneiden',
    keys: ['Control', 'X'],
    keysDisplay: ['Strg', 'X'],
    category: 'essential',
    description: 'Schneidet ausgewählte Zellen aus',
    useCase: 'Daten verschieben statt kopieren',
    timeSaved: {
      perUse: 35,
      dailyUses: 20,
      weeklyTotal: 2,
    },
    proTip: 'Gestrichelte Linie zeigt Ausschnitt-Bereich',
    relatedShortcuts: ['copy', 'paste'],
    difficulty: 1,
    platform: 'both',
    icon: '✂️',
  },
  {
    id: 'undo',
    title: 'Rückgängig',
    keys: ['Control', 'Z'],
    keysDisplay: ['Strg', 'Z'],
    category: 'essential',
    description: 'Macht letzte Aktion rückgängig',
    useCase: 'Fehler schnell korrigieren',
    timeSaved: {
      perUse: 20,
      dailyUses: 30,
      weeklyTotal: 2,
    },
    proTip: 'Mehrfach drücken für mehrere Schritte zurück',
    relatedShortcuts: ['redo'],
    difficulty: 1,
    platform: 'both',
    icon: '↩️',
  },
  {
    id: 'save',
    title: 'Speichern',
    keys: ['Control', 'S'],
    keysDisplay: ['Strg', 'S'],
    category: 'essential',
    description: 'Speichert die aktuelle Datei',
    useCase: 'Arbeit regelmäßig sichern',
    timeSaved: {
      perUse: 15,
      dailyUses: 40,
      weeklyTotal: 2,
    },
    proTip: 'Gewöhne dir an, alle 5 Minuten zu speichern!',
    relatedShortcuts: [],
    difficulty: 1,
    platform: 'both',
    icon: '💾',
  },

  // POWER USER (7)
  {
    id: 'autofilter',
    title: 'AutoFilter',
    keys: ['Control', 'Shift', 'L'],
    keysDisplay: ['Strg', 'Shift', 'L'],
    category: 'power',
    description: 'Schaltet Filter für Tabellen ein/aus',
    useCase: 'Schnelles Filtern großer Datenmengen',
    timeSaved: {
      perUse: 8,
      dailyUses: 15,
      weeklyTotal: 0.5,
    },
    proTip: 'Cursor muss in Tabelle sein',
    relatedShortcuts: ['create-table'],
    difficulty: 2,
    platform: 'both',
    icon: '🔽',
  },
  {
    id: 'create-table',
    title: 'Tabelle erstellen',
    keys: ['Control', 'T'],
    keysDisplay: ['Strg', 'T'],
    category: 'power',
    description: 'Erstellt formatierte Tabelle aus Bereich',
    useCase: 'Daten strukturieren und filtern',
    timeSaved: {
      perUse: 12,
      dailyUses: 10,
      weeklyTotal: 0.5,
    },
    proTip: 'Tabellen erweitern sich automatisch',
    relatedShortcuts: ['autofilter'],
    difficulty: 2,
    platform: 'both',
    icon: '📊',
  },
  {
    id: 'autosum',
    title: 'AutoSumme',
    keys: ['Alt', '='],
    keysDisplay: ['Alt', '='],
    category: 'power',
    description: 'Fügt automatisch SUMME-Formel ein',
    useCase: 'Schnell Spalten/Zeilen summieren',
    timeSaved: {
      perUse: 10,
      dailyUses: 20,
      weeklyTotal: 0.7,
    },
    proTip: 'Funktioniert auch für Durchschnitt mit mehrfachem Drücken',
    relatedShortcuts: [],
    difficulty: 2,
    platform: 'both',
    icon: '➕',
  },
  {
    id: 'f4-repeat',
    title: 'Aktion wiederholen',
    keys: ['F4'],
    keysDisplay: ['F4'],
    category: 'power',
    description: 'Wiederholt letzte Aktion',
    useCase: 'Gleiche Formatierung mehrfach anwenden',
    timeSaved: {
      perUse: 15,
      dailyUses: 25,
      weeklyTotal: 1.5,
    },
    proTip: 'In Formeln: $ für absolute Bezüge einfügen',
    relatedShortcuts: [],
    difficulty: 2,
    platform: 'both',
    icon: '🔁',
  },
  {
    id: 'select-range',
    title: 'Bereich markieren',
    keys: ['Control', 'Shift', 'Arrow'],
    keysDisplay: ['Strg', 'Shift', '→'],
    category: 'power',
    description: 'Markiert kompletten Datenbereich',
    useCase: 'Große Bereiche schnell auswählen',
    timeSaved: {
      perUse: 20,
      dailyUses: 30,
      weeklyTotal: 2,
    },
    proTip: 'Kombiniere mit Strg+Pfeiltaste zum Springen',
    relatedShortcuts: ['jump-edge'],
    difficulty: 2,
    platform: 'both',
    icon: '📦',
  },
  {
    id: 'format-cells',
    title: 'Zellen formatieren',
    keys: ['Control', '1'],
    keysDisplay: ['Strg', '1'],
    category: 'power',
    description: 'Öffnet Zellen-Formatierungs-Dialog',
    useCase: 'Schneller Zugriff auf alle Format-Optionen',
    timeSaved: {
      perUse: 8,
      dailyUses: 15,
      weeklyTotal: 0.5,
    },
    proTip: 'Tabs mit Strg+Tab wechseln im Dialog',
    relatedShortcuts: [],
    difficulty: 2,
    platform: 'both',
    icon: '🎨',
  },
  {
    id: 'line-break',
    title: 'Zeilenumbruch in Zelle',
    keys: ['Alt', 'Enter'],
    keysDisplay: ['Alt', 'Enter'],
    category: 'power',
    description: 'Fügt Zeilenumbruch innerhalb einer Zelle ein',
    useCase: 'Mehrzeilige Texte in einer Zelle',
    timeSaved: {
      perUse: 10,
      dailyUses: 10,
      weeklyTotal: 0.3,
    },
    proTip: 'Zelle wird automatisch auf "Textumbruch" gesetzt',
    relatedShortcuts: [],
    difficulty: 2,
    platform: 'both',
    icon: '↵',
  },

  // NINJA LEVEL (8)
  {
    id: 'jump-edge',
    title: 'Zum Datenende springen',
    keys: ['Control', 'Arrow'],
    keysDisplay: ['Strg', '→'],
    category: 'ninja',
    description: 'Springt zum Ende des Datenbereichs',
    useCase: 'Schnell durch große Tabellen navigieren',
    timeSaved: {
      perUse: 15,
      dailyUses: 40,
      weeklyTotal: 2.5,
    },
    proTip: 'Kombiniere mit Shift zum Markieren',
    relatedShortcuts: ['select-range'],
    difficulty: 3,
    platform: 'both',
    icon: '🏃',
  },
  {
    id: 'show-formulas',
    title: 'Formeln anzeigen',
    keys: ['Control', '`'],
    keysDisplay: ['Strg', '`'],
    category: 'ninja',
    description: 'Zeigt Formeln statt Werte',
    useCase: 'Formeln debuggen und überprüfen',
    timeSaved: {
      perUse: 20,
      dailyUses: 5,
      weeklyTotal: 0.3,
    },
    proTip: 'Taste über Tab (links neben der 1)',
    relatedShortcuts: [],
    difficulty: 3,
    platform: 'both',
    icon: '🔍',
  },
  {
    id: 'go-to-a1',
    title: 'Zurück zu A1',
    keys: ['Control', 'Home'],
    keysDisplay: ['Strg', 'Pos1'],
    category: 'ninja',
    description: 'Springt zurück zu Zelle A1',
    useCase: 'Schnell zum Anfang der Tabelle',
    timeSaved: {
      perUse: 10,
      dailyUses: 20,
      weeklyTotal: 0.7,
    },
    proTip: 'Strg+Ende springt zur letzten genutzten Zelle',
    relatedShortcuts: [],
    difficulty: 3,
    platform: 'both',
    icon: '🏠',
  },
  {
    id: 'insert-row',
    title: 'Zeile/Spalte einfügen',
    keys: ['Control', 'Shift', '+'],
    keysDisplay: ['Strg', 'Shift', '+'],
    category: 'ninja',
    description: 'Fügt Zeile oder Spalte ein',
    useCase: 'Neue Zeilen/Spalten schnell hinzufügen',
    timeSaved: {
      perUse: 8,
      dailyUses: 15,
      weeklyTotal: 0.5,
    },
    proTip: 'Markiere vorher ob Zeile oder Spalte',
    relatedShortcuts: ['delete-row'],
    difficulty: 3,
    platform: 'both',
    icon: '➕',
  },
  {
    id: 'edit-cell',
    title: 'Zelle bearbeiten',
    keys: ['F2'],
    keysDisplay: ['F2'],
    category: 'ninja',
    description: 'Bearbeitet Zelle ohne Doppelklick',
    useCase: 'Schnell Zellinhalte ändern',
    timeSaved: {
      perUse: 5,
      dailyUses: 50,
      weeklyTotal: 1,
    },
    proTip: 'Cursor wird am Ende des Inhalts platziert',
    relatedShortcuts: [],
    difficulty: 3,
    platform: 'both',
    icon: '✏️',
  },
  {
    id: 'paste-special',
    title: 'Inhalte einfügen',
    keys: ['Control', 'Alt', 'V'],
    keysDisplay: ['Strg', 'Alt', 'V'],
    category: 'ninja',
    description: 'Öffnet "Inhalte einfügen" Dialog',
    useCase: 'Nur Werte, Formeln oder Formate einfügen',
    timeSaved: {
      perUse: 12,
      dailyUses: 20,
      weeklyTotal: 1,
    },
    proTip: 'Danach T für Transponieren, W für Werte',
    relatedShortcuts: ['paste'],
    difficulty: 3,
    platform: 'both',
    icon: '📋',
  },
  {
    id: 'auto-column-width',
    title: 'Spaltenbreite anpassen',
    keys: ['Alt', 'H', 'O', 'I'],
    keysDisplay: ['Alt', 'H', 'O', 'I'],
    category: 'ninja',
    description: 'Passt Spaltenbreite automatisch an',
    useCase: 'Alle Inhalte vollständig sichtbar machen',
    timeSaved: {
      perUse: 15,
      dailyUses: 10,
      weeklyTotal: 0.6,
    },
    proTip: 'Doppelklick auf Spaltenrand macht das gleiche',
    relatedShortcuts: [],
    difficulty: 3,
    platform: 'windows',
    icon: '↔️',
  },
  {
    id: 'expand-formula-bar',
    title: 'Formelleiste erweitern',
    keys: ['Control', 'Shift', 'U'],
    keysDisplay: ['Strg', 'Shift', 'U'],
    category: 'ninja',
    description: 'Erweitert die Formelleiste für lange Formeln',
    useCase: 'Komplexe Formeln besser bearbeiten',
    timeSaved: {
      perUse: 10,
      dailyUses: 8,
      weeklyTotal: 0.3,
    },
    proTip: 'Besonders nützlich für verschachtelte Formeln',
    relatedShortcuts: [],
    difficulty: 3,
    platform: 'both',
    icon: '📏',
  },
];

// Helper functions
export function getShortcutsByCategory(category: Shortcut['category']) {
  return shortcuts.filter((s) => s.category === category);
}

export function getShortcutById(id: string) {
  return shortcuts.find((s) => s.id === id);
}

export function calculateTotalTimeSaved() {
  return shortcuts.reduce((total, shortcut) => total + shortcut.timeSaved.weeklyTotal, 0);
}

export function getRelatedShortcuts(shortcut: Shortcut) {
  return shortcut.relatedShortcuts
    .map((id) => shortcuts.find((s) => s.id === id))
    .filter(Boolean) as Shortcut[];
}
