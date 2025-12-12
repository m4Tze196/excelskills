"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useParams } from "next/navigation";

export default function CourseDetailPage() {
  const t = useTranslations("courses");
  const params = useParams();
  const slug = params.slug as string;

  // Courses metadata
  const coursesMetadata: Record<
    string,
    {
      level: string;
      duration: number;
      lessons: number;
      price: string;
      badge: string | null;
      color: string;
    }
  > = {
    fundamentals: {
      level: "beginner",
      duration: 8,
      lessons: 24,
      price: "Free",
      badge: "popular",
      color: "from-green-500 to-emerald-500",
    },
    formulas: {
      level: "intermediate",
      duration: 12,
      lessons: 36,
      price: "$49",
      badge: "popular",
      color: "from-blue-500 to-cyan-500",
    },
    dataAnalysis: {
      level: "intermediate",
      duration: 10,
      lessons: 30,
      price: "$59",
      badge: null,
      color: "from-purple-500 to-pink-500",
    },
    powerQuery: {
      level: "advanced",
      duration: 15,
      lessons: 40,
      price: "$79",
      badge: "new",
      color: "from-orange-500 to-red-500",
    },
    dashboard: {
      level: "advanced",
      duration: 14,
      lessons: 38,
      price: "$69",
      badge: null,
      color: "from-indigo-500 to-purple-500",
    },
    vba: {
      level: "advanced",
      duration: 20,
      lessons: 50,
      price: "$99",
      badge: "new",
      color: "from-rose-500 to-pink-500",
    },
  };

  const course = coursesMetadata[slug];

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The course you're looking for doesn't exist.
        </p>
        <Link
          href="/courses"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Back to Courses
        </Link>
      </div>
    );
  }

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
            <Link href="/courses" className="hover:text-foreground transition-colors">
              Courses
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">
              {t(`items.${slug}.title`)}
            </span>
          </nav>
        </div>
      </section>

      {/* Hero Section with Gradient Banner */}
      <section className={`bg-gradient-to-br ${course.color} text-white`}>
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
              </span>
              {course.badge && (
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  {course.badge === "popular" ? "Popular" : "New"}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t(`items.${slug}.title`)}
            </h1>
            <p className="text-xl mb-8 opacity-90">
              {t(`items.${slug}.description`)}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{course.duration} hours</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>{course.lessons} lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-2xl font-bold">{course.price}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                Start Course
              </button>
              <Link
                href="/chat"
                className="bg-white/20 backdrop-blur-sm px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors"
              >
                Ask AI About This Course
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* What You'll Learn */}
            <div className="md:col-span-2 space-y-8">
              <div className="bg-card rounded-xl border border-border p-8">
                <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
                <div className="space-y-3">
                  {[
                    "Master essential concepts and techniques",
                    "Apply skills to real-world business scenarios",
                    "Build confidence through hands-on practice",
                    "Learn best practices and professional workflows",
                    "Gain efficiency with keyboard shortcuts and tips",
                    "Troubleshoot common errors and challenges",
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

              <div className="bg-card rounded-xl border border-border p-8">
                <h2 className="text-2xl font-bold mb-6">Course Content</h2>
                <p className="text-muted-foreground mb-6">
                  This is a placeholder for the course curriculum. The full
                  implementation would include detailed module breakdowns, lesson
                  previews, and downloadable resources.
                </p>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((module) => (
                    <div
                      key={module}
                      className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">Module {module}</h3>
                        <span className="text-sm text-muted-foreground">
                          {Math.floor(course.lessons / 5)} lessons
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive coverage of key topics and practical exercises
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6 sticky top-20">
                <h3 className="font-bold mb-4">Course Includes</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-muted-foreground">
                      {course.duration} hours on-demand video
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-muted-foreground">
                      Downloadable resources
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="text-muted-foreground">
                      Access on mobile and desktop
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-muted-foreground">
                      Certificate of completion
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/40 bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              href="/courses"
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
              Back to All Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
