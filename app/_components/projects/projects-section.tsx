'use client';

import { useState, useRef, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileCode, ExternalLink, ArrowRight } from 'lucide-react';
import { projects } from '@/app/_lib/data';
import { ScrollReveal } from '@/app/_components/ui/scroll-reveal';

const PALETTES = [
  ['#74a7ff', '#5be0ad'],
  ['#5be0ad', '#ffd166'],
  ['#ff8c9f', '#74a7ff'],
  ['#ffd166', '#5be0ad'],
];

function ProjectVisual({ index, large }: { index: number; large?: boolean }) {
  const [a, b] = PALETTES[index % PALETTES.length];
  return (
    <div
      className={`project-visual relative overflow-hidden flex items-end ${large ? 'min-h-[280px]' : 'aspect-[16/10]'}`}
      style={{
        background: `linear-gradient(145deg, ${a}28, ${b}18 50%, transparent), radial-gradient(circle at 25% 20%, ${a}40, transparent 55%)`,
      }}
    >
      <span
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-extrabold opacity-[0.12] select-none ${large ? 'text-[120px]' : 'text-7xl'}`}
        style={{ color: a }}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-80" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${a}15 2px, ${a}15 3px)`,
        }}
      />
    </div>
  );
}

function ProjectCard({
  project,
  index,
  featured,
  onOpen,
}: {
  project: (typeof projects)[0];
  index: number;
  featured?: boolean;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent) => {
    if (!ref.current || featured) return;
    const r = ref.current.getBoundingClientRect();
    setTilt({
      x: (e.clientY - r.top - r.height / 2) / 22,
      y: -(e.clientX - r.left - r.width / 2) / 22,
    });
  };

  return (
    <motion.article
      ref={ref}
      layout
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      onClick={onOpen}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      style={{ transformStyle: 'preserve-3d' }}
      className={`project-card group cursor-pointer ${featured ? 'project-card--featured' : ''}`}
      data-cursor="pointer"
    >
      <div className="project-card-inner">
        <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
        <ProjectVisual index={index} large={featured} />
        <div className="project-card-body">
          <span className="project-category">{project.category}</span>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-desc">{project.description}</p>
          <div className="project-tags">
            {project.tags.slice(0, featured ? 5 : 3).map((tag) => (
              <span key={tag} className="project-tag">
                {tag}
              </span>
            ))}
          </div>
          <span className="project-cta">
            View case study <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="shell py-24 border-t border-[var(--line)]">
      <ScrollReveal direction="up">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow mb-3">
              <span className="dot" />
              03 // Creations
            </p>
            <h2 className="text-[clamp(30px,4vw,48px)] font-extrabold leading-tight">
              Project <span className="gradient-text">Galaxy</span>
            </h2>
          </div>
          <p className="text-sm text-[var(--muted)] max-w-md leading-relaxed font-mono">
            Select a system to explore architecture, engineering wins, and tech stack.
          </p>
        </div>
      </ScrollReveal>

      <div className="projects-bento">
        {featured && (
          <ScrollReveal direction="up" className="project-bento-featured">
            <ProjectCard
              project={featured}
              index={0}
              featured
              onOpen={() => setSelectedProject(featured.id)}
            />
          </ScrollReveal>
        )}
        <div className="project-bento-grid">
          {rest.map((project, i) => (
            <ScrollReveal key={project.id} direction="up" delay={i * 0.08}>
              <ProjectCard
                project={project}
                index={i + 1}
                onOpen={() => setSelectedProject(project.id)}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (() => {
          const project = projects.find((p) => p.id === selectedProject);
          if (!project) return null;
          const idx = projects.findIndex((p) => p.id === project.id);

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                className="absolute inset-0 bg-[var(--background)]/80 backdrop-blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
              />
              <motion.div
                className="relative glass-panel w-full max-w-2xl max-h-[88vh] overflow-y-auto z-10"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full grid place-items-center border border-[var(--line)] bg-[var(--surface-subtle)] hover:border-[var(--accent-blue)] transition-colors"
                  aria-label="Close"
                >
                  ✕
                </button>
                <ProjectVisual index={idx} large />
                <div className="p-6 md:p-8 grid gap-6">
                  <div>
                    <span className="text-xs font-mono text-[var(--accent-green)] uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-extrabold mt-1">{project.title}</h2>
                    <p className="text-[var(--muted)] mt-3 leading-relaxed">{project.description}</p>
                  </div>
                  <ul className="grid gap-2 list-none p-0">
                    {project.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="text-sm p-3 rounded-lg border border-[var(--line)] bg-[var(--surface-subtle)] flex gap-3"
                      >
                        <span className="text-[var(--accent-green)] font-mono text-xs shrink-0">
                          [{String(i + 1).padStart(2, '0')}]
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  {project.challenges && (
                    <p className="text-sm text-[var(--muted)] border-l-2 border-[var(--accent-amber)] pl-4">
                      {project.challenges}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--line)]">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs">
                        <FileCode size={14} /> Repository
                      </a>
                    )}
                    {project.liveDemo && (
                      <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs">
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

      <style jsx global>{`
        .projects-bento {
          display: grid;
          gap: 16px;
        }
        .project-bento-featured {
          width: 100%;
        }
        .project-bento-grid {
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(3, 1fr);
        }
        .project-card {
          height: 100%;
          border-radius: 16px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(116,167,255,0.25), rgba(91,224,173,0.15), transparent);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .project-card:hover {
          box-shadow: var(--shadow-elevated);
        }
        .project-card--featured {
          background: linear-gradient(135deg, rgba(116,167,255,0.45), rgba(91,224,173,0.3), rgba(255,209,102,0.15));
        }
        .project-card-inner {
          height: 100%;
          border-radius: 15px;
          overflow: hidden;
          background: var(--panel);
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .project-index {
          position: absolute;
          top: 14px;
          right: 16px;
          z-index: 2;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--soft);
          letter-spacing: 0.1em;
        }
        .project-card-body {
          padding: 1.25rem 1.35rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }
        .project-category {
          font-size: 10px;
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--accent-green);
        }
        .project-title {
          font-size: 1.15rem;
          font-weight: 800;
          line-height: 1.2;
          transition: color 0.2s;
        }
        .project-card:hover .project-title {
          color: var(--accent-blue);
        }
        .project-card--featured .project-title {
          font-size: 1.5rem;
        }
        .project-desc {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }
        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }
        .project-tag {
          font-size: 11px;
          font-family: var(--font-mono);
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid var(--line);
          background: var(--surface-subtle);
          color: var(--soft);
        }
        .project-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 8px;
          font-size: 12px;
          font-family: var(--font-mono);
          color: var(--accent-blue);
        }
        @media (max-width: 1024px) {
          .project-bento-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .project-bento-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
