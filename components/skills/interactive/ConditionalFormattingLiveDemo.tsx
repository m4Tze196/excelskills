"use client";

import { useState } from "react";

interface Rule {
  id: string;
  operator: ">" | "<" | "=" | ">=" | "<=" | "between";
  value1: string;
  value2?: string;
  color: "green" | "orange" | "red" | "blue" | "purple";
}

interface CellData {
  label: string;
  value: number;
}

const colorMap = {
  green: { bg: "bg-green-500", text: "text-white", label: "Grün" },
  orange: { bg: "bg-orange-500", text: "text-white", label: "Orange" },
  red: { bg: "bg-red-500", text: "text-white", label: "Rot" },
  blue: { bg: "bg-blue-500", text: "text-white", label: "Blau" },
  purple: { bg: "bg-purple-500", text: "text-white", label: "Lila" },
};

export function ConditionalFormattingLiveDemo() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [newRule, setNewRule] = useState<Rule>({
    id: "",
    operator: ">",
    value1: "",
    color: "green",
  });
  const [feedback, setFeedback] = useState<string>("");
  const [showHint, setShowHint] = useState(true);

  const cells: CellData[] = [
    { label: "Q1", value: 1200 },
    { label: "Q2", value: 850 },
    { label: "Q3", value: 1450 },
    { label: "Q4", value: 320 },
  ];

  const evaluateRule = (value: number, rule: Rule): boolean => {
    const val1 = parseFloat(rule.value1);
    if (isNaN(val1)) return false;

    switch (rule.operator) {
      case ">":
        return value > val1;
      case "<":
        return value < val1;
      case "=":
        return value === val1;
      case ">=":
        return value >= val1;
      case "<=":
        return value <= val1;
      case "between":
        const val2 = parseFloat(rule.value2 || "");
        if (isNaN(val2)) return false;
        return value >= val1 && value <= val2;
      default:
        return false;
    }
  };

  const getCellColor = (value: number): string | null => {
    // Apply rules in order (first matching rule wins)
    for (const rule of rules) {
      if (evaluateRule(value, rule)) {
        return rule.color;
      }
    }
    return null;
  };

  const addRule = () => {
    if (!newRule.value1) {
      setFeedback("⚠️ Bitte gib einen Wert ein!");
      return;
    }

    if (newRule.operator === "between" && !newRule.value2) {
      setFeedback("⚠️ Für 'zwischen' brauchst du zwei Werte!");
      return;
    }

    const ruleWithId = {
      ...newRule,
      id: Date.now().toString(),
    };

    setRules([...rules, ruleWithId]);
    setNewRule({
      id: "",
      operator: ">",
      value1: "",
      color: "green",
    });
    setFeedback("✓ Regel hinzugefügt!");
    setShowHint(false);

    // Check if they created the "perfect" rules
    setTimeout(() => {
      checkPerfectSolution();
    }, 100);
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter((r) => r.id !== id));
    setFeedback("🗑️ Regel gelöscht");
  };

  const checkPerfectSolution = () => {
    // Check if rules create a traffic light system
    const hasGreenHigh = rules.some(
      (r) =>
        (r.operator === ">" || r.operator === ">=") &&
        parseFloat(r.value1) === 1000 &&
        r.color === "green"
    );
    const hasOrangeMid = rules.some(
      (r) => r.operator === "between" && r.color === "orange"
    );
    const hasRedLow = rules.some(
      (r) =>
        (r.operator === "<" || r.operator === "<=") &&
        parseFloat(r.value1) === 500 &&
        r.color === "red"
    );

    if (hasGreenHigh && hasOrangeMid && hasRedLow) {
      setFeedback("🎉 Perfekt! Du hast ein Ampel-System erstellt!");
    }
  };

  const resetDemo = () => {
    setRules([]);
    setNewRule({
      id: "",
      operator: ">",
      value1: "",
      color: "green",
    });
    setFeedback("");
    setShowHint(true);
  };

  return (
    <div className="relative w-full bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg p-6">
      <div className="space-y-6">
        {/* Title */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            🎮 Live Demo: Bedingte Formatierung
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Erstelle Regeln und sieh wie die Zellen sich färben!
          </p>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden mx-auto max-w-md">
          <div className="bg-green-500 text-white px-3 py-2 text-sm font-semibold">
            Umsatz pro Quartal
          </div>
          <table className="w-full">
            <thead className="bg-slate-100 dark:bg-slate-700">
              <tr>
                <th className="px-4 py-2 text-left text-sm">Quartal</th>
                <th className="px-4 py-2 text-left text-sm">Umsatz (€)</th>
              </tr>
            </thead>
            <tbody>
              {cells.map((cell, idx) => {
                const color = getCellColor(cell.value);
                const colorStyle = color ? colorMap[color] : null;

                return (
                  <tr
                    key={idx}
                    className={`border-t transition-all duration-300 ${
                      colorStyle
                        ? `${colorStyle.bg} ${colorStyle.text}`
                        : "bg-white dark:bg-slate-800"
                    }`}
                  >
                    <td className="px-4 py-3 font-semibold">{cell.label}</td>
                    <td className="px-4 py-3 font-mono text-lg">
                      {cell.value.toLocaleString("de-DE")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Rule Creator */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4">
          <h4 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">
            Regel erstellen:
          </h4>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Operator */}
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Bedingung
                </label>
                <select
                  value={newRule.operator}
                  onChange={(e) =>
                    setNewRule({
                      ...newRule,
                      operator: e.target.value as Rule["operator"],
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:border-green-500 dark:bg-slate-700"
                >
                  <option value=">">größer als (&gt;)</option>
                  <option value="<">kleiner als (&lt;)</option>
                  <option value="=">gleich (=)</option>
                  <option value=">=">größer gleich (≥)</option>
                  <option value="<=">kleiner gleich (≤)</option>
                  <option value="between">zwischen</option>
                </select>
              </div>

              {/* Value 1 */}
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Wert {newRule.operator === "between" ? "von" : ""}
                </label>
                <input
                  type="number"
                  value={newRule.value1}
                  onChange={(e) =>
                    setNewRule({ ...newRule, value1: e.target.value })
                  }
                  placeholder="z.B. 1000"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:border-green-500 dark:bg-slate-700"
                />
              </div>

              {/* Value 2 (only for between) */}
              {newRule.operator === "between" && (
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Wert bis
                  </label>
                  <input
                    type="number"
                    value={newRule.value2 || ""}
                    onChange={(e) =>
                      setNewRule({ ...newRule, value2: e.target.value })
                    }
                    placeholder="z.B. 2000"
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:border-green-500 dark:bg-slate-700"
                  />
                </div>
              )}

              {/* Color Picker */}
              {newRule.operator !== "between" && (
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Farbe
                  </label>
                  <div className="flex gap-2">
                    {(Object.keys(colorMap) as Array<keyof typeof colorMap>).map(
                      (color) => (
                        <button
                          key={color}
                          onClick={() => setNewRule({ ...newRule, color })}
                          className={`w-8 h-8 rounded-full ${
                            colorMap[color].bg
                          } border-2 ${
                            newRule.color === color
                              ? "border-slate-900 dark:border-white scale-110"
                              : "border-transparent"
                          } transition-transform hover:scale-110`}
                          title={colorMap[color].label}
                        />
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Color Picker (for between, on separate row) */}
            {newRule.operator === "between" && (
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Farbe
                </label>
                <div className="flex gap-2">
                  {(Object.keys(colorMap) as Array<keyof typeof colorMap>).map(
                    (color) => (
                      <button
                        key={color}
                        onClick={() => setNewRule({ ...newRule, color })}
                        className={`w-8 h-8 rounded-full ${
                          colorMap[color].bg
                        } border-2 ${
                          newRule.color === color
                            ? "border-slate-900 dark:border-white scale-110"
                            : "border-transparent"
                        } transition-transform hover:scale-110`}
                        title={colorMap[color].label}
                      />
                    )
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={addRule}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                + Regel hinzufügen
              </button>
              <button
                onClick={resetDemo}
                className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Zurücksetzen
              </button>
            </div>
          </div>
        </div>

        {/* Active Rules List */}
        {rules.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4">
            <h4 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-100">
              Aktive Regeln ({rules.length}):
            </h4>
            <div className="space-y-2">
              {rules.map((rule, idx) => (
                <div
                  key={rule.id}
                  className="flex items-center justify-between bg-slate-50 dark:bg-slate-700 rounded-lg p-3 border border-slate-200 dark:border-slate-600"
                >
                  <div className="flex items-center gap-3">
                    <span className="bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </span>
                    <div className="text-sm">
                      <span className="font-semibold">Wenn Wert </span>
                      <span className="text-green-600 dark:text-green-400">
                        {rule.operator === ">" && "größer als"}
                        {rule.operator === "<" && "kleiner als"}
                        {rule.operator === "=" && "gleich"}
                        {rule.operator === ">=" && "größer gleich"}
                        {rule.operator === "<=" && "kleiner gleich"}
                        {rule.operator === "between" && "zwischen"}
                      </span>
                      <span className="font-mono font-semibold">
                        {" "}
                        {rule.value1}
                        {rule.operator === "between" && ` und ${rule.value2}`}
                      </span>
                      <span className="font-semibold"> → </span>
                      <span
                        className={`inline-block px-2 py-0.5 rounded ${
                          colorMap[rule.color].bg
                        } ${colorMap[rule.color].text} text-xs font-semibold`}
                      >
                        {colorMap[rule.color].label}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteRule(rule.id)}
                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-bold text-lg"
                    title="Regel löschen"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div
            className={`p-4 rounded-lg border-2 animate-in fade-in ${
              feedback.includes("Perfekt")
                ? "bg-green-50 dark:bg-green-950 border-green-500 text-green-800 dark:text-green-200"
                : feedback.includes("⚠️")
                ? "bg-orange-50 dark:bg-orange-950 border-orange-500 text-orange-800 dark:text-orange-200"
                : "bg-blue-50 dark:bg-blue-950 border-blue-500 text-blue-800 dark:text-blue-200"
            }`}
          >
            <p className="font-semibold">{feedback}</p>
          </div>
        )}

        {/* Hint */}
        {showHint && rules.length === 0 && (
          <div className="bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <p className="text-sm text-green-800 dark:text-green-200">
              <strong>💡 Tipp:</strong> Versuche ein Ampel-System zu erstellen:
            </p>
            <ul className="text-sm text-green-700 dark:text-green-300 mt-2 space-y-1 ml-6">
              <li>• 🟢 Grün für Werte &gt; 1000</li>
              <li>• 🟠 Orange für Werte zwischen 500 und 1000</li>
              <li>• 🔴 Rot für Werte &lt; 500</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
