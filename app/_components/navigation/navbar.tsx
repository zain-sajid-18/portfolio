'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ArrowUpRight, Zap } from 'lucide-react';
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
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: '-42% 0px -52% 0px', threshold: 0 }
    );
    sectionIds.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [introComplete]);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest('#mobile-nav') && !t.closest('.navbar-menu-btn')) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none">
      {/* ── Top bar ── */}
      <div className="px-3 sm:px-4 pt-3">
        <motion.div
          className={cn('nav-bar pointer-events-auto', scrolled && 'nav-bar--scrolled')}
          initial={{ y: -80, opacity: 0 }}
          animate={introComplete ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
          transition={{ duration: 0.68, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ── Brand ── */}
          <a href="#hero" className="nav-brand" aria-label="Back to top">
            <span className="nav-logo">
              <span className="nav-logo-text">{personalInfo.initials}</span>
              <span className="nav-logo-ring" />
            </span>
            <span className="nav-brand-name">
              <span className="nav-brand-first">{personalInfo.firstName}</span>
              <span className="nav-brand-last">{personalInfo.lastName}</span>
            </span>
          </a>

          {/* ── Desktop links ── */}
          <nav className="nav-links hidden lg:flex" aria-label="Primary navigation">
            {navLinks.map((link) => {
              const id = link.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn('nav-link', isActive && 'nav-link--active')}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="nav-link-pill"
                      transition={{ type: 'spring', stiffness: 400, damping: 36 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* ── Actions ── */}
          <div className="nav-actions">
            {/* Available badge — lg+ only */}
            <span className="nav-badge hidden lg:flex">
              <span className="nav-badge-dot" />
              Open to work
            </span>

            {/* Theme */}
            <button onClick={toggleTheme} className="nav-icon-btn" aria-label="Toggle theme">
              <motion.span
                key={theme}
                initial={{ rotate: -30, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                style={{ display: 'flex' }}
              >
                {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
              </motion.span>
            </button>

            {/* Hire Me — sm+ */}
            <a href={`mailto:${personalInfo.email}`} className="nav-cta hidden sm:inline-flex">
              <Zap size={12} />
              Hire Me
            </a>

            {/* Hamburger — below lg */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="nav-icon-btn navbar-menu-btn lg:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.16 }}
                  style={{ display: 'flex' }}
                >
                  {menuOpen ? <X size={16} /> : <Menu size={16} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </motion.div>
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            className="nav-drawer pointer-events-auto mx-3 mt-2"
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Mobile navigation"
          >
            {/* Section label */}
            <p className="nav-drawer-label">Navigation</p>

            {/* Links */}
            <div className="grid gap-1">
              {navLinks.map((link, i) => {
                const id = link.href.replace('#', '');
                const isActive = activeSection === id;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className={cn('nav-drawer-link', isActive && 'nav-drawer-link--active')}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <span className="nav-drawer-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="flex-1">{link.label}</span>
                    {isActive && <span className="nav-drawer-active-dot" />}
                  </motion.a>
                );
              })}
            </div>

            {/* Bottom actions */}
            <div className="nav-drawer-footer">
              <a
                href={`mailto:${personalInfo.email}`}
                className="btn-primary flex-1 justify-center text-[13px]"
                onClick={() => setMenuOpen(false)}
              >
                <Zap size={13} /> Hire Me
              </a>
              <button
                onClick={() => { toggleTheme(); setMenuOpen(false); }}
                className="nav-icon-btn"
                aria-label="Toggle theme"
                style={{ width: 44, height: 44 }}
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
