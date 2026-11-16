import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Section, FadeInView } from '@/components/ui/Components';
import { certifications } from '@/data/portfolio';
import {
  Award, CheckCircle2, Maximize2, Shield, X, Calendar, ArrowUpRight, Sparkles,
} from 'lucide-react';

function CertificateLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[65] flex items-center justify-center bg-ink/75 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <motion.div
        className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-navy-900 p-2 shadow-2xl"
        initial={reduced ? false : { scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={reduced ? undefined : { scale: 0.92, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-ink/80 text-white/80 transition-colors hover:text-white"
          aria-label="Close certificate preview"
        >
          <X size={18} />
        </button>
        <img src={src} alt={alt} className="max-h-[82vh] w-full rounded-xl object-contain" />
      </motion.div>
    </motion.div>
  );
}

export function CertificationsSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedAlt, setSelectedAlt] = useState('Certificate full view');

  const nasa = certifications.find((item) => item.imageUrl);
  const others = certifications.filter((item) => !item.imageUrl);

  const openImage = (src: string, alt: string) => {
    setSelectedImage(src);
    setSelectedAlt(alt);
  };

  return (
    <Section
      id="certifications"
      label="05 — Credentials"
      title={
        <>
          Proof, <span className="font-serif italic font-normal text-gradient-cool">not promises.</span>
        </>
      }
      subtitle="Certifications and milestones that back up the work — with the documents to check."
    >
      <div className="grid gap-4 lg:grid-cols-12">
        {nasa && (
          <FadeInView className="lg:col-span-7">
            <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-accent-cyan/25 bg-gradient-to-br from-accent-cyan/[0.08] via-cream to-accent-blue/[0.06] p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-8">
              <div aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent-cyan/15 blur-3xl" />
              <div className="relative flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-cream">
                  <Award size={11} className="text-accent-yellow" />
                  Awards & achievements
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium uppercase tracking-wider text-green-ink">
                  <CheckCircle2 size={12} />
                  Verified
                </span>
              </div>

              <h3 className="relative mt-5 font-display text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">
                {nasa.title}
              </h3>
              <p className="relative mt-1 text-sm font-medium text-muted">{nasa.issuer}</p>
              <p className="relative mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">{nasa.description}</p>

              <div className="relative mt-5 flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-cream/80 px-2.5 py-1.5 text-[11px] text-ink-soft">
                  <Calendar size={12} className="text-accent-cyan" />
                  {nasa.date}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-accent-blue">
                  <Sparkles size={12} />
                  Galactic Problem Solver
                </span>
              </div>

              {nasa.imageUrl && (
                <button
                  onClick={() => openImage(nasa.imageUrl!, `${nasa.title} certificate`)}
                  className="relative mt-6 overflow-hidden rounded-2xl border border-line bg-cream text-left"
                >
                  <img
                    src={nasa.imageUrl}
                    alt={`${nasa.title} certificate`}
                    className="h-44 w-full object-cover object-[center_32%] transition-transform duration-500 group-hover:scale-[1.02] sm:h-52"
                    loading="lazy"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/70 to-transparent px-4 pb-3 pt-10 text-[11px] font-medium text-white">
                    View certificate
                    <Maximize2 size={14} />
                  </span>
                </button>
              )}
            </article>
          </FadeInView>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
          {others.slice(0, 2).map((item, i) => (
            <FadeInView key={item.id} delay={0.08 + i * 0.06}>
              <article className="flex h-full items-start gap-4 rounded-[1.5rem] border border-line bg-cream p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border"
                  style={{ backgroundColor: `${item.badgeColor}10`, borderColor: `${item.badgeColor}30`, color: item.badgeColor }}
                >
                  <Shield size={19} />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">{item.type}</p>
                  <h3 className="mt-1 font-display text-base font-bold leading-snug tracking-tight text-ink">{item.title}</h3>
                  <p className="mt-1 text-xs text-muted">{item.issuer}</p>
                  <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[10px] text-muted">
                    <span className="inline-flex items-center gap-1"><Calendar size={10} />{item.date}</span>
                    {item.verified && (
                      <span className="inline-flex items-center gap-0.5 text-green-ink"><CheckCircle2 size={10} />Verified</span>
                    )}
                  </div>
                </div>
              </article>
            </FadeInView>
          ))}

          <FadeInView delay={0.2} className="sm:col-span-2 lg:col-span-1">
            <div className="relative h-full overflow-hidden rounded-[1.5rem] bg-ink p-5 text-cream">
              <div aria-hidden="true" className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent-purple/30 blur-2xl" />
              <p className="relative font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">The short version</p>
              <p className="relative mt-2 font-display text-2xl font-extrabold leading-none tracking-tight">
                {certifications.length} credentials,
                <br />
                <span className="text-gradient">one curious brain.</span>
              </p>
              <div className="relative mt-4 flex flex-wrap gap-1.5">
                {others.slice(2).map((item) => (
                  <span key={item.id} className="rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[10px] text-white/70">
                    {item.title}
                  </span>
                ))}
              </div>
            </div>
          </FadeInView>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-2">
          {others.slice(2).map((item, i) => (
            <FadeInView key={item.id} delay={0.1 + i * 0.05}>
              <article className="flex items-start justify-between gap-4 rounded-[1.5rem] border border-line bg-cream/70 p-5 transition-colors hover:border-line-strong">
                <div className="flex items-start gap-3">
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
                    style={{ backgroundColor: `${item.badgeColor}10`, color: item.badgeColor }}
                  >
                    <Shield size={17} />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-bold leading-snug tracking-tight text-ink">{item.title}</h3>
                    <p className="mt-1 text-[11px] text-muted">{item.issuer} · {item.date}</p>
                  </div>
                </div>
                {item.verified && (
                  <span className="inline-flex shrink-0 items-center gap-1 text-[10px] text-green-ink">
                    <CheckCircle2 size={11} />
                    Verified
                  </span>
                )}
              </article>
            </FadeInView>
          ))}
        </div>
      </div>

      <FadeInView delay={0.2}>
        <a
          href="#contact"
          className="mt-8 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-blue transition-colors hover:text-accent-purple"
        >
          Ask me about any of these
          <ArrowUpRight size={13} />
        </a>
      </FadeInView>

      <AnimatePresence>
        {selectedImage && (
          <CertificateLightbox
            src={selectedImage}
            alt={selectedAlt}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}
