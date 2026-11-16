import React from 'react';
import { motion } from 'framer-motion';
import { Section, FadeInView, GlowCard } from '@/components/ui/Components';
import { siteConfig } from '@/data/portfolio';
import { Mail, MapPin, Github, Linkedin, Send, ArrowUpRight } from 'lucide-react';

export function ContactSection() {
  return (
    <Section
      id="contact"
      label="Get in Touch"
      title="Let's Connect"
      subtitle="Always open to discussing data engineering, open-source projects, or collaboration opportunities."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Contact info */}
        <FadeInView>
          <div className="space-y-6">
            <p className="text-text-secondary leading-relaxed">
              Whether you have a question about a project, want to discuss data engineering concepts,
              or are interested in collaborating on open-source work — I'd be happy to hear from you.
            </p>

            <div className="space-y-4">
              <GlowCard color="#38bdf8">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-4 p-5 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-accent-blue/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-blue/20 transition-colors">
                    <Mail size={20} className="text-accent-blue" />
                  </div>
                  <div className="flex-1">
                    <p className="text-text-muted text-sm mb-0.5">Email</p>
                    <p className="text-text-primary font-medium">{siteConfig.email}</p>
                  </div>
                  <ArrowUpRight size={16} className="text-text-muted group-hover:text-accent-blue transition-colors" />
                </a>
              </GlowCard>

              <GlowCard color="#818cf8">
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-accent-purple/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-purple/20 transition-colors">
                    <Linkedin size={20} className="text-accent-purple" />
                  </div>
                  <div className="flex-1">
                    <p className="text-text-muted text-sm mb-0.5">LinkedIn</p>
                    <p className="text-text-primary font-medium">elhussienysabry</p>
                  </div>
                  <ArrowUpRight size={16} className="text-text-muted group-hover:text-accent-purple transition-colors" />
                </a>
              </GlowCard>

              <GlowCard color="#34d399">
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-accent-green/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-green/20 transition-colors">
                    <Github size={20} className="text-accent-green" />
                  </div>
                  <div className="flex-1">
                    <p className="text-text-muted text-sm mb-0.5">GitHub</p>
                    <p className="text-text-primary font-medium">elhussienysabry</p>
                  </div>
                  <ArrowUpRight size={16} className="text-text-muted group-hover:text-accent-green transition-colors" />
                </a>
              </GlowCard>

              <GlowCard color="#fb923c">
                <div className="flex items-center gap-4 p-5">
                  <div className="w-11 h-11 rounded-xl bg-accent-orange/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-accent-orange" />
                  </div>
                  <div>
                    <p className="text-text-muted text-sm mb-0.5">Location</p>
                    <p className="text-text-primary font-medium">{siteConfig.location}</p>
                  </div>
                </div>
              </GlowCard>
            </div>
          </div>
        </FadeInView>

        {/* CTA area */}
        <FadeInView delay={0.2}>
          <div className="bg-surface/60 border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center mb-6">
              <Send size={28} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-3">
              Ready to Talk?
            </h3>
            <p className="text-text-secondary text-sm mb-8 max-w-sm">
              Send me an email and I'll get back to you as soon as possible. I'm always interested in 
              hearing about data engineering challenges and open-source opportunities.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent-blue text-navy-950 font-semibold rounded-xl hover:bg-accent-blue/90 transition-all hover:shadow-lg hover:shadow-accent-blue/20"
            >
              <Mail size={18} />
              Send Email
            </a>
            <a
              href={siteConfig.cvUrl}
              download
              className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 bg-surface border border-border text-text-secondary hover:text-text-primary rounded-xl hover:border-border-bright transition-all text-sm font-medium"
            >
              Download My CV
            </a>
          </div>
        </FadeInView>
      </div>
    </Section>
  );
}
