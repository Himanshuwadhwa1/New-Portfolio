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
      className={`sticky top-0 z-40 border-b border-[color:var(--accent)]/10 backdrop-blur-xl transition-all duration-300 ${
        isScrolled ? 'h-14' : 'h-20'
      }`}
      style={{ backgroundColor: 'color-mix(in srgb, var(--surface) 80%, transparent)' }}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          className="rounded-full border border-[color:var(--accent)]/20 px-3 py-2 font-[JetBrains_Mono] text-sm text-[var(--primary)]"
          onClick={() => onSelectSection('intro')}
        >
          <span className="mr-2">&gt;</span>Himanshu Wadhwa<span className="ml-2">&lt;</span>
        </button>

        <nav className="hidden items-center gap-2 md:flex">
          {sections.map((section) => {
            const isActive = activeSection === section.id
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => onSelectSection(section.id)}
                className="relative rounded-full px-3 py-2 text-sm font-[JetBrains_Mono] text-[var(--muted)] transition-colors hover:text-[var(--primary)]"
              >
                {isActive ? (
                  <motion.span
                    layoutId="active-section-pill"
                    className="absolute inset-0 rounded-full bg-[var(--surface)]"
                  />
                ) : null}
                <span className="relative z-10">{section.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="rounded-full border border-[color:var(--accent)]/20 px-3 py-2 text-sm font-[JetBrains_Mono] text-[var(--muted)] md:hidden"
            onClick={() => setIsOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            <span className="mr-2 text-[var(--primary)]">&gt;</span>menu_
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="border-t border-[color:var(--accent)]/10 bg-[var(--surface)]/95 px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                className={`rounded-xl px-3 py-3 text-left font-[JetBrains_Mono] text-sm ${
                  activeSection === section.id ? 'bg-[var(--primary)]/10 text-[var(--primary)]' : 'text-[var(--text)]'
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
      ) : null}
    </header>
  )
}
