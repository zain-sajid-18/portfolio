import { ScrollReveal } from './scroll-reveal';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <ScrollReveal className={`section-head ${className || ''}`}>
      <div>
        <div className="eyebrow">
          <span className="dot" />
          {eyebrow}
        </div>
        <h2>{title}</h2>
      </div>
      {description && <p className="section-copy">{description}</p>}
    </ScrollReveal>
  );
}
