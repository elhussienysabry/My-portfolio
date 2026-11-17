import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { siteConfig, navItems } from '@/data/portfolio';
import { useActiveSection, useScrollProgress } from '@/hooks/usePortfolio';
import {
  Menu, X, Github, Linkedin, Download, ChevronUp, ArrowUpRight,
  MapPin, FileText, ArrowRight, ArrowUp,
} from 'lucide-react';

const sectionIds = navItems.map((n) => n.href.replace('#', ''));

function Logomark({ small = false }: { small?: boolean }) {
  return (
    <span
      className={`relative grid place-items-center rounded-xl bg-ink font-display font-extrabold text-cream ${
        small ? 'h-8 w-8 text-[11px]' : 'h-9 w-9 text-xs'
      }`}
      aria-hidden="true"
    >
      ES
      <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-cream bg-accent-green" />
    </span>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const activeSection = useActiveSection(sectionIds);
  const progress = useScrollProgress();
  const closedByUser = React.useRef(false);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  React.useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    closedByUser.current = true;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[80] h-[3px] origin-left"
        style={{
          scaleX: progress,
          background: 'linear-gradient(90deg, #2f55ff, #7357ff 35%, #e8478c 65%, #ff7a2f)',
        }}
      />

      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
        initial={reduced ? false : { y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl border px-3 backdrop-blur-xl transition-all duration-300 sm:px-4 ${
            scrolled
              ? 'border-line/90 bg-cream/90 shadow-soft'
              : 'border-line/60 bg-cream/65'
          }`}
        >
          <button
            onClick={() => handleNavClick('#hero')}
            className="flex items-center gap-2.5 rounded-xl py-1 pr-2 text-left"
          >
            <Logomark />
            <span className="block">
              <span className="block font-display text-sm font-bold leading-none text-ink">Elhussieny</span>
              <span className="mt-1 block text-[9px] font-mono uppercase tracking-[0.18em] text-muted">
                Data Engineer
              </span>
            </span>
            <span className="sr-only">Back to top</span>
          </button>

          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors ${
                    isActive ? 'text-accent-blue' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-lg bg-accent-blue/[0.08]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-9 w-9 place-items-center rounded-lg text-ink-soft transition-colors hover:bg-ink/[0.05] hover:text-ink sm:grid"
              aria-label="GitHub profile"
            >
              <Github size={17} />
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-9 w-9 place-items-center rounded-lg text-ink-soft transition-colors hover:bg-ink/[0.05] hover:text-ink sm:grid"
              aria-label="LinkedIn profile"
            >
              <Linkedin size={17} />
            </a>
            <a
              href={siteConfig.cvUrl}
              download="Elhussieny-Sabry-CV.pdf"
              className="hidden items-center gap-2 rounded-xl bg-ink px-3.5 py-2.5 text-xs font-semibold text-cream transition-all hover:-translate-y-0.5 hover:bg-accent-blue hover:shadow-pop md:inline-flex"
            >
              <Download size={14} />
              Resume
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-cream text-ink transition-colors hover:border-line-strong xl:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              <Menu size={19} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[70] xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            id="mobile-navigation"
          >
            <div className="absolute inset-0 bg-ink/45 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col overflow-y-auto bg-paper px-6 pb-8 pt-5 shadow-2xl"
              initial={reduced ? false : { x: '100%' }}
              animate={{ x: 0 }}
              exit={reduced ? undefined : { x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 260 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Logomark />
                  <span className="font-display text-sm font-bold">Elhussieny Sabry</span>
                </div>
                <button
                  ref={closeRef}
                  onClick={() => setMobileOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-cream text-ink"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-8 flex items-center gap-2 rounded-2xl border border-accent-green/25 bg-accent-green/[0.07] px-4 py-3 text-xs text-ink-soft">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
                </span>
                Open to data engineering roles & collaborations
              </div>

              <nav className="mt-7 flex flex-col" aria-label="Mobile navigation">
                {navItems.map((item, i) => {
                  const isActive = activeSection === item.href.replace('#', '');
                  return (
                    <motion.button
                      key={item.href}
                      initial={reduced ? false : { opacity: 0, x: 22 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.35 }}
                      onClick={() => handleNavClick(item.href)}
                      className={`group flex items-center justify-between border-b border-line/70 py-3.5 text-left ${
                        isActive ? 'text-accent-blue' : 'text-ink'
                      }`}
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="font-mono text-[10px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                        <span className="font-display text-[1.6rem] font-semibold tracking-tight">{item.label}</span>
                      </span>
                      <ArrowUpRight
                        size={18}
                        className="text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-blue"
                      />
                    </motion.button>
                  );
                })}
              </nav>

              <div className="mt-auto pt-8">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={siteConfig.cvUrl}
                    download="Elhussieny-Sabry-CV.pdf"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-cream"
                  >
                    <Download size={15} />
                    Download CV
                  </a>
                  <a
                    href={siteConfig.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-cream px-4 py-3 text-sm font-semibold text-ink"
                  >
                    <FileText size={15} />
                    View CV
                  </a>
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-line bg-cream px-3 py-2 text-xs font-medium text-ink-soft"
                  >
                    <Github size={15} /> GitHub
                  </a>
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-line bg-cream px-3 py-2 text-xs font-medium text-ink-soft"
                  >
                    <Linkedin size={15} /> LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const reduced = useReducedMotion();

  const footerNav = [
    { label: 'About', href: '#about', index: '01' },
    { label: 'Projects', href: '#projects', index: '02' },
    { label: 'Learning Path', href: '#journey', index: '03' },
    { label: 'Contact', href: '#contact', index: '04' },
  ];

  const connectLinks = [
    {
      label: 'GitHub',
      value: '@elhussienysabry',
      href: siteConfig.social.github,
      external: true,
    },
    {
      label: 'LinkedIn',
      value: 'in/elhussienysabry',
      href: siteConfig.social.linkedin,
      external: true,
    },
    {
      label: 'Email',
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      external: false,
    },
    {
      label: 'Resume (PDF)',
      value: 'View CV',
      href: siteConfig.cvUrl,
      download: 'Elhussieny-Sabry-CV.pdf',
      external: true,
    },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <footer className="relative bg-ink text-cream border-t border-white/10 overflow-hidden">
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Primary Area: Masthead & Monumental Wordmark */}
        <div className="border-b border-white/10 pb-8 pt-16 sm:pb-10 sm:pt-20 lg:pt-24">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 sm:mb-8">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                00 / Index
              </span>
              <span className="h-px w-5 bg-white/15" aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/30">
                Personal Portfolio
              </span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white/60">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-green" />
              </span>
              Available for opportunities
            </div>
          </div>

          <div className="overflow-hidden">
            <motion.h2
              initial={reduced ? false : { y: '20%', opacity: 0 }}
              whileInView={reduced ? undefined : { y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(2.25rem,11.8vw,9.5rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.035em] text-cream select-none transition-colors duration-300 hover:text-white"
            >
              ELHUSSIENY
            </motion.h2>
          </div>
        </div>

        {/* Content Hierarchy: Profile Statement, Navigation, and Connect */}
        <div className="grid grid-cols-1 gap-12 py-12 sm:py-16 lg:grid-cols-12 lg:gap-14 border-b border-white/10">
          {/* Profile & Focus */}
          <div className="space-y-4 lg:col-span-6 lg:pr-6">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" aria-hidden="true" />
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                Profile &amp; Focus
              </p>
            </div>

            <p className="font-display text-lg sm:text-xl font-bold leading-snug tracking-tight text-cream">
              Data Engineer focused on building dependable data pipelines, studying database internals, and solving systems problems from ingestion to insight.
            </p>

            <p className="text-sm text-white/60 leading-relaxed max-w-lg">
              Studying Business Information Systems at Menoufia University. Dedicated to storage engine mechanics, distributed compute with Spark, robust orchestration with Airflow, and active open-source contribution.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/45 font-mono">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={12} className="text-accent-orange shrink-0" />
                {siteConfig.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-accent-green" />
                UTC+2 · Open to remote &amp; relocation
              </span>
            </div>
          </div>

          {/* Navigation & Connect 2-Column Split */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-6 lg:gap-10">
            {/* Navigation Area */}
            <div className="space-y-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                Navigation
              </p>
              <ul className="space-y-1">
                {footerNav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="group flex items-center justify-between py-2 text-sm text-white/70 transition-colors hover:text-cream border-b border-white/[0.05]"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="font-mono text-[10px] text-white/30 group-hover:text-accent-cyan transition-colors">
                          {item.index}
                        </span>
                        <span className="font-medium group-hover:translate-x-0.5 transition-transform duration-200">
                          {item.label}
                        </span>
                      </span>
                      <ArrowRight size={13} className="text-white/20 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent-cyan" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect Area */}
            <div className="space-y-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                Connect
              </p>
              <ul className="space-y-1">
                {connectLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      download={item.download}
                      className="group flex items-center justify-between py-2 text-sm text-white/70 transition-colors hover:text-cream border-b border-white/[0.05]"
                    >
                      <span className="font-medium group-hover:translate-x-0.5 transition-transform duration-200">
                        {item.label}
                      </span>
                      <span className="flex items-center gap-1.5 font-mono text-[11px] text-white/35 transition-colors group-hover:text-accent-cyan">
                        <span className="hidden sm:inline text-[10px] text-white/30 group-hover:text-white/60 transition-colors">
                          {item.value}
                        </span>
                        <ArrowUpRight
                          size={13}
                          className="shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Motif, and Back to Top */}
        <div className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between text-xs text-white/45">
          <div className="flex items-center gap-2">
            <span>© {year} {siteConfig.name}. All rights reserved.</span>
          </div>

          <div className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-white/30 lg:block">
            Source → Ingestion → Processing → Storage → Analytics
          </div>

          <div>
            <button
              type="button"
              onClick={scrollTop}
              className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-white/50 transition-colors hover:text-cream"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp size={12} className="transition-transform duration-200 group-hover:-translate-y-1 text-accent-cyan" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function ScrollToTop() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const handler = () => setVisible(window.scrollY > 640);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.75, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.75, y: 12 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-5 right-5 z-40 hidden h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-accent-blue to-accent-purple text-white shadow-lg shadow-accent-purple/25 transition-transform hover:-translate-y-0.5 sm:bottom-7 sm:right-7 sm:grid"
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
