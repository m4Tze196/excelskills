"use client";

import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export function IndexMatchLiveDemo() {
  const [formula, setFormula] = useState("");
  const [result, setResult] = useState<"idle" | "correct" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [calculatedValue, setCalculatedValue] = useState<string | null>(null);

  const products: Product[] = [
    { id: "A001", name: "Laptop", price: 1200, stock: 15 },
    { id: "A002", name: "Maus", price: 45, stock: 87 },
    { id: "A003", name: "Tastatur", price: 85, stock: 42 },
    { id: "A004", name: "Monitor", price: 350, stock: 23 },
  ];

  const searchId = "A003";
  const correctAnswer = "85"; // Price of A003

  const correctFormulas = [
    '=INDEX(C2:C5;VERGLEICH("A003";A2:A5;0))',
    "=INDEX(C2:C5;VERGLEICH(F2;A2:A5;0))",
    "=INDEX(C:C;VERGLEICH(F2;A:A;0))",
  ];

  const handleSubmit = () => {
    const normalizedFormula = formula.trim().toUpperCase();

    const isCorrect = correctFormulas.some((correct) =>
      normalizedFormula.includes(correct.toUpperCase())
    );

    if (isCorrect || normalizedFormula.includes("INDEX") && normalizedFormula.includes("VERGLEICH") && normalizedFormula.includes("A003")) {
      setCalculatedValue(correctAnswer);
      setResult("correct");
      setFeedback("✓ Perfekt! Die INDEX/VERGLEICH-Formel funktioniert korrekt.");
    } else if (normalizedFormula.startsWith("=INDEX")) {
      setResult("error");
      if (!normalizedFormula.includes("VERGLEICH")) {
        setFeedback('⚠️ Fehler: INDEX braucht VERGLEICH, um die Position zu finden!');
      } else if (!normalizedFormula.includes("C") || !normalizedFormula.includes("A")) {
        setFeedback("⚠️ Fehler: Überprüfe die Spaltenbereiche (A für ID, C für Preis).");
      } else {
        setFeedback('⚠️ Fast! Tipp: =INDEX(C2:C5;VERGLEICH("A003";A2:A5;0))');
      }
    } else {
      setResult("error");
      setFeedback("⚠️ Die Formel muss mit =INDEX beginnen.");
    }
  };

  const handleReset = () => {
    setFormula("");
    setResult("idle");
    setFeedback("");
    setCalculatedValue(null);
  };

  const highlightSyntax = (text: string) => {
    const parts = text.split(/([();,"])/);
    return parts.map((part, idx) => {
      if (part === "(" || part === ")" || part === ";" || part === "," || part === '"') {
        return (
          <span key={idx} className="text-purple-600 dark:text-purple-400 font-bold">
            {part}
          </span>
        );
      }
      if (part.toUpperCase().includes("INDEX") || part.toUpperCase().includes("VERGLEICH")) {
        return (
          <span key={idx} className="text-emerald-600 dark:text-emerald-400 font-semibold">
            {part}
          </span>
        );
      }
      if (part.match(/[A-Z]\d+:[A-Z]\d+/) || part.match(/[A-Z]:[A-Z]/)) {
        return (
          <span key={idx} className="text-blue-600 dark:text-blue-400">
            {part}
          </span>
        );
      }
      if (part.includes("A003") || part.includes("F2")) {
        return (
          <span key={idx} className="text-orange-600 dark:text-orange-400">
            {part}
          </span>
        );
      }
      if (part === "0") {
        return (
          <span key={idx} className="text-pink-600 dark:text-pink-400">
            {part}
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <div className="relative w-full bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 rounded-lg p-6">
      <div className="space-y-6">
        {/* Title */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            🎮 Live Demo: INDEX/VERGLEICH
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Finde den Preis von Produkt {searchId}!
          </p>
        </div>

        {/* Tables Side by Side */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Product Table */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-emerald-500 text-white px-3 py-2 text-sm font-semibold">
              Produkt-Tabelle
            </div>
            <table className="w-full text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-2 py-1.5 text-left text-xs">Row</th>
                  <th className="px-3 py-1.5 text-left">A - ID</th>
                  <th className="px-3 py-1.5 text-left">B - Name</th>
                  <th className="px-3 py-1.5 text-left">C - Preis</th>
                  <th className="px-3 py-1.5 text-left">D - Lager</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-xs">
                  <td className="px-2 py-1 text-slate-500">1</td>
                  <td className="px-3 py-1 text-slate-500 font-semibold">ID</td>
                  <td className="px-3 py-1 text-slate-500 font-semibold">Produkt</td>
                  <td className="px-3 py-1 text-slate-500 font-semibold">Preis</td>
                  <td className="px-3 py-1 text-slate-500 font-semibold">Lager</td>
                </tr>
                {products.map((product, idx) => {
                  const isMatching = result === "correct" && product.id === searchId;
                  return (
                    <tr
                      key={idx}
                      className={`border-t transition-all duration-300 ${
                        isMatching
                          ? "bg-emerald-100 dark:bg-emerald-900"
                          : "bg-white dark:bg-slate-800"
                      }`}
                    >
                      <td className="px-2 py-2 text-xs text-slate-500">{idx + 2}</td>
                      <td className="px-3 py-2 font-mono">{product.id}</td>
                      <td className="px-3 py-2">{product.name}</td>
                      <td className="px-3 py-2 font-mono">
                        {isMatching && (
                          <span className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
                            {product.price}€
                          </span>
                        )}
                        {!isMatching && `${product.price}€`}
                      </td>
                      <td className="px-3 py-2">{product.stock}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Search Cell */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 flex items-center justify-center">
            <div className="text-center w-full">
              <div className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-4">
                Suchzelle F2:
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900 border-2 border-yellow-500 rounded-lg p-6 inline-block">
                <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">F2</div>
                <div className="text-3xl font-mono font-bold text-yellow-800 dark:text-yellow-200">
                  {searchId}
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
                Dieser Wert soll gesucht werden
              </p>
            </div>
          </div>
        </div>

        {/* Formula Input */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4">
          <div className="mb-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Deine INDEX/VERGLEICH-Formel:
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
              placeholder="=INDEX(...)"
              className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg font-mono text-sm focus:outline-none focus:border-emerald-500 dark:bg-slate-700"
            />
            <div className="absolute inset-0 px-4 py-3 pointer-events-none font-mono text-sm overflow-hidden">
              <div className="opacity-0">{formula}</div>
              <div className="absolute top-3 left-4">{highlightSyntax(formula)}</div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={handleSubmit}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
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

        {/* Result Display */}
        {calculatedValue !== null && result === "correct" && (
          <div className="bg-emerald-50 dark:bg-emerald-950 border-2 border-emerald-500 rounded-lg p-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-800 dark:text-emerald-200 font-semibold mb-2">
                  ✓ Berechnung erfolgreich!
                </p>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  VERGLEICH fand {searchId} in Zeile 4, INDEX holte Preis aus Spalte C
                </p>
              </div>
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                {calculatedValue}€
              </div>
            </div>
          </div>
        )}

        {/* Feedback */}
        {result !== "idle" && !calculatedValue && (
          <div
            className={`p-4 rounded-lg border-2 animate-in fade-in ${
              result === "correct"
                ? "bg-emerald-50 dark:bg-emerald-950 border-emerald-500 text-emerald-800 dark:text-emerald-200"
                : "bg-red-50 dark:bg-red-950 border-red-500 text-red-800 dark:text-red-200"
            }`}
          >
            <p className="font-semibold">{feedback}</p>
          </div>
        )}

        {result === "correct" && calculatedValue && (
          <div className="p-4 rounded-lg border-2 bg-emerald-50 dark:bg-emerald-950 border-emerald-500 text-emerald-800 dark:text-emerald-200 animate-in fade-in">
            <p className="font-semibold">{feedback}</p>
          </div>
        )}

        {/* Hint */}
        {result === "idle" && (
          <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
            <p className="text-sm text-emerald-800 dark:text-emerald-200">
              <strong>💡 Tipp:</strong> Die Formel sollte so aussehen:{" "}
              <code className="bg-white dark:bg-slate-800 px-2 py-0.5 rounded font-mono text-xs">
                =INDEX(C2:C5;VERGLEICH(F2;A2:A5;0))
              </code>
            </p>
            <div className="mt-3 space-y-1 text-xs text-emerald-700 dark:text-emerald-300">
              <p><strong>INDEX(C2:C5;</strong> → Hole einen Wert aus der Preis-Spalte</p>
              <p><strong>VERGLEICH(F2;A2:A5;0)</strong> → Finde die Position von F2 in der ID-Spalte</p>
              <p><strong>0</strong> → Exakte Übereinstimmung</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
