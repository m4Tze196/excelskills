"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function CoursesPage() {
  const t = useTranslations("courses");

  // Courses data structure with metadata
  const courses = [
    {
      id: "fundamentals",
      level: "beginner",
      duration: 8,
      lessons: 24,
      price: "Free",
      badge: "popular",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "formulas",
      level: "intermediate",
      duration: 12,
      lessons: 36,
      price: "$49",
      badge: "popular",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "dataAnalysis",
      level: "intermediate",
      duration: 10,
      lessons: 30,
      price: "$59",
      badge: null,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "powerQuery",
      level: "advanced",
      duration: 15,
      lessons: 40,
      price: "$79",
      badge: "new",
      color: "from-orange-500 to-red-500",
    },
    {
      id: "dashboard",
      level: "advanced",
      duration: 14,
      lessons: 38,
      price: "$69",
      badge: null,
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: "vba",
      level: "advanced",
      duration: 20,
      lessons: 50,
      price: "$99",
      badge: "new",
      color: "from-rose-500 to-pink-500",
    },
  ];

  const [selectedLevel, setSelectedLevel] = useState("all");

  // Filter courses based on level
  const filteredCourses = courses.filter(
    (course) => selectedLevel === "all" || course.level === selectedLevel
  );

  // Get badge styles
  const getBadgeStyles = (badge: string | null) => {
    if (!badge) return null;

    switch (badge) {
      case "popular":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "new":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      default:
        return null;
    }
  };

  // Get level badge color
  const getLevelColor = (level: string) => {
    switch (level) {
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

        {/* Stats */}
        <div className="max-w-4xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-card rounded-lg border border-border">
            <div className="text-3xl font-bold text-primary">{courses.length}</div>
            <div className="text-sm text-muted-foreground">{t("stats.courses")}</div>
          </div>
          <div className="text-center p-4 bg-card rounded-lg border border-border">
            <div className="text-3xl font-bold text-primary">
              {courses.reduce((sum, c) => sum + c.lessons, 0)}
            </div>
            <div className="text-sm text-muted-foreground">{t("stats.lessons")}</div>
          </div>
          <div className="text-center p-4 bg-card rounded-lg border border-border">
            <div className="text-3xl font-bold text-primary">10k+</div>
            <div className="text-sm text-muted-foreground">{t("stats.students")}</div>
          </div>
          <div className="text-center p-4 bg-card rounded-lg border border-border">
            <div className="text-3xl font-bold text-primary">
              {courses.reduce((sum, c) => sum + c.duration, 0)}h
            </div>
            <div className="text-sm text-muted-foreground">{t("stats.content")}</div>
          </div>
        </div>

        {/* Level Filter */}
        <div className="max-w-md mx-auto mt-8">
          <div className="flex gap-2 justify-center flex-wrap">
            {["all", "beginner", "intermediate", "advanced"].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedLevel === level
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border hover:bg-muted"
                }`}
              >
                {level === "all" ? "All Levels" : level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
              >
                {/* Thumbnail with Gradient */}
                <div className={`relative h-48 bg-gradient-to-br ${course.color} p-6 flex items-center justify-center`}>
                  <div className="text-white text-center">
                    <div className="text-4xl font-bold mb-2">Excel</div>
                    <div className="text-lg font-medium opacity-90">
                      {t(`items.${course.id}.title`).split(' ').slice(0, 2).join(' ')}
                    </div>
                  </div>

                  {/* Badge */}
                  {course.badge && (
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${getBadgeStyles(course.badge)}`}>
                      {course.badge === "popular" ? "Popular" : "New"}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {t(`items.${course.id}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {t(`items.${course.id}.description`)}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{course.duration} {t("duration")}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span>{course.lessons} {t("lessons")}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getLevelColor(course.level)}`}>
                        {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                      </span>
                      <span className="text-lg font-bold text-primary">{course.price}</span>
                    </div>
                    <Link
                      href={`/courses/${course.id}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      {t("startCourse")}
                      <svg
                        className="w-4 h-4"
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
                  </div>
                </div>
              </div>
            ))}
          </div>
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
