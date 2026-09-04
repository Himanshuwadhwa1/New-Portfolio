import { useMemo, lazy, Suspense } from 'react'
import { EasterEggTapLogo } from './components/effects/EasterEggTapLogo'
import { IpRevealButton } from './components/effects/IpRevealButton'
import { AmbientSymbol } from './components/layout/AmbientSymbol'
import { Navbar } from './components/layout/Navbar'
import { PageLoader } from './components/layout/PageLoader'
import { PageSection } from './components/layout/PageSection'
import { Button } from './components/ui/Button'
import { useActiveSection } from './hooks/useActiveSection'
import { useTapCounter } from './hooks/useTapCounter'
import { Contact } from './sections/Contact/Contact'
import { Experience } from './sections/Experience/Experience'
import { Projects } from './sections/Projects/Projects'
import { Tools } from './sections/Tools/Tools'
import { useTheme } from './hooks/useTheme'

const Playground = lazy(() => import('./sections/Playground/Playground'))

const sections = [
  { id: 'intro', label: 'Intro' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'tools', label: 'Tools' },
  { id: 'playground', label: 'Playground' },
  { id: 'contact', label: 'Contact' },
]

function App() {
  const { theme } = useTheme()
  const activeSection = useActiveSection(sections.map((section) => section.id))
  const { handleTap, isTriggered, isWobbling, resetTaps } = useTapCounter(3)

  const content = useMemo(
    () => (
      <>
        <div className="relative min-h-screen overflow-x-hidden bg-[var(--bg)] text-[var(--text)] transition-colors duration-200">
          <AmbientSymbol />
          <PageLoader />
          <EasterEggTapLogo isActive={isTriggered} onComplete={resetTaps} />
          <IpRevealButton />
          <main className="relative z-10 min-h-screen text-[var(--text)] transition-colors duration-200">
            <Navbar
              activeSection={activeSection}
              onSelectSection={(sectionId) => {
                document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              sections={sections}
              onTapLogo={handleTap}
              isWobbling={isWobbling}
            />

            <PageSection id="intro" className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col justify-center">
              <p className="mb-4 font-[JetBrainsMono] text-xs sm:text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
                Software engineer • building systems and interfaces
              </p>
              <h1 className="max-w-3xl font-[Bangers] text-5xl leading-tight text-[var(--primary)] sm:text-6xl">
                I craft resilient <span className="text-[color:var(--accent)]">products</span> with clarity <span className="text-[color:var(--accent)]">and</span> intent.
              </h1>
              <p className="mt-6 max-w-2xl text-base sm:text-lg leading-8 text-[var(--muted)]">
                I build thoughtful web experiences, product tooling, and AI-assisted workflows with a strong focus on performance, maintainability, and calm user experience.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="primary" as="a" href="./resume.pdf" download="Himanshu_Wadhwa_Resume.pdf">
                  Download Resume
                </Button>
                <Button variant="secondary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                  View Projects
                </Button>
              </div>
            </PageSection>

            <PageSection id="experience" className="mx-auto max-w-6xl">
              <Experience />
            </PageSection>

            <PageSection id="projects" className="mx-auto max-w-6xl">
              <Projects />
            </PageSection>

            <PageSection id="tools" className="mx-auto max-w-6xl">
              <Tools />
            </PageSection>

            <PageSection id="playground" className="mx-auto max-w-6xl">
              <Suspense fallback={
                <div className="flex items-center justify-center py-16">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
                </div>
              }>
                <Playground />
              </Suspense>
            </PageSection>

            <PageSection id="contact" className="mx-auto max-w-6xl">
              <Contact />
            </PageSection>
          </main>
        </div>
      </>
    ),
    [theme, activeSection, isTriggered, isWobbling, handleTap, resetTaps],
  )

  return content
}

export default App
