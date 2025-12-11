"use client";

import { useState } from "react";

export function VLookupLiveDemo() {
  const [formula, setFormula] = useState("");
  const [result, setResult] = useState<"idle" | "correct" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [selectedCell, setSelectedCell] = useState<string | null>(null);

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

  // Korrekte Formeln
  const correctFormulas = [
    "=SVERWEIS(A2;Preise!A:B;2;FALSCH)",
    "=SVERWEIS(A2;Preise!$A:$B;2;FALSCH)",
    "=SVERWEIS(A2;Preise!A:B;2;0)",
  ];

  const handleSubmit = () => {
    const normalizedFormula = formula.trim().toUpperCase();

    // Check if formula is correct
    const isCorrect = correctFormulas.some((correct) =>
      normalizedFormula.includes(correct.toUpperCase())
    );

    if (isCorrect) {
      setResult("correct");
      setFeedback("✓ Perfekt! Die Formel funktioniert korrekt.");
    } else if (normalizedFormula.startsWith("=SVERWEIS")) {
      setResult("error");
      // Specific error feedback
      if (!normalizedFormula.includes("PREISE")) {
        setFeedback("⚠️ Fehler: Die Tabelle 'Preise' fehlt in deiner Formel.");
      } else if (!normalizedFormula.includes("FALSCH") && !normalizedFormula.includes("0")) {
        setFeedback("⚠️ Fehler: Der vierte Parameter sollte FALSCH (oder 0) sein für exakte Übereinstimmung.");
      } else {
        setFeedback("⚠️ Fast! Überprüfe die Syntax noch einmal. Tipp: =SVERWEIS(A2;Preise!A:B;2;FALSCH)");
      }
    } else {
      setResult("error");
      setFeedback("⚠️ Die Formel muss mit =SVERWEIS beginnen.");
    }
  };

  const handleReset = () => {
    setFormula("");
    setResult("idle");
    setFeedback("");
    setSelectedCell(null);
  };

  const highlightSyntax = (text: string) => {
    // Simple syntax highlighting
    const parts = text.split(/([();,])/);
    return parts.map((part, idx) => {
      if (part === "(" || part === ")" || part === ";" || part === ",") {
        return (
          <span key={idx} className="text-purple-600 dark:text-purple-400 font-bold">
            {part}
          </span>
        );
      }
      if (part.toUpperCase().includes("SVERWEIS")) {
        return (
          <span key={idx} className="text-blue-600 dark:text-blue-400 font-semibold">
            {part}
          </span>
        );
      }
      if (part.toUpperCase().includes("PREISE") || part.match(/[A-Z]\d+/)) {
        return (
          <span key={idx} className="text-green-600 dark:text-green-400">
            {part}
          </span>
        );
      }
      if (part === "FALSCH" || part === "0") {
        return (
          <span key={idx} className="text-orange-600 dark:text-orange-400">
            {part}
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <div className="relative w-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg p-6">
      <div className="space-y-6">
        {/* Title */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            🎮 Live Demo: SVERWEIS
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Gib deine Formel ein und sieh das Ergebnis in Echtzeit!
          </p>
        </div>

        {/* Tables */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Orders Table */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-500 text-white px-3 py-2 text-sm font-semibold">
              Bestellungen
            </div>
            <table className="w-full text-xs">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-2 py-1.5 text-left">A</th>
                  <th className="px-2 py-1.5 text-left">B</th>
                  <th className="px-2 py-1.5 text-left">C</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-xs text-slate-500">
                  <td className="px-2 py-1">Produkt-ID</td>
                  <td className="px-2 py-1">Menge</td>
                  <td className="px-2 py-1">Preis</td>
                </tr>
                {orders.map((order, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-2 py-1.5 font-mono">{order.id}</td>
                    <td className="px-2 py-1.5">{order.qty}</td>
                    <td
                      className={`px-2 py-1.5 cursor-pointer transition-colors ${
                        selectedCell === `C${idx + 2}`
                          ? "bg-blue-100 dark:bg-blue-900 ring-2 ring-blue-500"
                          : ""
                      }`}
                      onClick={() => setSelectedCell(`C${idx + 2}`)}
                    >
                      {result === "correct" && idx === 0 ? (
                        <span className="text-green-600 dark:text-green-400 font-semibold animate-in fade-in">
                          {priceList[idx].price}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic text-xs">leer</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Price List */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-purple-500 text-white px-3 py-2 text-sm font-semibold">
              Preisliste (Sheet: &quot;Preise&quot;)
            </div>
            <table className="w-full text-xs">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-2 py-1.5 text-left">A</th>
                  <th className="px-2 py-1.5 text-left">B</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-xs text-slate-500">
                  <td className="px-2 py-1">Produkt-ID</td>
                  <td className="px-2 py-1">Preis</td>
                </tr>
                {priceList.map((item, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-2 py-1.5 font-mono">{item.id}</td>
                    <td className="px-2 py-1.5 text-green-600 dark:text-green-400 font-semibold">
                      {item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Formula Input */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4">
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Formel für Zelle C2:
            </label>
            {selectedCell && (
              <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                Aktive Zelle: {selectedCell}
              </span>
            )}
          </div>

          <div className="relative">
            <input
              type="text"
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
              placeholder="=SVERWEIS(...)"
              className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-500 dark:bg-slate-700"
            />
            <div className="absolute inset-0 px-4 py-3 pointer-events-none font-mono text-sm overflow-hidden">
              <div className="opacity-0">{formula}</div>
              <div className="absolute top-3 left-4">{highlightSyntax(formula)}</div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Formel testen
            </button>
            <button
              onClick={handleReset}
              className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Zurücksetzen
            </button>
          </div>
        </div>

        {/* Feedback */}
        {result !== "idle" && (
          <div
            className={`p-4 rounded-lg border-2 animate-in fade-in slide-in-from-bottom-4 ${
              result === "correct"
                ? "bg-green-50 dark:bg-green-950 border-green-500 text-green-800 dark:text-green-200"
                : "bg-red-50 dark:bg-red-950 border-red-500 text-red-800 dark:text-red-200"
            }`}
          >
            <p className="font-semibold">{feedback}</p>
            {result === "correct" && (
              <p className="text-sm mt-2">
                Der Preis <strong>19,99€</strong> wurde erfolgreich aus der Preisliste geholt!
              </p>
            )}
          </div>
        )}

        {/* Hint */}
        {result === "idle" && (
          <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>💡 Tipp:</strong> Die Formel sollte so aussehen:{" "}
              <code className="bg-white dark:bg-slate-800 px-2 py-0.5 rounded font-mono text-xs">
                =SVERWEIS(A2;Preise!A:B;2;FALSCH)
              </code>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
