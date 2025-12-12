"use client";

import { useState } from "react";

type ValidationRule = "number" | "text" | "date" | "list";

export function DataValidationLiveDemo() {
  const [ruleType, setRuleType] = useState<ValidationRule>("number");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<"idle" | "valid" | "invalid">("idle");
  const [feedback, setFeedback] = useState("");

  // Configuration for number rule
  const [minValue, setMinValue] = useState("1");
  const [maxValue, setMaxValue] = useState("100");

  // Configuration for list rule
  const listOptions = ["Offen", "In Bearbeitung", "Erledigt", "Abgebrochen"];

  const validateInput = () => {
    if (!inputValue.trim()) {
      setResult("invalid");
      setFeedback("⚠️ Bitte gib einen Wert ein!");
      return;
    }

    switch (ruleType) {
      case "number":
        const num = parseFloat(inputValue);
        const min = parseFloat(minValue);
        const max = parseFloat(maxValue);

        if (isNaN(num)) {
          setResult("invalid");
          setFeedback(`⚠️ "${inputValue}" ist keine gültige Zahl!`);
        } else if (num < min || num > max) {
          setResult("invalid");
          setFeedback(`⚠️ Bitte gib eine Zahl zwischen ${min} und ${max} ein. Deine Eingabe: ${num}`);
        } else {
          setResult("valid");
          setFeedback(`✓ Perfekt! ${num} liegt im erlaubten Bereich.`);
        }
        break;

      case "text":
        const textLength = inputValue.length;
        if (textLength < 3) {
          setResult("invalid");
          setFeedback(`⚠️ Text zu kurz! Mindestens 3 Zeichen erforderlich. Aktuell: ${textLength}`);
        } else if (textLength > 50) {
          setResult("invalid");
          setFeedback(`⚠️ Text zu lang! Maximal 50 Zeichen erlaubt. Aktuell: ${textLength}`);
        } else {
          setResult("valid");
          setFeedback(`✓ Gültige Texteingabe mit ${textLength} Zeichen.`);
        }
        break;

      case "date":
        const datePattern = /^\d{2}\.\d{2}\.\d{4}$/;
        if (!datePattern.test(inputValue)) {
          setResult("invalid");
          setFeedback(`⚠️ Ungültiges Datumsformat! Nutze: TT.MM.JJJJ (z.B. 15.03.2024)`);
        } else {
          setResult("valid");
          setFeedback(`✓ Gültiges Datum im Format TT.MM.JJJJ!`);
        }
        break;

      case "list":
        if (listOptions.includes(inputValue)) {
          setResult("valid");
          setFeedback(`✓ "${inputValue}" ist eine gültige Option!`);
        } else {
          setResult("invalid");
          setFeedback(`⚠️ "${inputValue}" ist nicht in der Liste! Erlaubt: ${listOptions.join(", ")}`);
        }
        break;
    }
  };

  const handleReset = () => {
    setInputValue("");
    setResult("idle");
    setFeedback("");
  };

  const handleRuleChange = (newRule: ValidationRule) => {
    setRuleType(newRule);
    handleReset();
  };

  return (
    <div className="relative w-full bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950 rounded-lg p-6">
      <div className="space-y-6">
        {/* Title */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            🎮 Live Demo: Datenüberprüfung
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Wähle eine Regel und teste verschiedene Eingaben!
          </p>
        </div>

        {/* Rule Type Tabs */}
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => handleRuleChange("number")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              ruleType === "number"
                ? "bg-amber-600 text-white shadow-lg scale-105"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-700"
            }`}
          >
            Zahlenbereich
          </button>
          <button
            onClick={() => handleRuleChange("text")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              ruleType === "text"
                ? "bg-blue-600 text-white shadow-lg scale-105"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700"
            }`}
          >
            Textlänge
          </button>
          <button
            onClick={() => handleRuleChange("date")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              ruleType === "date"
                ? "bg-purple-600 text-white shadow-lg scale-105"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-700"
            }`}
          >
            Datum
          </button>
          <button
            onClick={() => handleRuleChange("list")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              ruleType === "list"
                ? "bg-green-600 text-white shadow-lg scale-105"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-green-50 dark:hover:bg-slate-700"
            }`}
          >
            Dropdown-Liste
          </button>
        </div>

        {/* Rule Configuration */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4">
          <h4 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">
            Regel: {
              ruleType === "number" ? "Zahlenbereich" :
              ruleType === "text" ? "Textlänge" :
              ruleType === "date" ? "Datumsformat" :
              "Dropdown-Liste"
            }
          </h4>

          {ruleType === "number" && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                  Minimum
                </label>
                <input
                  type="number"
                  value={minValue}
                  onChange={(e) => setMinValue(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm dark:bg-slate-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                  Maximum
                </label>
                <input
                  type="number"
                  value={maxValue}
                  onChange={(e) => setMaxValue(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm dark:bg-slate-700"
                />
              </div>
            </div>
          )}

          {ruleType === "text" && (
            <div className="mb-4 bg-blue-50 dark:bg-blue-950/50 border border-blue-300 dark:border-blue-700 rounded-lg p-3">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Regel:</strong> Text muss zwischen 3 und 50 Zeichen lang sein
              </p>
            </div>
          )}

          {ruleType === "date" && (
            <div className="mb-4 bg-purple-50 dark:bg-purple-950/50 border border-purple-300 dark:border-purple-700 rounded-lg p-3">
              <p className="text-sm text-purple-800 dark:text-purple-200">
                <strong>Regel:</strong> Datum im Format TT.MM.JJJJ (z.B. 15.03.2024)
              </p>
            </div>
          )}

          {ruleType === "list" && (
            <div className="mb-4 bg-green-50 dark:bg-green-950/50 border border-green-300 dark:border-green-700 rounded-lg p-3">
              <p className="text-sm text-green-800 dark:text-green-200 mb-2">
                <strong>Erlaubte Werte:</strong>
              </p>
              <div className="flex flex-wrap gap-2">
                {listOptions.map((option) => (
                  <span
                    key={option}
                    className="bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-semibold"
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Input Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              Deine Eingabe:
            </label>
            {ruleType === "list" ? (
              <select
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm dark:bg-slate-700"
              >
                <option value="">-- Bitte wählen --</option>
                {listOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") validateInput();
                }}
                placeholder={
                  ruleType === "number" ? "z.B. 50" :
                  ruleType === "text" ? "z.B. Beispieltext" :
                  "z.B. 15.03.2024"
                }
                className={`w-full px-3 py-2 border-2 rounded-lg text-sm transition-all dark:bg-slate-700 ${
                  result === "valid"
                    ? "border-green-500 bg-green-50 dark:bg-green-950"
                    : result === "invalid"
                    ? "border-red-500 bg-red-50 dark:bg-red-950"
                    : "border-slate-300 dark:border-slate-600"
                }`}
              />
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={validateInput}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                ruleType === "number" ? "bg-amber-600 hover:bg-amber-700" :
                ruleType === "text" ? "bg-blue-600 hover:bg-blue-700" :
                ruleType === "date" ? "bg-purple-600 hover:bg-purple-700" :
                "bg-green-600 hover:bg-green-700"
              } text-white`}
            >
              Überprüfen
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
        {feedback && (
          <div
            className={`p-4 rounded-lg border-2 animate-in fade-in ${
              result === "valid"
                ? "bg-green-50 dark:bg-green-950 border-green-500 text-green-800 dark:text-green-200"
                : "bg-red-50 dark:bg-red-950 border-red-500 text-red-800 dark:text-red-200"
            }`}
          >
            <p className="font-semibold">{feedback}</p>
          </div>
        )}

        {/* Hint */}
        {result === "idle" && (
          <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>💡 Tipp:</strong> Probiere verschiedene Werte aus!
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-300 mt-2">
              {ruleType === "number" && `Versuche: ${minValue}, ${maxValue}, ${parseInt(maxValue) + 10}`}
              {ruleType === "text" && "Versuche: 'Hi', 'Hallo Welt', 'Ein sehr sehr langer Text...'"}
              {ruleType === "date" && "Versuche: '15.03.2024', '2024-03-15', '15/03/2024'"}
              {ruleType === "list" && "Wähle eine Option aus der Dropdown-Liste"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
