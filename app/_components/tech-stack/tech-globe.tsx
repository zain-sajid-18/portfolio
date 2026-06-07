'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { techGlobeItems } from '@/app/_lib/data';
import { prefersReducedMotion } from '@/app/_lib/utils';

function OrbitalDisplay() {
  return (
    <div className="relative w-full min-h-[480px] flex items-center justify-center overflow-hidden">
      {/* Core glow */}
      <div
        className="absolute w-28 h-28 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(116,167,255,0.35), rgba(91,224,173,0.15) 50%, transparent 70%)',
          animation: 'pulse-glow 3s ease-in-out infinite',
        }}
      />

      {/* Orbit rings */}
      {[140, 185, 230].map((size, i) => (
        <div
          key={size}
          className="absolute rounded-full border border-[var(--line)]"
          style={{
            width: size,
            height: size,
            borderColor: i === 1 ? 'rgba(116,167,255,0.2)' : 'rgba(91,224,173,0.12)',
            animation: `spin-slow ${18 + i * 6}s linear infinite ${i % 2 ? 'reverse' : ''}`,
          }}
        />
      ))}

      {/* Orbiting tech labels */}
      {techGlobeItems.map((item, i) => {
        const radius = 115 + (i % 3) * 32;
        return (
          <motion.div
            key={item.name}
            className="absolute tech-orbit-item"
            style={{
              width: radius * 2,
              height: radius * 2,
              animation: `spin-slow ${22 + (i % 5) * 3}s linear infinite`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
          >
            <span
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold border border-[var(--line)] bg-[var(--panel-strong)] whitespace-nowrap hover:scale-110 transition-transform cursor-default"
              style={{
                color: item.color,
                animation: `spin-slow ${22 + (i % 5) * 3}s linear infinite reverse`,
                boxShadow: `0 0 12px ${item.color}22`,
              }}
            >
              {item.name}
            </span>
          </motion.div>
        );
      })}

      <div className="absolute text-center z-10 pointer-events-none">
        <p className="text-xs font-mono text-[var(--soft)] uppercase tracking-widest">Core Stack</p>
        <p className="text-lg font-bold gradient-text mt-1">MERN</p>
      </div>
    </div>
  );
}

function shouldUseFallback() {
  if (typeof window === 'undefined') return true;
  return prefersReducedMotion();
}

export function TechGlobe() {
  const [reduced, setReduced] = useState(shouldUseFallback);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  if (reduced) {
    return (
      <div className="flex flex-wrap gap-2 p-8 min-h-[300px] items-center justify-center">
        {techGlobeItems.map((item) => (
          <span
            key={item.name}
            className="px-3 py-1.5 rounded-full text-xs font-mono border border-[var(--line)]"
            style={{ color: item.color }}
          >
            {item.name}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div aria-hidden="true">
      <OrbitalDisplay />
    </div>
  );
}
