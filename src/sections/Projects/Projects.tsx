import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '../../components/ui/Badge'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { projects } from '../../data/projects'
import githubIconDark from '../../assets/icons/github-dark.svg'
import githubIcon from '../../assets/icons/github-light.svg'
import { useTheme } from '../../hooks/useTheme'
import { useReducedMotion } from '../../hooks/useReducedMotion'

// Sort: featured first
const sorted = [...projects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
const total = sorted.length

function mod(n: number, m: number) {
  return ((n % m) + m) % m
}

export function Projects() {
  const { theme } = useTheme()
  const prefersReduced = useReducedMotion()
  const [activeIdx, setActiveIdx] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)

  const go = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir)
      setActiveIdx((prev) => mod(prev + dir, total))
    },
    [],
  )

  // Indices: prev, active, next
  const prevIdx = mod(activeIdx - 1, total)
  const nextIdx = mod(activeIdx + 1, total)

  const activeProject = sorted[activeIdx]
  const prevProject = sorted[prevIdx]
  const nextProject = sorted[nextIdx]

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0, scale: 0.97 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0, scale: 0.97 }),
  }

  return (
    <div className="mx-auto max-w-6xl">
      <SectionHeading
        title="Projects"
        eyebrow="Selected work"
        description="A few product and platform examples that demonstrate the way I approach delivery and craft."
      />

      {/* Carousel layout */}
      <div className="relative flex items-center gap-2 px-1 sm:gap-4 sm:px-2">
        {/* Left nav */}
        <button
          type="button"
          aria-label="Previous project"
          onClick={() => go(-1)}
          className="z-10 flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full border border-[color:var(--accent)]/20 bg-[var(--surface)] text-base text-[var(--muted)] shadow-sm transition-all duration-200 hover:border-[var(--primary)] hover:text-[var(--primary)] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
        >
          ←
        </button>

        {/* Three-column stage */}
        <div className="flex flex-1 items-center gap-3 overflow-hidden py-3 lg:gap-4 lg:py-4">
          {/* Prev card — dimmed, desktop only */}
          <motion.div
            key={`prev-${prevIdx}`}
            className="hidden w-[20%] shrink-0 lg:block"
            animate={{ opacity: 0.35, scale: 0.88 }}
            transition={{ duration: 0.3 }}
          >
            <SideCard project={prevProject} theme={theme} />
          </motion.div>

          {/* Active card — focal, full width on mobile/tablet */}
          <div className="flex-1">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={activeIdx}
                custom={direction}
                variants={prefersReduced ? {} : variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              >
                <FocusCard project={activeProject} theme={theme} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next card — dimmed, desktop only */}
          <motion.div
            key={`next-${nextIdx}`}
            className="hidden w-[20%] shrink-0 lg:block"
            animate={{ opacity: 0.35, scale: 0.88 }}
            transition={{ duration: 0.3 }}
          >
            <SideCard project={nextProject} theme={theme} />
          </motion.div>
        </div>

        {/* Right nav */}
        <button
          type="button"
          aria-label="Next project"
          onClick={() => go(1)}
          className="z-10 flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full border border-[color:var(--accent)]/20 bg-[var(--surface)] text-base text-[var(--muted)] shadow-sm transition-all duration-200 hover:border-[var(--primary)] hover:text-[var(--primary)] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
        >
          →
        </button>
      </div>

      {/* Dot indicators */}
      <div className="mt-6 flex justify-center items-center gap-3">
        {sorted.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to project ${i + 1}`}
            onClick={() => {
              setDirection(i > activeIdx ? 1 : -1)
              setActiveIdx(i)
            }}
            className="flex min-h-[44px] min-w-[32px] items-center justify-center focus:outline-none"
          >
            <span
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIdx
                  ? 'w-6 bg-[var(--primary)]'
                  : 'w-2 bg-[color:var(--accent)]/30 hover:bg-[color:var(--accent)]/60'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Counter */}
      <p className="mt-3 text-center font-[JetBrainsMono] text-xs text-[var(--muted)]">
        {activeIdx + 1} / {total}
      </p>
    </div>
  )
}

/* ── Focus card (big, full detail) ── */
function FocusCard({ project, theme }: { project: typeof sorted[0]; theme: string }) {
  const githubSrc = theme === 'dark' ? githubIconDark : githubIcon

  return (
    <article
      className={`rounded-2xl border bg-[var(--surface)] p-4 sm:p-7 shadow-lg transition-shadow duration-300 ${
        project.featured
          ? 'border-[color:var(--primary)]/40 ring-1 ring-[var(--primary)]/15 shadow-[var(--primary)]/10'
          : 'border-[color:var(--accent)]/20'
      }`}
    >
      {/* Header row */}
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-[Bangers] text-3xl leading-none text-[var(--primary)]">{project.title}</h3>
            {project.featured && (
              <Badge tone="accent">★ Featured</Badge>
            )}
          </div>
          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{project.pitch}</p>
        </div>
        {/* Links */}
        <div className="flex shrink-0 gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--accent)]/20 px-3 py-1.5 font-[JetBrainsMono] text-xs text-[var(--text)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
              aria-label={`View ${project.title} on GitHub`}
            >
              <img src={githubSrc} alt="" className="h-3.5 w-3.5" />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--primary)]/30 bg-[var(--primary)]/5 px-3 py-1.5 font-[JetBrainsMono] text-xs text-[var(--primary)] transition-colors hover:bg-[var(--primary)]/15"
            >
              ↗ Live
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      {project.description && (
        <p className="mb-5 text-sm leading-7 text-[var(--muted)]">{project.description}</p>
      )}

      {/* Tech badges */}
      <div className="flex flex-wrap gap-2">
        {project.techBadges.map((badge) => (
          <Badge key={badge} tone="default">
            {badge}
          </Badge>
        ))}
      </div>
    </article>
  )
}

/* ── Side card (compact, dimmed) ── */
function SideCard({ project, theme: _theme }: { project: typeof sorted[0]; theme: string }) {
  return (
    <article className="rounded-2xl border border-[color:var(--accent)]/15 bg-[var(--surface)] p-4 shadow-sm">
      <h4 className="font-[Bangers] text-lg text-[var(--primary)]">{project.title}</h4>
      <p className="mt-1 line-clamp-2 text-xs text-[var(--muted)]">{project.pitch}</p>
    </article>
  )
}
