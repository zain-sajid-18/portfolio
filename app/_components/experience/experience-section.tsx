'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Award, Code, Users } from 'lucide-react';
import { timeline } from '@/app/_lib/data';
import { ScrollReveal } from '@/app/_components/ui/scroll-reveal';
import { SectionHeader } from '@/app/_components/ui/section-header';

export function ExperienceSection() {
  const [filter, setFilter] = useState<'all' | 'education' | 'project' | 'certification' | 'achievement'>('all');

  const filteredTimeline = filter === 'all'
    ? timeline
    : timeline.filter((item) => item.type === filter);

  const getIcon = (type: string) => {
    switch (type) {
      case 'education':
        return <BookOpen size={16} />;
      case 'certification':
        return <Award size={16} />;
      case 'project':
        return <Code size={16} />;
      default:
        return <Users size={16} />;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'education':
        return 'var(--accent-blue)';
      case 'project':
        return 'var(--accent-green)';
      case 'certification':
        return 'var(--accent-rose)';
      default:
        return 'var(--accent-amber)';
    }
  };

  return (
    <section id="experience" className="shell py-24 border-t border-[var(--line)]">
      <SectionHeader
        eyebrow="04 // ROADMAP"
        title="Education & Journey"
        description="A timeline of software engineering education, industrial projects, certifications, and professional involvement."
      />

      {/* Interactive Filters */}
      <div className="flex flex-wrap gap-2 mt-8 justify-center">
        {(['all', 'education', 'project', 'certification', 'achievement'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`btn-ghost text-xs tracking-wider uppercase px-4 py-2 ${
              filter === type ? 'active-filter' : ''
            }`}
            style={{
              borderRadius: 20,
              border: '1px solid var(--line)',
              background: filter === type ? 'var(--foreground)' : 'transparent',
              color: filter === type ? 'var(--background)' : 'var(--muted)',
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Vertical Timeline */}
      <div className="relative max-w-2xl mx-auto mt-14 pl-8 md:pl-0">
        {/* Center line (visible on desktop) */}
        <div
          className="absolute top-0 bottom-0 left-0 md:left-1/2 w-[1px] bg-[var(--line)]"
          style={{ transform: 'translateX(-50%)' }}
        />

        <div className="grid gap-12 relative">
          <AnimatePresence mode="popLayout">
            {filteredTimeline.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                  className={`relative flex flex-col md:flex-row md:items-center ${
                    isEven ? 'md:justify-start' : 'md:justify-end'
                  }`}
                >
                  {/* Circle Indicator on vertical line */}
                  <div
                    className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full border grid place-items-center bg-[var(--background)]"
                    style={{
                      transform: 'translateX(-50%)',
                      borderColor: getIconColor(item.type),
                      color: getIconColor(item.type),
                      boxShadow: `0 0 10px ${getIconColor(item.type)}40`,
                    }}
                  >
                    {getIcon(item.type)}
                  </div>

                  {/* Panel card content wrapper */}
                  <div
                    className={`w-full md:w-[calc(50%-32px)] ${
                      isEven ? 'md:pr-0 md:mr-auto' : 'md:pl-0 md:ml-auto'
                    }`}
                  >
                    <ScrollReveal direction={isEven ? 'left' : 'right'} delay={0.05}>
                      <div className="glass-panel p-6 relative">
                        {/* Triangular arrow pointer for card (Desktop only) */}
                        <div
                          className={`hidden md:block absolute top-6 w-3 h-3 rotate-45 border bg-[var(--panel)]`}
                          style={{
                            [isEven ? 'right' : 'left']: -7,
                            borderTop: isEven ? 'none' : '1px solid var(--line)',
                            borderRight: isEven ? '1px solid var(--line)' : 'none',
                            borderBottom: isEven ? '1px solid var(--line)' : 'none',
                            borderLeft: isEven ? 'none' : '1px solid var(--line)',
                          }}
                        />

                        {/* Date info */}
                        <span className="text-xs font-mono text-[var(--soft)] uppercase tracking-wider block mb-2">
                          {item.date}
                        </span>

                        <h3 className="text-lg font-bold">{item.title}</h3>

                        <h4
                          className="text-sm font-medium mt-1"
                          style={{ color: getIconColor(item.type) }}
                        >
                          {item.subtitle}
                        </h4>

                        <p className="text-sm text-[var(--muted)] mt-3 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </ScrollReveal>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
