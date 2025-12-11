"use client";

import { useEffect, useState } from "react";

type AnimationPhase = "intro" | "typing" | "highlighting" | "calculating" | "result" | "complete";

export function SumIfPreview() {
  const [phase, setPhase] = useState<AnimationPhase>("intro");
  const [typedFormula, setTypedFormula] = useState("");
  const [highlightedRows, setHighlightedRows] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [currentSum, setCurrentSum] = useState(0);

  const fullFormula = '=SUMMEWENN(B2:B7;"Elektronik";C2:C7)';

  const salesData = [
    { product: "Laptop", category: "Elektronik", revenue: 1200 },
    { product: "Stuhl", category: "Möbel", revenue: 300 },
    { product: "Monitor", category: "Elektronik", revenue: 450 },
    { product: "Tisch", category: "Möbel", revenue: 500 },
    { product: "Tastatur", category: "Elektronik", revenue: 80 },
    { product: "Lampe", category: "Möbel", revenue: 120 },
  ];

  const targetCategory = "Elektronik";
  const expectedSum = salesData
    .filter((item) => item.category === targetCategory)
    .reduce((sum, item) => sum + item.revenue, 0);

  useEffect(() => {
    const timeline = [
      { delay: 0, action: () => setPhase("intro") },
      { delay: 2000, action: () => setPhase("typing") },
      { delay: 2200, action: () => startTyping() },
      { delay: 5500, action: () => setPhase("highlighting") },
      { delay: 5700, action: () => highlightMatches() },
      { delay: 8500, action: () => setPhase("calculating") },
      { delay: 8700, action: () => animateCalculation() },
      { delay: 10500, action: () => setPhase("result") },
      { delay: 10700, action: () => setShowResult(true) },
      { delay: 12000, action: () => setPhase("complete") },
      { delay: 14000, action: () => reset() },
    ];

    const timeouts = timeline.map(({ delay, action }) =>
      setTimeout(action, delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const startTyping = () => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullFormula.length) {
        setTypedFormula(fullFormula.substring(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 80);
  };

  const highlightMatches = () => {
    const elektronikIndices = salesData
      .map((item, idx) => (item.category === targetCategory ? idx : -1))
      .filter((idx) => idx !== -1);

    elektronikIndices.forEach((idx, i) => {
      setTimeout(() => {
        setHighlightedRows((prev) => [...prev, idx]);
      }, i * 800);
    });
  };

  const animateCalculation = () => {
    let current = 0;
    const step = expectedSum / 20;
    const interval = setInterval(() => {
      current += step;
      if (current >= expectedSum) {
        setCurrentSum(expectedSum);
        clearInterval(interval);
      } else {
        setCurrentSum(Math.round(current));
      }
    }, 50);
  };

  const reset = () => {
    setPhase("intro");
    setTypedFormula("");
    setHighlightedRows([]);
    setShowResult(false);
    setCurrentSum(0);
  };

  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg overflow-hidden p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="border border-slate-400" />
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-3xl space-y-6">
        {/* Title */}
        <div className="text-center space-y-2">
          <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            SUMMEWENN
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Bedingte Summen berechnen
          </p>
        </div>

        {/* Main Table */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden border-2 border-green-200 dark:border-green-800">
          <div className="bg-green-500 text-white px-4 py-2 text-sm font-semibold flex items-center justify-between">
            <span>Umsatz-Daten</span>
            {phase === "highlighting" && (
              <span className="text-xs bg-white/20 px-2 py-1 rounded">
                Suche: &quot;{targetCategory}&quot;
              </span>
            )}
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-700">
                <th className="px-4 py-2 text-left font-semibold text-xs">A</th>
                <th className="px-4 py-2 text-left font-semibold text-xs">B</th>
                <th className="px-4 py-2 text-left font-semibold text-xs">C</th>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-750 text-xs text-slate-600 dark:text-slate-400">
                <th className="px-4 py-2 text-left">Produkt</th>
                <th className="px-4 py-2 text-left">Kategorie</th>
                <th className="px-4 py-2 text-left">Umsatz</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((item, idx) => {
                const isHighlighted = highlightedRows.includes(idx);
                const isElektronik = item.category === targetCategory;

                return (
                  <tr
                    key={idx}
                    className={`border-t border-slate-200 dark:border-slate-700 transition-all duration-500 ${
                      isHighlighted
                        ? "bg-green-100 dark:bg-green-900 scale-105"
                        : ""
                    }`}
                  >
                    <td className="px-4 py-2.5">{item.product}</td>
                    <td className="px-4 py-2.5">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                          isElektronik
                            ? "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100"
                            : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 font-mono font-semibold">
                      {item.revenue.toLocaleString("de-DE")}€
                      {isHighlighted && (
                        <span className="ml-2 text-green-600 dark:text-green-400 animate-pulse">
                          ✓
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Formula Bar */}
        {phase !== "intro" && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-300 dark:border-slate-600 p-3 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                fx
              </span>
              <code className="flex-1 font-mono text-sm text-green-700 dark:text-green-400">
                {typedFormula || fullFormula}
              </code>
            </div>
          </div>
        )}

        {/* Result Box */}
        {(phase === "calculating" || phase === "result" || phase === "complete") && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg shadow-xl p-6 text-white animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium opacity-90">
                Summe aller &quot;{targetCategory}&quot;-Produkte:
              </p>
              <div className="text-5xl font-bold">
                {showResult ? expectedSum.toLocaleString("de-DE") : currentSum.toLocaleString("de-DE")}€
              </div>
              {showResult && (
                <div className="text-xs opacity-75 animate-in fade-in">
                  (1200€ + 450€ + 80€)
                </div>
              )}
            </div>
          </div>
        )}

        {/* Phase Indicator */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-300 dark:border-slate-600">
            <div className={`w-2 h-2 rounded-full ${
              phase === "complete" ? "bg-green-500 animate-pulse" : "bg-emerald-500 animate-pulse"
            }`} />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
              {phase === "intro" && "Vorbereitung..."}
              {phase === "typing" && "Formel eingeben..."}
              {phase === "highlighting" && "Bedingung prüfen..."}
              {phase === "calculating" && "Berechnen..."}
              {phase === "result" && "Ergebnis anzeigen..."}
              {phase === "complete" && "Fertig! ✓"}
            </span>
          </div>
        </div>

        {/* CTA */}
        {phase === "complete" && (
          <div className="text-center animate-in fade-in slide-in-from-bottom-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Jetzt im Chat ausprobieren →
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
