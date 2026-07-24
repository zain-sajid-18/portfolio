'use client';

import { useState, useRef, useEffect, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitFork, ExternalLink, BookOpen, ArrowRight, Image as ImageIcon, X, Zap } from 'lucide-react';
import Image from 'next/image';
import { projects } from '@/app/_lib/data';
import { ScrollReveal } from '@/app/_components/ui/scroll-reveal';

const PALETTES: [string, string][] = [
  ['#74a7ff', '#5be0ad'],
  ['#5be0ad', '#ffd166'],
  ['#ff8c9f', '#74a7ff'],
  ['#ffd166', '#5be0ad'],
];

/* ── Project visual — real screenshot or gradient placeholder ── */
function ProjectVisual({
  index,
  large,
  image,
  title,
}: {
  index: number;
  large?: boolean;
  image?: string;
  title?: string;
}) {
  const [a, b] = PALETTES[index % PALETTES.length];
  const hasImage = !!image;

  return (
    <div
      className={`project-visual relative overflow-hidden ${
        large ? 'min-h-[260px]' : 'aspect-[16/9]'
      }`}
      style={
        hasImage
          ? undefined
          : { background: `linear-gradient(145deg, ${a}14 0%, ${b}0c 55%, transparent 100%)` }
      }
    >
      {hasImage ? (
        <>
          <Image
            src={image}
            alt={title ?? 'Project screenshot'}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            priority={index === 0}
          />
          {/* Subtle dark gradient so card body text stays readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--panel)] via-[var(--panel)]/20 to-transparent" />
          {/* Colour tint strip at top */}
          <div
            className="absolute inset-x-0 top-0 h-[3px]"
            style={{ background: `linear-gradient(90deg, ${a}, ${b})` }}
          />
        </>
      ) : (
        <>
          {/* Scan lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.15]"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${a}18 3px, ${a}18 4px)`,
            }}
          />
          {/* Centre placeholder */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-2.5 h-full opacity-20 pointer-events-none select-none">
            <ImageIcon size={large ? 40 : 28} style={{ color: a }} strokeWidth={1} />
            <span
              className="font-black tabular-nums"
              style={{ color: a, fontSize: large ? '5rem' : '3rem', lineHeight: 1 }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: b }}>
              screenshot
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--panel)] via-transparent to-transparent opacity-90" />
          <div
            className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full opacity-60"
            style={{ background: a, boxShadow: `0 0 6px ${a}` }}
          />
        </>
      )}
    </div>
  );
}

