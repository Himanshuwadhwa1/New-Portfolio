import { useEffect } from 'react'
import type * as React from 'react'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-2xl border border-[color:var(--accent)]/20 bg-[var(--surface)] p-6 shadow-2xl"
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
            className="rounded-full border border-[color:var(--accent)]/20 p-2 text-[var(--muted)] transition-colors hover:text-[var(--primary)]"
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
