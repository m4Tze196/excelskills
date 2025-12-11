# Skills Implementation Guide

This guide explains how the skills system works and how to add new Excel skills to the platform.

## Overview

The skills system consists of:
1. **Data Structure** (`lib/skills-data.ts`) - Centralized skill definitions
2. **Overview Page** (`app/[locale]/skills/page.tsx`) - Grid view of all skills
3. **Detail Pages** (`app/[locale]/skills/[slug]/page.tsx`) - Individual skill pages
4. **SEO** - Meta tags, structured data, and static generation

## Architecture

```
lib/
  skills-data.ts          # Central data source for all skills

app/[locale]/skills/
  page.tsx                # Skills overview with search/filter
  [slug]/
    layout.tsx            # SEO meta tags & static params
    page.tsx              # Skill detail page

components/seo/
  structured-data.tsx     # JSON-LD for search engines
```

## Adding a New Skill

### Step 1: Add Skill Data

Open `lib/skills-data.ts` and add your skill to the `skillsData` array:

```typescript
{
  slug: "your-skill-slug",              // URL-friendly: "xlookup", "power-pivot"
  title: "Your Skill Name",             // Display name: "XLOOKUP", "Power Pivot"
  category: "formulas",                 // formulas | dataAnalysis | formatting | visualization | dataManagement | automation
  difficulty: "intermediate",           // beginner | intermediate | advanced
  icon: "🔍",                           // Emoji icon
  description: "Brief one-line description (max 100 chars)",

  whatIs: "2-3 sentences explaining what this skill is...",
  whenToUse: "2-3 sentences explaining when to use it...",

  syntax: "=YOURFORMULA(param1, param2)",
  syntaxExplanation: [
    "param1: Description of first parameter",
    "param2: Description of second parameter",
  ],

  example: {
    scenario: "Describe a real-world scenario",
    data: "Describe the data structure",
    formula: "=YOURFORMULA(A2, B:B)",
    result: "What the formula returns",
  },

  tips: [
    "Helpful tip #1",
    "Helpful tip #2",
    "Helpful tip #3",
  ],

  commonErrors: [
    "#ERROR1: Explanation and solution",
    "#ERROR2: Explanation and solution",
  ],

  relatedSkills: ["vlookup", "indexMatch"],  // Array of slugs
  videoUrl: "/videos/skills/your-skill.mp4", // Optional
}
```

### Step 2: Test Your Skill

The skill will automatically appear on:
- Overview page: `/skills` (with filter and search)
- Detail page: `/skills/your-skill-slug`

Test:
```bash
npm run dev
# Visit http://localhost:3000/skills/your-skill-slug
```

### Step 3: Verify SEO

Check that meta tags are generated:
```bash
# View page source and look for:
# - <title> tag
# - <meta name="description">
# - <meta property="og:*">
# - <script type="application/ld+json">
```

## Content Guidelines

### Writing Style
- **Clear and concise**: Assume beginner to intermediate Excel knowledge
- **Actionable**: Focus on "how" and "when", not just "what"
- **Real-world examples**: Use business scenarios (sales, inventory, HR)
- **Avoid jargon**: Explain technical terms

### Description (One-liner)
- Max 100 characters
- Start with a verb: "Search for...", "Create...", "Analyze..."
- Focus on the benefit, not the feature

**Good**: "Search for values in tables and retrieve matching information"
**Bad**: "A function that does vertical lookups"

### What Is? Section
- 2-3 sentences max
- First sentence: Simple definition
- Second sentence: Real-world analogy
- Avoid: Technical specifications, history

**Template**: "[SKILL] [does what]. It's like [everyday analogy]. [Key benefit]."

### When To Use? Section
- 2-3 sentences
- Start with "Use [SKILL] when..."
- Give 2-3 concrete use cases
- End with a pattern: "Whenever [condition] applies."

### Syntax Explanation
- One bullet per parameter
- Format: `parameter: Description of what it does (example)`
- Keep under 15 words per bullet
- Mention default values if applicable

### Example
- **Scenario**: One sentence describing the business problem
- **Data**: Describe the data structure (columns, sample values)
- **Formula**: The actual formula that solves it
- **Result**: What the user sees

