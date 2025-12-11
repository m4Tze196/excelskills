"use client";

import { Link } from "@/i18n/routing";
import { VLookupPreview } from "@/components/animations/VLookupPreview";
import { VLookupIntro } from "@/components/animations/micro/VLookupIntro";
import { VLookupError } from "@/components/animations/micro/VLookupError";
import { VLookupTip } from "@/components/animations/micro/VLookupTip";
import { VLookupLiveDemo } from "@/components/skills/interactive/VLookupLiveDemo";

export default function VLookupDetailPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-sm mb-4 opacity-90">
              <Link href="/" className="hover:underline">Home</Link>
              <span className="mx-2">›</span>
              <Link href="/skills" className="hover:underline">Skills</Link>
              <span className="mx-2">›</span>
              <span>SVERWEIS</span>
            </nav>

            {/* Title & Badges */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-4xl md:text-5xl font-bold">SVERWEIS</h1>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  Fortgeschritten
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  Formeln
                </span>
              </div>

              <p className="text-xl text-blue-100">
                Suche und hole Werte aus anderen Tabellen - der Klassiker für Daten-Lookups
              </p>

              <div className="flex items-center gap-4 pt-2">
                <Link
                  href="/chat"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Im Chat ausprobieren →
                </Link>
                <button className="text-white/90 hover:text-white underline text-sm">
                  Als Favorit speichern
                </button>
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
            <h2 className="text-2xl font-bold">Was ist SVERWEIS?</h2>
          </div>
          <VLookupIntro />
        </div>
      </section>

      {/* Explanation Section */}
      <section className="bg-slate-50 dark:bg-slate-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">💡 Wofür brauchst du SVERWEIS?</h2>

            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                SVERWEIS (auf Englisch: VLOOKUP) ist eine der wichtigsten Excel-Funktionen.
                Sie sucht einen Wert in der ersten Spalte einer Tabelle und gibt einen Wert
                aus derselben Zeile in einer anderen Spalte zurück.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Perfekt für:
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Preise aus Preislisten holen</li>
                    <li>• Kundendaten zusammenführen</li>
                    <li>• Artikelinformationen nachschlagen</li>
                    <li>• Daten aus verschiedenen Tabellen verbinden</li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <span className="text-blue-600">⚡</span>
                    Wann nutzen?
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Du hast zwei Tabellen mit gemeinsamer ID</li>
                    <li>• Du willst Informationen automatisch übertragen</li>
                    <li>• Deine Daten sind vertikal organisiert</li>
                    <li>• Du suchst immer von links nach rechts</li>
                  </ul>
                </div>
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

          <VLookupPreview />

          <div className="mt-8 bg-slate-100 dark:bg-slate-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Syntax:</h3>
            <code className="block bg-white dark:bg-slate-900 p-4 rounded font-mono text-sm overflow-x-auto">
              =SVERWEIS(Suchkriterium; Tabelle; Spaltenindex; [Bereich_Verweis])
            </code>

            <div className="mt-6 space-y-4">
              <div>
                <div className="font-semibold text-sm text-blue-600 dark:text-blue-400">Suchkriterium</div>
                <div className="text-sm text-slate-700 dark:text-slate-300">Der Wert, den du suchen möchtest (z.B. Produkt-ID)</div>
              </div>
              <div>
                <div className="font-semibold text-sm text-blue-600 dark:text-blue-400">Tabelle</div>
                <div className="text-sm text-slate-700 dark:text-slate-300">Der Bereich, in dem gesucht wird (z.B. Preisliste!A:B)</div>
              </div>
              <div>
                <div className="font-semibold text-sm text-blue-600 dark:text-blue-400">Spaltenindex</div>
                <div className="text-sm text-slate-700 dark:text-slate-300">Welche Spalte soll zurückgegeben werden? (1 = erste Spalte, 2 = zweite, etc.)</div>
              </div>
              <div>
                <div className="font-semibold text-sm text-blue-600 dark:text-blue-400">Bereich_Verweis</div>
                <div className="text-sm text-slate-700 dark:text-slate-300">FALSCH = exakte Übereinstimmung (empfohlen), WAHR = ungefähre Übereinstimmung</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Live Demo */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center gap-2">
              <span className="text-2xl">🎮</span>
              <h2 className="text-2xl font-bold">Probier es selbst!</h2>
            </div>

            <div className="mb-6">
              <p className="text-slate-700 dark:text-slate-300">
                Gib deine eigene SVERWEIS-Formel ein und sieh das Ergebnis in Echtzeit.
                Experimentiere mit verschiedenen Parametern und erhalte sofortiges Feedback!
              </p>
            </div>

            <VLookupLiveDemo />

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

      {/* Pro Tip Section */}
      <section className="bg-purple-50 dark:bg-purple-950/20 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              <h2 className="text-2xl font-bold">Pro-Tipps</h2>
            </div>

            <VLookupTip />

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span>💎</span>
                  Alternative: INDEX-VERGLEICH
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Für flexiblere Lookups nutze INDEX und VERGLEICH kombiniert.
                  Funktioniert auch von rechts nach links!
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span>⚡</span>
                  Performance-Tipp
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Bei sehr großen Tabellen: Sortiere deine Daten und nutze WAHR
                  statt FALSCH für schnellere Berechnungen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Errors Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            <h2 className="text-2xl font-bold">Häufige Fehler vermeiden</h2>
          </div>

          <VLookupError />

          <div className="mt-8 space-y-4">
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2 text-red-800 dark:text-red-300">#NV Fehler</h3>
              <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                Bedeutet: Wert nicht gefunden
              </p>
              <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
                <li>• Leerzeichen in Daten (z.B. &quot;A001 &quot; vs &quot;A001&quot;)</li>
                <li>• Groß-/Kleinschreibung beachten</li>
                <li>• Suchkriterium existiert nicht in Tabelle</li>
                <li>• Falsche Tabellenreferenz</li>
              </ul>
            </div>

            <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2 text-orange-800 dark:text-orange-300">#BEZUG! Fehler</h3>
              <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
                Bedeutet: Spaltenindex zu groß
              </p>
              <p className="text-sm text-orange-600 dark:text-orange-400">
                Dein Spaltenindex ist größer als die Anzahl der Spalten in deiner Tabelle.
                Prüfe ob du die richtige Zahl verwendest!
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
              <Link href="/skills/indexMatch" className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                <h3 className="font-semibold mb-2">INDEX-VERGLEICH</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Flexiblere Alternative zu SVERWEIS
                </p>
              </Link>

              <Link href="/skills/xlookup" className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                <h3 className="font-semibold mb-2">XVERWEIS</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Moderne Version mit mehr Features
                </p>
              </Link>

              <Link href="/skills/sumif" className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                <h3 className="font-semibold mb-2">SUMMEWENN</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Bedingte Summierung von Werten
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Bereit, SVERWEIS zu meistern?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Stell unsere KI deine Fragen zu SVERWEIS und erhalte sofort Hilfe mit konkreten Beispielen!
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
