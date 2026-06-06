// ─────────────────────────────────────────────
// Constants — Theme, Animation Configs, Colors
// ─────────────────────────────────────────────

export const THEME = {
  DARK: 'dark',
  LIGHT: 'light',
} as const;

export type Theme = (typeof THEME)[keyof typeof THEME];

// ─── Color Palette ───────────────────────────

export const colors = {
  dark: {
    bg: '#08090b',
    panel: 'rgba(18, 22, 27, 0.82)',
    panelStrong: '#11161c',
    text: '#f3f7fb',
    muted: '#aab5c0',
    soft: '#707b86',
    line: 'rgba(255, 255, 255, 0.1)',
    blue: '#74a7ff',
    green: '#5be0ad',
    rose: '#ff8c9f',
    amber: '#ffd166',
  },
  light: {
    bg: '#f8f9fc',
    panel: 'rgba(255, 255, 255, 0.82)',
    panelStrong: '#ffffff',
    text: '#0f1729',
    muted: '#4a5568',
    soft: '#718096',
    line: 'rgba(0, 0, 0, 0.08)',
    blue: '#3b82f6',
    green: '#10b981',
    rose: '#f43f5e',
    amber: '#f59e0b',
  },
} as const;

// ─── Animation Configs ───────────────────────

export const animation = {
  /** Duration in seconds for standard transitions */
  duration: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.7,
    xslow: 1.2,
  },
  /** Easing curves */
  ease: {
    smooth: [0.25, 0.1, 0.25, 1] as const,
    out: [0, 0, 0.2, 1] as const,
    spring: { type: 'spring' as const, stiffness: 300, damping: 30 },
  },
  /** Stagger delay between children */
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  },
  /** Scroll reveal thresholds */
  threshold: 0.12,
} as const;

// ─── Breakpoints ─────────────────────────────

export const breakpoints = {
  sm: 540,
  md: 768,
  lg: 900,
  xl: 1180,
} as const;

// ─── Section IDs ─────────────────────────────

export const sectionIds = {
  hero: 'hero',
  about: 'about',
  techStack: 'tech-stack',
  projects: 'projects',
  experience: 'experience',
  skills: 'skills',
  achievements: 'achievements',
  testimonials: 'testimonials',
  contact: 'contact',
} as const;
