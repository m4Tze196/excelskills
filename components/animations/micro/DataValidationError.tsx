"use client";

import { useEffect, useState } from "react";

export function DataValidationError() {
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
    <div className="relative w-full h-72 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 rounded-lg flex items-center justify-center p-6">
      <div className="space-y-4 w-full max-w-2xl">
        <div className="text-center">
          <h3 className="text-xl font-bold text-red-600 dark:text-red-400">
            ⚠️ Häufiger Fehler
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Fehlermeldung nicht aussagekräftig
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
                Schlechte Fehlermeldung:
              </span>
            </div>
            <div className="bg-red-50 dark:bg-red-950/50 border border-red-300 dark:border-red-700 rounded p-3">
              <p className="text-sm font-mono text-red-800 dark:text-red-200">
                "Ungültiger Wert!"
              </p>
            </div>
            {phase === "highlight" && (
              <div className="mt-3 bg-red-50 dark:bg-red-950/50 border border-red-300 dark:border-red-700 rounded p-3 animate-in fade-in">
                <p className="text-xs text-red-800 dark:text-red-200">
                  <strong>Problem:</strong> User weiß nicht, WAS falsch ist
                  <br />→ Keine Hilfe, keine Lösung, nur Frust!
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
                Hilfreiche Fehlermeldung:
              </span>
            </div>
            <div className="bg-green-50 dark:bg-green-950/50 border border-green-300 dark:border-green-700 rounded p-3">
              <p className="text-sm font-mono text-green-800 dark:text-green-200">
                "Bitte gib eine Zahl zwischen 1 und 100 ein. Deine Eingabe: 150"
              </p>
            </div>
            <div className="mt-3 bg-green-50 dark:bg-green-950/50 border border-green-300 dark:border-green-700 rounded p-3">
              <p className="text-xs text-green-800 dark:text-green-200">
                <strong>Besser:</strong> User sieht genau das Problem UND die Lösung!
              </p>
            </div>
          </div>
        )}

        {phase === "success" && (
          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-300 dark:border-amber-700 rounded-lg p-4">
            <p className="text-sm text-amber-800 dark:text-amber-200 font-semibold mb-2">
              💡 Checkliste für Fehlermeldungen:
            </p>
            <ul className="text-xs text-amber-700 dark:text-amber-300 space-y-1">
              <li>✓ Was ist das Problem?</li>
              <li>✓ Was ist erlaubt?</li>
              <li>✓ Was wurde eingegeben?</li>
              <li>✓ Wie kann es korrigiert werden?</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
