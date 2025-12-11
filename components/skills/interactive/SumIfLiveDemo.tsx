"use client";

import { useState } from "react";

interface DataRow {
  category: string;
  amount: number;
}

export function SumIfLiveDemo() {
  const [formula, setFormula] = useState("");
  const [result, setResult] = useState<"idle" | "correct" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [calculatedSum, setCalculatedSum] = useState<number | null>(null);

  const data: DataRow[] = [
    { category: "Elektronik", amount: 1200 },
    { category: "Möbel", amount: 850 },
    { category: "Elektronik", amount: 450 },
    { category: "Büro", amount: 320 },
    { category: "Elektronik", amount: 680 },
    { category: "Möbel", amount: 1100 },
  ];

  // Correct solutions
  const correctFormulas = [
    '=SUMMEWENN(A2:A7;"Elektronik";B2:B7)',
    '=SUMMEWENN(A:A;"Elektronik";B:B)',
    '=SUMMEWENN($A$2:$A$7;"Elektronik";$B$2:$B$7)',
  ];

  const handleSubmit = () => {
    const normalizedFormula = formula.trim().toUpperCase();

    // Check if formula is correct
    const isCorrect = correctFormulas.some((correct) =>
      normalizedFormula.includes(correct.toUpperCase())
    );

    if (isCorrect) {
      const sum = data
        .filter((row) => row.category === "Elektronik")
        .reduce((acc, row) => acc + row.amount, 0);

      setCalculatedSum(sum);
      setResult("correct");
      setFeedback("✓ Perfekt! Die Formel funktioniert korrekt.");
    } else if (normalizedFormula.startsWith("=SUMMEWENN")) {
      setResult("error");
      // Specific error feedback
      if (!normalizedFormula.includes('"')) {
        setFeedback('⚠️ Fehler: Vergiss die Anführungszeichen nicht! → "Elektronik"');
      } else if (!normalizedFormula.includes("A") || !normalizedFormula.includes("B")) {
        setFeedback("⚠️ Fehler: Überprüfe die Spaltenbereiche (A:A für Kategorie, B:B für Beträge).");
      } else if (!normalizedFormula.includes("ELEKTRONIK")) {
        setFeedback('⚠️ Fehler: Das Suchkriterium sollte "Elektronik" sein.');
      } else {
        setFeedback('⚠️ Fast! Tipp: =SUMMEWENN(A:A;"Elektronik";B:B)');
      }
    } else {
      setResult("error");
      setFeedback("⚠️ Die Formel muss mit =SUMMEWENN beginnen.");
    }
  };

  const handleReset = () => {
    setFormula("");
    setResult("idle");
    setFeedback("");
    setCalculatedSum(null);
  };

  const highlightSyntax = (text: string) => {
    // Simple syntax highlighting for SUMMEWENN
    const parts = text.split(/([();,"])/)
    return parts.map((part, idx) => {
      if (part === "(" || part === ")" || part === ";" || part === "," || part === '"') {
        return (
          <span key={idx} className="text-purple-600 dark:text-purple-400 font-bold">
            {part}
          </span>
        );
      }
      if (part.toUpperCase().includes("SUMMEWENN")) {
        return (
          <span key={idx} className="text-blue-600 dark:text-blue-400 font-semibold">
            {part}
          </span>
        );
      }
      if (part.match(/[A-Z]\d+:[A-Z]\d+/) || part.match(/[A-Z]:[A-Z]/)) {
        return (
          <span key={idx} className="text-green-600 dark:text-green-400">
            {part}
          </span>
        );
      }
      if (part.toUpperCase().includes("ELEKTRONIK")) {
        return (
          <span key={idx} className="text-orange-600 dark:text-orange-400">
            {part}
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  const matchingRows = data.filter((row) => row.category === "Elektronik");

  return (
    <div className="relative w-full bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-lg p-6">
      <div className="space-y-6">
        {/* Title */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            🎮 Live Demo: SUMMEWENN
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Gib deine Formel ein und berechne die Summe für "Elektronik"!
          </p>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden mx-auto max-w-md">
          <div className="bg-blue-500 text-white px-3 py-2 text-sm font-semibold">
            Umsätze nach Kategorie
          </div>
          <table className="w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-700">
              <tr>
                <th className="px-2 py-1.5 text-left text-xs">Row</th>
                <th className="px-4 py-1.5 text-left">A - Kategorie</th>
                <th className="px-4 py-1.5 text-left">B - Betrag</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-xs">
                <td className="px-2 py-1 text-slate-500">1</td>
                <td className="px-4 py-1 text-slate-500 font-semibold">Kategorie</td>
                <td className="px-4 py-1 text-slate-500 font-semibold">Betrag</td>
              </tr>
              {data.map((row, idx) => {
                const isMatching = result === "correct" && row.category === "Elektronik";
                return (
                  <tr
                    key={idx}
                    className={`border-t transition-all duration-300 ${
                      isMatching
                        ? "bg-green-100 dark:bg-green-900"
                        : "bg-white dark:bg-slate-800"
                    }`}
                  >
                    <td className="px-2 py-2 text-xs text-slate-500">{idx + 2}</td>
                    <td className="px-4 py-2">{row.category}</td>
                    <td className="px-4 py-2 font-mono">{row.amount}€</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Formula Input */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4">
          <div className="mb-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Deine SUMMEWENN-Formel:
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
              placeholder="=SUMMEWENN(...)"
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

        {/* Result Display */}
        {calculatedSum !== null && result === "correct" && (
          <div className="bg-green-50 dark:bg-green-950 border-2 border-green-500 rounded-lg p-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-800 dark:text-green-200 font-semibold mb-2">
                  ✓ Berechnung erfolgreich!
                </p>
                <p className="text-xs text-green-700 dark:text-green-300">
                  {matchingRows.length} Zeilen mit "Elektronik" gefunden:
                </p>
                <p className="text-xs text-green-700 dark:text-green-300 font-mono mt-1">
                  {matchingRows.map((r) => r.amount).join("€ + ")}€
                </p>
              </div>
              <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                {calculatedSum.toLocaleString("de-DE")}€
              </div>
            </div>
          </div>
        )}

        {/* Feedback */}
        {result !== "idle" && !calculatedSum && (
          <div
            className={`p-4 rounded-lg border-2 animate-in fade-in ${
              result === "correct"
                ? "bg-green-50 dark:bg-green-950 border-green-500 text-green-800 dark:text-green-200"
                : "bg-red-50 dark:bg-red-950 border-red-500 text-red-800 dark:text-red-200"
            }`}
          >
            <p className="font-semibold">{feedback}</p>
          </div>
        )}

        {result === "correct" && calculatedSum && (
          <div className="p-4 rounded-lg border-2 bg-green-50 dark:bg-green-950 border-green-500 text-green-800 dark:text-green-200 animate-in fade-in">
            <p className="font-semibold">{feedback}</p>
          </div>
        )}

        {/* Hint */}
        {result === "idle" && (
          <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>💡 Tipp:</strong> Die Formel sollte so aussehen:{" "}
              <code className="bg-white dark:bg-slate-800 px-2 py-0.5 rounded font-mono text-xs">
                =SUMMEWENN(A:A;"Elektronik";B:B)
              </code>
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
              • <strong>A:A</strong> = Kategorie-Spalte (wo gesucht wird)
              <br />
              • <strong>"Elektronik"</strong> = Suchkriterium (immer in Anführungszeichen!)
              <br />
              • <strong>B:B</strong> = Betrags-Spalte (was summiert wird)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
