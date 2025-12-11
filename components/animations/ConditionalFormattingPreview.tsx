"use client";

import { useEffect, useState } from "react";

export function ConditionalFormattingPreview() {
  const [currentValue, setCurrentValue] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setCurrentValue((prev) => {
        if (prev >= 4) return 1;
        return prev + 1;
      });

      setTimeout(() => setIsAnimating(false), 300);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const shouldHighlight = currentValue > 2;

  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-4 grid-rows-4 h-full w-full">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border border-slate-300 dark:border-slate-700" />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        {/* Title */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Bedingte Formatierung
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Zelle wird grün wenn Wert &gt; 2
          </p>
        </div>

        {/* Excel Cell Visualization */}
        <div className="flex flex-col items-center space-y-4">
          {/* Cell Header */}
          <div className="flex items-center space-x-2">
            <div className="w-12 h-8 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-600 dark:text-slate-300 rounded-t border-t border-x border-slate-300 dark:border-slate-600">
              A
            </div>
          </div>

          {/* The Animated Cell */}
          <div
            className={`
              relative w-32 h-32 flex items-center justify-center text-4xl font-bold
              border-2 rounded-lg shadow-lg
              transition-all duration-500 ease-in-out
              ${isAnimating ? "scale-110" : "scale-100"}
              ${
                shouldHighlight
                  ? "bg-green-100 dark:bg-green-900 border-green-500 text-green-700 dark:text-green-200"
                  : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200"
              }
            `}
          >
            {/* Cell coordinate label */}
            <div className="absolute -top-3 -left-3 bg-slate-200 dark:bg-slate-700 text-xs px-2 py-0.5 rounded text-slate-600 dark:text-slate-300 font-mono">
              A1
            </div>

            {/* Value */}
            <span className={`transition-all duration-300 ${isAnimating ? "scale-125" : "scale-100"}`}>
              {currentValue}
            </span>

            {/* Check mark when highlighted */}
            {shouldHighlight && (
              <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1.5 animate-bounce">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>

          {/* Formula Display */}
          <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600">
            <code className="text-xs font-mono text-slate-700 dark:text-slate-300">
              =IF(A1&gt;2, "✓ Grün", "Standard")
            </code>
          </div>
        </div>

        {/* Value Indicator */}
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-slate-600 dark:text-slate-400">Aktueller Wert:</span>
          <span className={`font-bold px-3 py-1 rounded ${
            shouldHighlight
              ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
              : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
          }`}>
            {currentValue}
          </span>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-4 right-4 opacity-20">
        <svg
          className="w-16 h-16 text-slate-400 dark:text-slate-600"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
    </div>
  );
}
