"use client";

import { useEffect, useState } from "react";

export function ConditionalFormattingError() {
  const [phase, setPhase] = useState<"problem" | "highlight" | "fix" | "success">("problem");

  useEffect(() => {
    const timeline = [
      { delay: 0, action: () => setPhase("problem") },
      { delay: 3000, action: () => setPhase("highlight") },
      { delay: 6000, action: () => setPhase("fix") },
      { delay: 8000, action: () => setPhase("success") },
      { delay: 11000, action: () => setPhase("problem") },
    ];

    const timeouts = timeline.map(({ delay, action }) => setTimeout(action, delay));
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 rounded-lg flex items-center justify-center p-6">
      <div className="space-y-4 w-full max-w-lg">
        <div className="text-center">
          <h3 className="text-lg font-bold text-red-600 dark:text-red-400">
            ⚠️ Häufiger Fehler: Überlappende Regeln
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 space-y-3">
          <div className="text-sm font-semibold mb-2">Regel-Reihenfolge:</div>

          {/* Wrong Order */}
          {(phase === "problem" || phase === "highlight") && (
            <div className="space-y-2 animate-in fade-in">
              <div className={`p-3 rounded border-2 ${
                phase === "highlight" ? "border-red-500 bg-red-50 dark:bg-red-900" : "border-slate-300"
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm">1. Wert &gt; 500 → Grün</span>
                  {phase === "highlight" && <span className="text-red-600">⚠️ Problem!</span>}
                </div>
              </div>
              <div className="p-3 rounded border-2 border-slate-300">
                <span className="text-sm">2. Wert &gt; 1.000 → Rot</span>
              </div>
              <div className="mt-3 p-3 bg-slate-100 dark:bg-slate-700 rounded">
                <div className="text-xs text-slate-600 dark:text-slate-400">Wert: 1.200</div>
                <div className="text-lg font-bold text-green-600">Ergebnis: Grün ❌</div>
                <div className="text-xs text-red-600 mt-1">(Sollte rot sein!)</div>
              </div>
            </div>
          )}

          {/* Right Order */}
          {(phase === "fix" || phase === "success") && (
            <div className="space-y-2 animate-in fade-in">
              <div className="p-3 rounded border-2 border-green-500 bg-green-50 dark:bg-green-900">
                <div className="flex items-center justify-between">
                  <span className="text-sm">1. Wert &gt; 1.000 → Rot</span>
                  <span className="text-green-600">✓</span>
                </div>
              </div>
              <div className="p-3 rounded border-2 border-slate-300">
                <span className="text-sm">2. Wert &gt; 500 → Grün</span>
              </div>
              <div className="mt-3 p-3 bg-green-100 dark:bg-green-900 rounded">
                <div className="text-xs text-slate-600 dark:text-slate-400">Wert: 1.200</div>
                <div className="text-lg font-bold text-red-600">Ergebnis: Rot ✓</div>
              </div>
            </div>
          )}
        </div>

        {phase === "highlight" && (
          <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-500 rounded p-3 animate-in fade-in">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Tipp:</strong> Spezifischere Regeln nach oben!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
