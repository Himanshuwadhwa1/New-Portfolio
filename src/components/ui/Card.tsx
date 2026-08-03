import type { ReactNode } from 'react'

export interface CardProps {
  children?: ReactNode
  title?: string
  description?: string
  footer?: ReactNode
  className?: string
}

export function Card({ children, title, description, footer, className = '' }: CardProps) {
  return (
    <article className={`rounded-2xl border border-[color:var(--accent)]/15 bg-[var(--surface)] p-6 shadow-sm shadow-black/5 ${className}`.trim()}>
      {title ? <h3 className="text-xl font-[Bangers] text-[var(--primary)]">{title}</h3> : null}
      {description ? <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{description}</p> : null}
      {children ? <div className="mt-4">{children}</div> : null}
      {footer ? <div className="mt-6 border-t border-[color:var(--accent)]/10 pt-4">{footer}</div> : null}
    </article>
  )
}
