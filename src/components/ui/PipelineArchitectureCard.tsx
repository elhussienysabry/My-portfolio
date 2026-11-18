import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Check, Play, Pause, Sparkles, Activity } from 'lucide-react';

/* ── Precision vector icons ─────────────────────────────────────────────── */

function SourceIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="4" width="18" height="3.5" rx="1.75" />
      <rect x="3" y="10.25" width="18" height="3.5" rx="1.75" />
      <rect x="3" y="16.5" width="18" height="3.5" rx="1.75" />
    </svg>
  );
}

function IngestionIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 4.5v9" />
      <path d="M7.5 9h9" />
      <path d="M7.5 19.5h9" />
    </svg>
  );
}

function ProcessingIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <path d="M4 12h16" />
      <path d="M12 8.5v7" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

function StorageIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="4" />
      <path d="M8 12h8" />
      <path d="M9.5 12a2.5 2.5 0 0 0 5 0" />
    </svg>
  );
}

function AnalyticsIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M6 20v-5" />
      <path d="M12 20v-9" />
      <path d="M18 20V5" />
      <path d="M3 20h18" strokeWidth="2" />
    </svg>
  );
}

/* ── Stage model ───────────────────────────────────────────────────────── */

export interface PipelineStage {
  id: string;
  label: string;
  tagline: string;
  metric: string;
  statusText: string;
  IconComponent: React.ComponentType<{ size?: number; className?: string }>;
  accent: string;
  completedBg: string;
  completedGlow: string;
  completedBadgeBg: string;
  barGradient: string;
}

const STAGES: PipelineStage[] = [
  {
    id: 'source',
    label: 'Source',
    tagline: 'OLTP & event streams',
    metric: 'batch + CDC',
    statusText: 'CDC + batch ingestion from Postgres and APIs',
    IconComponent: SourceIcon,
    accent: '#10b981',
    completedBg: 'bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600',
    completedGlow: 'shadow-[0_10px_28px_rgba(16,185,129,0.42)]',
    completedBadgeBg: 'bg-emerald-600',
    barGradient: 'from-emerald-500 to-teal-400',
  },
  {
    id: 'ingestion',
    label: 'Ingestion',
    tagline: 'Idempotent landing',
    metric: 'schema checks',
    statusText: 'Schema checks, type validation and dedupe',
    IconComponent: IngestionIcon,
    accent: '#0ea5e9',
    completedBg: 'bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600',
    completedGlow: 'shadow-[0_10px_28px_rgba(14,165,233,0.42)]',
    completedBadgeBg: 'bg-sky-600',
    barGradient: 'from-sky-500 to-blue-600',
  },
  {
    id: 'processing',
    label: 'Processing',
    tagline: 'Distributed transformations',
    metric: '11 DAG steps',
    statusText: 'Spark DAG transforms plus dbt models',
    IconComponent: ProcessingIcon,
    accent: '#8b5cf6',
    completedBg: 'bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600',
    completedGlow: 'shadow-[0_10px_28px_rgba(147,51,234,0.42)]',
    completedBadgeBg: 'bg-purple-600',
    barGradient: 'from-purple-500 via-indigo-500 to-sky-400',
  },
  {
    id: 'storage',
    label: 'Storage',
    tagline: 'Partitioned lakehouse',
    metric: '40+ tests',
    statusText: 'Partitioned Snappy Parquet with ACID',
    IconComponent: StorageIcon,
    accent: '#14b8a6',
    completedBg: 'bg-gradient-to-br from-teal-400 via-teal-500 to-emerald-600',
    completedGlow: 'shadow-[0_10px_28px_rgba(20,184,166,0.42)]',
    completedBadgeBg: 'bg-teal-600',
    barGradient: 'from-teal-500 to-emerald-400',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    tagline: 'Curated KPIs & marts',
    metric: 'gold marts',
    statusText: 'Gold marts for dashboards and SQL',
    IconComponent: AnalyticsIcon,
    accent: '#f97316',
    completedBg: 'bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600',
    completedGlow: 'shadow-[0_10px_28px_rgba(249,115,22,0.42)]',
    completedBadgeBg: 'bg-orange-600',
    barGradient: 'from-orange-500 to-amber-400',
  },
];

