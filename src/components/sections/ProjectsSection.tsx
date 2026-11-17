import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Section, FadeInView, Badge } from '@/components/ui/Components';
import { projects, type Project } from '@/data/portfolio';
import {
  Github, ExternalLink, X, ChevronRight, Layers, Zap, Sparkles,
  ArrowUpRight, CheckCircle2,
} from 'lucide-react';

const categoryColors: Record<string, string> = {
  'data-engineering': '#2f55ff',
  analytics: '#0b9e73',
  tools: '#ff7a2f',
  learning: '#7357ff',
};

const categoryLabels: Record<string, string> = {
  all: 'All projects',
  'data-engineering': 'Data engineering',
  analytics: 'Analytics',
  tools: 'Tools',
  learning: 'Learning',
};

const projectRoadmapMap: Record<string, { phase: string; label: string; targetId: string }> = {
  'retailflow-pipeline': { phase: 'ETL / ELT', label: 'Validates: ETL & Lakehouse Architecture', targetId: 'etl-engineering' },
  'spark-docker': { phase: 'Apache Spark', label: 'Validates: Spark Internals & Clusters', targetId: 'spark' },
  'salespulse': { phase: 'Databases', label: 'Validates: SQL & Analytical Stores', targetId: 'sql-databases' },
  'mergemate': { phase: 'Foundation', label: 'Validates: Data Quality & Automation', targetId: 'fundamentals' },
  'termchat': { phase: 'Systems', label: 'Validates: Networking & Concurrency', targetId: 'systems' },
};

const artStyles: Record<string, { from: string; to: string; accent: string; soft: string }> = {
  'data-engineering': { from: '#e9edff', to: '#dfe5ff', accent: '#2f55ff', soft: '#b9c5ff' },
  analytics: { from: '#e4f8ef', to: '#d6f2e5', accent: '#0b9e73', soft: '#9bdec5' },
  tools: { from: '#fff0e3', to: '#ffe4cf', accent: '#ff7a2f', soft: '#ffc79f' },
  learning: { from: '#efeaff', to: '#e7dfff', accent: '#7357ff', soft: '#c3b4ff' },
};

