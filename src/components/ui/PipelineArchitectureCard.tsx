import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Check, Play, Pause, Sparkles, ArrowRight, Activity } from 'lucide-react';

// Precision SVG icons matching the reference image
function SourceIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="3.5" rx="1.75" />
      <rect x="3" y="10.25" width="18" height="3.5" rx="1.75" />
      <rect x="3" y="16.5" width="18" height="3.5" rx="1.75" />
    </svg>
  );
}

function IngestionIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 4.5v9" />
      <path d="M7.5 9h9" />
      <path d="M7.5 19.5h9" />
    </svg>
  );
}

function ProcessingIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <path d="M4 12h16" />
      <path d="M12 8.5v7" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

function StorageIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="4" />
      <path d="M8 12h8" />
      <path d="M9.5 12a2.5 2.5 0 0 0 5 0" />
    </svg>
  );
}

function AnalyticsIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 20v-5" />
      <path d="M12 20v-9" />
      <path d="M18 20V5" />
      <path d="M3 20h18" strokeWidth="2" />
    </svg>
  );
}

export interface PipelineStage {
  id: string;
  label: string;
  tagline: string;
  metric: string;
  statusText: string;
  IconComponent: React.ComponentType<{ size?: number; className?: string }>;
  // Completed styling
  completedBg: string;
  completedGlow: string;
  completedBadgeBg: string;
  // Active styling
  activeAccent: string;
  activeBorder: string;
  activeText: string;
  activeGlow: string;
  activeRippleBorder: string;
  barGradient: string;
}

const STAGES: PipelineStage[] = [
  {
    id: 'source',
    label: 'Source',
    tagline: 'OLTP & Event Streams',
    metric: '120k msgs/s',
    statusText: 'CDC replication & raw event ingestion from PostgreSQL, APIs and Kafka topics',
    IconComponent: SourceIcon,
    completedBg: 'bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600',
    completedGlow: 'shadow-[0_10px_28px_rgba(16,185,129,0.48)]',
    completedBadgeBg: 'bg-emerald-600',
    activeAccent: '#10b981',
    activeBorder: 'border-emerald-500',
    activeText: 'text-emerald-600',
    activeGlow: 'rgba(16,185,129,0.45)',
    activeRippleBorder: 'border-emerald-400',
    barGradient: 'from-emerald-500 to-teal-400',
  },
  {
    id: 'ingestion',
    label: 'Ingestion',
    tagline: 'Idempotent Landing & Drift Guard',
    metric: '0% schema drift',
    statusText: 'Detecting schema evolution, validating column types, and deduplicating batches',
    IconComponent: IngestionIcon,
    completedBg: 'bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600',
    completedGlow: 'shadow-[0_10px_28px_rgba(14,165,233,0.48)]',
    completedBadgeBg: 'bg-sky-600',
    activeAccent: '#0ea5e9',
    activeBorder: 'border-sky-500',
    activeText: 'text-sky-600',
    activeGlow: 'rgba(14,165,233,0.45)',
    activeRippleBorder: 'border-sky-400',
    barGradient: 'from-sky-500 to-blue-600',
  },
  {
    id: 'processing',
    label: 'Processing',
    tagline: 'Distributed Transformations',
    metric: '11 DAG steps',
    statusText: 'Executing Spark distributed DAG transformations, memory shuffles, and dbt models',
    IconComponent: ProcessingIcon,
    completedBg: 'bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600',
    completedGlow: 'shadow-[0_10px_28px_rgba(147,51,234,0.48)]',
    completedBadgeBg: 'bg-purple-600',
    activeAccent: '#a855f7',
    activeBorder: 'border-purple-500',
    activeText: 'text-purple-600',
    activeGlow: 'rgba(168,85,247,0.45)',
    activeRippleBorder: 'border-purple-400',
    barGradient: 'from-purple-500 via-indigo-500 to-sky-400',
  },
  {
    id: 'storage',
    label: 'Storage',
    tagline: 'Partitioned Lakehouse',
    metric: '40+ tests passed',
    statusText: 'Persisting Snappy-compressed columnar Parquet tables with ACID time-travel',
    IconComponent: StorageIcon,
    completedBg: 'bg-gradient-to-br from-teal-400 via-teal-500 to-emerald-600',
    completedGlow: 'shadow-[0_10px_28px_rgba(20,184,166,0.48)]',
    completedBadgeBg: 'bg-teal-600',
    activeAccent: '#14b8a6',
    activeBorder: 'border-teal-500',
    activeText: 'text-teal-600',
    activeGlow: 'rgba(20,184,166,0.45)',
    activeRippleBorder: 'border-teal-400',
    barGradient: 'from-teal-500 to-emerald-400',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    tagline: 'Curated KPIs & BI Marts',
    metric: '<180ms latency',
    statusText: 'Exposing gold-layer aggregates to high-concurrency SQL queries and dashboards',
    IconComponent: AnalyticsIcon,
    completedBg: 'bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600',
    completedGlow: 'shadow-[0_10px_28px_rgba(249,115,22,0.48)]',
    completedBadgeBg: 'bg-orange-600',
    activeAccent: '#f97316',
    activeBorder: 'border-orange-500',
    activeText: 'text-orange-600',
    activeGlow: 'rgba(249,115,22,0.45)',
    activeRippleBorder: 'border-orange-400',
    barGradient: 'from-orange-500 to-amber-400',
  },
];

