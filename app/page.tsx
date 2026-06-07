'use client';

import { useState, useCallback, useEffect } from 'react';
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
import { ContactSection } from '@/app/_components/contact/contact-section';
import { Footer } from '@/app/_components/footer/footer';

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
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
