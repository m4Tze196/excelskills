"use client";

import { useEffect, useState } from "react";

export function PivotTableIntro() {
  const [phase, setPhase] = useState<"start" | "showing" | "grouping" | "pivot" | "complete">("start");

  useEffect(() => {
    const timeline = [
      { delay: 0, action: () => setPhase("start") },
      { delay: 2000, action: () => setPhase("showing") },
      { delay: 4000, action: () => setPhase("grouping") },
      { delay: 7000, action: () => setPhase("pivot") },
      { delay: 10000, action: () => setPhase("complete") },
      { delay: 13000, action: () => setPhase("start") },
    ];

    const timeouts = timeline.map(({ delay, action }) => setTimeout(action, delay));
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const rawData = [
    { product: "Laptop", region: "Nord", sales: 1200 },
    { product: "Maus", region: "Süd", sales: 450 },
    { product: "Laptop", region: "Süd", sales: 1100 },
    { product: "Tastatur", region: "Nord", sales: 320 },
    { product: "Maus", region: "Nord", sales: 380 },
  ];

  const pivotData = [
    { region: "Nord", laptop: 1200, maus: 380, tastatur: 320 },
    { region: "Süd", laptop: 1100, maus: 450, tastatur: 0 },
  ];

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 rounded-lg flex items-center justify-center p-6">
      <div className="space-y-4 w-full max-w-4xl">
        <div className="text-center">
          <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            🎬 Was sind Pivot-Tabellen?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Verwandle Rohdaten in übersichtliche Zusammenfassungen
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Raw Data */}
          <div
            className={`bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transition-all duration-500 ${
              phase === "showing" || phase === "grouping" ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <div className="bg-slate-100 dark:bg-slate-700 px-3 py-2 text-sm font-semibold">
              Rohdaten (unstrukturiert)
            </div>
            <table className="w-full text-xs">
              <thead className="bg-slate-50 dark:bg-slate-700">
                <tr>
                  <th className="px-2 py-1 text-left">Produkt</th>
                  <th className="px-2 py-1 text-left">Region</th>
                  <th className="px-2 py-1 text-left">Umsatz</th>
                </tr>
              </thead>
              <tbody>
                {rawData.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`border-t transition-all ${
                      phase === "grouping"
                        ? row.region === "Nord"
                          ? "bg-blue-100 dark:bg-blue-900"
                          : "bg-green-100 dark:bg-green-900"
                        : ""
                    }`}
                  >
                    <td className="px-2 py-1.5">{row.product}</td>
                    <td className="px-2 py-1.5">{row.region}</td>
                    <td className="px-2 py-1.5 font-mono">{row.sales}€</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pivot Table */}
          <div
            className={`bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transition-all duration-500 ${
              phase === "pivot" || phase === "complete"
                ? "ring-2 ring-purple-500 scale-105"
                : "opacity-40 scale-95"
            }`}
          >
            <div className="bg-purple-500 text-white px-3 py-2 text-sm font-semibold">
              Pivot-Tabelle (strukturiert) 📊
            </div>
            <table className="w-full text-xs">
              <thead className="bg-purple-50 dark:bg-purple-900">
                <tr>
                  <th className="px-2 py-1 text-left">Region</th>
                  <th className="px-2 py-1 text-left">Laptop</th>
                  <th className="px-2 py-1 text-left">Maus</th>
                  <th className="px-2 py-1 text-left">Tastatur</th>
                </tr>
              </thead>
              <tbody>
                {pivotData.map((row, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-2 py-1.5 font-semibold">{row.region}</td>
                    <td className="px-2 py-1.5 font-mono">{row.laptop}€</td>
                    <td className="px-2 py-1.5 font-mono">{row.maus}€</td>
                    <td className="px-2 py-1.5 font-mono">{row.tastatur || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {phase === "showing" && (
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-300 dark:border-blue-700 rounded-lg p-3 animate-in fade-in">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Start:</strong> Rohdaten mit vielen Zeilen - schwer zu überblicken
            </p>
          </div>
        )}

        {phase === "grouping" && (
          <div className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-300 dark:border-indigo-700 rounded-lg p-3 animate-in fade-in">
            <p className="text-sm text-indigo-800 dark:text-indigo-200">
              <strong>Gruppierung:</strong> Daten werden nach Region gruppiert (Blau = Nord, Grün = Süd)
            </p>
          </div>
        )}

        {(phase === "pivot" || phase === "complete") && (
          <div className="bg-purple-50 dark:bg-purple-950 border border-purple-300 dark:border-purple-700 rounded-lg p-3 animate-in fade-in">
            <p className="text-sm text-purple-800 dark:text-purple-200">
              <strong>✓ Pivot erstellt!</strong> Produkte als Spalten, Regionen als Zeilen - perfekt strukturiert!
            </p>
          </div>
        )}

        {phase === "complete" && (
          <div className="text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              🎯 Aus 5 Zeilen Rohdaten → 2 Zeilen Pivot = Viel übersichtlicher!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
