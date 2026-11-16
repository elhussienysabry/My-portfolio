import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Section, FadeInView, Badge } from '@/components/ui/Components';
import { learningTimeline } from '@/data/portfolio';
import {
  Code, Database, ArrowRightLeft, HardDrive, Cpu, Workflow, BookOpen, MapPin,
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
  const reduced = useReducedMotion();

  return (
    <Section
      id="journey"
      label="07 — Learning path"
      title={
        <>
          The long way <span className="font-serif italic font-normal text-gradient-cool">to the internals.</span>
        </>
      }
      subtitle="A continuous path of building, reading and going one layer deeper — not a checklist of tools."
    >
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute bottom-4 left-[1.15rem] top-4 w-px bg-gradient-to-b from-accent-blue via-accent-purple to-accent-orange lg:left-1/2"
        />

        <div className="space-y-6 lg:space-y-8">
          {learningTimeline.map((entry, i) => {
            const IconComp = iconMap[entry.icon] || Code;
            const isLeft = i % 2 === 0;

            return (
              <FadeInView key={entry.id} delay={i * 0.04} direction={isLeft ? 'right' : 'left'}>
                <div className={`relative flex items-start ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`w-full pl-12 lg:w-1/2 lg:pl-0 ${isLeft ? 'lg:pr-14 lg:text-right' : 'lg:pl-14'}`}>
                    <div
                      className="group rounded-[1.5rem] border p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-6"
                      style={{ borderColor: `${entry.color}2b`, backgroundColor: `${entry.color}07` }}
                    >
                      <div className={`flex items-center gap-2 ${isLeft ? 'lg:justify-end' : ''}`}>
                        <span className="font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: entry.color }}>
                          {entry.phase}
                        </span>
                        <span className="h-px w-6 bg-line-strong/70" />
                        <span className="font-mono text-[9px] text-muted">0{i + 1}</span>
                      </div>
                      <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-ink">{entry.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{entry.description}</p>
                      <div className={`mt-3.5 flex flex-wrap gap-1.5 ${isLeft ? 'lg:justify-end' : ''}`}>
                        {entry.skills.map((skill) => (
                          <Badge key={skill} color={entry.color}>{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-0 top-6 lg:left-1/2 lg:-translate-x-1/2">
                    <div
                      className="grid h-9 w-9 place-items-center rounded-xl border-2 bg-paper shadow-sm"
                      style={{ borderColor: entry.color, color: entry.color }}
                    >
                      <IconComp size={16} />
                    </div>
                  </div>

                  <div className="hidden lg:block lg:w-1/2" aria-hidden="true" />
                </div>
              </FadeInView>
            );
          })}
        </div>

        <FadeInView delay={0.2}>
          <div className="relative mt-8 flex items-center gap-3 pl-12 lg:justify-center lg:pl-0">
            <motion.span
              aria-hidden="true"
              animate={reduced ? undefined : { scale: [1, 1.35, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              className="absolute left-[0.7rem] h-4 w-4 rounded-full border-2 border-paper bg-accent-yellow lg:static"
            />
            <div className="rounded-full border border-line bg-cream px-4 py-2 shadow-soft">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                Currently here
              </span>
              <span className="ml-2 inline-flex items-center gap-1 text-[10px] text-muted">
                <MapPin size={10} />
                and always learning
              </span>
            </div>
          </div>
        </FadeInView>
      </div>
    </Section>
  );
}
