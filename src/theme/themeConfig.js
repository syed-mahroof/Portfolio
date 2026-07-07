/* themeConfig.js — SINGLE SOURCE OF TRUTH for the multi-theme engine.
   Each theme maps to: identity, nav component key, background key, hero
   animation key, and the accent swatches used by the ThemeSwitcher preview.
   Colours + fonts themselves live in themes.css under [data-theme="..."]. */

export const THEME_ORDER = ['cyber', 'nebula', 'aurora', 'ember', 'frost']
export const DEFAULT_THEME = 'cyber'

export const themeConfig = {
  cyber: {
    name: 'Cyber',
    icon: '⚡',
    vibe: 'Cyberpunk · Neon Matrix',
    nav: 'CyberNav',            // rigid terminal-style navbar
    background: 'CyberGrid',    // perspective horizon grid (clean, readable)
    heroAnim: 'glitch',         // GlitchText / DecryptedText
    highlight: 'shiny',         // ShinyText neon cyan/magenta
    scroll: 'snappy',
    swatch: ['#00fff2', '#ff2bd6', '#7df9ff'],
  },
  nebula: {
    name: 'Nebula',
    icon: '🪐',
    vibe: 'Cosmic · Deep Space',
    nav: 'NebulaBubbleMenu',    // ReactBits BubbleMenu (GSAP bounce)
    background: 'NebulaSpace',  // ColorBends / orbit
    heroAnim: 'blur',           // BlurText + CircularText backdrop
    highlight: 'blur',
    scroll: 'float',            // anti-gravity drift
    swatch: ['#6366f1', '#a78bfa', '#8b5cf6'],
  },
  aurora: {
    name: 'Aurora',
    icon: '🌌',
    vibe: 'Ethereal · Northern Lights',
    nav: 'AuroraGlassNav',      // frosted top nav, hide-on-scroll
    background: 'AuroraMesh',   // soft aurora mesh gradients
    heroAnim: 'split',          // SplitText char reveal
    highlight: 'split',
    scroll: 'fluid',            // water-like ease-in-out
    swatch: ['#38f9d7', '#5eead4', '#a78bfa'],
  },
  ember: {
    name: 'Ember',
    icon: '🔥',
    vibe: 'Brutalist · High-Energy',
    nav: 'EmberOverlayNav',     // full-screen slam-down overlay
    background: 'EmberBg',      // warm brutalist field
    heroAnim: 'gradient',       // GradientText + TrueFocus/FallingText
    highlight: 'gradient',
    scroll: 'spring',           // aggressive hard-stop springs
    swatch: ['#ff6b2b', '#ffcc00', '#ff3d2e'],
  },
  frost: {
    name: 'Frost',
    icon: '❄️',
    vibe: 'Minimal · Ice Glass',
    nav: 'FrostDotNav',         // side-dot scroll-position pips
    background: 'FrostGrid',    // crisp light GridMotion
    heroAnim: 'velocity',       // ScrollVelocity / TextPressure
    highlight: 'velocity',
    scroll: 'crisp',            // sharp opacity fades, no translate
    swatch: ['#3b82f6', '#06b6d4', '#0f172a'],
  },
}

export const getTheme = (key) => themeConfig[key] || themeConfig[DEFAULT_THEME]
