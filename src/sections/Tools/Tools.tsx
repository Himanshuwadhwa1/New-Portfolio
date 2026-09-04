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
  Human: { label: 'Human', icon: '✦', description: 'The traits behind the stack — who I am when code isn\'t enough.' },
}

export function Tools() {
  const [active, setActive] = useState<ToolCategory>('Languages')
  const prefersReduced = useReducedMotion()
  const items = tools.filter((t) => t.category === active)

  return (
    <div className="mx-auto max-w-6xl">
      <SectionHeading
        title="Tools"
        eyebrow="Toolbox"
        description="Core languages, frameworks, and platforms I like to work with."
      />

      {/* Category tab strip */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => {
          const meta = CATEGORY_META[cat]
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
              <span className="text-[11px]">{meta.icon}</span>
              {meta.label}
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
        {CATEGORY_META[active].description}
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
            className="flex flex-wrap justify-center gap-2.5"
          >
            {items.map((tool, i) => (
              <motion.span
                key={tool.name}
                initial={prefersReduced ? false : { opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.025, duration: 0.2 }}
                className={`inline-flex items-center rounded-xl border px-4 py-2 font-[JetBrainsMono] text-sm tracking-wide transition-all duration-150 hover:border-[var(--primary)]/60 hover:bg-[var(--primary)]/5 hover:text-[var(--primary)] ${
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
