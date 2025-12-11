"use client";

import { useState } from "react";

interface DataRow {
  category: string;
  region: string;
  amount: number;
}

type Mode = "sumif" | "sumifs";

export function SumIfLiveDemo() {
  const [mode, setMode] = useState<Mode>("sumif");
  const [formula, setFormula] = useState("");
  const [result, setResult] = useState<"idle" | "correct" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [calculatedSum, setCalculatedSum] = useState<number | null>(null);

  const data: DataRow[] = [
    { category: "Elektronik", region: "Nord", amount: 1200 },
    { category: "Möbel", region: "Süd", amount: 850 },
    { category: "Elektronik", region: "Süd", amount: 450 },
    { category: "Büro", region: "Nord", amount: 320 },
    { category: "Elektronik", region: "Nord", amount: 680 },
    { category: "Möbel", region: "Nord", amount: 1100 },
  ];

  // Correct solutions for SUMMEWENN
  const correctFormulasSumIf = [
    '=SUMMEWENN(A2:A7;"Elektronik";C2:C7)',
    '=SUMMEWENN(A:A;"Elektronik";C:C)',
    '=SUMMEWENN($A$2:$A$7;"Elektronik";$C$2:$C$7)',
  ];

  // Correct solutions for SUMMEWENNS
  const correctFormulasSumIfs = [
    '=SUMMEWENNS(C2:C7;A2:A7;"Elektronik";B2:B7;"Nord")',
    '=SUMMEWENNS(C:C;A:A;"Elektronik";B:B;"Nord")',
    '=SUMMEWENNS($C$2:$C$7;$A$2:$A$7;"Elektronik";$B$2:$B$7;"Nord")',
  ];

  const handleSubmit = () => {
    const normalizedFormula = formula.trim().toUpperCase();

    if (mode === "sumif") {
      const isCorrect = correctFormulasSumIf.some((correct) =>
        normalizedFormula.includes(correct.toUpperCase())
      );

      if (isCorrect) {
        const sum = data
          .filter((row) => row.category === "Elektronik")
          .reduce((acc, row) => acc + row.amount, 0);

        setCalculatedSum(sum);
        setResult("correct");
        setFeedback("✓ Perfekt! Die SUMMEWENN-Formel funktioniert korrekt.");
      } else if (normalizedFormula.startsWith("=SUMMEWENN")) {
        setResult("error");
        if (!normalizedFormula.includes('"')) {
          setFeedback('⚠️ Fehler: Vergiss die Anführungszeichen nicht! → "Elektronik"');
        } else if (!normalizedFormula.includes("A") || !normalizedFormula.includes("C")) {
          setFeedback("⚠️ Fehler: Überprüfe die Spaltenbereiche (A:A für Kategorie, C:C für Beträge).");
        } else {
          setFeedback('⚠️ Fast! Tipp: =SUMMEWENN(A:A;"Elektronik";C:C)');
        }
      } else {
        setResult("error");
        setFeedback("⚠️ Die Formel muss mit =SUMMEWENN beginnen.");
      }
    } else {
      // SUMMEWENNS mode
      const isCorrect = correctFormulasSumIfs.some((correct) =>
        normalizedFormula.includes(correct.toUpperCase())
      );

      if (isCorrect) {
        const sum = data
          .filter((row) => row.category === "Elektronik" && row.region === "Nord")
          .reduce((acc, row) => acc + row.amount, 0);

        setCalculatedSum(sum);
        setResult("correct");
        setFeedback("✓ Perfekt! Die SUMMEWENNS-Formel mit mehreren Bedingungen funktioniert!");
      } else if (normalizedFormula.startsWith("=SUMMEWENNS")) {
        setResult("error");
        if (!normalizedFormula.includes('"ELEKTRONIK"') || !normalizedFormula.includes('"NORD"')) {
          setFeedback('⚠️ Fehler: Beide Kriterien brauchen Anführungszeichen! → "Elektronik" und "Nord"');
        } else if (!normalizedFormula.includes("A") || !normalizedFormula.includes("B") || !normalizedFormula.includes("C")) {
          setFeedback("⚠️ Fehler: Überprüfe alle Spaltenbereiche (C:C Summe, A:A Kategorie, B:B Region).");
        } else {
          setFeedback('⚠️ Fast! Tipp: =SUMMEWENNS(C:C;A:A;"Elektronik";B:B;"Nord")');
        }
      } else {
        setResult("error");
        setFeedback("⚠️ Die Formel muss mit =SUMMEWENNS beginnen (mit S am Ende!).");
      }
    }
  };

  const handleReset = () => {
    setFormula("");
    setResult("idle");
    setFeedback("");
    setCalculatedSum(null);
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    handleReset();
  };

  const highlightSyntax = (text: string) => {
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
      if (part.toUpperCase().includes("ELEKTRONIK") || part.toUpperCase().includes("NORD")) {
        return (
          <span key={idx} className="text-orange-600 dark:text-orange-400">
            {part}
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  const matchingRows = mode === "sumif"
    ? data.filter((row) => row.category === "Elektronik")
    : data.filter((row) => row.category === "Elektronik" && row.region === "Nord");

  return (
    <div className="relative w-full bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-lg p-6">
      <div className="space-y-6">
        {/* Title */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            🎮 Live Demo: SUMMEWENN & SUMMEWENNS
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Wähle zwischen einer oder mehreren Bedingungen!
          </p>
        </div>

        {/* Mode Tabs */}
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => handleModeChange("sumif")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              mode === "sumif"
                ? "bg-blue-600 text-white shadow-lg scale-105"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700"
            }`}
          >
            <div className="text-sm font-semibold">SUMMEWENN</div>
            <div className="text-xs opacity-80">1 Bedingung</div>
          </button>
          <button
            onClick={() => handleModeChange("sumifs")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              mode === "sumifs"
                ? "bg-purple-600 text-white shadow-lg scale-105"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-700"
            }`}
          >
            <div className="text-sm font-semibold">SUMMEWENNS</div>
            <div className="text-xs opacity-80">Mehrere Bedingungen</div>
          </button>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden mx-auto max-w-2xl">
          <div className={`${mode === "sumif" ? "bg-blue-500" : "bg-purple-500"} text-white px-3 py-2 text-sm font-semibold`}>
            Umsätze nach Kategorie {mode === "sumifs" && "und Region"}
          </div>
          <table className="w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-700">
              <tr>
                <th className="px-2 py-1.5 text-left text-xs">Row</th>
                <th className="px-4 py-1.5 text-left">A - Kategorie</th>
                <th className="px-4 py-1.5 text-left">B - Region</th>
                <th className="px-4 py-1.5 text-left">C - Betrag</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-xs">
                <td className="px-2 py-1 text-slate-500">1</td>
                <td className="px-4 py-1 text-slate-500 font-semibold">Kategorie</td>
                <td className="px-4 py-1 text-slate-500 font-semibold">Region</td>
                <td className="px-4 py-1 text-slate-500 font-semibold">Betrag</td>
              </tr>
              {data.map((row, idx) => {
                const isMatching = result === "correct" && matchingRows.includes(row);
                return (
                  <tr
                    key={idx}
                    className={`border-t transition-all duration-300 ${
                      isMatching
                        ? `${mode === "sumif" ? "bg-blue-100 dark:bg-blue-900" : "bg-purple-100 dark:bg-purple-900"}`
                        : "bg-white dark:bg-slate-800"
                    }`}
                  >
                    <td className="px-2 py-2 text-xs text-slate-500">{idx + 2}</td>
                    <td className="px-4 py-2">{row.category}</td>
                    <td className="px-4 py-2">{row.region}</td>
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
              Deine {mode === "sumif" ? "SUMMEWENN" : "SUMMEWENNS"}-Formel:
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
              placeholder={mode === "sumif" ? "=SUMMEWENN(...)" : "=SUMMEWENNS(...)"}
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
              className={`${mode === "sumif" ? "bg-blue-600 hover:bg-blue-700" : "bg-purple-600 hover:bg-purple-700"} text-white px-6 py-2 rounded-lg font-semibold transition-colors`}
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
          <div className={`${mode === "sumif" ? "bg-blue-50 dark:bg-blue-950 border-blue-500" : "bg-purple-50 dark:bg-purple-950 border-purple-500"} border-2 rounded-lg p-6 animate-in fade-in`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${mode === "sumif" ? "text-blue-800 dark:text-blue-200" : "text-purple-800 dark:text-purple-200"} font-semibold mb-2`}>
                  ✓ Berechnung erfolgreich!
                </p>
                <p className={`text-xs ${mode === "sumif" ? "text-blue-700 dark:text-blue-300" : "text-purple-700 dark:text-purple-300"}`}>
                  {matchingRows.length} Zeile{matchingRows.length !== 1 ? "n" : ""} {mode === "sumif" ? 'mit "Elektronik"' : 'mit "Elektronik" UND "Nord"'} gefunden:
                </p>
                <p className={`text-xs ${mode === "sumif" ? "text-blue-700 dark:text-blue-300" : "text-purple-700 dark:text-purple-300"} font-mono mt-1`}>
                  {matchingRows.map((r) => r.amount).join("€ + ")}€
                </p>
              </div>
              <div className={`text-4xl font-bold ${mode === "sumif" ? "text-blue-600 dark:text-blue-400" : "text-purple-600 dark:text-purple-400"}`}>
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
                ? `${mode === "sumif" ? "bg-blue-50 dark:bg-blue-950 border-blue-500 text-blue-800 dark:text-blue-200" : "bg-purple-50 dark:bg-purple-950 border-purple-500 text-purple-800 dark:text-purple-200"}`
                : "bg-red-50 dark:bg-red-950 border-red-500 text-red-800 dark:text-red-200"
            }`}
          >
            <p className="font-semibold">{feedback}</p>
          </div>
        )}

        {result === "correct" && calculatedSum && (
          <div className={`p-4 rounded-lg border-2 animate-in fade-in ${mode === "sumif" ? "bg-blue-50 dark:bg-blue-950 border-blue-500 text-blue-800 dark:text-blue-200" : "bg-purple-50 dark:bg-purple-950 border-purple-500 text-purple-800 dark:text-purple-200"}`}>
            <p className="font-semibold">{feedback}</p>
          </div>
        )}

        {/* Hint */}
        {result === "idle" && (
          <div className={`${mode === "sumif" ? "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800" : "bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800"} border rounded-lg p-4`}>
            <p className={`text-sm ${mode === "sumif" ? "text-blue-800 dark:text-blue-200" : "text-purple-800 dark:text-purple-200"}`}>
              <strong>💡 Tipp:</strong> Die Formel sollte so aussehen:{" "}
              <code className="bg-white dark:bg-slate-800 px-2 py-0.5 rounded font-mono text-xs">
                {mode === "sumif" ? '=SUMMEWENN(A:A;"Elektronik";C:C)' : '=SUMMEWENNS(C:C;A:A;"Elektronik";B:B;"Nord")'}
              </code>
            </p>
            {mode === "sumif" ? (
              <p className={`text-xs ${mode === "sumif" ? "text-blue-700 dark:text-blue-300" : "text-purple-700 dark:text-purple-300"} mt-2`}>
                • <strong>A:A</strong> = Kategorie-Spalte (wo gesucht wird)
                <br />
                • <strong>"Elektronik"</strong> = Suchkriterium (immer in Anführungszeichen!)
                <br />
                • <strong>C:C</strong> = Betrags-Spalte (was summiert wird)
              </p>
            ) : (
              <p className={`text-xs ${mode === "sumif" ? "text-blue-700 dark:text-blue-300" : "text-purple-700 dark:text-purple-300"} mt-2`}>
                • <strong>C:C</strong> = Betrags-Spalte (was summiert wird - kommt zuerst!)
                <br />
                • <strong>A:A;"Elektronik"</strong> = 1. Bedingung (Kategorie = Elektronik)
                <br />
                • <strong>B:B;"Nord"</strong> = 2. Bedingung (Region = Nord)
              </p>
            )}
          </div>
        )}

        {/* Info about SUMMEWENNS */}
        {mode === "sumifs" && result === "idle" && (
          <div className="bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-700 rounded-lg p-4">
            <p className="text-sm text-purple-800 dark:text-purple-200 font-semibold mb-2">
              ⭐ SUMMEWENNS vs SUMMEWENN
            </p>
            <p className="text-xs text-purple-700 dark:text-purple-300">
              <strong>Unterschied:</strong> SUMMEWENNS erlaubt mehrere Bedingungen gleichzeitig.
              <br />
              <strong>Syntax:</strong> Summen-Bereich kommt zuerst, dann Bedingung-Paare (Bereich;Kriterium)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