const STAGE_DURATION_MS = 2500; // Duration each stage stays active
const CELEBRATION_DURATION_MS = 2000; // Duration when all 5 are completed before cycle resets

export function PipelineArchitectureCard() {
  const reduced = useReducedMotion();
  // Starts from Stage 0: Source!
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isCelebration, setIsCelebration] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  const startTimeRef = useRef<number>(Date.now());

  // Continuous Left-to-Right Execution Loop
  useEffect(() => {
    if (reduced || !isPlaying) return;

    startTimeRef.current = Date.now();
    setProgress(0);

    const intervalTime = 30; // 33 fps smooth progress animation
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const targetDuration = isCelebration ? CELEBRATION_DURATION_MS : STAGE_DURATION_MS;
      const pct = Math.min(100, (elapsed / targetDuration) * 100);
      setProgress(pct);

      if (elapsed >= targetDuration) {
        clearInterval(interval);
        if (isCelebration) {
          setIsCelebration(false);
          setActiveStage(0); // Smoothly restart cycle from Source!
        } else {
          setActiveStage((prev) => {
            if (prev >= STAGES.length - 1) {
              setIsCelebration(true);
              return prev;
            }
            return prev + 1;
          });
        }
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [activeStage, isPlaying, isCelebration, reduced]);

  const handleStageSelect = (index: number) => {
    setActiveStage(index);
    setIsCelebration(false);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  const displayedStageIndex = hoveredStage !== null ? hoveredStage : activeStage;
  const currentStage = STAGES[displayedStageIndex] || STAGES[0];

  return (
    <div className="relative mx-auto w-full max-w-[34rem] lg:max-w-none">
      {/* Outer Atmosphere Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 sm:-inset-8 rounded-[3.2rem] bg-gradient-to-r from-emerald-400/20 via-sky-400/20 via-purple-500/25 to-pink-400/20 blur-3xl opacity-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -left-12 h-52 w-52 rounded-full bg-emerald-400/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -right-10 h-52 w-52 rounded-full bg-purple-500/25 blur-3xl"
      />

      {/* Floating Sparkles & Ambient Particle Dots */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <span className="absolute -top-3 left-10 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
        <span className="absolute top-1/3 -left-4 h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
        <span className="absolute -bottom-4 right-1/4 h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]" />
        <span className="absolute top-8 -right-3 h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
      </div>

      {/* Main Browser Window Card */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[2.2rem] sm:rounded-[2.5rem] border border-line-strong/60 bg-cream/95 backdrop-blur-2xl p-4 sm:p-6 shadow-lift transition-all"
      >
        {/* Subtle Card Grid Pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid opacity-[0.035] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
        />

        {/* Browser Card Top Bar: Controls + Header + Live View Badge */}
        <div className="relative flex items-center justify-between border-b border-line/70 pb-3.5 sm:pb-4">
          {/* Traffic Light Dots */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] shadow-xs border border-black/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] shadow-xs border border-black/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f] shadow-xs border border-black/10" />
          </div>

          {/* Centered Monospace Card Title */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.24em] text-ink/80 select-none">
              PIPELINE ARCHITECTURE
            </span>
          </div>

          {/* Top-Right Pill Badge with Play/Pause toggle */}
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className="group flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[9.5px] sm:text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-800 transition-colors hover:bg-emerald-500/20 cursor-pointer"
            title={isPlaying ? 'Pause auto-cycle' : 'Resume auto-cycle'}
            aria-label={isPlaying ? 'Pause pipeline animation' : 'Resume pipeline animation'}
          >
            <span className="relative flex h-2 w-2">
              {isPlaying && !reduced && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>LINK EASY VIEW</span>
            {!reduced && (
              <span className="text-emerald-700/60 group-hover:text-emerald-900 transition-colors">
                {isPlaying ? <Pause size={9} /> : <Play size={9} />}
              </span>
            )}
          </button>
        </div>

        {/* Main Pipeline Track Area */}
        <div className="relative px-1 py-7 sm:py-9">
          {/* Left Incoming Data Dotted Stream & Arrow entering Source */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-[2.95rem] sm:top-[3.4rem] -translate-x-1 flex items-center pointer-events-none"
          >
            <div className="h-0.5 w-4 sm:w-6 border-t-2 border-dotted border-emerald-500/80" />
            <ArrowRight size={10} className="text-emerald-500 -ml-1" />
            {/* Incoming pulsing particle */}
            {activeStage === 0 && isPlaying && !reduced && (
              <motion.span
                className="absolute left-0 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"
                animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeIn' }}
              />
            )}
          </div>

          {/* Right Outgoing Data Dotted Stream & Arrow exiting Analytics */}
          <div
            aria-hidden="true"
            className="absolute right-0 top-[2.95rem] sm:top-[3.4rem] translate-x-1 flex items-center pointer-events-none"
          >
            <div
              className={`h-0.5 w-4 sm:w-6 border-t-2 border-dotted transition-colors duration-500 ${
                isCelebration ? 'border-orange-500' : 'border-slate-300'
              }`}
            />
            <ArrowRight
              size={10}
              className={`-ml-1 transition-colors duration-500 ${
                isCelebration ? 'text-orange-500' : 'text-slate-400'
              }`}
            />
          </div>

          {/* 5 Stages Node Columns & Interconnecting Pulsing Lines */}
          <div className="relative flex items-start justify-between">
            {STAGES.map((stage, index) => {
              const isCompleted = isCelebration || (!isCelebration && index < activeStage);
              const isActive = !isCelebration && index === activeStage;
              const isPending = !isCelebration && index > activeStage;
              const Icon = stage.IconComponent;

              return (
                <React.Fragment key={stage.id}>
                  {/* Stage Node Item */}
                  <div className="flex flex-col items-center text-center z-10">
                    <button
                      type="button"
                      onClick={() => handleStageSelect(index)}
                      onMouseEnter={() => setHoveredStage(index)}
                      onMouseLeave={() => setHoveredStage(null)}
                      className="group relative flex flex-col items-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500 rounded-2xl"
                      aria-label={`${stage.label} stage - ${isCompleted ? 'Completed' : isActive ? 'Active' : 'Pending'}`}
                    >
                      {/* Concentric Ripple Waves for Active Stage (Matching Squircle Shape) */}
                      {isActive && !reduced && (
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
                        >
                          {/* Inner Ripple Squircle */}
                          <motion.span
                            className={`absolute h-full w-full rounded-2xl border-2 ${stage.activeRippleBorder}`}
                            initial={{ scale: 1, opacity: 0.85 }}
                            animate={{ scale: [1, 1.28, 1.55], opacity: [0.85, 0.35, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                          />
                          {/* Outer Ripple Squircle */}
                          <motion.span
                            className={`absolute h-full w-full rounded-2xl border ${stage.activeRippleBorder}`}
                            initial={{ scale: 1, opacity: 0.6 }}
                            animate={{ scale: [1, 1.18, 1.38], opacity: [0.6, 0.25, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, delay: 0.45, ease: 'easeOut' }}
                          />
                          {/* Ambient Pulsing Aura */}
                          <motion.span
                            className="absolute h-full w-full rounded-2xl blur-lg"
                            style={{ backgroundColor: stage.activeGlow }}
                            animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.65, 0.35] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                          />
                        </div>
                      )}

                      {/* Main Squircle Node Box */}
                      <motion.div
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.96 }}
                        animate={
                          isActive && !reduced
                            ? { scale: [1, 1.025, 1] }
                            : isCompleted
                            ? { scale: 1 }
                            : { scale: 1 }
                        }
                        transition={{
                          scale: isActive
                            ? { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
                            : { type: 'spring', damping: 20, stiffness: 350 },
                        }}
                        className={`relative grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-2xl transition-all duration-500 ${
                          isCompleted
                            ? `${stage.completedBg} ${stage.completedGlow} text-white`
                            : isActive
                            ? `bg-white border-2 ${stage.activeBorder} ${stage.activeText} shadow-[0_0_24px_${stage.activeGlow}]`
                            : 'bg-slate-100/90 border border-slate-200/80 text-slate-400 hover:border-slate-300'
                        }`}
                      >
                        {/* Crisp Circular Checkmark Badge for Completed Stages */}
                        <AnimatePresence>
                          {isCompleted && (
                            <motion.span
                              initial={{ scale: 0, rotate: -30 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0 }}
                              transition={{ type: 'spring', damping: 14, stiffness: 340 }}
                              className={`absolute -top-1.5 -right-1.5 z-20 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full border-2 border-white shadow-sm ${stage.completedBadgeBg}`}
                              aria-hidden="true"
                            >
                              <Check size={10} strokeWidth={3.5} className="text-white" />
                            </motion.span>
                          )}
                        </AnimatePresence>

                        {/* Stage Vector Icon */}
                        <Icon
                          size={21}
                          className={`transition-colors duration-300 ${
                            isCompleted ? 'text-white' : isActive ? stage.activeText : 'text-slate-400'
                          }`}
                        />
                      </motion.div>

                      {/* Stage Label */}
                      <span
                        className={`mt-2.5 font-display text-[11px] sm:text-xs font-semibold tracking-tight transition-colors duration-300 ${
                          isCompleted
                            ? 'text-ink font-bold'
                            : isActive
                            ? `${stage.activeText} font-bold`
                            : 'text-slate-400 font-medium'
                        }`}
                      >
                        {stage.label}
                      </span>

                      {/* Pill Indicator Bar beneath label matching reference image */}
                      <div className="mt-1.5 h-1.5 w-12 sm:w-14 overflow-hidden rounded-full bg-slate-200/80">
                        {isActive ? (
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${stage.barGradient} shadow-[0_0_8px_${stage.activeGlow}]`}
                            style={{ width: `${progress}%` }}
                            transition={{ duration: 0.04, ease: 'linear' }}
                          />
                        ) : isCompleted ? (
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                            className="h-full w-full rounded-full bg-emerald-500 origin-left"
                          />
                        ) : (
                          <div className="h-full w-full rounded-full bg-slate-200/60" />
                        )}
                      </div>
                    </button>
                  </div>

                  {/* Dotted Connecting Line & Light Pulses between consecutive stages */}
                  {index < STAGES.length - 1 && (
                    <div
                      className="relative flex-1 flex items-center justify-center px-1 sm:px-2 pt-6 sm:pt-7"
                      aria-hidden="true"
                    >
                      {/* Dotted Line Track */}
                      <div
                        className={`h-0.5 w-full border-t-2 border-dotted transition-colors duration-500 ${
                          index < activeStage || isCelebration
                            ? 'border-emerald-500'
                            : index === activeStage
                            ? 'border-sky-400/80'
                            : 'border-slate-300/80'
                        }`}
                      />

                      {/* Data Flow "Walking" Pulse: Glowing Cyan Orb with ring halo traveling across */}
                      {(index === activeStage || (index === activeStage - 1 && progress < 40)) &&
                        isPlaying &&
                        !reduced && (
                          <motion.div
                            className="pointer-events-none absolute top-[1.32rem] sm:top-[1.58rem] z-20"
                            initial={{ left: '0%' }}
                            animate={{ left: '100%' }}
                            transition={{
                              duration: 1.4,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          >
                            <div className="relative flex h-5 w-5 -translate-x-1/2 items-center justify-center">
                              {/* Outer ring glow */}
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400/40" />
                              <span className="h-3.5 w-3.5 rounded-full bg-sky-300/40 flex items-center justify-center border border-sky-400/60">
                                <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_12px_#38bdf8]" />
                              </span>
                            </div>
                          </motion.div>
                        )}
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Dynamic Telemetry Status Strip */}
        <div className="relative mt-2 rounded-2xl border border-line bg-paper/70 p-3 sm:p-3.5 transition-colors">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-purple-500/10 text-purple-600"
                aria-hidden="true"
              >
                <Activity size={13} className={isPlaying && !reduced ? 'animate-pulse' : ''} />
              </span>
              <div className="min-w-0 truncate text-xs">
                {isCelebration ? (
                  <>
                    <span className="font-bold text-emerald-700">Pipeline Cycle Complete: </span>
                    <span className="text-ink-soft">All 5 stages verified · Zero drift · SLA 100%</span>
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-ink">{currentStage.label}: </span>
                    <span className="text-ink-soft">{currentStage.statusText}</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-[10px] text-muted shrink-0">
              <span className="inline-flex items-center gap-1 rounded-md bg-cream px-2 py-0.5 border border-line text-ink font-semibold">
                <Sparkles size={11} className="text-accent-yellow" />
                {isCelebration ? '100% SLA' : currentStage.metric}
              </span>
            </div>
          </div>
        </div>

        {/* Ambient Bottom Stack Badges matching reference screenshot */}
        <div className="mt-3.5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-2 border-t border-line/60">
          {[
            { name: 'Hadoop', mark: 'HDP', color: '#0a7d5c' },
            { name: 'Docker', mark: 'DKR', color: '#007e95' },
            { name: 'Git', mark: 'GIT', color: '#b84a00' },
            { name: 'Apache Kafka', mark: 'KFK', color: '#2f55ff' },
            { name: 'Cloud Storage', mark: 'S3', color: '#7357ff' },
          ].map((tag) => (
            <span
              key={tag.name}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line/70 bg-cream/80 px-2 py-1 font-mono text-[9px] sm:text-[10px] text-ink-soft shadow-xs"
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
      </motion.div>
    </div>
  );
}