const STAGE_DURATION_MS = 2600;
const CELEBRATION_DURATION_MS = 1800;

/* ── Flow connector ────────────────────────────────────────────────────── */

function FlowConnector({
  state,
  index,
  playing,
  reduced,
}: {
  state: 'completed' | 'active' | 'pending';
  index: number;
  playing: boolean;
  reduced: boolean | null;
}) {
  const line =
    state === 'completed'
      ? 'border-emerald-500/80'
      : state === 'active'
        ? 'border-indigo-400/80'
        : 'border-slate-300/80';

  // Connectors are ~34px wide, so one comet (completed) or two pulses (active) stays legible.
  const particles = state === 'completed' ? 1 : state === 'active' ? 2 : 0;
  const duration = state === 'active' ? 1.6 : 2.6;
  const stagger = state === 'active' ? 0.8 : 0.9;
  const dot = state === 'completed'
    ? 'bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.95)]'
    : 'bg-indigo-400 shadow-[0_0_12px_rgba(99,102,241,1)]';
  const halo = state === 'completed' ? 'bg-emerald-400/35' : 'bg-indigo-400/45';
  const trail = state === 'completed'
    ? 'from-transparent via-emerald-400/25 to-emerald-400/80'
    : 'from-transparent via-indigo-400/30 to-indigo-400/85';

  return (
    <div className="relative flex-1 self-stretch" aria-hidden="true">
      <div
        className={`absolute left-0 right-0 top-[22px] -translate-y-1/2 border-t-2 border-dotted transition-colors duration-500 sm:top-[28px] ${line}`}
      />

      {playing && !reduced &&
        Array.from({ length: particles }).map((_, i) => (
          <motion.div
            key={`${state}-${i}`}
            className="pointer-events-none absolute inset-y-0 left-0 w-full"
            initial={{ x: '0%', opacity: 0 }}
            animate={{ x: '100%', opacity: [0, 1, 1, 0] }}
            transition={{
              x: {
                duration,
                delay: i * stagger + index * 0.08,
                repeat: Infinity,
                ease: 'linear',
              },
              opacity: {
                duration,
                delay: i * stagger + index * 0.08,
                repeat: Infinity,
                ease: 'linear',
                times: [0, 0.1, 0.9, 1],
              },
            }}
          >
            {/* Short comet trail behind the pulse */}
            <span
              className={`absolute left-0 top-[22px] h-[2.5px] w-4 -translate-x-full -translate-y-1/2 rounded-full bg-gradient-to-r sm:top-[28px] ${trail}`}
            />
            <span
              className={`absolute left-0 top-[22px] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[2.5px] sm:top-[28px] ${halo}`}
            />
            <span
              className={`absolute left-0 top-[22px] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full sm:top-[28px] ${dot}`}
            />
          </motion.div>
        ))}
    </div>
  );
}

/* ── Card ──────────────────────────────────────────────────────────────── */

