import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, FadeInView, GlowCard, Badge } from '@/components/ui/Components';
import { certifications, type Certification } from '@/data/portfolio';
import { Award, CheckCircle2, ExternalLink, Maximize2, Shield, X, Calendar } from 'lucide-react';

export function CertificationsSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <Section
      id="certifications"
      label="Credentials & Milestones"
      title="Certifications & Achievements"
      subtitle="Verified professional certifications and technical achievements backed by authentic credentials."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((item, i) => (
          <FadeInView key={item.id} delay={i * 0.08}>
            <GlowCard color={item.badgeColor} className="h-full flex flex-col justify-between">
              <div className="p-6">
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center border"
                      style={{
                        backgroundColor: `${item.badgeColor}15`,
                        borderColor: `${item.badgeColor}35`,
                      }}
                    >
                      {item.type === 'achievement' ? (
                        <Award size={18} style={{ color: item.badgeColor }} />
                      ) : (
                        <Shield size={18} style={{ color: item.badgeColor }} />
                      )}
                    </div>
                    <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
                      {item.type}
                    </span>
                  </div>

                  {item.verified && (
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-accent-green px-2 py-0.5 rounded border border-accent-green/20 bg-accent-green/10">
                      <CheckCircle2 size={12} />
                      Verified
                    </span>
                  )}
                </div>

                {/* Title and Issuer */}
                <h3 className="text-lg font-bold text-text-primary mb-1">{item.title}</h3>
                <p className="text-sm text-text-muted mb-3 flex items-center gap-1.5 font-medium">
                  {item.issuer}
                </p>

                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Certificate image thumbnail if available */}
                {item.imageUrl && (
                  <div className="mt-3 mb-4 rounded-xl overflow-hidden border border-border group relative cursor-pointer"
                       onClick={() => setSelectedImage(item.imageUrl || null)}>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-40 object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-navy-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-medium">
                      <Maximize2 size={16} />
                      View Certificate
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-3 border-t border-border/60 bg-surface/40 flex items-center justify-between text-xs text-text-muted font-mono">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} />
                  {item.date}
                </span>
                {item.imageUrl && (
                  <button
                    onClick={() => setSelectedImage(item.imageUrl || null)}
                    className="text-accent-blue hover:text-accent-cyan transition-colors flex items-center gap-1"
                  >
                    View Document
                  </button>
                )}
              </div>
            </GlowCard>
          </FadeInView>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] bg-navy-900 border border-border rounded-2xl overflow-hidden p-2 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-navy-950/80 text-text-secondary hover:text-white border border-border transition-colors"
                aria-label="Close image preview"
              >
                <X size={20} />
              </button>
              <img
                src={selectedImage}
                alt="Certificate full view"
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
