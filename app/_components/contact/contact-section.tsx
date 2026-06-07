'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Mail, Phone, MapPin, Send, Link, FileCode } from 'lucide-react';
import { personalInfo } from '@/app/_lib/data';
import { ScrollReveal } from '@/app/_components/ui/scroll-reveal';
import { SectionHeader } from '@/app/_components/ui/section-header';
import { MagneticButton } from '@/app/_components/ui/magnetic-button';
import { formatPhoneForTel } from '@/app/_lib/utils';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!formData.name.trim()) next.name = 'Name is required';
    if (!formData.email.trim()) {
      next.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = 'Enter a valid email address';
    }
    if (!formData.message.trim()) next.message = 'Message is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = encodeURIComponent(formData.subject || 'Portfolio inquiry');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );

    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="shell py-24 border-t border-[var(--line)]">
      <SectionHeader
        eyebrow="07 // INITIATE"
        title="Get in Touch"
        description="Whether you have an opening, a freelance project, or just want to say hi—reach out!"
      />

      <div
        className="grid gap-12 mt-12 items-start contact-grid"
        style={{ gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)' }}
      >
        <ScrollReveal direction="left">
          <div className="grid gap-6">
            <h3 className="text-2xl font-bold">Let&apos;s talk.</h3>
            <p className="text-base leading-relaxed text-[var(--muted)]">
              I am interested in full-time roles, Capstone discussions, and collaborative projects.
              Feel free to use the form or reach me via any of the channels below:
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
                  <span className="block text-xs font-mono text-[var(--soft)] uppercase">Email</span>
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
                  <span className="block text-xs font-mono text-[var(--soft)] uppercase">Phone</span>
                  <strong className="text-sm font-semibold">{personalInfo.phone}</strong>
                </div>
              </a>

              <div className="glass-panel p-4 flex items-center gap-4">
                <div className="p-2.5 rounded bg-white/[0.02] text-[var(--accent-amber)] border border-[var(--line)]">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="block text-xs font-mono text-[var(--soft)] uppercase">Location</span>
                  <strong className="text-sm font-semibold">{personalInfo.location}</strong>
                </div>
              </div>
            </div>

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

        <ScrollReveal direction="right" delay={0.2}>
          <form onSubmit={handleSubmit} className="glass-panel p-8 grid gap-5" noValidate>
            {(['name', 'email', 'subject'] as const).map((field) => (
              <div key={field} className="grid gap-1.5">
                <label htmlFor={field} className="text-xs font-mono uppercase text-[var(--muted)]">
                  {field === 'name' ? 'Your Name' : field === 'email' ? 'Email Address' : 'Subject'}
                </label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className={errors[field] ? 'border-[var(--accent-rose)]' : ''}
          
                  aria-invalid={!!errors[field]}
                  aria-describedby={errors[field] ? `${field}-error` : undefined}
                />
                {errors[field] && (
                  <span id={`${field}-error`} className="text-xs text-[var(--accent-rose)]">
                    {errors[field]}
                  </span>
                )}
              </div>
            ))}

            <div className="grid gap-1.5">
              <label htmlFor="message" className="text-xs font-mono uppercase text-[var(--muted)]">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={errors.message ? 'border-[var(--accent-rose)]' : ''}
                placeholder="Describe your project, timeline, or job scope..."
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <span id="message-error" className="text-xs text-[var(--accent-rose)]">
                  {errors.message}
                </span>
              )}
            </div>

            <MagneticButton type="submit" className="btn-primary w-full mt-2 min-h-[46px]">
              <Send size={16} />
              {submitted ? 'Opening your email client…' : 'Send Message'}
            </MagneticButton>
          </form>
        </ScrollReveal>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
