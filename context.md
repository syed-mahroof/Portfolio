# Portfolio React Application Context

## Overview
This is a comprehensive portfolio application for Syed Mahroof, a Full-Stack Developer. It's built with React, Vite, and heavily utilizes Framer Motion for cinematic, high-performance animations including scroll-driven parallax, springs, and SVGs. The design embraces a modern, glassmorphic, and dynamic aesthetic with interactive micro-animations.

## Tech Stack
- **Frontend Framework**: React 18 with Vite
- **Animations**: Framer Motion (heavy use of `useScroll`, `useTransform`, `useSpring`, `useVelocity`, `AnimatePresence`, `layoutId`)
- **Styling**: Vanilla CSS with custom classes (e.g., `.glass`, `.glass-glow`, `.glass-card`)
- **Other Libraries**: `@emailjs/browser` (Contact form), `GSAP`

---

## Core Components & Architecture

### Pages (Sections)
1. **Hero (`Hero.jsx`)**
   - Cinematic mask-reveal hero section.
   - Features a typewriter effect for roles and scroll-driven parallax moving the text and glowing backgrounds.
   - Showcases metrics and social links.

2. **About (`About.jsx`)**
   - Profile overview and statistics (4+ Live Projects, 2+ Years Experience, 5+ Technologies).
   - Features a dynamic image presentation with animated rings.
   - Personal info: Age 24, Muvattupuzha Kerala, syedmahroof2002@gmail.com, +91 7025195638.

3. **Skills (`Skills.jsx`)**
   - Categorized elastic skill grid that reacts to scroll velocity (skew and drift effects).
   - Showcases technical toolbox (Backend, Frontend, Cloud/DevOps) and certifications.
   - Certifications: AWS Cloud Practitioner Essentials (2026), Google AI Essentials (2026), Introduction to Cybersecurity – Cisco (2026).
   - Includes `CiscoIcon.jsx` — a custom inline SVG component for the Cisco cert badge (no external icon library dependency).

4. **Projects (`Projects.jsx`)**
   - **Top 3 (pinned horizontal scroll):** TaskFlow, Driver's Diary, Soorath Autos. Uses `framer-motion` to map vertical scroll progress to horizontal translation on desktop; stacks vertically on mobile/reduced-motion.
   - **Secondary "More Builds" grid (5 cards):** Ananta Nethralaya, Al Afzah Group, HeadGreen!, Netflix Clone, Postgram.
   - The secondary grid uses `display: flex; flex-wrap: wrap; justify-content: center` so the last card is centered regardless of row size.
   - **Bug fix:** `.glass-glow::after` pseudo-element has `pointer-events: none` so it never blocks clicks on interactive children like project links.

5. **Work Experience (`WorkExperience.jsx`)**
   - Features a living SVG timeline that dynamically draws its axis based on the user's scroll position.
   - Uses glowing nodes and status badges to indicate Recent, Completed, or Ongoing roles.
   - Roles: Junior Backend Developer @ Al Imtedad Solutions (Dec 2025 – Apr 2026), IT Support Engineer @ Safecare Technology (May – Nov 2025), Full-Stack Developer Freelance (2025 – Present).

6. **Contact (`Contact.jsx`)**
   - Houses the contact form, integrated with EmailJS.
   - Wrapped in the visually striking `ElectricBorder` component for a futuristic feel.

### Key UI Components

- **`ThemeSwitcher.jsx`** *(Premium rebuild — see details below)*: Kinetic Framer Motion glassmorphic dropdown for choosing the active theme.
- **`ElectricBorder.jsx`**: Animated crackling border powered by SVG `<feTurbulence>` + `<feDisplacementMap>` filters. CSS-layered so distortion never scrambles inner content.
- **`Footer.jsx`**: Global footer with quick nav, live project links (Ananta Nethralaya, Al Afzah Group, Soorath Autos, HeadGreen!), and contact info with smooth scroll.
- **`CiscoIcon.jsx`**: Custom inline SVG React component for the Cisco certification icon.
- **`MagneticButton.jsx` / `ThemedHeroTitle.jsx`**: Shared components for interactive, themed hero experiences.
- **`CustomCursor.jsx`**: rAF-lerped ring cursor with spring lag. Morphs shape on hover over interactive targets (`a`, `button`, `.glass-card`). Hidden on touch devices.

