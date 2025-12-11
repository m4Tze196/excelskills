"use client";

import { useEffect, useState } from "react";

export function ConditionalFormattingIntro() {
  const [phase, setPhase] = useState<"start" | "showing" | "rule" | "apply" | "complete">("start");

  const data = [
    { label: "Q1", value: 1200, color: "default" },
    { label: "Q2", value: 850, color: "default" },
    { label: "Q3", value: 1450, color: "default" },
    { label: "Q4", value: 320, color: "default" },
  ];

  const [cells, setCells] = useState(data);

  useEffect(() => {
    const timeline = [
      { delay: 0, action: () => { setPhase("start"); setCells(data); } },
      { delay: 1000, action: () => setPhase("showing") },
      { delay: 3000, action: () => setPhase("rule") },
      { delay: 5000, action: () => setPhase("apply") },
      { delay: 5200, action: () => applyStyling() },
      { delay: 8000, action: () => setPhase("complete") },
      { delay: 11000, action: () => { setPhase("start"); setCells(data); } },
    ];

    const timeouts = timeline.map(({ delay, action }) => setTimeout(action, delay));
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const applyStyling = () => {
    const styled = data.map((cell) => ({
      ...cell,
      color: cell.value > 1000 ? "green" : cell.value >= 500 ? "orange" : "red",
    }));
    setCells(styled);
  };

  return (
    <div className="relative w-full h-72 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg flex items-center justify-center p-6">
      <div className="space-y-6 w-full max-w-md">
        {/* Title */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            🎨 Bedingte Formatierung
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Zellen färben sich automatisch
          </p>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-100 dark:bg-slate-700">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold">Quartal</th>
                <th className="px-4 py-2 text-right text-sm font-semibold">Umsatz</th>
              </tr>
            </thead>
            <tbody>
              {cells.map((cell, idx) => (
                <tr
                  key={idx}
                  className={`border-t border-slate-200 dark:border-slate-700 transition-all duration-500 ${
                    phase === "apply" || phase === "complete"
                      ? cell.color === "green"
                        ? "bg-green-100 dark:bg-green-900"
                        : cell.color === "orange"
                        ? "bg-orange-100 dark:bg-orange-900"
                        : "bg-red-100 dark:bg-red-900"
                      : ""
                  }`}
                >
                  <td className="px-4 py-3 font-semibold">{cell.label}</td>
                  <td className="px-4 py-3 text-right font-mono font-bold">
                    {cell.value.toLocaleString("de-DE")}€
                    {(phase === "apply" || phase === "complete") && (
                      <span className="ml-2 animate-in fade-in">
                        {cell.color === "green" ? "🟢" : cell.color === "orange" ? "🟠" : "🔴"}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Rule Display */}
        {phase === "rule" && (
          <div className="bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 rounded-lg p-3 animate-in fade-in slide-in-from-bottom-4">
            <div className="text-sm font-semibold text-blue-900 dark:text-blue-100">
              Regel: Wert &gt; 1.000 → Grün
            </div>
          </div>
        )}

        {/* Success Message */}
        {phase === "complete" && (
          <div className="bg-green-500 text-white px-4 py-2 rounded-full text-center font-semibold animate-in fade-in slide-in-from-bottom-2">
            ✓ Formatierung angewendet!
          </div>
        )}
      </div>
    </div>
  );
}
