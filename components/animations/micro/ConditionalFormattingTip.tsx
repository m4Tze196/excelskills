"use client";

import { useEffect, useState } from "react";

export function ConditionalFormattingTip() {
  const [phase, setPhase] = useState<"start" | "data" | "formula" | "result">("start");

  useEffect(() => {
    const timeline = [
      { delay: 0, action: () => setPhase("start") },
      { delay: 2000, action: () => setPhase("data") },
      { delay: 5000, action: () => setPhase("formula") },
      { delay: 8000, action: () => setPhase("result") },
      { delay: 12000, action: () => setPhase("start") },
    ];

    const timeouts = timeline.map(({ delay, action }) => setTimeout(action, delay));
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg flex items-center justify-center p-6">
      <div className="space-y-4 w-full max-w-lg">
        <div className="text-center">
          <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400">
            💡 Pro-Tipp: Formeln nutzen!
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Nicht nur feste Werte - nutze dynamische Bedingungen
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Simple */}
            <div className={`transition-all ${phase === "start" || phase === "data" ? "opacity-100" : "opacity-40"}`}>
              <div className="text-xs font-semibold mb-2 text-slate-600">Einfach:</div>
              <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded text-xs">
                Wert &gt; 1000
              </div>
              <div className="text-xs text-slate-500 mt-1">Fester Wert</div>
            </div>

            {/* Advanced */}
            <div className={`transition-all ${phase === "formula" || phase === "result" ? "opacity-100 scale-105" : "opacity-40"}`}>
              <div className="text-xs font-semibold mb-2 text-purple-600">Pro:</div>
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded text-xs font-mono">
                =B2&gt;MITTELWERT($B$2:$B$10)
              </div>
              <div className="text-xs text-purple-600 mt-1">Dynamischer Vergleich!</div>
            </div>
          </div>

          {phase === "formula" && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded animate-in fade-in">
              <div className="text-xs text-blue-800 dark:text-blue-200">
                <strong>Wie es funktioniert:</strong>
                <ul className="mt-2 space-y-1 text-xs">
                  <li>• Vergleicht jeden Wert mit dem Durchschnitt</li>
                  <li>• Passt sich automatisch an</li>
                  <li>• Keine manuelle Anpassung nötig!</li>
                </ul>
              </div>
            </div>
          )}

          {phase === "result" && (
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-950 rounded animate-in fade-in">
              <div className="text-sm font-semibold text-green-800 dark:text-green-200">
                ✓ Werte über Durchschnitt werden hervorgehoben!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
