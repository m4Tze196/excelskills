import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ExcelSkills
            </h3>
            <p className="text-sm text-muted-foreground">
              Master Excel with AI-powered guidance and comprehensive skill directory.
            </p>
          </div>

          {/* Skills */}
          <nav className="space-y-3" aria-label="Skills Navigation">
            <h4 className="text-sm font-semibold">Skills</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/skills" className="hover:text-foreground transition-colors">
                  Browse All Skills
                </Link>
              </li>
              <li>
                <Link href="/skills#formulas" className="hover:text-foreground transition-colors">
                  Formulas
                </Link>
              </li>
              <li>
                <Link href="/skills#pivot-tables" className="hover:text-foreground transition-colors">
                  Pivot Tables
                </Link>
              </li>
              <li>
                <Link href="/skills#data-analysis" className="hover:text-foreground transition-colors">
                  Data Analysis
                </Link>
              </li>
            </ul>
          </nav>

          {/* Courses */}
          <nav className="space-y-3" aria-label="Courses Navigation">
            <h4 className="text-sm font-semibold">Courses</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/courses" className="hover:text-foreground transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/courses#beginner" className="hover:text-foreground transition-colors">
                  Beginner
                </Link>
              </li>
              <li>
                <Link href="/courses#intermediate" className="hover:text-foreground transition-colors">
                  Intermediate
                </Link>
              </li>
              <li>
                <Link href="/courses#advanced" className="hover:text-foreground transition-colors">
                  Advanced
                </Link>
              </li>
            </ul>
          </nav>

          {/* Resources */}
          <nav className="space-y-3" aria-label="Resources Navigation">
            <h4 className="text-sm font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/chat" className="hover:text-foreground transition-colors">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ExcelSkills. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
