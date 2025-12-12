import { Metadata } from "next";
import { getSkillBySlug, getAllSkills } from "@/lib/skills-data";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);

  if (!skill) {
    return {
      title: "Skill Not Found | ExcelSkills",
      description: "The requested Excel skill could not be found.",
    };
  }

  return {
    title: `${skill.title} in Excel - Complete Guide | ExcelSkills`,
    description: `${skill.description}. Learn ${skill.title} with examples, tips, and common errors. ${skill.difficulty} level Excel tutorial.`,
    keywords: `${skill.title}, Excel, ${skill.category}, Tutorial, Guide, Formula, Function`,
    openGraph: {
      title: `${skill.title} - Excel Tutorial`,
      description: skill.description,
      type: "article",
      url: `/skills/${skill.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${skill.title} - Excel Tutorial`,
      description: skill.description,
    },
  };
}

// Generate static params for all skills
export async function generateStaticParams() {
  const skills = getAllSkills();

  return skills.map((skill) => ({
    slug: skill.slug,
  }));
}

export default function SkillLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
