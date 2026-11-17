import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Section, FadeInView } from '@/components/ui/Components';
import {
  Radio, Zap, Timer, Trophy, RotateCcw, CheckCircle2, XCircle,
  Play, MousePointerClick, Keyboard, Grid3x3, ChevronRight, Gauge, Crosshair,
} from 'lucide-react';

/* ───────────────────────── Game configuration ───────────────────────── */

type Phase = 'intro' | 'playing' | 'sector-clear' | 'run-clear' | 'signal-lost';

interface Sector {
  id: string;
  name: string;
  size: number;
  budget: number;
  base: number;
  seedPresses: number;
}

const SECTORS: Sector[] = [
  { id: 'bootstrap', name: 'Bootstrap', size: 3, budget: 10, base: 120, seedPresses: 4 },
  { id: 'throughput', name: 'Throughput', size: 4, budget: 16, base: 220, seedPresses: 6 },
  { id: 'orchestration', name: 'Orchestration', size: 5, budget: 24, base: 340, seedPresses: 8 },
];

const BEST_KEY = 'es-signal-sync-best-v1';
const MAX_SCORE_TIME = 90;

/** Toggle a node and its orthogonal neighbours — the core lights-out move. */
function applyMove(nodes: boolean[], index: number, size: number): boolean[] {
  const next = [...nodes];
  const row = Math.floor(index / size);
  const col = index % size;
  const targets: Array<[number, number]> = [
    [row, col],
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ];
  for (const [r, c] of targets) {
    if (r >= 0 && r < size && c >= 0 && c < size) {
      const target = r * size + c;
      next[target] = !next[target];
    }
  }
  return next;
}

/** Build a puzzle by scattering presses over a fully restored grid, so a solution always exists. */
function createPuzzle(size: number, presses: number): boolean[] {
  let nodes = Array<boolean>(size * size).fill(true);
  const chosen = new Set<number>();
  const wanted = Math.min(presses, size * size);
  while (chosen.size < wanted) {
    chosen.add(Math.floor(Math.random() * size * size));
  }
  chosen.forEach((index) => {
    nodes = applyMove(nodes, index, size);
  });
  // Guard against a degenerate "already solved" puzzle.
  if (nodes.every(Boolean)) {
    nodes = applyMove(nodes, Math.floor((size * size) / 2), size);
  }
  return nodes;
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function persistBest(value: number) {
  try {
    window.localStorage.setItem(BEST_KEY, String(value));
  } catch {
    // Scoring works without persistence.
  }
}

/* ───────────────────────── Small building blocks ───────────────────────── */

function StatTile({
  label,
  value,
  hint,
  icon: Icon,
  tone = 'default',
}: {
  label: string;
  value: string;
  hint?: string;
  icon: React.ElementType;
  tone?: 'default' | 'warning';
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2.5">
      <div className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-white/40">
        <Icon size={10} className={tone === 'warning' ? 'text-accent-coral' : 'text-accent-cyan'} />
        {label}
      </div>
      <p
        className={`mt-1 font-display text-lg font-bold leading-none tabular-nums tracking-tight ${
          tone === 'warning' ? 'text-accent-coral' : 'text-cream'
        }`}
      >
        {value}
      </p>
      {hint && <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.1em] text-white/30">{hint}</p>}
    </div>
  );
}

function RuleRow({ index, icon: Icon, title, body }: {
  index: string;
  icon: React.ElementType;
  title: string;
  body: string;
}) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-accent-cyan">
        <Icon size={13} />
      </span>
      <span className="min-w-0">
        <span className="flex items-baseline gap-1.5">
          <span className="font-mono text-[8px] text-white/30">{index}</span>
          <span className="text-[12.5px] font-semibold text-cream">{title}</span>
        </span>
        <span className="mt-0.5 block text-[11.5px] leading-relaxed text-white/50">{body}</span>
      </span>
    </li>
  );
}

