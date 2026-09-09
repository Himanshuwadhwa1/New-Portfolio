import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { projects } from '../../data/projects'
import type { Project } from '../../data/projects'
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

/* ─────────────────────────────────────────────
   Project detail modal (mobile / tablet)
───────────────────────────────────────────── */
function ProjectModal({
  project,
  onClose,
  theme,
}: {
  project: Project
  onClose: () => void
  theme: string
}) {
  const githubSrc = theme === 'dark' ? githubIconDark : githubIcon

  return (
    <Modal isOpen onClose={onClose} title={project.title} size="md">
      <div className="space-y-4">
        {/* Links */}
        <div className="flex flex-wrap gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 whitespace-nowrap items-center gap-1.5 rounded-full border border-[color:var(--accent)]/20 px-3 py-1.5 font-[JetBrainsMono] text-xs text-[var(--text)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
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
              className="inline-flex shrink-0 whitespace-nowrap items-center gap-1.5 rounded-full border border-[color:var(--primary)]/30 bg-[var(--primary)]/5 px-3 py-1.5 font-[JetBrainsMono] text-xs text-[var(--primary)] transition-colors hover:bg-[var(--primary)]/15"
            >
              ↗ Live
            </a>
          )}
        </div>

        {/* Pitch */}
        <p className="text-sm leading-6 text-[var(--muted)]">{project.pitch}</p>

        {/* Description */}
        {project.description && (
          <p className="text-sm leading-7 text-[var(--muted)]">{project.description}</p>
        )}

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2 pt-1">
          {project.techBadges.map((badge) => (
            <Badge key={badge} tone="default">
              {badge}
            </Badge>
          ))}
        </div>
      </div>
    </Modal>
  )
}