### Tips
- 3-5 tips per skill
- Mix of: best practices, shortcuts, advanced techniques, gotchas
- Start with action verbs: "Use", "Avoid", "Try", "Combine"
- One tip per line, max 20 words

### Common Errors
- 2-4 most frequent errors
- Format: `#ERROR_CODE: Why it happens - How to fix it`
- Keep solutions concrete and actionable

### Related Skills
- 2-4 related skills
- Include: Prerequisites, alternatives, complementary skills
- Don't include: Unrelated skills just to cross-link

## SEO Optimization

### Meta Tags (Automatic)
The system automatically generates:
- `title`: "[Skill] in Excel - Complete Guide | ExcelSkills"
- `description`: Pulled from skill description + difficulty
- OpenGraph and Twitter cards

### URL Structure
- Pattern: `/skills/[slug]`
- Use kebab-case: `power-query`, `index-match`
- Keep short: 2-3 words max
- Match common search terms

### Structured Data
JSON-LD HowTo schema is automatically generated for each skill.

### Static Generation
All skill pages are pre-rendered at build time via `generateStaticParams()`.

## Features

### Copy-to-Clipboard
Formulas automatically have a "Copy" button that copies the syntax to clipboard.

### Reading Time
Calculated automatically based on word count (~200 words/minute).

### Related Skills
Automatically fetches and displays related skills with hover effects.

### Breadcrumbs
Automatic: Home > Skills > [Skill Name]

### CTA to Chatbot
Every detail page ends with a CTA to the AI Assistant.

## Translation Support

Currently, skill content is in English. To add translations:

1. Create locale-specific versions in `lib/skills-data/`
2. Load appropriate version based on locale
3. Update i18n keys in translation files

## Categories

Available categories:
- **formulas**: Formulas and functions (VLOOKUP, SUMIF, etc.)
- **dataAnalysis**: Data analysis tools (Pivot Tables, Power Query)
- **formatting**: Visual formatting (Conditional Formatting)
- **visualization**: Charts and graphs
- **dataManagement**: Data validation, organization
- **automation**: Macros, VBA

## Difficulty Levels

- **beginner**: Basic Excel features, no formulas or simple formulas
- **intermediate**: Common formulas, features requiring multiple steps
- **advanced**: Complex formulas, programming, data modeling

## Adding Video Content

To add video tutorials:

1. Add video file to `/public/videos/skills/`
2. Set `videoUrl: "/videos/skills/your-skill.mp4"` in skill data
3. Video will automatically appear on detail page

Recommended:
- Format: MP4 (H.264)
- Duration: 30-90 seconds
- Resolution: 1920x1080 or 1280x720
- Size: < 5MB

## Performance Tips

- All skill pages are statically generated
- Images should be optimized (use Next.js Image component)
- Videos should be lazy-loaded
- Keep data structure under 100 skills for optimal performance

## Maintenance

### Updating Existing Skills
1. Edit `lib/skills-data.ts`
2. Find skill by slug
3. Update fields
4. Commit changes
5. Rebuild site (`npm run build`)

### Deprecating Skills
1. Remove from `skillsData` array
2. Add redirect in `next.config.js`:
```javascript
redirects: async () => [
  {
    source: '/skills/old-skill',
    destination: '/skills/new-skill',
    permanent: true
  }
]
```

## Testing Checklist

- [ ] Skill appears on overview page
- [ ] Search finds skill by title
- [ ] Category filter works
- [ ] Difficulty filter works
- [ ] Detail page loads without errors
- [ ] Copy button works
- [ ] Related skills links work
- [ ] Breadcrumbs navigate correctly
- [ ] Meta tags are present (view source)
- [ ] Mobile responsive
- [ ] No console errors

## Examples

See existing skills in `lib/skills-data.ts`:
- `vlookup` - Good example of formula skill
- `pivotTables` - Good example of feature skill
- `macros` - Good example of advanced skill

## Questions?

If you need help:
1. Check existing skills for examples
2. Review TypeScript interfaces in `lib/skills-data.ts`
3. Test locally with `npm run dev`
4. Ask in the team chat