/* ── Single project card ── */
function ProjectCard({
  project,
  index,
  featured,
  onCaseStudy,
}: {
  project: (typeof projects)[0];
  index: number;
  featured?: boolean;
  onCaseStudy: (e: React.MouseEvent) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: MouseEvent) => {
    if (!ref.current || featured) return;
    const r = ref.current.getBoundingClientRect();
    setTilt({
      x: (e.clientY - r.top - r.height / 2) / 24,
      y: -(e.clientX - r.left - r.width / 2) / 24,
    });
  };

  const handleCardClick = () => {
    if (project.liveDemo) window.open(project.liveDemo, '_blank', 'noopener,noreferrer');
  };

  const [a] = PALETTES[index % PALETTES.length];

  return (
    <motion.article
      ref={ref}
      layout
      onMouseMove={onMove}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      style={{ transformStyle: 'preserve-3d' }}
      className={`project-card group ${project.liveDemo ? 'cursor-pointer' : 'cursor-default'} ${featured ? 'project-card--featured' : ''}`}
      data-cursor="pointer"
    >
      {/* Gradient border */}
      <div
        className="project-card-border"
        style={{
          opacity: hovered ? 1 : 0,
          background: `linear-gradient(135deg, ${a}60, ${PALETTES[index % PALETTES.length][1]}40, transparent)`,
        }}
      />

      <div className="project-card-inner" onClick={handleCardClick}>
        {/* Index badge */}
        <span className="project-index">{String(index + 1).padStart(2, '0')}</span>

        {/* Live indicator if URL set */}
        {project.liveDemo && (
          <span className="project-live-badge">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
            Live
          </span>
        )}

        <ProjectVisual index={index} large={featured} image={project.image} title={project.title} />

        <div className="project-card-body">
          <span className="project-category">{project.category}</span>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-desc">{project.description}</p>

          {/* Tags */}
          <div className="project-tags">
            {project.tags.slice(0, featured ? 6 : 3).map((tag) => (
              <span key={tag} className="project-tag">{tag}</span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="project-actions" onClick={(e) => e.stopPropagation()}>
            <a
              href={project.github ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-btn project-btn--ghost ${!project.github ? 'project-btn--disabled' : ''}`}
              aria-label="GitHub repository"
              tabIndex={project.github ? 0 : -1}
              onClick={(e) => { if (!project.github) e.preventDefault(); }}
            >
              <GitFork size={12} /> GitHub
            </a>
            <a
              href={project.liveDemo ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-btn project-btn--primary ${!project.liveDemo ? 'project-btn--disabled' : ''}`}
              aria-label="Live demo"
              tabIndex={project.liveDemo ? 0 : -1}
              onClick={(e) => { if (!project.liveDemo) e.preventDefault(); }}
            >
              <ExternalLink size={12} /> Live
            </a>
            <button
              className="project-btn project-btn--case ml-auto"
              onClick={onCaseStudy}
              aria-label="Open case study"
            >
              <BookOpen size={12} /> Case Study
              <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Section ── */
export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [featured, ...rest] = projects;

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  const openCaseStudy = (id: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProject(id);
  };

  return (
    <section id="projects" className="shell py-24 border-t border-[var(--line)]">
      <ScrollReveal direction="up">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow mb-3"><span className="dot" />03 // Creations</p>
            <h2 className="text-[clamp(28px,4vw,46px)] font-extrabold leading-tight">
              Project <span className="gradient-text">Galaxy</span>
            </h2>
          </div>
          <p className="text-[13px] text-[var(--muted)] max-w-sm leading-relaxed font-mono">
            Click a card → live demo. &nbsp;Case Study → architecture deep-dive.
          </p>
        </div>
      </ScrollReveal>

      <div className="projects-bento">
        {featured && (
          <ScrollReveal direction="up" className="project-bento-featured">
            <ProjectCard project={featured} index={0} featured onCaseStudy={openCaseStudy(featured.id)} />
          </ScrollReveal>
        )}
        <div className="project-bento-grid">
          {rest.map((project, i) => (
            <ScrollReveal key={project.id} direction="up" delay={i * 0.07}>
              <ProjectCard project={project} index={i + 1} onCaseStudy={openCaseStudy(project.id)} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* ── Case Study Modal ── */}
      <AnimatePresence>
        {selectedProject && (() => {
          const project = projects.find((p) => p.id === selectedProject);
          if (!project) return null;
          const idx = projects.findIndex((p) => p.id === project.id);
          const [a] = PALETTES[idx % PALETTES.length];

          return (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" role="dialog" aria-modal="true" aria-label={`${project.title} case study`}>
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
              />

              {/* Panel */}
              <motion.div
                className="modal-panel"
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.97 }}
                transition={{ type: 'spring', damping: 30, stiffness: 340 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Sticky modal header */}
                <div className="modal-header" style={{ '--modal-accent': a } as React.CSSProperties}>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: a }}>
                      {project.category}
                    </span>
                    <h2 className="text-xl font-extrabold truncate">{project.title}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="modal-close-btn shrink-0"
                    aria-label="Close case study"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Scrollable content */}
                <div className="modal-body">
                  <ProjectVisual index={idx} large image={project.image} title={project.title} />

                  <div className="p-6 md:p-8 grid gap-6">
                    {/* Description */}
                    <p className="text-[14px] text-[var(--muted)] leading-[1.8]">{project.description}</p>

                    {/* Highlights */}
                    <div>
                      <p className="text-[11px] font-mono uppercase tracking-widest text-[var(--soft)] mb-3 flex items-center gap-2">
                        <Zap size={11} style={{ color: a }} /> Engineering Highlights
                      </p>
                      <ul className="grid gap-2.5 list-none p-0 m-0">
                        {project.highlights.map((h, i) => (
                          <li key={i} className="modal-highlight">
                            <span className="font-mono text-[10px] shrink-0 mt-0.5 tabular-nums" style={{ color: a }}>
                              [{String(i + 1).padStart(2, '0')}]
                            </span>
                            <span className="text-[13px] text-[var(--muted)] leading-[1.7]">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Features */}
                    {project.features && project.features.length > 0 && (
                      <div>
                        <p className="text-[11px] font-mono uppercase tracking-widest text-[var(--soft)] mb-3">
                          Key Features
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.features.map((f) => (
                            <span
                              key={f}
                              className="text-[12px] font-mono px-3 py-1.5 rounded-full border"
                              style={{
                                borderColor: `${a}35`,
                                background: `${a}0d`,
                                color: a,
                              }}
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Challenge */}
                    {project.challenges && (
                      <div className="border-l-2 pl-4 py-1" style={{ borderColor: 'var(--accent-amber)' }}>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-amber)] mb-2">Key Challenge</p>
                        <p className="text-[13px] text-[var(--muted)] leading-[1.75]">{project.challenges}</p>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--line)]">
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-tag">{tag}</span>
                      ))}
                    </div>

                    {/* CTA buttons */}
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={project.github ?? '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`project-btn project-btn--ghost ${!project.github ? 'project-btn--disabled' : ''}`}
                        onClick={(e) => { if (!project.github) e.preventDefault(); }}
                      >
                        <GitFork size={14} /> GitHub
                      </a>
                      <a
                        href={project.liveDemo ?? '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`project-btn project-btn--primary ${!project.liveDemo ? 'project-btn--disabled' : ''}`}
                        onClick={(e) => { if (!project.liveDemo) e.preventDefault(); }}
                      >
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

      <style jsx global>{`
        /* ── Layout ── */
        .projects-bento { display: grid; gap: 14px; }
        .project-bento-featured { width: 100%; }
        .project-bento-grid { display: grid; gap: 14px; grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 1024px) { .project-bento-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px)  { .project-bento-grid { grid-template-columns: 1fr; } }

        /* ── Card ── */
        .project-card {
          position: relative;
          height: 100%;
          border-radius: 16px;
          padding: 1px;
          background: var(--line);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .project-card:hover {
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
          transform: translateY(-3px);
        }
        .project-card--featured { background: linear-gradient(135deg, rgba(116,167,255,0.35), rgba(91,224,173,0.22), transparent); }

        .project-card-border {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          transition: opacity 0.35s;
          pointer-events: none;
          z-index: 0;
        }

        .project-card-inner {
          position: relative;
          z-index: 1;
          height: 100%;
          border-radius: 15px;
          overflow: hidden;
          background: var(--panel);
          display: flex;
          flex-direction: column;
        }

        /* Badges */
        .project-index {
          position: absolute;
          top: 12px;
          right: 13px;
          z-index: 4;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--soft);
          letter-spacing: 0.12em;
          background: rgba(0,0,0,0.35);
          backdrop-filter: blur(6px);
          padding: 3px 7px;
          border-radius: 999px;
          border: 1px solid var(--line);
        }
        .project-live-badge {
          position: absolute;
          top: 12px;
          left: 13px;
          z-index: 4;
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--accent-green);
          background: rgba(91,224,173,0.1);
          backdrop-filter: blur(6px);
          padding: 3px 8px;
          border-radius: 999px;
          border: 1px solid rgba(91,224,173,0.25);
        }

        /* Card body */
        .project-card-body {
          padding: 1.1rem 1.25rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          flex: 1;
        }
        .project-category {
          font-size: 10px;
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent-green);
          font-weight: 600;
        }
        .project-title {
          font-size: 1.1rem;
          font-weight: 800;
          line-height: 1.2;
          transition: color 0.2s;
        }
        .project-card:hover .project-title { color: var(--accent-blue); }
        .project-card--featured .project-title { font-size: 1.45rem; }
        .project-desc {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.65;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }
        .project-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 4px; }
        .project-tag {
          font-size: 10px;
          font-family: var(--font-mono);
          padding: 2px 8px;
          border-radius: 5px;
          border: 1px solid var(--line);
          background: var(--surface-subtle);
          color: var(--soft);
          letter-spacing: 0.04em;
        }

        /* Action buttons */
        .project-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 5px;
          margin-top: 8px;
          padding-top: 10px;
          border-top: 1px solid var(--line);
        }
        .project-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 5px 10px;
          border-radius: 7px;
          font-size: 11px;
          font-family: var(--font-mono);
          font-weight: 600;
          cursor: pointer;
          transition: background 0.18s, color 0.18s, border-color 0.18s, transform 0.18s;
          text-decoration: none;
          white-space: nowrap;
          border: 1px solid transparent;
          letter-spacing: 0.03em;
        }
        .project-btn:hover { transform: translateY(-1px); }
        .project-btn--ghost {
          background: var(--surface-subtle);
          border-color: var(--line);
          color: var(--soft);
        }
        .project-btn--ghost:hover { border-color: var(--line-hover); color: var(--foreground); }
        .project-btn--primary {
          background: rgba(116,167,255,0.12);
          border-color: rgba(116,167,255,0.3);
          color: var(--accent-blue);
        }
        .project-btn--primary:hover { background: rgba(116,167,255,0.22); border-color: var(--accent-blue); }
        .project-btn--case {
          background: rgba(91,224,173,0.1);
          border-color: rgba(91,224,173,0.28);
          color: var(--accent-green);
        }
        .project-btn--case:hover { background: rgba(91,224,173,0.2); border-color: var(--accent-green); }
        .project-btn--disabled { opacity: 0.35; cursor: not-allowed; pointer-events: none; }

        /* ── Modal ── */
        .modal-panel {
          position: relative;
          width: 100%;
          max-width: 680px;
          max-height: 92vh;
          border-radius: 20px 20px 0 0;
          overflow: hidden;
          border: 1px solid var(--line);
          background: var(--panel-strong);
          box-shadow: 0 -8px 60px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
          z-index: 10;
        }
        @media (min-width: 640px) {
          .modal-panel {
            border-radius: 20px;
            box-shadow: 0 24px 80px rgba(0,0,0,0.55);
            max-height: 88vh;
          }
        }

        .modal-header {
          position: sticky;
          top: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 20px 16px;
          background: var(--panel-strong);
          border-bottom: 1px solid var(--line);
          backdrop-filter: blur(20px);
        }

        .modal-close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          border: 1px solid var(--line);
          background: var(--surface-subtle);
          color: var(--muted);
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s, transform 0.2s;
        }
        .modal-close-btn:hover {
          border-color: var(--accent-rose);
          color: var(--accent-rose);
          background: rgba(255,140,159,0.08);
          transform: rotate(90deg);
        }

        .modal-body {
          overflow-y: auto;
          overscroll-behavior: contain;
          flex: 1;
        }
        .modal-body::-webkit-scrollbar { width: 4px; }
        .modal-body::-webkit-scrollbar-thumb { background: var(--soft); border-radius: 4px; }

        .modal-highlight {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid var(--line);
          background: var(--surface-subtle);
          transition: border-color 0.2s, background 0.2s;
        }
        .modal-highlight:hover {
          border-color: var(--line-hover);
          background: var(--surface-hover);
        }
      `}</style>
    </section>
  );
}
