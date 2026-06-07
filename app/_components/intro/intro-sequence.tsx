'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroSequenceProps {
  onComplete: () => void;
}

const PHASE_DURATIONS = [900, 1400, 1200, 1400, 1000, 700, 800];

function StaggerWord({ word, gradient }: { word: string; gradient: string }) {
  return (
    <span className="inline-flex">
      {word.split('').map((char, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -30, filter: 'blur(6px)' }}
          transition={{ duration: 0.45, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            display: 'inline-block',
            background: gradient,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [phase, setPhase] = useState(0);
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const handleComplete = useCallback(() => {
    setExiting(true);
    setTimeout(() => onCompleteRef.current(), 900);
  }, []);

  useEffect(() => {
    let currentPhase = 0;
    const advancePhase = () => {
      currentPhase++;
      if (currentPhase < PHASE_DURATIONS.length) {
        setPhase(currentPhase);
        timerRef.current = setTimeout(advancePhase, PHASE_DURATIONS[currentPhase]);
      } else {
        handleComplete();
      }
    };

    timerRef.current = setTimeout(advancePhase, PHASE_DURATIONS[0]);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [handleComplete]);

  const handleSkip = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    handleComplete();
  };

  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: ((i * 17 + 31) % 100),
    y: ((i * 23 + 7) % 100),
    size: 1 + (i % 3),
    delay: (i % 8) * 0.08,
  }));

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ background: '#08090b' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Starfield */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0.3, 0.8] }}
            transition={{ duration: 2.5, delay: star.delay, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Nebula layers */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: phase >= 1 ? [0.3, 0.5, 0.35] : 0 }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          background:
            'radial-gradient(ellipse at 30% 40%, rgba(116,167,255,0.18), transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(91,224,173,0.12), transparent 45%)',
        }}
      />

      {/* Scan line */}
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-green)]/40 to-transparent"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />

      {/* Cinematic bars */}
      <motion.div
        className="absolute inset-x-0 top-0 bg-black z-20"
        animate={{ height: exiting ? 0 : phase >= 6 ? 0 : '12vh' }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 bg-black z-20"
        animate={{ height: exiting ? 0 : phase >= 6 ? 0 : '12vh' }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Text */}
      <div className="relative z-10 text-center px-6">
        <AnimatePresence mode="wait">
          {phase >= 1 && phase < 2 && (
            <motion.h1
              key="vision"
              className="text-5xl md:text-8xl font-bold tracking-tight text-[#f3f7fb]"
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(12px)' }}
              transition={{ duration: 0.5 }}
            >
              FROM <StaggerWord word="VISION" gradient="linear-gradient(135deg, #74a7ff, #5be0ad)" />
            </motion.h1>
          )}

          {phase >= 2 && phase < 3 && (
            <motion.h1
              key="reality"
              className="text-5xl md:text-8xl font-bold tracking-tight text-[#f3f7fb]"
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(12px)' }}
              transition={{ duration: 0.5 }}
            >
              TO <StaggerWord word="REALITY" gradient="linear-gradient(135deg, #5be0ad, #ffd166)" />
            </motion.h1>
          )}

          {phase >= 3 && phase < 6 && (
            <motion.div
              key="tagline"
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
            >
              <motion.p
                className="text-lg md:text-2xl font-light tracking-[0.35em] text-[var(--muted)] mb-8 font-mono"
                initial={{ opacity: 0, letterSpacing: '0.1em' }}
                animate={{ opacity: 1, letterSpacing: '0.35em' }}
                transition={{ duration: 0.8 }}
              >
                JUST ONE LINE AT A TIME
              </motion.p>

              {phase >= 4 && (
                <motion.div
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/10 bg-white/[0.03] font-mono text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span className="text-[var(--accent-green)]">{'>'}</span>
                  <Typewriter text="const reality = await build(vision)" />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Wipe overlay on exit */}
      <motion.div
        className="absolute inset-0 z-30 bg-[var(--background)]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: exiting ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: 'left center' }}
      />

      <motion.button
        className="absolute bottom-10 right-10 z-40 px-4 py-2 text-sm rounded-full border border-white/10 bg-white/[0.04] text-[var(--soft)] font-mono cursor-pointer hover:text-white hover:border-white/25 transition-colors"
        onClick={handleSkip}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Skip →
      </motion.button>

      <motion.div
        className="absolute bottom-0 left-0 h-[2px] z-40"
        style={{ background: 'linear-gradient(90deg, #74a7ff, #5be0ad, #ffd166)' }}
        animate={{ width: `${Math.min((phase / (PHASE_DURATIONS.length - 1)) * 100, 100)}%` }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

function Typewriter({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="text-[var(--accent-blue)]">
      {displayed}
      <motion.span
        className="inline-block w-[2px] h-4 bg-[var(--accent-green)] ml-0.5 align-middle"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
    </span>
  );
}
