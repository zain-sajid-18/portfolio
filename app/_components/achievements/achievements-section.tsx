'use client';

import { achievements } from '@/app/_lib/data';
import { ScrollReveal } from '@/app/_components/ui/scroll-reveal';
import { SectionHeader } from '@/app/_components/ui/section-header';

const accentColors = [
  { border: 'var(--accent-blue)', glow: 'rgba(116,167,255,0.14)', badge: 'rgba(116,167,255,0.1)' },
  { border: 'var(--accent-green)', glow: 'rgba(91,224,173,0.14)', badge: 'rgba(91,224,173,0.1)' },
  { border: 'var(--accent-rose)', glow: 'rgba(255,140,159,0.14)', badge: 'rgba(255,140,159,0.1)' },
  { border: 'var(--accent-amber)', glow: 'rgba(255,209,102,0.14)', badge: 'rgba(255,209,102,0.1)' },
];

export function AchievementsSection() {
  return (
    <section id="achievements" className="shell py-24 border-t border-[var(--line)]">
      <SectionHeader
        eyebrow="06 // CERTIFICATIONS & AWARDS"
        title="Distinctions & Credentials"
        description="Academic achievements, professional certificates, and developer community participation."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((item, idx) => {
          const accent = accentColors[idx % accentColors.length];
          return (
            <ScrollReveal key={item.id} direction="up" delay={idx * 0.08}>
              <div className="achievement-card group h-full" style={{ '--accent-border': accent.border, '--accent-glow': accent.glow, '--accent-badge': accent.badge } as React.CSSProperties}>
                <div className="achievement-card-inner h-full flex flex-col">
                  {/* Number badge */}
                  <div className="flex items-start justify-between mb-5">
                    <span
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform duration-300"
                      style={{ background: accent.badge, border: `1px solid ${accent.border}30` }}
                    >
                      {item.icon}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--soft)] bg-[var(--surface-subtle)] border border-[var(--line)] px-2 py-1 rounded-full">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3
                    className="text-[15px] font-bold leading-snug mb-1 transition-colors duration-200 group-hover:text-[var(--accent-border)]"
                    style={{ '--accent-border': accent.border } as React.CSSProperties}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="text-[11px] font-mono uppercase tracking-wider mb-4"
                    style={{ color: accent.border }}
                  >
                    {item.issuer}
                  </p>

                  <p className="text-[13px] text-[var(--muted)] leading-relaxed mt-auto">
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      <style jsx global>{`
        .achievement-card {
          padding: 1px;
          border-radius: 14px;
          background: var(--line);
          transition: background 0.3s, box-shadow 0.3s;
        }
        .achievement-card:hover {
          background: linear-gradient(135deg, var(--accent-border), transparent 60%);
          box-shadow: 0 8px 32px var(--accent-glow);
        }
        .achievement-card-inner {
          border-radius: 13px;
          background: var(--panel);
          padding: 1.4rem;
          backdrop-filter: blur(16px);
          transition: background 0.3s;
        }
        .achievement-card:hover .achievement-card-inner {
          background: var(--panel-strong);
        }
        /* CSS variables passed inline need text color too */
        .achievement-card:hover h3 {
          color: var(--accent-border);
        }
      `}</style>
    </section>
  );
}
