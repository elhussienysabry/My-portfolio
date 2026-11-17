import React, { useState } from 'react';
import { Section, FadeInView, Badge } from '@/components/ui/Components';
import { skillCategories, skillEcosystemRoles } from '@/data/portfolio';
import {
  Database, Cpu, Workflow, HardDrive, BarChart3, Container, BookOpen, Sparkles,
  Layers, ArrowUpRight, Info, CheckCircle2,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  database: Database,
  cpu: Cpu,
  workflow: Workflow,
  'hard-drive': HardDrive,
  'bar-chart-3': BarChart3,
  container: Container,
  'book-open': BookOpen,
};

const spans = [
  'lg:col-span-5',
  'lg:col-span-4',
  'lg:col-span-3',
  'lg:col-span-4',
  'lg:col-span-5',
  'lg:col-span-3',
  'lg:col-span-12',
];

const blurbs: Record<string, string> = {
  'Data Engineering': 'Pipelines designed around correctness, retries and observability.',
  'Data Processing': 'Distributed processing from RDD fundamentals to shuffle tuning.',
  Orchestration: 'DAGs, schedules and the state machine behind reliable runs.',
  'Storage & Databases': 'Lakehouse files, relational engines and analytical stores.',
  'Analytics & Transformation': 'Modeling raw data into trustworthy, testable metrics.',
  'Infrastructure & Dev': 'Reproducible environments and automation that stays boring.',
  'Systems Knowledge': 'The internals that explain why the query is slow.',
};

export function SkillsSection() {
  const [activeSkill, setActiveSkill] = useState<string | null>('Apache Spark');

  const selectedRole = activeSkill ? skillEcosystemRoles[activeSkill] : null;

  return (
    <Section
      id="skills"
      label="02 — Toolkit"
      title={
        <>
          Tools I use, <span className="font-serif italic font-normal text-gradient-cool">and why.</span>
        </>
      }
      subtitle="Organized by domain — tap any technology badge to inspect its architectural role in the data ecosystem."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
        {skillCategories.map((category, i) => {
          const IconComp = iconMap[category.icon] || Database;
          const isSystems = category.title === 'Systems Knowledge';

          return (
            <FadeInView key={category.title} delay={i * 0.05} className={spans[i] || 'lg:col-span-4'}>
              <div
                className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
                  isSystems ? 'bg-ink text-cream' : 'bg-cream'
                }`}
                style={isSystems ? undefined : { borderColor: `${category.color}2e`, backgroundColor: `${category.color}07` }}
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-[0.13] blur-2xl transition-opacity duration-300 group-hover:opacity-25"
                  style={{ backgroundColor: category.color }}
                />
                <div className="relative flex items-start justify-between gap-3">
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-xl border ${
                      isSystems ? 'border-white/15 bg-white/[0.06]' : ''
                    }`}
                    style={isSystems ? { color: '#f5c84b' } : { backgroundColor: `${category.color}14`, borderColor: `${category.color}35`, color: category.color }}
                  >
                    <IconComp size={20} />
                  </span>
                  <span className={`font-mono text-[10px] tracking-[0.18em] ${isSystems ? 'text-white/30' : 'text-muted'}`}>
                    0{i + 1}
                  </span>
                </div>

                <h3 className={`relative mt-5 font-display text-xl font-bold tracking-tight ${isSystems ? 'text-white' : 'text-ink'}`}>
                  {category.title}
                </h3>
                <p className={`relative mt-1.5 text-sm leading-relaxed ${isSystems ? 'text-white/55' : 'text-muted'}`}>
                  {blurbs[category.title]}
                </p>

                {/* Interactive Skill Badges with Role Highlights */}
                <div className="relative mt-4 flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => {
                    const isSelected = activeSkill === skill;
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => setActiveSkill(isSelected ? null : skill)}
                        onMouseEnter={() => setActiveSkill(skill)}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-all ${
                          isSelected
                            ? isSystems
                              ? 'border-accent-yellow bg-accent-yellow/20 text-accent-yellow ring-2 ring-accent-yellow/30'
                              : 'border-accent-blue bg-accent-blue/15 text-accent-blue ring-2 ring-accent-blue/20'
                            : isSystems
                              ? 'border-white/15 bg-white/[0.05] text-white/75 hover:border-white/30 hover:text-white'
                              : 'border-line bg-cream/85 text-ink-soft hover:border-line-strong hover:text-ink'
                        }`}
                        title="Click to view role in ecosystem"
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        {skill}
                      </button>
                    );
                  })}
                </div>

                <div className={`relative mt-auto flex items-center gap-1.5 border-t pt-4 ${isSystems ? 'border-white/10' : 'border-line/70'}`}>
                  {[14, 22, 10, 28, 18, 24].map((height, barIndex) => (
                    <span
                      key={barIndex}
                      className="w-1.5 rounded-full"
                      style={{
                        height: `${height}px`,
                        backgroundColor: category.color,
                        opacity: 0.18 + barIndex * 0.1,
                      }}
                    />
                  ))}
                  <span className={`ml-auto font-mono text-[9px] uppercase tracking-wider ${isSystems ? 'text-white/30' : 'text-muted'}`}>
                    {category.skills.length} {category.skills.length === 1 ? 'skill' : 'skills'}
                  </span>
                </div>
              </div>
            </FadeInView>
          );
        })}
      </div>

      {/* Dynamic Ecosystem Role Inspector Card */}
      {activeSkill && selectedRole && (
        <FadeInView delay={0.1}>
          <div className="mt-5 overflow-hidden rounded-2xl border border-accent-blue/30 bg-accent-blue/[0.04] p-4 sm:p-5 shadow-soft">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-blue/15 text-accent-blue">
                  <Info size={18} />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-base font-bold text-ink">{activeSkill}</span>
                    <span className="rounded-full bg-accent-blue/10 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-accent-blue">
                      {selectedRole.layer}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                    {selectedRole.role}
                  </p>
                </div>
              </div>

              {selectedRole.relatedProject && (
                <a
                  href="#projects"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-line bg-cream px-3 py-2 text-xs font-semibold text-ink-soft transition-colors hover:border-ink hover:text-ink"
                >
                  <span>See project implementation</span>
                  <ArrowUpRight size={13} />
                </a>
              )}
            </div>
          </div>
        </FadeInView>
      )}

      {/* Narrative Footer */}
      <FadeInView delay={0.15}>
        <div className="mt-6 flex flex-col items-start justify-between gap-3 rounded-2xl border border-line bg-cream/60 px-5 py-4 sm:flex-row sm:items-center">
          <p className="flex items-center gap-2 text-sm text-ink-soft">
            <Sparkles size={15} className="text-accent-yellow" />
            Currently going deeper into distributed systems and database internals — with Kafka and cloud storage on the roadmap.
          </p>
          <a href="#journey" className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-blue hover:text-accent-purple">
            See the full roadmap
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </FadeInView>
    </Section>
  );
}