function ProjectArt({ project, index, large = false }: { project: Project; index: number; large?: boolean }) {
  const style = artStyles[project.category] || artStyles['data-engineering'];
  const color = categoryColors[project.category] || style.accent;

  return (
    <div
      className={`relative overflow-hidden border-b border-line/70 ${large ? 'h-52 sm:h-64' : 'h-40'}`}
      style={{ background: `linear-gradient(135deg, ${style.from}, ${style.to})` }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-dots opacity-30" />
      <div
        aria-hidden="true"
        className="absolute -right-12 -top-14 h-48 w-48 rounded-full border-[26px] opacity-25"
        style={{ borderColor: style.soft }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full opacity-20 blur-2xl"
        style={{ backgroundColor: style.accent }}
      />

      <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
        {project.category === 'data-engineering' && (
          <svg viewBox="0 0 260 90" className="w-[70%] max-w-xs">
            {[20, 70, 120, 170, 220].map((x, i) => (
              <g key={x}>
                <line x1={x} y1="45" x2={x + 30} y2="45" stroke={style.accent} strokeOpacity="0.25" strokeDasharray="3 5" />
                <circle cx={x} cy="45" r="10" fill={style.accent} fillOpacity={i === 4 ? 0.9 : 0.14} stroke={style.accent} strokeOpacity="0.45" />
                <circle cx={x} cy="45" r="3" fill={i === 4 ? '#fff' : style.accent} />
              </g>
            ))}
          </svg>
        )}
        {project.category === 'analytics' && (
          <svg viewBox="0 0 240 90" className="w-[65%] max-w-[15rem]">
            {[28, 48, 38, 66, 54, 78].map((h, i) => (
              <rect
                key={i}
                x={28 + i * 32}
                y={82 - h}
                width="18"
                height={h}
                rx="5"
                fill={style.accent}
                fillOpacity={0.2 + i * 0.11}
              />
            ))}
            <line x1="18" y1="82" x2="222" y2="82" stroke={style.accent} strokeOpacity="0.3" />
          </svg>
        )}
        {project.category === 'tools' && (
          <svg viewBox="0 0 240 90" className="w-[60%] max-w-[14rem]">
            {[0, 1, 2].map((row) =>
              [0, 1, 2].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  x={38 + col * 56}
                  y={8 + row * 28}
                  width="44"
                  height="20"
                  rx="6"
                  fill={style.accent}
                  fillOpacity={0.12 + (row + col) * 0.055}
                  stroke={style.accent}
                  strokeOpacity="0.22"
                />
              ))
            )}
          </svg>
        )}
        {project.category === 'learning' && (
          <svg viewBox="0 0 240 90" className="w-[60%] max-w-[14rem]">
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x={42} y={16 + i * 22} width={160 - i * 24} height="12" rx="6" fill={style.accent} fillOpacity={0.12 + i * 0.09} />
                <circle cx={48} cy={22 + i * 22} r="3" fill={style.accent} />
              </g>
            ))}
            <path d="M186 18l16 7-16 7" stroke={style.accent} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
          </svg>
        )}
      </div>

      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
        <span className="rounded-full border border-ink/10 bg-cream/80 px-2.5 py-1 text-[9px] font-mono font-medium uppercase tracking-[0.14em] text-ink-soft backdrop-blur-sm">
          {categoryLabels[project.category]}
        </span>
        {project.featured && (
          <span className="inline-flex items-center gap-1 rounded-full bg-ink px-2.5 py-1 text-[9px] font-mono font-medium uppercase tracking-[0.12em] text-cream">
            <Zap size={10} className="text-accent-yellow" />
            Featured
          </span>
        )}
      </div>

      <div className="absolute bottom-3 left-4 flex items-end gap-2">
        <span className="font-display text-[3.4rem] font-extrabold leading-none tracking-[-0.08em] opacity-90" style={{ color }}>
          0{index + 1}
        </span>
        <span className="mb-1 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      </div>

      <span className="absolute bottom-4 right-4 grid h-9 w-9 place-items-center rounded-full border border-ink/10 bg-cream/75 text-ink-soft backdrop-blur-sm transition-all duration-300 group-hover:rotate-45 group-hover:bg-ink group-hover:text-cream">
        <ArrowUpRight size={16} />
      </span>
    </div>
  );
}

