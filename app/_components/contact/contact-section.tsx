'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Link, FileCode, CheckCircle, Download } from 'lucide-react';
import { personalInfo } from '@/app/_lib/data';
import { ScrollReveal } from '@/app/_components/ui/scroll-reveal';
import { SectionHeader } from '@/app/_components/ui/section-header';
import { MagneticButton } from '@/app/_components/ui/magnetic-button';
import { formatPhoneForTel } from '@/app/_lib/utils';

const INFO_ITEMS = [
  {
    icon: Mail,   color: 'var(--accent-blue)',  bg: 'rgba(116,167,255,0.08)', border: 'rgba(116,167,255,0.25)', hoverBorder: 'rgba(116,167,255,0.5)',
    label: 'Email',    value: personalInfo.email,  href: `mailto:${personalInfo.email}`,
  },
  {
    icon: Phone,  color: 'var(--accent-green)', bg: 'rgba(91,224,173,0.08)',  border: 'rgba(91,224,173,0.25)',  hoverBorder: 'rgba(91,224,173,0.5)',
    label: 'Phone',    value: personalInfo.phone,  href: `tel:${formatPhoneForTel(personalInfo.phone)}`,
  },
  {
    icon: MapPin, color: 'var(--accent-amber)', bg: 'rgba(255,209,102,0.08)', border: 'rgba(255,209,102,0.2)',  hoverBorder: 'rgba(255,209,102,0.4)',
    label: 'Location', value: personalInfo.location, href: null,
  },
];

