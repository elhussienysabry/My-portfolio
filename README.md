# Elhussieny Sabry — Data Engineer Portfolio

A light editorial portfolio for a data engineer: warm paper tones, electric accents, a live
pipeline preview, in-depth project case studies, verified credentials, open-source work, and a
small grid-restoration puzzle.

Built with **React 19**, **TypeScript**, **Vite 6**, **Tailwind CSS v4**, **Framer Motion**, and
**Lucide** icons. Fonts are self-hosted; there is no backend and no tracking.

---

## Highlights

- **Bento project gallery** with category filters and accessible detail dialogs.
- **Case studies** covering schema drift, idempotent loads, data quality gates, and observability.
- **Certifications** with real certificate previews and a keyboard-friendly lightbox.
- **Open-source section** featuring verified Apache Airflow and pandas pull requests.
- **Interactive engineering roadmap** from Python fundamentals to database internals, with a
  scroll-linked path, chapter jump rail, expandable milestone details, evidence notes, and a
  distinct future horizon for Apache Kafka and Cloud Storage.
- **Interactive architecture map** connecting sources, Kafka, Spark, cloud storage, and analytics,
  with clickable nodes and honest built/next/planned states.
- **Take a Break — Data Pipeline Challenge**: order Source → Ingestion → Processing → Storage →
  Analytics. Drag and drop on desktop, tap-to-place and arrow controls on touch devices. Includes a
  timer, attempt count, score, local best score, confetti, success state, and replay.
- **Motion with care**: Framer Motion transitions respect `prefers-reduced-motion`; the layout is
  responsive from 360 px upward.
- **CV download and view** links served from `public/CV.pdf`.
- **SEO and sharing**: Open Graph/Twitter metadata, a generated 1200×630 OG image, favicon, and
  robots configuration.

---

## Design System

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#f7f4ec` | Page canvas |
| Cream | `#fffdf8` | Cards and panels |
| Ink | `#15161f` | Primary text |
| Electric blue | `#2f55ff` | Links, focus, primary accent |
| Cyan | `#00a6c4` | Data/ingestion accents |
| Violet | `#7357ff` | Processing accents |
| Green | `#0a7d5c` | Success and health states |
| Coral | `#f25555` | Errors and warnings |
| Orange | `#ff7a2f` | Analytics and energy |
| Yellow | `#e3ac1f` | Highlights and stickers |

Typography pairs **Bricolage Grotesque** for display, **DM Sans** for body copy, **Instrument
Serif** for editorial italics, and **JetBrains Mono** for labels and data. All font files are
served locally from `public/fonts/`.

---

## Project Structure

```
portfolio/
├── public/
│   ├── CV.pdf                         # Latest CV (one page, A4)
│   ├── og-image.png                   # 1200×630 social preview
│   ├── avatar.jpg
│   ├── certificates/
│   │   └── nasa_space_apps_2026.webp
│   ├── fonts/                         # Self-hosted WOFF2 fonts
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── layout/Layout.tsx          # Navbar, mobile menu, footer, scroll-to-top
│   │   ├── sections/                  # Hero, About, Skills, Projects, Case Studies,
│   │   │                              # Certifications, Open Source, Journey, Game, Contact
│   │   └── ui/Components.tsx          # Section, FadeInView, Card, Badge, dividers
│   ├── data/portfolio.ts              # Single source of truth for content
│   ├── hooks/usePortfolio.ts          # Active section, scroll progress, motion helpers
│   ├── styles/globals.css             # Tokens, font faces, utilities, reduced-motion rules
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
├── vercel.json                        # Vercel build/output, headers, caching
└── package.json
```

---

## Local Development

