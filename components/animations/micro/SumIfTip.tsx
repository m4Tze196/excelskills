"use client";

import { useEffect, useState } from "react";

export function SumIfTip() {
  const [phase, setPhase] = useState<"start" | "show-simple" | "show-advanced" | "compare">("start");

  useEffect(() => {
    const timeline = [
      { delay: 0, action: () => setPhase("start") },
      { delay: 2000, action: () => setPhase("show-simple") },
      { delay: 5000, action: () => setPhase("show-advanced") },
      { delay: 9000, action: () => setPhase("compare") },
      { delay: 12000, action: () => setPhase("start") },
    ];

    const timeouts = timeline.map(({ delay, action }) => setTimeout(action, delay));
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full h-80 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg flex items-center justify-center p-6">
      <div className="space-y-4 w-full max-w-2xl">
        <div className="text-center">
          <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400">
            💡 Pro-Tipp: Wildcards nutzen!
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Suche nach Teilen von Text mit * und ?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Simple */}
          <div
            className={`bg-white dark:bg-slate-800 rounded-lg p-4 border-2 transition-all ${
              phase === "show-simple" || phase === "compare"
                ? "border-blue-300 dark:border-blue-700"
                : "border-slate-200 dark:border-slate-700"
            }`}
          >
            <div className="text-xs font-semibold mb-2 text-slate-600 dark:text-slate-400">
              Exakte Suche:
            </div>
            <code className="block bg-slate-100 dark:bg-slate-900 p-2 rounded text-xs font-mono overflow-x-auto">
              =SUMMEWENN(A:A;"Elektronik";B:B)
            </code>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Findet nur exakt "Elektronik"
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
              Mit Wildcard (*):
            </div>
            <code className="block bg-purple-100 dark:bg-purple-900 p-2 rounded text-xs font-mono overflow-x-auto">
              =SUMMEWENN(A:A;"Elektro*";B:B)
            </code>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-2 font-semibold">
              Findet alles, was mit "Elektro" beginnt!
            </p>
          </div>
        </div>

        {phase === "show-advanced" && (
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-300 dark:border-blue-700 rounded-lg p-3 animate-in fade-in">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>* = beliebig viele Zeichen</strong>
              <br />
              <span className="text-xs">
                "Elektro*" findet: Elektronik, Elektrogeräte, Elektromotor, etc.
              </span>
            </p>
          </div>
        )}

        {phase === "compare" && (
          <div className="bg-purple-50 dark:bg-purple-950 border border-purple-300 dark:border-purple-700 rounded-lg p-4 animate-in slide-in-from-bottom">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-purple-600 dark:text-purple-400">⭐</span>
                <p className="text-sm text-purple-800 dark:text-purple-200 font-semibold">
                  Weitere Wildcards:
                </p>
              </div>
              <ul className="text-xs text-purple-700 dark:text-purple-300 space-y-1 ml-6">
                <li>
                  <code className="bg-white dark:bg-slate-800 px-1 rounded">*</code> = beliebig
                  viele Zeichen
                </li>
                <li>
                  <code className="bg-white dark:bg-slate-800 px-1 rounded">?</code> = genau 1
                  Zeichen
                </li>
                <li>
                  <code className="bg-white dark:bg-slate-800 px-1 rounded">*ing</code> = endet
                  mit "ing"
                </li>
                <li>
                  <code className="bg-white dark:bg-slate-800 px-1 rounded">M?ller</code> =
                  Müller, Möller, Miller
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
