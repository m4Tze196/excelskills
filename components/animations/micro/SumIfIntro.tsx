"use client";

import { useEffect, useState } from "react";

export function SumIfIntro() {
  const [phase, setPhase] = useState<"start" | "showing" | "highlight" | "calculate" | "result">("start");

  useEffect(() => {
    const timeline = [
      { delay: 0, action: () => setPhase("start") },
      { delay: 2000, action: () => setPhase("showing") },
      { delay: 4000, action: () => setPhase("highlight") },
      { delay: 7000, action: () => setPhase("calculate") },
      { delay: 9000, action: () => setPhase("result") },
      { delay: 12000, action: () => setPhase("start") },
    ];

    const timeouts = timeline.map(({ delay, action }) => setTimeout(action, delay));
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const data = [
    { category: "Elektronik", amount: 1200 },
    { category: "Möbel", amount: 850 },
    { category: "Elektronik", amount: 450 },
    { category: "Büro", amount: 320 },
    { category: "Elektronik", amount: 680 },
  ];

  const highlightElectronics = phase === "highlight" || phase === "calculate" || phase === "result";
  const showSum = phase === "result";

  return (
    <div className="relative w-full h-80 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-lg flex items-center justify-center p-6">
      <div className="space-y-4 w-full max-w-2xl">
        <div className="text-center">
          <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            🎬 Was ist SUMMEWENN?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Addiere nur Werte, die eine Bedingung erfüllen
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-blue-100 dark:bg-blue-900">
              <tr>
                <th className="px-4 py-2 text-left">Kategorie</th>
                <th className="px-4 py-2 text-left">Umsatz</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => {
                const isElectronics = row.category === "Elektronik";
                const shouldHighlight = highlightElectronics && isElectronics;

                return (
                  <tr
                    key={idx}
                    className={`border-t transition-all duration-300 ${
                      shouldHighlight
                        ? "bg-green-100 dark:bg-green-900 ring-2 ring-green-500"
                        : ""
                    }`}
                  >
                    <td className="px-4 py-2">{row.category}</td>
                    <td className="px-4 py-2 font-mono">{row.amount}€</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {phase === "highlight" && (
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-300 dark:border-blue-700 rounded-lg p-3 animate-in fade-in">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Bedingung:</strong> Nur "Elektronik" Zeilen werden summiert
            </p>
          </div>
        )}

        {(phase === "calculate" || phase === "result") && (
          <div className="bg-green-50 dark:bg-green-950 border border-green-300 dark:border-green-700 rounded-lg p-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-800 dark:text-green-200 font-semibold">
                  Summe Elektronik:
                </p>
                {phase === "calculate" && (
                  <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                    1200€ + 450€ + 680€ = ?
                  </p>
                )}
              </div>
              {showSum && (
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 animate-in zoom-in">
                  2.330€
                </div>
              )}
            </div>
          </div>
        )}

        {phase === "result" && (
          <div className="text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              ✓ Nur die passenden Werte wurden addiert!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
