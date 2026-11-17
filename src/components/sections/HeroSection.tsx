import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { siteConfig } from '@/data/portfolio';
import {
  Github, Linkedin, Download, ArrowDown, Database, Server, HardDrive,
  BarChart3, Cpu, ArrowDownToLine, ExternalLink, FileText, MapPin,
  CheckCircle2, GitPullRequest, Sparkles,
} from 'lucide-react';

const stages = [
  { label: 'Source', Icon: Database, color: '#2f55ff', note: 'APIs, transactional databases & streaming feeds' },
  { label: 'Ingestion', Icon: ArrowDownToLine, color: '#00a6c4', note: 'Schema drift detection & idempotent loading' },
  { label: 'Processing', Icon: Cpu, color: '#7357ff', note: 'Spark distributed DAG transformations & dbt models' },
  { label: 'Storage', Icon: HardDrive, color: '#0b9e73', note: 'Curated Parquet lakehouse & partitioned marts' },
  { label: 'Analytics', Icon: BarChart3, color: '#ff7a2f', note: 'KPI reporting, SQL queries & real-time dashboards' },
];

const marqueeItems = [
  'Python', 'SQL', 'Apache Airflow', 'Apache Spark', 'dbt',
  'PostgreSQL', 'DuckDB', 'Docker', 'Parquet', 'pytest',
  'Apache Kafka', 'Cloud Storage',
];

