'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Award, Code, Users } from 'lucide-react';
import { timeline } from '@/app/_lib/data';
import { ScrollReveal } from '@/app/_components/ui/scroll-reveal';
import { SectionHeader } from '@/app/_components/ui/section-header';

type FilterType = 'all' | 'education' | 'project' | 'certification' | 'achievement';

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all',          label: 'All'       },
  { value: 'education',    label: 'Education' },
  { value: 'project',      label: 'Projects'  },
  { value: 'certification',label: 'Certs'     },
  { value: 'achievement',  label: 'Community' },
];

const TYPE_CONFIG: Record<string, { color: string; bg: string; glow: string }> = {
  education:     { color: 'var(--accent-blue)',  bg: 'rgba(116,167,255,0.1)', glow: 'rgba(116,167,255,0.35)' },
  project:       { color: 'var(--accent-green)', bg: 'rgba(91,224,173,0.1)',  glow: 'rgba(91,224,173,0.35)'  },
  certification: { color: 'var(--accent-rose)',  bg: 'rgba(255,140,159,0.1)', glow: 'rgba(255,140,159,0.35)' },
  achievement:   { color: 'var(--accent-amber)', bg: 'rgba(255,209,102,0.1)', glow: 'rgba(255,209,102,0.35)' },
};

function getIcon(type: string) {
  switch (type) {
    case 'education':     return <BookOpen size={14} />;
    case 'certification': return <Award size={14} />;
    case 'project':       return <Code size={14} />;
    default:              return <Users size={14} />;
  }
}

export function ExperienceSection() {
  const [filter, setFilter] = useState<FilterType>('all');
  const filteredTimeline = filter === 'all' ? timeline : timeline.filter((i) => i.type === filter);

  return (
    <section id="experience" className="shell py-16 sm:py-24 border-t border-[var(--line)]">
      <SectionHeader
        eyebrow="04 // ROADMAP"
        title="Education & Journey"
        description="A timeline of software engineering education, capstone projects, certifications, and professional involvement."
      />

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mt-7 sm:mt-8 justify-center">
        {FILTERS.map(({ value, label }) => {
          const isActive = filter === value;
          return (
            <motion.button
              key={value}
              onClick={() => setFilter(value)}
              whileTap={{ scale: 0.96 }}
              className="exp-filter-pill"
              data-active={isActive}
              aria-pressed={isActive}
            >
              {isActive && (
                <motion.span layoutId="exp-filter-bg" className="exp-filter-pill-bg"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
              )}
              <span className="relative z-10">{label}</span>
            </motion.button>
          );
        })}
      </div>

      {/*
        Timeline layout:
        Mobile  — single left-rail, cards full-width with left padding for the rail + node
        Desktop — alternating left/right around a centred rail
      */}
      <div className="relative max-w-2xl mx-auto mt-12 sm:mt-14">
        {/* Rail line */}
        <motion.div
          className="timeline-rail absolute top-0 bottom-0 w-px"
          style={{
            left: '20px',
            background: 'linear-gradient(to bottom, transparent, var(--accent-blue), var(--accent-green), transparent)',
            opacity: 0.35,
          }}
          initial={{ scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />

        <div className="grid gap-8 sm:gap-10 relative">
          <AnimatePresence mode="popLayout">
            {filteredTimeline.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const cfg = TYPE_CONFIG[item.type] ?? TYPE_CONFIG.achievement;

              return (
                <motion.div
                  key={item.id} layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14, scale: 0.97 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className={`relative
                    /* mobile: full width, padded left to clear the node */
                    pl-12
                    /* desktop: alternating half-width cards */
                    md:pl-0 md:flex md:items-start
                    ${isEven ? 'md:justify-start' : 'md:justify-end'}
                  `}
                >
                  {/* Node dot */}
                  <div
                    className="exp-node"
                    style={{ borderColor: cfg.color, color: cfg.color, boxShadow: `0 0 0 3px ${cfg.glow}`, background: 'var(--background)' }}
                  >
                    {getIcon(item.type)}
                  </div>

                  {/* Card */}
                  <div className={`w-full md:w-[calc(50%-44px)] ${isEven ? 'md:mr-auto' : 'md:ml-auto'}`}>
                    <ScrollReveal direction={isEven ? 'left' : 'right'} delay={0.04}>
                      <div className="exp-card group" style={{ '--cfg-color': cfg.color, '--cfg-glow': cfg.bg } as React.CSSProperties}>
                        {/* Connector arrow — desktop only */}
                        <div
                          className={`hidden md:block exp-arrow ${isEven ? 'exp-arrow--right' : 'exp-arrow--left'}`}
                          style={{ borderColor: cfg.color + '40' }}
                        />
                        {/* Date chip */}
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border mb-3"
                          style={{ color: cfg.color, borderColor: `${cfg.color}30`, background: cfg.bg }}>
                          {item.date}
                        </span>
                        <h3 className="text-[15px] font-bold leading-snug group-hover:text-[var(--cfg-color)] transition-colors">{item.title}</h3>
                        <h4 className="text-[13px] font-semibold mt-1" style={{ color: cfg.color }}>{item.subtitle}</h4>
                        <p className="text-[13px] text-[var(--muted)] mt-3 leading-relaxed">{item.description}</p>
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
