import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { projects } from '../../data/projects'
import githubIconDark from '../../assets/icons/github-dark.svg'
import githubIcon from '../../assets/icons/github-light.svg'
import { useTheme } from '../../hooks/useTheme'

export function Projects() {
  const { theme } = useTheme()

  return (
    <div className="mx-auto max-w-6xl">
      <SectionHeading
        title="Projects"
        eyebrow="Selected work"
        description="A few product and platform examples that demonstrate the way I approach delivery and craft."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {[...projects]
          .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
          .map((project) => (
            <Card
              key={project.id}
              title={
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-[Bangers] text-[var(--primary)]">{project.title}</h3>
                  {project.featured && (
                    <Badge tone="accent" className="shrink-0">
                      ★ Featured
                    </Badge>
                  )}
                </div>
              }
              description={project.pitch}
              className={project.featured ? 'border-[color:var(--primary)]/50 ring-1 ring-[var(--primary)]/20 shadow-md relative' : ''}
              footer={
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.techBadges.map((badge) => (
                      <Badge key={badge} tone="muted">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--accent)]/20 px-3 py-1 text-xs font-[JetBrainsMono] text-[var(--text)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)] shrink-0"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <img src={theme === 'dark' ? githubIconDark : githubIcon} alt="" className="h-4 w-4" />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              }
            >
              {project.description ? <p className="text-sm leading-7 text-[var(--muted)]">{project.description}</p> : null}
            </Card>
          ))}
      </div>
    </div>
  )
}
