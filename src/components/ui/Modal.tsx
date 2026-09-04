import { useEffect } from 'react'
import type * as React from 'react'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  /** Panel max-width. Defaults to 'md' (~448px, roughly 1/3 of desktop viewport). */
  size?: 'sm' | 'md' | 'lg'
}

const SIZE_MAP = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg' } as const

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const previouslyFocused = document.activeElement as HTMLElement | null

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      } else if (event.key === 'Tab') {
        const modalContainer = document.querySelector('[role="dialog"]')
        if (!modalContainer) return

        const focusables = modalContainer.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (focusables.length === 0) return

        const first = focusables[0]
        const last = focusables[focusables.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      previouslyFocused?.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div
        className={`w-full ${SIZE_MAP[size]} rounded-2xl border border-[color:var(--accent)]/20 bg-[var(--surface)] p-6 shadow-2xl`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          {title ? (
            <h2 id="modal-title" className="font-[Bangers] text-2xl text-[var(--primary)]">
              {title}
            </h2>
          ) : null}
          <button
            type="button"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[color:var(--accent)]/20 text-lg text-[var(--muted)] transition-colors hover:text-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div className="mt-4 text-[var(--text)]">{children}</div>
      </div>
    </div>
  )
}
