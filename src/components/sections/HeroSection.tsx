import React, { useEffect, useRef, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { siteConfig } from '@/data/portfolio';
import {
  Github, Linkedin, Download, ArrowDown, Database, ArrowRight,
  Server, HardDrive, BarChart3, Cpu, ArrowDownToLine, Zap, Code
} from 'lucide-react';

interface StageConfig {
  label: string;
  Icon: React.ElementType;
  x: number;
  color: string;
}

function DataPipelineViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  const stages: StageConfig[] = useMemo(() => [
    { label: 'Sources', Icon: Database, x: 0.1, color: '#38bdf8' },
    { label: 'Ingestion', Icon: ArrowDownToLine, x: 0.3, color: '#22d3ee' },
    { label: 'Processing', Icon: Cpu, x: 0.5, color: '#818cf8' },
    { label: 'Storage', Icon: HardDrive, x: 0.7, color: '#a78bfa' },
    { label: 'Analytics', Icon: BarChart3, x: 0.9, color: '#34d399' },
  ], []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    const particles: { x: number; y: number; speed: number; stage: number; opacity: number }[] = [];
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random(),
        y: 0.5,
        speed: 0.0008 + Math.random() * 0.0012,
        stage: Math.floor(Math.random() * 4),
        opacity: 0.4 + Math.random() * 0.5,
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, w(), h());
      time += 0.02;

      // Draw connecting dashed pipes
      for (let i = 0; i < stages.length - 1; i++) {
        const x1 = stages[i].x * w();
        const x2 = stages[i + 1].x * w();
        const y = h() * 0.5;

        // Pipe glow
        ctx!.beginPath();
        ctx!.moveTo(x1, y);
        ctx!.lineTo(x2, y);
        ctx!.strokeStyle = `rgba(56, 189, 248, ${0.12 + Math.sin(time + i * 0.8) * 0.06})`;
        ctx!.lineWidth = 2;
        ctx!.setLineDash([5, 7]);
        ctx!.stroke();
        ctx!.setLineDash([]);
      }

      // Draw pulse halos behind stage anchors
      stages.forEach((stage, i) => {
        const x = stage.x * w();
        const y = h() * 0.5;
        const pulse = Math.sin(time * 2.5 + i * 0.9) * 0.5 + 0.5;

        const grad = ctx!.createRadialGradient(x, y, 0, x, y, 22 + pulse * 10);
        grad.addColorStop(0, `${stage.color}35`);
        grad.addColorStop(1, 'transparent');
        ctx!.beginPath();
        ctx!.arc(x, y, 22 + pulse * 10, 0, Math.PI * 2);
        ctx!.fillStyle = grad;
        ctx!.fill();

        // Central pip
        ctx!.beginPath();
        ctx!.arc(x, y, 4, 0, Math.PI * 2);
        ctx!.fillStyle = stage.color;
        ctx!.fill();
      });

      // Animate flowing data packets
      particles.forEach((p) => {
        const fromStage = stages[p.stage];
        const toStage = stages[p.stage + 1];
        if (!fromStage || !toStage) {
          p.stage = 0;
          p.x = stages[0].x;
          return;
        }

        p.x += p.speed;
        const progress = (p.x - fromStage.x) / (toStage.x - fromStage.x);
        if (progress >= 1) {
          p.stage = (p.stage + 1) % (stages.length - 1);
          p.x = stages[p.stage].x;
        }

        const px = p.x * w();
        const py = h() * 0.5 + Math.sin(p.x * 24 + time) * 3;

        ctx!.beginPath();
        ctx!.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(56, 189, 248, ${p.opacity})`;
        ctx!.shadowColor = '#38bdf8';
        ctx!.shadowBlur = 6;
        ctx!.fill();
        ctx!.shadowBlur = 0;
      });

      animFrame = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, [reducedMotion, stages]);

  return (
    <div className="relative w-full max-w-3xl mx-auto mt-6 bg-surface/50 border border-border/80 rounded-2xl p-6 backdrop-blur-md">
      <div className="text-xs font-mono text-text-muted mb-2 text-center tracking-wider uppercase">
        Live Data Pipeline Architecture
      </div>
      <canvas
        ref={canvasRef}
        className="w-full h-20 md:h-24"
        style={{ imageRendering: 'auto' }}
      />
      {/* Real SVG icon cards for each stage */}
      <div className="grid grid-cols-5 gap-2 pt-2">
        {stages.map((stage) => {
          const StageIcon = stage.Icon;
          return (
            <div key={stage.label} className="flex flex-col items-center gap-2 group">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110 shadow-sm"
                style={{
                  backgroundColor: `${stage.color}15`,
                  borderColor: `${stage.color}35`,
                  boxShadow: `0 0 12px ${stage.color}15`,
                }}
              >
                <StageIcon size={18} style={{ color: stage.color }} />
              </div>
              <span
                className="text-xs font-mono font-medium tracking-wide text-center"
                style={{ color: stage.color }}
              >
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* Ambient gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-blue/5 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-purple/5 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Status indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-block"
        >
          <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-border bg-surface/70 backdrop-blur-md text-xs font-mono text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            Open for Data Engineering Roles & Collaboration
          </span>
        </motion.div>

        {/* Primary Name Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4"
        >
          <span className="text-text-primary">{siteConfig.name.split(' ')[0]}</span>{' '}
          <span className="text-gradient">{siteConfig.name.split(' ').slice(1).join(' ')}</span>
        </motion.h1>

        {/* Professional Title & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <h2 className="text-xl md:text-2xl text-text-secondary font-medium flex items-center justify-center gap-2 flex-wrap">
            <span>{siteConfig.title}</span>
            <span className="text-border">|</span>
            <span className="font-mono text-accent-blue">Python & SQL</span>
            <span className="text-border">|</span>
            <span className="text-text-muted text-lg">Data Systems Internals</span>
          </h2>
        </motion.div>

        {/* Narrative Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          {siteConfig.description}
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex items-center gap-2 px-6 py-3.5 bg-accent-blue text-navy-950 font-semibold rounded-xl hover:bg-accent-blue/90 transition-all hover:shadow-lg hover:shadow-accent-blue/20"
          >
            Explore My Work
            <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
          </a>
          <a
            href={siteConfig.cvUrl}
            download
            className="flex items-center gap-2 px-6 py-3.5 bg-surface border border-border text-text-primary font-medium rounded-xl hover:border-border-bright hover:bg-surface-hover transition-all"
          >
            <Download size={16} />
            Download CV
          </a>
        </motion.div>

        {/* Links to GitHub & LinkedIn */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-6 mb-8 text-sm text-text-secondary"
        >
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-accent-blue transition-colors"
          >
            <Github size={17} />
            github.com/elhussienysabry
          </a>
          <span className="text-border">•</span>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-accent-purple transition-colors"
          >
            <Linkedin size={17} />
            linkedin.com/in/elhussienysabry
          </a>
        </motion.div>

        {/* Technical Pipeline Interactive Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <DataPipelineViz />
        </motion.div>
      </div>

      {/* Downward Scroll Cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowDown size={18} className="text-text-muted" />
      </motion.div>
    </section>
  );
}
