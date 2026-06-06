'use client';

import { useState } from 'react';
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

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  // Initialize Lenis smooth scroll on mount
  useSmoothScroll();

  return (
    <>
      {/* Cinematic Intro Animation */}
      <IntroSequence onComplete={() => setIntroComplete(true)} />

      {/* Main Portfolio Layout */}
      {introComplete && (
        <div className="flex flex-col min-h-screen">
          <Navbar />
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
      )}
    </>
  );
}