function PipelinePreview() {
  const reduced = useReducedMotion();
  const [selectedStage, setSelectedStage] = React.useState<number | null>(null);

  return (
    <div className="relative mx-auto w-full max-w-[30rem] lg:max-w-none">
      <div
        aria-hidden="true"
        className="absolute -inset-5 rounded-[2.5rem] bg-[conic-gradient(from_130deg,#2f55ff33,#7357ff2b,#e8478c24,#ff7a2f2b,#0b9e7326,#2f55ff33)] blur-2xl"
      />

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 30, rotate: 1.5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-[2rem] border border-line bg-cream p-4 shadow-lift sm:p-5"
      >
        <div className="flex items-center justify-between border-b border-line pb-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-accent-coral" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-yellow" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-green" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">pipeline.architecture</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-green/10 px-2 py-1 text-[9px] font-mono font-medium uppercase tracking-wider text-green-ink">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-green" />
            live data flow
          </span>
        </div>

        <div className="relative px-1 pb-1 pt-6">
          <div className="absolute left-[8%] right-[8%] top-[2.45rem] h-px bg-gradient-to-r from-accent-blue via-accent-purple to-accent-orange opacity-30" />
          {!reduced && (
            <motion.span
              aria-hidden="true"
              className="absolute top-[2.28rem] z-10 h-2 w-2 rounded-full bg-accent-blue shadow-[0_0_12px_rgba(47,85,255,0.8)]"
              animate={{ left: ['7%', '91%'] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'linear' }}
            />
          )}
          <div className="grid grid-cols-5 gap-1">
            {stages.map(({ label, Icon, color }, i) => {
              const isSelected = selectedStage === i;
              return (
                <motion.button
                  key={label}
                  type="button"
                  onClick={() => setSelectedStage(isSelected ? null : i)}
                  onMouseEnter={() => setSelectedStage(i)}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 + i * 0.09 }}
                  className="flex flex-col items-center gap-2 text-center group cursor-pointer"
                >
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-xl border bg-cream shadow-sm transition-transform group-hover:scale-105 sm:h-11 sm:w-11 ${
                      isSelected ? 'ring-2 ring-offset-2 ring-accent-blue' : ''
                    }`}
                    style={{ borderColor: `${color}45`, color }}
                  >
                    <Icon size={17} strokeWidth={2.1} />
                  </span>
                  <span className="text-[10px] font-mono font-medium text-ink-soft sm:text-[10.5px]">{label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Dynamic Stage Note */}
          <div className="mt-3 min-h-[1.75rem] rounded-lg bg-paper px-3 py-1.5 text-center">
            <p className="font-mono text-[10px] text-muted">
              {selectedStage !== null ? (
                <span>
                  <strong className="text-ink">{stages[selectedStage].label}: </strong>
                  {stages[selectedStage].note}
                </span>
              ) : (
                'Hover or tap any stage to inspect the engineering pattern'
              )}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { value: '11', label: 'pipeline steps' },
            { value: '150+', label: 'pytest tests' },
            { value: '40+', label: 'dbt tests' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-line bg-paper/70 px-2 py-2.5 text-center">
              <div className="font-display text-lg font-extrabold leading-none tracking-tight text-ink">{stat.value}</div>
              <div className="mt-1 text-[9px] font-mono uppercase tracking-wider text-muted">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-xl bg-ink px-3 py-2.5 font-mono text-[10px] text-white/70">
          <CheckCircle2 size={13} className="shrink-0 text-accent-green" />
          <span className="truncate">
            <span className="text-accent-cyan">status</span>: &quot;all checks passed — automated circuit breakers active&quot;
          </span>
          <span className="ml-auto hidden text-white/35 sm:inline">0.4s</span>
        </div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial={reduced ? false : { opacity: 0, scale: 0.85, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: -4 }}
        transition={{ delay: 0.9, type: 'spring', stiffness: 170, damping: 16 }}
        className="absolute -bottom-20 left-2 hidden w-40 rounded-2xl border-2 border-ink bg-accent-yellow p-3 shadow-[4px_4px_0_rgba(21,22,31,0.9)] sm:block lg:-left-4"
      >
        <p className="font-mono text-[9px] uppercase tracking-wider text-ink/60">Currently reading</p>
        <p className="mt-1 text-xs font-bold leading-snug text-ink">Designing Data-Intensive Applications</p>
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial={reduced ? false : { opacity: 0, scale: 0.85, rotate: 4 }}
        animate={{ opacity: 1, scale: 1, rotate: 3 }}
        transition={{ delay: 1.05, type: 'spring', stiffness: 170, damping: 16 }}
        className="absolute -bottom-6 -right-2 hidden items-center gap-2 rounded-xl border border-line bg-cream px-3 py-2.5 shadow-lift sm:flex lg:-right-6"
      >
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-purple/10 text-accent-purple">
          <GitPullRequest size={16} />
        </span>
        <span>
          <span className="block text-[10px] font-bold text-ink">Apache Airflow + pandas</span>
          <span className="block font-mono text-[9px] uppercase tracking-wider text-muted">2 open PRs</span>
        </span>
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial={reduced ? false : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.15, type: 'spring', stiffness: 170, damping: 16 }}
        className="absolute -right-3 -top-5 hidden items-center gap-2 rounded-full border border-accent-green/30 bg-cream px-3 py-2 text-[10px] font-semibold text-ink shadow-soft md:flex"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
        </span>
        Open to work
      </motion.div>
    </div>
  );
}

function TechMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-line bg-cream/70 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper to-transparent" />
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {[0, 1].map((group) => (
          <div key={group} className="flex shrink-0 items-center" aria-hidden={group === 1}>
            {marqueeItems.map((item, i) => (
              <span key={`${group}-${item}`} className="flex items-center">
                <span className="px-5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
                  {item}
                </span>
                <Sparkles
                  size={11}
                  className="shrink-0"
                  style={{ color: ['#2f55ff', '#00a6c4', '#7357ff', '#0b9e73', '#ff7a2f', '#e8478c'][i % 6] }}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {
  const reduced = useReducedMotion();

  return (
    <section id="hero" className="relative overflow-hidden pt-28 sm:pt-32">
      <div aria-hidden="true" className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_75%_60%_at_50%_20%,black,transparent)]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-[26rem] w-[26rem] animate-blob rounded-full bg-accent-blue/[0.13] blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-40 h-[24rem] w-[24rem] animate-blob rounded-full bg-accent-purple/[0.12] blur-[100px] [animation-delay:4s]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-1/3 h-72 w-72 animate-blob rounded-full bg-accent-orange/[0.09] blur-[90px] [animation-delay:8s]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-12 pb-14 pt-6 lg:grid-cols-12 lg:gap-10 lg:pb-20 lg:pt-10">
          <div className="lg:col-span-7">
            <motion.div
              initial={reduced ? false : { y: 18 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-cream/80 px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-[0.16em] text-ink-soft shadow-soft">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
                </span>
                Available for internships
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                {siteConfig.name}
              </span>
            </motion.div>

            <motion.h1
              initial={reduced ? false : { y: 26 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-[clamp(3rem,7.5vw,6.3rem)] font-extrabold leading-[0.88] tracking-[-0.055em] text-ink"
            >
              Data systems
              <br />
              that{' '}
              <span className="relative inline-block">
                <span className="text-gradient">hold up.</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 280 18"
                  className="absolute -bottom-2 left-0 h-3 w-full text-accent-yellow sm:-bottom-3"
                  preserveAspectRatio="none"
                >
                  <path d="M4 12C58 4 120 3 176 7c28 2 63 4 100 1" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={reduced ? false : { y: 22 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-7 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg"
            >
              I&rsquo;m a data engineer who cares about what happens beneath the query. I build pipelines
              with schema checks, idempotent loads and quality gates — and study the database internals
              that make them trustworthy.
            </motion.p>

            <motion.div
              initial={reduced ? false : { y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3.5 text-sm font-semibold text-cream transition-all hover:-translate-y-0.5 hover:bg-accent-blue hover:shadow-pop"
              >
                Explore my work
                <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
              </a>
              <a
                href={siteConfig.cvUrl}
                download="Elhussieny-Sabry-CV.pdf"
                className="inline-flex items-center gap-2 rounded-xl border border-line-strong bg-cream px-5 py-3.5 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-ink hover:shadow-soft"
              >
                <Download size={16} />
                Download CV
              </a>
              <a
                href={siteConfig.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-1 py-3 text-sm font-medium text-ink-soft transition-colors hover:text-accent-blue"
              >
                <FileText size={15} />
                View CV
                <ExternalLink size={12} />
              </a>
            </motion.div>

            <motion.div
              initial={reduced ? false : { opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} className="text-accent-orange" />
                {siteConfig.location}
              </span>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-ink"
              >
                <Github size={14} />
                GitHub
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-ink"
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
              <span className="inline-flex items-center gap-1.5">
                <Server size={14} className="text-accent-cyan" />
                Open to junior & internship roles
              </span>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <PipelinePreview />
          </div>
        </div>
      </div>

      <TechMarquee />

      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
          Scroll to explore
        </span>
        <motion.a
          href="#about"
          aria-label="Scroll to about section"
          animate={reduced ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="grid h-9 w-9 place-items-center rounded-full border border-line bg-cream text-ink-soft transition-colors hover:text-accent-blue"
        >
          <ArrowDown size={16} />
        </motion.a>
      </div>
    </section>
  );
}
