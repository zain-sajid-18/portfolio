import { ScrollReveal } from './scroll-reveal';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({ eyebrow, title, description, className }: SectionHeaderProps) {
  return (
    <ScrollReveal className={className}>
      <div className="mb-10 sm:mb-12">
        <div className="eyebrow mb-3">
          <span className="dot" />
          {eyebrow}
        </div>
        <h2 className="text-[clamp(26px,4vw,46px)] font-extrabold leading-tight tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-[15px] text-[var(--muted)] mt-3 leading-[1.75] max-w-[560px]">
            {description}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}
