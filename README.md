# ExcelSkills

Excel Skills Directory with AI-Powered Chatbot

## Overview

ExcelSkills is a comprehensive platform for learning and mastering Microsoft Excel. It features:

- **Skills Directory**: Browse and search through a comprehensive catalog of Excel skills
- **Interactive Courses**: Structured learning paths from beginner to advanced
- **AI Assistant**: Get instant answers to your Excel questions (Coming Soon)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
excelskills/
├── app/                 # Next.js app directory
│   ├── chat/           # AI chatbot interface
│   ├── courses/        # Courses overview page
│   ├── skills/         # Skills directory page
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Landing page
│   └── globals.css     # Global styles
├── components/
│   ├── layout/         # Layout components (Header, Footer)
│   └── ui/             # Reusable UI components
├── lib/
│   └── utils.ts        # Utility functions
└── public/
    └── images/         # Static images
```

## Design System

The project uses a custom design system based on the "Soft Pop" theme:

- **Primary Color**: Purple/Blue (`oklch(0.5106 0.2301 276)`)
- **Secondary Color**: Teal (`oklch(0.7038 0.1230 182)`)
- **Accent Color**: Yellow/Orange (`oklch(0.7686 0.1647 70.0)`)
- **Fonts**: Geist Sans, Geist Mono

## Roadmap

### MVP (Current Phase)
- [x] Landing page with hero section
- [x] Skills directory with filtering
- [x] Courses overview page
- [x] Chatbot UI placeholder
- [x] Responsive design
- [x] Vercel deployment configuration

### Phase 2 (Next Steps)
- [ ] Supabase integration for authentication
- [ ] Database setup for skills and courses
- [ ] AI chatbot backend integration
- [ ] Payment system integration
- [ ] User accounts and progress tracking
- [ ] Content management system

### Phase 3 (Future)
- [ ] Advanced course features (video, interactive exercises)
- [ ] Community features (forums, Q&A)
- [ ] Certification system
- [ ] Mobile app

## Deployment

The project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Vercel will automatically detect Next.js and configure build settings
4. Deploy!

## Contributing

This is a private project. For questions or suggestions, please contact the project owner.

## License

Proprietary - All rights reserved
