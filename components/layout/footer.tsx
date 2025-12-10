"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ExcelSkills
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">{t("footer.skills")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/skills" className="hover:text-foreground transition-colors">
                  {t("footer.browseAll")}
                </Link>
              </li>
              <li>
                <Link href="/skills#formulas" className="hover:text-foreground transition-colors">
                  {t("footer.formulas")}
                </Link>
              </li>
              <li>
                <Link href="/skills#pivot-tables" className="hover:text-foreground transition-colors">
                  {t("footer.pivotTables")}
                </Link>
              </li>
              <li>
                <Link href="/skills#data-analysis" className="hover:text-foreground transition-colors">
                  {t("footer.dataAnalysis")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">{t("footer.courses")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/courses" className="hover:text-foreground transition-colors">
                  {t("footer.allCourses")}
                </Link>
              </li>
              <li>
                <Link href="/courses#beginner" className="hover:text-foreground transition-colors">
                  {t("courses.level.beginner")}
                </Link>
              </li>
              <li>
                <Link href="/courses#intermediate" className="hover:text-foreground transition-colors">
                  {t("courses.level.intermediate")}
                </Link>
              </li>
              <li>
                <Link href="/courses#advanced" className="hover:text-foreground transition-colors">
                  {t("courses.level.advanced")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">{t("footer.resources")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/chat" className="hover:text-foreground transition-colors">
                  {t("footer.aiAssistant")}
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-foreground transition-colors">
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-foreground transition-colors">
                  {t("footer.contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {t("footer.copyright")}
            </p>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                {t("footer.privacy")}
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                {t("footer.terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
