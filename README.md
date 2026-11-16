# Elhussieny Sabry — Personal Portfolio & Data Engineering Showcase

A modern, high-performance personal portfolio website built with **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Designed for technical storytelling, showcasing production-grade data pipelines, database internals research, open-source contributions, and verified certifications.

---

## Technical Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 6
- **Styling:** Tailwind CSS v4 + custom CSS variables
- **Motion & Interactions:** Framer Motion (respects `prefers-reduced-motion`)
- **Iconography:** Lucide Icons (clean SVGs, zero emojis)
- **Visuals:** Custom HTML5 Canvas real-time pipeline telemetry visualization

---

## Project Architecture & Directory Layout

```
portfolio/
├── public/
│   ├── Elhussieny_Sabry_CV.pdf       # Verified professional CV (A4 printable)
│   ├── certificates/
│   │   └── nasa_space_apps_2026.png  # Authentic NASA Space Apps certificate
│   ├── favicon.svg                   # Vector SVG brand icon
│   ├── robots.txt                    # Search engine crawler configuration
│   └── sitemap.xml                   # XML Sitemap for SEO
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   └── Layout.tsx            # Sticky Navbar, Scroll Progress, Footer, ScrollToTop
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx       # Hero + Interactive Data Pipeline Canvas Viz
│   │   │   ├── AboutSection.tsx      # Authentic professional narrative + BIS Menoufia
│   │   │   ├── SkillsSection.tsx     # Categorized technical competencies
│   │   │   ├── ProjectsSection.tsx   # Bento-style cards + detailed modal dialogs
│   │   │   ├── CaseStudiesSection.tsx# Systems engineering depth deep-dives
│   │   │   ├── CertificationsSection.tsx # Verified credentials + certificate lightbox
│   │   │   ├── OpenSourceSection.tsx # Apache Airflow contribution timeline
│   │   │   ├── JourneySection.tsx    # Technical growth & learning roadmap
│   │   │   └── ContactSection.tsx    # Direct contact points & CV download
│   │   └── ui/
│   │       └── Components.tsx        # Section, FadeInView, GlowCard, Badge, Divider
│   ├── data/
│   │   └── portfolio.ts              # Single source of truth for all portfolio data
│   ├── hooks/
│   │   └── usePortfolio.ts           # IntersectionObserver, scroll progress, reduced motion
│   ├── styles/
│   │   └── globals.css               # Design tokens, dark theme, and grid utilities
│   ├── App.tsx                       # Master application component
│   └── main.tsx                      # Vite React root mounting
├── index.html                        # Semantic HTML with complete OpenGraph & Twitter SEO tags
├── vite.config.ts                    # Vite configuration with Tailwind plugin
├── tsconfig.json                     # Strict TypeScript compiler options
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

### Production Build

```bash
# Run TypeScript type check and compile production bundle
npm run build

# Preview production build locally
npm run preview
```

The production assets will be built to the `dist/` directory.

---

## Deployment Instructions

### Deploy to Vercel (Recommended)

1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `portfolio` repository.
4. Vercel automatically detects Vite:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **"Deploy"**.

### Deploy to Netlify

1. Link your GitHub repository in Netlify.
2. Set Build command to: `npm run build`
3. Set Publish directory to: `dist`
4. Deploy site.

---

## Updating Portfolio Content

All personal information, projects, case studies, certifications, and skills are maintained in:
`src/data/portfolio.ts`

To add a new project or certification, simply edit that file — the UI components will reactively update.

---

## License

MIT © Elhussieny Sabry
