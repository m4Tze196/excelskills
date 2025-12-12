"use client";

import { useState, useEffect } from "react";
import { shortcuts, calculateTotalTimeSaved } from "@/lib/shortcuts-data";
import type { Shortcut } from "@/lib/shortcuts-data";

export function TimeSavedCalculator() {
  const [selectedShortcuts, setSelectedShortcuts] = useState<string[]>([]);
  const [customUsage, setCustomUsage] = useState<Record<string, number>>({});
  const [showAnimation, setShowAnimation] = useState(false);

  const totalTimeSaved = calculateTotalTimeSaved();

  const calculatePersonalTimeSaved = () => {
    if (selectedShortcuts.length === 0) return 0;

    return shortcuts
      .filter((s) => selectedShortcuts.includes(s.id))
      .reduce((total, shortcut) => {
        const dailyUses = customUsage[shortcut.id] ?? shortcut.timeSaved.dailyUses;
        const weeklyHours = (shortcut.timeSaved.perUse * dailyUses * 5) / 3600; // 5 Arbeitstage
        return total + weeklyHours;
      }, 0);
  };

  const personalTimeSaved = calculatePersonalTimeSaved();
  const yearlyTimeSaved = personalTimeSaved * 52;

  const toggleShortcut = (id: string) => {
    setSelectedShortcuts((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 500);
  };

  const updateUsage = (id: string, uses: number) => {
    setCustomUsage((prev) => ({
      ...prev,
      [id]: uses,
    }));
  };

  const selectAll = () => {
    setSelectedShortcuts(shortcuts.map((s) => s.id));
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 500);
  };

  const clearAll = () => {
    setSelectedShortcuts([]);
    setCustomUsage({});
  };

  return (
    <div className="w-full bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 rounded-lg p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            ⏱️ Zeitersparnis-Rechner
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Berechne, wie viel Zeit du durch Shortcuts sparst
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-2 border-emerald-200 dark:border-emerald-800">
            <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">
              Alle Shortcuts zusammen:
            </div>
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {totalTimeSaved.toFixed(1)}h
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-500">pro Woche</div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-2 border-blue-200 dark:border-blue-800">
            <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">
              Deine Auswahl:
            </div>
            <div className={`text-3xl font-bold text-blue-600 dark:text-blue-400 transition-all ${
              showAnimation ? "scale-125" : "scale-100"
            }`}>
              {personalTimeSaved.toFixed(1)}h
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-500">pro Woche</div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-2 border-purple-200 dark:border-purple-800">
            <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">
              Pro Jahr:
            </div>
            <div className={`text-3xl font-bold text-purple-600 dark:text-purple-400 transition-all ${
              showAnimation ? "scale-125" : "scale-100"
            }`}>
              {yearlyTimeSaved.toFixed(0)}h
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-500">
              ≈ {(yearlyTimeSaved / 8).toFixed(0)} Arbeitstage
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 justify-center">
          <button
            onClick={selectAll}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-sm transition-colors"
          >
            Alle auswählen
          </button>
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-semibold text-sm transition-colors"
          >
            Zurücksetzen
          </button>
        </div>

        {/* Shortcut Selection */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            Wähle deine genutzten Shortcuts:
          </h4>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {shortcuts.map((shortcut) => {
              const isSelected = selectedShortcuts.includes(shortcut.id);
              const dailyUses = customUsage[shortcut.id] ?? shortcut.timeSaved.dailyUses;

              return (
                <div
                  key={shortcut.id}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleShortcut(shortcut.id)}
                      className="mt-1 w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{shortcut.icon}</span>
                        <span className="font-semibold text-sm text-slate-800 dark:text-slate-100">
                          {shortcut.title}
                        </span>
                        <div className="flex items-center gap-1 text-xs">
                          {shortcut.keysDisplay.map((key, i) => (
                            <span key={i}>
                              <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-xs font-mono">
                                {key}
                              </kbd>
                              {i < shortcut.keysDisplay.length - 1 && "+"}
                            </span>
                          ))}
                        </div>
                      </div>

                      {isSelected && (
                        <div className="mt-2 flex items-center gap-3 animate-in fade-in slide-in-from-top duration-300">
                          <label className="text-xs text-slate-600 dark:text-slate-400">
                            Nutzungen pro Tag:
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="200"
                            value={dailyUses}
                            onChange={(e) => updateUsage(shortcut.id, parseInt(e.target.value) || 0)}
                            className="w-20 px-2 py-1 border border-slate-300 dark:border-slate-600 rounded text-sm dark:bg-slate-700"
                          />
                          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                            = {((shortcut.timeSaved.perUse * dailyUses * 5) / 3600).toFixed(2)}h/Woche
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Results Summary */}
        {selectedShortcuts.length > 0 && (
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg p-6 text-white animate-in fade-in slide-in-from-bottom duration-500">
            <div className="text-center space-y-2">
              <h4 className="text-xl font-bold">
                🎉 Beeindruckende Zeitersparnis!
              </h4>
              <p className="text-sm opacity-90">
                Mit {selectedShortcuts.length} Shortcuts sparst du:
              </p>
              <div className="text-4xl font-bold">
                {yearlyTimeSaved.toFixed(0)} Stunden pro Jahr
              </div>
              <p className="text-sm opacity-90">
                Das sind etwa <strong>{(yearlyTimeSaved / 8).toFixed(0)} Arbeitstage</strong>,
                die du produktiver nutzen kannst!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
