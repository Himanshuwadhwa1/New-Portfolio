import type { ReactNode } from 'react'

export interface BadgeProps {
  children: ReactNode
  tone?: 'default' | 'accent' | 'muted'
  className?: string
}

export function Badge({ children, tone = 'default', className = '' }: BadgeProps) {
  const tones = {
    default: 'border-[color:var(--accent)]/20 bg-[var(--surface)] text-[var(--text)]',
    accent: 'border-transparent bg-[var(--accent)]/10 text-[var(--primary)]',
    muted: 'border-[color:var(--accent)]/20 bg-transparent text-[var(--muted)]',
  }

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-[JetBrainsMono] uppercase tracking-[0.2em] ${tones[tone]} ${className}`.trim()}>
      {children}
    </span>
  )
}
