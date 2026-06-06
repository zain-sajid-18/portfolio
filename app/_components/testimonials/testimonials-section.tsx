'use client';

import { testimonials, personalInfo } from '@/app/_lib/data';
import { ScrollReveal } from '@/app/_components/ui/scroll-reveal';
import { Mail, MessageSquare } from 'lucide-react';

export function TestimonialsSection() {
  const hasTestimonials = testimonials && testimonials.length > 0;

  return (
    <section id="testimonials" className="shell py-24 border-t border-[var(--line)]">
      <div className="max-w-xl mx-auto text-center">
        {hasTestimonials ? (
          <div className="grid gap-6">
            {testimonials.map((item) => (
              <ScrollReveal key={item.id} direction="up">
                <div className="glass-panel p-8 text-left relative">
                  <span className="text-4xl text-[var(--line)] absolute top-4 left-4 font-serif">
                    “
                  </span>
                  <p className="text-base text-[var(--muted)] leading-relaxed italic mb-6">
                    {item.content}
                  </p>
                  <div className="flex items-center gap-3">
                    {item.avatar && (
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover border border-[var(--line)]"
                      />
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-[var(--foreground)]">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[var(--soft)]">
                        {item.role} @ {item.company}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <ScrollReveal direction="up">
            <div className="glass-panel p-10 flex flex-col items-center gap-6">
              <div
                className="w-14 h-14 rounded-full border border-[var(--line)] bg-white/[0.02] flex items-center justify-center text-[var(--accent-blue)]"
                style={{
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                }}
              >
                <MessageSquare size={26} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Have we collaborated?</h3>
                <p className="text-sm text-[var(--muted)] mt-2 leading-relaxed">
                  I am always looking forward to connecting with professors, peer engineers, and clients. If you would like to leave a testimonial or recommend my full stack services, please reach out!
                </p>
              </div>
              <a href={`mailto:${personalInfo.email}`} className="btn-primary">
                <Mail size={16} /> Get In Touch
              </a>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
