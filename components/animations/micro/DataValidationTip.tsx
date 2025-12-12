"use client";

import { useEffect, useState } from "react";

export function DataValidationTip() {
  const [phase, setPhase] = useState<"start" | "show-basic" | "show-advanced" | "compare">("start");

  useEffect(() => {
    const timeline = [
      { delay: 0, action: () => setPhase("start") },
      { delay: 2000, action: () => setPhase("show-basic") },
      { delay: 5000, action: () => setPhase("show-advanced") },
      { delay: 9000, action: () => setPhase("compare") },
      { delay: 12000, action: () => setPhase("start") },
    ];

    const timeouts = timeline.map(({ delay, action }) => setTimeout(action, delay));
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full h-80 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg flex items-center justify-center p-6">
      <div className="space-y-4 w-full max-w-3xl">
        <div className="text-center">
          <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400">
            💡 Pro-Tipp: Dropdown-Listen nutzen!
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Die einfachste Art, Fehler zu vermeiden
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Basic Text Input */}
          <div
            className={`bg-white dark:bg-slate-800 rounded-lg p-4 border-2 transition-all ${
              phase === "show-basic" || phase === "compare"
                ? "border-amber-300 dark:border-amber-700"
                : "border-slate-200 dark:border-slate-700"
            }`}
          >
            <div className="text-xs font-semibold mb-2 text-slate-600 dark:text-slate-400">
              Freie Texteingabe:
            </div>
            <input
              type="text"
              placeholder="Status eingeben..."
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded text-sm dark:bg-slate-700"
              readOnly
            />
            <div className="mt-3 space-y-1 text-xs text-slate-500 dark:text-slate-400">
              <p>❌ Tippfehler möglich</p>
              <p>❌ Inkonsistente Werte</p>
              <p>❌ "Offen", "offen", "OFFEN"?</p>
            </div>
          </div>

          {/* Dropdown */}
          <div
            className={`bg-white dark:bg-slate-800 rounded-lg p-4 border-2 transition-all ${
              phase === "show-advanced" || phase === "compare"
                ? "border-green-500 scale-105"
                : "border-slate-200 dark:border-slate-700"
            }`}
          >
            <div className="text-xs font-semibold mb-2 text-green-600 dark:text-green-400">
              Dropdown-Liste:
            </div>
            <select
              className="w-full px-3 py-2 border border-green-500 rounded text-sm bg-green-50 dark:bg-green-950 dark:border-green-600"
              defaultValue="offen"
            >
              <option value="offen">Offen</option>
              <option value="inBearbeitung">In Bearbeitung</option>
              <option value="erledigt">Erledigt</option>
            </select>
            <div className="mt-3 space-y-1 text-xs text-green-600 dark:text-green-400">
              <p>✓ Keine Tippfehler</p>
              <p>✓ Immer konsistent</p>
              <p>✓ Nur gültige Werte</p>
            </div>
          </div>
        </div>

        {phase === "show-advanced" && (
          <div className="bg-green-50 dark:bg-green-950 border border-green-300 dark:border-green-700 rounded-lg p-3 animate-in fade-in">
            <p className="text-sm text-green-800 dark:text-green-200">
              <strong>So geht's:</strong> Daten → Datenüberprüfung → Liste → Quelle eingeben
            </p>
          </div>
        )}

        {phase === "compare" && (
          <div className="bg-purple-50 dark:bg-purple-950 border border-purple-300 dark:border-purple-700 rounded-lg p-4 animate-in slide-in-from-bottom">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-purple-600 dark:text-purple-400">⭐</span>
                <p className="text-sm text-purple-800 dark:text-purple-200 font-semibold">
                  Weitere Dropdown-Vorteile:
                </p>
              </div>
              <ul className="text-xs text-purple-700 dark:text-purple-300 space-y-1 ml-6">
                <li>• <strong>Schnellere Eingabe:</strong> Klicken statt Tippen</li>
                <li>• <strong>Bessere UX:</strong> User sehen alle Optionen</li>
                <li>• <strong>Daten-Qualität:</strong> Keine wilden Eingaben</li>
                <li>• <strong>Dynamisch:</strong> Liste aus Zellbereich möglich</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
