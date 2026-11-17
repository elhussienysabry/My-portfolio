import React from 'react';
import { Section, FadeInView } from '@/components/ui/Components';
import { siteConfig } from '@/data/portfolio';
import {
  MapPin, GraduationCap, Code2, BookOpen, GitFork, ArrowUpRight,
  Database, Sparkles, Rocket,
} from 'lucide-react';

const stats = [
  { value: '03', label: 'Year of study', note: 'BIS · Menoufia University', color: '#2f55ff', tint: 'bg-accent-blue/[0.07]' },
  { value: '05', label: 'End-to-end projects', note: 'from source to insight', color: '#e8478c', tint: 'bg-accent-pink/[0.07]' },
  { value: '02', label: 'Open-source PRs', note: 'Airflow & pandas', color: '#0b9e73', tint: 'bg-accent-green/[0.08]' },
  { value: '11', label: 'Pipeline steps', note: 'in RetailFlow ELT', color: '#7357ff', tint: 'bg-accent-purple/[0.07]' },
];

export function AboutSection() {
  return (
    <Section
      id="about"
      label="01 — About"
      title={
        <>
          A builder&rsquo;s mind, <span className="font-serif italic font-normal text-gradient">not a tool list.</span>
        </>
      }
      subtitle="I care about how data systems behave when things go wrong — because that is where good engineering shows up."
    >
      <div className="grid gap-4 lg:grid-cols-12">
        <FadeInView className="lg:col-span-7">
          <div className="relative h-full overflow-hidden rounded-[2rem] border border-line bg-cream p-7 shadow-soft sm:p-9">
            <div aria-hidden="true" className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-accent-blue/[0.06]" />
            <div className="relative space-y-5 text-[15px] leading-relaxed text-ink-soft sm:text-base">
              <p className="text-lg leading-relaxed text-ink sm:text-xl">
                I&rsquo;m a data engineer focused on building reliable pipelines and understanding the
                systems behind them — <span className="marker-yellow font-medium text-ink">from storage engines to schedulers.</span>
              </p>
              <p>
                My path started in Business Information Systems, which gave me a useful bridge between
                business thinking and technical implementation. What keeps me here is the depth: I don&rsquo;t
                just use a database, I study how B-Tree indexes, write-ahead logs and concurrency control
                make it dependable.
              </p>
              <p>
                I build end-to-end projects with schema validation, idempotent loading and data quality
                gates — not because a tutorial said so, but because I have seen how quietly pipelines break
                without them. I also contribute to the tools I use, including Apache Airflow and pandas,
                because reading production code is the fastest way to level up.
              </p>
            </div>
            <div className="relative mt-7 flex flex-wrap items-center gap-3 border-t border-line pt-5">
              <span className="inline-flex items-center gap-2 rounded-lg bg-ink px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-cream">
                <Sparkles size={12} className="text-accent-yellow" />
                Learning in public
              </span>
              <span className="text-xs text-muted">Python · SQL · Airflow · Spark</span>
            </div>
          </div>
        </FadeInView>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-5">
          {stats.map((stat, i) => (
            <FadeInView key={stat.label} delay={i * 0.06}>
              <div className={`group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${stat.tint}`}>
                <div
                  aria-hidden="true"
                  className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-20 blur-xl transition-opacity group-hover:opacity-40"
                  style={{ backgroundColor: stat.color }}
                />
                <div className="font-display text-4xl font-extrabold leading-none tracking-[-0.05em]" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <p className="mt-3 text-sm font-semibold leading-tight text-ink">{stat.label}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">{stat.note}</p>
                <div className="mt-auto flex items-end gap-1 pt-6" aria-hidden="true">
                  {[12, 20, 9, 26, 16, 22, 13].map((height, barIndex) => (
                    <span
                      key={barIndex}
                      className="w-1.5 rounded-full"
                      style={{
                        height: `${height}px`,
                        backgroundColor: stat.color,
                        opacity: 0.16 + barIndex * 0.09,
                      }}
                    />
                  ))}
                </div>
              </div>
            </FadeInView>
          ))}
        </div>

        <FadeInView delay={0.1} className="lg:col-span-7">
          <div className="relative h-full overflow-hidden rounded-[2rem] bg-ink p-7 text-cream shadow-lift sm:p-8">
            <div aria-hidden="true" className="absolute inset-0 bg-dots opacity-[0.08]" />
            <div aria-hidden="true" className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-accent-purple/25 blur-[70px]" />
            <div className="relative">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                <BookOpen size={13} className="text-accent-yellow" />
                Currently exploring
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                What makes data infrastructure <span className="text-gradient">trustworthy?</span>
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60">
                Storage engines, isolation levels, write-ahead logging, distributed consensus and the
                unglamorous details that decide whether a pipeline survives production.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['B-Tree & LSM trees', 'WAL & MVCC', 'Raft / Paxos', 'Schema evolution', 'Shuffle tuning', 'Data contracts'].map((topic) => (
                  <span key={topic} className="rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[11px] text-white/70">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeInView>

        <FadeInView delay={0.16} className="lg:col-span-5">
          <div className="h-full rounded-[2rem] border border-line bg-cream p-7 shadow-soft sm:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Quick facts</p>
            <div className="mt-5 space-y-4">
              {[
                { Icon: MapPin, label: 'Based in', value: siteConfig.location, color: '#ff7a2f' },
                { Icon: GraduationCap, label: 'Studying', value: 'BIS · Menoufia University', color: '#7357ff' },
                { Icon: Code2, label: 'Core stack', value: 'Python, SQL, Spark, dbt, Docker', color: '#2f55ff' },
                { Icon: GitFork, label: 'Open source', value: 'Apache Airflow & pandas', color: '#0b9e73' },
                { Icon: Database, label: 'Deep interest', value: 'Database internals', color: '#00a6c4' },
              ].map(({ Icon, label, value, color }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg" style={{ backgroundColor: `${color}12`, color }}>
                    <Icon size={15} />
                  </span>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-muted">{label}</p>
                    <p className="mt-0.5 text-sm font-medium leading-snug text-ink">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Roadmap teaser */}
            <div className="mt-6 rounded-xl border border-accent-cyan/20 bg-accent-cyan/[0.05] px-4 py-3">
              <div className="flex items-center gap-2">
                <Rocket size={14} className="text-accent-cyan" />
                <span className="text-[11px] font-semibold text-ink">Next on the roadmap</span>
              </div>
              <p className="mt-1 text-[11px] text-muted">Apache Kafka · Cloud Storage</p>
            </div>
            <a
              href="#contact"
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-blue transition-colors hover:text-accent-purple"
            >
              Let&rsquo;s work together
              <ArrowUpRight size={13} />
            </a>
          </div>
        </FadeInView>
      </div>
    </Section>
  );
}
