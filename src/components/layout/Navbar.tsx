import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { ThemeToggle } from './ThemeToggle'

export interface NavbarProps {
  activeSection: string
  onSelectSection: (sectionId: string) => void
  sections: Array<{ id: string; label: string }>
  onTapLogo?: () => void
  isWobbling?: boolean
}

export function Navbar({ activeSection, onSelectSection, sections, onTapLogo, isWobbling }: NavbarProps) {
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
          <ThemeToggle />
          <button
            type="button"
            className="md:hidden inline-flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-lg border border-[color:var(--accent)]/12 px-3 py-2 text-sm font-[JetBrainsMono] text-[var(--muted)] transition-colors hover:bg-[color:var(--surface)]/6"
            onClick={() => setIsOpen((value) => !value)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="text-[var(--primary)] font-bold">{isOpen ? '> menu_ [close]' : '> menu_'}</span>
          </button>
        </div>
      </div>

      {isOpen ? (
        <div
          className="md:hidden fixed left-0 right-0 top-16 z-50 px-4 py-4"
          style={{
            background: 'color-mix(in srgb, var(--surface) 98%, transparent)',
            borderTop: '1px solid rgba(0,0,0,0.04)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 8px 30px rgba(2,6,23,0.08)'
          }}
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-3">
            <div className="flex flex-col gap-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  className={`w-full rounded-xl px-3 py-3 text-left font-[JetBrainsMono] text-sm transition-colors ${activeSection === section.id
                    ? 'bg-[var(--primary)]/10 text-[var(--primary)]'
                    : 'text-[var(--text)] hover:bg-[color:var(--surface)]/4'
                    }`}
                  onClick={() => {
                    onSelectSection(section.id)
                    setIsOpen(false)
                  }}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
