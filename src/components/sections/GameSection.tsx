import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Section, FadeInView } from '@/components/ui/Components';
import {
  Database, ArrowDownToLine, Cpu, HardDrive, BarChart3, Timer, Trophy,
  RotateCcw, CheckCircle2, X, ArrowLeft, ArrowRight, GripVertical,
  MousePointerClick, Sparkles, Play, PartyPopper, Trash2,
} from 'lucide-react';

const STAGES = [
  { id: 'source', label: 'Source', shortLabel: 'Source', hint: 'Raw files & APIs', Icon: Database, color: '#2f55ff' },
  { id: 'ingest', label: 'Ingestion', shortLabel: 'Ingest', hint: 'Validate & load', Icon: ArrowDownToLine, color: '#00a6c4' },
  { id: 'process', label: 'Processing', shortLabel: 'Process', hint: 'Transform & test', Icon: Cpu, color: '#7357ff' },
  { id: 'storage', label: 'Storage', shortLabel: 'Storage', hint: 'Model & persist', Icon: HardDrive, color: '#0b9e73' },
  { id: 'analytics', label: 'Analytics', shortLabel: 'Analytics', hint: 'Query & report', Icon: BarChart3, color: '#ff7a2f' },
] as const;

type StageId = (typeof STAGES)[number]['id'];

const STAGE_ORDER: StageId[] = ['source', 'ingest', 'process', 'storage', 'analytics'];
const STORAGE_KEY = 'es-pipeline-best-v1';
const EMPTY_SLOTS: (StageId | null)[] = [null, null, null, null, null];

