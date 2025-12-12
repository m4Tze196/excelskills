"use client";

import { useState } from "react";
import type { Shortcut } from "@/lib/shortcuts-data";
import { getRelatedShortcuts } from "@/lib/shortcuts-data";

interface ShortcutCardProps {
  shortcut: Shortcut;
  onPractice?: (shortcut: Shortcut) => void;
}

export function ShortcutCard({ shortcut, onPractice }: ShortcutCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const relatedShortcuts = getRelatedShortcuts(shortcut);

  const getCategoryColor = () => {
    switch (shortcut.category) {
      case "essential":
        return {
          bg: "bg-blue-50 dark:bg-blue-950/50",
          border: "border-blue-200 dark:border-blue-800",
          text: "text-blue-700 dark:text-blue-300",
          badge: "bg-blue-500 dark:bg-blue-600",
          hover: "hover:border-blue-400 dark:hover:border-blue-600",
        };
      case "power":
        return {
          bg: "bg-purple-50 dark:bg-purple-950/50",
          border: "border-purple-200 dark:border-purple-800",
          text: "text-purple-700 dark:text-purple-300",
          badge: "bg-purple-500 dark:bg-purple-600",
          hover: "hover:border-purple-400 dark:hover:border-purple-600",
        };
      case "ninja":
        return {
          bg: "bg-amber-50 dark:bg-amber-950/50",
          border: "border-amber-200 dark:border-amber-800",
          text: "text-amber-700 dark:text-amber-300",
          badge: "bg-amber-500 dark:bg-amber-600",
          hover: "hover:border-amber-400 dark:hover:border-amber-600",
        };
    }
  };

  const getDifficultyStars = () => {
    return "★".repeat(shortcut.difficulty) + "☆".repeat(3 - shortcut.difficulty);
  };

  const getCategoryLabel = () => {
    switch (shortcut.category) {
      case "essential":
        return "Essential";
      case "power":
        return "Power User";
      case "ninja":
        return "Ninja Level";
    }
  };

  const colors = getCategoryColor();

  return (
    <div
      className={`${colors.bg} border-2 ${colors.border} ${colors.hover} rounded-lg p-4 transition-all duration-300 ${
        isExpanded ? "scale-105 shadow-lg" : "hover:shadow-md"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{shortcut.icon}</span>
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              {shortcut.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs px-2 py-0.5 rounded ${colors.badge} text-white font-semibold`}>
                {getCategoryLabel()}
              </span>
              <span className="text-xs text-amber-500" title={`Schwierigkeit: ${shortcut.difficulty}/3`}>
                {getDifficultyStars()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Combination */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {shortcut.keysDisplay.map((key, index) => (
          <div key={index} className="flex items-center gap-1">
            <kbd className="px-3 py-1.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded font-mono text-sm font-bold text-slate-700 dark:text-slate-300 shadow-sm">
              {key}
            </kbd>
            {index < shortcut.keysDisplay.length - 1 && (
              <span className="text-slate-400 font-bold">+</span>
            )}
          </div>
        ))}
      </div>

      {/* Description */}
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
        {shortcut.description}
      </p>

      {/* Time Saved */}
      <div className={`${colors.bg} border ${colors.border} rounded-lg p-2 mb-3`}>
        <div className="flex items-center justify-between text-xs">
          <span className={`font-semibold ${colors.text}`}>⏱️ Zeitersparnis:</span>
          <div className="text-right">
            <div className={`font-bold ${colors.text}`}>
              {shortcut.timeSaved.weeklyTotal}h pro Woche
            </div>
            <div className="text-slate-500 dark:text-slate-400">
              ({shortcut.timeSaved.perUse}s × {shortcut.timeSaved.dailyUses}/Tag)
            </div>
          </div>
        </div>
      </div>

      {/* Expand/Collapse Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full py-2 rounded-lg font-semibold text-sm transition-colors ${
          isExpanded
            ? `${colors.badge} text-white`
            : `bg-white dark:bg-slate-800 ${colors.text} border ${colors.border}`
        }`}
      >
        {isExpanded ? "Weniger anzeigen ▲" : "Mehr Details ▼"}
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top duration-300">
          {/* Use Case */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
            <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Anwendungsfall:
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {shortcut.useCase}
            </p>
          </div>

          {/* Pro Tip */}
          {shortcut.proTip && (
            <div className={`${colors.bg} border ${colors.border} rounded-lg p-3`}>
              <h4 className={`text-xs font-semibold ${colors.text} mb-1`}>
                💡 Pro-Tipp:
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {shortcut.proTip}
              </p>
            </div>
          )}

          {/* Platform */}
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>💻 Plattform:</span>
            <span className="font-semibold">
              {shortcut.platform === "both"
                ? "Windows & Mac"
                : shortcut.platform === "windows"
                ? "Windows"
                : "Mac"}
            </span>
          </div>

          {/* Related Shortcuts */}
          {relatedShortcuts.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
              <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Verwandte Shortcuts:
              </h4>
              <div className="flex flex-wrap gap-2">
                {relatedShortcuts.map((related) => (
                  <span
                    key={related.id}
                    className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded"
                  >
                    {related.icon} {related.title}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Practice Button */}
          {onPractice && (
            <button
              onClick={() => onPractice(shortcut)}
              className={`w-full py-2 rounded-lg font-semibold text-sm ${colors.badge} text-white hover:opacity-90 transition-opacity`}
            >
              🎮 Jetzt üben
            </button>
          )}
        </div>
      )}
    </div>
  );
}
