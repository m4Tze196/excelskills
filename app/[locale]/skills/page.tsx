"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useState } from "react";
import {
  SkillPreviewCard,
  VLookupIcon,
  PivotTableIcon,
  ConditionalFormattingIcon,
  IndexMatchIcon,
  ChartsIcon,
  SumIfIcon,
  DataValidationIcon,
  MacrosIcon,
  PowerQueryIcon,
} from "@/components/animations/SkillPreviewCard";

export default function SkillsPage() {
  const t = useTranslations("skills");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

  const skills = [
    {
      id: "vlookup",
      icon: <VLookupIcon />,
      color: "primary" as const,
      level: "intermediate",
      category: "formulas",
    },
    {
      id: "pivotTables",
      icon: <PivotTableIcon />,
      color: "secondary" as const,
      level: "intermediate",
      category: "dataAnalysis",
    },
    {
      id: "conditionalFormatting",
      icon: <ConditionalFormattingIcon />,
      color: "success" as const,
      level: "beginner",
      category: "formatting",
    },
    {
      id: "indexMatch",
      icon: <IndexMatchIcon />,
      color: "info" as const,
      level: "advanced",
      category: "formulas",
    },
    {
      id: "powerQuery",
      icon: <PowerQueryIcon />,
      color: "warning" as const,
      level: "advanced",
      category: "dataAnalysis",
    },
    {
      id: "charts",
      icon: <ChartsIcon />,
      color: "info" as const,
      level: "intermediate",
      category: "visualization",
    },
    {
      id: "sumif",
      icon: <SumIfIcon />,
      color: "primary" as const,
      level: "beginner",
      category: "formulas",
    },
    {
      id: "dataValidation",
      icon: <DataValidationIcon />,
      color: "secondary" as const,
      level: "intermediate",
      category: "dataManagement",
    },
    {
      id: "macros",
      icon: <MacrosIcon />,
      color: "danger" as const,
      level: "advanced",
      category: "automation",
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

  const levels = ["all", "beginner", "intermediate", "advanced"];

  const filteredSkills = skills.filter((skill) => {
    const categoryMatch = selectedCategory === "all" || skill.category === selectedCategory;
    const levelMatch = selectedLevel === "all" || skill.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {t("title")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            {t("description")}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-card rounded-lg border border-border p-6 space-y-4">
            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                {t("category")}
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {category === "all" ? t("all") : t(`categories.${category}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Level Filter */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                {t("difficulty")}
              </label>
              <div className="flex flex-wrap gap-2">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedLevel === level
                        ? "bg-secondary text-secondary-foreground shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {level === "all" ? t("all") : t(`levels.${level}`)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill) => (
              <Link key={skill.id} href={`/skills/${skill.id}`}>
                <SkillPreviewCard
                  icon={skill.icon}
                  title={t(`items.${skill.id}.title`)}
                  description={t(`items.${skill.id}.description`)}
                  category={t(`items.${skill.id}.category`)}
                  level={t(`levels.${skill.level}`)}
                  color={skill.color}
                />
              </Link>
            ))}
          </div>

          {filteredSkills.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Keine Skills gefunden. Versuche andere Filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-12 text-center border border-border">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("cta.description")}
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg"
          >
            {t("cta.button")}
          </Link>
        </div>
      </section>
    </div>
  );
}
