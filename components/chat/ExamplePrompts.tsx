'use client';

export interface ExamplePromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const EXAMPLE_PROMPTS = [
  {
    icon: '🔍',
    title: 'SVERWEIS',
    prompt: 'Wie funktioniert die SVERWEIS-Funktion? Zeige mir ein praktisches Beispiel.',
  },
  {
    icon: '📊',
    title: 'Pivot-Tabellen',
    prompt: 'Wie erstelle ich eine Pivot-Tabelle? Erkläre es Schritt für Schritt.',
  },
  {
    icon: '🔢',
    title: 'Bedingte Formatierung',
    prompt: 'Wie verwende ich bedingte Formatierung, um Zellen automatisch einzufärben?',
  },
  {
    icon: '📈',
    title: 'Diagramme',
    prompt: 'Welches Diagramm eignet sich am besten für Umsatzdaten über Zeit?',
  },
  {
    icon: '🧮',
    title: 'Formeln kombinieren',
    prompt: 'Wie kombiniere ich WENN und SVERWEIS in einer Formel?',
  },
  {
    icon: '⚡',
    title: 'Shortcuts',
    prompt: 'Was sind die wichtigsten Excel-Tastenkombinationen für effizientes Arbeiten?',
  },
];

export function ExamplePrompts({ onSelectPrompt }: ExamplePromptsProps) {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Excel-Experte</h2>
        <p className="text-muted-foreground">
          Stelle deine Fragen zu Excel - präzise Antworten mit Formeln und Beispielen
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {EXAMPLE_PROMPTS.map((example, index) => (
          <button
            key={index}
            onClick={() => onSelectPrompt(example.prompt)}
            className="group text-left p-4 rounded-lg border border-border bg-card hover:bg-muted hover:border-primary/50 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl flex-shrink-0">{example.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="font-medium mb-1 group-hover:text-primary transition-colors">
                  {example.title}
                </div>
                <div className="text-sm text-muted-foreground line-clamp-2">
                  {example.prompt}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="text-center text-xs text-muted-foreground">
        Oder schreibe deine eigene Frage unten
      </div>
    </div>
  );
}