function SectorPips({ levelIndex, phase }: { levelIndex: number; phase: Phase }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`Sector ${levelIndex + 1} of ${SECTORS.length}`}>
      {SECTORS.map((sector, index) => {
        const cleared =
          phase === 'run-clear' ||
          index < levelIndex ||
          (phase === 'sector-clear' && index === levelIndex);
        const active =
          index === levelIndex && (phase === 'playing' || phase === 'intro' || phase === 'signal-lost');
        return (
          <span
            key={sector.id}
            className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 font-mono text-[8px] uppercase tracking-[0.12em] transition-colors ${
              active
                ? 'border-accent-cyan/45 bg-accent-cyan/10 text-accent-cyan'
                : cleared
                  ? 'border-accent-green/35 bg-accent-green/10 text-accent-green'
                  : 'border-white/10 text-white/30'
            }`}
          >
            {cleared ? <CheckCircle2 size={9} /> : <span>{String(index + 1).padStart(2, '0')}</span>}
            <span className="hidden sm:inline">{sector.name}</span>
          </span>
        );
      })}
    </div>
  );
}

/* ───────────────────────── Section ───────────────────────── */

export function GameSection() {
  const reduced = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<Phase>('intro');
  const [levelIndex, setLevelIndex] = useState(0);
  const [nodes, setNodes] = useState<boolean[]>([]);
  const [initialNodes, setInitialNodes] = useState<boolean[]>([]);
  const [movesLeft, setMovesLeft] = useState(SECTORS[0].budget);
  const [moves, setMoves] = useState(0);
  const [levelSeconds, setLevelSeconds] = useState(0);
  const [levelTime, setLevelTime] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [lastGain, setLastGain] = useState(0);
  const [runTime, setRunTime] = useState(0);
  const [newBest, setNewBest] = useState(false);
  const [best, setBest] = useState(0);
  const [cursor, setCursor] = useState(4);
  const [feedback, setFeedback] = useState('Restore every node in the grid. A move flips a node and its neighbours.');

  const level = SECTORS[levelIndex];
  const previewNodes = useMemo(() => createPuzzle(SECTORS[0].size, SECTORS[0].seedPresses), []);
  const boardNodes = phase === 'intro' ? previewNodes : nodes;
  const boardSize = phase === 'intro' ? SECTORS[0].size : level.size;
  const totalNodes = boardSize * boardSize;
  const onlineCount = boardNodes.filter(Boolean).length;
  const isSolved = onlineCount === totalNodes && boardNodes.length > 0;
  const progress = totalNodes > 0 ? onlineCount / totalNodes : 0;
  const budgetRatio = level.budget > 0 ? movesLeft / level.budget : 0;

  /* Best score */
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(BEST_KEY);
      const parsed = raw ? Number.parseInt(raw, 10) : 0;
      if (Number.isFinite(parsed) && parsed > 0) setBest(parsed);
    } catch {
      // Ignore unavailable storage.
    }
  }, []);

  /* Level clock */
  useEffect(() => {
    if (phase !== 'playing') return;
    const id = window.setInterval(() => setLevelSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(id);
  }, [phase]);

  /* Keep keyboard focus inside the game when a round starts. */
  useEffect(() => {
    if (phase !== 'playing') return;
    const frame = window.requestAnimationFrame(() => {
      gridRef.current
        ?.querySelector<HTMLButtonElement>('[data-cell][tabindex="0"]')
        ?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [phase]);

  const prepare = useCallback((index: number) => {
    const nextLevel = SECTORS[index];
    const puzzle = createPuzzle(nextLevel.size, nextLevel.seedPresses);
    setLevelIndex(index);
    setNodes(puzzle);
    setInitialNodes(puzzle);
    setMovesLeft(nextLevel.budget);
    setMoves(0);
    setLevelSeconds(0);
    setLevelTime(0);
    setCursor(Math.floor(puzzle.length / 2));
    setFeedback(
      `Sector ${index + 1} — ${nextLevel.name}. Flip nodes to bring all ${puzzle.length} online.`,
    );
    setPhase('playing');
  }, []);

  const startRun = useCallback(() => {
    setTotalScore(0);
    setLastGain(0);
    setRunTime(0);
    setNewBest(false);
    prepare(0);
  }, [prepare]);

  const retrySector = useCallback(() => {
    setNodes(initialNodes);
    setMovesLeft(level.budget);
    setMoves(0);
    setLevelSeconds(0);
    setLevelTime(0);
    setFeedback('Sector reset. Same grid, fresh move budget.');
    setPhase('playing');
  }, [initialNodes, level.budget]);

  const restartRun = useCallback(() => {
    setTotalScore(0);
    setLastGain(0);
    setRunTime(0);
    setNewBest(false);
    prepare(0);
  }, [prepare]);

  const advanceSector = useCallback(() => {
    if (levelIndex >= SECTORS.length - 1) return;
    prepare(levelIndex + 1);
  }, [levelIndex, prepare]);

  const playMove = useCallback(
    (index: number) => {
      if (phase !== 'playing') return;
      setCursor(index);

      const next = applyMove(nodes, index, level.size);
      const remaining = movesLeft - 1;
      const solved = next.every(Boolean);

      setNodes(next);
      setMoves((value) => value + 1);
      setMovesLeft(Math.max(remaining, 0));

      if (solved) {
        const moveBonus = Math.max(remaining, 0) * 15;
        const timeBonus = Math.max(0, MAX_SCORE_TIME - levelSeconds) * 2;
        const gain = level.base + moveBonus + timeBonus;
        const runTotal = totalScore + gain;
        const nextBest = Math.max(best, runTotal);

        setLastGain(gain);
        setLevelTime(levelSeconds);
        setRunTime((value) => value + levelSeconds);
        setTotalScore(runTotal);
        setFeedback(`Sector restored — ${moveBonus} move bonus, ${timeBonus} time bonus.`);

        if (nextBest > best) {
          setBest(nextBest);
          persistBest(nextBest);
        }

        if (levelIndex === SECTORS.length - 1) {
          setNewBest(runTotal > best);
          setPhase('run-clear');
        } else {
          setPhase('sector-clear');
        }
      } else if (remaining <= 0) {
        setFeedback('Move budget exhausted — the grid is still out of sync.');
        setPhase('signal-lost');
      } else {
        setFeedback(
          `${next.filter(Boolean).length} of ${next.length} nodes online · ${remaining} ${
            remaining === 1 ? 'move' : 'moves'
          } left.`,
        );
      }
    },
    [best, level.base, level.size, levelIndex, levelSeconds, movesLeft, nodes, phase, totalScore],
  );

  const handleGridKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (phase !== 'playing') return;
    const size = level.size;
    let next = cursor;

    switch (event.key) {
      case 'ArrowLeft':
        next = cursor % size === 0 ? cursor + size - 1 : cursor - 1;
        break;
      case 'ArrowRight':
        next = cursor % size === size - 1 ? cursor - size + 1 : cursor + 1;
        break;
      case 'ArrowUp':
        next = cursor - size < 0 ? cursor + (size * size - size) : cursor - size;
        break;
      case 'ArrowDown':
        next = cursor + size >= size * size ? cursor % size : cursor + size;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = size * size - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    setCursor(next);
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-cell="${next}"]`)?.focus();
  };

  const overlayMotion = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 8 } };

  return (
    <Section
      id="play"
      label="08 — Take a break"
      title={
        <>
          Restore the <span className="font-serif italic font-normal text-gradient-warm">signal.</span>
        </>
      }
      subtitle="Signal Sync is a compact grid puzzle: every move flips a node and its direct neighbours. Light the whole grid before the move budget runs out."
    >
      <FadeInView>
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-cream shadow-lift">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/60 to-transparent"
          />

          <div className="relative bg-ink text-cream">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-grid-dark opacity-[0.18]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent-cyan/[0.12] blur-[90px]"
            />

            {/* Console header */}
            <div className="relative border-b border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/[0.06] font-display text-[11px] font-extrabold tracking-tight text-cream">
                    SS
                    <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-ink bg-accent-cyan" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold leading-tight tracking-tight text-cream">
                      Signal Sync
                    </p>
                    <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">
                      Grid restoration · 3 sectors
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <SectorPips levelIndex={levelIndex} phase={phase} />
                  <span className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-white/45 sm:inline-flex">
                    <Trophy size={10} className="text-accent-yellow" />
                    Best <span className="text-cream">{best > 0 ? best.toLocaleString() : '—'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Console body */}
            <div className="relative mx-auto w-full p-5 sm:p-6 lg:p-7">
              {/* Board */}
              <div className="mx-auto w-full max-w-[29rem]">
                  <div className="mb-3 grid grid-cols-3 gap-2">
                    <StatTile
                      icon={Zap}
                      label="Moves"
                      value={String(movesLeft)}
                      hint={`of ${level.budget}`}
                      tone={movesLeft <= 3 && phase === 'playing' ? 'warning' : 'default'}
                    />
                    <StatTile icon={Timer} label="Time" value={formatTime(levelSeconds)} hint="this sector" />
                    <StatTile icon={Gauge} label="Score" value={totalScore.toLocaleString()} hint="run total" />
                  </div>

                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-3 sm:p-4">
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-signal-grid opacity-40" />

                    <div className="relative mb-3 flex items-center justify-between gap-3">
                      <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/40">
                        Sector {String(levelIndex + 1).padStart(2, '0')} · {level.name}
                      </p>
                      <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/40">
                        <span className={isSolved ? 'text-accent-green' : 'text-accent-cyan'}>
                          {onlineCount}/{totalNodes}
                        </span>{' '}
                        online
                      </p>
                    </div>

                    <div
                      role="group"
                      aria-label={`Signal grid, ${totalNodes} nodes, ${onlineCount} online`}
                      ref={gridRef}
                      onKeyDown={handleGridKeyDown}
                      className="relative grid gap-2"
                      style={{ gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))` }}
                    >
                      {boardNodes.map((online, index) => {
                        const row = Math.floor(index / boardSize);
                        const col = index % boardSize;
                        const label = `${String.fromCharCode(65 + row)}${col + 1}`;
                        const selected = index === cursor && phase === 'playing';
                        return (
                          <button
                            key={`${boardSize}-${index}`}
                            type="button"
                            data-cell={index}
                            tabIndex={selected ? 0 : -1}
                            onFocus={() => setCursor(index)}
                            onClick={() => playMove(index)}
                            disabled={phase !== 'playing' && phase !== 'intro'}
                            aria-label={`Node ${label}, ${online ? 'online' : 'offline'}`}
                            aria-pressed={online}
                            className={`group relative flex aspect-square items-center justify-center rounded-[0.7rem] border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-yellow/80 focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
                              online
                                ? 'border-accent-cyan/45 bg-accent-cyan/[0.14] shadow-[inset_0_0_16px_rgba(0,166,196,0.16)] hover:bg-accent-cyan/[0.2]'
                                : 'border-white/[0.07] bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.05]'
                            } ${selected ? 'ring-1 ring-accent-yellow/60' : ''} ${
                              phase === 'playing' ? 'active:scale-[0.93]' : 'cursor-default'
                            } ${phase === 'intro' ? 'opacity-45 blur-[0.4px]' : ''}`}
                          >
                            <span
                              className={`absolute left-1.5 top-1 font-mono text-[7px] leading-none tracking-[0.06em] ${
                                online ? 'text-accent-cyan/60' : 'text-white/20'
                              }`}
                              aria-hidden="true"
                            >
                              {label}
                            </span>
                            <span
                              aria-hidden="true"
                              className={`h-2 w-2 rounded-full transition-all duration-200 ${
                                online
                                  ? 'bg-accent-cyan shadow-[0_0_10px_rgba(0,166,196,0.9)]'
                                  : 'border border-white/20 bg-transparent group-hover:border-white/35'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>

                    {/* Online progress */}
                    <div className="relative mt-3">
                      <div className="h-1 overflow-hidden rounded-full bg-white/[0.08]">
                        <motion.div
                          className="h-full origin-left rounded-full bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-green"
                          initial={false}
                          animate={{ scaleX: progress }}
                          transition={reduced ? { duration: 0 } : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                      <div className="mt-1.5 flex items-center justify-between font-mono text-[7.5px] uppercase tracking-[0.12em] text-white/25">
                        <span>signal coverage</span>
                        <span>{Math.round(progress * 100)}%</span>
                      </div>
                    </div>

                    {/* Move budget meter */}
                    <div className="relative mt-2">
                      <div className="h-1 overflow-hidden rounded-full bg-white/[0.08]">
                        <motion.div
                          className={`h-full origin-left rounded-full ${
                            budgetRatio <= 0.3 ? 'bg-accent-coral' : 'bg-accent-yellow/80'
                          }`}
                          initial={false}
                          animate={{ scaleX: budgetRatio }}
                          transition={reduced ? { duration: 0 } : { duration: 0.3, ease: 'easeOut' }}
                        />
                      </div>
                    </div>

                    {/* Overlays */}
                    <AnimatePresence mode="wait">
                      {phase !== 'playing' && (
                        <motion.div
                          key={phase}
                          {...overlayMotion}
                          transition={{ duration: reduced ? 0.01 : 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-0 z-20 grid place-items-center overflow-y-auto rounded-2xl bg-ink/95 p-4 backdrop-blur-[3px]"
                        >
                          {phase === 'intro' && (
                            <div className="w-full max-w-[19rem] text-center">
                              <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl border border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan">
                                <Crosshair size={20} />
                              </span>
                              <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-cream">
                                Signal Sync
                              </h3>
                              <p className="mt-1 text-[12px] leading-relaxed text-white/55">
                                Three grids, three move budgets. Flip a node to toggle it and its four
                                neighbours — then bring every node online.
                              </p>
                              <ul className="mt-3 space-y-1.5 text-left">
                                <li className="flex items-start gap-2 text-[11.5px] leading-relaxed text-white/60">
                                  <MousePointerClick size={12} className="mt-0.5 shrink-0 text-accent-cyan" />
                                  Tap or click any node to send a signal.
                                </li>
                                <li className="flex items-start gap-2 text-[11.5px] leading-relaxed text-white/60">
                                  <Keyboard size={12} className="mt-0.5 shrink-0 text-accent-cyan" />
                                  Arrow keys move, Space or Enter flips.
                                </li>
                                <li className="flex items-start gap-2 text-[11.5px] leading-relaxed text-white/60">
                                  <Trophy size={12} className="mt-0.5 shrink-0 text-accent-cyan" />
                                  Fewer moves and faster clears score higher.
                                </li>
                              </ul>
                              <button
                                type="button"
                                onClick={startRun}
                                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cream px-4 py-2.5 text-xs font-bold text-ink transition-colors hover:bg-accent-yellow"
                              >
                                <Play size={13} fill="currentColor" />
                                Start run
                              </button>
                              <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.14em] text-white/30">
                                Best · {best > 0 ? best.toLocaleString() : 'no record yet'}
                              </p>
                            </div>
                          )}

                          {phase === 'sector-clear' && (
                            <div className="w-full max-w-[19rem] text-center">
                              <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-accent-green/15 text-accent-green">
                                <CheckCircle2 size={22} />
                              </span>
                              <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">
                                Sector {String(levelIndex + 1).padStart(2, '0')} clear
                              </p>
                              <h3 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-cream">
                                Grid restored
                              </h3>
                              <dl className="mt-3 grid grid-cols-3 gap-2">
                                {[
                                  { term: 'Moves', value: String(moves) },
                                  { term: 'Time', value: formatTime(levelTime) },
                                  { term: 'Points', value: `+${lastGain}` },
                                ].map((item) => (
                                  <div key={item.term} className="rounded-lg border border-white/10 bg-white/[0.04] px-2 py-2">
                                    <dt className="font-mono text-[7.5px] uppercase tracking-[0.12em] text-white/35">
                                      {item.term}
                                    </dt>
                                    <dd className="mt-0.5 font-display text-sm font-bold tabular-nums text-cream">
                                      {item.value}
                                    </dd>
                                  </div>
                                ))}
                              </dl>
                              <button
                                type="button"
                                onClick={advanceSector}
                                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cream px-4 py-2.5 text-xs font-bold text-ink transition-colors hover:bg-accent-yellow"
                              >
                                Next sector
                                <ChevronRight size={14} />
                              </button>
                              <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.12em] text-white/30">
                                Up next · {SECTORS[levelIndex + 1]?.name} · {SECTORS[levelIndex + 1]?.size}×
                                {SECTORS[levelIndex + 1]?.size}
                              </p>
                            </div>
                          )}

                          {phase === 'run-clear' && (
                            <div className="w-full max-w-[19rem] text-center">
                              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent-cyan/15 text-accent-cyan">
                                <Trophy size={22} />
                              </span>
                              <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">
                                All sectors online
                              </p>
                              <h3 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-cream">
                                Full signal
                              </h3>
                              <p className="mt-1 text-[12px] leading-relaxed text-white/55">
                                Run complete in {formatTime(runTime)} of grid time.
                              </p>
                              <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
                                <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/35">
                                  Final score
                                </p>
                                <p className="mt-0.5 font-display text-2xl font-extrabold tabular-nums tracking-tight text-cream">
                                  {totalScore.toLocaleString()}
                                </p>
                                {newBest && (
                                  <p className="mt-1 inline-flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.12em] text-accent-yellow">
                                    <Trophy size={9} /> new personal best
                                  </p>
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={restartRun}
                                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cream px-4 py-2.5 text-xs font-bold text-ink transition-colors hover:bg-accent-yellow"
                              >
                                <RotateCcw size={13} />
                                Run again
                              </button>
                            </div>
                          )}

                          {phase === 'signal-lost' && (
                            <div className="w-full max-w-[19rem] text-center">
                              <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-accent-coral/15 text-accent-coral">
                                <XCircle size={22} />
                              </span>
                              <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">
                                Sector {String(levelIndex + 1).padStart(2, '0')} failed
                              </p>
                              <h3 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-cream">
                                Signal lost
                              </h3>
                              <p className="mt-1 text-[12px] leading-relaxed text-white/55">
                                The move budget ran out with {totalNodes - onlineCount}{' '}
                                {totalNodes - onlineCount === 1 ? 'node' : 'nodes'} still offline.
                              </p>
                              <button
                                type="button"
                                onClick={retrySector}
                                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cream px-4 py-2.5 text-xs font-bold text-ink transition-colors hover:bg-accent-yellow"
                              >
                                <RotateCcw size={13} />
                                Retry sector
                              </button>
                              <button
                                type="button"
                                onClick={restartRun}
                                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-xs font-semibold text-white/75 transition-colors hover:border-white/30 hover:text-white"
                              >
                                Restart from sector 01
                              </button>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
                    <p aria-live="polite" className="min-w-0 flex-1 text-[11px] leading-snug text-white/50">
                      {feedback}
                    </p>
                    <button
                      type="button"
                      onClick={retrySector}
                      disabled={phase !== 'playing'}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/15 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-white/55 transition-colors hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      <RotateCcw size={10} />
                      Reset
                    </button>
                  </div>
                </div>

              {/* Info strip */}
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">Mission brief</p>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-white/60">
                    A move inverts one node and its orthogonal neighbours. Plan backwards from the
                    offline clusters — order matters more than speed.
                  </p>
                  <ul className="mt-3 space-y-2">
                    <RuleRow
                      index="01"
                      icon={MousePointerClick}
                      title="Propagate"
                      body="Flip a node to toggle it and the four nodes touching it."
                    />
                    <RuleRow
                      index="02"
                      icon={Radio}
                      title="Restore"
                      body="Every node must be online before the move meter empties."
                    />
                    <RuleRow
                      index="03"
                      icon={Zap}
                      title="Optimise"
                      body="Leftover moves and a fast clear both add to your score."
                    />
                  </ul>
                </div>

                <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">Controls</p>
                    <Grid3x3 size={12} className="text-white/25" />
                  </div>
                  <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                    {['↑', '↓', '←', '→'].map((key) => (
                      <kbd
                        key={key}
                        className="grid h-6 w-6 place-items-center rounded-md border border-white/15 bg-white/[0.05] font-mono text-[10px] text-white/60"
                      >
                        {key}
                      </kbd>
                    ))}
                    <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/30">move</span>
                    <kbd className="ml-1 rounded-md border border-white/15 bg-white/[0.05] px-2 py-1 font-mono text-[9px] text-white/60">
                      Space
                    </kbd>
                    <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/30">flip</span>
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-white/45">
                    Tap works too. Focus follows the arrow keys, so the whole game is playable without a
                    mouse.
                  </p>
                  <div className="my-3 space-y-1 border-y border-white/[0.08] py-2.5">
                    {[
                      { label: 'Sector base', value: '120 / 220 / 340' },
                      { label: 'Spare moves', value: '15 pts each' },
                      { label: 'Fast clear', value: '2 pts / sec' },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/30">
                          {row.label}
                        </span>
                        <span className="font-mono text-[9px] tabular-nums text-white/55">{row.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-white/[0.08] pt-3">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-white/35">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_6px_rgba(0,166,196,0.9)]" />
                      online
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-white/35">
                      <span className="h-1.5 w-1.5 rounded-full border border-white/25" />
                      offline
                    </span>
                    <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-white/35">
                      <Trophy size={9} className="text-accent-yellow" />
                      {best > 0 ? best.toLocaleString() : '—'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">Sectors</p>
                    <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/30">
                      {phase === 'run-clear'
                        ? `${SECTORS.length}/${SECTORS.length} clear`
                        : `${levelIndex + (phase === 'sector-clear' ? 1 : 0)}/${SECTORS.length} clear`}
                    </span>
                  </div>
                  <ul className="mt-2.5 space-y-1.5">
                    {SECTORS.map((sector, index) => {
                      const cleared =
                        phase === 'run-clear' ||
                        index < levelIndex ||
                        (phase === 'sector-clear' && index === levelIndex);
                      const active =
                        index === levelIndex && (phase === 'playing' || phase === 'intro' || phase === 'signal-lost');
                      return (
                        <li
                          key={sector.id}
                          className={`flex items-center gap-2.5 rounded-lg border px-2.5 py-1.5 ${
                            active
                              ? 'border-accent-cyan/35 bg-accent-cyan/[0.07]'
                              : 'border-white/[0.07] bg-white/[0.02]'
                          }`}
                        >
                          <span
                            className={`grid h-4 w-4 shrink-0 place-items-center rounded-full font-mono text-[7px] ${
                              cleared
                                ? 'bg-accent-green/15 text-accent-green'
                                : active
                                  ? 'bg-accent-cyan/15 text-accent-cyan'
                                  : 'bg-white/[0.05] text-white/30'
                            }`}
                          >
                            {cleared ? <CheckCircle2 size={9} /> : index + 1}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span
                              className={`block truncate font-display text-[11.5px] font-semibold leading-tight tracking-tight ${
                                active || cleared ? 'text-cream' : 'text-white/45'
                              }`}
                            >
                              {sector.name}
                            </span>
                            <span className="mt-0.5 block truncate font-mono text-[7.5px] uppercase tracking-[0.08em] text-white/30">
                              {sector.size}×{sector.size} · {sector.budget} moves
                            </span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-auto flex items-center justify-between border-t border-white/[0.08] pt-2.5">
                    <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/30">Run score</span>
                    <span className="font-display text-sm font-bold tabular-nums text-cream">
                      {totalScore.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeInView>
    </Section>
  );
}
