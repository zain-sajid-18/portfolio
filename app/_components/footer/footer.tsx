'use client';

import { ArrowUp, Link, FileCode, Mail, Heart } from 'lucide-react';
import { personalInfo } from '@/app/_lib/data';

export function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--footer-bg)] backdrop-blur-md pt-12 pb-8 relative z-[1]">
      <div className="shell">

        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2.5">
              <span
                className="w-9 h-9 rounded-xl grid place-items-center text-[11px] font-extrabold shrink-0 shadow-[0_2px_12px_rgba(116,167,255,0.3)]"
                style={{ background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-green))', color: '#03111e' }}
              >
                {personalInfo.initials}
              </span>
              <div>
                <p className="font-bold text-sm tracking-tight leading-tight">{personalInfo.name}</p>
                <p className="text-[11px] font-mono text-[var(--soft)] tracking-wide">{personalInfo.title}</p>
              </div>
            </div>
            <p className="text-[12px] text-[var(--soft)] font-mono mt-1 max-w-[280px] leading-relaxed">
              Building scalable, production-grade systems — one clean commit at a time.
            </p>
          </div>

          {/* Right — availability + scroll top */}
          <div className="flex flex-col items-start sm:items-end gap-3">
            {/* Availability */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--accent-green)]/25 bg-[var(--accent-green)]/6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-green)] opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-green)]" />
              </span>
              <span className="text-xs font-mono font-semibold text-[var(--accent-green)] tracking-wide">
                {personalInfo.availability}
              </span>
            </div>

            {/* Scroll to top — visible & labelled */}
            <button
              onClick={handleScrollTop}
              className="footer-scroll-top"
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
              <span className="text-[11px] font-mono">Back to top</span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-6 rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, var(--line), var(--line), transparent)' }}
        />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-[var(--soft)] font-mono flex items-center gap-1.5 order-2 sm:order-1">
            © {year} {personalInfo.name} Lahore, PK
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-1.5 order-1 sm:order-2">
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon-btn"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Link size={15} />
            </a>
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon-btn"
              aria-label="GitHub"
              title="GitHub"
            >
              <FileCode size={15} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="footer-icon-btn"
              aria-label="Send email"
              title={personalInfo.email}
            >
              <Mail size={15} />
            </a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .footer-icon-btn {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          border: 1px solid var(--line);
          background: transparent;
          color: var(--soft);
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s, background 0.2s, transform 0.18s, box-shadow 0.18s;
        }
        .footer-icon-btn:hover {
          color: var(--foreground);
          border-color: rgba(116,167,255,0.35);
          background: var(--surface-subtle);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(116,167,255,0.12);
        }
        [data-theme="light"] .footer-icon-btn:hover {
          border-color: rgba(29,78,216,0.25);
          box-shadow: 0 4px 12px rgba(29,78,216,0.1);
        }

        .footer-scroll-top {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 999px;
          border: 1px solid var(--line);
          background: var(--surface-subtle);
          color: var(--muted);
          cursor: pointer;
          font-size: 12px;
          transition: color 0.2s, border-color 0.2s, background 0.2s, transform 0.18s;
        }
        .footer-scroll-top:hover {
          color: var(--foreground);
          border-color: rgba(116,167,255,0.35);
          background: var(--surface-hover);
          transform: translateY(-2px);
        }
      `}</style>
    </footer>
  );
}
