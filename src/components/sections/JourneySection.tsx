import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  motion, AnimatePresence, useReducedMotion, useInView, useScroll, useSpring, useTransform,
  type MotionValue,
} from 'framer-motion';
import { Section, FadeInView, Badge } from '@/components/ui/Components';
import { roadmapMilestones, type RoadmapMilestone, type RoadmapStatus } from '@/data/portfolio';
import {
  Code, Database, ArrowRightLeft, HardDrive, Cpu, Workflow, BookOpen,
  Radio, Cloud, ChevronDown, ChevronUp, Compass, CheckCircle2, Clock,
  Rocket, Sparkles, ArrowRight, Layers, GitBranch, Target, Zap,
  ShieldCheck, Flag,
} from 'lucide-react';

/* ── Icon registry ── */
const iconMap: Record<string, React.ElementType> = {
  code: Code, database: Database, 'arrow-right-left': ArrowRightLeft,
  'hard-drive': HardDrive, cpu: Cpu, workflow: Workflow,
  'book-open': BookOpen, radio: Radio, cloud: Cloud,
  layers: Layers,
};

/** Darker variants keep small accent labels readable on the light canvas. */
const readableAccent: Record<string, string> = {
  '#2f55ff': '#2f55ff',
  '#7357ff': '#5a3fe0',
  '#0b9e73': '#0a7d5c',
  '#ff7a2f': '#b84a00',
  '#e8478c': '#b31e63',
  '#e3ac1f': '#8a6200',
  '#00a6c4': '#007e95',
  '#9a7bff': '#5a3fe0',
  '#ff3621': '#c22712',
};

/* ── Status configuration ── */
const statusConfig: Record<RoadmapStatus, {
  label: string;
  note: string;
  icon: React.ElementType;
  color: string;
  dotClass: string;
  badgeBg: string;
  badgeText: string;
  cardBorder: string;
}> = {
  completed: {
    label: 'Completed',
    note: 'Built and applied in a project.',
    icon: CheckCircle2,
    color: '#0a7d5c',
    dotClass: 'bg-accent-green border-accent-green shadow-[0_0_12px_rgba(10,125,92,0.45)]',
    badgeBg: 'bg-accent-green/10', badgeText: 'text-green-ink', cardBorder: 'border-accent-green/25',
  },
  explored: {
    label: 'Explored',
    note: 'Studied and experimented with — not production-built.',
    icon: Compass,
    color: '#8a6200',
    dotClass: 'bg-accent-yellow border-accent-yellow shadow-[0_0_12px_rgba(227,172,31,0.45)]',
    badgeBg: 'bg-accent-yellow/10', badgeText: 'text-amber-700', cardBorder: 'border-accent-yellow/30',
  },
  current: {
    label: 'In progress',
    note: 'Active study right now.',
    icon: Clock,
    color: '#b31e63',
    dotClass: 'bg-accent-coral border-accent-coral shadow-[0_0_14px_rgba(242,85,85,0.55)]',
    badgeBg: 'bg-accent-coral/10', badgeText: 'text-coral-ink', cardBorder: 'border-accent-coral/30',
  },
  next: {
    label: 'Up next',
    note: 'The next planned learning goal.',
    icon: Rocket,
    color: '#007e95',
    dotClass: 'bg-accent-cyan border-accent-cyan shadow-[0_0_14px_rgba(0,166,196,0.5)]',
    badgeBg: 'bg-accent-cyan/10', badgeText: 'text-accent-cyan', cardBorder: 'border-accent-cyan/25',
  },
  planned: {
    label: 'Planned',
    note: 'A future goal after the previous milestone.',
    icon: Flag,
    color: '#5a3fe0',
    dotClass: 'bg-accent-purple/60 border-accent-purple/60 shadow-[0_0_10px_rgba(115,87,255,0.35)]',
    badgeBg: 'bg-accent-purple/8', badgeText: 'text-accent-violet', cardBorder: 'border-accent-purple/20',
  },
};

const statusOrder: RoadmapStatus[] = ['completed', 'explored', 'current', 'next', 'planned'];

