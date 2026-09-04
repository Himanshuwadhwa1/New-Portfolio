import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { experience } from '../../data/experience'

export function Experience() {
  return (
    <div className="mx-auto max-w-6xl">
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
                <p className="font-[JetBrainsMono] text-sm text-[var(--muted)]">{entry.company}</p>
              </div>
              <p className="font-[JetBrainsMono] text-sm text-[var(--muted)]">
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
    </div>
  )
}
