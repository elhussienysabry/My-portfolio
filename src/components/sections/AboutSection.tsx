import React from 'react';
import { motion } from 'framer-motion';
import { Section, FadeInView, Card } from '@/components/ui/Components';
import { siteConfig } from '@/data/portfolio';
import { MapPin, GraduationCap, Code, BookOpen, GitFork } from 'lucide-react';

export function AboutSection() {
  return (
    <Section
      id="about"
      label="About Me"
      title="Building Data Systems"
      subtitle="From the ground up — with an emphasis on understanding the internals."
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Main story */}
        <FadeInView className="lg:col-span-3">
          <div className="space-y-5 text-text-secondary leading-relaxed">
            <p className="text-lg">
              I'm a Data Engineer focused on building reliable data pipelines and understanding how the
              systems behind them actually work. My journey into data engineering started from studying
              Business Information Systems, which gave me a perspective that bridges business thinking
              with technical implementation.
            </p>
            <p>
              What drives me is going beyond surface-level tooling. I don't just use databases — I study
              how B-Tree indexes work, how storage engines handle writes, and how concurrency control
              prevents data corruption. I don't just run Spark jobs — I dig into how the DAG scheduler
              splits work across stages and how shuffle operations move data between partitions.
            </p>
            <p>
              I build end-to-end data pipelines with schema validation, idempotent loading, and data quality
              gates — not because a tutorial told me to, but because I've seen how pipelines break in subtle
              ways when these safeguards are missing.
            </p>
            <p>
              I contribute to open-source projects like Apache Airflow because I believe in building in
              public and learning from the codebase of production-grade systems. Every PR, every code
              review, and every issue discussion is a learning opportunity.
            </p>
          </div>
        </FadeInView>

        {/* Info cards */}
        <div className="lg:col-span-2 space-y-4">
          <FadeInView delay={0.1}>
            <Card className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent-blue/10 flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-accent-blue" />
              </div>
              <div>
                <p className="text-text-primary font-medium text-sm mb-1">Location</p>
                <p className="text-text-secondary text-sm">{siteConfig.location}</p>
              </div>
            </Card>
          </FadeInView>

          <FadeInView delay={0.2}>
            <Card className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent-purple/10 flex items-center justify-center flex-shrink-0">
                <GraduationCap size={18} className="text-accent-purple" />
              </div>
              <div>
                <p className="text-text-primary font-medium text-sm mb-1">Education</p>
                <p className="text-text-secondary text-sm">{siteConfig.education.degree}</p>
                <p className="text-text-muted text-xs mt-1">{siteConfig.education.institution}</p>
              </div>
            </Card>
          </FadeInView>

          <FadeInView delay={0.3}>
            <Card className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent-green/10 flex items-center justify-center flex-shrink-0">
                <Code size={18} className="text-accent-green" />
              </div>
              <div>
                <p className="text-text-primary font-medium text-sm mb-1">Core Stack</p>
                <p className="text-text-secondary text-sm">Python, SQL, Spark, dbt, Docker</p>
              </div>
            </Card>
          </FadeInView>

          <FadeInView delay={0.4}>
            <Card className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent-orange/10 flex items-center justify-center flex-shrink-0">
                <BookOpen size={18} className="text-accent-orange" />
              </div>
              <div>
                <p className="text-text-primary font-medium text-sm mb-1">Current Focus</p>
                <p className="text-text-secondary text-sm">Database Internals & Distributed Systems</p>
              </div>
            </Card>
          </FadeInView>

          <FadeInView delay={0.5}>
            <Card className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent-pink/10 flex items-center justify-center flex-shrink-0">
                <GitFork size={18} className="text-accent-pink" />
              </div>
              <div>
                <p className="text-text-primary font-medium text-sm mb-1">Open Source</p>
                <p className="text-text-secondary text-sm">Apache Airflow contributor</p>
              </div>
            </Card>
          </FadeInView>
        </div>
      </div>
    </Section>
  );
}
