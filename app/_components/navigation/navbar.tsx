'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { useTheme } from '@/app/_components/providers/theme-provider';
import { navLinks, personalInfo } from '@/app/_lib/data';
import { cn } from '@/app/_lib/utils';

interface NavbarProps {
  introComplete?: boolean;
}

export function Navbar({ introComplete = true }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!introComplete) return;
    const sectionIds = ['hero', ...navLinks.map((l) => l.href.replace('#', ''))];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-42% 0px -52% 0px', threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [introComplete]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.navbar-mobile') && !target.closest('.navbar-menu-btn')) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 pt-4 pointer-events-none">
      <motion.div
        className="shell navbar-shell pointer-events-auto"
        initial={{ y: -70, opacity: 0 }}
        animate={introComplete ? { y: 0, opacity: 1 } : { y: -70, opacity: 0 }}
        transition={{ duration: 0.72, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* ── Brand ── */}
        <a href="#hero" className="navbar-brand" aria-label={`${personalInfo.name} — back to top`}>
          <span className="navbar-mark">{personalInfo.initials}</span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="text-[13px] font-bold tracking-tight text-[var(--foreground)]">
              {personalInfo.firstName}
            </span>
            <span className="text-[10px] font-mono text-[var(--soft)] uppercase tracking-widest">
              {personalInfo.lastName}
            </span>
          </span>
        </a>

        {/* ── Desktop nav dock ── */}
        <nav
          className={cn('navbar-dock hidden lg:flex', scrolled && 'navbar-dock--scrolled')}
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => {
            const id = link.href.replace('#', '');
            const isActive = activeSection === id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn('navbar-link', isActive && 'navbar-link--active')}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="relative z-10">{link.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="navbar-glow"
                    className="navbar-link-glow"
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* ── Actions ── */}
        <div className="flex items-center gap-2 justify-self-end">
          {/* Availability badge — desktop only */}
          <span className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--line)] bg-[var(--surface-subtle)] text-[11px] font-mono text-[var(--accent-green)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
            Available
          </span>

          <button
            onClick={toggleTheme}
            className="navbar-icon-btn"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <motion.span
              key={theme}
              initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.28 }}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </motion.span>
          </button>

          <a
            href={`mailto:${personalInfo.email}`}
            className="navbar-cta hidden sm:inline-flex"
          >
            Hire Me <ArrowUpRight size={13} />
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="navbar-icon-btn navbar-menu-btn lg:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {menuOpen ? <X size={17} /> : <Menu size={17} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="shell mt-2 navbar-mobile pointer-events-auto"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            aria-label="Mobile navigation"
          >
            <div className="grid gap-0.5">
              {navLinks.map((link, i) => {
                const id = link.href.replace('#', '');
                const isActive = activeSection === id;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'navbar-mobile-link',
                      isActive && 'navbar-mobile-link--active'
                    )}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <span
                      className="text-[10px] font-mono mr-2 opacity-40"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {link.label}
                    {isActive && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--accent-green)]" />
                    )}
                  </motion.a>
                );
              })}
            </div>
            <div className="mt-2 pt-2 border-t border-[var(--line)] flex gap-2">
              <a
                href={`mailto:${personalInfo.email}`}
                className="btn-primary flex-1 justify-center text-[13px]"
                style={{ minHeight: 40 }}
                onClick={() => setMenuOpen(false)}
              >
                Hire Me <ArrowUpRight size={13} />
              </a>
              <button
                onClick={() => { toggleTheme(); setMenuOpen(false); }}
                className="navbar-icon-btn shrink-0"
                aria-label="Toggle theme"
                style={{ width: 40, height: 40 }}
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .navbar-mobile-link--active {
          background: var(--surface-subtle);
          color: var(--foreground);
          font-weight: 600;
        }
      `}</style>
    </header>
  );
}
