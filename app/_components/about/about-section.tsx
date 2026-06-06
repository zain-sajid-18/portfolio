'use client';

import { personalInfo, aboutCounters } from '@/app/_lib/data';
import { ScrollReveal } from '@/app/_components/ui/scroll-reveal';
import { SectionHeader } from '@/app/_components/ui/section-header';
import { AnimatedCounter } from '@/app/_components/ui/animated-counter';

export function AboutSection() {
  return (
    <section id="about" className="shell py-24 border-t border-[var(--line)]">
      <SectionHeader
        eyebrow="01 // BACKGROUND"
        title="From Vision to Reality"
        description="The story of a software engineer bridging robust architecture with polished interfaces."
      />

      <div
        className="grid gap-12 mt-12 items-start"
        style={{
          gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
        }}
      >
        {/* Left: Narrative bio */}
        <ScrollReveal direction="left">
          <div className="grid gap-6">
            <h3 className="text-2xl font-semibold">
              Hi, I'm {personalInfo.name}.
            </h3>
            <p className="text-lg leading-relaxed text-[var(--muted)]">
              I am a final-year Software Engineering student at the{' '}
              <strong className="text-[var(--foreground)]">University of Central Punjab (UCP)</strong> in Lahore, Pakistan. My journey in software development is fueled by a simple yet powerful design philosophy:{' '}
              <em className="text-[var(--accent-blue)]">"From Vision to Reality; Just One Line at a Time."</em>
            </p>
            <p className="text-lg leading-relaxed text-[var(--muted)]">
              I specialize in the MERN stack (<strong className="text-[var(--foreground)]">MongoDB, Express.js, React, Node.js</strong>), real-time communication via <strong className="text-[var(--foreground)]">Socket.io</strong>, and building AI-integrated workflows. I focus heavily on creating performant systems—architecting REST APIs that target sub-100ms response times and robust database models.
            </p>
            <p className="text-lg leading-relaxed text-[var(--muted)]">
              Whether developing secure role-based portals or cross-platform mobile apps with React Native, I prioritize clean code, layered MVC architecture, and exceptional UX/UI aesthetics.
            </p>
            <div className="glass-panel p-5 mt-4 border-l-4 border-l-[var(--accent-green)]">
              <h4 className="text-sm font-semibold text-[var(--accent-green)] uppercase tracking-wider">
                Current Status
              </h4>
              <p className="text-base text-[var(--foreground)] mt-1.5 font-medium">
                {personalInfo.availability}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Right: Metrics Grid */}
        <ScrollReveal direction="right" delay={0.2}>
          <div className="grid gap-4 sm:grid-cols-2">
            {aboutCounters.map((counter, idx) => (
              <div
                key={counter.label}
                className="glass-panel p-6 flex flex-col justify-between"
                style={{ minHeight: 150 }}
              >
                <div>
                  <h4 className="text-xs font-mono uppercase text-[var(--soft)] tracking-wider">
                    {idx === 0 && 'Experience'}
                    {idx === 1 && 'Portfolio'}
                    {idx === 2 && 'Versatility'}
                    {idx === 3 && 'Academics'}
                  </h4>
                  <p className="text-sm text-[var(--muted)] mt-2 leading-snug">
                    {counter.label}
                  </p>
                </div>
                <div className="text-4xl font-extrabold mt-4 text-[var(--accent-blue)]">
                  {counter.numericValue !== undefined ? (
                    <AnimatedCounter
                      value={counter.numericValue}
                      suffix={counter.suffix}
                      decimals={counter.numericValue === 3.21 ? 2 : 0}
                    />
                  ) : (
                    counter.value
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
