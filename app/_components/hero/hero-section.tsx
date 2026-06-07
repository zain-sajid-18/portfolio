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
        <div className="w-64 h-64 rounded-full animate-pulse bg-[var(--accent-green)]/5" />
      </div>
    ),
  }
);

const specializations = [
  'Full-Stack Development',
  '3D Web Experiences',
  'Real-Time Systems',
  'AI Integration',
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.15 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export function HeroSection() {
  return (
    <section
      id="hero"
      className="shell relative min-h-[100svh] grid items-center gap-10 lg:gap-16 pt-28 pb-16 hero-grid"
    >
      <motion.div
        className="relative min-h-[420px] lg:min-h-[580px] order-1 lg:order-none"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="hero-globe-stage absolute inset-0 min-h-[420px] lg:min-h-[580px]">
          <HeroCanvas />
          <div className="hero-globe-vignette" />
        </div>
      </motion.div>

      <div className="order-2 lg:order-none flex flex-col justify-center">
        <motion.p
          className="text-sm text-[var(--muted)] mb-2"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          Hello, I&apos;m
        </motion.p>

        <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp}>
          <h1 className="text-[clamp(38px,5.5vw,68px)] font-extrabold leading-[1.05] tracking-tight">
            <span className="gradient-text">{personalInfo.name}</span>
          </h1>
          <p className="text-base text-[var(--muted)] mt-2 font-mono">{personalInfo.title}</p>
          <div
            className="h-[2px] mt-4 mb-5 max-w-[320px]"
            style={{
              background: 'linear-gradient(90deg, var(--accent-green), var(--accent-blue), transparent)',
            }}
          />
        </motion.div>

        <motion.div
          className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6"
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <MapPin size={14} className="text-[var(--accent-green)] shrink-0" />
          <span>{personalInfo.location}</span>
        </motion.div>

        <motion.p
          className="text-base lg:text-lg leading-[1.75] text-[var(--muted)] max-w-[520px] mb-8"
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {personalInfo.subheading}
        </motion.p>

        <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-sm font-semibold mb-3">Specialized in:</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {specializations.map((tag) => (
              <span key={tag} className="spec-pill">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-3 mb-8"
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <MagneticButton as="a" href="#projects" className="btn-primary">
            <ArrowUpRight size={16} /> View Projects
          </MagneticButton>
          <MagneticButton as="a" href={`mailto:${personalInfo.email}`} className="btn-ghost">
            <Mail size={16} /> Contact
          </MagneticButton>
          <MagneticButton
            as="a"
            href={personalInfo.resumePath}
            download
            className="btn-ghost"
            aria-label="Download resume PDF"
          >
            <Download size={16} /> Resume
          </MagneticButton>
        </motion.div>

        <motion.div
          className="flex items-center gap-3"
          custom={6}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
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
          <a href={`mailto:${personalInfo.email}`} className="social-link" aria-label="Email">
            Email
          </a>
        </motion.div>
      </div>

      <style jsx global>{`
        .hero-grid {
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
        }
        .spec-pill {
          padding: 0.4rem 0.9rem;
          border-radius: 999px;
          font-size: 12px;
          font-family: var(--font-mono);
          border: 1px solid var(--line);
          background: var(--surface-subtle);
          color: var(--muted);
          transition: border-color 0.2s, color 0.2s;
        }
        .spec-pill:hover {
          border-color: var(--accent-green);
          color: var(--foreground);
        }
        .social-link {
          padding: 0.5rem 1rem;
          border-radius: 999px;
          border: 1px solid var(--line);
          background: var(--surface-subtle);
          color: var(--muted);
          font-size: 12px;
          font-weight: 600;
          transition: border-color 0.2s, color 0.2s, transform 0.2s;
        }
        .social-link:hover {
          border-color: var(--accent-blue);
          color: var(--foreground);
          transform: translateY(-2px);
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
