import type { ReactNode } from 'react'

export interface SectionHeadingProps {
  title: string
  eyebrow?: string
  description?: string
  align?: 'left' | 'center'
  children?: ReactNode
  className?: string
}

export function SectionHeading({
  title,
  eyebrow,
  description,
  align = 'left',
  children,
  className = '',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <div className={`mb-8 flex flex-col gap-3 ${alignment} ${className}`.trim()}>
      {eyebrow ? (
        <p className="font-[JetBrains_Mono] text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-[Bangers] text-3xl text-[var(--primary)] sm:text-4xl">{title}</h2>
      {description ? <p className="max-w-2xl text-base leading-7 text-[var(--muted)]">{description}</p> : null}
      {children ? <div className="mt-2">{children}</div> : null}
    </div>
  )
}
