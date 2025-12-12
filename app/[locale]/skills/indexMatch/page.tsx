"use client";

import { Link } from "@/i18n/routing";
import {
  IndexMatchIntro,
  IndexMatchError,
  IndexMatchTip,
} from "@/components/animations/micro";
import { IndexMatchLiveDemo } from "@/components/skills/interactive/IndexMatchLiveDemo";

export default function IndexMatchDetailPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="text-sm mb-4 opacity-90">
              <Link href="/" className="hover:underline">Home</Link>
              <span className="mx-2">›</span>
              <Link href="/skills" className="hover:underline">Skills</Link>
              <span className="mx-2">›</span>
              <span>INDEX/VERGLEICH</span>
            </nav>

            <div className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-4xl md:text-5xl font-bold">INDEX/VERGLEICH</h1>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  Fortgeschritten
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  Formeln
                </span>
              </div>

              <p className="text-xl text-emerald-100">
                Die flexible und mächtigere Alternative zu SVERWEIS - suche in beide Richtungen!
              </p>

              <div className="flex items-center gap-4 pt-2">
                <Link
                  href="/chat"
                  className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
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
            <h2 className="text-2xl font-bold">Was ist INDEX/VERGLEICH?</h2>
          </div>
          <IndexMatchIntro />
        </div>
      </section>

      {/* Explanation */}
      <section className="bg-slate-50 dark:bg-slate-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">💡 Warum INDEX/VERGLEICH statt SVERWEIS?</h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
              INDEX/VERGLEICH ist die professionelle Alternative zu SVERWEIS.
              Die Kombination aus zwei Funktionen ist flexibler, schneller und kann in beide Richtungen suchen!
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Vorteile
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Suche links UND rechts von der Suchspalte</li>
                  <li>• Flexibel bei Spaltenänderungen</li>
                  <li>• Schneller bei großen Datenmengen</li>
                  <li>• Kann 2D-Suchen durchführen</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="text-blue-600">⚡</span>
                  Perfekt für:
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Komplexe Nachschlage-Szenarien</li>
                  <li>• Dynamische Tabellen</li>
                  <li>• Große Datensätze (&gt;10.000 Zeilen)</li>
                  <li>• Professionelle Excel-Lösungen</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Live Demo */}
      <section className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center gap-2">
              <span className="text-2xl">🎮</span>
              <h2 className="text-2xl font-bold">Probier es selbst!</h2>
            </div>

            <div className="mb-6">
              <p className="text-slate-700 dark:text-slate-300">
                Schreibe deine eigene INDEX/VERGLEICH-Formel und sieh das Ergebnis in Echtzeit.
                Experimentiere und lerne durch Ausprobieren!
              </p>
            </div>

            <IndexMatchLiveDemo />

            <div className="mt-6 bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h3 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
                    Lern-Tipp: Schritt für Schritt denken
                  </h3>
                  <p className="text-sm text-emerald-800 dark:text-emerald-200">
                    INDEX/VERGLEICH besteht aus zwei Teilen: VERGLEICH findet die Position,
                    INDEX holt den Wert. Denke immer zuerst: "Wo ist es?" dann "Was hole ich?"
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

            <IndexMatchTip />

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span>🎯</span>
                  2D-Lookup
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Kombiniere zwei VERGLEICH-Funktionen für Zeilen UND Spalten!
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span>⚡</span>
                  Performance-Boost
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Bei sortierten Daten: Nutze 1 statt 0 als letzten Parameter!
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

          <IndexMatchError />

          <div className="mt-8 space-y-4">
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2 text-red-800 dark:text-red-300">Bereiche passen nicht zusammen</h3>
              <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                Problem: INDEX-Bereich und VERGLEICH-Bereich haben unterschiedliche Länge
              </p>
              <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
                <li>• Beide Bereiche müssen gleich viele Zeilen haben</li>
                <li>• Nutze ganze Spalten (A:A, B:B) für Sicherheit</li>
                <li>• Prüfe mit ZEILEN() Funktion</li>
              </ul>
            </div>

            <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2 text-orange-800 dark:text-orange-300">Falscher Vergleichstyp</h3>
              <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
                Problem: 0 vergessen → ungenaue Treffer
              </p>
              <p className="text-sm text-orange-600 dark:text-orange-400">
                Immer 0 als letzten Parameter für exakte Suche!
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
              <Link href="/skills/vlookup" className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors">
                <h3 className="font-semibold mb-2">SVERWEIS</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Die einfachere Alternative
                </p>
              </Link>

              <Link href="/skills/sumif" className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors">
                <h3 className="font-semibold mb-2">SUMMEWENN</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Kombiniere mit INDEX/MATCH
                </p>
              </Link>

              <Link href="/skills/pivotTables" className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors">
                <h3 className="font-semibold mb-2">Pivot-Tabellen</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Alternative für Analysen
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Bereit, INDEX/VERGLEICH zu meistern?
          </h2>
          <p className="text-lg text-emerald-100 mb-8">
            Stell unsere KI deine Fragen und erhalte sofort Hilfe mit konkreten Beispielen!
          </p>
          <Link
            href="/chat"
            className="inline-block bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
          >
            KI-Assistent starten →
          </Link>
        </div>
      </section>
    </div>
  );
}
