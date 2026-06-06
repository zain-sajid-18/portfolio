'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export function useSmoothScroll() {
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Sync scroll with hash changes
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          lenis.scrollTo(target as HTMLElement, { offset: -80 });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    // Also handle initial load with hash
    if (window.location.hash) {
      setTimeout(() => {
        handleHashChange();
      }, 500);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('hashchange', handleHashChange);
      lenis.destroy();
    };
  }, []);
}
