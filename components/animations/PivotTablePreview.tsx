"use client";

import { useEffect, useState } from "react";

type AnimationPhase = "raw" | "transforming" | "grouping" | "calculating" | "pivot" | "complete";

interface RawData {
  date: string;
  category: string;
  product: string;
  sales: number;
}

interface PivotRow {
  category: string;
  total: number;
  count: number;
}

export function PivotTablePreview() {
  const [phase, setPhase] = useState<AnimationPhase>("raw");
  const [highlightedCategory, setHighlightedCategory] = useState<string | null>(null);
  const [pivotData, setPivotData] = useState<PivotRow[]>([]);
  const [showPivot, setShowPivot] = useState(false);

  const rawData: RawData[] = [
    { date: "01.12", category: "Elektronik", product: "Laptop", sales: 1200 },
    { date: "01.12", category: "Möbel", product: "Stuhl", sales: 300 },
    { date: "02.12", category: "Elektronik", product: "Maus", sales: 25 },
    { date: "02.12", category: "Büro", product: "Papier", sales: 15 },
    { date: "03.12", category: "Möbel", product: "Tisch", sales: 500 },
    { date: "03.12", category: "Elektronik", product: "Tastatur", sales: 80 },
    { date: "04.12", category: "Büro", product: "Stifte", sales: 8 },
    { date: "04.12", category: "Möbel", product: "Regal", sales: 200 },
  ];

  const calculatePivot = (): PivotRow[] => {
    const grouped = rawData.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = { total: 0, count: 0 };
      }
      acc[item.category].total += item.sales;
      acc[item.category].count += 1;
      return acc;
    }, {} as Record<string, { total: number; count: number }>);

    return Object.entries(grouped)
      .map(([category, data]) => ({
        category,
        total: data.total,
        count: data.count,
      }))
      .sort((a, b) => b.total - a.total);
  };

  useEffect(() => {
    const timeline = [
      { delay: 0, action: () => setPhase("raw") },
      { delay: 2500, action: () => setPhase("transforming") },
      { delay: 3500, action: () => setPhase("grouping") },
      { delay: 4000, action: () => animateGrouping() },
      { delay: 8000, action: () => setPhase("calculating") },
      { delay: 9000, action: () => setPhase("pivot") },
      { delay: 9200, action: () => { setShowPivot(true); buildPivotTable(); } },
      { delay: 12000, action: () => setPhase("complete") },
      { delay: 14000, action: () => reset() },
    ];

    const timeouts = timeline.map(({ delay, action }) =>
      setTimeout(action, delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const animateGrouping = () => {
    const categories = ["Elektronik", "Möbel", "Büro"];
    categories.forEach((cat, idx) => {
      setTimeout(() => {
        setHighlightedCategory(cat);
        setTimeout(() => setHighlightedCategory(null), 800);
      }, idx * 1000);
    });
  };

  const buildPivotTable = () => {
    const pivot = calculatePivot();
    pivot.forEach((row, idx) => {
      setTimeout(() => {
        setPivotData((prev) => [...prev, row]);
      }, idx * 400);
    });
  };

  const reset = () => {
    setPhase("raw");
    setHighlightedCategory(null);
    setPivotData([]);
    setShowPivot(false);
  };

  return (
    <div className="relative w-full h-full min-h-[450px] flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg overflow-hidden p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="border border-slate-400" />
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-5xl space-y-6">
        {/* Title */}
        <div className="text-center space-y-2">
          <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Pivot-Tabellen
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Daten dynamisch zusammenfassen
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Raw Data Table */}
          <div className={`transition-all duration-500 ${
            showPivot ? "opacity-60 scale-95" : "opacity-100 scale-100"
          }`}>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden border-2 border-purple-200 dark:border-purple-800">
              <div className="bg-purple-500 text-white px-4 py-2 text-sm font-semibold flex items-center justify-between">
                <span>Roh-Daten</span>
                {phase === "grouping" && (
                  <span className="text-xs bg-white/20 px-2 py-1 rounded animate-pulse">
                    Gruppieren...
                  </span>
                )}
              </div>
              <div className="max-h-80 overflow-auto">
                <table className="w-full text-xs">
                  <thead className="sticky top-0">
                    <tr className="bg-slate-100 dark:bg-slate-700">
                      <th className="px-2 py-1.5 text-left font-semibold">Datum</th>
                      <th className="px-2 py-1.5 text-left font-semibold">Kategorie</th>
                      <th className="px-2 py-1.5 text-left font-semibold">Produkt</th>
                      <th className="px-2 py-1.5 text-left font-semibold">Umsatz</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rawData.map((item, idx) => {
                      const isHighlighted = highlightedCategory === item.category;
                      return (
                        <tr
                          key={idx}
                          className={`border-t border-slate-200 dark:border-slate-700 transition-all duration-300 ${
                            isHighlighted
                              ? "bg-yellow-100 dark:bg-yellow-900 scale-105"
                              : ""
                          }`}
                        >
                          <td className="px-2 py-1.5">{item.date}</td>
                          <td className="px-2 py-1.5">
                            <span className="text-xs bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">
                              {item.category}
                            </span>
                          </td>
                          <td className="px-2 py-1.5">{item.product}</td>
                          <td className="px-2 py-1.5 font-mono font-semibold">
                            {item.sales}€
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pivot Table */}
          <div className={`transition-all duration-500 ${
            showPivot ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}>
            {showPivot && (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden border-2 border-pink-200 dark:border-pink-800 animate-in fade-in zoom-in">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-sm font-semibold flex items-center justify-between">
                  <span>Pivot-Tabelle</span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">
                    ✓ Aggregiert
                  </span>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-700">
                      <th className="px-4 py-2.5 text-left font-semibold">Kategorie</th>
                      <th className="px-4 py-2.5 text-right font-semibold">Anzahl</th>
                      <th className="px-4 py-2.5 text-right font-semibold">Gesamt-Umsatz</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pivotData.map((row, idx) => (
                      <tr
                        key={row.category}
                        className="border-t border-slate-200 dark:border-slate-700 animate-in fade-in slide-in-from-right"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center space-x-2">
                            <span className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
                            <span className="font-semibold">{row.category}</span>
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right font-mono">
                          {row.count}
                        </td>
                        <td className="px-4 py-3 text-right font-mono font-bold text-purple-600 dark:text-purple-400">
                          {row.total.toLocaleString("de-DE")}€
                        </td>
                      </tr>
                    ))}
                    {pivotData.length === 3 && (
                      <tr className="border-t-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-750 font-bold">
                        <td className="px-4 py-3">Gesamt</td>
                        <td className="px-4 py-3 text-right font-mono">
                          {pivotData.reduce((sum, row) => sum + row.count, 0)}
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-lg text-purple-700 dark:text-purple-300">
                          {pivotData.reduce((sum, row) => sum + row.total, 0).toLocaleString("de-DE")}€
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Transformation Arrow */}
        {(phase === "transforming" || phase === "grouping" || phase === "calculating") && !showPivot && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 animate-in fade-in zoom-in">
            <div className="bg-white dark:bg-slate-800 rounded-full p-4 shadow-2xl border-4 border-purple-300 dark:border-purple-700">
              <svg
                className="w-12 h-12 text-purple-600 dark:text-purple-400 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Phase Indicator */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-300 dark:border-slate-600">
            <div className={`w-2 h-2 rounded-full ${
              phase === "complete" ? "bg-purple-500 animate-pulse" : "bg-pink-500 animate-pulse"
            }`} />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
              {phase === "raw" && "Daten anzeigen..."}
              {phase === "transforming" && "Transformation starten..."}
              {phase === "grouping" && "Nach Kategorie gruppieren..."}
              {phase === "calculating" && "Summen berechnen..."}
              {phase === "pivot" && "Pivot-Tabelle erstellen..."}
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
