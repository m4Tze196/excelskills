"use client";

import { useEffect, useState } from "react";

export function VLookupError() {
  const [phase, setPhase] = useState<"error" | "highlight" | "fix" | "success">("error");
  const [searchValue, setSearchValue] = useState("A001 ");

  useEffect(() => {
    const timeline = [
      { delay: 0, action: () => { setPhase("error"); setSearchValue("A001 "); } },
      { delay: 3000, action: () => setPhase("highlight") },
      { delay: 6000, action: () => setPhase("fix") },
      { delay: 6500, action: () => setSearchValue("A001") },
      { delay: 8000, action: () => setPhase("success") },
      { delay: 11000, action: () => { setPhase("error"); setSearchValue("A001 "); } },
    ];

    const timeouts = timeline.map(({ delay, action }) => setTimeout(action, delay));
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 rounded-lg flex items-center justify-center p-6">
      <div className="space-y-6 w-full max-w-md">
        {/* Title */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-1">
            Häufiger Fehler: #NV
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Leerzeichen in Daten
          </p>
        </div>

        {/* Excel Cell with Error/Success */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4">
          <div className="mb-3">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Formel:</div>
            <code className="text-xs font-mono bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
              =SVERWEIS({searchValue};Tabelle!A:B;2;FALSCH)
            </code>
          </div>

          <div className={`text-center p-4 rounded-lg border-2 transition-all duration-500 ${
            phase === "success"
              ? "border-green-500 bg-green-50 dark:bg-green-900"
              : "border-red-500 bg-red-50 dark:bg-red-900"
          }`}>
            {phase !== "success" ? (
              <div className="animate-pulse">
                <div className="text-3xl font-bold text-red-600 dark:text-red-400">#NV</div>
                <div className="text-xs text-red-500 dark:text-red-300 mt-1">Wert nicht verfügbar</div>
              </div>
            ) : (
              <div className="animate-in zoom-in">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">19,99€</div>
                <div className="text-xs text-green-500 dark:text-green-300 mt-1">✓ Korrekt</div>
              </div>
            )}
          </div>
        </div>

        {/* Problem Highlight */}
        {phase === "highlight" && (
          <div className="bg-yellow-100 dark:bg-yellow-900 border-2 border-yellow-500 rounded-lg p-3 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-start gap-2">
              <span className="text-xl">⚠️</span>
              <div>
                <div className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">Problem gefunden!</div>
                <div className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                  Suchkriterium: <span className="font-mono bg-white dark:bg-slate-800 px-1 rounded">&quot;A001<span className="text-red-600">␣</span>&quot;</span>
                  <br />
                  In Tabelle: <span className="font-mono bg-white dark:bg-slate-800 px-1 rounded">&quot;A001&quot;</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fix Action */}
        {phase === "fix" && (
          <div className="bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 rounded-lg p-3 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔧</span>
              <div className="text-sm font-semibold text-blue-800 dark:text-blue-200">
                Leerzeichen entfernen...
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