/* ── Scroll-linked path ── */
function TimelinePath({
  progress, reduced, variant,
}: {
  progress: MotionValue<number>; reduced: boolean; variant: 'desktop' | 'mobile';
}) {
  const tip = useTransform(progress, (value) => `${Math.min(100, Math.max(0, value * 100))}%`);
  const isDesktop = variant === 'desktop';

  return (
    <div
      aria-hidden="true"
      className={
        isDesktop
          ? 'absolute bottom-4 left-1/2 top-4 hidden w-px -translate-x-1/2 lg:block'
          : 'absolute bottom-4 left-[1.15rem] top-4 w-px lg:hidden'
      }
    >
      <div className="absolute inset-0 w-px bg-gradient-to-b from-line-strong/70 via-line-strong/40 to-line-strong/20" />
      <div
        className={`absolute inset-y-0 ${isDesktop ? 'left-1/2 w-3 -translate-x-1/2' : 'left-1/2 w-3 -translate-x-1/2'} opacity-70`}
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, rgba(21,22,31,0.22) 0 1px, transparent 1px 54px)',
        }}
      />
      <motion.div
        data-roadmap-fill
        className="absolute left-0 top-0 w-px origin-top bg-gradient-to-b from-accent-blue via-accent-purple to-accent-cyan shadow-[0_0_12px_rgba(115,87,255,0.35)]"
        style={{ scaleY: reduced ? 1 : progress }}
      />
      <span className="absolute -left-[2px] top-0 h-[5px] w-[5px] rounded-full bg-line-strong" />
      <span className="absolute -bottom-1 -left-[3px] h-[7px] w-[7px] rounded-full border border-line-strong bg-paper" />
      {!reduced && (
        <motion.span
          data-roadmap-tip
          className="absolute left-1/2 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-paper bg-accent-cyan shadow-[0_0_18px_rgba(0,166,196,0.85)]"
          style={{ top: tip }}
        />
      )}
    </div>
  );
}

