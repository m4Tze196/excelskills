"use client";

import { useEffect, useState } from "react";

export function DataValidationIntro() {
  const [phase, setPhase] = useState<"start" | "showing" | "typing" | "error" | "success">("start");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const timeline = [
      { delay: 0, action: () => { setPhase("start"); setInputValue(""); } },
      { delay: 2000, action: () => setPhase("showing") },
      { delay: 4000, action: () => { setPhase("typing"); setInputValue("150"); } },
      { delay: 6000, action: () => setPhase("error") },
      { delay: 9000, action: () => { setInputValue("75"); setPhase("success"); } },
      { delay: 12000, action: () => { setPhase("start"); setInputValue(""); } },
    ];

    const timeouts = timeline.map(({ delay, action }) => setTimeout(action, delay));
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full h-80 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950 rounded-lg flex items-center justify-center p-6">
      <div className="space-y-4 w-full max-w-2xl">
        <div className="text-center">
          <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400">
            🎬 Was ist Datenüberprüfung?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Verhindere falsche Eingaben automatisch
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Alter eingeben (1-100 erlaubt):
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  readOnly
                  placeholder="Hier eingeben..."
                  className={`w-full px-4 py-3 border-2 rounded-lg font-mono text-lg transition-all ${
                    phase === "error"
                      ? "border-red-500 bg-red-50 dark:bg-red-950 animate-shake"
                      : phase === "success"
                      ? "border-green-500 bg-green-50 dark:bg-green-950"
                      : "border-slate-300 dark:border-slate-600"
                  }`}
                />
                {phase === "typing" && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 animate-pulse">
                    |
                  </span>
                )}
              </div>
            </div>

            {phase === "showing" && (
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-300 dark:border-blue-700 rounded-lg p-3 animate-in fade-in">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Regel aktiv:</strong> Nur Zahlen zwischen 1 und 100 erlaubt
                </p>
              </div>
            )}

            {phase === "error" && (
              <div className="bg-red-50 dark:bg-red-950 border border-red-300 dark:border-red-700 rounded-lg p-4 animate-in fade-in">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">⚠️</span>
                  <p className="font-semibold text-red-800 dark:text-red-200">
                    Ungültige Eingabe!
                  </p>
                </div>
                <p className="text-sm text-red-700 dark:text-red-300">
                  150 ist außerhalb des erlaubten Bereichs (1-100)
                </p>
              </div>
            )}

            {phase === "success" && (
              <div className="bg-green-50 dark:bg-green-950 border border-green-300 dark:border-green-700 rounded-lg p-4 animate-in fade-in zoom-in">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <p className="font-semibold text-green-800 dark:text-green-200">
                    Gültige Eingabe akzeptiert!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {phase === "success" && (
          <div className="text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              💡 Fehlerhafte Eingaben werden automatisch blockiert!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
