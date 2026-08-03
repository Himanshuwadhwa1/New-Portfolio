import { useMemo } from 'react'
import { Navbar } from './components/layout/Navbar'
import { PageSection } from './components/layout/PageSection'
import { useActiveSection } from './hooks/useActiveSection'

const sections = [
  { id: 'intro', label: 'Intro' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'tools', label: 'Tools' },
  { id: 'playground', label: 'Playground' },
  { id: 'contact', label: 'Contact' },
]

function App() {
  const activeSection = useActiveSection(sections.map((section) => section.id))

  const content = useMemo(
    () => (
      <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-200">
        <Navbar
          activeSection={activeSection}
          onSelectSection={(sectionId) => {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
          sections={sections}
        />

        <PageSection id="intro" className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col justify-center">
          <p className="mb-4 font-[JetBrains_Mono] text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
            Portfolio scaffold ready
          </p>
          <h1 className="max-w-3xl font-[Bangers] text-5xl leading-tight text-[var(--primary)] sm:text-6xl">
            Vite + React + TypeScript + Tailwind
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--muted)]">
            The requested structure, theme tokens, font declarations, and context shell are in place. The navbar is now wired to active-section detection and mobile navigation.
          </p>
        </PageSection>

        <PageSection id="experience" className="mx-auto max-w-6xl">
          <h2 className="font-[Bangers] text-3xl text-[var(--primary)]">Experience</h2>
        </PageSection>

        <PageSection id="projects" className="mx-auto max-w-6xl">
          <h2 className="font-[Bangers] text-3xl text-[var(--primary)]">Projects</h2>
        </PageSection>

        <PageSection id="tools" className="mx-auto max-w-6xl">
          <h2 className="font-[Bangers] text-3xl text-[var(--primary)]">Tools</h2>
        </PageSection>

        <PageSection id="playground" className="mx-auto max-w-6xl">
          <h2 className="font-[Bangers] text-3xl text-[var(--primary)]">Playground</h2>
        </PageSection>

        <PageSection id="contact" className="mx-auto max-w-6xl">
          <h2 className="font-[Bangers] text-3xl text-[var(--primary)]">Contact</h2>
        </PageSection>
      </main>
    ),
    [activeSection],
  )

  return content
}

export default App