/* ── Small connection chip ── */
function ConnectionBadge({ label, dark = false, onClick }: { label: string; dark?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex max-w-full items-center gap-1.5 rounded-xl border px-2.5 py-1 text-left text-[10px] font-medium transition-all duration-200 hover:-translate-y-0.5 ${
        dark
          ? 'border-white/10 bg-white/[0.05] text-white/65 hover:border-white/25 hover:text-white'
          : 'border-accent-blue/20 bg-accent-blue/[0.06] text-accent-blue hover:border-accent-blue/40 hover:bg-accent-blue/[0.09]'
      }`}
      aria-label={`Jump to ${label}`}
    >
      <GitBranch size={10} className="shrink-0" />
      <span>{label}</span>
      <ArrowRight size={9} className="shrink-0 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-70" />
    </button>
  );
}

/* ── Future horizon divider ── */
function FutureHorizon() {
  return (
    <div className="relative my-8 lg:my-11">
      <div
        aria-hidden="true"
        className="absolute left-[1.15rem] right-0 top-1/2 border-t border-dashed border-line-strong/60 lg:left-[8%] lg:right-[8%]"
      />
      <div className="relative flex pl-12 lg:justify-center lg:pl-0">
        <div className="inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-full border border-white/10 bg-ink px-4 py-2 shadow-lift">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-cyan" />
          </span>
          <span className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-white/80">
            The horizon
          </span>
          <span className="h-3 w-px bg-white/20" />
          <span className="text-[10px] text-white/55">future learning · not current experience</span>
        </div>
      </div>
    </div>
  );
}

/* ── Expandable milestone card ── */
function MilestoneCard({ milestone, index, isExpanded, onToggle, onJump }: {
  milestone: RoadmapMilestone; index: number; isExpanded: boolean; onToggle: () => void; onJump: (id: string) => void;
}) {
  const reduced = useReducedMotion();
  const [nodeOpen, setNodeOpen] = React.useState(false);
  const isLeft = index % 2 === 0;
  const IconComp = iconMap[milestone.icon] || Code;
  const status = statusConfig[milestone.status];
  const StatusIcon = status.icon;
  const isFuture = milestone.status === 'next' || milestone.status === 'planned';
  const isCurrent = milestone.status === 'current';
  const detailsId = `milestone-details-${milestone.id}`;
  const objectiveCount = milestone.learningObjectives?.length ?? 0;

  const metaRow = 'flex flex-wrap items-center gap-2';
  const sideList = 'flex flex-wrap gap-1.5';
  const detailLabel = `mb-2 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] ${
    isFuture ? 'text-white/55' : 'text-muted'
  }`;
  const detailText = `text-[12.5px] leading-relaxed ${isFuture ? 'text-white/65' : 'text-ink-soft'}`;

  return (
    <FadeInView delay={Math.min(index * 0.04, 0.24)} direction={isLeft ? 'right' : 'left'}>
      <div
        id={`milestone-${milestone.id}`}
        data-milestone={milestone.id}
        data-status={milestone.status}
        className={`relative flex scroll-mt-28 items-start ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
      >
        {/* Card */}
        <div className={`relative w-full pl-12 lg:w-1/2 lg:pl-0 ${isLeft ? 'lg:pr-14' : 'lg:pl-14'}`}>
          <div
            className={`group relative overflow-hidden rounded-[1.6rem] border p-5 transition-all duration-300 hover:-translate-y-0.5 sm:p-6 ${
              isFuture
                ? 'border-white/10 bg-ink shadow-[0_28px_60px_-32px_rgba(21,22,31,0.8)] hover:border-white/20'
                : `shadow-soft hover:shadow-lift ${status.cardBorder}`
            }`}
            style={{
              backgroundColor: isFuture ? undefined : `${milestone.color}07`,
              backgroundImage: isFuture
                ? `radial-gradient(120% 130% at 100% 0%, ${milestone.color}22, transparent 58%), repeating-linear-gradient(-45deg, transparent 0 10px, rgba(255,255,255,0.022) 10px 11px)`
                : undefined,
            }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-6 top-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${milestone.color}80, transparent)` }}
            />
            {isFuture && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-[60px]"
                style={{ backgroundColor: `${milestone.color}1f` }}
              />
            )}

            <div className="relative">
              {/* Future / current tag */}
              {isFuture && (
                <p className="mb-3 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/60">
                  <Compass size={10} style={{ color: milestone.color }} />
                  Future learning goal · not current experience
                </p>
              )}
              {isCurrent && (
                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent-coral/10 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-coral-ink">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-coral opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-coral" />
                  </span>
                  You are here
                </span>
              )}

              {/* Phase + index + status */}
              <div className={metaRow}>
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.18em]"
                  style={{ color: isFuture ? milestone.color : (readableAccent[milestone.color] ?? milestone.color) }}
                >
                  {milestone.phase}
                </span>
                <span className={`h-px w-4 ${isFuture ? 'bg-white/20' : 'bg-line-strong/70'}`} />
                <span className={`font-mono text-[9px] ${isFuture ? 'text-white/50' : 'text-muted'}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  className={`ml-auto inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${status.badgeBg} ${status.badgeText}`}
                >
                  <StatusIcon size={10} />
                  {status.label}
                </span>
              </div>

              {/* Title + description */}
              <h3 className={`mt-2 font-display text-xl font-bold tracking-tight ${isFuture ? 'text-white' : 'text-ink'}`}>
                {milestone.title}
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${isFuture ? 'text-white/65' : 'text-ink-soft'}`}>
                {milestone.description}
              </p>

              {/* Skills */}
              <div className={`mt-3.5 ${sideList}`}>
                {milestone.skills.map((skill) => (
                  isFuture ? (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] font-medium text-white/70"
                    >
                      <span className="h-1 w-1 rounded-full" style={{ backgroundColor: milestone.color }} />
                      {skill}
                    </span>
                  ) : (
                    <Badge key={skill} color={milestone.color}>{skill}</Badge>
                  )
                ))}
              </div>

              {/* Connections */}
              {milestone.connections && milestone.connections.length > 0 && (
                <div className={`mt-3 ${sideList}`}>
                  {milestone.connections.map((conn) => (
                    <ConnectionBadge
                      key={conn.targetId}
                      label={conn.label}
                      dark={isFuture}
                      onClick={() => onJump(conn.targetId)}
                    />
                  ))}
                </div>
              )}

              {/* Expand toggle */}
              {(milestone.learningObjectives || milestone.businessRelevance || milestone.useCases || milestone.evidence) && (
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className={`font-mono text-[9px] uppercase tracking-[0.14em] ${isFuture ? 'text-white/40' : 'text-muted'}`}>
                    {objectiveCount > 0 ? `${objectiveCount} objectives` : 'Details'}
                  </span>
                  <button
                    type="button"
                    onClick={onToggle}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                      isFuture
                        ? 'border-white/15 text-white/80 hover:bg-white/[0.06]'
                        : 'border-transparent hover:border-line-strong/60 hover:bg-paper/70'
                    }`}
                    style={{ color: isFuture ? milestone.color : undefined }}
                    aria-expanded={isExpanded}
                    aria-controls={detailsId}
                  >
                    {isExpanded ? 'Show less' : 'Explore details'}
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              )}

              {/* Expanded details */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    id={detailsId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div
                      className="mt-4 space-y-4 border-t pt-4 text-left"
                      style={{ borderColor: isFuture ? 'rgba(255,255,255,0.10)' : `${milestone.color}22` }}
                    >
                      {/* Evidence / status note */}
                      {milestone.evidence && (
                        <div
                          className="rounded-xl border px-3 py-2.5"
                          style={{
                            borderColor: isFuture ? 'rgba(255,255,255,0.08)' : `${milestone.color}22`,
                            backgroundColor: isFuture ? 'rgba(255,255,255,0.04)' : `${milestone.color}06`,
                          }}
                        >
                          <p className={detailLabel}>
                            <ShieldCheck size={11} style={{ color: milestone.color }} />
                            {milestone.status === 'current' ? 'Status & evidence' : 'Evidence'}
                          </p>
                          <p className={detailText}>{milestone.evidence}</p>
                        </div>
                      )}

                      {/* Learning objectives */}
                      {milestone.learningObjectives && (
                        <div>
                          <p className={detailLabel}>
                            <Target size={11} style={{ color: milestone.color }} />
                            Learning objectives
                          </p>
                          <ul className="space-y-1.5">
                            {milestone.learningObjectives.map((objective, objectiveIndex) => (
                              <li key={objectiveIndex} className={`flex items-start gap-2 ${detailText}`}>
                                <span
                                  className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                                  style={{ backgroundColor: milestone.color }}
                                />
                                {objective}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Business relevance */}
                      {milestone.businessRelevance && (
                        <div>
                          <p className={detailLabel}>
                            <Zap size={11} style={{ color: milestone.color }} />
                            Business relevance
                          </p>
                          <p className={detailText}>{milestone.businessRelevance}</p>
                        </div>
                      )}

                      {/* Real-world use cases */}
                      {milestone.useCases && (
                        <div>
                          <p className={detailLabel}>
                            <Layers size={11} style={{ color: milestone.color }} />
                            Real-world use cases
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {milestone.useCases.map((useCase) => (
                              <span
                                key={useCase}
                                className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                                  isFuture ? 'border-white/10 bg-white/[0.04] text-white/60' : 'text-ink-soft'
                                }`}
                                style={isFuture ? undefined : {
                                  borderColor: `${milestone.color}30`,
                                  backgroundColor: `${milestone.color}08`,
                                }}
                              >
                                {useCase}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {isFuture && (
                        <p className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-[10.5px] leading-relaxed text-white/60">
                          This milestone is a future learning goal. It is not presented as completed training or professional experience.
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <span
            aria-hidden="true"
            className={`absolute top-10 hidden h-px w-14 lg:block ${isLeft ? 'right-0' : 'left-0'}`}
            style={{
              backgroundImage: `linear-gradient(to ${isLeft ? 'right' : 'left'}, ${milestone.color}70, transparent)`,
            }}
          />
        </div>

        {/* Timeline node */}
        <div className="absolute left-0 top-6 lg:left-1/2 lg:-translate-x-1/2">
          <motion.div
            initial={reduced ? false : { scale: 0.6, opacity: 0 }}
            whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {isCurrent && !reduced && (
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 rounded-xl"
                style={{ boxShadow: `0 0 0 0 ${milestone.color}55` }}
                animate={{ boxShadow: [`0 0 0 0 ${milestone.color}55`, `0 0 0 9px ${milestone.color}00`] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
            <button
              type="button"
              onClick={onToggle}
              onMouseEnter={() => setNodeOpen(true)}
              onMouseLeave={() => setNodeOpen(false)}
              onFocus={() => setNodeOpen(true)}
              onBlur={() => setNodeOpen(false)}
              aria-expanded={isExpanded}
              aria-controls={detailsId}
              aria-describedby={`node-note-${milestone.id}`}
              aria-label={`${status.label}: ${milestone.title}. ${isExpanded ? 'Collapse' : 'Expand'} details.`}
              className={`grid h-9 w-9 place-items-center rounded-xl border-2 shadow-sm transition-all duration-300 hover:scale-105 focus-visible:scale-105 ${
                isFuture ? 'border-dashed bg-ink' : 'bg-paper'
              }`}
              style={{ borderColor: milestone.color, color: milestone.color }}
            >
              <IconComp size={16} />
            </button>
            <span
              aria-hidden="true"
              className={`absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-paper ${status.dotClass}`}
            />
            <span
              id={`node-note-${milestone.id}`}
              role="tooltip"
              className={`pointer-events-none absolute left-0 top-full z-30 mt-2 w-44 rounded-xl border border-white/10 bg-ink px-3 py-2 text-left text-[10px] leading-relaxed text-white/65 shadow-lift transition-all duration-200 lg:left-1/2 lg:-translate-x-1/2 ${
                nodeOpen ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
              }`}
            >
              <span className="block font-mono text-[8px] uppercase tracking-[0.14em]" style={{ color: milestone.color }}>
                {status.label}
              </span>
              <span className="mt-0.5 block">{status.note}</span>
            </span>
          </motion.div>
        </div>

        {/* Empty spacer for the other column */}
        <div className="hidden lg:block lg:w-1/2" aria-hidden="true" />
      </div>
    </FadeInView>
  );
}

/* ── Chapter rail ── */
function ChapterRail({ activeId, onJump }: { activeId: string | null; onJump: (id: string) => void }) {
  return (
    <div className="-mx-1 mb-7 overflow-x-auto px-1 pb-2 no-scrollbar">
      <div role="navigation" aria-label="Jump to a roadmap milestone" className="flex min-w-max snap-x gap-2">
        {roadmapMilestones.map((milestone, index) => {
          const status = statusConfig[milestone.status];
          const active = activeId === milestone.id;
          const current = milestone.status === 'current';
          const isFuture = milestone.status === 'next' || milestone.status === 'planned';
          return (
            <button
              key={milestone.id}
              type="button"
              onClick={() => onJump(milestone.id)}
              aria-current={active ? 'true' : undefined}
              title={`${milestone.title} — ${status.label}`}
              className={`inline-flex snap-start items-center gap-2 rounded-full border px-3 py-1.5 transition-all duration-200 ${
                active
                  ? 'border-ink bg-ink text-cream shadow-soft'
                  : current
                    ? 'border-accent-coral/40 bg-accent-coral/[0.05] text-ink-soft hover:-translate-y-0.5 hover:border-accent-coral/60'
                    : isFuture
                      ? 'border-dashed border-line-strong/70 bg-cream/60 text-muted hover:-translate-y-0.5 hover:border-line-strong hover:text-ink-soft'
                      : 'border-line bg-cream/80 text-ink-soft hover:-translate-y-0.5 hover:border-line-strong'
              }`}
            >
              <span className={`font-mono text-[8px] ${active ? 'text-white/50' : 'text-muted'}`}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: status.color }} />
              <span className="font-display text-[11px] font-semibold tracking-tight">{milestone.phase}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Progress summary ── */
function ProgressSummary() {
  const counts = statusOrder.map((statusKey) => ({
    statusKey,
    ...statusConfig[statusKey],
    count: roadmapMilestones.filter((milestone) => milestone.status === statusKey).length,
  }));
  const total = roadmapMilestones.length;
  const label = counts.map((item) => `${item.count} ${item.label.toLowerCase()}`).join(', ');

  return (
    <FadeInView>
      <div className="mb-8 overflow-hidden rounded-2xl border border-line bg-cream/70 shadow-soft">
        <div className="flex flex-col gap-5 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink text-cream">
              <Compass size={17} />
            </span>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">Journey status</p>
              <p className="mt-1 font-display text-base font-bold tracking-tight text-ink sm:text-[17px]">
                {counts[0].count} built
                <span className="mx-1.5 text-line-strong">·</span>
                {counts[1].count} explored
                <span className="mx-1.5 text-line-strong">·</span>
                {counts[2].count} active
                <span className="mx-1.5 text-line-strong">·</span>
                {counts[3].count + counts[4].count} ahead
              </p>
              <p className="mt-0.5 text-[11px] text-muted">Foundations → systems → the horizon.</p>
            </div>
          </div>

          <div className="w-full sm:w-64">
            <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.14em] text-muted">
              <span>foundations</span>
              <span>horizon</span>
            </div>
            <div
              role="img"
              aria-label={`Learning status distribution across ${total} milestones: ${label}.`}
              className="mt-1.5 flex h-2 gap-0.5 overflow-hidden rounded-full bg-line/40"
            >
              {counts.map((item) => (
                <span
                  key={item.statusKey}
                  className="h-full first:rounded-l-full last:rounded-r-full"
                  style={{ width: `${(item.count / total) * 100}%`, backgroundColor: item.color }}
                />
              ))}
            </div>
          </div>
        </div>

        <ul className="flex flex-wrap gap-x-5 gap-y-2 border-t border-line/70 px-4 py-3 sm:px-5">
          {counts.map((item) => (
            <li key={item.statusKey} className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-muted">
                {item.label}
              </span>
              <span className="font-mono text-[9px] font-semibold text-ink-soft">{item.count}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mb-8 text-[11.5px] leading-relaxed text-muted">
        <span className="font-semibold text-ink-soft">How to read this:</span>{' '}
        completed means built and applied in a project; explored means studied and experimented with; in progress is active study;
        up next and planned are future learning goals — never presented as current experience.
      </p>
    </FadeInView>
  );
}

/* ── Interactive architecture flow ── */
const architectureNodes = [
  {
    label: 'Data Sources', icon: Database, color: '#2f55ff', textColor: '#2f55ff', state: 'built' as const,
    role: 'PostgreSQL, APIs and flat files — the entry points every pipeline starts from.',
  },
  {
    label: 'Kafka', icon: Radio, color: '#00a6c4', textColor: '#007e95', state: 'next' as const,
    role: 'The event backbone I am learning next: topics, partitions and consumer groups for real-time streams.',
  },
  {
    label: 'Spark', icon: Cpu, color: '#ff7a2f', textColor: '#b84a00', state: 'built' as const,
    role: 'Distributed batch and stream processing — built and tuned in the Spark-Docker Lab.',
  },
  {
    label: 'Cloud Storage', icon: Cloud, color: '#9a7bff', textColor: '#5a3fe0', state: 'planned' as const,
    role: 'Object storage and data-lake foundations — planned after Kafka.',
  },
  {
    label: 'Analytics', icon: Layers, color: '#0a7d5c', textColor: '#0a7d5c', state: 'built' as const,
    role: 'Curated models, dashboards and decisions — where pipeline value becomes visible.',
  },
];

const stateLabel: Record<'built' | 'next' | 'planned', string> = {
  built: 'built',
  next: 'next',
  planned: 'planned',
};

function ArchitectureFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const reduced = useReducedMotion();
  const [activeNode, setActiveNode] = useState(2);
  const node = architectureNodes[activeNode];

  return (
    <FadeInView delay={0.1}>
      <div ref={ref} className="mt-10 rounded-[1.75rem] border border-line bg-cream/60 p-5 shadow-soft sm:p-7">
        <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
          Where it all connects
        </p>
        <p className="mb-1 text-sm leading-relaxed text-ink-soft">
          <span className="font-medium text-ink">Understanding how data moves</span> is just as important as understanding where it is stored.
        </p>
        <p className="mb-6 text-[11px] text-muted">Tap or hover a node to see its role.</p>

        <div className="relative">
          <div aria-hidden="true" className="absolute left-[8%] right-[8%] top-5 h-px bg-gradient-to-r from-accent-blue via-accent-purple to-accent-green opacity-25 sm:top-6" />

          {!reduced && inView && (
            <motion.div
              aria-hidden="true"
              className="absolute top-[1.05rem] z-10 h-2 w-2 rounded-full bg-accent-blue shadow-[0_0_10px_rgba(47,85,255,0.7)] sm:top-[1.35rem]"
              animate={{ left: ['6%', '92%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
            />
          )}

          <div className="grid grid-cols-5 gap-1 sm:gap-2">
            {architectureNodes.map((item, index) => {
              const active = activeNode === index;
              return (
                <motion.button
                  key={item.label}
                  type="button"
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : undefined}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                  onClick={() => setActiveNode(index)}
                  onMouseEnter={() => setActiveNode(index)}
                  onFocus={() => setActiveNode(index)}
                  aria-pressed={active}
                  className="group flex min-w-0 flex-col items-center gap-2 rounded-xl text-center"
                >
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-xl border shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 sm:h-12 sm:w-12 ${
                      item.state !== 'built' ? 'border-dashed' : ''
                    }`}
                    style={{
                      borderColor: active ? item.color : `${item.color}50`,
                      color: item.color,
                      backgroundColor: `${item.color}0d`,
                      opacity: item.state === 'planned' ? 0.85 : 1,
                      boxShadow: active ? `0 0 0 4px ${item.color}16, 0 8px 18px -10px ${item.color}80` : undefined,
                    }}
                  >
                    <item.icon size={18} />
                  </span>
                  <span className={`text-[9px] font-mono font-medium leading-tight sm:text-[10px] ${
                    active ? 'text-ink' : item.state === 'built' ? 'text-ink-soft' : 'text-muted'
                  }`}>
                    {item.label}
                  </span>
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[7px] font-semibold uppercase tracking-wider"
                    style={{ backgroundColor: `${item.color}12`, color: item.textColor }}
                  >
                    {stateLabel[item.state]}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <div
            aria-live="polite"
            className="mt-4 flex items-start gap-3 rounded-xl border border-line bg-paper/70 px-3.5 py-3"
          >
            <span
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg"
              style={{ backgroundColor: `${node.color}12`, color: node.color }}
            >
              <node.icon size={15} />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-bold text-ink">{node.label}</p>
                <span
                  className="rounded-full px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider"
                  style={{ backgroundColor: `${node.color}12`, color: node.textColor }}
                >
                  {stateLabel[node.state]}
                </span>
              </div>
              <p className="mt-1 text-[11.5px] leading-relaxed text-muted">{node.role}</p>
            </div>
          </div>
        </div>

        {/* Architecture examples */}
        <div className="mt-6 grid gap-2 sm:grid-cols-3">
          {[
            {
              title: 'Batch lakehouse',
              flow: 'PostgreSQL → dbt → Parquet → Analytics',
              status: 'built',
              color: '#0a7d5c',
            },
            {
              title: 'Real-time streaming',
              flow: 'Kafka → Spark Streaming → Cloud Storage',
              status: 'planned',
              color: '#00a6c4',
            },
            {
              title: 'Unified Lakehouse (Databricks)',
              flow: 'Bronze (Raw) → Silver (Clean) → Gold (Unity Catalog)',
              status: 'planned',
              color: '#ff3621',
            },
          ].map((architecture) => (
            <div
              key={architecture.title}
              className="rounded-xl border px-3.5 py-3"
              style={{
                borderColor: `${architecture.color}25`,
                backgroundColor: `${architecture.color}06`,
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-ink">{architecture.title}</span>
                <span
                  className="rounded-full px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider"
                  style={{
                    backgroundColor: architecture.status === 'built' ? 'rgba(10,125,92,0.1)' : `${architecture.color}15`,
                    color: architecture.status === 'built' ? '#086a4f' : architecture.color,
                  }}
                >
                  {architecture.status}
                </span>
              </div>
              <p className="mt-1 font-mono text-[9px] tracking-wide text-muted">{architecture.flow}</p>
            </div>
          ))}
        </div>
      </div>
    </FadeInView>
  );
}

/* ── Main journey section ── */
export function JourneySection() {
  const reduced = useReducedMotion();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [inViewId, setInViewId] = useState<string | null>(roadmapMilestones[0].id);
  const roadmapRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: roadmapRef,
    offset: ['start 0.85', 'end 0.65'],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const activeChapter = expandedId ?? inViewId;

  // Deep links from project and case-study cards should open the matching milestone.
  useEffect(() => {
    const syncFromHash = () => {
      const raw = window.location.hash.slice(1);
      if (!raw.startsWith('milestone-')) return;
      const id = raw.slice('milestone-'.length);
      if (!roadmapMilestones.some((milestone) => milestone.id === id)) return;

      setExpandedId(id);
      window.setTimeout(() => {
        document.getElementById(`milestone-${id}`)?.scrollIntoView({
          behavior: reduced ? 'auto' : 'smooth',
          block: 'start',
        });
      }, 140);
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, [reduced]);

  // Keep the chapter rail in sync with the milestone currently being read.
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-milestone]'));
    if (!nodes.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const next = visible[0]?.target.getAttribute('data-milestone');
        if (next) setInViewId(next);
      },
      { rootMargin: '-28% 0px -58% 0px', threshold: 0 }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const toggleExpand = useCallback((id: string) => {
    setExpandedId((previous) => (previous === id ? null : id));
  }, []);

  const jumpTo = useCallback((id: string) => {
    setExpandedId(id);
    window.setTimeout(() => {
      document.getElementById(`milestone-${id}`)?.scrollIntoView({
        behavior: reduced ? 'auto' : 'smooth',
        block: 'center',
      });
    }, 80);
  }, [reduced]);

  return (
    <Section
      id="journey"
      label="07 — Engineering roadmap"
      title={
        <>
          The long way <span className="font-serif italic font-normal text-gradient-cool">to the internals.</span>
        </>
      }
      subtitle="An interactive journey through the technologies and systems I have learned — and the next destinations I am working toward."
    >
      <ProgressSummary />

      <ChapterRail activeId={activeChapter} onJump={jumpTo} />

      {/* Roadmap timeline */}
      <div ref={roadmapRef} className="relative">
        <TimelinePath progress={smoothProgress} reduced={!!reduced} variant="desktop" />
        <TimelinePath progress={smoothProgress} reduced={!!reduced} variant="mobile" />

        <div className="space-y-6 lg:space-y-8">
          {roadmapMilestones.map((milestone, index) => (
            <React.Fragment key={milestone.id}>
              {milestone.status === 'next' && <FutureHorizon />}
              <MilestoneCard
                milestone={milestone}
                index={index}
                isExpanded={expandedId === milestone.id}
                onToggle={() => toggleExpand(milestone.id)}
                onJump={jumpTo}
              />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Next stop / narrative bridge */}
      <FadeInView delay={0.12}>
        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-[1.5rem] bg-ink px-5 py-5 text-cream shadow-lift sm:flex-row sm:items-center sm:px-7">
          <div>
            <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/60">
              <Flag size={11} className="text-accent-cyan" />
              Next stop
            </p>
            <p className="mt-1.5 font-display text-lg font-bold tracking-tight text-white">
              Kafka first, then cloud storage.
            </p>
            <p className="mt-1 text-xs leading-relaxed text-white/65">
              Event streaming → object storage → a scalable streaming lakehouse.
            </p>
          </div>
          <a
            href="#projects"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/80 transition-colors hover:border-white/30 hover:text-white"
          >
            See the work behind these foundations
            <ArrowRight size={13} />
          </a>
        </div>
      </FadeInView>

      <ArchitectureFlow />

      {/* Storytelling insight */}
      <FadeInView delay={0.15}>
        <div className="mt-6 flex flex-col items-start justify-between gap-3 rounded-2xl border border-line bg-cream/60 px-5 py-4 sm:flex-row sm:items-center">
          <p className="flex items-center gap-2 text-sm text-ink-soft">
            <Sparkles size={15} className="text-accent-yellow" />
            Each technology builds on the last — foundations first, then scale, then depth.
          </p>
          <a href="#skills" className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-blue hover:text-accent-purple">
            See the full toolkit
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </FadeInView>
    </Section>
  );
}
