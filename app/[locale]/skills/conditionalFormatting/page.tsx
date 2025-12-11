"use client";

import { Link } from "@/i18n/routing";
import { ConditionalFormattingPreview } from "@/components/animations/ConditionalFormattingPreview";
import {
  ConditionalFormattingIntro,
  ConditionalFormattingError,
  ConditionalFormattingTip,
} from "@/components/animations/micro";
import { ConditionalFormattingLiveDemo } from "@/components/skills/interactive/ConditionalFormattingLiveDemo";

export default function ConditionalFormattingDetailPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="text-sm mb-4 opacity-90">
              <Link href="/" className="hover:underline">Home</Link>
              <span className="mx-2">›</span>
              <Link href="/skills" className="hover:underline">Skills</Link>
              <span className="mx-2">›</span>
              <span>Bedingte Formatierung</span>
            </nav>

            <div className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-4xl md:text-5xl font-bold">Bedingte Formatierung</h1>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  Anfänger
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  Formatierung
                </span>
              </div>

              <p className="text-xl text-green-100">
                Zellen automatisch färben basierend auf ihren Werten - für bessere Übersicht auf einen Blick
              </p>

              <div className="flex items-center gap-4 pt-2">
                <Link
                  href="/chat"
                  className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
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
            <h2 className="text-2xl font-bold">Was ist Bedingte Formatierung?</h2>
          </div>
          <ConditionalFormattingIntro />
        </div>
      </section>

      {/* Explanation */}
      <section className="bg-slate-50 dark:bg-slate-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">💡 Wofür brauchst du das?</h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
              Bedingte Formatierung färbt Zellen automatisch basierend auf ihren Werten.
              So erkennst du wichtige Informationen auf einen Blick - ohne selbst Farben setzen zu müssen!
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Perfekt für:
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Ampel-Systeme (Grün/Gelb/Rot)</li>
                  <li>• Top/Flop Kennzahlen highlighten</li>
                  <li>• Duplikate finden</li>
                  <li>• Deadlines visualisieren</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="text-blue-600">⚡</span>
                  Wann nutzen?
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Daten auf einen Blick erfassen</li>
                  <li>• Probleme sofort erkennen</li>
                  <li>• Reports visuell aufwerten</li>
                  <li>• Automatische Dashboards</li>
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
            <h2 className="text-2xl font-bold">So funktioniert's</h2>
          </div>

          <ConditionalFormattingPreview />

          <div className="mt-8 bg-slate-100 dark:bg-slate-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Schritte:</h3>
            <ol className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">1</span>
                <div>
                  <div className="font-semibold">Bereich markieren</div>
                  <div className="text-slate-600 dark:text-slate-400">Wähle die Zellen aus, die formatiert werden sollen</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">2</span>
                <div>
                  <div className="font-semibold">Regel erstellen</div>
                  <div className="text-slate-600 dark:text-slate-400">Start → Bedingte Formatierung → Neue Regel</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">3</span>
                <div>
                  <div className="font-semibold">Bedingung festlegen</div>
                  <div className="text-slate-600 dark:text-slate-400">Z.B. "Wert größer als 1000"</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">4</span>
                <div>
                  <div className="font-semibold">Format wählen</div>
                  <div className="text-slate-600 dark:text-slate-400">Farbe, Schrift, Rahmen festlegen</div>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Interactive Live Demo */}
      <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center gap-2">
              <span className="text-2xl">🎮</span>
              <h2 className="text-2xl font-bold">Probier es selbst!</h2>
            </div>

            <div className="mb-6">
              <p className="text-slate-700 dark:text-slate-300">
                Erstelle deine eigenen Formatierungsregeln und sieh in Echtzeit, wie sich die Zellen färben.
                Experimentiere mit verschiedenen Bedingungen und Farben!
              </p>
            </div>

            <ConditionalFormattingLiveDemo />

            <div className="mt-6 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                    Lern-Tipp: Learning by Doing
                  </h3>
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Die beste Art Excel zu lernen ist durch Ausprobieren! Versuche verschiedene Regeln
                    zu kombinieren und schau was passiert. Ein Ampel-System ist ein perfekter Start!
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

            <ConditionalFormattingTip />

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span>🎨</span>
                  Farb-Skalen nutzen
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Statt einzelner Farben: Nutze Farbverläufe für kontinuierliche Werte!
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span>📊</span>
                  Datenbalken
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Zeige Werte als Balken direkt in der Zelle für schnellen Vergleich!
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

          <ConditionalFormattingError />

          <div className="mt-8 space-y-4">
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2 text-red-800 dark:text-red-300">Überlappende Regeln</h3>
              <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                Problem: Mehrere Regeln treffen zu
              </p>
              <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
                <li>• Erste zutreffende Regel gewinnt</li>
                <li>• Spezifischere Regeln nach oben</li>
                <li>• "Stoppe wenn wahr" aktivieren</li>
              </ul>
            </div>

            <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2 text-orange-800 dark:text-orange-300">Relative Bezüge</h3>
              <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
                Problem: Formel verschiebt sich beim Kopieren
              </p>
              <p className="text-sm text-orange-600 dark:text-orange-400">
                Nutze $ für absolute Bezüge wenn nötig!
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
              <Link href="/skills/dataValidation" className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:border-green-500 dark:hover:border-green-500 transition-colors">
                <h3 className="font-semibold mb-2">Datenüberprüfung</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Kontrolle der Eingaben
                </p>
              </Link>

              <Link href="/skills/charts" className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:border-green-500 dark:hover:border-green-500 transition-colors">
                <h3 className="font-semibold mb-2">Diagramme</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Daten visualisieren
                </p>
              </Link>

              <Link href="/skills/sumif" className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:border-green-500 dark:hover:border-green-500 transition-colors">
                <h3 className="font-semibold mb-2">SUMMEWENN</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Bedingte Berechnungen
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Bereit, Bedingte Formatierung zu meistern?
          </h2>
          <p className="text-lg text-green-100 mb-8">
            Stell unsere KI deine Fragen und erhalte sofort Hilfe mit konkreten Beispielen!
          </p>
          <Link
            href="/chat"
            className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            KI-Assistent starten →
          </Link>
        </div>
      </section>
    </div>
  );
}
