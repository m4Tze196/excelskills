"use client";

import { useEffect, useState } from "react";

export function VLookupIntro() {
  const [phase, setPhase] = useState<"start" | "showing" | "connecting" | "filling" | "complete">("start");

  useEffect(() => {
    const timeline = [
      { delay: 0, action: () => setPhase("start") },
      { delay: 500, action: () => setPhase("showing") },
      { delay: 3000, action: () => setPhase("connecting") },
      { delay: 6000, action: () => setPhase("filling") },
      { delay: 9000, action: () => setPhase("complete") },
      { delay: 12000, action: () => setPhase("start") },
    ];

    const timeouts = timeline.map(({ delay, action }) => setTimeout(action, delay));
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg flex items-center justify-center p-4">
      <div className="relative flex items-center justify-center gap-8">
        {/* Left Table - Orders WITHOUT prices */}
        <div className={`bg-white dark:bg-slate-800 rounded-lg shadow-lg p-3 transition-all duration-500 ${
          phase === "filling" || phase === "complete" ? "scale-105" : ""
        }`}>
          <div className="text-xs font-semibold mb-2 text-slate-600 dark:text-slate-400">Bestellungen</div>
          <div className="space-y-1.5">
            {["A001", "A002", "A003"].map((id, idx) => (
              <div key={id} className="flex items-center gap-3 text-xs">
                <span className="font-mono">{id}</span>
                <div className={`w-16 h-6 rounded border-2 flex items-center justify-center transition-all duration-500 ${
                  phase === "filling" || phase === "complete"
                    ? "border-green-500 bg-green-50 dark:bg-green-900"
                    : "border-red-300 dark:border-red-700 border-dashed"
                }`}>
                  {(phase === "filling" || phase === "complete") && (
                    <span className="text-green-700 dark:text-green-300 font-semibold animate-in fade-in">
                      {idx === 0 ? "19€" : idx === 1 ? "29€" : "9€"}
                    </span>
                  )}
                  {phase !== "filling" && phase !== "complete" && (
                    <span className="text-red-400 text-lg">❌</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow */}
        {phase === "connecting" && (
          <div className="absolute left-1/2 -translate-x-1/2 animate-in zoom-in">
            <div className="flex flex-col items-center">
              <svg className="w-24 h-12 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 100 50">
                <path d="M10 25 L70 25 L60 15 M70 25 L60 35" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M90 25 L30 25 L40 15 M30 25 L40 35" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-1">
                Nachschlagen
              </span>
            </div>
          </div>
        )}

        {/* Right Table - Price List */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-3">
          <div className="text-xs font-semibold mb-2 text-slate-600 dark:text-slate-400">Preisliste</div>
          <div className="space-y-1.5">
            {[
              { id: "A001", price: "19€" },
              { id: "A002", price: "29€" },
              { id: "A003", price: "9€" },
            ].map((item) => (
              <div key={item.id} className="flex items-center gap-3 text-xs">
                <span className="font-mono">{item.id}</span>
                <div className="w-16 h-6 rounded border border-green-500 bg-green-50 dark:bg-green-900 flex items-center justify-center">
                  <span className="text-green-700 dark:text-green-300 font-semibold">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Text */}
      {phase === "complete" && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-2">
          <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
            <span>✓</span>
            <span>Daten verbunden!</span>
          </div>
        </div>
      )}
    </div>
  );
}
