import { useEffect, useState } from 'react'

export function useFirstInteraction(): boolean {
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    if (hasInteracted) return

    const handleInteraction = () => {
      setHasInteracted(true)
    }

    const options: AddEventListenerOptions = { capture: true, once: true, passive: true }

    window.addEventListener('scroll', handleInteraction, options)
    window.addEventListener('touchstart', handleInteraction, options)
    window.addEventListener('pointerdown', handleInteraction, options)

    return () => {
      window.removeEventListener('scroll', handleInteraction, options)
      window.removeEventListener('touchstart', handleInteraction, options)
      window.removeEventListener('pointerdown', handleInteraction, options)
    }
  }, [hasInteracted])

  return hasInteracted
}
