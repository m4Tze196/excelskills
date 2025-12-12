"use client";

import { useEffect, useState } from "react";

export function IndexMatchError() {
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

  const wrongFormula = "=INDEX(B2:B4;VERGLEICH(A2;A2:A4;0))";
  const correctFormula = "=INDEX(B2:B4;VERGLEICH(E2;A2:A4;0))";

  return (
    <div className="relative w-full h-72 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 rounded-lg flex items-center justify-center p-6">
      <div className="space-y-4 w-full max-w-2xl">
        <div className="text-center">
          <h3 className="text-xl font-bold text-red-600 dark:text-red-400">
            ⚠️ Häufiger Fehler
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Suchbereich und Ergebnisbereich verwechselt
          </p>
        </div>

        {/* Wrong Formula */}
        {(phase === "problem" || phase === "highlight") && (
          <div
            className={`bg-white dark:bg-slate-800 rounded-lg p-4 border-2 transition-all ${
              phase === "highlight"
                ? "border-red-500 animate-pulse"
                : "border-slate-200 dark:border-slate-700"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-red-600">❌</span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Falsch: Suchwert im Ergebnis-Bereich
              </span>
            </div>
            <code className="block bg-slate-100 dark:bg-slate-900 p-3 rounded font-mono text-xs overflow-x-auto">
              {wrongFormula}
            </code>
            {phase === "highlight" && (
              <div className="mt-3 bg-red-50 dark:bg-red-950/50 border border-red-300 dark:border-red-700 rounded p-3 animate-in fade-in">
                <p className="text-xs text-red-800 dark:text-red-200">
                  <strong>Problem:</strong> VERGLEICH sucht in A2:A4, INDEX holt aus B2:B4
                  <br />→ Aber der Suchwert ist ebenfalls A2 - ergibt immer die erste Zeile!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Correct Formula */}
        {(phase === "fix" || phase === "success") && (
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-2 border-green-500 animate-in slide-in-from-bottom">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-600">✓</span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Richtig: Separater Suchwert
              </span>
            </div>
            <code className="block bg-slate-100 dark:bg-slate-900 p-3 rounded font-mono text-xs overflow-x-auto">
              <span>{correctFormula.substring(0, 28)}</span>
              <span className="bg-green-200 dark:bg-green-800 px-1 rounded">
                E2
              </span>
              <span>{correctFormula.substring(30)}</span>
            </code>
            <div className="mt-3 bg-green-50 dark:bg-green-950/50 border border-green-300 dark:border-green-700 rounded p-3">
              <p className="text-xs text-green-800 dark:text-green-200">
                <strong>Lösung:</strong> E2 = separater Suchwert, unabhängig vom Bereich!
              </p>
            </div>
          </div>
        )}

        {phase === "success" && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-lg text-sm font-semibold animate-in zoom-in">
              ✓ Formel sucht jetzt korrekt!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
