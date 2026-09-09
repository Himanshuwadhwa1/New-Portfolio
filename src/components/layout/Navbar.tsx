import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { MouseToggle } from './MouseToggle'
import { ThemeToggle } from './ThemeToggle'

export interface NavbarProps {
  activeSection: string
  onSelectSection: (sectionId: string) => void
  sections: Array<{ id: string; label: string }>
  onTapLogo?: () => void
  isWobbling?: boolean
  isMouseFollowerEnabled: boolean
  onToggleMouseFollower: () => void
}

export function Navbar({
  activeSection,
  onSelectSection,
  sections,
  onTapLogo,
  isWobbling,
  isMouseFollowerEnabled,
  onToggleMouseFollower,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="sticky top-0 z-40 h-16 backdrop-blur-sm"
      style={{ background: 'linear-gradient(90deg, color-mix(in srgb, var(--surface) 92%, transparent), transparent 60%)' }}
    >
      <div
        className={`mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 transition-transform duration-200 ${isScrolled ? 'transform -translate-y-0.5' : ''
          }`}
      >
        <motion.button
          type="button"
          animate={!prefersReduced && isWobbling ? { rotate: [-2, 2, -2, 2, 0], scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-3 rounded-full border border-[color:var(--accent)]/12 bg-[color:var(--surface)]/6 px-3 py-2 text-sm font-[JetBrainsMono] leading-5 text-[var(--primary)] transition-shadow hover:shadow-sm"
          onClick={() => {
            onTapLogo?.()
            onSelectSection('intro')
          }}
          aria-label="Go to intro"
        >
          <span className="mr-2">&gt;</span>Himanshu Wadhwa<span className="ml-2">&lt;</span>
        </motion.button>

        <nav className="hidden items-center gap-4 md:flex">
          {sections.map((section) => {
            const isActive = activeSection === section.id
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => onSelectSection(section.id)}
                className={`relative px-3 py-2 text-sm font-[JetBrainsMono] transition-colors ${isActive ? 'text-[var(--primary)]' : 'text-[var(--muted)] hover:text-[var(--primary)]'
                  }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="relative z-10 px-1">{section.label}</span>
                <motion.span
                  layoutId={prefersReduced ? undefined : "active-section-underline"}
                  className={`absolute left-1/3 top-full -translate-x-1/2 mt-2 h-0.5 rounded-full bg-[var(--accent-glow)] transition-all`}
                  style={{ width: isActive ? '30%' : '0%' }}
                />
              </button>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <MouseToggle isEnabled={isMouseFollowerEnabled} onToggle={onToggleMouseFollower} />
          </div>
          <ThemeToggle />
          <button
            type="button"
            className={`md:hidden inline-flex min-h-[44px] items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-[JetBrainsMono] transition-all duration-200 ${
              isOpen
                ? 'border-[var(--primary)]/40 bg-[var(--primary)]/10 text-[var(--primary)] shadow-sm'
                : 'border-[color:var(--accent)]/15 text-[var(--muted)] hover:border-[color:var(--accent)]/30 hover:bg-[color:var(--surface)]/10'
            }`}
            onClick={() => setIsOpen((value) => !value)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="font-bold">{isOpen ? '> menu_ [x]' : '> menu_'}</span>
          </button>
        </div>
      </div>

      {isOpen ? (
        <motion.div
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="md:hidden fixed right-4 top-16 z-50 w-56 max-w-[calc(100vw-2rem)] rounded-2xl border border-[color:var(--accent)]/20 px-3 py-3 shadow-2xl backdrop-blur-2xl"
          style={{
            background: 'color-mix(in srgb, var(--surface) 96%, transparent)',
            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.3)'
          }}
        >
          <div className="flex flex-col gap-3">
            {/* Control Strip */}
            <div className="flex items-center justify-between rounded-xl border border-[color:var(--accent)]/15 bg-[color:var(--bg)]/50 px-3 py-2 font-[JetBrainsMono] text-xs">
              <span className="flex items-center gap-2 text-[var(--muted)] font-medium">
                <span className="inline-block h-2 w-2 rounded-full bg-[var(--primary)] animate-pulse" />
                Cursor Effect
              </span>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded ${isMouseFollowerEnabled ? 'bg-[var(--primary)]/15 text-[var(--primary)]' : 'bg-[var(--muted)]/15 text-[var(--muted)]'}`}>
                  {isMouseFollowerEnabled ? 'ON' : 'OFF'}
                </span>
                <MouseToggle isEnabled={isMouseFollowerEnabled} onToggle={onToggleMouseFollower} />
              </div>
            </div>

            {/* Nav Items */}
            <div className="flex flex-col gap-1">
              {sections.map((section, idx) => {
                const isActive = activeSection === section.id
                return (
                  <motion.button
                    key={section.id}
                    type="button"
                    initial={prefersReduced ? { opacity: 1 } : { opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15, delay: idx * 0.03 }}
                    className={`group relative flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 font-[JetBrainsMono] text-sm transition-all ${
                      isActive
                        ? 'bg-[var(--primary)]/12 text-[var(--primary)] font-semibold border border-[var(--primary)]/25'
                        : 'text-[var(--text)] hover:bg-[color:var(--surface)]/80 hover:text-[var(--primary)] border border-transparent'
                    }`}
                    onClick={() => {
                      onSelectSection(section.id)
                      setIsOpen(false)
                    }}
                  >
                    <span>{section.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] shadow-[0_0_6px_var(--primary)]" />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>
        </motion.div>
      ) : null}
    </header>
  )
}
