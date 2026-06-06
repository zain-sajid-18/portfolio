'use client';

import { achievements } from '@/app/_lib/data';
import { ScrollReveal } from '@/app/_components/ui/scroll-reveal';
import { SectionHeader } from '@/app/_components/ui/section-header';

export function AchievementsSection() {
  return (
    <section id="achievements" className="shell py-24 border-t border-[var(--line)]">
      <SectionHeader
        eyebrow="06 // CERTIFICATIONS & AWARDS"
        title="Distinctions & Credentials"
        description="Academic achievements, professional specialization certificates, and developer community active participations."
      />

      <div className="grid gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((item, idx) => (
          <ScrollReveal key={item.id} direction="up" delay={idx * 0.08}>
            <div
              className="glass-panel p-6 h-full flex flex-col justify-between group hover:border-[var(--accent-green)] transition-all duration-300"
              style={{
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div>
                {/* Large visual icon indicator */}
                <span
                  className="w-12 h-12 rounded-lg border border-[var(--line)] bg-white/[0.02] flex items-center justify-center text-2xl mb-5 group-hover:scale-105 transition-transform"
                  style={{
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  }}
                >
                  {item.icon}
                </span>

                <h3 className="text-base font-bold leading-snug group-hover:text-[var(--accent-green)] transition-colors">
                  {item.title}
                </h3>

                <h4 className="text-xs font-mono text-[var(--soft)] uppercase tracking-wider mt-1">
                  {item.issuer}
                </h4>
              </div>

              <p className="text-xs text-[var(--muted)] mt-4 leading-relaxed">
                {item.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
