import React from 'react';
import { Section, FadeInView } from '@/components/ui/Components';
import { siteConfig } from '@/data/portfolio';
import {
  Mail, MapPin, Github, Linkedin, ArrowUpRight, Download, FileText,
  Sparkles, Clock3,
} from 'lucide-react';

export function ContactSection() {
  return (
    <Section
      id="contact"
      label="09 — Contact"
      title={
        <>
          Have a problem worth <span className="font-serif italic font-normal text-gradient">solving?</span>
        </>
      }
      subtitle="I'm open to data engineering internships, junior roles and thoughtful open-source collaboration."
    >
      <FadeInView>
        <div className="relative overflow-hidden rounded-[2.2rem] bg-ink text-cream shadow-lift">
          <div aria-hidden="true" className="absolute inset-0 bg-dots opacity-[0.07]" />
          <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-accent-blue/25 blur-[100px]" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-accent-purple/20 blur-[100px]" />
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

          <div className="relative grid gap-10 p-6 sm:p-9 lg:grid-cols-12 lg:gap-8 lg:p-12">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-white/65">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
                </span>
                Available for opportunities
              </span>

              <h3 className="mt-6 max-w-xl font-display text-4xl font-extrabold leading-[0.96] tracking-[-0.045em] text-white sm:text-5xl">
                Let&rsquo;s build something
                <span className="text-gradient"> that lasts.</span>
              </h3>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base">
                Whether it&rsquo;s a pipeline that keeps failing, a role you think I&rsquo;d be good at, or a
                project we could build in public — my inbox is open.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group inline-flex items-center gap-2 rounded-xl bg-cream px-5 py-3.5 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:bg-accent-yellow hover:shadow-pop"
                >
                  <Mail size={16} />
                  Send me an email
                  <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a
                  href={siteConfig.cvUrl}
                  download="Elhussieny-Sabry-CV.pdf"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Download size={16} />
                  Download CV
                </a>
                <a
                  href={siteConfig.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-1 py-3 text-xs font-medium text-white/75 transition-colors hover:text-white"
                >
                  <FileText size={14} />
                  View CV
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-white/40">
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 size={12} className="text-accent-cyan" />
                  Usually replies within 24 hours
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={12} className="text-accent-orange" />
                  {siteConfig.location} · open to remote
                </span>
              </div>
            </div>

            <div className="grid content-start gap-2.5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              <a
                href={`mailto:${siteConfig.email}`}
                className="group flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition-all hover:border-white/25 hover:bg-white/[0.09]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-blue/20 text-accent-cyan">
                  <Mail size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">Email</span>
                  <span className="mt-0.5 block truncate text-sm font-medium text-white">{siteConfig.email}</span>
                </span>
                <ArrowUpRight size={15} className="shrink-0 text-white/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </a>

              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition-all hover:border-white/25 hover:bg-white/[0.09]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-purple/20 text-accent-violet">
                  <Linkedin size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">LinkedIn</span>
                  <span className="mt-0.5 block truncate text-sm font-medium text-white">in/elhussienysabry</span>
                </span>
                <ArrowUpRight size={15} className="shrink-0 text-white/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </a>

              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition-all hover:border-white/25 hover:bg-white/[0.09]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-green/20 text-accent-green">
                  <Github size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">GitHub</span>
                  <span className="mt-0.5 block truncate text-sm font-medium text-white">@elhussienysabry</span>
                </span>
                <ArrowUpRight size={15} className="shrink-0 text-white/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </a>

              <div className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-orange/20 text-accent-orange">
                  <MapPin size={18} />
                </span>
                <span>
                  <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">Location</span>
                  <span className="mt-0.5 block text-sm font-medium text-white">{siteConfig.location}</span>
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-accent-yellow/20 bg-accent-yellow/[0.07] px-4 py-3 text-[11px] text-white/60">
                <Sparkles size={14} className="shrink-0 text-accent-yellow" />
                Currently looking for a data engineering internship.
              </div>
            </div>
          </div>
        </div>
      </FadeInView>
    </Section>
  );
}