function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function getStage(id: StageId) {
  return STAGES.find((stage) => stage.id === id)!;
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

const INITIAL_FEEDBACK = 'Drag a component into the pipeline — or tap a component, then tap a slot.';

export function GameSection() {
  const [slots, setSlots] = useState<(StageId | null)[]>(EMPTY_SLOTS);
  const [bankOrder, setBankOrder] = useState<StageId[]>(() => shuffle(STAGE_ORDER));
  const [selected, setSelected] = useState<StageId | null>(null);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [level, setLevel] = useState<'idle' | 'playing' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState(INITIAL_FEEDBACK);
  const [checked, setChecked] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [finalTime, setFinalTime] = useState(0);
  const [best, setBest] = useState<{ score: number; time: number } | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const reduced = useReducedMotion();

  const bank = bankOrder.filter((id) => !slots.includes(id));
  const filledCount = slots.filter(Boolean).length;
  const allFilled = filledCount === STAGE_ORDER.length;

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { score?: unknown; time?: unknown };
      if (typeof parsed.score === 'number' && typeof parsed.time === 'number') {
        setBest({ score: parsed.score, time: parsed.time });
      }
    } catch {
      // Best score is a nice-to-have; ignore unavailable storage.
    }
  }, []);

  useEffect(() => {
    if (!started || level === 'success') return;
    const interval = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(interval);
  }, [started, level]);

  const markPlaying = () => {
    setStarted(true);
    setChecked(false);
    if (level !== 'success') setLevel('playing');
  };

  const place = (id: StageId, target: number) => {
    if (level === 'success') return;
    setSlots((previous) => {
      const next = [...previous];
      next[target] = id;
      return next;
    });
    setSelected(null);
    setActiveSlot(target);
    markPlaying();
    setFeedback(`${getStage(id).label} placed in step ${target + 1}. Keep building — or validate when all five are set.`);
  };

  const swap = (from: number, to: number) => {
    if (level === 'success' || from === to) return;
    setSlots((previous) => {
      const next = [...previous];
      [next[from], next[to]] = [next[to], next[from]];
      return next;
    });
    setActiveSlot(to);
    markPlaying();
    setFeedback('Moved one step. Use the arrows to fine-tune the order.');
  };

  const removeFromSlot = (index: number) => {
    if (level === 'success') return;
    const stage = slots[index];
    if (!stage) return;
    setSlots((previous) => previous.map((value, i) => (i === index ? null : value)));
    setActiveSlot(null);
    setSelected(null);
    markPlaying();
    setFeedback(`${getStage(stage).label} returned to the component tray.`);
  };

  const selectBankItem = (id: StageId) => {
    if (level === 'success') return;
    if (selected === id) {
      setSelected(null);
      setFeedback(INITIAL_FEEDBACK);
    } else {
      setSelected(id);
      setFeedback(`${getStage(id).label} selected. Now choose a slot in the pipeline.`);
    }
    setActiveSlot(null);
  };

  const handleSlotClick = (index: number) => {
    if (level === 'success') return;
    if (selected) {
      place(selected, index);
      return;
    }
    if (slots[index]) {
      setActiveSlot(index);
      setFeedback(`${getStage(slots[index]!).label} selected. Move it with the arrows or return it to the tray.`);
    } else {
      setFeedback('Choose a component from the tray first, then tap a slot.');
    }
  };

  const resetGame = useCallback(() => {
    setSlots(EMPTY_SLOTS);
    setBankOrder(shuffle(STAGE_ORDER));
    setSelected(null);
    setActiveSlot(null);
    setSeconds(0);
    setStarted(false);
    setAttempts(0);
    setLevel('idle');
    setFeedback(INITIAL_FEEDBACK);
    setChecked(false);
    setFinalScore(0);
    setFinalTime(0);
    setDragOver(null);
  }, []);

  const validate = () => {
    if (!allFilled) {
      setFeedback(`Almost there — ${filledCount} of 5 slots are filled. Place every component first.`);
      return;
    }
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    setChecked(true);

    const correct = slots.every((id, index) => id === STAGE_ORDER[index]);
    if (correct) {
      const score = Math.max(
        10,
        100 - Math.max(0, nextAttempts - 1) * 15 - Math.floor(seconds / 5) * 2
      );
      const nextBest = !best || score > best.score || (score === best.score && seconds < best.time)
        ? { score, time: seconds }
        : best;
      setFinalScore(score);
      setFinalTime(seconds);
      setLevel('success');
      setBest(nextBest);
      setFeedback('Pipeline shipped! Source → Ingestion → Processing → Storage → Analytics.');
      try {
        if (nextBest) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextBest));
      } catch {
        // Best score is a nice-to-have; ignore unavailable storage.
      }
    } else {
      const correctCount = slots.filter((id, index) => id === STAGE_ORDER[index]).length;
      setLevel('error');
      setFeedback(
        `Not quite — ${correctCount} of 5 are in the right spot. Check the highlighted steps and try again.`
      );
    }
  };

  const handleDragStart = (event: React.DragEvent, id: StageId) => {
    event.dataTransfer.setData('text/plain', id);
    event.dataTransfer.effectAllowed = 'move';
    setSelected(id);
    setActiveSlot(null);
  };

  const handleSlotDragStart = (event: React.DragEvent, index: number) => {
    event.dataTransfer.setData('application/x-pipeline-slot', String(index));
    event.dataTransfer.effectAllowed = 'move';
    setActiveSlot(index);
  };

  const handleDrop = (event: React.DragEvent, target: number) => {
    event.preventDefault();
    setDragOver(null);
    if (level === 'success') return;
    const from = event.dataTransfer.getData('application/x-pipeline-slot');
    if (from !== '') {
      swap(Number(from), target);
      return;
    }
    const id = event.dataTransfer.getData('text/plain');
    if ((STAGE_ORDER as string[]).includes(id)) {
      place(id as StageId, target);
    }
  };

  const confetti = useMemo(
    () =>
      Array.from({ length: 28 }, (_, index) => ({
        id: index,
        left: Math.random() * 100,
        delay: Math.random() * 0.55,
        duration: 1.4 + Math.random() * 1.1,
        drift: `${Math.random() * 120 - 60}px`,
        spin: `${Math.random() * 520 - 260}deg`,
        color: ['#2f55ff', '#00a6c4', '#7357ff', '#0b9e73', '#ff7a2f', '#e8478c', '#e3ac1f'][index % 7],
        round: index % 3 === 0,
      })),
    [level]
  );

  return (
    <Section
      id="play"
      label="08 — Take a break"
      title={
        <>
          Can you build a <span className="font-serif italic font-normal text-gradient-warm">data pipeline?</span>
        </>
      }
      subtitle="A tiny challenge inspired by the day job. Order the components correctly, validate your build, and see how quickly you can ship it."
    >
      <FadeInView>
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-cream shadow-lift">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-purple/50 to-transparent" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent-purple/[0.08] blur-[70px]" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-accent-cyan/[0.08] blur-[70px]" />

          {level === 'success' && !reduced && (
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
              {confetti.map((piece) => (
                <span
                  key={piece.id}
                  className={`absolute top-0 ${piece.round ? 'rounded-full' : 'rounded-sm'}`}
                  style={{
                    left: `${piece.left}%`,
                    width: piece.round ? 7 : 9,
                    height: piece.round ? 7 : 5,
                    backgroundColor: piece.color,
                    animation: `confetti-fall ${piece.duration}s ease-in ${piece.delay}s forwards`,
                    ['--drift' as string]: piece.drift,
                    ['--spin' as string]: piece.spin,
                  }}
                />
              ))}
            </div>
          )}

          <div className="relative p-5 sm:p-7 lg:p-8">
            <div className="flex flex-col gap-3 border-b border-line pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-accent-yellow">
                  <Play size={14} fill="currentColor" />
                </span>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">Bonus level</p>
                  <p className="font-display text-sm font-bold text-ink">Data Pipeline Challenge</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-paper px-2.5 py-1.5 font-mono text-[10px] text-ink-soft">
                  <Timer size={12} className="text-accent-blue" />
                  {formatTime(seconds)}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-paper px-2.5 py-1.5 font-mono text-[10px] text-ink-soft">
                  <MousePointerClick size={12} className="text-accent-purple" />
                  {attempts} {attempts === 1 ? 'try' : 'tries'}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-accent-yellow/30 bg-accent-yellow/[0.08] px-2.5 py-1.5 font-mono text-[10px] text-ink-soft">
                  <Trophy size={12} className="text-accent-yellow" />
                  Best {best ? best.score : '—'}
                </span>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-2 rounded-xl border border-accent-blue/15 bg-accent-blue/[0.04] px-3.5 py-3 text-xs leading-relaxed text-ink-soft">
              <Sparkles size={14} className="mt-0.5 shrink-0 text-accent-blue" />
              <p>
                <strong className="font-semibold text-ink">Your mission:</strong> connect{' '}
                <span className="font-mono text-[11px]">Source → Ingestion → Processing → Storage → Analytics</span>.
                Drag a tile, or tap it and then tap a slot. Use the arrow controls to reorder.
              </p>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">Build your pipeline</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">{filledCount}/5 placed</p>
              </div>

              <div className="relative grid grid-cols-5 gap-1.5 sm:gap-2">
                <div
                  aria-hidden="true"
                  className="absolute left-[8%] right-[8%] top-[38%] -z-0 h-px bg-gradient-to-r from-accent-blue via-accent-purple to-accent-orange opacity-20"
                />
                {slots.map((id, index) => {
                  const stage = id ? getStage(id) : null;
                  const isCorrect = id === STAGE_ORDER[index];
                  const isActive = activeSlot === index;
                  const isDragTarget = dragOver === index;
                  let borderColor = stage ? `${stage.color}66` : 'var(--color-line-strong)';
                  let backgroundColor = stage ? `${stage.color}0d` : 'transparent';
                  if (isDragTarget) {
                    borderColor = '#2f55ff';
                    backgroundColor = 'rgba(47,85,255,0.07)';
                  }
                  if (level === 'success') {
                    borderColor = '#0b9e73';
                    backgroundColor = 'rgba(11,158,115,0.08)';
                  } else if (checked && level === 'error') {
                    borderColor = isCorrect ? '#0b9e73' : '#f25555';
                    backgroundColor = isCorrect ? 'rgba(11,158,115,0.07)' : 'rgba(242,85,85,0.07)';
                  }

                  return (
                    <button
                      key={index}
                      type="button"
                      draggable={Boolean(id)}
                      onDragStart={(event) => handleSlotDragStart(event, index)}
                      onDragOver={(event) => {
                        event.preventDefault();
                        setDragOver(index);
                      }}
                      onDragLeave={() => setDragOver((current) => (current === index ? null : current))}
                      onDrop={(event) => handleDrop(event, index)}
                      onClick={() => handleSlotClick(index)}
                      className={`relative z-10 flex min-h-[6.4rem] flex-col items-center justify-center gap-1.5 rounded-xl border-2 px-1.5 py-3 text-center transition-all duration-200 sm:min-h-[7.5rem] ${
                        stage ? 'border-solid' : 'border-dashed'
                      } ${isActive ? 'ring-2 ring-accent-blue/35 ring-offset-2 ring-offset-cream' : ''}`}
                      style={{ borderColor, backgroundColor }}
                      aria-label={
                        stage
                          ? `Pipeline step ${index + 1}: ${stage.label}. ${selected ? `Place ${getStage(selected).label} here.` : 'Press to select this step.'}`
                          : `Pipeline step ${index + 1}, empty. ${selected ? `Place ${getStage(selected).label} here.` : 'Choose a component from the tray.'}`
                      }
                    >
                      <span className="absolute left-1.5 top-1.5 font-mono text-[8px] text-muted">0{index + 1}</span>
                      {checked && level !== 'success' && stage && (
                        <span className="absolute right-1.5 top-1.5">
                          {isCorrect ? (
                            <CheckCircle2 size={11} className="text-green-ink" />
                          ) : (
                            <X size={11} className="text-coral-ink" />
                          )}
                        </span>
                      )}
                      {level === 'success' && (
                        <span className="absolute right-1.5 top-1.5">
                          <CheckCircle2 size={11} className="text-green-ink" />
                        </span>
                      )}
                      {stage ? (
                        <>
                          <span
                            className="grid h-8 w-8 place-items-center rounded-lg sm:h-9 sm:w-9"
                            style={{ backgroundColor: `${stage.color}18`, color: stage.color }}
                          >
                            <stage.Icon size={17} />
                          </span>
                          <span className="text-[10px] font-bold leading-tight text-ink sm:text-[11px]">
                            <span className="sm:hidden">{stage.shortLabel}</span>
                            <span className="hidden sm:inline">{stage.label}</span>
                          </span>
                          <span className="hidden font-mono text-[8px] uppercase tracking-wider text-muted sm:block">
                            {stage.hint}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="grid h-8 w-8 place-items-center rounded-lg border border-dashed border-line-strong text-muted sm:h-9 sm:w-9">
                            <span className="text-lg leading-none">+</span>
                          </span>
                          <span className="text-[9px] font-medium text-muted sm:text-[10px]">Empty</span>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence initial={false}>
                {activeSlot !== null && slots[activeSlot] && level !== 'success' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line bg-paper px-3 py-2">
                      <span className="text-[11px] font-medium text-ink-soft">
                        Step {activeSlot + 1}: <strong className="text-ink">{getStage(slots[activeSlot]!).label}</strong>
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => activeSlot > 0 && swap(activeSlot, activeSlot - 1)}
                          disabled={activeSlot === 0}
                          className="grid h-7 w-7 place-items-center rounded-md border border-line bg-cream text-ink-soft transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-35"
                          aria-label="Move selected component left"
                        >
                          <ArrowLeft size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => activeSlot < 4 && swap(activeSlot, activeSlot + 1)}
                          disabled={activeSlot === 4}
                          className="grid h-7 w-7 place-items-center rounded-md border border-line bg-cream text-ink-soft transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-35"
                          aria-label="Move selected component right"
                        >
                          <ArrowRight size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromSlot(activeSlot)}
                          className="ml-1 inline-flex h-7 items-center gap-1 rounded-md border border-line bg-cream px-2 text-[10px] font-medium text-ink-soft transition-colors hover:border-accent-coral hover:text-coral-ink"
                          aria-label="Remove selected component from pipeline"
                        >
                          <Trash2 size={11} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-5">
              <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">Component tray</p>
              <div className="flex flex-wrap gap-2">
                {bank.map((id) => {
                  const stage = getStage(id);
                  const isSelected = selected === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      draggable
                      onDragStart={(event) => handleDragStart(event, id)}
                      onClick={() => selectBankItem(id)}
                      aria-pressed={isSelected}
                      className={`group flex flex-1 min-w-[8.5rem] items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-all sm:min-w-[9.5rem] ${
                        isSelected
                          ? 'border-accent-blue bg-accent-blue/[0.06] shadow-sm'
                          : 'border-line bg-paper hover:border-line-strong hover:bg-cream'
                      }`}
                    >
                      <span
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg"
                        style={{ backgroundColor: `${stage.color}14`, color: stage.color }}
                      >
                        <stage.Icon size={15} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[11px] font-bold leading-tight text-ink">{stage.label}</span>
                        <span className="block truncate font-mono text-[9px] uppercase tracking-wider text-muted">{stage.hint}</span>
                      </span>
                      <GripVertical
                        size={13}
                        className={`shrink-0 transition-colors ${isSelected ? 'text-accent-blue' : 'text-muted/45 group-hover:text-muted'}`}
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
                {bank.length === 0 && (
                  <p
                    className={`flex items-center gap-2 rounded-xl border border-dashed px-3.5 py-3 text-[11px] font-medium ${
                      level === 'success'
                        ? 'border-accent-green/35 bg-accent-green/[0.05] text-green-ink'
                        : checked && level === 'error'
                          ? 'border-accent-coral/35 bg-accent-coral/[0.05] text-coral-ink'
                          : 'border-accent-green/35 bg-accent-green/[0.05] text-green-ink'
                    }`}
                  >
                    {checked && level === 'error' ? <X size={14} /> : <CheckCircle2 size={14} />}
                    {level === 'success'
                      ? 'All components placed — pipeline validated!'
                      : checked && level === 'error'
                        ? 'All components placed — adjust the highlighted steps.'
                        : 'All components placed — validate your pipeline!'}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p
                aria-live="polite"
                className={`flex items-start gap-2 text-xs leading-relaxed sm:max-w-md ${
                  level === 'error'
                    ? 'text-coral-ink'
                    : level === 'success'
                      ? 'text-green-ink'
                      : 'text-muted'
                }`}
              >
                {level === 'success' ? (
                  <PartyPopper size={14} className="mt-0.5 shrink-0" />
                ) : level === 'error' ? (
                  <X size={14} className="mt-0.5 shrink-0" />
                ) : (
                  <Sparkles size={14} className="mt-0.5 shrink-0 text-accent-purple" />
                )}
                {feedback}
              </p>

              <div className="flex shrink-0 items-center gap-2">
                {level !== 'success' && (
                  <>
                    <button
                      type="button"
                      onClick={resetGame}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-paper px-3.5 py-2.5 text-xs font-semibold text-ink-soft transition-colors hover:border-ink hover:text-ink"
                    >
                      <RotateCcw size={13} />
                      Clear
                    </button>
                    <button
                      type="button"
                      onClick={validate}
                      disabled={!allFilled}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-cream transition-all hover:bg-accent-blue disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-ink"
                    >
                      <CheckCircle2 size={13} />
                      Validate pipeline
                    </button>
                  </>
                )}
              </div>
            </div>

            <AnimatePresence>
              {level === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="status"
                  className="mt-5 overflow-hidden rounded-2xl border border-accent-green/25 bg-gradient-to-r from-accent-green/[0.08] via-accent-cyan/[0.06] to-accent-blue/[0.06] px-4 py-4 sm:px-5"
                >
                  <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                    <div className="flex items-start gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-green text-white">
                        <CheckCircle2 size={20} />
                      </span>
                      <div>
                        <p className="font-display text-lg font-extrabold tracking-tight text-ink">Pipeline shipped!</p>
                        <p className="mt-0.5 text-xs text-ink-soft">
                          Score <strong className="text-green-ink">{finalScore}</strong> · finished in{' '}
                          <strong className="text-ink">{formatTime(finalTime)}</strong> · {attempts}{' '}
                          {attempts === 1 ? 'attempt' : 'attempts'}
                          {best && best.score === finalScore && best.time === finalTime ? ' · new best!' : ''}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={resetGame}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-cream transition-colors hover:bg-accent-blue"
                    >
                      <RotateCcw size={13} />
                      Play again
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </FadeInView>
    </Section>
  );
}
