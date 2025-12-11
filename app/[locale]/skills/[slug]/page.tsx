"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { getSkillBySlug, getRelatedSkills } from "@/lib/skills-data";
import { SkillStructuredData } from "@/components/seo/structured-data";
import { useState } from "react";

export default function SkillDetailPage() {
  const t = useTranslations("skills");
  const params = useParams();
  const slug = params.slug as string;
  const [copied, setCopied] = useState(false);

  const skill = getSkillBySlug(slug);

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

  const relatedSkills = getRelatedSkills(skill);

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

  const handleCopyFormula = async () => {
    try {
      await navigator.clipboard.writeText(skill.syntax);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Calculate reading time (approx 200 words per minute)
  const wordCount =
    skill.whatIs.split(" ").length +
    skill.whenToUse.split(" ").length +
    skill.syntaxExplanation.join(" ").split(" ").length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <>
      <SkillStructuredData skill={skill} />
      <div className="flex flex-col">
      {/* Breadcrumb */}
      <section className="border-b border-border/40 bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/skills"
              className="hover:text-foreground transition-colors"
            >
              Skills
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{skill.title}</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-6 mb-6">
            <div className="text-6xl md:text-7xl">{skill.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span
                  className={`text-sm px-3 py-1 rounded-full font-medium ${getDifficultyColor(
                    skill.difficulty
                  )}`}
                >
                  {t(`levels.${skill.difficulty}`)}
                </span>
                <span className="text-sm px-3 py-1 rounded-full font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                  {t(`categories.${skill.category}`)}
                </span>
                <span className="text-sm text-muted-foreground">
                  ⏱️ {readingTime} min read
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                {skill.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {skill.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section - if available */}
      {skill.videoUrl && (
        <section className="container mx-auto px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            <video
              src={skill.videoUrl}
              controls
              className="w-full rounded-xl border border-border shadow-lg"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* What Is */}
          <div className="bg-card rounded-xl border border-border p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">📖</span>
              <h2 className="text-2xl font-bold">What is {skill.title}?</h2>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {skill.whatIs}
            </p>
          </div>

          {/* When To Use */}
          <div className="bg-card rounded-xl border border-border p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">⏰</span>
              <h2 className="text-2xl font-bold">When to use it?</h2>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {skill.whenToUse}
            </p>
          </div>

          {/* Syntax */}
          <div className="bg-card rounded-xl border border-border p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">💡</span>
              <h2 className="text-2xl font-bold">Syntax</h2>
            </div>

            {/* Formula with Copy Button */}
            <div className="relative mb-6">
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto border border-border">
                <code className="text-sm font-mono text-foreground">
                  {skill.syntax}
                </code>
              </pre>
              <button
                onClick={handleCopyFormula}
                className="absolute top-2 right-2 px-3 py-1.5 bg-background border border-border rounded-md text-sm font-medium hover:bg-muted transition-colors flex items-center gap-2"
                title="Copy formula"
              >
                {copied ? (
                  <>
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>

            {/* Parameter Explanations */}
            <div className="space-y-3">
              {skill.syntaxExplanation.map((explanation, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <p className="text-muted-foreground flex-1">{explanation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Example */}
          <div className="bg-card rounded-xl border border-border p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">📊</span>
              <h2 className="text-2xl font-bold">Example</h2>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Scenario:
                </h3>
                <p className="text-muted-foreground">{skill.example.scenario}</p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Data:</h3>
                <p className="text-muted-foreground">{skill.example.data}</p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Formula:</h3>
                <pre className="bg-muted p-3 rounded-lg overflow-x-auto border border-border">
                  <code className="text-sm font-mono text-foreground">
                    {skill.example.formula}
                  </code>
                </pre>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Result:</h3>
                <p className="text-muted-foreground">{skill.example.result}</p>
              </div>
            </div>
          </div>

          {/* Tips & Tricks */}
          <div className="bg-card rounded-xl border border-border p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">✨</span>
              <h2 className="text-2xl font-bold">Tips & Tricks</h2>
            </div>
            <ul className="space-y-3">
              {skill.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-muted-foreground flex-1">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Common Errors */}
          <div className="bg-card rounded-xl border border-border p-6 md:p-8 border-l-4 border-l-red-500">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">⚠️</span>
              <h2 className="text-2xl font-bold">Common Errors</h2>
            </div>
            <ul className="space-y-3">
              {skill.commonErrors.map((error, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="text-muted-foreground flex-1">{error}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Skills */}
          {relatedSkills.length > 0 && (
            <div className="bg-card rounded-xl border border-border p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🔗</span>
                <h2 className="text-2xl font-bold">Related Skills</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {relatedSkills.map((relatedSkill) => (
                  <Link
                    href={`/skills/${relatedSkill.slug}`}
                    key={relatedSkill.slug}
                    className="group p-4 border border-border rounded-lg hover:border-primary/50 hover:shadow-lg transition-all"
                  >
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                      {relatedSkill.icon}
                    </div>
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {relatedSkill.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedSkill.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/40 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8 md:p-12 text-center border-2 border-primary/20">
              <div className="text-5xl mb-4">💬</div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Still have questions about {skill.title}?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-lg">
                Our Excel AI Assistant answers your questions individually and
                provides concrete solutions for your specific problems.
              </p>
              <Link
                href="/chat"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg gap-2"
              >
                Ask AI Assistant
                <svg
                  className="w-5 h-5"
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
              <p className="text-sm text-muted-foreground mt-4">
                Get instant, personalized help for your Excel challenges
              </p>
            </div>

            <div className="text-center mt-8">
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
    </>
  );
}
