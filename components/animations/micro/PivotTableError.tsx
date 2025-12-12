"use client";

import { useEffect, useState } from "react";

export function PivotTableError() {
  const [phase, setPhase] = useState<"problem" | "highlight" | "fix" | "success">("problem");

  useEffect(() => {
    const timeline = [
      { delay: 0, action: () => setPhase("problem") },
      { delay: 3000, action: () => setPhase("highlight") },
      { delay: 6000, action: () => setPhase("fix") },
      { delay: 9000, action: () => setPhase("success") },
      { delay: 11000, action: () => setPhase("problem") },
    ];

    const timeouts = timeline.map(({ delay, action }) => setTimeout(action, delay));
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full h-80 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 rounded-lg flex items-center justify-center p-6">
      <div className="space-y-4 w-full max-w-2xl">
        <div className="text-center">
          <h3 className="text-xl font-bold text-red-600 dark:text-red-400">
            ⚠️ Häufiger Fehler
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Leere Zellen und Überschriften vergessen
          </p>
        </div>

        {/* Wrong Example */}
        {(phase === "problem" || phase === "highlight") && (
          <div
            className={`bg-white dark:bg-slate-800 rounded-lg p-4 border-2 transition-all ${
              phase === "highlight"
                ? "border-red-500 animate-pulse"
                : "border-slate-200 dark:border-slate-700"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-red-600">❌</span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Falsch: Daten mit Lücken
              </span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 rounded p-3">
              <table className="w-full text-xs">
                <tbody>
                  <tr>
                    <td className="px-2 py-1 font-semibold">Produkt</td>
                    <td className="px-2 py-1 font-semibold">Umsatz</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1">Laptop</td>
                    <td className="px-2 py-1 font-mono">1200</td>
                  </tr>
                  <tr className={phase === "highlight" ? "bg-red-100 dark:bg-red-900" : ""}>
                    <td className="px-2 py-1"></td>
                    <td className="px-2 py-1 font-mono">850</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1">Maus</td>
                    <td className="px-2 py-1 font-mono">450</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {phase === "highlight" && (
              <div className="mt-3 bg-red-50 dark:bg-red-950/50 border border-red-300 dark:border-red-700 rounded p-3 animate-in fade-in">
                <p className="text-xs text-red-800 dark:text-red-200">
                  <strong>Problem:</strong> Leere Zellen in der Produktspalte
                  <br />→ Pivot-Tabelle kann Daten nicht korrekt gruppieren
                </p>
              </div>
            )}
          </div>
        )}

        {/* Correct Example */}
        {(phase === "fix" || phase === "success") && (
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-2 border-green-500 animate-in slide-in-from-bottom">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-green-600">✓</span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Richtig: Vollständige Daten
              </span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 rounded p-3">
              <table className="w-full text-xs">
                <tbody>
                  <tr>
                    <td className="px-2 py-1 font-semibold">Produkt</td>
                    <td className="px-2 py-1 font-semibold">Umsatz</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1">Laptop</td>
                    <td className="px-2 py-1 font-mono">1200</td>
                  </tr>
                  <tr className="bg-green-100 dark:bg-green-900">
                    <td className="px-2 py-1">Tastatur</td>
                    <td className="px-2 py-1 font-mono">850</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1">Maus</td>
                    <td className="px-2 py-1 font-mono">450</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 bg-green-50 dark:bg-green-950/50 border border-green-300 dark:border-green-700 rounded p-3">
              <p className="text-xs text-green-800 dark:text-green-200">
                <strong>Lösung:</strong> Alle Zellen ausgefüllt!
              </p>
            </div>
          </div>
        )}

        {phase === "success" && (
          <div className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-300 dark:border-indigo-700 rounded-lg p-4">
            <p className="text-sm text-indigo-800 dark:text-indigo-200 font-semibold mb-2">
              📋 Checkliste für Pivot-Daten:
            </p>
            <ul className="text-xs text-indigo-700 dark:text-indigo-300 space-y-1">
              <li>✓ Keine leeren Zellen in den Daten</li>
              <li>✓ Klare Spaltenüberschriften (Zeile 1)</li>
              <li>✓ Keine zusammengeführten Zellen</li>
              <li>✓ Konsistente Datentypen pro Spalte</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