### Shared CSS Utilities (`src/index.css`)
- `.glass` — glassmorphic card base: `background: var(--glass-bg)`, `border`, `backdrop-filter`, `border-radius`.
- `.glass-glow` — adds an animated conic-gradient spinning border on `::after`. **Critical:** `pointer-events: none` is set on `::after` to prevent the pseudo-element from blocking child interactions.
- `.glass-card` — radius-only modifier, synced to the active theme's `--ui-radius`.

---

## Multi-Theme Engine

### Available Themes (`src/theme/themeConfig.js`)
The portfolio ships 5 distinct visual personalities, each wiring its own nav, background, hero animation, and color palette:

| Key | Name | Aesthetic | Nav Component | Background |
|---|---|---|---|---|
| `cyber` | Cyber | Cyberpunk · Neon Matrix | `CyberNav` | `CyberGrid` |
| `nebula` | Nebula | Cosmic · Deep Space | `NebulaBubbleMenu` | `NebulaSpace` |
| `aurora` | Aurora | Ethereal · Northern Lights | `AuroraGlassNav` | `AuroraMesh` |
| `ember` | Ember | Brutalist · High-Energy | `EmberOverlayNav` | `EmberBg` |
| `frost` | Frost | Minimal · Ice Glass | `FrostDotNav` | `FrostGrid` |

Each entry carries: `name`, `icon`, `vibe`, `nav`, `background`, `heroAnim`, `highlight`, `scroll`, `swatch[]`.

### ThemeContext (`src/context/ThemeContext.jsx`)
Implements **Smart Theme Roulette** — flicker-free random theme on every page load.

- **Lazy `useState` init**: `useState(getInitialTheme)` runs synchronously only on first render.
- **`useLayoutEffect`**: Fires before browser paint → zero Flash of Unstyled Content (FOUC).
- **Exclude-last logic**: Previous theme filtered from the candidate pool; new pick persisted immediately.

**Context API:**
```js
const { currentTheme, setCurrentTheme, cycleTheme, config, themes, order } = useTheme()
```
- `currentTheme` — active theme key string
- `setCurrentTheme(key)` — switch to any valid theme
- `cycleTheme()` — advances through `THEME_ORDER`
- `config` — full theme object `{ nav, background, heroAnim, scroll, … }`
- `themes` — entire `themeConfig` object
- `order` — `THEME_ORDER` array

**DOM attributes written per change:**
- `<html>` → `data-theme="<key>"`
- `<body>` → `data-theme`, `data-scroll`, `data-mode="light|dark"`

**Storage key:** `portfolio-theme` in `localStorage`

### ThemeSwitcher (`src/components/ThemeSwitcher.jsx`)
Completely rebuilt as a premium Framer Motion component.

| Feature | How |
|---|---|
| Trigger pill | `motion.button`, `whileHover`/`whileTap`, spring physics, frosted-glass backdrop |
| Icon swap | `motion.span key={currentTheme}` re-mounts on change → scale+rotate entrance |
| Chevron rotation | `animate={{ rotate: isOpen ? 180 : 0 }}` |
| Menu reveal | `AnimatePresence` + `variants` — scale `0.88→1`, `y: -12→0`, bouncy spring |
| Staggered rows | `staggerChildren: 0.048`, each row slides in `x: -10→0` |
| Active pill | `layoutId="ts-active-pill"` — Framer Motion smoothly morphs position across rows |
| Row micro-interaction | `whileHover={{ scale: 1.02, x: 5 }}` on non-active rows |
| Swatch entrance | Custom variants with `custom={i}` index-delayed scale bounce |
| Checkmark | `AnimatePresence` rotate-in/out |
| Outside dismiss | `useRef` + `mousedown`/`touchstart` listener |
| Layout | CSS Grid `26px 1fr auto auto` — icon, text, swatches, check perfectly aligned |
| Frost theme | Panel opens `left: 0` (right-auto) to stay inside viewport |

### Theme Switcher Dock Placement (`src/App.css`)
The `.theme-switch-dock` is `position: fixed; z-index: 950` with per-theme overrides to avoid nav collisions:

| Theme | Position |
|---|---|
| `cyber` | `top: 7px; right: 12px` |
| `aurora` | `top: 13px; right: 16px` |
| `ember` | `top: 12px; right: 140px` (left of burger) |
| `nebula` | `top: 14px; right: 16px` |
| `frost` | `top: 14px; left: 16px` (right: auto — avoids side pips) |
