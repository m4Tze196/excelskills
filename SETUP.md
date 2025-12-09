# ExcelSkills Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

### 3. Build for Production

```bash
npm run build
npm start
```

## Project Overview

ExcelSkills is built with:
- **Next.js 16** (App Router with Turbopack)
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **React 19** for UI components

## Current Features (MVP)

### ✅ Completed
- Responsive landing page with hero section
- Skills directory with 9+ example skills
- Courses page with 6 example courses
- AI chatbot UI (placeholder - backend pending)
- Professional header and footer navigation
- Mobile-responsive design
- Design system based on "Soft Pop" theme

### 🔄 Pages Available
- `/` - Landing page
- `/skills` - Skills directory
- `/courses` - Courses overview
- `/chat` - AI chatbot interface (UI only)

## Design System

### Colors (OKLCH Color Space)
- **Primary**: `oklch(0.5106 0.2301 276)` - Purple/Blue
- **Secondary**: `oklch(0.7038 0.1230 182)` - Teal
- **Accent**: `oklch(0.7686 0.1647 70.0)` - Yellow/Orange
- **Background**: `oklch(0.9789 0.0082 121)` - Light gray
- **Destructive**: `oklch(0.6368 0.2078 25.3)` - Red

### Typography
- **Sans Serif**: Geist (Google Fonts)
- **Monospace**: Geist Mono

### Border Radius
- Large: 1rem
- Medium: 0.5rem
- Small: 0.25rem

## File Structure

```
excelskills/
├── app/                    # Next.js App Router
│   ├── chat/              # Chatbot page
│   │   └── page.tsx
│   ├── courses/           # Courses page
│   │   └── page.tsx
│   ├── skills/            # Skills directory
│   │   └── page.tsx
│   ├── globals.css        # Global styles (Tailwind v4)
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
│
├── components/
│   ├── layout/            # Layout components
│   │   ├── header.tsx     # Main navigation
│   │   └── footer.tsx     # Footer with links
│   └── ui/                # Reusable UI components (to be added)
│
├── lib/
│   └── utils.ts           # Utility functions (cn helper)
│
├── public/
│   └── images/            # Static images (empty for now)
│
├── .env.example           # Environment variables template
├── next.config.ts         # Next.js configuration
├── postcss.config.mjs     # PostCSS config (Tailwind v4)
├── tsconfig.json          # TypeScript configuration
└── vercel.json            # Vercel deployment config
```

## Development Tips

### Adding New Pages
1. Create a new folder in `/app`
2. Add `page.tsx` file
3. Export default function component
4. Navigation will automatically update

### Using Design System
```tsx
// Use Tailwind classes with design tokens
<div className="bg-primary text-primary-foreground">
  <button className="bg-secondary hover:bg-secondary/90">
    Click me
  </button>
</div>
```

### Responsive Design
```tsx
// Mobile-first approach
<div className="
  text-base           // Mobile
  md:text-lg          // Tablet (768px+)
  lg:text-xl          // Desktop (1024px+)
">
  Content
</div>
```

## Next Steps (Phase 2)

### Backend Integration
1. **Supabase Setup**
   - User authentication
   - Database for skills and courses
   - User progress tracking

2. **AI Chatbot**
   - OpenAI API integration
   - Conversation history
   - Context-aware responses

3. **Payment System**
   - Stripe integration
   - Subscription management
   - Usage-based billing

### Features to Add
- User accounts and authentication
- Course content (videos, exercises)
- Progress tracking
- Bookmarking and favorites
- Search functionality
- Admin dashboard for content management

## Deployment to Vercel

### One-Click Deploy
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Vercel auto-detects Next.js
4. Click Deploy

### Environment Variables
Add these in Vercel dashboard (Phase 2):
- Database credentials
- API keys
- Payment integration keys

## Troubleshooting

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### TypeScript Errors
```bash
# Check types
npx tsc --noEmit
```

### Tailwind Not Working
- Ensure `@tailwindcss/postcss` is installed
- Check `postcss.config.mjs` is properly configured
- Verify `globals.css` is imported in `layout.tsx`

## Support

For questions or issues:
1. Check the README.md
2. Review Next.js documentation: https://nextjs.org/docs
3. Review Tailwind CSS v4 docs: https://tailwindcss.com/docs

## License

Proprietary - All rights reserved
