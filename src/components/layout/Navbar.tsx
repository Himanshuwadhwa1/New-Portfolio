import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ThemeToggle } from './ThemeToggle'

export interface NavbarProps {
  activeSection: string
  onSelectSection: (sectionId: string) => void
  sections: Array<{ id: string; label: string }>
}

export function Navbar({ activeSection, onSelectSection, sections }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

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
        <button
          type="button"
          className="inline-flex items-center gap-3 rounded-full border border-[color:var(--accent)]/12 bg-[color:var(--surface)]/6 px-3 py-2 text-sm font-[JetBrains_Mono] leading-5 text-[var(--primary)] transition-shadow hover:shadow-sm"
          onClick={() => onSelectSection('intro')}
          aria-label="Go to intro"
        >
          <span className="mr-2">&gt;</span>Himanshu Wadhwa<span className="ml-2">&lt;</span>
        </button>

        <nav className="hidden items-center gap-4 md:flex">
          {sections.map((section) => {
            const isActive = activeSection === section.id
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => onSelectSection(section.id)}
                className={`relative px-3 py-2 text-sm font-[JetBrains_Mono] transition-colors ${isActive ? 'text-[var(--primary)]' : 'text-[var(--muted)] hover:text-[var(--primary)]'
                  }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="relative z-10 px-1">{section.label}</span>
                <motion.span
                  layoutId="active-section-underline"
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
            className="md:hidden inline-flex items-center gap-2 rounded-lg border border-[color:var(--accent)]/12 px-3 py-2 text-sm font-[JetBrains_Mono] text-[var(--muted)] transition-colors hover:bg-[color:var(--surface)]/6"
            onClick={() => setIsOpen((value) => !value)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="text-[var(--primary)]">{isOpen ? '✕' : '☰'}</span>
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>

      {isOpen ? (
        <div
          className="md:hidden fixed left-0 right-0 z-50 px-4 py-4"
          style={{
            top: isScrolled ? '56px' : '80px',
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
                  className={`w-full rounded-xl px-3 py-3 text-left font-[JetBrains_Mono] text-sm transition-colors ${activeSection === section.id
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