function ProjectCard({ project, index, large, onClick }: { project: Project; index: number; large?: boolean; onClick: () => void }) {
  const color = categoryColors[project.category] || '#2f55ff';

  return (
    <motion.article
      layout
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-cream shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-line-strong hover:shadow-lift"
    >
      <button
        onClick={onClick}
        className="absolute inset-0 z-10 rounded-[1.75rem]"
        aria-label={`Open ${project.title} case study`}
      />
      <ProjectArt project={project} index={index} large={large} />

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-bold tracking-tight text-ink transition-colors group-hover:text-accent-blue sm:text-2xl">
              {project.title}
            </h3>
            <p className="mt-1 text-xs font-medium text-muted">{project.subtitle}</p>
          </div>
        </div>

        {projectRoadmapMap[project.id] && (
          <div className="mt-3">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[9.5px] font-medium"
              style={{
                borderColor: `${color}35`,
                backgroundColor: `${color}0a`,
                color,
              }}
            >
              <Sparkles size={10} className="shrink-0" />
              {projectRoadmapMap[project.id].label}
            </span>
          </div>
        )}

        <p className={`mt-4 text-sm leading-relaxed text-ink-soft ${large ? 'max-w-xl' : ''}`}>
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, large ? 7 : 5).map((tech) => (
            <Badge key={tech} color={color}>{tech}</Badge>
          ))}
          {project.tech.length > (large ? 7 : 5) && (
            <Badge color={color}>+{project.tech.length - (large ? 7 : 5)}</Badge>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
            View case study
          </span>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-20 inline-flex items-center gap-1.5 rounded-lg border border-line bg-cream px-2.5 py-1.5 text-[11px] font-medium text-ink-soft transition-colors hover:border-ink hover:text-ink"
            aria-label={`${project.title} source code on GitHub`}
          >
            <Github size={13} />
            Source
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const color = categoryColors[project.category] || '#2f55ff';
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[65] flex items-end justify-center p-0 sm:items-center sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[2rem] border border-line bg-paper shadow-2xl sm:rounded-[2rem]"
        initial={reduced ? false : { opacity: 0, y: 50, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduced ? undefined : { opacity: 0, y: 40, scale: 0.97 }}
        transition={{ type: 'spring', damping: 28, stiffness: 240 }}
      >
        <div
          className="relative overflow-hidden px-6 pb-6 pt-7 sm:px-8"
          style={{ background: `linear-gradient(135deg, ${color}14, ${color}05)` }}
        >
          <div aria-hidden="true" className="absolute -right-12 -top-14 h-40 w-40 rounded-full border-[22px] opacity-15" style={{ borderColor: color }} />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em]" style={{ color }}>
                {categoryLabels[project.category]}
              </span>
              <h2 id="project-modal-title" className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                {project.title}
              </h2>
              <p className="mt-1.5 text-sm text-muted">{project.subtitle}</p>
            </div>
            <button
              ref={closeRef}
              onClick={onClose}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-cream text-ink-soft transition-colors hover:text-ink"
              aria-label="Close project details"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="space-y-7 p-6 sm:p-8">
          <p className="text-[15px] leading-relaxed text-ink-soft">{project.longDescription}</p>

          <div>
            <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
              <Layers size={16} style={{ color }} />
              Technology stack
            </h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <Badge key={tech} color={color}>{tech}</Badge>
              ))}
            </div>
          </div>

          {projectRoadmapMap[project.id] && (
            <div
              className="rounded-xl border p-3.5"
              style={{
                borderColor: `${color}30`,
                backgroundColor: `${color}06`,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
                  Learning Roadmap Connection
                </span>
                <a
                  href={`#milestone-${projectRoadmapMap[project.id].targetId}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold transition-colors hover:underline"
                  style={{ color }}
                >
                  View roadmap milestone
                  <ArrowUpRight size={12} />
                </a>
              </div>
              <p className="mt-1 text-xs text-ink-soft">
                {projectRoadmapMap[project.id].label}
              </p>
            </div>
          )}

          <div>
            <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
              <Zap size={16} style={{ color }} />
              Engineering highlights
            </h3>
            <ul className="mt-3 space-y-2.5">
              {project.highlights.map((highlight, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color }} />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold text-ink">Key features</h3>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {project.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2 rounded-xl border border-line bg-cream px-3 py-2.5 text-xs leading-relaxed text-ink-soft">
                  <ChevronRight size={13} className="mt-0.5 shrink-0" style={{ color }} />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-line pt-5">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-accent-blue"
            >
              <Github size={16} />
              View on GitHub
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-cream px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
              >
                <ExternalLink size={16} />
                Live demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', ...new Set(projects.map((p) => p.category))];
  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <Section
      id="projects"
      label="03 — Selected work"
      title={
        <>
          Built to be <span className="font-serif italic font-normal text-gradient">poked at.</span>
        </>
      }
      subtitle="Real projects with real engineering decisions — open the case studies to see how they hold up."
    >
      <FadeInView className="mb-8">
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0" role="group" aria-label="Filter projects by category">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                filter === cat
                  ? 'bg-ink text-cream shadow-soft'
                  : 'border border-line bg-cream text-ink-soft hover:border-line-strong hover:text-ink'
              }`}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>
      </FadeInView>

      <motion.div layout className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => {
            const spans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-4', 'lg:col-span-3'];
            return (
              <FadeInView key={project.id} delay={i * 0.05} className={spans[i] || 'lg:col-span-4'}>
                <ProjectCard
                  project={project}
                  index={projects.findIndex((p) => p.id === project.id)}
                  large={i === 0}
                  onClick={() => setSelectedProject(project)}
                />
              </FadeInView>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <FadeInView delay={0.2}>
        <div className="mt-8 flex flex-col items-start justify-between gap-3 rounded-2xl border border-line bg-cream/60 px-5 py-4 sm:flex-row sm:items-center">
          <p className="flex items-center gap-2 text-sm text-ink-soft">
            <Sparkles size={15} className="text-accent-purple" />
            Every project ships with tests, docs and a reproducible setup.
          </p>
          <a
            href="https://github.com/elhussienysabry"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-blue hover:text-accent-purple"
          >
            More on GitHub
            <ArrowUpRight size={13} />
          </a>
        </div>
      </FadeInView>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </Section>
  );
}
