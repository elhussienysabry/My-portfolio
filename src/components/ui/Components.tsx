import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  label?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'left' | 'center';
}

export function Section({ id, children, className = '', label, title, subtitle, align = 'left' }: SectionProps) {
  const reduced = useReducedMotion();

  return (
    <section id={id} className={`relative scroll-mt-20 py-20 sm:py-24 lg:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        {(label || title) && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 28 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`mb-10 sm:mb-14 md:mb-16 ${align === 'center' ? 'text-center' : ''}`}
          >
            {label && (
              <span className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-line bg-cream/80 px-3.5 py-1.5 text-[11px] font-mono font-medium uppercase tracking-[0.16em] text-ink-soft shadow-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
                {label}
              </span>
            )}
            {title && (
              <h2 className="max-w-4xl text-[2.35rem] font-extrabold leading-[0.98] tracking-[-0.045em] text-ink sm:text-5xl lg:text-[3.9rem]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg ${align === 'center' ? 'mx-auto' : ''}`}>
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}

export function FadeInView({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}) {
  const reduced = useReducedMotion();
  const dirMap = {
    up: { y: 26 },
    down: { y: -26 },
    left: { x: 26 },
    right: { x: -26 },
  };

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, ...dirMap[direction] }}
      whileInView={reduced ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Card({
  children,
  className = '',
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`rounded-[1.75rem] border border-line bg-cream shadow-soft ${
        hover ? 'transition duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-lift' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function GlowCard({
  children,
  className = '',
  color = '#2f55ff',
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-[1.75rem] border border-line bg-cream shadow-soft transition duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-lift ${className}`}
    >
      {isHovered && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute transition-opacity duration-300"
          style={{
            left: mousePos.x - 150,
            top: mousePos.y - 150,
            width: 300,
            height: 300,
            background: `radial-gradient(circle, ${color}18 0%, transparent 68%)`,
          }}
        />
      )}
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </div>
  );
}

export function Badge({
  children,
  color = '#2f55ff',
  className = '',
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border bg-cream/80 px-2.5 py-1 text-[11px] font-medium text-ink-soft ${className}`}
      style={{ borderColor: `${color}38` }}
    >
      <span className="h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: color }} />
      {children}
    </span>
  );
}

export function SectionDivider({ insight }: { insight?: string }) {
  return (
    <div aria-hidden="true" className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
      <div className="flex flex-col items-center gap-2 py-1">
        <div className="flex w-full items-center gap-2.5">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-line-strong to-line-strong/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
          <span className="h-1.5 w-1.5 rounded-full bg-accent-purple" />
          <span className="h-1.5 w-1.5 rounded-full bg-accent-coral" />
          <span className="h-1.5 w-1.5 rounded-full bg-accent-orange" />
          <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-line-strong to-line-strong/40" />
        </div>
        {insight && (
          <p className="max-w-md text-center font-serif text-[13px] italic leading-relaxed text-muted">
            {insight}
          </p>
        )}
      </div>
    </div>
  );
}

export function Sticker({
  children,
  color = '#e3ac1f',
  className = '',
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border-2 border-ink/85 px-3 py-1.5 text-xs font-bold text-ink shadow-[3px_3px_0_rgba(21,22,31,0.85)] ${className}`}
      style={{ backgroundColor: color }}
    >
      {children}
    </span>
  );
}
