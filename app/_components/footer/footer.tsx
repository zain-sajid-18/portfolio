'use client';

import { ArrowUp, Link, FileCode, Mail } from 'lucide-react';
import { personalInfo } from '@/app/_lib/data';

export function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--footer-bg)] py-10 relative z-[1]">
      <div className="shell flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-sm font-semibold text-[var(--foreground)]">
          © {new Date().getFullYear()} {personalInfo.name}
        </p>

        <div className="flex items-center gap-2">
          <a
            href={personalInfo.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            style={{ width: 38, minHeight: 38, padding: 0 }}
            aria-label="LinkedIn"
          >
            <Link size={16} />
          </a>
          <a
            href={personalInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            style={{ width: 38, minHeight: 38, padding: 0 }}
            aria-label="GitHub"
          >
            <FileCode size={16} />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="btn-ghost"
            style={{ width: 38, minHeight: 38, padding: 0 }}
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
        </div>

        <button
          onClick={handleScrollTop}
          className="btn-ghost"
          style={{ width: 42, minHeight: 42, padding: 0, borderRadius: '50%' }}
          aria-label="Back to top"
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}
