"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";

interface Shortcut {
  keys: string;
  description: string;
  category: string;
}

export default function ShortcutsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Excel shortcuts organized by category
  const shortcuts: Shortcut[] = [
    // Navigation
    { keys: "Ctrl + Home", description: "Go to beginning of worksheet", category: "navigation" },
    { keys: "Ctrl + End", description: "Go to last used cell", category: "navigation" },
    { keys: "Ctrl + Arrow Key", description: "Jump to edge of data region", category: "navigation" },
    { keys: "Ctrl + Page Up/Down", description: "Switch between worksheets", category: "navigation" },
    { keys: "F5 or Ctrl + G", description: "Go to specific cell (Go To dialog)", category: "navigation" },

    // Selection
    { keys: "Ctrl + Space", description: "Select entire column", category: "selection" },
    { keys: "Shift + Space", description: "Select entire row", category: "selection" },
    { keys: "Ctrl + A", description: "Select all cells", category: "selection" },
    { keys: "Shift + Arrow Key", description: "Extend selection", category: "selection" },
    { keys: "Ctrl + Shift + Arrow", description: "Extend selection to edge of data", category: "selection" },

    // Editing
    { keys: "F2", description: "Edit active cell", category: "editing" },
    { keys: "Ctrl + C", description: "Copy", category: "editing" },
    { keys: "Ctrl + X", description: "Cut", category: "editing" },
    { keys: "Ctrl + V", description: "Paste", category: "editing" },
    { keys: "Ctrl + Z", description: "Undo", category: "editing" },
    { keys: "Ctrl + Y", description: "Redo", category: "editing" },
    { keys: "Ctrl + D", description: "Fill down", category: "editing" },
    { keys: "Ctrl + R", description: "Fill right", category: "editing" },
    { keys: "Delete", description: "Delete cell contents", category: "editing" },
    { keys: "Ctrl + -", description: "Delete cells/rows/columns", category: "editing" },
    { keys: "Ctrl + +", description: "Insert cells/rows/columns", category: "editing" },

    // Formatting
    { keys: "Ctrl + B", description: "Bold", category: "formatting" },
    { keys: "Ctrl + I", description: "Italic", category: "formatting" },
    { keys: "Ctrl + U", description: "Underline", category: "formatting" },
    { keys: "Ctrl + 1", description: "Format Cells dialog", category: "formatting" },
    { keys: "Ctrl + Shift + $", description: "Apply currency format", category: "formatting" },
    { keys: "Ctrl + Shift + %", description: "Apply percentage format", category: "formatting" },
    { keys: "Ctrl + Shift + #", description: "Apply date format", category: "formatting" },
    { keys: "Alt + H + H", description: "Fill cell color", category: "formatting" },

    // Formulas
    { keys: "=", description: "Start a formula", category: "formulas" },
    { keys: "F4", description: "Toggle absolute/relative references", category: "formulas" },
    { keys: "Ctrl + `", description: "Show formulas", category: "formulas" },
    { keys: "Ctrl + Shift + Enter", description: "Enter array formula", category: "formulas" },
    { keys: "Alt + =", description: "AutoSum", category: "formulas" },
    { keys: "Shift + F3", description: "Insert function", category: "formulas" },

    // Workbook
    { keys: "Ctrl + N", description: "New workbook", category: "workbook" },
    { keys: "Ctrl + O", description: "Open workbook", category: "workbook" },
    { keys: "Ctrl + S", description: "Save workbook", category: "workbook" },
    { keys: "Ctrl + W", description: "Close workbook", category: "workbook" },
    { keys: "Ctrl + P", description: "Print", category: "workbook" },
    { keys: "Ctrl + F", description: "Find", category: "workbook" },
    { keys: "Ctrl + H", description: "Replace", category: "workbook" },

    // Data
    { keys: "Ctrl + T", description: "Create table", category: "data" },
    { keys: "Ctrl + Shift + L", description: "Toggle autofilter", category: "data" },
    { keys: "Alt + A + S + S", description: "Sort A to Z", category: "data" },
    { keys: "Alt + Down Arrow", description: "Open filter dropdown", category: "data" },

    // View
    { keys: "Ctrl + 9", description: "Hide selected rows", category: "view" },
    { keys: "Ctrl + Shift + 9", description: "Unhide rows", category: "view" },
    { keys: "Ctrl + 0", description: "Hide selected columns", category: "view" },
    { keys: "Ctrl + Shift + 0", description: "Unhide columns", category: "view" },
    { keys: "Alt + W + F + F", description: "Freeze panes", category: "view" },
  ];

  const categories = [
    { id: "all", name: "All Shortcuts", icon: "🔑" },
    { id: "navigation", name: "Navigation", icon: "🧭" },
    { id: "selection", name: "Selection", icon: "🎯" },
    { id: "editing", name: "Editing", icon: "✏️" },
    { id: "formatting", name: "Formatting", icon: "🎨" },
    { id: "formulas", name: "Formulas", icon: "📐" },
    { id: "workbook", name: "Workbook", icon: "📚" },
    { id: "data", name: "Data", icon: "📊" },
    { id: "view", name: "View", icon: "👁️" },
  ];

  // Filter shortcuts
  const filteredShortcuts = shortcuts.filter((shortcut) => {
    const categoryMatch =
      selectedCategory === "all" || shortcut.category === selectedCategory;
    const searchMatch =
      searchQuery === "" ||
      shortcut.keys.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shortcut.description.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <section className="border-b border-border/40 bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Shortcuts</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Excel Keyboard Shortcuts
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Master Excel faster with these essential keyboard shortcuts. Save time and boost your productivity.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mt-8">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search shortcuts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="container mx-auto px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card border border-border hover:bg-muted"
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
                <span className="text-xs opacity-70">
                  ({shortcuts.filter(s => category.id === "all" || s.category === category.id).length})
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Shortcuts List */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          {filteredShortcuts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No shortcuts found matching your search.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredShortcuts.map((shortcut, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg p-4 border border-border hover:border-primary/50 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <kbd className="px-3 py-1.5 bg-muted rounded-md font-mono text-sm font-semibold border-2 border-border shadow-sm group-hover:border-primary/50 transition-colors">
                        {shortcut.keys}
                      </kbd>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground">
                        {shortcut.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tips Section */}
      <section className="border-t border-border/40 bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Pro Tips
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="text-3xl mb-3">💡</div>
                <h3 className="font-semibold mb-2">Practice Makes Perfect</h3>
                <p className="text-sm text-muted-foreground">
                  Try to use keyboard shortcuts instead of mouse clicks. Start with 2-3 shortcuts and gradually add more to your workflow.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="text-3xl mb-3">⌨️</div>
                <h3 className="font-semibold mb-2">Customize Your Shortcuts</h3>
                <p className="text-sm text-muted-foreground">
                  Excel allows you to create custom keyboard shortcuts for frequently used commands via Quick Access Toolbar.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-semibold mb-2">Focus on Your Workflow</h3>
                <p className="text-sm text-muted-foreground">
                  Learn shortcuts for tasks you do most often. Don't try to memorize everything at once.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="text-3xl mb-3">📋</div>
                <h3 className="font-semibold mb-2">Print This Page</h3>
                <p className="text-sm text-muted-foreground">
                  Keep a printed reference nearby until shortcuts become muscle memory. Practice daily for best results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/40 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8 md:p-12 text-center border-2 border-primary/20">
            <div className="text-5xl mb-4">💬</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Want to learn more Excel tips?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-lg">
              Our AI Assistant can help you with formulas, functions, and Excel best practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/chat"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg gap-2"
              >
                Ask AI Assistant
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/skills"
                className="inline-flex items-center justify-center rounded-lg border-2 border-primary bg-background px-8 py-4 text-lg font-semibold hover:bg-muted transition-colors"
              >
                Browse Skills
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
