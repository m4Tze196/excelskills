"use client";

import { useEffect, useState } from "react";

export function PivotTableTip() {
  const [phase, setPhase] = useState<"start" | "show-basic" | "show-advanced" | "compare">("start");

  useEffect(() => {
    const timeline = [
      { delay: 0, action: () => setPhase("start") },
      { delay: 2000, action: () => setPhase("show-basic") },
      { delay: 5000, action: () => setPhase("show-advanced") },
      { delay: 9000, action: () => setPhase("compare") },
      { delay: 12000, action: () => setPhase("start") },
    ];

    const timeouts = timeline.map(({ delay, action }) => setTimeout(action, delay));
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full h-80 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg flex items-center justify-center p-6">
      <div className="space-y-4 w-full max-w-3xl">
        <div className="text-center">
          <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400">
            💡 Pro-Tipp: Berechnete Felder nutzen!
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Füge eigene Berechnungen direkt in die Pivot-Tabelle ein
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Basic */}
          <div
            className={`bg-white dark:bg-slate-800 rounded-lg p-4 border-2 transition-all ${
              phase === "show-basic" || phase === "compare"
                ? "border-blue-300 dark:border-blue-700"
                : "border-slate-200 dark:border-slate-700"
            }`}
          >
            <div className="text-xs font-semibold mb-2 text-slate-600 dark:text-slate-400">
              Standard Pivot:
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 rounded p-2">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b">
                    <th className="px-2 py-1 text-left">Region</th>
                    <th className="px-2 py-1 text-left">Summe</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-2 py-1">Nord</td>
                    <td className="px-2 py-1 font-mono">1900€</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1">Süd</td>
                    <td className="px-2 py-1 font-mono">1550€</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Nur rohe Summen
            </p>
          </div>

          {/* Advanced */}
          <div
            className={`bg-white dark:bg-slate-800 rounded-lg p-4 border-2 transition-all ${
              phase === "show-advanced" || phase === "compare"
                ? "border-purple-500 scale-105"
                : "border-slate-200 dark:border-slate-700"
            }`}
          >
            <div className="text-xs font-semibold mb-2 text-purple-600 dark:text-purple-400">
              Mit berechneten Feldern:
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded p-2">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b">
                    <th className="px-2 py-1 text-left">Region</th>
                    <th className="px-2 py-1 text-left">Summe</th>
                    <th className="px-2 py-1 text-left bg-purple-100 dark:bg-purple-800">Gewinn (20%)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-2 py-1">Nord</td>
                    <td className="px-2 py-1 font-mono">1900€</td>
                    <td className="px-2 py-1 font-mono bg-purple-100 dark:bg-purple-800">380€</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1">Süd</td>
                    <td className="px-2 py-1 font-mono">1550€</td>
                    <td className="px-2 py-1 font-mono bg-purple-100 dark:bg-purple-800">310€</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-2 font-semibold">
              Automatische Berechnung pro Zeile!
            </p>
          </div>
        </div>

        {phase === "show-advanced" && (
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-300 dark:border-blue-700 rounded-lg p-3 animate-in fade-in">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Berechnetes Feld:</strong> Summe × 0.20 = Gewinn
              <br />
              <span className="text-xs">Wird automatisch für alle Zeilen berechnet!</span>
            </p>
          </div>
        )}

        {phase === "compare" && (
          <div className="bg-purple-50 dark:bg-purple-950 border border-purple-300 dark:border-purple-700 rounded-lg p-4 animate-in slide-in-from-bottom">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-purple-600 dark:text-purple-400">⭐</span>
                <p className="text-sm text-purple-800 dark:text-purple-200 font-semibold">
                  Weitere Möglichkeiten:
                </p>
              </div>
              <ul className="text-xs text-purple-700 dark:text-purple-300 space-y-1 ml-6">
                <li>• <strong>Prozentsatz vom Gesamtergebnis</strong> anzeigen</li>
                <li>• <strong>Differenz zum Vormonat</strong> berechnen</li>
                <li>• <strong>Laufende Summe</strong> erstellen</li>
                <li>• <strong>Durchschnitt, Min, Max</strong> statt Summe</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
