'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight, Mail, Download } from 'lucide-react';
import { personalInfo } from '@/app/_lib/data';
import { MagneticButton } from '@/app/_components/ui/magnetic-button';

const HeroCanvas = dynamic(
  () => import('./hero-canvas').then((mod) => ({ default: mod.HeroCanvas })),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 rounded-full animate-pulse bg-[var(--accent-green)]/5" />
      </div>
    ),
  }
);

const specializations = ['Full-Stack MERN', 'Real-Time Systems', 'AI Integration', 'React Native'];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export function HeroSection() {
  return (
    <section
      id="hero"
      className="shell relative min-h-[100svh] flex flex-col justify-center gap-8 pt-24 sm:pt-28 pb-16 lg:grid lg:items-center lg:gap-10 xl:gap-16"
      style={{ gridTemplateColumns: 'minmax(0,0.95fr) minmax(0,1fr)' }}
    >
      {/* ── Globe — LEFT column on lg/xl, stacks BELOW intro on mobile (<lg) so intro is always read-first ── */}
      <motion.div
        className="order-2 lg:order-1 relative w-full h-[260px] sm:h-[340px] md:h-[420px] lg:h-[520px] xl:h-[560px] min-h-[240px]"
        style={{ minHeight: 'min(560px, 70vh)' }}
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.15, delay: 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="hero-globe-stage absolute inset-0">
          <HeroCanvas />
          <div className="hero-globe-vignette" />
          {/* Corner accents: top-right tech badge */}
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 flex flex-col gap-2 items-end pointer-events-none">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider"
              style={{
                background: 'linear-gradient(135deg, rgba(52,211,153,0.15), rgba(96,165,250,0.12))',
                border: '1px solid rgba(52,211,153,0.35)',
                color: 'var(--accent-green)',
                boxShadow: '0 4px 14px rgba(52,211,153,0.15)',
                backdropFilter: 'blur(10px)',
              }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
              Live · 3D Interactive
            </div>
          </div>
          {/* Location pill */}
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--line)] bg-[var(--panel)] backdrop-blur-md text-xs font-mono text-[var(--muted)]">
            <MapPin size={11} className="text-[var(--accent-rose)]" />
            Lahore, PK
          </div>
          {/* Bottom-right tech tag cloud */}
          <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-10 hidden sm:flex flex-wrap gap-1 w-[150px] justify-end pointer-events-none opacity-80">
            {['MERN','3D','AI','RTC'].map((t, i) => (
              <span key={t}
                className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold border"
                style={{
                  color: i % 2 === 0 ? 'var(--accent-blue)' : 'var(--accent-green)',
                  borderColor: i % 2 === 0 ? 'rgba(96,165,250,0.25)' : 'rgba(52,211,153,0.25)',
                  background: i % 2 === 0 ? 'rgba(96,165,250,0.06)' : 'rgba(52,211,153,0.05)',
                  animation: `float ${2.5 + i * 0.6}s ease-in-out ${i * 0.3}s infinite`,
                }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Intro Text — RIGHT column on lg/xl, FIRST on mobile (<lg) so recruiter reads it first ── */}
      <div className="order-1 lg:order-2 flex flex-col justify-center relative z-[1] lg:pl-2 xl:pl-4">

        <motion.div className="flex items-center gap-2 mb-4 sm:mb-5" custom={0} initial="hidden" animate="visible" variants={fadeUp}>
          <span className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-[var(--accent-green)]/30 bg-[var(--accent-green)]/8 text-[var(--accent-green)] text-[10px] sm:text-[11px] font-mono font-semibold tracking-wide relative overflow-hidden"
            style={{
              boxShadow: '0 2px 0 rgba(52,211,153,0.25), 0 0 0 1px rgba(52,211,153,0.08)',
            }}>
            <span className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[var(--accent-green)]/15 to-transparent animate-[shimmer_2.5s_ease-in-out_infinite]" style={{ backgroundSize: '200% 100%' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-pulse relative z-10" />
            <span className="relative z-10">{personalInfo.availability}</span>
          </span>
          {/* Graduating year badge */}
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border"
            style={{
              borderColor: 'rgba(129,140,248,0.35)',
              background: 'rgba(129,140,248,0.08)',
              color: 'var(--accent-blue)',
              transform: 'rotate(-2deg)',
              animation: 'float 4s ease-in-out 0.8s infinite',
            }}>
            🎓 Class of 2026
          </span>
        </motion.div>

        <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-xs sm:text-sm text-[var(--muted)] mb-1 font-mono">Hello, I&apos;m</p>
          <h1 className="text-[clamp(30px,9vw,66px)] font-extrabold leading-[1.02] tracking-tight sm:-ml-0.5">
            <span className="gradient-text inline-block hover:scale-[1.02] transition-transform duration-300 origin-left">{personalInfo.name}</span>
          </h1>
          <p className="text-[clamp(12px,2.4vw,16px)] text-[var(--muted)] mt-1.5 sm:mt-2 font-mono tracking-wide">
            {personalInfo.title}
          </p>
          <div className="h-[2px] mt-3 sm:mt-4 mb-4 sm:mb-5 max-w-[220px] sm:max-w-[240px] rounded-full relative overflow-hidden"
            style={{ background: 'linear-gradient(90deg, var(--accent-green), var(--accent-blue), transparent)' }}>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2.2s_linear_infinite]" style={{ backgroundSize: '200% 100%' }} />
          </div>
        </motion.div>

        <motion.p
          className="text-[clamp(12.5px,2vw,15px)] leading-[1.75] sm:leading-[1.8] text-[var(--muted)] max-w-[520px] mb-5 sm:mb-6"
          custom={2} initial="hidden" animate="visible" variants={fadeUp}
        >
          {personalInfo.subheading}
        </motion.p>

        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-[10px] sm:text-[11px] font-mono text-[var(--soft)] uppercase tracking-widest mb-2.5 sm:mb-3">Specialized in</p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-7 -mx-0.5">
            {specializations.map((tag, i) => (
              <span key={tag} className="spec-pill" style={{ animation: `float ${3 + i * 0.4}s ease-in-out ${i * 0.15}s infinite` }}>{tag}</span>
            ))}
          </div>
        </motion.div>

        <motion.div className="flex flex-wrap gap-2 sm:gap-2.5 mb-6 sm:mb-7" custom={4} initial="hidden" animate="visible" variants={fadeUp}>
          <MagneticButton as="a" href="#projects" className="btn-primary min-h-[44px] px-4 sm:px-5 text-[13px] sm:text-[14px]">
            <ArrowUpRight size={15} /> View Projects
          </MagneticButton>
          <MagneticButton as="a" href={`mailto:${personalInfo.email}`} className="btn-ghost min-h-[44px] px-4 sm:px-5 text-[13px] sm:text-[14px]">
            <Mail size={14} /> Contact
          </MagneticButton>
          <MagneticButton as="a" href={personalInfo.resumePath} download className="btn-ghost min-h-[44px] px-4 sm:px-5 text-[13px] sm:text-[14px]" aria-label="Download resume PDF">
            <Download size={14} /> Résumé
          </MagneticButton>
        </motion.div>

        <motion.div className="flex items-center flex-wrap gap-2 sm:gap-2.5" custom={5} initial="hidden" animate="visible" variants={fadeUp}>
          <span className="text-[11px] sm:text-xs font-mono text-[var(--soft)]">Find me on</span>
          <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">GitHub</a>
          <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">LinkedIn</a>
          {/* Location signature badge — narrow screens only */}
          <span className="sm:hidden ml-auto inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono font-semibold border border-[var(--line)] text-[var(--soft)]">
            <MapPin size={10} className="text-[var(--accent-rose)]" /> Lahore
          </span>
        </motion.div>
      </div>

      <style jsx global>{`
        .spec-pill {
          padding: 0.3rem 0.8rem;
          border-radius: 999px;
          font-size: 12px;
          font-family: var(--font-mono);
          font-weight: 600;
          border: 1px solid var(--line);
          background: var(--surface-subtle);
          color: var(--muted);
          transition: border-color 0.2s, color 0.2s, background 0.2s, transform 0.2s;
          letter-spacing: 0.02em;
          white-space: nowrap;
        }
        .spec-pill:hover {
          border-color: var(--accent-green);
          color: var(--foreground);
          background: rgba(91,224,173,0.07);
          transform: translateY(-1px);
        }
        .social-link {
          padding: 0.35rem 0.85rem;
          border-radius: 999px;
          border: 1px solid var(--line);
          background: var(--surface-subtle);
          color: var(--muted);
          font-size: 12px;
          font-weight: 600;
          font-family: var(--font-mono);
          white-space: nowrap;
          transition: border-color 0.2s, color 0.2s, transform 0.2s, background 0.2s;
        }
        .social-link:hover {
          border-color: var(--accent-blue);
          color: var(--accent-blue);
          background: rgba(116,167,255,0.07);
          transform: translateY(-2px);
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