export function PipelineArchitectureCard() {
  const reduced = useReducedMotion();
  const [activeStage, setActiveStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isCelebration, setIsCelebration] = useState(false);
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);
  const [cycle, setCycle] = useState(0);

  /* Reduced motion: present a clear static frame instead of a frozen start. */
  useEffect(() => {
    if (reduced) {
      setActiveStage(2);
      setIsPlaying(false);
    }
  }, [reduced]);

  /* One timeout per stage keeps the loop smooth without a 33 fps render loop. */
  useEffect(() => {
    if (reduced || !isPlaying) return;

    const duration = isCelebration ? CELEBRATION_DURATION_MS : STAGE_DURATION_MS;
    const id = window.setTimeout(() => {
      if (isCelebration) {
        setIsCelebration(false);
        setActiveStage(0);
      } else if (activeStage >= STAGES.length - 1) {
        setIsCelebration(true);
      } else {
        setActiveStage((value) => value + 1);
      }
    }, duration);

    return () => window.clearTimeout(id);
  }, [activeStage, isCelebration, isPlaying, reduced]);

  const togglePlay = () => {
    setIsPlaying((value) => {
      if (!value) setCycle((current) => current + 1);
      return !value;
    });
  };

  const handleStageSelect = (index: number) => {
    setActiveStage(index);
    setIsCelebration(false);
    setCycle((current) => current + 1);
  };

  const displayedIndex = hoveredStage ?? activeStage;
  const displayedStage = STAGES[displayedIndex] ?? STAGES[0];
  const showCompletion = isCelebration && hoveredStage === null;
  const statusAccent = showCompletion ? '#10b981' : displayedStage.accent;

  return (
    <div className="relative mx-auto w-full max-w-[34rem] lg:max-w-none">
      {/* Ambient atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 rounded-[3.2rem] bg-gradient-to-r from-emerald-400/20 via-sky-400/20 to-purple-500/25 opacity-80 blur-3xl sm:-inset-8"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-12 -top-12 h-52 w-52 rounded-full bg-emerald-400/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -right-10 h-52 w-52 rounded-full bg-purple-500/25 blur-3xl"
      />

      {/* Browser-style card */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[2.2rem] border border-line-strong/60 bg-cream/95 p-4 shadow-lift backdrop-blur-2xl sm:rounded-[2.5rem] sm:p-6"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid opacity-[0.035] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-emerald-400/45"
          animate={{ opacity: isCelebration ? 1 : 0 }}
          transition={{ duration: 0.45 }}
        />

        {/* Header */}
        <div className="relative flex items-center justify-between gap-2 border-b border-line/70 pb-3.5 sm:pb-4">
          <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full border border-black/10 bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full border border-black/10 bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full border border-black/10 bg-[#27c93f]" />
          </div>

          <span className="min-w-0 truncate font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink/80 select-none xl:text-xs xl:tracking-[0.24em]">
            Pipeline Architecture
          </span>

          <button
            type="button"
            onClick={togglePlay}
            disabled={!!reduced}
            aria-label={isPlaying ? 'Pause pipeline animation' : 'Resume pipeline animation'}
            aria-pressed={!isPlaying}
            className="group flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider text-emerald-800 transition-colors hover:bg-emerald-500/20 disabled:cursor-default disabled:hover:bg-emerald-500/10 sm:px-2.5 sm:text-[10px]"
          >
            <span className="relative flex h-2 w-2">
              {isPlaying && !reduced && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              )}
              <span
                className={`relative inline-flex h-2 w-2 rounded-full transition-colors ${
                  isPlaying ? 'bg-emerald-500' : 'bg-slate-400'
                }`}
              />
            </span>
            <span className="sm:hidden">{reduced ? 'Static' : 'Live'}</span>
            <span className="hidden sm:inline xl:hidden">{reduced ? 'Static' : 'Live'}</span>
            <span className="hidden xl:inline">{reduced ? 'Static preview' : 'Live data flow'}</span>
            {!reduced && (
              <span className="text-emerald-700/60 transition-colors group-hover:text-emerald-900">
                {isPlaying ? <Pause size={9} /> : <Play size={9} />}
              </span>
            )}
          </button>
        </div>

        {/* Stage track */}
        <div className="relative px-1 py-6 sm:py-8">
          <div className="flex items-start">
            {STAGES.map((stage, index) => {
              const isCompleted = isCelebration || index < activeStage;
              const isActive = !isCelebration && index === activeStage;
              const Icon = stage.IconComponent;

              return (
                <React.Fragment key={stage.id}>
                  <div className="relative z-10 flex w-11 shrink-0 flex-col items-center sm:w-14">
                    <button
                      type="button"
                      onClick={() => handleStageSelect(index)}
                      onMouseEnter={() => setHoveredStage(index)}
                      onMouseLeave={() => setHoveredStage(null)}
                      onFocus={() => setHoveredStage(index)}
                      onBlur={() => setHoveredStage(null)}
                      aria-label={`${stage.label} stage — ${
                        isCompleted ? 'completed' : isActive ? 'active' : 'pending'
                      }`}
                      aria-current={isActive ? 'step' : undefined}
                      className="group relative flex w-full flex-col items-center rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                    >
                      <div className="relative">
                        {/* Concentric ripples — anchored to the icon, not the label */}
                        {isActive && !reduced && (
                          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                            <motion.span
                              className="absolute inset-0 rounded-2xl border-2 border-indigo-500/70"
                              animate={{ scale: [1, 1.24, 1.55], opacity: [0.9, 0.55, 0] }}
                              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                            />
                            <motion.span
                              className="absolute inset-0 rounded-2xl border border-indigo-500/60"
                              animate={{ scale: [1, 1.24, 1.55], opacity: [0.75, 0.45, 0] }}
                              transition={{ duration: 2.2, delay: 1.1, repeat: Infinity, ease: 'easeOut' }}
                            />
                            <motion.span
                              className="absolute inset-0 rounded-2xl bg-indigo-500/20 blur-sm"
                              animate={{ scale: [1, 1.1, 1], opacity: [0.35, 0.6, 0.35] }}
                              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                            />
                          </div>
                        )}

                        <motion.div
                          whileHover={reduced ? undefined : { scale: 1.06 }}
                          whileTap={reduced ? undefined : { scale: 0.96 }}
                          animate={isActive && !reduced ? { scale: [1, 1.03, 1] } : { scale: 1 }}
                          transition={
                            isActive && !reduced
                              ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                              : { type: 'spring', damping: 20, stiffness: 350 }
                          }
                          className={`relative z-10 grid h-11 w-11 place-items-center rounded-2xl border transition-colors duration-500 sm:h-14 sm:w-14 ${
                            isCompleted
                              ? `${stage.completedBg} ${stage.completedGlow} border-white/25 text-white`
                              : isActive
                                ? 'border-indigo-500 bg-white text-indigo-600 shadow-[0_0_26px_rgba(99,102,241,0.42)]'
                                : 'border-slate-200/80 bg-slate-100/90 text-slate-400 group-hover:border-slate-300'
                          }`}
                        >
                          <Icon
                            size={19}
                            className={`transition-colors duration-300 sm:hidden ${
                              isCompleted ? 'text-white' : isActive ? 'text-indigo-600' : 'text-slate-400'
                            }`}
                          />
                          <Icon
                            size={22}
                            className={`hidden transition-colors duration-300 sm:block ${
                              isCompleted ? 'text-white' : isActive ? 'text-indigo-600' : 'text-slate-400'
                            }`}
                          />

                          <AnimatePresence>
                            {isCompleted && (
                              <motion.span
                                initial={{ scale: 0, rotate: -30 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0 }}
                                transition={{ type: 'spring', damping: 14, stiffness: 340 }}
                                className={`absolute -right-1.5 -top-1.5 z-20 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white shadow-sm sm:h-5 sm:w-5 ${stage.completedBadgeBg}`}
                                aria-hidden="true"
                              >
                                <Check size={10} strokeWidth={3.5} className="text-white" />
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </div>

                      <span
                        className={`mt-2.5 font-display text-[10px] font-semibold leading-tight tracking-tight transition-colors duration-300 sm:text-[11px] xl:text-xs ${
                          isCompleted
                            ? 'font-bold text-ink'
                            : isActive
                              ? 'font-bold text-indigo-600'
                              : 'font-medium text-slate-500'
                        }`}
                      >
                        {stage.label}
                      </span>

                      {/* Mini progress bar */}
                      <div
                        className="mt-1.5 h-1.5 w-10 overflow-hidden rounded-full bg-slate-200/80 sm:w-14"
                        aria-hidden="true"
                      >
                        {isActive ? (
                          reduced ? (
                            <div className="h-full w-[45%] rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-sky-400" />
                          ) : (
                            <div
                              key={`${activeStage}-${cycle}`}
                              className="pipeline-progress h-full rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-sky-400"
                              style={{
                                animationDuration: `${STAGE_DURATION_MS}ms`,
                                animationPlayState: isPlaying ? 'running' : 'paused',
                              }}
                            />
                          )
                        ) : isCompleted ? (
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className={`h-full w-full origin-left rounded-full bg-gradient-to-r ${stage.barGradient}`}
                          />
                        ) : (
                          <div className="h-full w-full rounded-full bg-slate-200/60" />
                        )}
                      </div>
                    </button>
                  </div>

                  {index < STAGES.length - 1 && (
                    <FlowConnector
                      state={isCelebration || index < activeStage ? 'completed' : index === activeStage ? 'active' : 'pending'}
                      index={index}
                      playing={isPlaying}
                      reduced={reduced}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Telemetry strip */}
        <div className="relative mt-2 rounded-2xl border border-line bg-paper/70 p-3 transition-colors sm:p-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex min-w-[11rem] flex-1 items-center gap-2">
              <span
                className="grid h-6 w-6 shrink-0 place-items-center rounded-lg transition-colors"
                style={{ backgroundColor: `${statusAccent}16`, color: statusAccent }}
                aria-hidden="true"
              >
                <Activity size={13} className={isPlaying && !reduced ? 'animate-pulse' : ''} />
              </span>
              <div className="min-w-0 text-[11px] leading-snug sm:text-xs" title={showCompletion ? 'All five stages complete' : displayedStage.statusText}>
                {showCompletion ? (
                  <>
                    <span className="font-bold text-emerald-700">Cycle complete: </span>
                    <span className="text-ink-soft">all five stages verified</span>
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-ink">{displayedStage.label}: </span>
                    <span className="text-ink-soft">{displayedStage.statusText}</span>
                  </>
                )}
              </div>
            </div>

            <div className="ml-auto flex shrink-0 items-center gap-2">
              <span className="hidden font-mono text-[9px] uppercase tracking-[0.14em] text-muted sm:inline">
                {showCompletion ? '05 / 05' : `${String(activeStage + 1).padStart(2, '0')} / 05`}
              </span>
              <span className="inline-flex items-center gap-1 rounded-md border border-line bg-cream px-2 py-0.5 font-mono text-[10px] font-semibold text-ink">
                <Sparkles size={11} className="text-accent-yellow" />
                {showCompletion ? 'all clear' : displayedStage.metric}
              </span>
            </div>
          </div>
        </div>

        {/* Stack badges */}
        <div className="mt-3.5 border-t border-line/60 pt-2">
          {/* Learning/planned qualifiers — kept off the badges so the row stays on one line */}
          <p className="mb-1.5 pr-0.5 text-right font-mono text-[8px] uppercase tracking-[0.1em] text-muted sm:text-[9px]">
            Kafka learning <span className="text-line-strong">·</span> Cloud Storage planned
          </p>

          <div className="mx-auto flex max-w-[15rem] flex-wrap items-center justify-center gap-1 sm:max-w-none sm:gap-1.5 lg:max-w-[15rem] xl:max-w-none">
            {[
              { name: 'Hadoop', color: '#0a7d5c' },
              { name: 'Docker', color: '#007e95' },
              { name: 'Git', color: '#b84a00' },
              { name: 'Apache Kafka', color: '#2f55ff' },
              { name: 'Cloud Storage', color: '#7357ff' },
            ].map((tag) => (
              <span
                key={tag.name}
                className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg border border-line/70 bg-cream/80 px-1.5 py-1 font-mono text-[9px] text-ink-soft shadow-xs sm:gap-1.5 sm:px-2 sm:text-[10px]"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: tag.color }}
                  aria-hidden="true"
                />
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
