'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { techGlobeItems } from '@/app/_lib/data';
import { prefersReducedMotion } from '@/app/_lib/utils';

function OrbitalDisplay() {
  return (
    <div className="relative w-full min-h-[380px] sm:min-h-[420px] md:min-h-[480px] flex items-center justify-center overflow-hidden">
      {/* Background depth layers */}
      <div
        className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full opacity-40"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(116,167,255,0.22) 0%, rgba(91,224,173,0.10) 40%, transparent 68%)',
          filter: 'blur(24px)',
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] rounded-full opacity-30"
        style={{
          background:
            'radial-gradient(circle at 70% 60%, rgba(255,140,159,0.18) 0%, rgba(255,209,102,0.08) 45%, transparent 70%)',
          filter: 'blur(20px)',
          animation: 'float 7.5s ease-in-out 0.8s infinite reverse',
        }}
      />

      {/* Core inner glow */}
      <div
        className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(116,167,255,0.55), rgba(91,224,173,0.25) 45%, transparent 72%)',
          animation: 'pulse-glow 3s ease-in-out infinite',
        }}
      />
      {/* Core solid center */}
      <div
        className="absolute w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
        style={{
          background:
            'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.28), rgba(116,167,255,0.35) 35%, rgba(91,224,173,0.25) 65%, transparent 100%)',
          border: '1px solid rgba(116,167,255,0.35)',
          boxShadow:
            '0 0 40px rgba(116,167,255,0.25), inset 0 0 20px rgba(91,224,173,0.15)',
        }}
      >
        <div
          className="w-3 h-3 rounded-full bg-white"
          style={{
            boxShadow: '0 0 14px rgba(255,255,255,0.8)',
            animation: 'pulse-glow 1.8s ease-in-out infinite',
          }}
        />
      </div>

      {/* Orbit rings — with subtle perspective tilt */}
      {[130, 175, 220].map((size, i) => (
        <div
          key={size}
          className="absolute rounded-full border"
          style={{
            width: size,
            height: size,
            borderColor:
              i === 1 ? 'rgba(116,167,255,0.25)' : 'rgba(91,224,173,0.18)',
            transform: `perspective(700px) rotateX(${i % 2 === 0 ? 62 + i * 4 : 58 - i * 3}deg) rotateZ(${i * 6}deg)`,
            animation: `spin-slow ${18 + i * 7}s linear infinite ${i % 2 ? 'reverse' : ''}`,
            boxShadow:
              i === 1
                ? 'inset 0 0 24px rgba(116,167,255,0.08)'
                : 'inset 0 0 18px rgba(91,224,173,0.05)',
          }}
        />
      ))}

      {/* Orbiting tech labels with Neo-Brutalist pop */}
      {techGlobeItems.map((item, i) => {
        const radius = 105 + (i % 3) * 34;
        const spinDur = 22 + (i % 5) * 3.5;
        return (
          <motion.div
            key={item.name}
            className="absolute tech-orbit-item"
            style={{
              width: radius * 2,
              height: radius * 2,
              animation: `spin-slow ${spinDur}s linear infinite`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.045, duration: 0.42 }}
          >
            <span
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2.5 sm:px-3 py-1 rounded-md text-[10px] sm:text-[11px] font-mono font-bold border whitespace-nowrap cursor-default select-none"
              style={{
                color: item.color,
                borderColor: `${item.color}40`,
                background: 'var(--panel-strong)',
                animation: `spin-slow ${spinDur}s linear infinite reverse, float ${3 + (i % 4) * 0.5}s ease-in-out ${i * 0.2}s infinite`,
                boxShadow: `1px 2px 0 0 ${item.color}30, 0 0 14px ${item.color}22`,
                transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = `${el.style.transform} scale(1.12)`;
                el.style.boxShadow = `3px 4px 0 0 ${item.color}45, 0 10px 24px ${item.color}28`;
                el.style.zIndex = '5';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = `1px 2px 0 0 ${item.color}30, 0 0 14px ${item.color}22`;
                el.style.zIndex = '';
              }}
            >
              {item.name}
            </span>
          </motion.div>
        );
      })}

      {/* Center label */}
      <div className="absolute text-center z-10 pointer-events-none">
        <p className="text-[10px] sm:text-xs font-mono text-[var(--soft)] uppercase tracking-[0.18em]">
          Core Stack
        </p>
        <p className="text-[20px] sm:text-2xl font-extrabold gradient-text mt-1 tracking-tight">
          MERN
        </p>
        <div
          className="mt-2 mx-auto w-10 h-[2px] rounded-full"
          style={{
            background:
              'linear-gradient(90deg, transparent, var(--accent-green), var(--accent-blue), transparent)',
          }}
        />
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
