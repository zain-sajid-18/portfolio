'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo, aboutCounters, techGlobeItems } from '@/app/_lib/data';
import { AnimatedCounter } from '@/app/_components/ui/animated-counter';

const journeyCards = [
  { label: 'Self-Taught', title: 'Foundations',     hint: '2019 — Present', color: 'var(--accent-amber)' },
  { label: 'University',  title: 'BS Software Eng.', hint: 'UCP, Lahore',    color: 'var(--accent-blue)'  },
  { label: 'Capstone',    title: 'IntelliBid AI',    hint: '2025 — 2026',    color: 'var(--accent-green)' },
];

const cardVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export function AboutSection() {
  const [activeJourney, setActiveJourney] = useState(1);

  return (
    <section id="about" className="shell py-16 sm:py-24 border-t border-[var(--line)]">
      {/* Header */}
      <div className="flex items-end justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <p className="eyebrow mb-3"><span className="dot" />01 // About</p>
          <h2 className="text-[clamp(24px,4vw,44px)] font-extrabold leading-tight">
            The engineer behind the code
          </h2>
        </div>
        <p className="hidden md:block text-xs font-mono text-[var(--soft)]">Hover to explore →</p>
      </div>

      {/* Bento grid */}
      <div className="bento-grid gap-3">

        {/* Name */}
        <motion.div className="bento-card bento-name" custom={0} variants={cardVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="text-[10px] font-mono text-[var(--soft)] uppercase tracking-widest mb-3">Identity</p>
          <h3 className="text-[clamp(16px,2.5vw,26px)] font-extrabold tracking-tight uppercase leading-tight">
            {personalInfo.name}
          </h3>
          <p className="text-[12px] text-[var(--muted)] mt-1.5 font-mono uppercase tracking-wider">
            {personalInfo.title}
          </p>
          <div className="flex items-center gap-2 mt-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-green)] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-green)]" />
            </span>
            <span className="text-[11px] font-mono text-[var(--accent-green)]">{personalInfo.availability}</span>
          </div>
        </motion.div>

        {/* Journey */}
        <motion.div className="bento-card bento-journey" custom={1} variants={cardVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="text-[10px] font-mono text-[var(--soft)] uppercase tracking-widest mb-4">Journey</p>
          {/* scrollable strip — no min-width constraint so it never blows out on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
            {journeyCards.map((card, i) => (
              <button
                key={card.title}
                type="button"
                onMouseEnter={() => setActiveJourney(i)}
                onFocus={() => setActiveJourney(i)}
                onClick={() => setActiveJourney(i)}
                className="journey-pill shrink-0"
                data-active={activeJourney === i}
                style={{ '--pill-color': card.color } as React.CSSProperties}
              >
                <span className="text-[9px] font-mono uppercase text-[var(--soft)] mb-1 block">{card.label}</span>
                <span className="text-[13px] font-bold block leading-tight">{card.title}</span>
                <span className="text-[11px] text-[var(--muted)] mt-1 block">{card.hint}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Mindset */}
        <motion.div className="bento-card bento-mindset" custom={2} variants={cardVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ y: -3 }}>
          <p className="text-[10px] font-mono text-[var(--soft)] uppercase tracking-widest mb-3">Mindset</p>
          <h4 className="text-[15px] font-bold mb-2">Discipline over motivation.</h4>
          <p className="text-[13px] text-[var(--muted)] leading-[1.75]">
            I treat every feature like a production system — measured, tested, built to scale.
            Clean architecture isn&apos;t optional; it&apos;s the baseline.
          </p>
          <p className="text-[11px] font-mono text-[var(--accent-green)] mt-4 border-t border-[var(--line)] pt-3">
            → Mastering craft through consistent iteration
          </p>
        </motion.div>

        {/* Profile */}
        <motion.div className="bento-card bento-profile" custom={3} variants={cardVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="profile-ring">
            <span className="profile-initials">{personalInfo.initials}</span>
          </div>
          <p className="text-[11px] font-mono text-[var(--soft)] mt-4 uppercase tracking-wider text-center">
            {personalInfo.location}
          </p>
          <p className="text-[10px] font-mono text-[var(--soft)] opacity-60 mt-1">31.52°N · 74.35°E</p>
        </motion.div>

        {/* Craft */}
        <motion.div className="bento-card bento-craft" custom={4} variants={cardVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ y: -3 }}>
          <p className="text-[10px] font-mono text-[var(--soft)] uppercase tracking-widest mb-3">Craft</p>
          <h4 className="text-[15px] font-bold mb-2">What I build.</h4>
          <p className="text-[13px] text-[var(--muted)] leading-[1.75]">
            Scalable MERN apps, real-time Socket.io engines, AI-integrated platforms — architected with
            layered MVC, sub-100ms API targets, and interfaces that feel premium.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {techGlobeItems.slice(0, 5).map((t) => (
              <span key={t.name} className="tech-pill" style={{ color: t.color, borderColor: `${t.color}25`, background: `${t.color}0a` }}>
                {t.name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Location */}
        <motion.div className="bento-card bento-location" custom={5} variants={cardVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="text-[clamp(16px,2.5vw,26px)] font-extrabold uppercase tracking-tight leading-tight">
            Lahore,<br />Pakistan
          </p>
          <p className="text-[10px] font-mono text-[var(--soft)] mt-2">GMT+5 · PKT</p>
        </motion.div>

        {/* Metrics */}
        {aboutCounters.map((counter, idx) => (
          <motion.div
            key={counter.label}
            className={`bento-card bento-metric bento-metric-${idx}`}
            custom={6 + idx}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, y: -2 }}
          >
            <p className="text-[clamp(20px,2.8vw,30px)] font-extrabold text-[var(--accent-blue)] leading-none">
              {counter.numericValue !== undefined ? (
                <AnimatedCounter
                  value={counter.numericValue}
                  suffix={counter.suffix}
                  decimals={counter.numericValue === 3.28 ? 2 : 0}
                />
              ) : counter.value}
            </p>
            <p className="text-[11px] text-[var(--muted)] mt-1.5 leading-tight">{counter.label}</p>
          </motion.div>
        ))}
      </div>

      <style jsx global>{`
        /* ── Bento grid ────────────────────────────── */
        .bento-grid {
          display: grid;
          /* Mobile: single column */
          grid-template-columns: 1fr;
          grid-template-areas:
            'name'
            'journey'
            'profile'
            'mindset'
            'craft'
            'location'
            'metric0'
            'metric1'
            'metric2'
            'metric3';
        }

        /* Tablet: 2-col */
        @media (min-width: 640px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-areas:
              'name    journey'
              'profile mindset'
              'craft   craft'
              'location metric0'
              'metric1 metric2'
              'metric3 metric3';
          }
        }

        /* Desktop: 4-col */
        @media (min-width: 1024px) {
          .bento-grid {
            grid-template-columns: repeat(4, 1fr);
            grid-template-areas:
              'name     name     journey  journey'
              'mindset  profile  profile  craft'
              'location metric0  metric1  metric2'
              'location metric3  metric3  metric3';
          }
        }

        .bento-card {
          min-width: 0;
          border: 1px solid var(--line);
          border-radius: 13px;
          background: var(--panel);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          padding: 1.15rem;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
        }
        @media (min-width: 640px) { .bento-card { padding: 1.3rem; } }
        .bento-card:hover {
          border-color: rgba(116,167,255,0.22);
          box-shadow: 0 8px 28px rgba(0,0,0,0.18);
          background: var(--panel-strong);
        }

        .bento-name     { grid-area: name; }
        .bento-journey  { grid-area: journey; overflow: hidden; }
        .bento-mindset  { grid-area: mindset; }
        .bento-profile  {
          grid-area: profile;
          display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;
          background: radial-gradient(circle at 50% 35%, rgba(116,167,255,0.07), var(--panel));
        }
        .bento-craft    { grid-area: craft; }
        .bento-location {
          grid-area: location;
          background: radial-gradient(circle at 80% 80%, rgba(91,224,173,0.06), transparent 55%), var(--panel);
        }
        .bento-metric   { grid-area: auto; display: flex; flex-direction: column; justify-content: center; min-height: 80px; }
        .bento-metric-0 { grid-area: metric0; }
        .bento-metric-1 { grid-area: metric1; }
        .bento-metric-2 { grid-area: metric2; }
        .bento-metric-3 { grid-area: metric3; }

        /* Journey pill — no min-width, let content size it */
        .journey-pill {
          padding: 0.6rem 0.85rem;
          border-radius: 10px;
          border: 1px solid var(--line);
          background: var(--surface-subtle);
          color: var(--foreground);
          cursor: pointer;
          transition: all 0.22s;
          text-align: left;
          /* width: fills available, but won't shrink below content */
          width: max-content;
          max-width: 160px;
        }
        .journey-pill[data-active="true"] {
          border-color: var(--pill-color, var(--accent-blue));
          background: color-mix(in srgb, var(--pill-color, var(--accent-blue)) 8%, transparent);
          transform: scale(1.02);
        }
        .journey-pill:hover:not([data-active="true"]) {
          border-color: rgba(116,167,255,0.25);
          background: var(--surface-subtle);
        }
        [data-theme="light"] .journey-pill { background: rgba(255,255,255,0.7); color: var(--foreground); }
        [data-theme="light"] .journey-pill[data-active="true"] {
          background: color-mix(in srgb, var(--pill-color, var(--accent-blue)) 10%, white);
        }

        /* Profile */
        .profile-ring {
          width: 100px; height: 100px;
          border-radius: 50%;
          border: 1px dashed rgba(116,167,255,0.22);
          display: grid; place-items: center;
          animation: float 5s ease-in-out infinite;
        }
        [data-theme="light"] .profile-ring { border-color: rgba(29,78,216,0.2); }
        .profile-initials {
          width: 74px; height: 74px;
          border-radius: 50%;
          display: grid; place-items: center;
          font-size: 1.65rem; font-weight: 800;
          color: #03111e;
          background: linear-gradient(135deg, #c8dbff, #6ef7c6);
          letter-spacing: 0.05em;
          box-shadow: 0 4px 20px rgba(116,167,255,0.22);
        }

        /* Tech pill */
        .tech-pill {
          font-size: 11px; font-family: var(--font-mono); font-weight: 600;
          padding: 3px 9px; border-radius: 6px; border: 1px solid;
          transition: opacity 0.2s, transform 0.2s;
        }
        .tech-pill:hover { opacity: 0.8; transform: translateY(-1px); }
        [data-theme="light"] .tech-pill { background: rgba(29,78,216,0.05) !important; }

        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
