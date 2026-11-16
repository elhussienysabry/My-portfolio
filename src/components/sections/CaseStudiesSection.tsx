import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, FadeInView, GlowCard, Badge } from '@/components/ui/Components';
import { caseStudies } from '@/data/portfolio';
import {
  ArrowRightLeft, GitBranch, Network, CalendarClock, ShieldCheck,
  Server, ChevronDown, ChevronUp
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
    <FadeInView delay={index * 0.08}>
      <GlowCard color={study.color} className="overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${study.color}15` }}
            >
              <IconComp size={20} style={{ color: study.color }} />
            </div>
            <div className="flex-1">
              <h3 className="text-text-primary font-bold text-lg">{study.title}</h3>
              <p className="text-text-muted text-sm">{study.subtitle}</p>
            </div>
          </div>

          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            {expanded ? study.description : study.description.slice(0, 180) + '...'}
          </p>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mb-4">
                  <h4 className="text-text-primary text-sm font-semibold mb-3">Key Concepts</h4>
                  <div className="flex flex-wrap gap-2">
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
            className="flex items-center gap-1 text-sm font-medium transition-colors"
            style={{ color: study.color }}
          >
            {expanded ? 'Show Less' : 'Read More'}
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </GlowCard>
    </FadeInView>
  );
}

export function CaseStudiesSection() {
  return (
    <Section
      id="case-studies"
      label="Engineering Depth"
      title="Case Studies"
      subtitle="Demonstrating understanding of how data systems work — not just how to use them."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {caseStudies.map((study, i) => (
          <CaseStudyCard key={study.id} study={study} index={i} />
        ))}
      </div>
    </Section>
  );
}
