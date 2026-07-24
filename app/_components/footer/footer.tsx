'use client';

import { ArrowUp, Link, FileCode, Mail } from 'lucide-react';
import { personalInfo } from '@/app/_lib/data';

export function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--footer-bg)] backdrop-blur-md py-10 relative z-[1]">
      <div className="shell">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 mb-6">
          {/* Brand + tagline */}
          <div className="flex flex-col items-center sm:items-start gap-1">
            <div className="flex items-center gap-2">
              <span
                className="w-8 h-8 rounded-lg grid place-items-center text-[11px] font-extrabold shrink-0"
                style={{ background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-green))', color: '#03111e' }}
              >
                {personalInfo.initials}
              </span>
              <span className="font-bold text-sm tracking-tight">{personalInfo.name}</span>
            </div>
            <p className="text-xs font-mono text-[var(--soft)]">{personalInfo.title}</p>
          </div>

          {/* Availability pulse */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--accent-green)]/25 bg-[var(--accent-green)]/6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-green)] opacity-50" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-green)]" />
            </span>
            <span className="text-xs font-mono font-semibold text-[var(--accent-green)] tracking-wide">
              {personalInfo.availability}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-6 rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, var(--line), transparent)' }}
        />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--soft)] font-mono order-2 sm:order-1">
            © {year} {personalInfo.name} · 
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-1.5 order-1 sm:order-2">
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon-btn"
              aria-label="LinkedIn"
            >
              <Link size={15} />
            </a>
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon-btn"
              aria-label="GitHub"
            >
              <FileCode size={15} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="footer-icon-btn"
              aria-label="Send email"
            >
              <Mail size={15} />
            </a>
            <div className="w-px h-5 bg-[var(--line)] mx-1" />
            <button
              onClick={handleScrollTop}
              className="footer-icon-btn"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .footer-icon-btn {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          border-radius: 9px;
          border: 1px solid var(--line);
          background: transparent;
          color: var(--soft);
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s, background 0.2s, transform 0.2s;
        }
        .footer-icon-btn:hover {
          color: var(--foreground);
          border-color: var(--line-hover);
          background: var(--surface-subtle);
          transform: translateY(-2px);
        }
      `}</style>
    </footer>
  );
}
