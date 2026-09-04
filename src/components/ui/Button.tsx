import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md'
  as?: 'button' | 'a'
} & ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>

export function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
  as = 'button',
  href,
  download,
  target,
  rel,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex min-h-[44px] items-center justify-center rounded-full border font-[JetBrainsMono] text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40 disabled:cursor-not-allowed disabled:opacity-60'

  const variants = {
    primary: 'border-transparent bg-[var(--primary)] text-[var(--bg)] hover:brightness-110',
    secondary: 'border-[color:var(--accent)]/30 bg-[var(--surface)] text-[var(--primary)] hover:border-[var(--accent)]/60',
    ghost: 'border-transparent bg-transparent text-[var(--text)] hover:bg-[var(--surface)]',
  }

  const sizes = {
    sm: 'px-3 py-2 text-xs min-h-[40px]',
    md: 'px-5 py-2.5 text-sm min-h-[44px]',
  }

  const combinedClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`.trim()

  if (as === 'a') {
    return (
      <a
        href={href}
        download={download}
        target={target}
        rel={rel}
        className={combinedClass}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={combinedClass}
      {...props}
    >
      {children}
    </button>
  )
}

