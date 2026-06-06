'use client';

import { ScrollReveal } from '@/app/_components/ui/scroll-reveal';
import { SectionHeader } from '@/app/_components/ui/section-header';
import { Shield, Cpu, RefreshCw, Smartphone } from 'lucide-react';

const methodologies = [
  {
    icon: <Cpu size={24} className="text-[var(--accent-blue)]" />,
    title: 'Layered MVC Backend',
    description:
      'Structing REST endpoints cleanly: Routes → Controllers → Services → Models. Decoupling business logic from request layers to ensure code modularity, ease of testing, and straightforward maintainability.',
  },
  {
    icon: <RefreshCw size={24} className="text-[var(--accent-green)]" />,
    title: 'Real-Time State Engines',
    description:
      'Synchronizing concurrent web systems over WebSockets/Socket.io. Designing solid anti-sniping bid loops, live user-presence indicators, typing receipts, and reliable payload validation mechanisms.',
  },
  {
    icon: <Shield size={24} className="text-[var(--accent-rose)]" />,
    title: 'Secure JWT Authentication',
    description:
      'Protecting routes with custom middleware layers, verifying JSON Web Tokens, implementing CORS policies, securing passwords with bcrypt, and sanitizing user inputs using Joi validations.',
  },
  {
    icon: <Smartphone size={24} className="text-[var(--accent-amber)]" />,
    title: 'Mobile Architecture',
    description:
      'Compiling responsive native screens in React Native. Bridging custom configurations, local cache engines, and backend sockets to deliver high-fidelity cross-platform applications.',
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="shell py-24 border-t border-[var(--line)]">
      <SectionHeader
        eyebrow="05 // EXPERTISE"
        title="Software Engineering Principles"
        description="Beyond coding: applying architectural design patterns, database optimization, and secure development lifecycles."
      />

      <div className="grid gap-6 mt-12 sm:grid-cols-2">
        {methodologies.map((method, idx) => (
          <ScrollReveal key={idx} direction="up" delay={idx * 0.1}>
            <div className="glass-panel p-8 h-full flex gap-5 flex-col md:flex-row items-start hover:border-[var(--accent-blue)] transition-colors">
              <div
                className="p-3.5 rounded-lg border border-[var(--line)] bg-white/[0.02] flex items-center justify-center shrink-0"
                style={{
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                }}
              >
                {method.icon}
              </div>
              <div className="grid gap-2">
                <h3 className="text-lg font-bold">{method.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {method.description}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
