"use client";

import { Link } from "@/i18n/routing";
import { PivotTablePreview } from "@/components/animations/PivotTablePreview";
import {
  PivotTableIntro,
  PivotTableError,
  PivotTableTip,
} from "@/components/animations/micro";
import { PivotTableLiveDemo } from "@/components/skills/interactive/PivotTableLiveDemo";

export default function PivotTablesDetailPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="text-sm mb-4 opacity-90">
              <Link href="/" className="hover:underline">Home</Link>
              <span className="mx-2">›</span>
              <Link href="/skills" className="hover:underline">Skills</Link>
              <span className="mx-2">›</span>
              <span>Pivot-Tabellen</span>
            </nav>

            <div className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-4xl md:text-5xl font-bold">Pivot-Tabellen</h1>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  Fortgeschritten
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  Datenanalyse
                </span>
              </div>

              <p className="text-xl text-indigo-100">
                Verwandle große Datenmengen in übersichtliche Zusammenfassungen - mit wenigen Klicks
              </p>

              <div className="flex items-center gap-4 pt-2">
                <Link
                  href="/chat"
                  className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
                >
                  Im Chat ausprobieren →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Animation */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-center gap-2">
            <span className="text-2xl">🎬</span>
            <h2 className="text-2xl font-bold">Was sind Pivot-Tabellen?</h2>
          </div>
          <PivotTableIntro />
        </div>
      </section>

      {/* Explanation */}
      <section className="bg-slate-50 dark:bg-slate-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">💡 Wofür brauchst du Pivot-Tabellen?</h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
              Pivot-Tabellen sind das mächtigste Werkzeug in Excel für Datenanalyse.
              Sie fassen große Datenmengen automatisch zusammen und erstellen übersichtliche Reports -
              ohne eine einzige Formel schreiben zu müssen!
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Perfekt für:
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Verkaufsdaten nach Regionen gruppieren</li>
                  <li>• Monatliche Umsätze vergleichen</li>
                  <li>• Top-Produkte identifizieren</li>
                  <li>• Trends und Muster erkennen</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="text-blue-600">⚡</span>
                  Vorteile
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Keine Formeln nötig!</li>
                  <li>• Dynamisch: Daten ändern sich mit</li>
                  <li>• Flexible Umstrukturierung</li>
                  <li>• Blitzschnelle Analyse</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorial Animation */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-center gap-2">
            <span className="text-2xl">📖</span>
            <h2 className="text-2xl font-bold">Schritt-für-Schritt Tutorial</h2>
          </div>

          <PivotTablePreview />

          <div className="mt-8 bg-slate-100 dark:bg-slate-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Schritte zum Erstellen:</h3>
            <ol className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="bg-indigo-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">1</span>
                <div>
                  <div className="font-semibold">Daten markieren</div>
                  <div className="text-slate-600 dark:text-slate-400">Wähle den gesamten Datenbereich inkl. Überschriften</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-indigo-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">2</span>
                <div>
                  <div className="font-semibold">Pivot einfügen</div>
                  <div className="text-slate-600 dark:text-slate-400">Einfügen → PivotTable</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-indigo-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">3</span>
                <div>
                  <div className="font-semibold">Felder ziehen</div>
                  <div className="text-slate-600 dark:text-slate-400">Felder in Zeilen, Spalten, Werte ziehen</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-indigo-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">4</span>
                <div>
                  <div className="font-semibold">Formatieren</div>
                  <div className="text-slate-600 dark:text-slate-400">Layout und Design anpassen</div>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Interactive Live Demo */}
      <section className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center gap-2">
              <span className="text-2xl">🎮</span>
              <h2 className="text-2xl font-bold">Probier es selbst!</h2>
            </div>

            <div className="mb-6">
              <p className="text-slate-700 dark:text-slate-300">
                Konfiguriere deine eigene Pivot-Tabelle und sieh sofort das Ergebnis.
                Experimentiere mit verschiedenen Zeilen-, Spalten- und Werte-Kombinationen!
              </p>
            </div>

            <PivotTableLiveDemo />

            <div className="mt-6 bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-300 dark:border-indigo-700 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h3 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
                    Lern-Tipp: Experimentieren
                  </h3>
                  <p className="text-sm text-indigo-800 dark:text-indigo-200">
                    Pivot-Tabellen lernt man am besten durch Ausprobieren! Verändere die Felder
                    und beobachte, wie sich die Darstellung ändert. Es gibt kein "Falsch"!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pro Tip */}
      <section className="bg-purple-50 dark:bg-purple-950/20 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              <h2 className="text-2xl font-bold">Pro-Tipps</h2>
            </div>

            <PivotTableTip />

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span>🔄</span>
                  Daten aktualisieren
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Rechtsklick auf Pivot → "Aktualisieren" holt sich neue Daten aus der Quelle!
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span>📊</span>
                  Pivot-Charts
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Erstelle automatisch ein Diagramm aus deiner Pivot-Tabelle!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Errors */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            <h2 className="text-2xl font-bold">Häufige Fehler vermeiden</h2>
          </div>

          <PivotTableError />

          <div className="mt-8 space-y-4">
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2 text-red-800 dark:text-red-300">Leere Zellen in Daten</h3>
              <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                Problem: Lücken in Spalten führen zu falschen Gruppierungen
              </p>
              <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
                <li>• Alle Zellen ausfüllen vor Pivot-Erstellung</li>
                <li>• Besonders wichtig: Kategorien-Spalten</li>
                <li>• "Suchen & Ersetzen" nutzen für Lücken</li>
              </ul>
            </div>

            <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2 text-orange-800 dark:text-orange-300">Keine Überschriften</h3>
              <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
                Problem: Erste Zeile wird als Datenzeile interpretiert
              </p>
              <p className="text-sm text-orange-600 dark:text-orange-400">
                Immer Spaltenüberschriften in Zeile 1 einfügen!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Skills */}
      <section className="bg-slate-50 dark:bg-slate-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">🔗 Verwandte Skills</h2>

            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/skills/sumif" className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
                <h3 className="font-semibold mb-2">SUMMEWENN</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Alternative für einfache Summen
                </p>
              </Link>

              <Link href="/skills/dataValidation" className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
                <h3 className="font-semibold mb-2">Datenüberprüfung</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Saubere Daten für Pivot
                </p>
              </Link>

              <Link href="/skills/charts" className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
                <h3 className="font-semibold mb-2">Diagramme</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Pivot-Daten visualisieren
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Bereit, Pivot-Tabellen zu meistern?
          </h2>
          <p className="text-lg text-indigo-100 mb-8">
            Stell unsere KI deine Fragen und erhalte sofort Hilfe mit konkreten Beispielen!
          </p>
          <Link
            href="/chat"
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
          >
            KI-Assistent starten →
          </Link>
        </div>
      </section>
    </div>
  );
}
