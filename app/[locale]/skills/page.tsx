import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Excel Skills Verzeichnis - Alle Excel Funktionen & Tutorials | ExcelSkills",
  description: "Umfassendes Excel Skills Verzeichnis mit Formeln, Funktionen, Datenanalyse und mehr. Excel lernen von VLOOKUP bis Pivot-Tabellen. Für Anfänger bis Experten. Jetzt Excel Skills entdecken!",
  keywords: ["Excel Skills", "Excel lernen", "Excel Tutorials", "VLOOKUP", "Pivot-Tabellen", "Excel Formeln", "INDEX MATCH", "Excel Funktionen", "Datenanalyse", "Power Query", "Excel Makros"],
  openGraph: {
    title: "Excel Skills Verzeichnis - Alle Excel Funktionen",
    description: "Durchsuchen Sie unser umfassendes Excel Skills Verzeichnis. Von Grundlagen bis zu fortgeschrittenen Techniken.",
    url: "https://excelskills.com/skills",
    type: "website",
    images: [
      {
        url: "/og-image-skills.jpg",
        width: 1200,
        height: 630,
        alt: "ExcelSkills Verzeichnis - Excel Skills lernen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Excel Skills Verzeichnis | ExcelSkills",
    description: "Umfassendes Verzeichnis aller Excel Skills - von Formeln bis Makros.",
    images: ["/og-image-skills.jpg"],
  },
  alternates: {
    canonical: "https://excelskills.com/skills",
  },
};

type Skill = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
};

const skills: Skill[] = [
  {
    id: "vlookup",
    title: "VLOOKUP",
    description: "Search for a value in the first column of a range and return a value in the same row from another column.",
    category: "Formulas",
    difficulty: "Intermediate",
  },
  {
    id: "pivot-tables",
    title: "Pivot Tables",
    description: "Create dynamic summary tables to analyze and explore your data interactively.",
    category: "Data Analysis",
    difficulty: "Intermediate",
  },
  {
    id: "conditional-formatting",
    title: "Conditional Formatting",
    description: "Apply formatting to cells based on their values to highlight important information.",
    category: "Formatting",
    difficulty: "Beginner",
  },
  {
    id: "index-match",
    title: "INDEX-MATCH",
    description: "A more flexible alternative to VLOOKUP for looking up values in any direction.",
    category: "Formulas",
    difficulty: "Advanced",
  },
  {
    id: "power-query",
    title: "Power Query",
    description: "Connect to, combine, and refine data from multiple sources.",
    category: "Data Analysis",
    difficulty: "Advanced",
  },
  {
    id: "charts",
    title: "Charts & Graphs",
    description: "Visualize your data with various chart types for better insights.",
    category: "Visualization",
    difficulty: "Beginner",
  },
  {
    id: "sumif",
    title: "SUMIF & SUMIFS",
    description: "Sum values based on one or multiple criteria.",
    category: "Formulas",
    difficulty: "Intermediate",
  },
  {
    id: "data-validation",
    title: "Data Validation",
    description: "Control what data can be entered into cells to maintain data quality.",
    category: "Data Management",
    difficulty: "Beginner",
  },
  {
    id: "macros",
    title: "Macros & VBA",
    description: "Automate repetitive tasks with recorded macros and VBA programming.",
    category: "Automation",
    difficulty: "Advanced",
  },
];

const categories = ["All", "Formulas", "Data Analysis", "Formatting", "Visualization", "Data Management", "Automation"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
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

export default function SkillsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Excel Skills Directory
        </h1>
        <p className="text-xl text-muted-foreground">
          Browse our comprehensive collection of Excel skills. From beginner fundamentals to advanced techniques.
        </p>
      </div>

      {/* Filters - Placeholder for future interactivity */}
      <div className="mb-8 space-y-4">
        <div>
          <h3 className="text-sm font-semibold mb-2">Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  category === "All"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground border-border hover:bg-muted"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">Difficulty</h3>
          <div className="flex flex-wrap gap-2">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  difficulty === "All"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground border-border hover:bg-muted"
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                {skill.title}
              </h3>
              <span
                className={`px-2 py-1 rounded text-xs font-medium border ${getDifficultyColor(
                  skill.difficulty
                )}`}
              >
                {skill.difficulty}
              </span>
            </div>
            <p className="text-muted-foreground mb-4 text-sm">
              {skill.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
                {skill.category}
              </span>
              <span className="text-primary text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
                Learn More
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Need Help with a Specific Skill?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Ask our AI assistant for personalized guidance and instant answers to your Excel questions.
        </p>
        <a
          href="/chat"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg"
        >
          Ask AI Assistant
        </a>
      </div>
    </div>
  );
}
