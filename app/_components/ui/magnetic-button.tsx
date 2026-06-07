'use client';

import { useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/app/_lib/utils';

interface MagneticButtonBaseProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

interface MagneticButtonAsButton extends MagneticButtonBaseProps {
  as?: 'button';
  href?: never;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  'aria-label'?: string;
}

interface MagneticButtonAsLink extends MagneticButtonBaseProps {
  as: 'a';
  href: string;
  target?: string;
  rel?: string;
  download?: boolean;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  'aria-label'?: string;
}

type MagneticButtonProps = MagneticButtonAsButton | MagneticButtonAsLink;

export function MagneticButton({
  children,
  className,
  strength = 0.25,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  const motionProps = {
    animate: { x: position.x, y: position.y },
    transition: { type: 'spring' as const, stiffness: 350, damping: 20 },
  };

  if (props.as === 'a') {
    const { href, target, rel, download, onClick, 'aria-label': ariaLabel } = props;
    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...motionProps}
        className="inline-block"
      >
        <a
          href={href}
          target={target}
          rel={rel}
          download={download}
          onClick={onClick}
          aria-label={ariaLabel}
          className={cn(className)}
        >
          {children}
        </a>
      </motion.div>
    );
  }

  const { type = 'button', onClick, disabled, 'aria-label': ariaLabel } = props;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...motionProps}
      className="inline-block"
    >
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        className={cn(className)}
      >
        {children}
      </button>
    </motion.div>
  );
}
