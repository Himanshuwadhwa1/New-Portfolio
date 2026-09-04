import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { experience } from '../../data/experience'
import type { ExperienceEntry } from '../../data/experience'
import { useReducedMotion } from '../../hooks/useReducedMotion'

function ExperienceModal({ entry, onClose }: { entry: ExperienceEntry; onClose: () => void }) {
  // Smaller font when there are many bullets so the modal stays compact
  const bulletClass = entry.bullets.length > 4 ? 'text-[11px] leading-5' : 'text-sm leading-7'

  return (
    <Modal isOpen onClose={onClose} title={entry.role} size="md">
      <div className="space-y-3">
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="font-[JetBrainsMono] text-sm text-[var(--primary)]">{entry.company}</p>
          <p className="font-[JetBrainsMono] text-xs text-[var(--muted)]">
            {entry.startDate} — {entry.endDate}
            {entry.location ? ` · ${entry.location}` : ''}
          </p>
        </div>
        <ul className={`list-disc space-y-1.5 pl-5 text-[var(--muted)] ${bulletClass}`}>
          {entry.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {entry.techTags.map((tag) => (
            <Badge key={tag} tone="accent">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Modal>
  )
}

export function Experience() {
  const [openId, setOpenId] = useState<string | null>(null)
  const prefersReduced = useReducedMotion()
  const openEntry = experience.find((e) => e.id === openId) ?? null

  return (
    <div className="mx-auto max-w-6xl">
      <SectionHeading
        title="Experience"
        eyebrow="Career timeline"
        description="A concise view of the product and platform work that shaped my engineering practice."
      />

      {/* Timeline */}
      <div className="relative ml-4 space-y-0 border-l border-[color:var(--accent)]/20 pl-6">
        {experience.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={prefersReduced ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.08, duration: 0.35 }}
            className="relative pb-8 last:pb-0"
          >
            {/* Timeline dot */}
            <span className="absolute -left-[1.625rem] top-5 h-3 w-3 rounded-full border-2 border-[var(--primary)] bg-[var(--bg)]" />

            {/* Abbreviated card — role, company, dates, Details only */}
            <div
              className="group cursor-pointer rounded-2xl border border-[color:var(--accent)]/15 bg-[var(--surface)] p-5 shadow-sm transition-all duration-200 hover:border-[color:var(--primary)]/40 hover:shadow-md hover:shadow-[var(--primary)]/5"
              role="button"
              tabIndex={0}
              aria-label={`View details for ${entry.role} at ${entry.company}`}
              onClick={() => setOpenId(entry.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setOpenId(entry.id)
                }
              }}
            >
              {/* Role + company */}
              <div>
                <h3 className="font-[Bangers] text-xl text-[var(--primary)] transition-colors group-hover:text-[var(--accent-gold,var(--primary))]">
                  {entry.role}
                </h3>
                <p className="font-[JetBrainsMono] text-xs text-[var(--muted)]">
                  {entry.company}
                  {entry.location ? ` · ${entry.location}` : ''}
                </p>
              </div>

              {/* Dates + Details button — always on own row */}
              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="font-[JetBrainsMono] text-xs text-[var(--muted)]">
                  {entry.startDate} — {entry.endDate}
                </p>
                <span className="shrink-0 rounded-full border border-[color:var(--primary)]/30 px-2.5 py-1 font-[JetBrainsMono] text-[10px] uppercase tracking-widest text-[var(--primary)] transition-colors group-hover:border-[var(--primary)] group-hover:bg-[var(--primary)]/10">
                  Details ↗
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {openEntry && (
          <ExperienceModal
            key={openEntry.id}
            entry={openEntry}
            onClose={() => setOpenId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
