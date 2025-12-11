"use client";

import { useEffect, useState } from "react";

export function VLookupTip() {
  const [phase, setPhase] = useState<"bad" | "problem" | "good" | "success">("bad");
  const [badRanges, setBadRanges] = useState(["B2:C10", "B3:C11", "B4:C12"]);
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    const timeline = [
      { delay: 0, action: () => { setPhase("bad"); setShowErrors(false); } },
      { delay: 2000, action: () => { setPhase("problem"); setShowErrors(true); } },
      { delay: 5000, action: () => { setPhase("good"); setShowErrors(false); } },
      { delay: 8000, action: () => setPhase("success") },
      { delay: 12000, action: () => { setPhase("bad"); setShowErrors(false); } },
    ];

    const timeouts = timeline.map(({ delay, action }) => setTimeout(action, delay));
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg flex items-center justify-center p-6">
      <div className="space-y-4 w-full max-w-lg">
        {/* Title */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-1">
            💡 Pro-Tipp: Absolute Bezüge
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Nutze $ um Bereiche zu fixieren
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* BAD - Without $ */}
          <div className={`bg-white dark:bg-slate-800 rounded-lg p-4 border-2 transition-all ${
            phase === "bad" || phase === "problem"
              ? "border-red-500 scale-105"
              : "border-slate-200 dark:border-slate-700 opacity-60"
          }`}>
            <div className="text-center mb-3">
              <span className="text-2xl">❌</span>
              <div className="text-xs font-semibold text-red-600 dark:text-red-400 mt-1">Ohne $</div>
            </div>

            <div className="space-y-2">
              {["A2", "A3", "A4"].map((cell, idx) => (
                <div key={cell} className="text-xs">
                  <div className="font-mono text-slate-600 dark:text-slate-400 mb-0.5">{cell}:</div>
                  <div className={`font-mono text-xs p-1.5 rounded ${
                    showErrors ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300" : "bg-slate-100 dark:bg-slate-700"
                  }`}>
                    =SVERWEIS(A{idx + 2};{badRanges[idx]};...)
                  </div>
                  {showErrors && (
                    <div className="text-red-500 text-xs mt-0.5 animate-in fade-in">
                      ⚠️ Bereich verschiebt sich!
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* GOOD - With $ */}
          <div className={`bg-white dark:bg-slate-800 rounded-lg p-4 border-2 transition-all ${
            phase === "good" || phase === "success"
              ? "border-green-500 scale-105"
              : "border-slate-200 dark:border-slate-700 opacity-60"
          }`}>
            <div className="text-center mb-3">
              <span className="text-2xl">✅</span>
              <div className="text-xs font-semibold text-green-600 dark:text-green-400 mt-1">Mit $</div>
            </div>

            <div className="space-y-2">
              {["A2", "A3", "A4"].map((cell, idx) => (
                <div key={cell} className="text-xs">
                  <div className="font-mono text-slate-600 dark:text-slate-400 mb-0.5">{cell}:</div>
                  <div className="font-mono text-xs p-1.5 rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                    =SVERWEIS(A{idx + 2};<span className="font-bold text-green-600 dark:text-green-400">$B$2:$C$10</span>;...)
                  </div>
                  {(phase === "good" || phase === "success") && (
                    <div className="text-green-500 text-xs mt-0.5 animate-in fade-in">
                      ✓ Bereich bleibt fix!
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Success Message */}
        {phase === "success" && (
          <div className="bg-purple-100 dark:bg-purple-900 border-2 border-purple-500 rounded-lg p-3 animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center">
              <div className="text-sm font-semibold text-purple-800 dark:text-purple-200">
                💡 Tipp: Tastenkombination F4 fügt $ automatisch ein!
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
