# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server on port 5174
npm run build     # Production build to /dist
npm run preview   # Preview production build
```

No lint or test commands are configured.

## Architecture

This is a React + Vite single-page anniversary celebration app written in Hebrew (RTL layout). It has no routing — all sections render sequentially on one page.

**Central data file:** `src/config.js` is the single source of truth for all personalized content: couple names, dates, timeline events, memory jar prompts, quiz questions, love letter text, and easter egg config. Any content changes should be made here.

**Component structure** (`src/components/`):
- `HeroSection` — Opening screen
- `TimelineSection` — Relationship milestones (data-driven from config)
- `MemoryJar` — Interactive SVG jar that reveals random memories
- `ReasonsSection` — Animated grid of reasons
- `QuizSection` — Gamified quiz with confetti on correct answers and score results
- `LoveLetterSection` — Envelope that opens to reveal letter
- `FloatingHearts` — Background particle animation; the single golden heart (`#c9a84c`) is the easter egg trigger
- `EasterEgg` — Modal overlay triggered by golden heart click, includes a Spotify link
- `Footer` — Closing section

**App.jsx** manages easter egg state and renders all components in z-index order, passing the easter egg handler down to `FloatingHearts`.

## Styling

- **Tailwind CSS** with custom romantic color palette (`blush`, `rose`, `burgundy`, `cream`, `ivory`, `gold`, etc.) defined in `tailwind.config.js`
- **Fonts:** Frank Ruhl Libre (display) and Heebo (body) loaded via Google Fonts in `index.html`
- **Custom animations** (floatUp, goldenPulse, fadeSlideUp, jarWiggle, sparkle, drawHeart, etc.) are defined in `src/index.css`
- **Framer Motion** handles scroll-triggered animations, transitions, spring physics, and confetti

The app uses glassmorphism cards, paper texture for the love letter, and RTL layout throughout (`dir="rtl"` in `index.html`).

## Images

Photos live in `/images` and are referenced by path in `src/config.js` timeline entries and hero section. Files include JPG, HEIC, and PNG formats.
