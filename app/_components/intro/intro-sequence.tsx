'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroSequenceProps {
  onComplete: () => void;
}

export function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Check if intro was already shown this session
    if (sessionStorage.getItem('intro-seen')) {
      setVisible(false);
      onComplete();
      return;
    }

    const phases = [
      800,   // Phase 0: stars appear
      1200,  // Phase 1: "FROM VISION"
      1000,  // Phase 2: "TO REALITY"
      1200,  // Phase 3: "JUST ONE LINE AT A TIME"
      800,   // Phase 4: cursor typing effect
      600,   // Phase 5: fade out
    ];

    let currentPhase = 0;
    const advancePhase = () => {
      currentPhase++;
      if (currentPhase < phases.length) {
        setPhase(currentPhase);
        timerRef.current = setTimeout(advancePhase, phases[currentPhase]);
      } else {
        handleComplete();
      }
    };

    timerRef.current = setTimeout(advancePhase, phases[0]);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem('intro-seen', 'true');
    setVisible(false);
    setTimeout(onComplete, 500);
  };

  const handleSkip = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    handleComplete();
  };

  // Generate random star positions (deterministic for SSR)
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: ((i * 17 + 31) % 100),
    y: ((i * 23 + 7) % 100),
    size: 1 + (i % 3),
    delay: (i % 8) * 0.1,
  }));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ background: '#08090b' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Stars */}
          <div className="absolute inset-0">
            {stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: star.size,
                  height: star.size,
                  background: 'white',
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: phase >= 0 ? [0, 0.8, 0.4, 0.9] : 0,
                  scale: phase >= 0 ? 1 : 0,
                }}
                transition={{
                  duration: 1.5,
                  delay: star.delay,
                  opacity: { repeat: Infinity, duration: 3 + star.delay },
                }}
              />
            ))}
          </div>

          {/* Nebula glow */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 0.4 : 0 }}
            transition={{ duration: 1.5 }}
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(116,167,255,0.15), transparent 60%)',
            }}
          />

          {/* Text content */}
          <div className="relative z-10 text-center">
            <AnimatePresence mode="wait">
              {phase >= 1 && phase < 2 && (
                <motion.h1
                  key="vision"
                  className="text-5xl md:text-7xl font-bold tracking-tight"
                  style={{ color: '#f3f7fb' }}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 1.1, filter: 'blur(8px)' }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  FROM{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #74a7ff, #5be0ad)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    VISION
                  </span>
                </motion.h1>
              )}

              {phase >= 2 && phase < 3 && (
                <motion.h1
                  key="reality"
                  className="text-5xl md:text-7xl font-bold tracking-tight"
                  style={{ color: '#f3f7fb' }}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 1.1, filter: 'blur(8px)' }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  TO{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #5be0ad, #ffd166)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    REALITY
                  </span>
                </motion.h1>
              )}

              {phase >= 3 && phase < 5 && (
                <motion.div
                  key="tagline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, filter: 'blur(8px)' }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.p
                    className="text-xl md:text-2xl font-light tracking-widest mb-6"
                    style={{
                      color: '#aab5c0',
                      fontFamily: 'var(--font-geist-mono), monospace',
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    JUST ONE LINE AT A TIME
                  </motion.p>

                  {/* Typing cursor */}
                  {phase >= 4 && (
                    <motion.div
                      className="flex items-center justify-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span
                        className="text-sm md:text-base"
                        style={{
                          color: '#5be0ad',
                          fontFamily: 'var(--font-geist-mono), monospace',
                        }}
                      >
                        {'> const portfolio = await build()'}
                      </span>
                      <motion.span
                        className="inline-block w-[2px] h-5"
                        style={{ background: '#5be0ad' }}
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Skip button */}
          <motion.button
            className="absolute bottom-8 right-8 z-20 px-4 py-2 text-sm rounded-lg border transition-colors"
            style={{
              color: '#707b86',
              borderColor: 'rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.04)',
              fontFamily: 'var(--font-geist-mono), monospace',
              cursor: 'pointer',
            }}
            onClick={handleSkip}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ color: '#f3f7fb', borderColor: 'rgba(255,255,255,0.3)' }}
          >
            Skip →
          </motion.button>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px]"
            style={{
              background: 'linear-gradient(90deg, #74a7ff, #5be0ad)',
            }}
            initial={{ width: '0%' }}
            animate={{ width: `${(phase / 5) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
