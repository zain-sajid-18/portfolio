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

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 pt-5 pointer-events-none">
      <motion.div
        className="shell navbar-shell pointer-events-auto"
        initial={{ y: -70, opacity: 0 }}
        animate={introComplete ? { y: 0, opacity: 1 } : { y: -70, opacity: 0 }}
        transition={{ duration: 0.75, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Brand */}
        <a href="#hero" className="navbar-brand" aria-label={`${personalInfo.name} home`}>
          <span className="navbar-mark">{personalInfo.initials}</span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-bold text-[var(--foreground)]">{personalInfo.firstName}</span>
            <span className="text-[10px] font-mono text-[var(--soft)] uppercase tracking-widest">
              {personalInfo.lastName}
            </span>
          </span>
        </a>

        {/* Desktop dock */}
        <nav
          className={cn('navbar-dock hidden lg:flex', scrolled && 'navbar-dock--scrolled')}
          aria-label="Primary navigation"
        >
          {navLinks.map((link, i) => {
            const id = link.href.replace('#', '');
            const isActive = activeSection === id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn('navbar-link', isActive && 'navbar-link--active')}
                aria-current={isActive ? 'page' : undefined}
              >
                <span>{link.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="navbar-glow"
                    className="navbar-link-glow"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 justify-self-end">
          <button
            onClick={toggleTheme}
            className="navbar-icon-btn"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <a href={`mailto:${personalInfo.email}`} className="navbar-cta hidden sm:inline-flex">
            Hire Me <ArrowUpRight size={14} />
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="navbar-icon-btn lg:hidden"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="shell mt-3 navbar-mobile pointer-events-auto"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="navbar-mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={`mailto:${personalInfo.email}`}
              className="navbar-cta w-full justify-center mt-2"
              onClick={() => setMenuOpen(false)}
            >
              Hire Me <ArrowUpRight size={14} />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