Requires Node.js 20+ and npm 10+.

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck
npm run build      # type-check + production build to dist/
npm run preview    # http://localhost:4173
```

Content lives in [`src/data/portfolio.ts`](src/data/portfolio.ts); section components are mostly
presentational. Roadmap milestones, statuses, objectives, evidence, and cross-technology
connections all live in `roadmapMilestones`. Update the CV by replacing `public/CV.pdf` with the
latest PDF (keep the filename).

### Roadmap statuses

| Status | Meaning |
| --- | --- |
| `completed` | Built and applied in a project on this site. |
| `explored` | Studied and experimented with, but not production-built. |
| `current` | Active study right now. |
| `next` | The next planned learning goal. |
| `planned` | A future goal after the previous milestone. |

Apache Kafka is `next`; Cloud Storage & Cloud Data Infrastructure is `planned` after Kafka. Both
render as dark "future horizon" cards and explicitly state that they are not current experience.
Hadoop and Airflow are `explored`; database internals and distributed systems are `current`.

---

## Signal Sync (Play section)

`src/components/sections/GameSection.tsx` contains a self-contained puzzle with no backend, login,
or external services:

- Three sectors — 3×3 (Bootstrap), 4×4 (Throughput), 5×5 (Orchestration). Puzzles are generated by
  scattering presses from a fully restored board, so a solution always exists.
- A move toggles one node and its four orthogonal neighbours. Restore every node before the move
  budget for that sector runs out.
- Scoring: sector base (120 / 220 / 340) + 15 per spare move + 2 points per second under 90.
  The best run total persists in `localStorage` under `es-signal-sync-best-v1`.
- States: start screen with rules, live play, per-sector clear, run clear, and a signal-lost state
  with retry (same board) or restart from sector 01. A reset button restores the current board.
- Controls: pointer/touch taps, plus a roving keyboard cursor — arrow keys move, Home/End jump,
  Space/Enter flips. The grid exposes node coordinates and online/offline state to assistive tech.
- Motion: overlays and meters use transforms/opacity only; `prefers-reduced-motion` removes the
  offsets and the spring/ticks while keeping every interaction functional.

---

## Deployment

### GitHub Pages

The site deploys automatically to **https://elhussieny.site/** (custom domain backed by `elhussienysabry.github.io`) through
`.github/workflows/deploy-pages.yml`.

- Pushes to `master` build the site and publish `dist` with GitHub's Pages actions.
- Pages uses **Settings → Pages → Source: GitHub Actions** with custom domain `elhussieny.site`.
- The `public/CNAME` file ensures the custom domain configuration persists across workflow runs.
- `import.meta.env.BASE_URL` resolves the CV, avatar, certificate image, and social preview image.
- To deploy manually: **Actions → Deploy to GitHub Pages → Run workflow**.

### Vercel

`vercel.json` configures the Vite build, output directory, long-lived asset caching, security
headers, and inline PDF delivery for the CV.

1. Import the GitHub repository at [vercel.com/new](https://vercel.com/new).
2. Vercel detects Vite; the config supplies `npm run build` and `dist`.
3. Deploy. No environment variables are required.

To test a deployment without logging in:

```bash
npx vercel deploy --temporary --yes --verify
```

The resulting URL is temporary until claimed in Vercel. A logged-in `vercel deploy --prod` creates
a persistent production deployment.

`netlify.toml` is intentionally omitted; Netlify can use `npm run build` and `dist` directly.

---

## Quality Checks

- `npm run typecheck` — strict TypeScript, no errors.
- `npm run build` — production bundle generated to `dist/`.
- Lighthouse (mobile, local production preview): Performance 79–81 (run variance), Accessibility
  100, Best Practices 100, SEO 100, CLS 0. The performance score reflects the motion-heavy hero
  and roadmap; accessibility remains a hard constraint.
- Manual QA covers desktop/tablet/mobile layouts, all navigation links, CV download/view,
  game completion/error/replay, reduced motion, and console/network errors.
- Signal Sync QA: full three-sector solve, signal-lost and retry, keyboard-only play, best-score
  persistence, reduced motion, and no horizontal overflow at 320/390/768/1024/1440 px.
- Hero stack ribbon QA: four duplicated groups translate by exactly −50% for a seamless loop,
  hover/focus and manual pause both halt it, and reduced motion falls back to a static wrapped list.
- Footer QA: the first name fits its container at 320–1440 px with no clipped or invisible letters.
- Roadmap QA covers every status label, all 11 Kafka objectives, all 12 Cloud Storage objectives,
  expandable cards, chapter jump links, architecture node focus/click states, the horizontal mobile
  chapter rail, reduced-motion behavior, and overflow at 390 px.

---

## Contact

- GitHub: [elhussienysabry](https://github.com/elhussienysabry)
- LinkedIn: [in/elhussienysabry](https://www.linkedin.com/in/elhussienysabry/)
- Email: elhussienysabry@gmail.com
- Location: Menoufia, Egypt

---

MIT © Elhussieny Sabry
