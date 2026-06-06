'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { personalInfo } from '@/app/_lib/data';

const HeroCanvas = dynamic(
  () => import('./hero-canvas').then((mod) => ({ default: mod.HeroCanvas })),
  { ssr: false }
);

export function HeroSection() {
  return (
    <section
      id="hero"
      className="shell relative min-h-[100dvh] flex items-center"
    >
      <div
        className="w-full grid items-center gap-12"
        style={{
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
        }}
      >
        {/* Left: 3D Earth Globe */}
        <div className="relative h-[500px]">
          <HeroCanvas />
        </div>

        {/* Right: Your Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-sm font-mono text-[var(--muted)] mb-2">Hello, I'm</p>
          <h1
            className="text-5xl md:text-6xl font-extrabold mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            {personalInfo.name}
          </h1>
          <p className="text-sm font-mono text-[var(--accent-blue)] mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)]"></span>
            @ {personalInfo.location}
          </p>
          <p
            className="text-base leading-relaxed mb-8"
            style={{ color: 'var(--muted)', maxWidth: '480px' }}
          >
            {personalInfo.subheading}
          </p>

          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
              Specialized in:
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                'Full-Stack Development',
                '3D Web Experiences',
                'Real-Time Systems',
                'AI Integration'
              ].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-mono"
                  style={{
                    border: '1px solid var(--line)',
                    background: 'rgba(255,255,255,0.04)',
                    color: 'var(--muted)'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            {personalInfo.socials.linkedin && (
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{
                  border: '1px solid var(--line)',
                  background: 'rgba(255,255,255,0.04)'
                }}
              >
                <span className="text-sm">in</span>
              </a>
            )}
            {personalInfo.socials.github && (
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{
                  border: '1px solid var(--line)',
                  background: 'rgba(255,255,255,0.04)'
                }}
              >
                <span className="text-sm">GH</span>
              </a>
            )}
            <a
              href={`mailto:${personalInfo.email}`}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{
                border: '1px solid var(--line)',
                background: 'rgba(255,255,255,0.04)'
              }}
            >
              <span className="text-sm">@</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Responsive styles */}
      <style jsx global>{`
        @media (max-width: 900px) {
          #hero > div {
            grid-template-columns: 1fr !important;
          }
          #hero > div > div:first-child {
            order: -1;
            height: 350px !important;
          }
        }
      `}</style>
    </section>
  );
}
