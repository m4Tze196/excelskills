import { Skill } from "@/lib/skills-data";

interface StructuredDataProps {
  skill: Skill;
}

export function SkillStructuredData({ skill }: StructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use ${skill.title} in Excel`,
    description: skill.description,
    step: [
      {
        "@type": "HowToStep",
        name: "Understand the syntax",
        text: skill.syntax,
        itemListElement: skill.syntaxExplanation.map((explanation, index) => ({
          "@type": "HowToDirection",
          position: index + 1,
          text: explanation,
        })),
      },
      {
        "@type": "HowToStep",
        name: "Apply the formula",
        text: skill.example.scenario,
      },
    ],
    tool: {
      "@type": "SoftwareApplication",
      name: "Microsoft Excel",
      applicationCategory: "SpreadsheetApplication",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
