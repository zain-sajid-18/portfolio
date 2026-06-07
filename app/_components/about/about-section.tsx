'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo, aboutCounters, techGlobeItems } from '@/app/_lib/data';
import { AnimatedCounter } from '@/app/_components/ui/animated-counter';

const journeyCards = [
  { label: 'Learning', title: 'Self-Taught Foundations', hint: '2019 — Present' },
  { label: 'University', title: 'BS Software Engineering', hint: 'UCP, Lahore' },
  { label: 'Capstone', title: 'IntelliBid AI Platform', hint: '2025 — 2026' },
];

export function AboutSection() {
  const [activeJourney, setActiveJourney] = useState(1);

  return (
    <section id="about" className="shell py-24 border-t border-[var(--line)]">
      <div className="flex items-end justify-between gap-6 mb-10">
        <div>
          <p className="eyebrow mb-3">
            <span className="dot" />
            01 // About
          </p>
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold leading-tight">
            The engineer behind the code
          </h2>
        </div>
        <p className="hidden md:block text-sm text-[var(--muted)] max-w-xs text-right font-mono">
          Hover to explore →
        </p>
      </div>

      {/* Bento grid */}
      <div className="bento-grid gap-3">
        {/* Name card */}
        <motion.div
          className="bento-card bento-name"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-mono text-[var(--soft)] uppercase tracking-widest">Identity</p>
          <h3 className="text-2xl lg:text-3xl font-extrabold mt-3 tracking-tight uppercase">
            {personalInfo.name}
          </h3>
          <p className="text-sm text-[var(--muted)] mt-1 font-mono uppercase tracking-wider">
            {personalInfo.title}
          </p>
        </motion.div>

        {/* Journey carousel */}
        <motion.div
          className="bento-card bento-journey"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <p className="text-xs font-mono text-[var(--soft)] uppercase tracking-widest mb-4">
            Journey
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {journeyCards.map((card, i) => (
              <button
                key={card.title}
                type="button"
                onMouseEnter={() => setActiveJourney(i)}
                onFocus={() => setActiveJourney(i)}
                className={`journey-pill shrink-0 ${activeJourney === i ? 'journey-pill-active' : ''}`}
              >
                <span className="text-[10px] font-mono uppercase text-[var(--soft)]">{card.label}</span>
                <span className="text-sm font-semibold mt-1 block">{card.title}</span>
                <span className="text-xs text-[var(--muted)] mt-0.5 block">{card.hint}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Mindset */}
        <motion.div
          className="bento-card bento-mindset"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ y: -4 }}
        >
          <h4 className="text-lg font-bold">Mindset</h4>
          <p className="text-sm text-[var(--muted)] leading-relaxed mt-3">
            Discipline over motivation. I treat every feature like a production system — measured,
            tested, and built to scale. Clean architecture isn&apos;t optional; it&apos;s the baseline.
          </p>
          <p className="text-xs font-mono text-[var(--accent-green)] mt-5">
            Mastering craft through consistent iteration.
          </p>
        </motion.div>

        {/* Avatar / profile anchor */}
        <motion.div
          className="bento-card bento-profile"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="profile-ring">
            <span className="profile-initials">{personalInfo.initials}</span>
          </div>
          <p className="text-xs font-mono text-[var(--soft)] mt-4 uppercase tracking-wider">
            {personalInfo.availability}
          </p>
        </motion.div>

        {/* Craft */}
        <motion.div
          className="bento-card bento-craft"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ y: -4 }}
        >
          <h4 className="text-lg font-bold">Craft</h4>
          <p className="text-sm text-[var(--muted)] leading-relaxed mt-3">
            Scalable MERN apps, real-time Socket.io engines, and AI-integrated platforms — architected
            with layered MVC, sub-100ms API targets, and interfaces that feel premium.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {techGlobeItems.slice(0, 5).map((t) => (
              <span key={t.name} className="tech-pill" style={{ color: t.color }}>
                {t.name}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-5">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] animate-pulse" />
            <span className="text-xs font-mono text-[var(--muted)]">Open to collaboration & full-time roles</span>
          </div>
        </motion.div>

        {/* Location */}
        <motion.div
          className="bento-card bento-location"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <p className="text-[clamp(22px,3vw,32px)] font-extrabold uppercase tracking-tight">
            Lahore, Pakistan
          </p>
          <p className="text-xs font-mono text-[var(--soft)] mt-2">31.5204° N · 74.3587° E · GMT+5</p>
        </motion.div>

        {/* Metrics row */}
        {aboutCounters.map((counter, idx) => (
          <motion.div
            key={counter.label}
            className={`bento-card bento-metric bento-metric-${idx}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 + idx * 0.05 }}
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-3xl font-extrabold text-[var(--accent-blue)]">
              {counter.numericValue !== undefined ? (
                <AnimatedCounter
                  value={counter.numericValue}
                  suffix={counter.suffix}
                  decimals={counter.numericValue === 3.21 ? 2 : 0}
                />
              ) : (
                counter.value
              )}
            </p>
            <p className="text-xs text-[var(--muted)] mt-1">{counter.label}</p>
          </motion.div>
        ))}
      </div>

      <style jsx global>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-areas:
            'name name journey journey'
            'mindset profile profile craft'
            'location metric1 metric2 metric3'
            'location metric4 metric4 metric4';
        }
        .bento-card {
          border: 1px solid var(--line);
          border-radius: 12px;
          background: var(--panel);
          backdrop-filter: blur(16px);
          padding: 1.25rem;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .bento-card:hover {
          border-color: rgba(116, 167, 255, 0.25);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }
        .bento-name { grid-area: name; }
        .bento-journey { grid-area: journey; }
        .bento-mindset { grid-area: mindset; }
        .bento-profile {
          grid-area: profile;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: radial-gradient(circle at 50% 30%, rgba(116,167,255,0.08), var(--panel));
        }
        .bento-craft { grid-area: craft; }
        .bento-location {
          grid-area: location;
          background:
            radial-gradient(circle at 80% 80%, rgba(91,224,173,0.06), transparent 50%),
            var(--panel);
        }
        .bento-metric { min-height: 90px; display: flex; flex-direction: column; justify-content: center; }
        .bento-metric-0 { grid-area: metric1; }
        .bento-metric-1 { grid-area: metric2; }
        .bento-metric-2 { grid-area: metric3; }
        .bento-metric-3 { grid-area: metric4; }

        .journey-pill {
          padding: 0.75rem 1rem;
          border-radius: 10px;
          border: 1px solid var(--line);
          background: rgba(255,255,255,0.02);
          text-align: left;
          cursor: default;
          transition: all 0.25s;
          min-width: 140px;
        }
        .journey-pill-active {
          border-color: var(--accent-blue);
          background: rgba(116,167,255,0.08);
          transform: scale(1.03);
        }
        .profile-ring {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 1px dashed rgba(255,255,255,0.15);
          display: grid;
          place-items: center;
          animation: float 5s ease-in-out infinite;
        }
        .profile-initials {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          font-size: 2rem;
          font-weight: 800;
          color: #071018;
          background: linear-gradient(135deg, #dce9ff, #7df1c3);
        }
        .tech-pill {
          font-size: 11px;
          font-family: var(--font-mono);
          padding: 4px 10px;
          border-radius: 6px;
          border: 1px solid var(--line);
          background: rgba(255,255,255,0.03);
        }
        @media (max-width: 900px) {
          .bento-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
              'name name'
              'journey journey'
              'profile profile'
              'mindset craft'
              'location location'
              'metric1 metric2'
              'metric3 metric4';
          }
        }
        @media (max-width: 540px) {
          .bento-grid { grid-template-columns: 1fr; grid-template-areas: unset; }
          .bento-card { grid-area: unset !important; }
        }
      `}</style>
    </section>
  );
}
