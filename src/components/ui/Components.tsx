import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  label?: string;
  title?: string;
  subtitle?: string;
}

export function Section({ id, children, className = '', label, title, subtitle }: SectionProps) {
  return (
    <section id={id} className={`relative py-20 md:py-28 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(label || title) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-14 md:mb-18"
          >
            {label && (
              <span className="inline-block text-accent-blue text-sm font-mono font-medium tracking-wider uppercase mb-3">
                {label}
              </span>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-text-secondary text-lg md:text-xl max-w-2xl">
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
  const dirMap = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...dirMap[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
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
  glow = false,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}) {
  return (
    <div
      className={`
        bg-surface/80 border border-border rounded-2xl p-6
        ${hover ? 'hover:border-border-bright hover:bg-surface-hover transition-all duration-300' : ''}
        ${glow ? 'glow-blue' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function GlowCard({
  children,
  className = '',
  color = '#38bdf8',
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
      className={`relative bg-surface/80 border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-border-bright ${className}`}
    >
      {isHovered && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            left: mousePos.x - 150,
            top: mousePos.y - 150,
            width: 300,
            height: 300,
            background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function Badge({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium border"
      style={{
        backgroundColor: color ? `${color}10` : 'rgba(56,189,248,0.1)',
        borderColor: color ? `${color}30` : 'rgba(56,189,248,0.2)',
        color: color || '#38bdf8',
      }}
    >
      {children}
    </span>
  );
}

export function SectionDivider() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