/* ─────────────────────────────────────────────
   Compact card — carousel active card on mobile/tablet
   Shows title + pitch + links + "Open me" → modal
───────────────────────────────────────────── */
function MobileCard({
  project,
  onOpen,
  theme,
}: {
  project: Project
  onOpen: () => void
  theme: string
}) {
  const githubSrc = theme === 'dark' ? githubIconDark : githubIcon

  return (
    <article
      className={`flex h-[175px] flex-col justify-between rounded-2xl border bg-[var(--surface)] p-4 shadow-lg sm:h-[160px] sm:p-5 ${
        project.featured
          ? 'border-[color:var(--primary)]/40 ring-1 ring-[var(--primary)]/15'
          : 'border-[color:var(--accent)]/20'
      }`}
    >
      <div className="space-y-2.5">
        {/* Title & Featured Badge */}
        <div className="flex items-center justify-between gap-2 overflow-hidden">
          <div className="flex min-w-0 items-center gap-2">
            <h3 className="truncate whitespace-nowrap font-[Bangers] text-xl leading-none text-[var(--primary)] sm:text-2xl">
              {project.shortForm ? (
                <>
                  <span className="sm:hidden">{project.shortForm}</span>
                  <span className="hidden sm:inline">{project.title}</span>
                </>
              ) : (
                project.title
              )}
            </h3>
            {project.featured && <Badge tone="accent">★</Badge>}
          </div>

          
        </div>

        {/* Pitch */}
        <p className="line-clamp-3 text-xs leading-5 text-[var(--muted)]">{project.pitch}</p>
      </div>

      {/* Bottom Action Row: Open me on left, Code/Live on right (justify-between, no text wrapping) */}
      <div className="mt-2 flex items-center justify-between gap-1.5 pt-1">
        {/* Open me Button */}
        <button
          type="button"
          onClick={onOpen}
          className="shrink-0 whitespace-nowrap rounded-full border border-[color:var(--primary)]/30 px-3 py-1 font-[JetBrainsMono] text-[10px] uppercase tracking-widest text-[var(--primary)] transition-all duration-200 hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
          aria-label={`Open details for ${project.title}`}
        >
          Open me ↗
        </button>

        {/* Code / Live Links */}
        <div className="flex shrink-0 items-center gap-1.5">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 whitespace-nowrap items-center gap-1 rounded-full border border-[color:var(--accent)]/20 px-2.5 py-1 font-[JetBrainsMono] text-[10px] text-[var(--text)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
              aria-label={`View ${project.title} on GitHub`}
            >
              <img src={githubSrc} alt="" className="h-3 w-3" />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 whitespace-nowrap items-center gap-1 rounded-full border border-[color:var(--primary)]/30 bg-[var(--primary)]/5 px-2.5 py-1 font-[JetBrainsMono] text-[10px] text-[var(--primary)] transition-colors hover:bg-[var(--primary)]/15"
            >
              ↗ Live
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

/* ─────────────────────────────────────────────
   Main section — one carousel, card flavour
   changes by breakpoint inside the slide
───────────────────────────────────────────── */
export function Projects() {
  const { theme } = useTheme()
  const prefersReduced = useReducedMotion()
  const [activeIdx, setActiveIdx] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [modalOpenId, setModalOpenId] = useState<string | null>(null)

  const go = useCallback((dir: 1 | -1) => {
    setDirection(dir)
    setActiveIdx((prev) => mod(prev + dir, total))
  }, [])

  const prevIdx = mod(activeIdx - 1, total)
  const nextIdx = mod(activeIdx + 1, total)

  const activeProject = sorted[activeIdx]
  const prevProject = sorted[prevIdx]
  const nextProject = sorted[nextIdx]
  const modalProject = sorted.find((p) => p.id === modalOpenId) ?? null

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
        {/* Left nav — desktop only */}
        <button
          type="button"
          aria-label="Previous project"
          onClick={() => go(-1)}
          className="group z-10 hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[color:var(--primary)]/30 bg-[var(--surface)] text-[var(--text)] shadow-md backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--bg)] hover:shadow-lg hover:shadow-[var(--primary)]/25 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 active:scale-95 lg:flex"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Three-column stage */}
        <div className="flex flex-1 items-center gap-3 overflow-hidden py-3 lg:gap-4 lg:py-4">
          {/* Prev ghost card */}
          <motion.div
            key={`prev-${prevIdx}`}
            className="w-[14%] shrink-0 sm:w-[16%] lg:w-[10%]"
            animate={{ opacity: 0.35, scale: 0.85 }}
            transition={{ duration: 0.3 }}
          >
            <SideCard project={prevProject} />
          </motion.div>

          {/* Active card — compact on mobile/tablet, full on desktop */}
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
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_e, { offset, velocity }) => {
                  const swipeThreshold = 50
                  if (offset.x < -swipeThreshold || velocity.x < -300) {
                    go(1)
                  } else if (offset.x > swipeThreshold || velocity.x > 300) {
                    go(-1)
                  }
                }}
                className="cursor-grab active:cursor-grabbing"
              >
                {/* Mobile / tablet: compact + modal */}
                <div className="lg:hidden">
                  <MobileCard
                    project={activeProject}
                    theme={theme}
                    onOpen={() => setModalOpenId(activeProject.id)}
                  />
                </div>

                {/* Desktop: full inline detail */}
                <div className="hidden lg:block">
                  <FocusCard project={activeProject} theme={theme} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next ghost card */}
          <motion.div
            key={`next-${nextIdx}`}
            className="w-[14%] shrink-0 sm:w-[16%] lg:w-[10%]"
            animate={{ opacity: 0.35, scale: 0.85 }}
            transition={{ duration: 0.3 }}
          >
            <SideCard project={nextProject} />
          </motion.div>
        </div>

        {/* Right nav — desktop only */}
        <button
          type="button"
          aria-label="Next project"
          onClick={() => go(1)}
          className="group z-10 hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[color:var(--primary)]/30 bg-[var(--surface)] text-[var(--text)] shadow-md backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--bg)] hover:shadow-lg hover:shadow-[var(--primary)]/25 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 active:scale-95 lg:flex"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
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

      {/* Detail modal — fires only on mobile/tablet */}
      <AnimatePresence>
        {modalProject && (
          <ProjectModal
            key={modalProject.id}
            project={modalProject}
            theme={theme}
            onClose={() => setModalOpenId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Focus card (big, full detail) — desktop carousel ── */
function FocusCard({ project, theme }: { project: Project; theme: string }) {
  const githubSrc = theme === 'dark' ? githubIconDark : githubIcon

  return (
    <article
      className={`flex lg:h-[260px] flex-col justify-between rounded-2xl border bg-[var(--surface)] p-6 shadow-lg transition-shadow duration-300 ${
        project.featured
          ? 'border-[color:var(--primary)]/40 ring-1 ring-[var(--primary)]/15 shadow-[var(--primary)]/10'
          : 'border-[color:var(--accent)]/20'
      }`}
    >
      <div>
        {/* Header row */}
        <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="truncate whitespace-nowrap font-[Bangers] text-2xl leading-none text-[var(--primary)] sm:text-3xl">
                {project.title}
              </h3>
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
          <p className="line-clamp-3 text-sm leading-6 text-[var(--muted)]">{project.description}</p>
        )}
      </div>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-2 pt-2">
        {project.techBadges.map((badge) => (
          <Badge key={badge} tone="default">
            {badge}
          </Badge>
        ))}
      </div>
    </article>
  )
}

/* ── Side card (ghost, dimmed) — preview on all devices ── */
function SideCard({ project }: { project: Project }) {
  return (
    <article className="flex h-[175px] flex-col justify-between overflow-hidden rounded-xl border border-[color:var(--accent)]/15 bg-[var(--surface)] p-2.5 shadow-sm sm:h-[160px] sm:rounded-2xl sm:p-4 lg:h-[170px]">
      <div>
        <h4 className="truncate font-[Bangers] text-sm leading-tight text-[var(--primary)] sm:text-base lg:text-sm">
          {project.shortForm || project.title}
        </h4>
        <p className="mt-1 line-clamp-2 text-[10px] text-[var(--muted)] sm:text-xs">
          {project.pitch}
        </p>
      </div>
    </article>
  )
}
