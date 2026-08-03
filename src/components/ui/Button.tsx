import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md'
}

export function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-full border font-[JetBrains_Mono] text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40 disabled:cursor-not-allowed disabled:opacity-60'

  const variants = {
    primary: 'border-transparent bg-[var(--primary)] text-white hover:brightness-110',
    secondary: 'border-[color:var(--accent)]/30 bg-[var(--surface)] text-[var(--primary)] hover:border-[var(--accent)]/60',
    ghost: 'border-transparent bg-transparent text-[var(--text)] hover:bg-[var(--surface)]',
  }

  const sizes = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-4 py-2.5 text-sm',
  }

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}
