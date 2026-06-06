'use client';

import { ArrowUp, Heart } from 'lucide-react';
import { personalInfo } from '@/app/_lib/data';

export function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--line)] bg-black/30 py-12">
      <div className="shell flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Branding & Copyright */}
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold flex items-center justify-center md:justify-start gap-1">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-xs text-[var(--soft)] mt-1.5">
            Designed & Engineered with{' '}
            <Heart size={10} className="inline text-[var(--accent-rose)] fill-current" /> by Zain
          </p>
        </div>

        {/* Center: Tech stack reference */}
        <div className="text-xs font-mono text-[var(--soft)] text-center">
          Built with <span className="text-[var(--accent-blue)]">Next.js 16</span> +{' '}
          <span className="text-[var(--accent-green)]">Tailwind v4</span> +{' '}
          <span className="text-[var(--accent-rose)]">Three.js</span>
        </div>

        {/* Right: Scroll to top */}
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
