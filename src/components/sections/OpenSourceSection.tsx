import React from 'react';
import { motion } from 'framer-motion';
import { Section, FadeInView, Card, Badge } from '@/components/ui/Components';
import { contributions } from '@/data/portfolio';
import { GitPullRequest, ExternalLink, GitFork, AlertCircle } from 'lucide-react';

const statusConfig = {
  merged: { label: 'Merged', color: '#a78bfa', bgColor: 'rgba(167, 139, 250, 0.1)', borderColor: 'rgba(167, 139, 250, 0.3)' },
  open: { label: 'Open', color: '#34d399', bgColor: 'rgba(52, 211, 153, 0.1)', borderColor: 'rgba(52, 211, 153, 0.3)' },
  closed: { label: 'Closed', color: '#f87171', bgColor: 'rgba(248, 113, 113, 0.1)', borderColor: 'rgba(248, 113, 113, 0.3)' },
  unverified: { label: 'Unverified', color: '#94a3b8', bgColor: 'rgba(148, 163, 184, 0.1)', borderColor: 'rgba(148, 163, 184, 0.3)' },
};

export function OpenSourceSection() {
  return (
    <Section
      id="open-source"
      label="Open Source"
      title="Contributions"
      subtitle="Contributing to the tools I use — learning from production-grade codebases."
    >
      <div className="space-y-6">
        {/* Contribution timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block" />

          {contributions.map((contrib, i) => {
            const status = statusConfig[contrib.status];
            return (
              <FadeInView key={contrib.id} delay={i * 0.1}>
                <div className="relative flex items-start gap-4 md:gap-6 mb-6 last:mb-0">
                  {/* Timeline dot */}
                  <div className="hidden md:flex w-12 h-12 rounded-xl bg-surface border border-border items-center justify-center flex-shrink-0 z-10">
                    <GitPullRequest size={18} className="text-accent-purple" />
                  </div>

                  {/* Card */}
                  <Card className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-accent-blue text-sm">{contrib.repository}</span>
                          <span
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                            style={{
                              backgroundColor: status.bgColor,
                              color: status.color,
                              border: `1px solid ${status.borderColor}`,
                            }}
                          >
                            {status.label}
                          </span>
                        </div>
                        <h3 className="text-text-primary font-semibold">{contrib.prTitle}</h3>
                      </div>
                      {contrib.date && (
                        <span className="text-text-muted text-sm font-mono">{contrib.date}</span>
                      )}
                    </div>

                    <p className="text-text-secondary text-sm mb-4">{contrib.description}</p>

                    <div className="flex items-center gap-4">
                      <Badge color="#818cf8">{contrib.contributionType}</Badge>
                      {contrib.url && (
                        <a
                          href={contrib.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-text-secondary hover:text-text-primary text-sm transition-colors"
                        >
                          <ExternalLink size={13} />
                          View on GitHub
                        </a>
                      )}
                    </div>

                    {contrib.status === 'unverified' && (
                      <div className="mt-4 flex items-start gap-2 text-text-muted text-xs bg-surface/80 rounded-lg px-3 py-2 border border-border">
                        <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                        <span>
                          This contribution's details could not be independently verified at build time.
                          Please check the linked PR on GitHub for current status.
                        </span>
                      </div>
                    )}
                  </Card>
                </div>
              </FadeInView>
            );
          })}
        </div>

        {/* GitHub call-to-action */}
        <FadeInView delay={0.3}>
          <div className="text-center mt-10">
            <a
              href="https://github.com/elhussienysabry"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-surface border border-border rounded-xl text-text-secondary hover:text-text-primary hover:border-border-bright transition-all text-sm font-medium"
            >
              <GitFork size={16} />
              View All Activity on GitHub
            </a>
          </div>
        </FadeInView>
      </div>
    </Section>
  );
}