function FloatingLabelField({ id, name, label, type = 'text', value, onChange, error, placeholder, as, rows }: {
  id: string; name: string; label: string; type?: string; value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string; placeholder?: string; as?: 'textarea'; rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;
  return (
    <div className="fl-field">
      <div className={`fl-input-wrap ${error ? 'fl-error' : ''} ${focused ? 'fl-focused' : ''}`}>
        <label htmlFor={id} className={`fl-label ${lifted ? 'fl-label--lifted' : ''}`}>{label}</label>
        {as === 'textarea' ? (
          <textarea id={id} name={name} value={value} rows={rows ?? 5}
            placeholder={lifted ? placeholder : ''}
            onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined}
            className="fl-textarea" />
        ) : (
          <input id={id} name={name} type={type} value={value}
            placeholder={lifted ? placeholder : ''}
            onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined}
            className="fl-input" />
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.span id={`${id}-error`} role="alert"
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            className="text-[12px] text-[var(--accent-rose)] mt-1 flex items-center gap-1">
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!formData.name.trim()) next.name = 'Name is required';
    if (!formData.email.trim()) { next.email = 'Email is required'; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { next.email = 'Enter a valid email'; }
    if (!formData.message.trim()) next.message = 'Message is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => { const c = { ...prev }; delete c[name]; return c; });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const subject = encodeURIComponent(formData.subject || 'Portfolio inquiry');
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 4500);
  };

  return (
    <section id="contact" className="shell py-16 sm:py-24 border-t border-[var(--line)]">
      <SectionHeader
        eyebrow="07 // INITIATE"
        title="Get in Touch"
        description="Whether you have an opening, a freelance project, or just want to say hello — I'd love to hear from you."
      />

      {/* Stacks on mobile, 2-col on md+ */}
      <div className="grid gap-8 sm:gap-10 mt-10 sm:mt-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start">

        {/* Info panel */}
        <ScrollReveal direction="left">
          <div className="grid gap-5">
            <div>
              <h3 className="text-[20px] sm:text-[22px] font-extrabold mb-2">Let&apos;s talk.</h3>
              <p className="text-[14px] leading-[1.8] text-[var(--muted)]">
                I&apos;m interested in full-time roles, capstone collaborations, and freelance projects.
                Reach me through any channel below, or use the form.
              </p>
            </div>

            <div className="grid gap-3">
              {INFO_ITEMS.map((item) => {
                const Icon = item.icon;
                const inner = (
                  <div className="contact-info-card" style={{ '--info-border': item.border, '--info-hover': item.hoverBorder, '--info-bg': item.bg } as React.CSSProperties}>
                    <div className="p-2.5 rounded-lg flex items-center justify-center shrink-0" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
                      <Icon size={17} style={{ color: item.color }} />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] font-mono text-[var(--soft)] uppercase tracking-widest mb-0.5">{item.label}</span>
                      {/* truncate long email on narrow screens */}
                      <strong className="text-[13px] font-semibold truncate block max-w-full">{item.value}</strong>
                    </div>
                  </div>
                );
                return item.href
                  ? <a key={item.label} href={item.href} className="block">{inner}</a>
                  : <div key={item.label}>{inner}</div>;
              })}
            </div>

            <div className="flex gap-2 pt-1 flex-wrap">
              <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="contact-social-btn" aria-label="LinkedIn">
                <Link size={16} /><span className="text-xs font-mono">LinkedIn</span>
              </a>
              <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" className="contact-social-btn" aria-label="GitHub">
                <FileCode size={16} /><span className="text-xs font-mono">GitHub</span>
              </a>
            </div>

            {/* Resume download — primary CTA for recruiters */}
            <a
              href={personalInfo.resumePath}
              download
              className="contact-resume-btn"
              aria-label="Download resume PDF"
            >
              <Download size={15} />
              <span>Download Résumé</span>
              <span className="contact-resume-ext">PDF</span>
            </a>
          </div>
        </ScrollReveal>

        {/* Form */}
        <ScrollReveal direction="right" delay={0.12}>
          <form onSubmit={handleSubmit} className="glass-panel p-5 sm:p-7 grid gap-4" noValidate aria-label="Contact form">
            <div className="grid gap-4 sm:grid-cols-2">
              <FloatingLabelField id="name"  name="name"  label="Your Name"     value={formData.name}  onChange={handleChange} error={errors.name}  placeholder="Zain Sajid" />
              <FloatingLabelField id="email" name="email" label="Email Address" type="email" value={formData.email} onChange={handleChange} error={errors.email} placeholder="you@email.com" />
            </div>
            <FloatingLabelField id="subject" name="subject" label="Subject (optional)" value={formData.subject} onChange={handleChange} placeholder="Project inquiry, job offer…" />
            <FloatingLabelField id="message" name="message" label="Message" value={formData.message} onChange={handleChange} error={errors.message} as="textarea" rows={5} placeholder="Tell me about your project or role…" />
            <MagneticButton type="submit" className={`btn-primary w-full mt-1 min-h-[48px] text-[14px] font-bold ${submitted ? 'btn-submitted' : ''}`}>
              <AnimatePresence mode="wait" initial={false}>
                {submitted ? (
                  <motion.span key="ok" className="flex items-center gap-2" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                    <CheckCircle size={16} /> Message sent — opening email client…
                  </motion.span>
                ) : (
                  <motion.span key="send" className="flex items-center gap-2" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                    <Send size={15} /> Send Message
                  </motion.span>
                )}
              </AnimatePresence>
            </MagneticButton>
          </form>
        </ScrollReveal>
      </div>

      <style jsx global>{`
        .contact-info-card {
          display: flex; align-items: center; gap: 12px; padding: 13px 15px;
          border-radius: 12px; border: 1px solid var(--info-border, var(--line));
          background: var(--panel); transition: border-color 0.22s, box-shadow 0.22s, background 0.22s;
          overflow: hidden; /* prevent email from blowing layout */
        }
        .contact-info-card:hover, a:hover .contact-info-card {
          border-color: var(--info-hover, var(--accent-blue));
          box-shadow: 0 4px 20px var(--info-bg, rgba(116,167,255,0.1));
          background: var(--panel-strong);
        }
        [data-theme="light"] .contact-info-card { background: rgba(255,255,255,0.82); }
        [data-theme="light"] a:hover .contact-info-card, [data-theme="light"] .contact-info-card:hover { background: #ffffff; }

        .contact-social-btn {
          display: inline-flex; align-items: center; gap: 7px; padding: 9px 16px;
          border-radius: 10px; border: 1px solid var(--line); background: var(--surface-subtle);
          color: var(--muted); transition: border-color 0.2s, color 0.2s, transform 0.2s, background 0.2s;
          min-height: 40px;
        }
        .contact-social-btn:hover { border-color: var(--line-hover); color: var(--foreground); background: var(--surface-hover); transform: translateY(-2px); }
        [data-theme="light"] .contact-social-btn { background: rgba(255,255,255,0.7); color: var(--muted); }

        /* Floating label inputs */
        .fl-field { display: flex; flex-direction: column; }
        .fl-input-wrap {
          position: relative; border: 1px solid var(--line); border-radius: 10px;
          background: rgba(255,255,255,0.03); transition: border-color 0.2s, box-shadow 0.2s;
        }
        .fl-input-wrap.fl-focused { border-color: var(--accent-blue); box-shadow: 0 0 0 3px rgba(116,167,255,0.1); }
        .fl-input-wrap.fl-error { border-color: var(--accent-rose); }
        .fl-label {
          position: absolute; left: 15px; top: 50%; transform: translateY(-50%);
          font-size: 13px; color: var(--soft); pointer-events: none;
          transition: all 0.18s ease; white-space: nowrap; z-index: 1;
        }
        .fl-input-wrap:has(textarea) .fl-label { top: 18px; transform: none; }
        .fl-label--lifted { top: 8px; transform: none; font-size: 10px; font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.06em; color: var(--accent-blue); }
        .fl-input {
          width: 100%; border: none; background: transparent; color: var(--foreground);
          padding: 22px 15px 8px; outline: none; font-size: 14px; border-radius: 10px;
        }
        .fl-textarea {
          width: 100%; border: none; background: transparent; color: var(--foreground);
          padding: 28px 15px 12px; outline: none; font-size: 14px;
          resize: vertical; min-height: 120px; border-radius: 10px;
        }
        [data-theme="light"] .fl-input-wrap { background: rgba(255,255,255,0.75); }
        [data-theme="light"] .fl-input, [data-theme="light"] .fl-textarea { color: var(--foreground); }
        [data-theme="light"] .fl-input::placeholder, [data-theme="light"] .fl-textarea::placeholder { color: var(--soft); }
        .btn-submitted { background: linear-gradient(135deg, var(--accent-green), #2cb78a); }

        /* Resume download button */
        .contact-resume-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 18px;
          border-radius: 12px;
          border: 1px dashed rgba(116,167,255,0.35);
          background: rgba(116,167,255,0.04);
          color: var(--accent-blue);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: border-color 0.22s, background 0.22s, transform 0.22s, box-shadow 0.22s;
          text-decoration: none;
          position: relative;
          overflow: hidden;
        }
        .contact-resume-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(116,167,255,0.08) 50%, transparent 60%);
          transform: translateX(-100%);
          transition: transform 0.55s;
        }
        .contact-resume-btn:hover::before { transform: translateX(100%); }
        .contact-resume-btn:hover {
          border-color: var(--accent-blue);
          background: rgba(116,167,255,0.08);
          transform: translateY(-2px);
          box-shadow: 0 6px 22px rgba(116,167,255,0.14);
        }
        .contact-resume-ext {
          margin-left: auto;
          font-size: 10px;
          font-family: var(--font-mono);
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 2px 7px;
          border-radius: 5px;
          background: rgba(116,167,255,0.12);
          border: 1px solid rgba(116,167,255,0.25);
          color: var(--accent-blue);
        }
        [data-theme="light"] .contact-resume-btn {
          border-color: rgba(29,78,216,0.3);
          background: rgba(29,78,216,0.04);
          color: var(--accent-blue);
        }
        [data-theme="light"] .contact-resume-btn:hover {
          border-color: var(--accent-blue);
          background: rgba(29,78,216,0.08);
        }
        [data-theme="light"] .contact-resume-ext {
          background: rgba(29,78,216,0.1);
          border-color: rgba(29,78,216,0.2);
        }
      `}</style>
    </section>
  );
}
