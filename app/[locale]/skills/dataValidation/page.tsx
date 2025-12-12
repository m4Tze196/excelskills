"use client";

import { Link } from "@/i18n/routing";
import {
  DataValidationIntro,
  DataValidationError,
  DataValidationTip,
} from "@/components/animations/micro";
import { DataValidationLiveDemo } from "@/components/skills/interactive/DataValidationLiveDemo";

export default function DataValidationDetailPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="text-sm mb-4 opacity-90">
              <Link href="/" className="hover:underline">Home</Link>
              <span className="mx-2">›</span>
              <Link href="/skills" className="hover:underline">Skills</Link>
              <span className="mx-2">›</span>
              <span>Datenüberprüfung</span>
            </nav>

            <div className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-4xl md:text-5xl font-bold">Datenüberprüfung</h1>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  Fortgeschritten
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  Datenqualität
                </span>
              </div>

              <p className="text-xl text-amber-100">
                Verhindere Fehleingaben automatisch - mit intelligenten Regeln für saubere Daten
              </p>

              <div className="flex items-center gap-4 pt-2">
                <Link
                  href="/chat"
                  className="bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
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
            <h2 className="text-2xl font-bold">Was ist Datenüberprüfung?</h2>
          </div>
          <DataValidationIntro />
        </div>
      </section>

      {/* Explanation */}
      <section className="bg-slate-50 dark:bg-slate-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">💡 Warum Datenüberprüfung nutzen?</h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
              Datenüberprüfung (Data Validation) ist dein Schutz vor Fehleingaben.
              Definiere Regeln, was in eine Zelle darf - und Excel blockiert automatisch alles andere!
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Vorteile
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Verhindert Tippfehler automatisch</li>
                  <li>• Garantiert konsistente Daten</li>
                  <li>• Dropdown-Listen für schnelle Eingabe</li>
                  <li>• Benutzerdefinierte Fehlermeldungen</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="text-blue-600">⚡</span>
                  Perfekt für:
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Formulare und Eingabemasken</li>
                  <li>• Status-Tracking (Offen/Erledigt)</li>
                  <li>• Zahlenbereich (1-100, Prozente)</li>
                  <li>• Datumsvalidierung</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Live Demo */}
      <section className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-950 dark:via-yellow-950 dark:to-orange-950 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center gap-2">
              <span className="text-2xl">🎮</span>
              <h2 className="text-2xl font-bold">Probier es selbst!</h2>
            </div>

            <div className="mb-6">
              <p className="text-slate-700 dark:text-slate-300">
                Wähle eine Validierungsregel und teste verschiedene Eingaben.
                Sieh in Echtzeit, wie Excel ungültige Werte blockiert!
              </p>
            </div>

            <DataValidationLiveDemo />

            <div className="mt-6 bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    Lern-Tipp: Sinnvolle Fehlermeldungen
                  </h3>
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    Die beste Datenüberprüfung ist nutzlos ohne hilfreiche Fehlermeldungen!
                    Erkläre dem User genau, was erlaubt ist und warum seine Eingabe abgelehnt wurde.
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

            <DataValidationTip />

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span>🔗</span>
                  Dynamische Listen
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Verknüpfe Dropdown mit Zellbereich - Liste aktualisiert sich automatisch!
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span>📝</span>
                  Eingabehilfe
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Zeige Hinweise, BEVOR der User etwas eingibt - spart Zeit und Frust!
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

          <DataValidationError />

          <div className="mt-8 space-y-4">
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2 text-red-800 dark:text-red-300">Zu restriktive Regeln</h3>
              <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                Problem: Regel ist so streng, dass auch gültige Werte abgelehnt werden
              </p>
              <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
                <li>• Balance zwischen Kontrolle und Flexibilität</li>
                <li>• Bereich nicht zu eng setzen</li>
                <li>• Ausnahmen einplanen</li>
              </ul>
            </div>

            <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2 text-orange-800 dark:text-orange-300">Kreisverweise</h3>
              <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
                Problem: Validierungsregel bezieht sich auf die eigene Zelle
              </p>
              <p className="text-sm text-orange-600 dark:text-orange-400">
                Niemals die zu validierende Zelle in der Regel selbst referenzieren!
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
              <Link href="/skills/conditionalFormatting" className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 transition-colors">
                <h3 className="font-semibold mb-2">Bedingte Formatierung</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Visualisiere gültige/ungültige Daten
                </p>
              </Link>

              <Link href="/skills/pivotTables" className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 transition-colors">
                <h3 className="font-semibold mb-2">Pivot-Tabellen</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Saubere Daten für Analysen
                </p>
              </Link>

              <Link href="/skills/vlookup" className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 transition-colors">
                <h3 className="font-semibold mb-2">SVERWEIS</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Validiere mit Nachschlagetabellen
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-amber-500 to-yellow-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Bereit, Datenüberprüfung zu meistern?
          </h2>
          <p className="text-lg text-amber-100 mb-8">
            Stell unsere KI deine Fragen und erhalte sofort Hilfe mit konkreten Beispielen!
          </p>
          <Link
            href="/chat"
            className="inline-block bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
          >
            KI-Assistent starten →
          </Link>
        </div>
      </section>
    </div>
  );
}
