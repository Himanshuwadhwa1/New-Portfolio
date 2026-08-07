import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { facts } from '../../../data/facts'
import type { FactCategory } from '../../../data/facts'
import { Card } from '../../../components/ui/Card'
import { Badge } from '../../../components/ui/Badge'
import { useReducedMotion } from '../../../hooks/useReducedMotion'

export default function FactMe() {
  const [currentFact, setCurrentFact] = useState<{ text: string; category: FactCategory } | null>(null)
  const [factKey, setFactKey] = useState(0)
  const prefersReduced = useReducedMotion()

  const devFacts = useMemo(() => facts.filter((f) => f.category === 'dev'), [])
  const heroFacts = useMemo(() => facts.filter((f) => f.category === 'hero'), [])

  const getRandomFact = useCallback(
    (category: FactCategory) => {
      const pool = category === 'dev' ? devFacts : heroFacts
      const filtered = currentFact ? pool.filter((f) => f.text !== currentFact.text) : pool
      const source = filtered.length > 0 ? filtered : pool
      const pick = source[Math.floor(Math.random() * source.length)]
      setCurrentFact({ text: pick.text, category: pick.category })
      setFactKey((k) => k + 1)
    },
    [currentFact, devFacts, heroFacts],
  )

  const motionProps = prefersReduced
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
        transition: { duration: 0.3 },
      }

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <button
          type="button"
          onClick={() => getRandomFact('dev')}
          className="group relative inline-flex items-center gap-2.5 rounded-xl border border-[color:var(--primary)]/30 bg-[var(--primary)]/10 px-6 py-3.5 font-[JetBrains_Mono] text-sm font-medium text-[var(--primary)] transition-all duration-200 hover:border-[color:var(--primary)]/60 hover:bg-[var(--primary)]/20 hover:shadow-lg hover:shadow-[var(--primary)]/10 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-hover:scale-110"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          Dev Fact
        </button>

        <button
          type="button"
          onClick={() => getRandomFact('hero')}
          className="group relative inline-flex items-center gap-2.5 rounded-xl border border-[color:var(--emphasis)]/30 bg-[var(--emphasis)]/10 px-6 py-3.5 font-[JetBrains_Mono] text-sm font-medium text-[var(--emphasis)] transition-all duration-200 hover:border-[color:var(--emphasis)]/60 hover:bg-[var(--emphasis)]/20 hover:shadow-lg hover:shadow-[var(--emphasis)]/10 focus:outline-none focus:ring-2 focus:ring-[var(--emphasis)]/40"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-hover:scale-110"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          Hero Fact
        </button>
      </div>

      {/* Fact Display */}
      <div className="w-full min-h-[140px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {currentFact ? (
            <motion.div key={factKey} {...motionProps} className="w-full">
              <Card className="relative overflow-hidden">
                {/* Decorative top accent */}
                <div
                  className={`absolute inset-x-0 top-0 h-1 ${
                    currentFact.category === 'dev'
                      ? 'bg-[var(--primary)]'
                      : ''
                  }`}
                  style={
                    currentFact.category === 'hero'
                      ? {
                          background:
                            'linear-gradient(90deg, var(--hero-bar-start), var(--hero-bar-mid), var(--hero-bar-end))',
                        }
                      : undefined
                  }
                />
                <div className="pt-2">
                  <Badge
                    className={
                      currentFact.category === 'dev'
                        ? 'border-[color:var(--primary)]/20 bg-[var(--primary)]/5 text-[var(--primary)]'
                        : 'border-[color:var(--highlight)]/50 bg-[var(--highlight)]/10 text-[var(--emphasis)]'
                    }
                  >
                    {currentFact.category === 'dev' ? '⌨ Dev' : '⚡ Hero'}
                  </Badge>
                  <p
                    className={`mt-4 text-base leading-7 ${
                      currentFact.category === 'dev'
                        ? 'text-[var(--text)]'
                        : 'border-l-[3px] border-[color:var(--highlight)] pl-4 font-medium text-[var(--primary)]'
                    }`}
                  >
                    {currentFact.text}
                  </p>
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="prompt"
              {...motionProps}
              className="text-center"
            >
              <p className="font-[Bangers] text-xl tracking-wide text-[var(--primary)] sm:text-2xl">
                <motion.span
                  className="inline-block text-[var(--highlight)] drop-shadow-[0_0_8px_color-mix(in_srgb,var(--highlight)_40%,transparent)]"
                  {...(!prefersReduced
                    ? {
                        animate: { y: [0, -5, 0] },
                        transition: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' },
                      }
                    : {})}
                >
                  ↑
                </motion.span>{' '}
                Click a button to{' '}
                <span className="text-[var(--emphasis)]">discover something</span>
              </p>
              <p className="mt-2 font-[JetBrains_Mono] text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                Dev Fact · Hero Fact
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
