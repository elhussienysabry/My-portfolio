import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, FadeInView, Badge } from '@/components/ui/Components';
import { projects, type Project } from '@/data/portfolio';
import { Github, ExternalLink, X, ChevronRight, Layers, Zap } from 'lucide-react';

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const categoryColors: Record<string, string> = {
    'data-engineering': '#38bdf8',
    analytics: '#34d399',
    tools: '#fb923c',
    learning: '#818cf8',
  };

  const color = categoryColors[project.category] || '#38bdf8';

  return (
    <motion.div
      layout
      className="group relative bg-surface/80 border border-border rounded-2xl overflow-hidden cursor-pointer hover:border-border-bright transition-all duration-300"
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }} />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs font-mono font-medium uppercase tracking-wider"
                style={{ color }}
              >
                {project.category.replace('-', ' ')}
              </span>
              {project.featured && (
                <span className="flex items-center gap-1 text-xs text-accent-yellow">
                  <Zap size={10} />
                  Featured
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-blue transition-colors">
              {project.title}
            </h3>
            <p className="text-text-muted text-sm mt-1">{project.subtitle}</p>
          </div>
          <ChevronRight
            size={18}
            className="text-text-muted group-hover:text-accent-blue group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"
          />
        </div>

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.slice(0, 6).map((t) => (
            <Badge key={t} color={color}>{t}</Badge>
          ))}
          {project.tech.length > 6 && (
            <Badge color={color}>+{project.tech.length - 6}</Badge>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary text-sm transition-colors"
          >
            <Github size={15} />
            View Source
          </a>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-accent-blue hover:text-accent-cyan text-sm transition-colors"
            >
              <ExternalLink size={15} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const categoryColors: Record<string, string> = {
    'data-engineering': '#38bdf8',
    analytics: '#34d399',
    tools: '#fb923c',
    learning: '#818cf8',
  };

  const color = categoryColors[project.category] || '#38bdf8';

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative w-full max-w-3xl max-h-[85vh] bg-navy-900 border border-border rounded-2xl overflow-y-auto"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-navy-900/95 backdrop-blur-sm border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-medium uppercase tracking-wider" style={{ color }}>
              {project.category.replace('-', ' ')}
            </span>
            <h2 className="text-2xl font-bold text-text-primary">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface text-text-secondary hover:text-text-primary transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Subtitle & description */}
          <div>
            <p className="text-text-muted text-sm mb-3">{project.subtitle}</p>
            <p className="text-text-secondary leading-relaxed">{project.longDescription}</p>
          </div>

          {/* Tech stack */}
          <div>
            <h3 className="text-text-primary font-semibold mb-3 flex items-center gap-2">
              <Layers size={16} style={{ color }} />
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <Badge key={t} color={color}>{t}</Badge>
              ))}
            </div>
          </div>

          {/* Engineering highlights */}
          <div>
            <h3 className="text-text-primary font-semibold mb-3 flex items-center gap-2">
              <Zap size={16} style={{ color }} />
              Engineering Highlights
            </h3>
            <ul className="space-y-3">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-text-secondary text-sm">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-text-primary font-semibold mb-3">Key Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-text-secondary text-sm px-3 py-2 rounded-lg bg-surface/60 border border-border"
                >
                  <ChevronRight size={12} style={{ color }} />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-surface border border-border rounded-xl text-text-primary hover:border-border-bright transition-colors font-medium text-sm"
            >
              <Github size={16} />
              View on GitHub
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-accent-blue text-navy-950 rounded-xl font-medium text-sm hover:bg-accent-blue/90 transition-colors"
              >
                <ExternalLink size={16} />
                Live Demo
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

  const categoryLabels: Record<string, string> = {
    all: 'All Projects',
    'data-engineering': 'Data Engineering',
    analytics: 'Analytics',
    tools: 'Tools',
    learning: 'Learning',
  };

  return (
    <Section
      id="projects"
      label="Featured Projects"
      title="What I've Built"
      subtitle="Real projects with real engineering decisions — not just tutorials wrapped in a repository."
    >
      {/* Filter tabs */}
      <FadeInView className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === cat
                  ? 'bg-accent-blue/15 text-accent-blue border border-accent-blue/30'
                  : 'bg-surface text-text-secondary border border-border hover:border-border-bright hover:text-text-primary'
              }`}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>
      </FadeInView>

      {/* Project grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <FadeInView key={project.id} delay={i * 0.05}>
              <ProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            </FadeInView>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}
