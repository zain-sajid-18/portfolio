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
      className="shell relative min-h-[100svh] grid items-center gap-10 lg:gap-16 pt-28 pb-16 hero-grid"
    >
      {/* ── Text — always first on mobile ── */}
      <motion.div
        className="relative min-h-[300px] md:min-h-[420px] lg:min-h-[580px] order-1 lg:order-none w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="hero-globe-stage absolute inset-0 min-h-[300px] md:min-h-[420px] lg:min-h-[580px]">
          <HeroCanvas />
          <div className="hero-globe-vignette" />
          <div className="absolute bottom-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--line)] bg-[var(--panel)] backdrop-blur-md text-xs font-mono text-[var(--muted)]">
            <MapPin size={11} className="text-[var(--accent-rose)]" />
            Lahore, PK
          </div>
        </div>
      </motion.div>

      <div className="order-2 lg:order-none flex flex-col justify-center">

        <motion.div className="flex items-center gap-2 mb-5" custom={0} initial="hidden" animate="visible" variants={fadeUp}>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--accent-green)]/30 bg-[var(--accent-green)]/8 text-[var(--accent-green)] text-[11px] font-mono font-semibold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
            {personalInfo.availability}
          </span>
        </motion.div>

        <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-sm text-[var(--muted)] mb-1 font-mono">Hello, I&apos;m</p>
          <h1 className="text-[clamp(32px,8vw,66px)] font-extrabold leading-[1.03] tracking-tight">
            <span className="gradient-text">{personalInfo.name}</span>
          </h1>
          <p className="text-[clamp(13px,2vw,16px)] text-[var(--muted)] mt-2 font-mono tracking-wide">
            {personalInfo.title}
          </p>
          <div className="h-[2px] mt-4 mb-5 max-w-[240px] rounded-full"
            style={{ background: 'linear-gradient(90deg, var(--accent-green), var(--accent-blue), transparent)' }} />
        </motion.div>

        <motion.p
          className="text-[clamp(13px,1.8vw,15px)] leading-[1.8] text-[var(--muted)] max-w-[520px] mb-6"
          custom={2} initial="hidden" animate="visible" variants={fadeUp}
        >
          {personalInfo.subheading}
        </motion.p>

        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-[11px] font-mono text-[var(--soft)] uppercase tracking-widest mb-3">Specialized in</p>
          <div className="flex flex-wrap gap-2 mb-7">
            {specializations.map((tag) => (
              <span key={tag} className="spec-pill">{tag}</span>
            ))}
          </div>
        </motion.div>

        <motion.div className="flex flex-wrap gap-2.5 mb-7" custom={4} initial="hidden" animate="visible" variants={fadeUp}>
          <MagneticButton as="a" href="#projects" className="btn-primary">
            <ArrowUpRight size={16} /> View Projects
          </MagneticButton>
          <MagneticButton as="a" href={`mailto:${personalInfo.email}`} className="btn-ghost">
            <Mail size={15} /> Contact
          </MagneticButton>
          <MagneticButton as="a" href={personalInfo.resumePath} download className="btn-ghost" aria-label="Download resume PDF">
            <Download size={15} /> Résumé
          </MagneticButton>
        </motion.div>

        <motion.div className="flex items-center flex-wrap gap-2.5" custom={5} initial="hidden" animate="visible" variants={fadeUp}>
          <span className="text-xs font-mono text-[var(--soft)]">Find me on</span>
          <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">GitHub</a>
          <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">LinkedIn</a>
        </motion.div>
      </div>

      <style jsx global>{`
        .hero-grid {
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
        }
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
