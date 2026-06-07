'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { skills, skillCategories, techGlobeItems } from '@/app/_lib/data';
import { ScrollReveal } from '@/app/_components/ui/scroll-reveal';

const TechGlobe = dynamic(
  () => import('./tech-globe').then((mod) => ({ default: mod.TechGlobe })),
  { ssr: false }
);

const categoryHints: Record<string, string> = {
  Frontend: 'Clean interfaces, layout fidelity, semantic hierarchy.',
  Backend: 'Layered routing, centralized error handlers, REST best-practices.',
  Database: 'Schema optimization, indexing, aggregation pipelines.',
  'Real-Time': 'WebSocket concurrency, state sync, event-driven flows.',
  Mobile: 'Cross-platform React Native, native API bridges.',
  'AI & Cloud': 'Generative API integrations, secure deployment.',
  Tools: 'Git workflows, CI, debugging environments.',
  Languages: 'TypeScript-first, ESNext standards.',
  Concepts: 'SOLID, design patterns, system design.',
};

export function TechSection() {
  const [activeCategory, setActiveCategory] = useState<string>(skillCategories[0]);
  const filteredSkills = skills.filter((skill) => skill.category === activeCategory);

  return (
    <section id="tech-stack" className="relative py-28 border-t border-[var(--line)] overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(116,167,255,0.06), transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(91,224,173,0.05), transparent 45%)',
        }}
      />

      <div className="shell relative">
        <ScrollReveal direction="up">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="eyebrow justify-center mb-4">
              <span className="dot" />
              02 // Engine
            </p>
            <h2 className="text-[clamp(30px,4vw,48px)] font-extrabold leading-tight">
              Technology{' '}
              <span className="gradient-text">Constellation</span>
            </h2>
            <p className="text-[var(--muted)] mt-4 leading-relaxed">
              A living map of the tools and frameworks powering production-grade systems.
            </p>
          </div>
        </ScrollReveal>

        {/* Marquee strip */}
        <div className="marquee-wrap mb-12 overflow-hidden rounded-full border border-[var(--line)] bg-white/[0.02] py-3">
          <div className="marquee-track">
            {[...techGlobeItems, ...techGlobeItems].map((item, i) => (
              <span key={`${item.name}-${i}`} className="marquee-item" style={{ color: item.color }}>
                {item.name}
              </span>
            ))}
          </div>
        </div>

        <div className="tech-grid gap-6 items-stretch">
          {/* 3D Globe panel */}
          <ScrollReveal direction="left" className="tech-globe-panel">
            <div className="gradient-border-wrap h-full min-h-[480px]">
              <div className="gradient-border-inner h-full relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 50%, rgba(116,167,255,0.12), transparent 65%)',
                  }}
                />
                <TechGlobe />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs font-mono text-[var(--soft)]">
                  <span>Interactive 3D</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
                    Live orbit
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Skills dashboard */}
          <ScrollReveal direction="right" delay={0.15} className="tech-skills-panel">
            <div className="gradient-border-wrap h-full">
              <div className="gradient-border-inner p-6 lg:p-8 h-full flex flex-col">
                <div className="flex flex-wrap gap-2 mb-6">
                  {skillCategories.map((category) => {
                    const isActive = activeCategory === category;
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setActiveCategory(category)}
                        className={cn(
                          'category-pill',
                          isActive && 'category-pill-active'
                        )}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>

                <div className="flex-1 flex flex-col">
                  <motion.h4
                    key={activeCategory}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm font-mono text-[var(--accent-green)] uppercase tracking-wider mb-5"
                  >
                    {'// '}{activeCategory}
                  </motion.h4>

                  <div className="flex flex-wrap gap-2.5 flex-1 content-start">
                    <AnimatePresence mode="popLayout">
                      {filteredSkills.map((skill, i) => (
                        <motion.span
                          key={skill.name}
                          layout
                          initial={{ opacity: 0, scale: 0.85, y: 8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.85 }}
                          transition={{ duration: 0.25, delay: i * 0.03 }}
                          className="skill-chip group"
                        >
                          <span className="skill-chip-glow" />
                          {skill.name}
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </div>

                  <p className="text-xs font-mono text-[var(--soft)] mt-6 pt-4 border-t border-[var(--line)]">
                    * {categoryHints[activeCategory] ?? 'Production-ready tooling.'}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <style jsx global>{`
        .tech-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
        }
        .gradient-border-wrap {
          padding: 1px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(116,167,255,0.35), rgba(91,224,173,0.2), rgba(255,255,255,0.05));
        }
        .gradient-border-inner {
          border-radius: 15px;
          background: var(--panel);
          backdrop-filter: blur(20px);
        }
        .marquee-track {
          display: flex;
          gap: 2rem;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .marquee-item {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 600;
          white-space: nowrap;
          opacity: 0.85;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .category-pill {
          font-size: 11px;
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid var(--line);
          background: transparent;
          color: var(--muted);
          cursor: pointer;
          transition: all 0.25s;
        }
        .category-pill-active {
          background: var(--foreground);
          color: var(--background);
          border-color: transparent;
          box-shadow: 0 4px 16px rgba(116,167,255,0.2);
        }
        .category-pill:hover:not(.category-pill-active) {
          border-color: var(--accent-blue);
          color: var(--foreground);
        }
        .skill-chip {
          position: relative;
          overflow: hidden;
          padding: 10px 16px;
          font-size: 13px;
          font-weight: 600;
          border-radius: 10px;
          border: 1px solid var(--line);
          background: rgba(255,255,255,0.03);
          transition: border-color 0.25s, transform 0.25s;
        }
        .skill-chip:hover {
          border-color: rgba(116,167,255,0.4);
          transform: translateY(-2px);
        }
        .skill-chip-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(116,167,255,0.08) 50%, transparent 60%);
          transform: translateX(-100%);
          transition: transform 0.5s;
        }
        .skill-chip:hover .skill-chip-glow {
          transform: translateX(100%);
        }
        @media (max-width: 900px) {
          .tech-grid { grid-template-columns: 1fr; }
          .tech-globe-panel { order: 2; }
        }
      `}</style>
    </section>
  );
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
