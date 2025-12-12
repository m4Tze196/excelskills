"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { shortcuts, getShortcutsByCategory, calculateTotalTimeSaved } from "@/lib/shortcuts-data";
import { KeyboardVisualizer } from "@/components/shortcuts/KeyboardVisualizer";
import { ShortcutCard } from "@/components/shortcuts/ShortcutCard";
import { TimeSavedCalculator } from "@/components/shortcuts/TimeSavedCalculator";
import type { Shortcut } from "@/lib/shortcuts-data";

export default function ShortcutsPage() {
  const [activeCategory, setActiveCategory] = useState<Shortcut["category"] | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const totalTimeSaved = calculateTotalTimeSaved();

  const filteredShortcuts = shortcuts.filter((shortcut) => {
    const matchesCategory = activeCategory === "all" || shortcut.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      shortcut.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shortcut.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shortcut.useCase.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const essentialShortcuts = getShortcutsByCategory("essential");
  const powerShortcuts = getShortcutsByCategory("power");
  const ninjaShortcuts = getShortcutsByCategory("ninja");

  // Featured shortcut for hero visualization
  const featuredShortcut = shortcuts.find((s) => s.id === "copy") || shortcuts[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-100 font-semibold">Shortcuts</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            ⌨️ Excel Shortcuts Meistern
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-6">
            Spare bis zu <strong className="text-emerald-600 dark:text-emerald-400">{totalTimeSaved.toFixed(0)} Stunden pro Woche</strong> durch die 20 wichtigsten Excel-Tastenkombinationen
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <span className="text-2xl">⚡</span>
              <span>Schneller arbeiten</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <span className="text-2xl">🎯</span>
              <span>Produktiver werden</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <span className="text-2xl">🚀</span>
              <span>Profi-Niveau erreichen</span>
            </div>
          </div>
        </div>

        {/* Featured Keyboard Visualizer */}
        <div className="max-w-2xl mx-auto">
          <KeyboardVisualizer shortcut={featuredShortcut} />
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-50 dark:bg-blue-950/50 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {essentialShortcuts.length}
            </div>
            <div className="text-sm text-slate-700 dark:text-slate-300 font-semibold mb-1">
              Essential Shortcuts
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Die Basics, die jeder kennen sollte
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-950/50 border-2 border-purple-200 dark:border-purple-800 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {powerShortcuts.length}
            </div>
            <div className="text-sm text-slate-700 dark:text-slate-300 font-semibold mb-1">
              Power User Shortcuts
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Für fortgeschrittene Anwender
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/50 border-2 border-amber-200 dark:border-amber-800 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">
              {ninjaShortcuts.length}
            </div>
            <div className="text-sm text-slate-700 dark:text-slate-300 font-semibold mb-1">
              Ninja Level Shortcuts
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Für absolute Profis
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Shortcuts durchsuchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg text-sm dark:bg-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeCategory === "all"
                  ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 scale-105 shadow-lg"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
              }`}
            >
              Alle ({shortcuts.length})
            </button>
            <button
              onClick={() => setActiveCategory("essential")}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeCategory === "essential"
                  ? "bg-blue-600 text-white scale-105 shadow-lg"
                  : "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50"
              }`}
            >
              Essential ({essentialShortcuts.length})
            </button>
            <button
              onClick={() => setActiveCategory("power")}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeCategory === "power"
                  ? "bg-purple-600 text-white scale-105 shadow-lg"
                  : "bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50"
              }`}
            >
              Power User ({powerShortcuts.length})
            </button>
            <button
              onClick={() => setActiveCategory("ninja")}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeCategory === "ninja"
                  ? "bg-amber-600 text-white scale-105 shadow-lg"
                  : "bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50"
              }`}
            >
              Ninja Level ({ninjaShortcuts.length})
            </button>
          </div>

          {/* Results Count */}
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            {filteredShortcuts.length} {filteredShortcuts.length === 1 ? "Shortcut" : "Shortcuts"} gefunden
          </div>

          {/* Shortcuts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShortcuts.map((shortcut) => (
              <ShortcutCard key={shortcut.id} shortcut={shortcut} />
            ))}
          </div>

          {/* No Results */}
          {filteredShortcuts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Keine Shortcuts gefunden
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
                Versuche es mit einem anderen Suchbegriff oder einer anderen Kategorie
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Time Saved Calculator Section */}
      <section className="container mx-auto px-4 py-12">
        <TimeSavedCalculator />
      </section>

      {/* Learning Path Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 text-center">
            🎯 Empfohlener Lernpfad
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Week 1 */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">1️⃣</span>
                <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  Woche 1: Basics
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Starte mit den 5 Essential Shortcuts
              </p>
              <ul className="space-y-2 text-sm">
                {essentialShortcuts.slice(0, 5).map((s) => (
                  <li key={s.id} className="flex items-center gap-2">
                    <span>{s.icon}</span>
                    <span className="text-slate-700 dark:text-slate-300">{s.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Week 2-3 */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">2️⃣</span>
                <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  Woche 2-3: Power User
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Erweitere deine Skills mit Power Shortcuts
              </p>
              <ul className="space-y-2 text-sm">
                {powerShortcuts.slice(0, 4).map((s) => (
                  <li key={s.id} className="flex items-center gap-2">
                    <span>{s.icon}</span>
                    <span className="text-slate-700 dark:text-slate-300">{s.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Week 4+ */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">3️⃣</span>
                <h3 className="text-lg font-bold text-amber-600 dark:text-amber-400">
                  Woche 4+: Ninja Level
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Werde zum Excel-Ninja
              </p>
              <ul className="space-y-2 text-sm">
                {ninjaShortcuts.slice(0, 4).map((s) => (
                  <li key={s.id} className="flex items-center gap-2">
                    <span>{s.icon}</span>
                    <span className="text-slate-700 dark:text-slate-300">{s.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pro Tips Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 text-center">
            💡 Pro-Tipps zum Lernen
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
              <h3 className="font-bold text-lg text-amber-600 dark:text-amber-400 mb-3">
                1. Muscle Memory entwickeln
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Übe jeden Shortcut mindestens 20x, bis er zur zweiten Natur wird.
                Deine Finger müssen die Bewegung automatisch ausführen.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
              <h3 className="font-bold text-lg text-amber-600 dark:text-amber-400 mb-3">
                2. Nicht alles auf einmal
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Lerne maximal 3-5 neue Shortcuts pro Woche. Qualität vor Quantität!
                Beherrsche die Basics, bevor du zu Advanced-Shortcuts übergehst.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
              <h3 className="font-bold text-lg text-amber-600 dark:text-amber-400 mb-3">
                3. Maus weglegen
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Zwinge dich bewusst, die Maus nicht zu nutzen. Am Anfang bist du langsamer,
                aber nach 2-3 Tagen wirst du deutlich schneller sein.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
              <h3 className="font-bold text-lg text-amber-600 dark:text-amber-400 mb-3">
                4. Spickzettel erstellen
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Drucke dir eine Übersicht aus und klebe sie neben deinen Monitor.
                Nach 2-3 Wochen wirst du sie nicht mehr brauchen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12 mb-12">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Bereit, deine Excel-Skills auf das nächste Level zu heben?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Lerne nicht nur Shortcuts, sondern auch die wichtigsten Excel-Funktionen
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/skills"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              📚 Zu den Skills
            </Link>
            <Link
              href="/chat"
              className="px-6 py-3 bg-blue-700 hover:bg-blue-800 border-2 border-white rounded-lg font-semibold transition-colors"
            >
              💬 Mit AI-Coach üben
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
