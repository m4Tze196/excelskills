"use client";

import { useEffect, useState } from "react";

export function IndexMatchTip() {
  const [phase, setPhase] = useState<"start" | "show-sverweis" | "show-index" | "compare">("start");

  useEffect(() => {
    const timeline = [
      { delay: 0, action: () => setPhase("start") },
      { delay: 2000, action: () => setPhase("show-sverweis") },
      { delay: 5000, action: () => setPhase("show-index") },
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
            💡 Pro-Tipp: INDEX/MATCH vs SVERWEIS
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Wann ist INDEX/MATCH besser?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* SVERWEIS */}
          <div
            className={`bg-white dark:bg-slate-800 rounded-lg p-4 border-2 transition-all ${
              phase === "show-sverweis" || phase === "compare"
                ? "border-blue-300 dark:border-blue-700"
                : "border-slate-200 dark:border-slate-700"
            }`}
          >
            <div className="text-xs font-semibold mb-2 text-slate-600 dark:text-slate-400">
              SVERWEIS:
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                <span>Nur nach rechts suchen</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                <span>Spaltennummer fest (bricht bei Änderungen)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Einfach zu merken</span>
              </div>
            </div>
          </div>

          {/* INDEX/MATCH */}
          <div
            className={`bg-white dark:bg-slate-800 rounded-lg p-4 border-2 transition-all ${
              phase === "show-index" || phase === "compare"
                ? "border-emerald-500 scale-105"
                : "border-slate-200 dark:border-slate-700"
            }`}
          >
            <div className="text-xs font-semibold mb-2 text-emerald-600 dark:text-emerald-400">
              INDEX/MATCH:
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Suche in beide Richtungen</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Flexibel bei Spalten-Änderungen</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Schneller bei großen Datenmengen</span>
              </div>
            </div>
          </div>
        </div>

        {phase === "show-index" && (
          <div className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-700 rounded-lg p-3 animate-in fade-in">
            <p className="text-sm text-emerald-800 dark:text-emerald-200">
              <strong>Bonus:</strong> INDEX/MATCH kann auch 2D-Suchen machen!
            </p>
          </div>
        )}

        {phase === "compare" && (
          <div className="bg-purple-50 dark:bg-purple-950 border border-purple-300 dark:border-purple-700 rounded-lg p-4 animate-in slide-in-from-bottom">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-purple-600 dark:text-purple-400">⭐</span>
                <p className="text-sm text-purple-800 dark:text-purple-200 font-semibold">
                  Wann INDEX/MATCH nutzen?
                </p>
              </div>
              <ul className="text-xs text-purple-700 dark:text-purple-300 space-y-1 ml-6">
                <li>• <strong>Linksseitige Suche:</strong> Suchspalte rechts von Ergebnis</li>
                <li>• <strong>Flexible Tabellen:</strong> Spalten können sich ändern</li>
                <li>• <strong>Performance:</strong> Große Datenmengen (&gt;10.000 Zeilen)</li>
                <li>• <strong>2D-Lookup:</strong> Zeile UND Spalte dynamisch finden</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
