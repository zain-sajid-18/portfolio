'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Link, FileCode } from 'lucide-react';
import { personalInfo } from '@/app/_lib/data';
import { ScrollReveal } from '@/app/_components/ui/scroll-reveal';
import { SectionHeader } from '@/app/_components/ui/section-header';
import { formatPhoneForTel } from '@/app/_lib/utils';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="shell py-24 border-t border-[var(--line)]">
      <SectionHeader
        eyebrow="08 // INITIATE"
        title="Get in Touch"
        description="Whether you have an opening, a freelance project, or just want to say hi—reach out!"
      />

      <div
        className="grid gap-12 mt-12 items-start"
        style={{
          gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
        }}
      >
        {/* Left: Contact Info */}
        <ScrollReveal direction="left">
          <div className="grid gap-6">
            <h3 className="text-2xl font-bold">Let's talk.</h3>
            <p className="text-base leading-relaxed text-[var(--muted)]">
              I am interested in full-time roles, Capstone discussions, and collaborative projects. Feel free to use the form or reach me via any of the channels below:
            </p>

            <div className="grid gap-4 mt-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="glass-panel p-4 flex items-center gap-4 hover:border-[var(--accent-blue)] transition-colors"
              >
                <div className="p-2.5 rounded bg-white/[0.02] text-[var(--accent-blue)] border border-[var(--line)]">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="block text-xs font-mono text-[var(--soft)] uppercase">
                    Email
                  </span>
                  <strong className="text-sm font-semibold">{personalInfo.email}</strong>
                </div>
              </a>

              <a
                href={`tel:${formatPhoneForTel(personalInfo.phone)}`}
                className="glass-panel p-4 flex items-center gap-4 hover:border-[var(--accent-green)] transition-colors"
              >
                <div className="p-2.5 rounded bg-white/[0.02] text-[var(--accent-green)] border border-[var(--line)]">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="block text-xs font-mono text-[var(--soft)] uppercase">
                    Phone
                  </span>
                  <strong className="text-sm font-semibold">{personalInfo.phone}</strong>
                </div>
              </a>

              <div className="glass-panel p-4 flex items-center gap-4">
                <div className="p-2.5 rounded bg-white/[0.02] text-[var(--accent-amber)] border border-[var(--line)]">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="block text-xs font-mono text-[var(--soft)] uppercase">
                    Location
                  </span>
                  <strong className="text-sm font-semibold">{personalInfo.location}</strong>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-4">
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                style={{ width: 42, minHeight: 42, padding: 0 }}
                aria-label="LinkedIn Profile"
              >
                <Link size={18} />
              </a>
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                style={{ width: 42, minHeight: 42, padding: 0 }}
                aria-label="GitHub Profile"
              >
                <FileCode size={18} />
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Right: Contact Form */}
        <ScrollReveal direction="right" delay={0.2}>
          <form onSubmit={handleSubmit} className="glass-panel p-8 grid gap-5">
            <div className="grid gap-1.5">
              <label htmlFor="name" className="text-xs font-mono uppercase text-[var(--muted)]">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={status === 'submitting'}
                className="w-full px-4 py-3 rounded border bg-black/10 border-[var(--line)] focus:outline-none focus:border-[var(--accent-blue)] transition-colors text-sm"
                placeholder="e.g. John Doe"
              />
            </div>

            <div className="grid gap-1.5">
              <label htmlFor="email" className="text-xs font-mono uppercase text-[var(--muted)]">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={status === 'submitting'}
                className="w-full px-4 py-3 rounded border bg-black/10 border-[var(--line)] focus:outline-none focus:border-[var(--accent-blue)] transition-colors text-sm"
                placeholder="john@example.com"
              />
            </div>

            <div className="grid gap-1.5">
              <label htmlFor="message" className="text-xs font-mono uppercase text-[var(--muted)]">
                Message Description
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={status === 'submitting'}
                rows={5}
                className="w-full px-4 py-3 rounded border bg-black/10 border-[var(--line)] focus:outline-none focus:border-[var(--accent-blue)] transition-colors text-sm resize-none"
                placeholder="Describe your project, timeline, or job scope..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-primary w-full mt-2"
              style={{ minHeight: 46 }}
            >
              {status === 'idle' && (
                <>
                  <Send size={16} /> Send Message
                </>
              )}
              {status === 'submitting' && 'Sending payload...'}
              {status === 'success' && 'Payload received successfully!'}
              {status === 'error' && 'Failed to send payload.'}
            </button>
          </form>
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
