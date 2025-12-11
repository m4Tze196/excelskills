"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useParams } from "next/navigation";

export default function SkillDetailPage() {
  const t = useTranslations("skills");
  const params = useParams();
  const slug = params.slug as string;

  // Skills metadata
  const skillsMetadata: Record<string, { category: string; difficulty: string; icon: string }> = {
    vlookup: { category: "formulas", difficulty: "intermediate", icon: "🔍" },
    pivotTables: { category: "dataAnalysis", difficulty: "intermediate", icon: "📊" },
    conditionalFormatting: { category: "formatting", difficulty: "beginner", icon: "🎨" },
    indexMatch: { category: "formulas", difficulty: "advanced", icon: "🎯" },
    powerQuery: { category: "dataAnalysis", difficulty: "advanced", icon: "⚡" },
    charts: { category: "visualization", difficulty: "beginner", icon: "📈" },
    sumif: { category: "formulas", difficulty: "beginner", icon: "➕" },
    dataValidation: { category: "dataManagement", difficulty: "intermediate", icon: "✅" },
    macros: { category: "automation", difficulty: "advanced", icon: "🤖" },
  };

  const skill = skillsMetadata[slug];

  if (!skill) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Skill Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The skill you're looking for doesn't exist.
        </p>
        <Link
          href="/skills"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Back to Skills
        </Link>
      </div>
    );
  }

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
            <Link href="/skills" className="hover:text-foreground transition-colors">
              Skills
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">
              {t(`items.${slug}.title`)}
            </span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="text-6xl">{skill.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span
                  className={`text-sm px-3 py-1 rounded-full font-medium ${getDifficultyColor(
                    skill.difficulty
                  )}`}
                >
                  {t(`levels.${skill.difficulty}`)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {t(`categories.${skill.category}`)}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t(`items.${slug}.title`)}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t(`items.${slug}.description`)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-xl border border-border p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">About This Skill</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                This is a placeholder for detailed information about{" "}
                {t(`items.${slug}.title`)}. In the full implementation, this section
                would include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Comprehensive explanation of the skill</li>
                <li>Step-by-step tutorials and examples</li>
                <li>Common use cases and best practices</li>
                <li>Tips and tricks from Excel experts</li>
                <li>Video tutorials and interactive exercises</li>
              </ul>
            </div>
          </div>

          {/* Related Skills */}
          <div className="bg-card rounded-xl border border-border p-8">
            <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Master the fundamentals",
                "Apply to real-world scenarios",
                "Troubleshoot common issues",
                "Optimize for performance",
                "Learn advanced techniques",
                "Build practical examples",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/40 bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8 md:p-12 text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Need Help Learning This Skill?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our AI assistant can provide personalized guidance, answer your
                questions, and help you master {t(`items.${slug}.title`)}.
              </p>
              <Link
                href="/chat"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg"
              >
                Ask AI Assistant
              </Link>
            </div>

            <div className="text-center">
              <Link
                href="/skills"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 19l-7-7 7-7" />
                </svg>
                Back to All Skills
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
