import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { tools } from '../../data/tools'
import type { ToolCategory } from '../../data/tools'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const CATEGORIES: ToolCategory[] = ['Languages', 'Frameworks', 'Infra', 'AI-ML', 'Human']

const CATEGORY_META: Record<ToolCategory, { label: string; icon: string; description: string }> = {
  Languages: { label: 'Languages', icon: '{ }', description: 'languages I write and speak.' },
  Frameworks: { label: 'Frameworks', icon: '⬡', description: 'Libraries and frameworks that power my builds.' },
  Infra: { label: 'Infra & DB', icon: '⚙', description: 'Infrastructure, tooling, and database layer.' },
  'AI-ML': { label: 'AI / ML', icon: '⚡', description: 'AI systems, ML frameworks, and vector tooling.' },
  Human: { label: 'Human', icon: '✦', description: "The traits behind the stack — who I am when code isn't enough." },
}

export function Tools() {
  const [active, setActive] = useState<ToolCategory>('Languages')
  const prefersReduced = useReducedMotion()
  const items = tools.filter((t) => t.category === active)
  const meta = CATEGORY_META[active]

  return (
    <div className="mx-auto max-w-6xl">
      <SectionHeading
        title="Tools"
        eyebrow="Toolbox"
        description="Core languages, frameworks, and platforms I like to work with."
      />

      {/* ── Category selector ──────────────────────────────────────────
          Mobile / tablet: themed dropdown (all categories in one tap).
          Desktop (lg+):   pill-tab strip (original layout).
      ─────────────────────────────────────────────────────────────── */}

      {/* Custom styled dropdown for mobile/tablet */}
      <CustomMobileCategorySelect
        active={active}
        onSelect={(cat) => setActive(cat)}
      />

      {/* Desktop pill tabs */}
      <div className="mb-8 hidden flex-wrap justify-center gap-2 lg:flex">
        {CATEGORIES.map((cat) => {
          const m = CATEGORY_META[cat]
          const isActive = active === cat
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`group relative flex min-h-[44px] items-center gap-2 rounded-full border px-4 py-2 font-[JetBrainsMono] text-xs uppercase tracking-[0.15em] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 ${
                isActive
                  ? 'border-[var(--primary)] bg-[var(--primary)] text-[var(--bg)] shadow-md shadow-[var(--primary)]/20'
                  : 'border-[color:var(--accent)]/20 bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--primary)]/50 hover:text-[var(--text)]'
              }`}
              aria-pressed={isActive}
            >
              <span className="text-[11px]">{m.icon}</span>
              {m.label}
              <span
                className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] transition-colors ${
                  isActive ? 'bg-white/20' : 'bg-[color:var(--accent)]/10'
                }`}
              >
                {tools.filter((t) => t.category === cat).length}
              </span>
            </button>
          )
        })}
      </div>

      {/* Description for active category */}
      <p className="mb-6 text-center font-[JetBrainsMono] text-xs text-[var(--muted)]">
        {meta.description}
      </p>

      {/* Badge cloud — animated swap */}
      <div className="min-h-[120px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-2.5"
          >
            {items.map((tool, i) => (
              <motion.span
                key={tool.name}
                initial={prefersReduced ? false : { opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.025, duration: 0.2 }}
                className={`inline-flex items-center rounded-xl border px-3 py-1.5 font-[JetBrainsMono] text-xs tracking-wide transition-all duration-150 hover:border-[var(--primary)]/60 hover:bg-[var(--primary)]/5 hover:text-[var(--primary)] sm:px-4 sm:py-2 sm:text-sm ${
                  active === 'Human'
                    ? 'border-[color:var(--accent-gold,var(--primary))]/30 bg-[var(--surface)] text-[var(--text)] italic'
                    : 'border-[color:var(--accent)]/20 bg-[var(--surface)] text-[var(--text)]'
                }`}
              >
                {tool.name}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Custom mobile/tablet dropdown component
───────────────────────────────────────────── */
function CustomMobileCategorySelect({
  active,
  onSelect,
}: {
  active: ToolCategory
  onSelect: (cat: ToolCategory) => void
}) {
  const [open, setOpen] = useState(false)
  const meta = CATEGORY_META[active]

  return (
    <div className="relative mx-auto mb-8 max-w-[240px] lg:hidden">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-2xl border border-[color:var(--primary)]/30 bg-[var(--surface)] px-4 py-3 font-[JetBrainsMono] text-sm text-[var(--text)] shadow-sm transition-all hover:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-base text-[var(--primary)]">{meta.icon}</span>
          <span className="font-medium text-[var(--text)]">{meta.label}</span>
          <span className="rounded-full bg-[color:var(--accent)]/15 px-2 py-0.5 text-xs text-[var(--muted)]">
            {tools.filter((t) => t.category === active).length}
          </span>
        </div>
        <svg
          width="14"
          height="14"
          viewBox="0 0 12 12"
          fill="none"
          className={`text-[var(--primary)] transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        >
          <path
            d="M2 4l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Animated Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop overlay to close on tap outside */}
            <div
              className="fixed inset-0 z-20"
              onClick={() => setOpen(false)}
            />

            <motion.ul
              role="listbox"
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-2xl border border-[color:var(--primary)]/30 bg-[var(--surface)] p-1.5 shadow-xl backdrop-blur-md"
            >
              {CATEGORIES.map((cat) => {
                const m = CATEGORY_META[cat]
                const count = tools.filter((t) => t.category === cat).length
                const selected = cat === active

                return (
                  <li key={cat}>
                    <button
                      type="button"
                      onClick={() => {
                        onSelect(cat)
                        setOpen(false)
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 font-[JetBrainsMono] text-xs transition-colors ${
                        selected
                          ? 'bg-[var(--primary)]/15 font-semibold text-[var(--primary)]'
                          : 'text-[var(--text)] hover:bg-[color:var(--accent)]/10 hover:text-[var(--primary)]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm">{m.icon}</span>
                        <span>{m.label}</span>
                      </div>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] ${
                          selected
                            ? 'bg-[var(--primary)] text-[var(--bg)] font-bold'
                            : 'bg-[color:var(--accent)]/15 text-[var(--muted)]'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  </li>
                )
              })}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}


