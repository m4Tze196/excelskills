"use client";

import { useEffect, useState } from "react";

export function IndexMatchIntro() {
  const [phase, setPhase] = useState<"start" | "showing" | "match" | "index" | "result">("start");
  const [highlightRow, setHighlightRow] = useState<number | null>(null);

  useEffect(() => {
    const timeline = [
      { delay: 0, action: () => { setPhase("start"); setHighlightRow(null); } },
      { delay: 2000, action: () => setPhase("showing") },
      { delay: 4000, action: () => { setPhase("match"); setHighlightRow(2); } },
      { delay: 7000, action: () => setPhase("index") },
      { delay: 10000, action: () => setPhase("result") },
      { delay: 13000, action: () => { setPhase("start"); setHighlightRow(null); } },
    ];

    const timeouts = timeline.map(({ delay, action }) => setTimeout(action, delay));
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const lookupTable = [
    { id: "A001", name: "Laptop", price: 1200 },
    { id: "A002", name: "Maus", price: 45 },
    { id: "A003", name: "Tastatur", price: 85 },
  ];

  const searchId = "A002";

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 rounded-lg flex items-center justify-center p-6">
      <div className="space-y-4 w-full max-w-3xl">
        <div className="text-center">
          <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
            🎬 Was ist INDEX/VERGLEICH?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Die flexible Alternative zu SVERWEIS
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Lookup Table */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-emerald-500 text-white px-3 py-2 text-sm font-semibold">
              Produkt-Tabelle
            </div>
            <table className="w-full text-sm">
              <thead className="bg-emerald-50 dark:bg-emerald-900">
                <tr>
                  <th className="px-3 py-2 text-left">ID</th>
                  <th className="px-3 py-2 text-left">Produkt</th>
                  <th className="px-3 py-2 text-left">Preis</th>
                </tr>
              </thead>
              <tbody>
                {lookupTable.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`border-t transition-all duration-300 ${
                      highlightRow === idx
                        ? "bg-yellow-100 dark:bg-yellow-900 ring-2 ring-yellow-500"
                        : ""
                    }`}
                  >
                    <td className="px-3 py-2 font-mono">{row.id}</td>
                    <td className="px-3 py-2">{row.name}</td>
                    <td className="px-3 py-2 font-mono">{row.price}€</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Explanation */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔍</span>
                <div>
                  <div className="text-sm font-semibold">Suche nach:</div>
                  <div className="font-mono text-lg text-emerald-600 dark:text-emerald-400">{searchId}</div>
                </div>
              </div>

              {phase === "showing" && (
                <div className="bg-blue-50 dark:bg-blue-950 border border-blue-300 dark:border-blue-700 rounded p-3 animate-in fade-in">
                  <p className="text-xs text-blue-800 dark:text-blue-200">
                    <strong>Schritt 1:</strong> VERGLEICH findet die Position
                  </p>
                </div>
              )}

              {phase === "match" && (
                <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-300 dark:border-yellow-700 rounded p-3 animate-in fade-in">
                  <p className="text-xs text-yellow-800 dark:text-yellow-200">
                    <strong>VERGLEICH gefunden!</strong>
                    <br />Position: Zeile {highlightRow! + 1}
                  </p>
                </div>
              )}

              {phase === "index" && (
                <div className="bg-purple-50 dark:bg-purple-950 border border-purple-300 dark:border-purple-700 rounded p-3 animate-in fade-in">
                  <p className="text-xs text-purple-800 dark:text-purple-200">
                    <strong>Schritt 2:</strong> INDEX holt den Wert
                    <br />aus Spalte "Preis"
                  </p>
                </div>
              )}

              {phase === "result" && (
                <div className="bg-green-50 dark:bg-green-950 border-2 border-green-500 rounded p-4 animate-in zoom-in">
                  <div className="text-center">
                    <p className="text-xs text-green-700 dark:text-green-300 mb-2">Ergebnis:</p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                      45€
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {phase === "result" && (
          <div className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-700 rounded-lg p-3">
            <p className="text-sm text-emerald-800 dark:text-emerald-200 text-center">
              ✓ <strong>Vorteil:</strong> Kann auch links von der Suchspalte nachschlagen!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
