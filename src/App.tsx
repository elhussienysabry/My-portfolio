import React from 'react';
import { Navbar, Footer, ScrollToTop } from '@/components/layout/Layout';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection';
import { CertificationsSection } from '@/components/sections/CertificationsSection';
import { OpenSourceSection } from '@/components/sections/OpenSourceSection';
import { JourneySection } from '@/components/sections/JourneySection';
import { GameSection } from '@/components/sections/GameSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { SectionDivider } from '@/components/ui/Components';

export default function App() {
  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-accent-blue/20 selection:text-ink">
      <Navbar />

      <main>
        <HeroSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <SkillsSection />
        <SectionDivider />
        <ProjectsSection />
        <SectionDivider />
        <CaseStudiesSection />
        <SectionDivider />
        <CertificationsSection />
        <SectionDivider />
        <OpenSourceSection />
        <SectionDivider />
        <JourneySection />
        <SectionDivider />
        <GameSection />
        <SectionDivider />
        <ContactSection />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
