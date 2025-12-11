"use client";

import { useEffect, useState } from "react";

type AnimationPhase = "intro" | "typing" | "result" | "autofill" | "complete";

export function VLookupPreview() {
  const [phase, setPhase] = useState<AnimationPhase>("intro");
  const [typedFormula, setTypedFormula] = useState("");
  const [highlightedRow, setHighlightedRow] = useState<number | null>(null);
  const [filledRows, setFilledRows] = useState<number[]>([]);

  const fullFormula = "=SVERWEIS(A2;Preise!A:B;2;FALSCH)";

  const orders = [
    { id: "A001", qty: 10, price: "" },
    { id: "A002", qty: 5, price: "" },
    { id: "A003", qty: 20, price: "" },
  ];

  const priceList = [
    { id: "A001", price: "19,99€" },
    { id: "A002", price: "29,99€" },
    { id: "A003", price: "9,99€" },
  ];

  useEffect(() => {
    const timeline = [
      { delay: 0, action: () => setPhase("intro") },
      { delay: 2000, action: () => setPhase("typing") },
      { delay: 2500, action: () => startTyping() },
      { delay: 6000, action: () => setPhase("result") },
      { delay: 6500, action: () => showResult() },
      { delay: 8000, action: () => setPhase("autofill") },
      { delay: 8500, action: () => autofillCells() },
      { delay: 11000, action: () => setPhase("complete") },
      { delay: 13000, action: () => reset() },
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
    }, 100);
  };

  const showResult = () => {
    setHighlightedRow(0);
    setFilledRows([0]);
    setTimeout(() => setHighlightedRow(null), 1000);
  };

  const autofillCells = () => {
    setTimeout(() => {
      setHighlightedRow(1);
      setFilledRows([0, 1]);
      setTimeout(() => setHighlightedRow(null), 500);
    }, 500);

    setTimeout(() => {
      setHighlightedRow(2);
      setFilledRows([0, 1, 2]);
      setTimeout(() => setHighlightedRow(null), 500);
    }, 1000);
  };

  const reset = () => {
    setPhase("intro");
    setTypedFormula("");
    setHighlightedRow(null);
    setFilledRows([]);
  };

  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg overflow-hidden p-6">
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
            SVERWEIS
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Werte in Tabellen nachschlagen
          </p>
        </div>

        {/* Tables Container */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Orders Table */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden border-2 border-blue-200 dark:border-blue-800">
            <div className="bg-blue-500 text-white px-4 py-2 text-sm font-semibold">
              Bestellungen
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-700">
                  <th className="px-3 py-2 text-left font-semibold">A</th>
                  <th className="px-3 py-2 text-left font-semibold">B</th>
                  <th className="px-3 py-2 text-left font-semibold">C</th>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-750 text-xs text-slate-600 dark:text-slate-400">
                  <th className="px-3 py-1.5 text-left">Produkt-ID</th>
                  <th className="px-3 py-1.5 text-left">Menge</th>
                  <th className="px-3 py-1.5 text-left">Preis</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr
                    key={idx}
                    className={`border-t border-slate-200 dark:border-slate-700 transition-all duration-300 ${
                      highlightedRow === idx
                        ? "bg-green-100 dark:bg-green-900 scale-105"
                        : ""
                    }`}
                  >
                    <td className="px-3 py-2 font-mono">{order.id}</td>
                    <td className="px-3 py-2">{order.qty}</td>
                    <td className="px-3 py-2 relative">
                      {idx === 0 && phase !== "intro" && !filledRows.includes(idx) ? (
                        <div className="font-mono text-xs text-blue-600 dark:text-blue-400 break-all">
                          {typedFormula}
                          {phase === "typing" && (
                            <span className="animate-pulse">|</span>
                          )}
                        </div>
                      ) : filledRows.includes(idx) ? (
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          {priceList[idx].price}
                        </span>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Price List Table */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden border-2 border-purple-200 dark:border-purple-800">
            <div className="bg-purple-500 text-white px-4 py-2 text-sm font-semibold">
              Preisliste
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-700">
                  <th className="px-3 py-2 text-left font-semibold">A</th>
                  <th className="px-3 py-2 text-left font-semibold">B</th>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-750 text-xs text-slate-600 dark:text-slate-400">
                  <th className="px-3 py-1.5 text-left">Produkt-ID</th>
                  <th className="px-3 py-1.5 text-left">Preis</th>
                </tr>
              </thead>
              <tbody>
                {priceList.map((item, idx) => (
                  <tr
                    key={idx}
                    className={`border-t border-slate-200 dark:border-slate-700 transition-all duration-300 ${
                      phase === "result" && highlightedRow === idx
                        ? "bg-yellow-100 dark:bg-yellow-900"
                        : ""
                    }`}
                  >
                    <td className="px-3 py-2 font-mono">{item.id}</td>
                    <td className="px-3 py-2 font-semibold">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Formula Bar */}
        {phase !== "intro" && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-300 dark:border-slate-600 p-3 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                fx
              </span>
              <code className="flex-1 font-mono text-sm text-blue-700 dark:text-blue-400">
                {typedFormula || fullFormula}
              </code>
            </div>
          </div>
        )}

        {/* Phase Indicator */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-300 dark:border-slate-600">
            <div className={`w-2 h-2 rounded-full ${
              phase === "complete" ? "bg-green-500 animate-pulse" : "bg-blue-500 animate-pulse"
            }`} />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
              {phase === "intro" && "Vorbereitung..."}
              {phase === "typing" && "Formel eingeben..."}
              {phase === "result" && "Preis nachschlagen..."}
              {phase === "autofill" && "AutoFill..."}
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
