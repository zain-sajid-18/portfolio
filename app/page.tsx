'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useSmoothScroll } from '@/app/_hooks/use-smooth-scroll';
import { IntroSequence } from '@/app/_components/intro/intro-sequence';
import { Navbar } from '@/app/_components/navigation/navbar';
import { HeroSection } from '@/app/_components/hero/hero-section';
import { AboutSection } from '@/app/_components/about/about-section';
import { TechSection } from '@/app/_components/tech-stack/tech-section';
import { ProjectsSection } from '@/app/_components/projects/projects-section';
import { ExperienceSection } from '@/app/_components/experience/experience-section';
import { SkillsSection } from '@/app/_components/skills/skills-section';
import { AchievementsSection } from '@/app/_components/achievements/achievements-section';
import { TestimonialsSection } from '@/app/_components/testimonials/testimonials-section';
import { ContactSection } from '@/app/_components/contact/contact-section';
import { Footer } from '@/app/_components/footer/footer';
import { CustomCursor } from '@/app/_components/ui/custom-cursor';

/* ─────────────────────────────────────────────
   Ambient Floating Orbs — background depth layer
   Mouse-parallax + slow drift, non-interactive
───────────────────────────────────────────── */
function AmbientOrbs() {
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = orbsRef.current;
    if (!root) return undefined;
    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    const t0 = performance.now();

    const onMove = (e: MouseEvent) => {
      targetX = ((e.clientX / window.innerWidth) - 0.5) * 2;  // -1..1
      targetY = ((e.clientY / window.innerHeight) - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const tick = () => {
      const t = (performance.now() - t0) / 1000;
      curX += (targetX - curX) * 0.04;
      curY += (targetY - curY) * 0.04;
      const children = root.children as HTMLCollectionOf<HTMLDivElement>;
      for (let i = 0; i < children.length; i++) {
        const depth = 0.15 + i * 0.12;
        const ox = curX * depth * 60;
        const oy = curY * depth * 40;
        const driftX = Math.sin(t * (0.18 + i * 0.07) + i) * (8 + i * 5);
        const driftY = Math.cos(t * (0.14 + i * 0.05) + i * 1.3) * (8 + i * 5);
        children[i].style.transform = `translate3d(${ox + driftX}px, ${oy + driftY}px, 0) scale(${1 + Math.sin(t * 0.4 + i) * 0.05})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div
      ref={orbsRef}
      className="fixed inset-0 pointer-events-none z-[0] overflow-hidden"
      aria-hidden="true"
    >
      {/* Orb 1 — green, top-left */}
      <div
        className="absolute w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] rounded-full opacity-40 sm:opacity-50"
        style={{
          top: '-10%',
          left: '-8%',
          background:
            'radial-gradient(circle, rgba(52,211,153,0.45) 0%, rgba(52,211,153,0.15) 40%, transparent 70%)',
          filter: 'blur(30px)',
          willChange: 'transform',
        }}
      />
      {/* Orb 2 — blue, top-right */}
      <div
        className="absolute w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] rounded-full opacity-40 sm:opacity-50"
        style={{
          top: '5%',
          right: '-6%',
          background:
            'radial-gradient(circle, rgba(129,140,248,0.5) 0%, rgba(96,165,250,0.15) 40%, transparent 70%)',
          filter: 'blur(32px)',
          willChange: 'transform',
        }}
      />
      {/* Orb 3 — rose, mid-left */}
      <div
        className="absolute w-[240px] h-[240px] sm:w-[360px] sm:h-[360px] rounded-full opacity-30 sm:opacity-35 hidden sm:block"
        style={{
          top: '42%',
          left: '-4%',
          background:
            'radial-gradient(circle, rgba(251,113,133,0.45) 0%, rgba(251,113,133,0.12) 42%, transparent 70%)',
          filter: 'blur(36px)',
          willChange: 'transform',
        }}
      />
      {/* Orb 4 — amber, mid-bottom */}
      <div
        className="absolute w-[260px] h-[260px] sm:w-[400px] sm:h-[400px] rounded-full opacity-28 sm:opacity-35"
        style={{
          bottom: '-8%',
          left: '28%',
          background:
            'radial-gradient(circle, rgba(251,191,36,0.45) 0%, rgba(251,191,36,0.1) 42%, transparent 70%)',
          filter: 'blur(34px)',
          willChange: 'transform',
        }}
      />
      {/* Orb 5 — cyan, bottom-right */}
      <div
        className="absolute w-[220px] h-[220px] sm:w-[340px] sm:h-[340px] rounded-full opacity-35 sm:opacity-45 hidden sm:block"
        style={{
          bottom: '10%',
          right: '-4%',
          background:
            'radial-gradient(circle, rgba(103,232,249,0.45) 0%, rgba(103,232,249,0.1) 42%, transparent 70%)',
          filter: 'blur(28px)',
          willChange: 'transform',
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Scroll Progress Bar — top of viewport gradient
───────────────────────────────────────────── */
function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return undefined;
    let raf = 0;
    const update = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight || 1;
      const pct = Math.max(0, Math.min(100, (scrollTop / height) * 100));
      bar.style.width = `${pct}%`;
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <div id="scroll-progress" />;
}

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  useSmoothScroll(introComplete);

  const handleIntroComplete = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    history.replaceState(null, '', window.location.pathname);
    setIntroComplete(true);
  }, []);

  useEffect(() => {
    if (!introComplete) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
    document.body.style.overflow = '';
    window.scrollTo(0, 0);
  }, [introComplete]);

  return (
    <>
      {!introComplete && <IntroSequence onComplete={handleIntroComplete} />}

      <AmbientOrbs />
      <ScrollProgress />

      <div
        className={`flex flex-col min-h-screen relative z-[1] transition-opacity duration-700 ${
          introComplete ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!introComplete}
      >
        <Navbar introComplete={introComplete} />
        <main className="flex-grow">
          <HeroSection />
          <AboutSection />
          <TechSection />
          <ProjectsSection />
          <ExperienceSection />
          <SkillsSection />
          <AchievementsSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
      <CustomCursor />
    </>
  );
}
