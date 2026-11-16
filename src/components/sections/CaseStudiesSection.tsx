import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, FadeInView, Badge } from '@/components/ui/Components';
import { caseStudies } from '@/data/portfolio';
import {
  ArrowRightLeft, GitBranch, Network, CalendarClock, ShieldCheck,
  Server, ChevronDown, ChevronUp, BookOpen,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  'arrow-right-left': ArrowRightLeft,
  'git-branch': GitBranch,
  network: Network,
  'calendar-clock': CalendarClock,
  'shield-check': ShieldCheck,
  server: Server,
};

function CaseStudyCard({ study, index }: { study: typeof caseStudies[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const IconComp = iconMap[study.icon] || Server;

  return (
    <FadeInView delay={index * 0.06} className="h-full">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-cream p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
        <div
          aria-hidden="true"
          className="absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-[0.12] blur-2xl transition-opacity group-hover:opacity-25"
          style={{ backgroundColor: study.color }}
        />
        <div className="relative flex items-start justify-between gap-3">
          <span
            className="grid h-11 w-11 place-items-center rounded-xl border"
            style={{ backgroundColor: `${study.color}12`, borderColor: `${study.color}35`, color: study.color }}
          >
            <IconComp size={20} />
          </span>
          <span className="font-mono text-[10px] tracking-[0.18em] text-muted">NOTE 0{index + 1}</span>
        </div>

        <h3 className="relative mt-5 font-display text-xl font-bold tracking-tight text-ink">{study.title}</h3>
        <p className="relative mt-1.5 text-xs font-medium font-mono uppercase tracking-wider" style={{ color: study.color }}>
          {study.subtitle}
        </p>

        <p className={`relative mt-4 text-sm leading-relaxed text-ink-soft ${expanded ? '' : 'line-clamp-4'}`}>
          {study.description}
        </p>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="relative overflow-hidden"
            >
              <div className="pt-4">
                <p className="mb-2.5 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                  <BookOpen size={11} />
                  Key concepts
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {study.concepts.map((concept) => (
                    <Badge key={concept} color={study.color}>{concept}</Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setExpanded(!expanded)}
          className="relative mt-auto flex items-center gap-1.5 pt-5 text-xs font-semibold transition-colors"
          style={{ color: study.color }}
          aria-expanded={expanded}
        >
          {expanded ? 'Show less' : 'Read the note'}
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </article>
    </FadeInView>
  );
}

export function CaseStudiesSection() {
  return (
    <Section
      id="case-studies"
      label="04 — Engineering notes"
      title={
        <>
          How the systems <span className="font-serif italic font-normal text-gradient-warm">actually work.</span>
        </>
      }
      subtitle="Short, honest explanations of the concepts I keep coming back to — written while learning them."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((study, i) => (
          <CaseStudyCard key={study.id} study={study} index={i} />
        ))}
      </div>
    </Section>
  );
}
