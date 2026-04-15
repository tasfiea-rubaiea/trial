# Project ClearRiver — Website

A high-fidelity scientific editorial website for Project ClearRiver: real-time kinetic analysis of bio-char adsorption & IoT compliance monitoring for textile wastewater treatment in Bangladesh.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Google Fonts** — DM Serif Display, DM Sans, Space Mono

## Features

- Animated particle canvas (molecular simulation)
- Live SVG charts built from real experimental data (Beer–Lambert calibration + first-order kinetics)
- Animated number counters
- Scroll-triggered section reveals
- Full responsive layout
- Sticky navigation with active section detection
- Interactive transmittance data table with compliance status

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploying to Vercel via GitHub Codespace

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — Project ClearRiver website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/clearriver.git
git push -u origin main
```

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repository
3. Framework: **Next.js** (auto-detected)
4. Root Directory: `.` (root)
5. Click **Deploy**

No environment variables needed. Vercel handles everything automatically.

## File Structure

```
clearriver/
├── app/
│   ├── globals.css         # Design system, CSS variables, animations
│   ├── layout.tsx          # Root layout with Google Fonts
│   └── page.tsx            # Main page — assembles all sections
├── components/
│   ├── Navigation.tsx      # Sticky nav with scroll detection
│   ├── HeroSection.tsx     # Canvas particle animation + opening stats
│   ├── ProblemSection.tsx  # Editorial two-column problem framing
│   ├── SolutionSection.tsx # Pipeline steps + chemistry equations
│   ├── HardwareSection.tsx # Circuit image + bill of materials
│   ├── DataSection.tsx     # Live SVG charts + transmittance table
│   ├── ResultsSection.tsx  # Animated metrics + hypothesis confirmation
│   ├── ImpactSection.tsx   # Scalability + future work + references
│   └── Footer.tsx
├── public/
│   └── assets/
│       └── circuit.png     # Arduino circuit diagram
├── package.json
├── tsconfig.json
├── next.config.ts
└── postcss.config.mjs
```

## Design System

| Token | Value |
|---|---|
| `--river-deep` | `#04080f` — primary background |
| `--river-dark` | `#0a1628` |
| `--river-teal` | `#1a6b5e` |
| `--river-bright` | `#27c9a8` — primary accent |
| `--river-glow` | `#4ef0cc` |
| `--river-accent` | `#ff6b35` — warning/highlight |
| `--river-amber` | `#f4a825` |
| `--river-paper` | `#e8ede6` — body text |

Fonts: **DM Serif Display** (headings) · **DM Sans** (body) · **Space Mono** (labels/data)
