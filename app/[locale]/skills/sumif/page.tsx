"use client";

import { Link } from "@/i18n/routing";
import { SumIfPreview } from "@/components/animations/SumIfPreview";
import {
  SumIfIntro,
  SumIfError,
  SumIfTip,
} from "@/components/animations/micro";
import { SumIfLiveDemo } from "@/components/skills/interactive/SumIfLiveDemo";

export default function SumIfDetailPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="text-sm mb-4 opacity-90">
              <Link href="/" className="hover:underline">Home</Link>
              <span className="mx-2">›</span>
              <Link href="/skills" className="hover:underline">Skills</Link>
              <span className="mx-2">›</span>
              <span>SUMMEWENN</span>
            </nav>

            <div className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-4xl md:text-5xl font-bold">SUMMEWENN</h1>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  Anfänger
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  Formeln
                </span>
              </div>

              <p className="text-xl text-blue-100">
                Summiere nur die Werte, die eine bestimmte Bedingung erfüllen - perfekt für bedingte Berechnungen
              </p>

              <div className="flex items-center gap-4 pt-2">
                <Link
                  href="/chat"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
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
            <h2 className="text-2xl font-bold">Was ist SUMMEWENN?</h2>
          </div>
          <SumIfIntro />
        </div>
      </section>

      {/* Explanation */}
      <section className="bg-slate-50 dark:bg-slate-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">💡 Wofür brauchst du SUMMEWENN?</h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
              SUMMEWENN (auf Englisch: SUMIF) addiert nur die Zahlen, die eine bestimmte Bedingung erfüllen.
              Perfekt wenn du z.B. nur Umsätze einer bestimmten Kategorie oder Zeitperiode summieren willst.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Perfekt für:
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Umsätze pro Kategorie berechnen</li>
                  <li>• Ausgaben eines Monats summieren</li>
                  <li>• Verkäufe pro Region addieren</li>
                  <li>• Kosten nach Abteilung gruppieren</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="text-blue-600">⚡</span>
                  Wann nutzen?
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Du hast eine lange Liste mit Kategorien</li>
                  <li>• Du willst nur bestimmte Werte addieren</li>
                  <li>• Deine Daten sind in einer Tabelle</li>
                  <li>• Du brauchst automatische Summen</li>
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

          <SumIfPreview />

          <div className="mt-8 bg-slate-100 dark:bg-slate-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Syntax:</h3>
            <code className="block bg-white dark:bg-slate-900 p-4 rounded font-mono text-sm overflow-x-auto">
              =SUMMEWENN(Bereich; Kriterium; [Summe_Bereich])
            </code>

            <div className="mt-6 space-y-4">
              <div>
                <div className="font-semibold text-sm text-blue-600 dark:text-blue-400">Bereich</div>
                <div className="text-sm text-slate-700 dark:text-slate-300">
                  Die Spalte, in der nach dem Kriterium gesucht wird (z.B. Kategorie-Spalte)
                </div>
              </div>
              <div>
                <div className="font-semibold text-sm text-blue-600 dark:text-blue-400">Kriterium</div>
                <div className="text-sm text-slate-700 dark:text-slate-300">
                  Die Bedingung, die erfüllt sein muss (z.B. "Elektronik") - immer in Anführungszeichen!
                </div>
              </div>
              <div>
                <div className="font-semibold text-sm text-blue-600 dark:text-blue-400">Summe_Bereich (optional)</div>
                <div className="text-sm text-slate-700 dark:text-slate-300">
                  Die Spalte mit den Zahlen, die summiert werden sollen. Falls weggelassen: Bereich wird summiert
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Live Demo */}
      <section className="bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-blue-950 dark:via-cyan-950 dark:to-teal-950 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center gap-2">
              <span className="text-2xl">🎮</span>
              <h2 className="text-2xl font-bold">Probier es selbst!</h2>
            </div>

            <div className="mb-6">
              <p className="text-slate-700 dark:text-slate-300">
                Gib deine eigene SUMMEWENN-Formel ein und sieh das Ergebnis in Echtzeit.
                Experimentiere mit verschiedenen Parametern und erhalte sofortiges Feedback!
              </p>
            </div>

            <SumIfLiveDemo />

            <div className="mt-6 bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Lern-Tipp: Learning by Doing
                  </h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Die beste Art Excel zu lernen ist durch Ausprobieren! Versuche die Formel
                    selbst zu schreiben, bevor du den Hint anschaust. Fehler sind der beste Lehrer!
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

            <SumIfTip />

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span>💎</span>
                  SUMMEWENNS für mehrere Bedingungen
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Für mehr als eine Bedingung nutze SUMMEWENNS - z.B. "Elektronik" UND "Q1"!
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span>⚡</span>
                  Vergleichsoperatoren
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Nutze "&gt;1000" für "größer als" oder "&lt;500" für "kleiner als" als Kriterium.
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

          <SumIfError />

          <div className="mt-8 space-y-4">
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2 text-red-800 dark:text-red-300">Anführungszeichen vergessen</h3>
              <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                Problem: Text-Kriterien ohne Anführungszeichen
              </p>
              <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
                <li>• Falsch: =SUMMEWENN(A:A;Elektronik;B:B)</li>
                <li>• Richtig: =SUMMEWENN(A:A;"Elektronik";B:B)</li>
                <li>• Bei Zahlen keine Anführungszeichen nötig!</li>
              </ul>
            </div>

            <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2 text-orange-800 dark:text-orange-300">Falsche Bereiche</h3>
              <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
                Problem: Such-Bereich und Summen-Bereich haben unterschiedliche Größe
              </p>
              <p className="text-sm text-orange-600 dark:text-orange-400">
                Beide Bereiche müssen gleich viele Zeilen haben! (z.B. A2:A10 und B2:B10)
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
              <Link href="/skills/countif" className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                <h3 className="font-semibold mb-2">ZÄHLENWENN</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Zähle statt summieren
                </p>
              </Link>

              <Link href="/skills/averageif" className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                <h3 className="font-semibold mb-2">MITTELWERTWENN</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Durchschnitt mit Bedingung
                </p>
              </Link>

              <Link href="/skills/pivotTable" className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                <h3 className="font-semibold mb-2">Pivot-Tabellen</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Daten automatisch gruppieren
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Bereit, SUMMEWENN zu meistern?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Stell unsere KI deine Fragen und erhalte sofort Hilfe mit konkreten Beispielen!
          </p>
          <Link
            href="/chat"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            KI-Assistent starten →
          </Link>
        </div>
      </section>
    </div>
  );
}
