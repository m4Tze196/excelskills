import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const t = useTranslations("home");

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              {t("hero.title")}{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t("hero.titleHighlight")}
              </span>{" "}
              {t("hero.titleEnd")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("hero.description")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/chat"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg"
            >
              {t("hero.tryAI")}
            </Link>
            <Link
              href="/skills"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-8 py-3 text-base font-medium hover:bg-muted transition-colors"
            >
              {t("hero.browseSkills")}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t("features.title")}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1: Skills Directory */}
            <div className="bg-card rounded-lg p-6 border border-border shadow-card">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("features.skillsDirectory.title")}</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                {t("features.skillsDirectory.description")}
              </p>
              <Link
                href="/skills"
                className="text-primary hover:text-primary/80 font-medium text-sm inline-flex items-center"
              >
                {t("features.skillsDirectory.cta")}
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
              </Link>
            </div>

            {/* Feature 2: Interactive Courses */}
            <div className="bg-card rounded-lg p-6 border border-border shadow-card">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-secondary"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("features.courses.title")}</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                {t("features.courses.description")}
              </p>
              <Link
                href="/courses"
                className="text-secondary hover:text-secondary/80 font-medium text-sm inline-flex items-center"
              >
                {t("features.courses.cta")}
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
              </Link>
            </div>

            {/* Feature 3: AI Assistant */}
            <div className="bg-card rounded-lg p-6 border border-border shadow-card">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-accent"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("features.aiAssistant.title")}</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                {t("features.aiAssistant.description")}
              </p>
              <Link
                href="/chat"
                className="text-accent hover:text-accent/80 font-medium text-sm inline-flex items-center"
              >
                {t("features.aiAssistant.cta")}
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
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 border-t border-border/40">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
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
