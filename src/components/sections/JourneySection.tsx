import React from 'react';
import { motion } from 'framer-motion';
import { Section, FadeInView, Badge } from '@/components/ui/Components';
import { learningTimeline } from '@/data/portfolio';
import {
  Code, Database, ArrowRightLeft, HardDrive, Cpu, Workflow, BookOpen
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  code: Code,
  database: Database,
  'arrow-right-left': ArrowRightLeft,
  'hard-drive': HardDrive,
  cpu: Cpu,
  workflow: Workflow,
  'book-open': BookOpen,
};

export function JourneySection() {
  return (
    <Section
      id="journey"
      label="Learning Path"
      title="My Journey"
      subtitle="How I got here — a continuous path of building, reading, and going deeper."
    >
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-blue via-accent-purple to-accent-yellow" />

        <div className="space-y-8 md:space-y-12">
          {learningTimeline.map((entry, i) => {
            const IconComp = iconMap[entry.icon] || Code;
            const isLeft = i % 2 === 0;

            return (
              <FadeInView key={entry.id} delay={i * 0.05} direction={isLeft ? 'right' : 'left'}>
                <div className={`relative flex items-start gap-6 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} md:gap-8`}>
                  {/* Content */}
                  <div className={`flex-1 pl-12 md:pl-0 ${isLeft ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <span
                      className="inline-block text-xs font-mono font-medium uppercase tracking-wider mb-2"
                      style={{ color: entry.color }}
                    >
                      {entry.phase}
                    </span>
                    <h3 className="text-xl font-bold text-text-primary mb-2">{entry.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-3">
                      {entry.description}
                    </p>
                    <div className={`flex flex-wrap gap-1.5 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                      {entry.skills.map((skill) => (
                        <Badge key={skill} color={entry.color}>{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Center node */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center border-2 bg-navy-900"
                      style={{ borderColor: entry.color }}
                    >
                      <IconComp size={16} style={{ color: entry.color }} />
                    </div>
                  </div>

                  {/* Empty spacer for other side on desktop */}
                  <div className="hidden md:block flex-1" />
                </div>
              </FadeInView>
            );
          })}
        </div>

        {/* Current position indicator */}
        <FadeInView delay={0.5}>
          <div className="relative flex justify-center mt-12">
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 -top-4">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-4 h-4 rounded-full bg-accent-yellow border-2 border-navy-900"
              />
            </div>
            <div className="mt-8 text-center">
              <span className="text-accent-yellow text-sm font-mono">Currently here</span>
              <p className="text-text-muted text-sm mt-1">and always learning</p>
            </div>
          </div>
        </FadeInView>
      </div>
    </Section>
  );
}
