import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Excel Kurse - Excel lernen von Anfänger bis Fortgeschritten | ExcelSkills",
  description: "Excel lernen mit strukturierten Kursen für alle Levels. Excel Tutorials für Anfänger, Fortgeschrittene und Profis. Formeln, Pivot-Tabellen, VBA und mehr. Jetzt kostenlos starten!",
  keywords: ["Excel Kurse", "Excel lernen", "Excel Tutorials", "Excel Kurs Anfänger", "Excel Training", "Excel Formeln Kurs", "Pivot-Tabellen lernen", "VBA Kurs", "Power Query Tutorial", "Excel für Fortgeschrittene"],
  openGraph: {
    title: "Excel Kurse - Von Anfänger bis Fortgeschritten",
    description: "Strukturierte Excel-Kurse für alle Skill-Level. Lernen Sie Excel mit hands-on Übungen und praktischen Beispielen.",
    url: "https://excelskills.com/courses",
    type: "website",
    images: [
      {
        url: "/og-image-courses.jpg",
        width: 1200,
        height: 630,
        alt: "ExcelSkills Kurse - Excel lernen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Excel Kurse - Excel lernen | ExcelSkills",
    description: "Strukturierte Excel-Kurse von Anfänger bis Fortgeschritten mit praktischen Übungen.",
    images: ["/og-image-courses.jpg"],
  },
  alternates: {
    canonical: "https://excelskills.com/courses",
  },
};

type Course = {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  lessons: number;
  students: number;
};

const courses: Course[] = [
  {
    id: "excel-fundamentals",
    title: "Excel Fundamentals",
    description: "Start your Excel journey with the basics. Learn navigation, data entry, simple formulas, and formatting.",
    level: "Beginner",
    duration: "4 hours",
    lessons: 12,
    students: 2458,
  },
  {
    id: "formulas-functions",
    title: "Mastering Formulas & Functions",
    description: "Deep dive into Excel formulas including VLOOKUP, INDEX-MATCH, SUMIF, and more advanced functions.",
    level: "Intermediate",
    duration: "6 hours",
    lessons: 18,
    students: 1876,
  },
  {
    id: "data-analysis",
    title: "Data Analysis with Excel",
    description: "Learn to analyze data with pivot tables, charts, conditional formatting, and statistical functions.",
    level: "Intermediate",
    duration: "8 hours",
    lessons: 24,
    students: 1542,
  },
  {
    id: "power-query-pivot",
    title: "Power Query & Power Pivot",
    description: "Transform and model your data with Power Query and Power Pivot for advanced analytics.",
    level: "Advanced",
    duration: "10 hours",
    lessons: 30,
    students: 987,
  },
  {
    id: "dashboard-reporting",
    title: "Dashboard & Reporting",
    description: "Create professional dashboards and reports with advanced charting and visualization techniques.",
    level: "Advanced",
    duration: "7 hours",
    lessons: 20,
    students: 1234,
  },
  {
    id: "vba-automation",
    title: "VBA & Automation",
    description: "Automate repetitive tasks and create custom solutions with VBA programming.",
    level: "Advanced",
    duration: "12 hours",
    lessons: 36,
    students: 756,
  },
];

function getLevelColor(level: string) {
  switch (level) {
    case "Beginner":
      return "bg-secondary/10 text-secondary border-secondary/20";
    case "Intermediate":
      return "bg-accent/10 text-accent border-accent/20";
    case "Advanced":
      return "bg-destructive/10 text-destructive border-destructive/20";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Excel Courses
        </h1>
        <p className="text-xl text-muted-foreground">
          Structured learning paths to take you from Excel novice to expert. Learn at your own pace with hands-on practice.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-primary mb-1">{courses.length}</div>
          <div className="text-sm text-muted-foreground">Courses</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-secondary mb-1">
            {courses.reduce((acc, course) => acc + course.lessons, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Lessons</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-accent mb-1">
            {courses.reduce((acc, course) => acc + course.students, 0).toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Students</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-primary mb-1">
            {courses.reduce((acc, course) => acc + parseInt(course.duration), 0)}h
          </div>
          <div className="text-sm text-muted-foreground">Content</div>
        </div>
      </div>

      {/* Courses by Level */}
      <div className="space-y-12">
        {["Beginner", "Intermediate", "Advanced"].map((level) => {
          const levelCourses = courses.filter((course) => course.level === level);
          if (levelCourses.length === 0) return null;

          return (
            <div key={level} id={level.toLowerCase()}>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span
                  className={`w-2 h-8 rounded-full mr-3 ${
                    level === "Beginner"
                      ? "bg-secondary"
                      : level === "Intermediate"
                      ? "bg-accent"
                      : "bg-destructive"
                  }`}
                ></span>
                {level} Level
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {levelCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors flex-1">
                        {course.title}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium border whitespace-nowrap ml-2 ${getLevelColor(
                          course.level
                        )}`}
                      >
                        {course.level}
                      </span>
                    </div>

                    <p className="text-muted-foreground mb-4 text-sm">
                      {course.description}
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {course.duration}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {course.lessons} lessons
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        {course.students.toLocaleString()}
                      </div>
                    </div>

                    <button className="w-full bg-primary text-primary-foreground rounded-lg py-2 text-sm font-medium hover:bg-primary/90 transition-colors">
                      Start Course
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Not Sure Where to Start?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Our AI assistant can help you choose the right course based on your current skill level and learning goals.
        </p>
        <a
          href="/chat"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg"
        >
          Get Course Recommendations
        </a>
      </div>
    </div>
  );
}
