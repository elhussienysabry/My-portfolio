import React from 'react';
import { Section, FadeInView, Badge } from '@/components/ui/Components';
import { contributions } from '@/data/portfolio';
import {
  GitPullRequest, ExternalLink, GitFork, AlertCircle, ArrowUpRight,
  Code2, Sparkles,
} from 'lucide-react';

const statusConfig = {
  merged: { label: 'Merged', color: '#7357ff', bg: 'rgba(115,87,255,0.08)', border: 'rgba(115,87,255,0.28)' },
  open: { label: 'Open', color: '#0b9e73', bg: 'rgba(11,158,115,0.08)', border: 'rgba(11,158,115,0.28)' },
  closed: { label: 'Closed', color: '#f25555', bg: 'rgba(242,85,85,0.08)', border: 'rgba(242,85,85,0.28)' },
  unverified: { label: 'Unverified', color: '#73737f', bg: 'rgba(115,115,127,0.08)', border: 'rgba(115,115,127,0.25)' },
};

export function OpenSourceSection() {
  return (
    <Section
      id="open-source"
      label="06 — Open source"
      title={
        <>
          Contributing in <span className="font-serif italic font-normal text-gradient">public.</span>
        </>
      }
      subtitle="Small, careful patches to the tools I rely on — and a window into how production-grade codebases are maintained."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {contributions.map((contrib, i) => {
          const status = statusConfig[contrib.status];
          return (
            <FadeInView key={contrib.id} delay={i * 0.08} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-cream p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-7">
                <div aria-hidden="true" className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-accent-purple/[0.08] blur-2xl" />
                <div className="relative flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-accent-purple/25 bg-accent-purple/[0.08] text-accent-purple">
                    <GitPullRequest size={20} />
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-mono font-medium uppercase tracking-[0.14em]"
                    style={{ backgroundColor: status.bg, color: status.color, border: `1px solid ${status.border}` }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: status.color }} />
                    {status.label}
                  </span>
                </div>

                <div className="relative mt-5 flex items-baseline gap-2">
                  <span className="font-mono text-sm font-medium text-accent-blue">{contrib.repository}</span>
                  {contrib.prNumber && (
                    <span className="font-mono text-[10px] text-muted">#{contrib.prNumber}</span>
                  )}
                </div>
                <h3 className="relative mt-1.5 font-display text-xl font-bold leading-snug tracking-tight text-ink">
                  {contrib.prTitle}
                </h3>
                <p className="relative mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{contrib.description}</p>

                <div className="relative mt-4 flex flex-wrap items-center gap-2">
                  <Badge color="#7357ff">{contrib.contributionType}</Badge>
                  {contrib.date && (
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted">{contrib.date}</span>
                  )}
                </div>

                {contrib.status === 'unverified' && (
                  <div className="relative mt-4 flex items-start gap-2 rounded-xl border border-line bg-paper px-3 py-2.5 text-[11px] leading-relaxed text-muted">
                    <AlertCircle size={13} className="mt-0.5 shrink-0" />
                    <span>Details could not be independently verified at build time. Check the linked PR for current status.</span>
                  </div>
                )}

                {contrib.url && (
                  <a
                    href={contrib.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative mt-5 inline-flex items-center gap-1.5 border-t border-line pt-4 text-xs font-semibold text-ink-soft transition-colors hover:text-accent-blue"
                  >
                    View pull request
                    <ExternalLink size={12} />
                  </a>
                )}
              </article>
            </FadeInView>
          );
        })}
      </div>

      <FadeInView delay={0.18}>
        <div className="relative mt-4 overflow-hidden rounded-[1.75rem] bg-ink px-6 py-7 text-cream sm:px-8">
          <div aria-hidden="true" className="absolute inset-0 bg-dots opacity-[0.07]" />
          <div aria-hidden="true" className="absolute -right-10 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-accent-cyan/20 blur-[60px]" />
          <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.07] text-accent-yellow">
                <GitFork size={18} />
              </span>
              <div>
                <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
                  <Code2 size={11} />
                  On GitHub
                </p>
                <p className="mt-1 font-display text-lg font-bold leading-snug text-white">
                  More experiments, notes and works in progress.
                </p>
              </div>
            </div>
            <a
              href="https://github.com/elhussienysabry"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-cream px-4 py-2.5 text-xs font-semibold text-ink transition-all hover:-translate-y-0.5 hover:bg-accent-yellow"
            >
              <GitFork size={14} />
              Browse repositories
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </FadeInView>

      <FadeInView delay={0.22}>
        <p className="mt-5 flex items-center gap-1.5 text-xs text-muted">
          <Sparkles size={12} className="text-accent-purple" />
          Every PR is a chance to learn from people who maintain systems at scale.
        </p>
      </FadeInView>
    </Section>
  );
}
