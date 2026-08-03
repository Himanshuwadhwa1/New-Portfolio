import type { ReactNode } from 'react'

export interface PageSectionProps {
  id: string
  children: ReactNode
  className?: string
}

export function PageSection({ id, children, className = '' }: PageSectionProps) {
  return (
    <section id={id} className={`scroll-mt-24 px-6 py-20 sm:px-8 lg:px-10 ${className}`.trim()}>
      {children}
    </section>
  )
}
