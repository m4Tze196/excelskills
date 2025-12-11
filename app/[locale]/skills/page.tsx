"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function SkillsPage() {
  const t = useTranslations("skills");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Skills data structure with metadata
  const skills = [
    {
      id: "vlookup",
      category: "formulas",
      difficulty: "intermediate",
      icon: "🔍",
    },
    {
      id: "pivotTables",
      category: "dataAnalysis",
      difficulty: "intermediate",
      icon: "📊",
    },
    {
      id: "conditionalFormatting",
      category: "formatting",
      difficulty: "beginner",
      icon: "🎨",
    },
    {
      id: "indexMatch",
      category: "formulas",
      difficulty: "advanced",
      icon: "🎯",
    },
    {
      id: "powerQuery",
      category: "dataAnalysis",
      difficulty: "advanced",
      icon: "⚡",
    },
    {
      id: "charts",
      category: "visualization",
      difficulty: "beginner",
      icon: "📈",
    },
    {
      id: "sumif",
      category: "formulas",
      difficulty: "beginner",
      icon: "➕",
    },
    {
      id: "dataValidation",
      category: "dataManagement",
      difficulty: "intermediate",
      icon: "✅",
    },
    {
      id: "macros",
      category: "automation",
      difficulty: "advanced",
      icon: "🤖",
    },
  ];

  const categories = [
    "all",
    "formulas",
    "dataAnalysis",
    "formatting",
    "visualization",
    "dataManagement",
    "automation",
  ];

  const difficulties = ["all", "beginner", "intermediate", "advanced"];

  // Filter skills based on selections
  const filteredSkills = skills.filter((skill) => {
    const categoryMatch =
      selectedCategory === "all" || skill.category === selectedCategory;
    const difficultyMatch =
      selectedDifficulty === "all" || skill.difficulty === selectedDifficulty;
    const searchMatch =
      searchQuery === "" ||
      t(`items.${skill.id}.title`)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      t(`items.${skill.id}.description`)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return categoryMatch && difficultyMatch && searchMatch;
  });

  // Get difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "intermediate":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "advanced":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

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
            <span className="text-foreground font-medium">{t("title")}</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("title")}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-5xl mx-auto mt-12 space-y-4">
          {/* Search Bar */}
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
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Filters */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                {t("category")}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? t("all") : t(`categories.${cat}`)}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                {t("difficulty")}
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {difficulties.map((diff) => (
                  <option key={diff} value={diff}>
                    {diff === "all" ? t("all") : t(`levels.${diff}`)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          {filteredSkills.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No skills found matching your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSkills.map((skill) => (
                <Link
                  key={skill.id}
                  href={`/skills/${skill.id}`}
                  className="group bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  {/* Icon */}
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {skill.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {t(`items.${skill.id}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {t(`items.${skill.id}.description`)}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(
                        skill.difficulty
                      )}`}
                    >
                      {t(`levels.${skill.difficulty}`)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {t(`categories.${skill.category}`)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/40 bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t("cta.title")}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t("cta.description")}
            </p>
            <Link
              href="/chat"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg"
            >
              {t("cta.button")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
