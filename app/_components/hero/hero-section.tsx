'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight, Mail, Download, Circle } from 'lucide-react';
import { personalInfo } from '@/app/_lib/data';
import { MagneticButton } from '@/app/_components/ui/magnetic-button';

const HeroCanvas = dynamic(
  () => import('./hero-canvas').then((mod) => ({ default: mod.HeroCanvas })),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-56 h-56 rounded-full animate-pulse bg-[var(--accent-green)]/5" />
      </div>
    ),
  }
);

const specializations = [
  'Full-Stack MERN',
  'Real-Time Systems',
  'AI Integration',
  'React Native',
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: 0.12 + i * 0.09, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export function HeroSection() {
  return (
    <section
      id="hero"
      className="shell relative min-h-[100svh] grid items-center gap-10 lg:gap-16 pt-28 pb-16 hero-grid"
    >
      {/* ── Globe visual ── */}
      <motion.div
        className="relative min-h-[300px] md:min-h-[420px] lg:min-h-[580px] order-1 lg:order-none w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="hero-globe-stage absolute inset-0 min-h-[300px] md:min-h-[420px] lg:min-h-[580px]">
          <HeroCanvas />
          <div className="hero-globe-vignette" />
          {/* Location pin overlay */}
          <div className="absolute bottom-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--line)] bg-[var(--panel)] backdrop-blur-md text-xs font-mono text-[var(--muted)]">
            <MapPin size={11} className="text-[var(--accent-rose)]" />
            Lahore, PK
          </div>
        </div>
      </motion.div>

      {/* ── Text content ── */}
      <div className="order-2 lg:order-none flex flex-col justify-center">

        {/* Availability badge */}
        <motion.div
          className="flex items-center gap-2 mb-5"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--accent-green)]/30 bg-[var(--accent-green)]/8 text-[var(--accent-green)] text-[11px] font-mono font-semibold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
            {personalInfo.availability}
          </span>
        </motion.div>

        {/* Name + title */}
        <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-sm text-[var(--muted)] mb-1 font-mono">Hello, I&apos;m</p>
          <h1 className="text-[clamp(36px,5.5vw,66px)] font-extrabold leading-[1.03] tracking-tight">
            <span className="gradient-text">{personalInfo.name}</span>
          </h1>
          <p className="text-base text-[var(--muted)] mt-2 font-mono tracking-wide">
            {personalInfo.title}
          </p>
          <div
            className="h-[2px] mt-4 mb-5 max-w-[280px] rounded-full"
            style={{
              background: 'linear-gradient(90deg, var(--accent-green), var(--accent-blue), transparent)',
            }}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-[15px] lg:text-base leading-[1.8] text-[var(--muted)] max-w-[500px] mb-7"
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {personalInfo.subheading}
        </motion.p>

        {/* Specialization pills */}
        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-xs font-mono text-[var(--soft)] uppercase tracking-widest mb-3">
            Specialized in
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {specializations.map((tag) => (
              <span key={tag} className="spec-pill">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap gap-3 mb-8"
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <MagneticButton as="a" href="#projects" className="btn-primary">
            <ArrowUpRight size={16} /> View Projects
          </MagneticButton>
          <MagneticButton as="a" href={`mailto:${personalInfo.email}`} className="btn-ghost">
            <Mail size={15} /> Contact
          </MagneticButton>
          <MagneticButton
            as="a"
            href={personalInfo.resumePath}
            download
            className="btn-ghost"
            aria-label="Download resume PDF"
          >
            <Download size={15} /> Résumé
          </MagneticButton>
        </motion.div>

        {/* Social row */}
        <motion.div
          className="flex items-center gap-3"
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <span className="text-xs font-mono text-[var(--soft)] mr-1">Find me on</span>
          <a
            href={personalInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="GitHub profile"
          >
            GitHub
          </a>
          <a
            href={personalInfo.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="LinkedIn profile"
          >
            LinkedIn
          </a>
        </motion.div>
      </div>

      <style jsx global>{`
        .hero-grid {
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
        }
        .spec-pill {
          padding: 0.35rem 0.85rem;
          border-radius: 999px;
          font-size: 12px;
          font-family: var(--font-mono);
          font-weight: 600;
          border: 1px solid var(--line);
          background: var(--surface-subtle);
          color: var(--muted);
          transition: border-color 0.2s, color 0.2s, background 0.2s, transform 0.2s;
          letter-spacing: 0.02em;
        }
        .spec-pill:hover {
          border-color: var(--accent-green);
          color: var(--foreground);
          background: rgba(91,224,173,0.07);
          transform: translateY(-1px);
        }
        .social-link {
          padding: 0.4rem 0.9rem;
          border-radius: 999px;
          border: 1px solid var(--line);
          background: var(--surface-subtle);
          color: var(--muted);
          font-size: 12px;
          font-weight: 600;
          font-family: var(--font-mono);
          transition: border-color 0.2s, color 0.2s, transform 0.2s, background 0.2s;
          letter-spacing: 0.02em;
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
