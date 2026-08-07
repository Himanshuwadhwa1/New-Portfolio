import { useMemo, lazy, Suspense } from 'react'
import { AmbientSymbol } from './components/layout/AmbientSymbol'
import { Navbar } from './components/layout/Navbar'
import { PageLoader } from './components/layout/PageLoader'
import { PageSection } from './components/layout/PageSection'
import { Badge } from './components/ui/Badge'
import { Button } from './components/ui/Button'
import { Card } from './components/ui/Card'
import { SectionHeading } from './components/ui/SectionHeading'
import { experience } from './data/experience'
import { projects } from './data/projects'
import { tools } from './data/tools'
import { useActiveSection } from './hooks/useActiveSection'

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
  const activeSection = useActiveSection(sections.map((section) => section.id))

  const content = useMemo(
    () => (
      <>
        <div className="relative min-h-screen overflow-x-hidden bg-[var(--bg)] text-[var(--text)] transition-colors duration-200">
          <AmbientSymbol />
          <PageLoader />
          <main className="relative z-10 min-h-screen text-[var(--text)] transition-colors duration-200">
        <Navbar
          activeSection={activeSection}
          onSelectSection={(sectionId) => {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
          sections={sections}
        />

        <PageSection id="intro" className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col justify-center">
          <p className="mb-4 font-[JetBrains_Mono] text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
            Software engineer • building systems and interfaces
          </p>
          <h1 className="max-w-3xl font-[Bangers] text-5xl leading-tight text-[var(--primary)] sm:text-6xl">
            I craft resilient products with clarity and intent.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            I build thoughtful web experiences, product tooling, and AI-assisted workflows with a strong focus on performance, maintainability, and calm user experience.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary" onClick={() => window.open('./resume.pdf', '_blank')}>
              View Resume
            </Button>
            <Button variant="secondary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
              View Projects
            </Button>
          </div>
        </PageSection>

        <PageSection id="experience" className="mx-auto max-w-6xl">
          <SectionHeading
            title="Experience"
            eyebrow="Career timeline"
            description="A concise view of the product and platform work that shaped my engineering practice."
          />
          <div className="space-y-6">
            {experience.map((entry) => (
              <Card key={entry.id} className="relative overflow-hidden pl-8">
                <div className="absolute left-3 top-8 h-full w-px bg-[color:var(--accent)]/20" />
                <div className="absolute left-0 top-8 h-3 w-3 rounded-full bg-[var(--primary)]" />
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                  <div>
                    <h3 className="font-[Bangers] text-2xl text-[var(--primary)]">{entry.role}</h3>
                    <p className="font-[JetBrains_Mono] text-sm text-[var(--muted)]">{entry.company}</p>
                  </div>
                  <p className="font-[JetBrains_Mono] text-sm text-[var(--muted)]">
                    {entry.startDate} — {entry.endDate}
                  </p>
                </div>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {entry.techTags.map((tag) => (
                    <Badge key={tag} tone="accent">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </PageSection>

        <PageSection id="projects" className="mx-auto max-w-6xl">
          <SectionHeading
            title="Projects"
            eyebrow="Selected work"
            description="A few product and platform examples that demonstrate the way I approach delivery and craft."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <Card
                key={project.id}
                title={project.title}
                description={project.pitch}
                footer={
                  <div className="flex flex-wrap gap-2">
                    {project.techBadges.map((badge) => (
                      <Badge key={badge} tone="muted">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                }
              >
                {project.description ? <p className="text-sm leading-7 text-[var(--muted)]">{project.description}</p> : null}
              </Card>
            ))}
          </div>
        </PageSection>

        <PageSection id="tools" className="mx-auto max-w-6xl">
          <SectionHeading
            title="Tools"
            eyebrow="Toolbox"
            description="Core languages, frameworks, and platforms I like to work with."
          />
          <div className="space-y-8">
            {['Languages', 'Frameworks', 'Infra', 'AI-ML'].map((category) => {
              const items = tools.filter((tool) => tool.category === category)
              return (
                <div key={category}>
                  <h3 className="mb-3 font-[JetBrains_Mono] text-sm uppercase tracking-[0.24em] text-[var(--primary)]">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((tool) => (
                      <Badge key={tool.name} tone="default">
                        {tool.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
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
          <h2 className="font-[Bangers] text-3xl text-[var(--primary)]">Contact</h2>
        </PageSection>
          </main>
        </div>
      </>
    ),
    [activeSection],
  )

  return content
}

export default App
