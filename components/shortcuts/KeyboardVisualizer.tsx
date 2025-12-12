"use client";

import { useEffect, useState } from "react";
import type { Shortcut } from "@/lib/shortcuts-data";

interface KeyboardVisualizerProps {
  shortcut: Shortcut;
  autoPlay?: boolean;
}

export function KeyboardVisualizer({ shortcut, autoPlay = true }: KeyboardVisualizerProps) {
  const [phase, setPhase] = useState<"idle" | "pressing" | "success" | "complete">("idle");
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  useEffect(() => {
    if (!autoPlay) return;

    const timeline = [
      { delay: 0, action: () => { setPhase("idle"); setActiveKeys([]); } },
      { delay: 500, action: () => { setPhase("pressing"); setActiveKeys(shortcut.keys); } },
      { delay: 2000, action: () => setPhase("success") },
      { delay: 3500, action: () => setPhase("complete") },
      { delay: 5000, action: () => { setPhase("idle"); setActiveKeys([]); } },
    ];

    const timeouts = timeline.map(({ delay, action }) => setTimeout(action, delay));
    return () => timeouts.forEach(clearTimeout);
  }, [shortcut, autoPlay]);

  const isKeyActive = (key: string) => {
    return activeKeys.some((k) => k.toLowerCase() === key.toLowerCase() || k === key);
  };

  const getKeyColor = (key: string) => {
    if (!isKeyActive(key)) return "fill-slate-200 dark:fill-slate-700";

    switch (shortcut.category) {
      case "essential":
        return "fill-blue-500 dark:fill-blue-600";
      case "power":
        return "fill-purple-500 dark:fill-purple-600";
      case "ninja":
        return "fill-amber-500 dark:fill-amber-600";
      default:
        return "fill-slate-400 dark:fill-slate-600";
    }
  };

  const getKeyStroke = (key: string) => {
    return phase === "pressing" && isKeyActive(key) ? "translate(0, 4)" : "translate(0, 0)";
  };

  const getKeyGlow = (key: string) => {
    if (!isKeyActive(key) || phase !== "pressing") return "none";

    switch (shortcut.category) {
      case "essential":
        return "0 0 20px rgba(59, 130, 246, 0.8)";
      case "power":
        return "0 0 20px rgba(168, 85, 247, 0.8)";
      case "ninja":
        return "0 0 20px rgba(245, 158, 11, 0.8)";
      default:
        return "none";
    }
  };

  // Render simplified keyboard key
  const Key = ({ x, y, width = 50, label, keyCode }: { x: number; y: number; width?: number; label: string; keyCode: string }) => (
    <g transform={getKeyStroke(keyCode)} style={{ transition: "transform 0.1s ease-out" }}>
      <rect
        x={x}
        y={y}
        width={width}
        height={50}
        rx={6}
        className={`${getKeyColor(keyCode)} transition-all duration-300`}
        style={{
          filter: getKeyGlow(keyCode),
          strokeWidth: isKeyActive(keyCode) ? 3 : 1,
        }}
        stroke={isKeyActive(keyCode) ? "currentColor" : "#94a3b8"}
      />
      <text
        x={x + width / 2}
        y={y + 32}
        textAnchor="middle"
        className={`text-sm font-bold transition-colors ${
          isKeyActive(keyCode)
            ? "fill-white"
            : "fill-slate-700 dark:fill-slate-300"
        }`}
      >
        {label}
      </text>
    </g>
  );

  return (
    <div className="relative w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg p-6">
      <div className="space-y-4">
        {/* Title */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-2xl">{shortcut.icon}</span>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              {shortcut.title}
            </h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {shortcut.description}
          </p>
        </div>

        {/* Keyboard SVG */}
        <div className="flex justify-center">
          <svg
            width="400"
            height="200"
            viewBox="0 0 400 200"
            className="max-w-full h-auto"
          >
            {/* Modifier Keys Row */}
            <Key x={10} y={10} width={80} label="Strg" keyCode="Control" />
            <Key x={100} y={10} width={80} label="Shift" keyCode="Shift" />
            <Key x={190} y={10} width={80} label="Alt" keyCode="Alt" />

            {/* Letter/Number Keys Row */}
            <Key x={10} y={70} label="C" keyCode="C" />
            <Key x={70} y={70} label="V" keyCode="V" />
            <Key x={130} y={70} label="X" keyCode="X" />
            <Key x={190} y={70} label="Z" keyCode="Z" />
            <Key x={250} y={70} label="S" keyCode="S" />
            <Key x={310} y={70} label="1" keyCode="1" />

            {/* Special Keys Row */}
            <Key x={10} y={130} width={60} label="F2" keyCode="F2" />
            <Key x={80} y={130} width={60} label="F4" keyCode="F4" />
            <Key x={150} y={130} width={60} label="+" keyCode="+" />
            <Key x={220} y={130} width={80} label="Enter" keyCode="Enter" />
            <Key x={310} y={130} width={80} label="→" keyCode="Arrow" />
          </svg>
        </div>

        {/* Key Combination Display */}
        <div className="flex justify-center items-center gap-2">
          {shortcut.keysDisplay.map((key, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className={`px-4 py-2 rounded-lg border-2 font-bold transition-all ${
                  phase === "pressing"
                    ? shortcut.category === "essential"
                      ? "bg-blue-500 border-blue-600 text-white scale-110"
                      : shortcut.category === "power"
                      ? "bg-purple-500 border-purple-600 text-white scale-110"
                      : "bg-amber-500 border-amber-600 text-white scale-110"
                    : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                }`}
              >
                {key}
              </div>
              {index < shortcut.keysDisplay.length - 1 && (
                <span className="text-2xl font-bold text-slate-400">+</span>
              )}
            </div>
          ))}
        </div>

        {/* Success Feedback */}
        {(phase === "success" || phase === "complete") && (
          <div className="animate-in fade-in slide-in-from-bottom duration-500">
            <div
              className={`p-4 rounded-lg border-2 ${
                shortcut.category === "essential"
                  ? "bg-blue-50 dark:bg-blue-950 border-blue-500"
                  : shortcut.category === "power"
                  ? "bg-purple-50 dark:bg-purple-950 border-purple-500"
                  : "bg-amber-50 dark:bg-amber-950 border-amber-500"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">✓</span>
                <div>
                  <p
                    className={`font-semibold ${
                      shortcut.category === "essential"
                        ? "text-blue-800 dark:text-blue-200"
                        : shortcut.category === "power"
                        ? "text-purple-800 dark:text-purple-200"
                        : "text-amber-800 dark:text-amber-200"
                    }`}
                  >
                    {shortcut.useCase}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    ⏱️ Zeitersparnis: {shortcut.timeSaved.perUse}s pro Nutzung
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pro Tip */}
        {shortcut.proTip && phase === "complete" && (
          <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg p-3 animate-in fade-in">
            <p className="text-xs text-slate-700 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-slate-100">💡 Pro-Tipp:</strong>{" "}
              {shortcut.proTip}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
