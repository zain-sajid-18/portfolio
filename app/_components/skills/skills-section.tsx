'use client';

import { ScrollReveal } from '@/app/_components/ui/scroll-reveal';
import { SectionHeader } from '@/app/_components/ui/section-header';
import { Shield, Cpu, RefreshCw, Smartphone } from 'lucide-react';

const methodologies = [
  {
    icon: Cpu,
    color: 'var(--accent-blue)',
    glow: 'rgba(116,167,255,0.12)',
    badge: 'rgba(116,167,255,0.08)',
    title: 'Layered MVC Backend',
    description:
      'Structuring REST endpoints cleanly: Routes → Controllers → Services → Models. Decoupling business logic from request layers to ensure modularity, ease of testing, and straightforward maintainability.',
    tag: 'Architecture',
  },
  {
    icon: RefreshCw,
    color: 'var(--accent-green)',
    glow: 'rgba(91,224,173,0.12)',
    badge: 'rgba(91,224,173,0.08)',
    title: 'Real-Time State Engines',
    description:
      'Synchronizing concurrent web systems over WebSockets & Socket.io — anti-sniping bid loops, live presence indicators, typing receipts, and reliable payload validation.',
    tag: 'Real-Time',
  },
  {
    icon: Shield,
    color: 'var(--accent-rose)',
    glow: 'rgba(255,140,159,0.12)',
    badge: 'rgba(255,140,159,0.08)',
    title: 'Secure JWT Authentication',
    description:
      'Protecting routes with custom middleware, verifying JSON Web Tokens, enforcing CORS policies, hashing passwords with bcrypt, and sanitizing inputs via Joi validations.',
    tag: 'Security',
  },
  {
    icon: Smartphone,
    color: 'var(--accent-amber)',
    glow: 'rgba(255,209,102,0.12)',
    badge: 'rgba(255,209,102,0.08)',
    title: 'Mobile Architecture',
    description:
      'Building responsive native screens in React Native — bridging custom configs, local cache engines, and backend sockets to deliver cross-platform applications.',
    tag: 'Mobile',
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="shell py-24 border-t border-[var(--line)]">
      <SectionHeader
        eyebrow="05 // EXPERTISE"
        title="Software Engineering Principles"
        description="Beyond syntax — applying architectural patterns, database optimization, and secure development lifecycles."
      />

      <div className="grid gap-5 mt-12 sm:grid-cols-2">
        {methodologies.map((method, idx) => {
          const Icon = method.icon;
          return (
            <ScrollReveal key={idx} direction="up" delay={idx * 0.09}>
              <div
                className="skill-principle-card group h-full"
                style={{ '--card-glow': method.glow, '--card-color': method.color } as React.CSSProperties}
              >
                {/* Icon + tag row */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="p-3 rounded-xl border transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_var(--card-glow)]"
                    style={{
                      background: method.badge,
                      borderColor: `${method.color}30`,
                    }}
                  >
                    <Icon size={22} style={{ color: method.color }} strokeWidth={1.8} />
                  </div>
                  <span
                    className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border"
                    style={{
                      color: method.color,
                      borderColor: `${method.color}30`,
                      background: method.badge,
                    }}
                  >
                    {method.tag}
                  </span>
                </div>

                <h3 className="text-[17px] font-bold mb-3 transition-colors duration-200 group-hover:text-[var(--card-color)]">
                  {method.title}
                </h3>

                <p className="text-[13px] text-[var(--muted)] leading-[1.75]">
                  {method.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className="mt-5 h-[2px] rounded-full w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, ${method.color}, transparent)` }}
                />
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      <style jsx global>{`
        .skill-principle-card {
          padding: 1.5rem;
          border-radius: 14px;
          border: 1px solid var(--line);
          background: var(--panel);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: border-color 0.28s, box-shadow 0.28s, background 0.28s, transform 0.28s;
          overflow: hidden;
          position: relative;
        }
        /* top accent strip that grows in on hover */
        .skill-principle-card::before {
          content: '';
          position: absolute;
          inset-x: 0;
          top: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--card-color, var(--accent-blue)), transparent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.38s ease;
          border-radius: 14px 14px 0 0;
        }
        .skill-principle-card:hover::before {
          transform: scaleX(1);
        }
        .skill-principle-card:hover {
          border-color: color-mix(in srgb, var(--card-color, var(--accent-blue)) 35%, transparent);
          box-shadow: 0 12px 40px var(--card-glow, rgba(116,167,255,0.1));
          background: var(--panel-strong);
          transform: translateY(-3px);
        }
        [data-theme="light"] .skill-principle-card { background: rgba(255,255,255,0.85); }
        [data-theme="light"] .skill-principle-card:hover { background: #ffffff; }
      `}</style>
    </section>
  );
}
