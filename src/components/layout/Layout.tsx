import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { siteConfig, navItems } from '@/data/portfolio';
import { useActiveSection, useScrollProgress } from '@/hooks/usePortfolio';
import {
  Menu, X, Github, Linkedin, Download, ChevronUp, ArrowUpRight,
  Mail, MapPin, FileText, Sparkles, ArrowRight,
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

  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-accent-blue/25 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-accent-purple/20 blur-[110px]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-dots opacity-[0.07]" />
      <div className="h-1 w-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-orange" />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-white/70">
              <Sparkles size={12} className="text-accent-yellow" />
              Next chapter
            </span>
            <h2 className="mt-5 max-w-xl text-4xl font-extrabold leading-[0.98] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Let&rsquo;s make your data
              <span className="text-gradient"> move.</span>
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base">
              I&rsquo;m looking for a data engineering internship or junior role where I can build reliable
              pipelines, learn from production systems, and ship work that matters.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="group inline-flex items-center gap-2 rounded-xl bg-cream px-5 py-3 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:bg-accent-yellow"
              >
                <Mail size={16} />
                Start a conversation
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={siteConfig.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <FileText size={16} />
                View CV
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Explore</p>
              <ul className="mt-4 space-y-2.5">
                {navItems.slice(0, 5).map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-sm text-white/65 transition-colors hover:text-white">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">More</p>
              <ul className="mt-4 space-y-2.5">
                {navItems.slice(5).map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-sm text-white/65 transition-colors hover:text-white">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Elsewhere</p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-white"
                  >
                    <Github size={14} /> GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-white"
                  >
                    <Linkedin size={14} /> LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-white"
                  >
                    <Mail size={14} /> Email
                  </a>
                </li>
                <li className="inline-flex items-center gap-2 text-sm text-white/50">
                  <MapPin size={14} /> {siteConfig.location}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {siteConfig.name}. Built with care, React & Tailwind CSS.</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em]">
            Source → Ingestion → Processing → Storage → Analytics
          </p>
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
