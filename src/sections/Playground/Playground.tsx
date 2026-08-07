import { lazy, Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const FactMe = lazy(() => import('./FactMe/FactMe'))
const MemoryMatch = lazy(() => import('./games/MemoryMatch/MemoryMatch'))
const BugHunt = lazy(() => import('./games/BugHunt/BugHunt'))

const TABS = [
  { id: 'fact-me', label: 'Fact Me' },
  { id: 'memory-match', label: 'Memory Match' },
  { id: 'bug-hunt', label: 'Bug Hunt' },
] as const

type TabId = (typeof TABS)[number]['id']

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="flex flex-col items-center gap-3">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
        <span className="font-[JetBrains_Mono] text-xs text-[var(--muted)]">Loading...</span>
      </div>
    </div>
  )
}

export default function Playground() {
  const [activeTab, setActiveTab] = useState<TabId>('fact-me')
  const prefersReduced = useReducedMotion()

  return (
    <div>
      <SectionHeading
        title="Playground"
        eyebrow="Interactive lab"
        description="Mini-games and trivia — a break from the portfolio scroll."
      />

      {/* Segmented Tab Control */}
      <div className="mb-8 flex justify-center">
        <div className="inline-flex rounded-xl border border-[color:var(--accent)]/15 bg-[var(--surface)] p-1.5">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`relative rounded-lg px-4 py-2 font-[JetBrains_Mono] text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-[var(--muted)] hover:text-[var(--text)]'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId={prefersReduced ? undefined : 'playground-tab-pill'}
                  className="absolute inset-0 rounded-lg bg-[var(--primary)]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <Suspense fallback={<LoadingFallback />}>
        {activeTab === 'fact-me' && <FactMe />}
        {activeTab === 'memory-match' && <MemoryMatch />}
        {activeTab === 'bug-hunt' && <BugHunt />}
      </Suspense>
    </div>
  )
}
