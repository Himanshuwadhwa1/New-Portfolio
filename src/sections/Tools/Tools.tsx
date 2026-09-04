import { Badge } from '../../components/ui/Badge'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { tools } from '../../data/tools'

export function Tools() {
  return (
    <div className="mx-auto max-w-6xl">
      <SectionHeading
        title="Tools"
        eyebrow="Toolbox"
        description="Core languages, frameworks, and platforms I like to work with."
      />
      <div className="space-y-8">
        {['Languages', 'Frameworks', 'Infra', 'AI-ML','Human'].map((category) => {
          const items = tools.filter((tool) => tool.category === category)
          return (
            <div key={category}>
              <h3 className="mb-3 font-[JetBrainsMono] text-sm uppercase tracking-[0.24em] text-[var(--primary)]">
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
    </div>
  )
}
