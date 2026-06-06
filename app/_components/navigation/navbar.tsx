'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/app/_components/providers/theme-provider';
import { navLinks, personalInfo } from '@/app/_lib/data';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.nav
      className="fixed z-50 left-1/2 -translate-x-1/2"
      style={{
        top: 14,
        width: 'min(var(--max-width), calc(100% - 28px))',
        height: 62,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 14px 0 18px',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius)',
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      aria-label="Primary navigation"
    >
      {/* Brand */}
      <a
        href="#hero"
        className="flex items-center gap-2.5 font-extrabold no-underline"
        aria-label={`${personalInfo.name} home`}
        onClick={() => setMenuOpen(false)}
      >
        <span
          className="grid place-items-center text-sm font-extrabold"
          style={{
            width: 34,
            height: 34,
            borderRadius: 7,
            background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-green))',
            color: '#061016',
          }}
        >
          {personalInfo.initials}
        </span>
        <span className="hidden sm:inline">{personalInfo.name}</span>
      </a>

      {/* Desktop Links */}
      <div className="hidden lg:flex items-center gap-1.5">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="btn-ghost text-sm"
            style={{ minHeight: 38, padding: '0 12px' }}
          >
            {link.label}
          </a>
        ))}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn-ghost"
          style={{ minHeight: 38, width: 38, padding: 0 }}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* CTA */}
        <a
          href={`mailto:${personalInfo.email}`}
          className="btn-primary text-sm ml-1"
          style={{ minHeight: 38 }}
        >
          Hire Me
        </a>
      </div>

      {/* Mobile Controls */}
      <div className="flex lg:hidden items-center gap-2">
        <button
          onClick={toggleTheme}
          className="btn-ghost"
          style={{ minHeight: 38, width: 38, padding: 0 }}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="btn-ghost"
          style={{ minHeight: 42, width: 42, padding: 0 }}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="absolute left-0 right-0 flex flex-col p-3 lg:hidden"
            style={{
              top: 70,
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius)',
              background: 'var(--nav-bg)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="btn-ghost w-full justify-start"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={`mailto:${personalInfo.email}`}
              className="btn-primary w-full mt-2"
              onClick={() => setMenuOpen(false)}
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
