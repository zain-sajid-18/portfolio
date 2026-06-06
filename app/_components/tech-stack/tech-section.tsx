'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { skills, skillCategories } from '@/app/_lib/data';
import { ScrollReveal } from '@/app/_components/ui/scroll-reveal';
import { SectionHeader } from '@/app/_components/ui/section-header';

const TechGlobe = dynamic(
  () => import('./tech-globe').then((mod) => ({ default: mod.TechGlobe })),
  { ssr: false }
);

export function TechSection() {
  const [activeCategory, setActiveCategory] = useState<string>(skillCategories[0]);

  // Filter skills by selected category
  const filteredSkills = skills.filter((skill) => skill.category === activeCategory);

  return (
    <section id="tech-stack" className="shell py-24 border-t border-[var(--line)]">
      <SectionHeader
        eyebrow="02 // ENGINE"
        title="Modern Tech Stack"
        description="The technologies, environments, and methodologies I leverage to build premium web systems."
      />

      <div
        className="grid gap-12 mt-12 items-center"
        style={{
          gridTemplateColumns: 'minmax(280px, 0.95fr) minmax(0, 1.05fr)',
        }}
      >
        {/* Left: 3D Globe Visual */}
        <ScrollReveal direction="left" className="w-full">
          <div
            className="relative glass-panel overflow-hidden"
            style={{
              background: 'radial-gradient(circle at center, rgba(116,167,255,0.06), transparent 70%), var(--panel)',
            }}
          >
            <TechGlobe />
          </div>
        </ScrollReveal>

        {/* Right: Categorized Skill Dashboard */}
        <ScrollReveal direction="right" delay={0.2} className="w-full">
          <div className="flex flex-col gap-6">
            {/* Category selection */}
            <div className="flex flex-wrap gap-2">
              {skillCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`btn-ghost text-xs tracking-wider uppercase px-3.5 py-2 ${
                    activeCategory === category ? 'active-tab' : ''
                  }`}
                  style={{
                    borderRadius: 6,
                    border: '1px solid var(--line)',
                    background: activeCategory === category ? 'var(--foreground)' : 'transparent',
                    color: activeCategory === category ? 'var(--background)' : 'var(--muted)',
                  }}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Selected category skills */}
            <div className="glass-panel p-6 min-h-[260px] flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-mono text-[var(--accent-green)] uppercase tracking-wider mb-4">
                  // {activeCategory} Arsenal
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  <AnimatePresence mode="popLayout">
                    {filteredSkills.map((skill) => (
                      <motion.span
                        key={skill.name}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 py-2 text-sm font-semibold rounded-md border"
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          borderColor: 'var(--line)',
                        }}
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-8 text-xs text-[var(--soft)] font-mono">
                {activeCategory === 'Frontend' && '* Focused on clean interfaces, layout fidelity, and semantic layout hierarchy.'}
                {activeCategory === 'Backend' && '* Layered routing, centralized error handlers, and REST best-practices.'}
                {activeCategory === 'Database' && '* Schema optimization, document design, and efficient indexing queries.'}
                {activeCategory === 'Real-Time' && '* High concurrency message systems and state synchronization over websockets.'}
                {activeCategory === 'Mobile' && '* Cross-platform compilation, native API bridges, and responsive native screens.'}
                {activeCategory === 'AI & Cloud' && '* Seamless RESTful integrations with generative models and secure web hosting.'}
                {activeCategory === 'Tools' && '* Distributed version control, continuous integration, and debugger environments.'}
                {activeCategory === 'Languages' && '* Strongly-typed TS configurations, ESNext standards, and compiled codebases.'}
                {activeCategory === 'Concepts' && '* Design patterns, SOLID foundations, and object-oriented abstractions.'}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          div {
            grid-template-columns: 1fr !important;
          }
          div > :first-child {
            order: 2;
          }
        }
      `}</style>
    </section>
  );
}
