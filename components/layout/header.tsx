"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "@/lib/theme-context";
import { useTranslations } from "next-intl";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations("header");
  const pathname = usePathname();

  // Extract current locale from pathname
  const currentLocale = pathname.split("/")[1] || "en";
  const pathnameWithoutLocale = pathname.replace(`/${currentLocale}`, "") || "/";

  const switchLocale = (newLocale: string) => {
    const newPath = `/${newLocale}${pathnameWithoutLocale}`;
    window.location.href = newPath;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href={`/${currentLocale}`} className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t("brand")}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href={`/${currentLocale}/skills`}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            {t("skills")}
          </Link>
          <Link
            href={`/${currentLocale}/courses`}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            {t("courses")}
          </Link>
          <Link
            href={`/${currentLocale}/chat`}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            {t("aiAssistant")}
          </Link>
          <Link
            href={`/${currentLocale}/chat`}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {t("getStarted")}
          </Link>

          {/* Language Switcher */}
          <div className="relative group">
            <button className="flex items-center space-x-1 p-2 rounded-lg hover:bg-muted transition-colors">
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span className="text-sm font-medium uppercase">{currentLocale}</span>
            </button>
            <div className="absolute right-0 mt-2 w-32 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <button
                onClick={() => switchLocale("en")}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-muted rounded-t-lg ${
                  currentLocale === "en" ? "font-semibold bg-muted" : ""
                }`}
              >
                English
              </button>
              <button
                onClick={() => switchLocale("de")}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-muted rounded-b-lg ${
                  currentLocale === "de" ? "font-semibold bg-muted" : ""
                }`}
              >
                Deutsch
              </button>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle dark mode"
          >
            {theme === "light" ? (
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          {/* Dark Mode Toggle for Mobile */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle dark mode"
          >
            {theme === "light" ? (
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
              </svg>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background">
          <div className="container mx-auto py-4 px-4 flex flex-col space-y-3">
            <Link
              href={`/${currentLocale}/skills`}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("skills")}
            </Link>
            <Link
              href={`/${currentLocale}/courses`}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("courses")}
            </Link>
            <Link
              href={`/${currentLocale}/chat`}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("aiAssistant")}
            </Link>

            {/* Language Switcher Mobile */}
            <div className="border-t border-border/40 pt-3 mt-3">
              <p className="text-xs font-semibold text-muted-foreground mb-2">Language</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => switchLocale("en")}
                  className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-colors ${
                    currentLocale === "en"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:bg-muted"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => switchLocale("de")}
                  className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-colors ${
                    currentLocale === "de"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:bg-muted"
                  }`}
                >
                  Deutsch
                </button>
              </div>
            </div>

            <Link
              href={`/${currentLocale}/chat`}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("getStarted")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
