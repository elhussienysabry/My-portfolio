import React from 'react';
import { motion } from 'framer-motion';
import { Section, FadeInView, GlowCard, Badge } from '@/components/ui/Components';
import { skillCategories } from '@/data/portfolio';
import {
  Database, Cpu, Workflow, HardDrive, BarChart3, Container, BookOpen
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  database: Database,
  cpu: Cpu,
  workflow: Workflow,
  'hard-drive': HardDrive,
  'bar-chart-3': BarChart3,
  container: Container,
  'book-open': BookOpen,
};

export function SkillsSection() {
  return (
    <Section
      id="skills"
      label="Technical Skills"
      title="Tools & Technologies"
      subtitle="Organized by domain — no arbitrary percentages, just the technologies I work with."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {skillCategories.map((category, i) => {
          const IconComp = iconMap[category.icon] || Database;
          return (
            <FadeInView key={category.title} delay={i * 0.05}>
              <GlowCard color={category.color} className="h-full">
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${category.color}15` }}
                    >
                      <IconComp size={18} style={{ color: category.color }} />
                    </div>
                    <h3 className="text-text-primary font-semibold text-sm">
                      {category.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge key={skill} color={category.color}>
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </GlowCard>
            </FadeInView>
          );
        })}
      </div>
    </Section>
  );
}
