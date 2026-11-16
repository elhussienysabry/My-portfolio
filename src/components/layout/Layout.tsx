import React from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { siteConfig, navItems } from '@/data/portfolio';
import { useActiveSection, useScrollProgress } from '@/hooks/usePortfolio';
import {
  Menu, X, Github, Linkedin, Download, ChevronUp,
} from 'lucide-react';

const sectionIds = navItems.map((n) => n.href.replace('#', ''));

export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const activeSection = useActiveSection(sectionIds);
  const progress = useScrollProgress();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{
          scaleX: progress,
          background: 'linear-gradient(90deg, #38bdf8, #818cf8, #a78bfa)',
        }}
      />

      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-navy-950/80 backdrop-blur-xl border-b border-border/50'
            : 'bg-transparent'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('#hero')}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
                ES
              </div>
              <span className="text-text-primary font-semibold hidden sm:block">
                {siteConfig.name.split(' ')[0]}
              </span>
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'text-accent-blue'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-accent-blue/10 rounded-lg"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={siteConfig.cvUrl}
                download
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-accent-blue/10 text-accent-blue rounded-lg hover:bg-accent-blue/20 transition-colors border border-accent-blue/20"
              >
                <Download size={14} />
                CV
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-text-primary"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-navy-950/90 backdrop-blur-md"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-72 bg-navy-900 border-l border-border p-6 pt-20"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.replace('#', '');
                  return (
                    <button
                      key={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-accent-blue/10 text-accent-blue'
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
              <div className="mt-8 pt-6 border-t border-border flex items-center gap-4">
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <Github size={20} />
                </a>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={siteConfig.cvUrl}
                  download
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-accent-blue/10 text-accent-blue rounded-lg border border-accent-blue/20"
                >
                  <Download size={14} />
                  Download CV
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white font-bold text-sm">
              ES
            </div>
            <div>
              <p className="text-text-primary font-medium">{siteConfig.name}</p>
              <p className="text-text-muted text-sm">{siteConfig.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-text-secondary text-sm">
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors flex items-center gap-2"
            >
              <Github size={16} />
              GitHub
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors flex items-center gap-2"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
          </div>

          <p className="text-text-muted text-sm">
            Built with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

export function ScrollToTop() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-40 w-11 h-11 rounded-xl bg-surface border border-border hover:border-accent-blue/50 text-text-secondary hover:text-accent-blue transition-all flex items-center justify-center shadow-lg"
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
