'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileCode, ExternalLink, ArrowRight } from 'lucide-react';
import { projects } from '@/app/_lib/data';
import { ScrollReveal } from '@/app/_components/ui/scroll-reveal';
import { SectionHeader } from '@/app/_components/ui/section-header';

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  return (
    <section id="projects" className="shell py-24 border-t border-[var(--line)]">
      <SectionHeader
        eyebrow="03 // CREATIONS"
        title="Production Portfolio"
        description="A curation of systems demonstrating real-time concurrency, AI integration, and layered backend engineering."
      />

      {/* Grid of Projects */}
      <div className="grid gap-6 mt-12 sm:grid-cols-2">
        {projects.map((project) => (
          <ScrollReveal key={project.id} direction="up" delay={0.1}>
            <div
              className="glass-panel overflow-hidden flex flex-col h-full group cursor-pointer transition-all duration-300 hover:border-[var(--accent-blue)]"
              onClick={() => setSelectedProject(project.id)}
              style={{
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
              }}
            >
              {/* Image with overlay */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] to-transparent opacity-80" />
                <span className="absolute top-4 left-4 text-xs font-mono px-2.5 py-1 rounded-md bg-[var(--background)] border border-[var(--line)] text-[var(--accent-green)]">
                  {project.category}
                </span>
              </div>

              {/* Text info */}
              <div className="p-6 flex flex-col justify-between flex-1 gap-6">
                <div>
                  <h3 className="text-xl font-bold group-hover:text-[var(--accent-blue)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] mt-2 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Tech tags footer */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2 py-0.5 rounded bg-white/[0.04] text-[var(--soft)]"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/[0.04] text-[var(--soft)]">
                        +{project.tags.length - 4} more
                      </span>
                    )}
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-mono text-[var(--accent-blue)] group-hover:gap-2 transition-all">
                    Explore Details <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (() => {
          const project = projects.find((p) => p.id === selectedProject);
          if (!project) return null;

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
              />

              {/* Modal Body */}
              <motion.div
                className="relative glass-panel w-full max-w-2xl max-h-[88vh] overflow-y-auto z-10"
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full grid place-items-center bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  aria-label="Close details"
                >
                  ✕
                </button>

                {/* Banner image */}
                <div className="relative aspect-video w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-xs font-mono text-[var(--accent-green)] uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h2 className="text-3xl font-extrabold mt-1 text-white">
                      {project.title}
                    </h2>
                  </div>
                </div>

                {/* Details Content */}
                <div className="p-6 md:p-8 grid gap-6">
                  <div>
                    <h4 className="text-xs font-mono text-[var(--soft)] uppercase tracking-wider mb-2">
                      // Overview
                    </h4>
                    <p className="text-base leading-relaxed text-[var(--muted)]">
                      {project.description}
                    </p>
                  </div>

                  {/* Highlights checklist */}
                  <div>
                    <h4 className="text-xs font-mono text-[var(--soft)] uppercase tracking-wider mb-3">
                      // Engineering Accomplishments
                    </h4>
                    <ul className="grid gap-3 pl-0 list-none">
                      {project.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-[var(--foreground)] flex items-start gap-3 p-3 rounded-lg border border-[var(--line)] bg-white/[0.02]"
                        >
                          <span className="text-[var(--accent-green)] font-mono text-xs mt-0.5">
                            [0{idx + 1}]
                          </span>
                          <span className="leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Challenges info if any */}
                  {project.challenges && (
                    <div>
                      <h4 className="text-xs font-mono text-[var(--soft)] uppercase tracking-wider mb-2">
                        // Key Challenges Overcome
                      </h4>
                      <p className="text-sm leading-relaxed text-[var(--muted)]">
                        {project.challenges}
                      </p>
                    </div>
                  )}

                  {/* Bottom bar */}
                  <div className="flex flex-wrap justify-between items-center gap-4 pt-4 border-t border-[var(--line)]">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono px-2 py-0.5 rounded bg-white/[0.04] text-[var(--soft)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-ghost text-xs"
                          style={{ minHeight: 36 }}
                        >
                          <FileCode size={14} /> Repository
                        </a>
                      )}
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-xs"
                          style={{ minHeight: 36 }}
                        >
                          <ExternalLink size={14} /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
