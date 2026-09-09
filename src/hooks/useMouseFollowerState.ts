import { useState, useEffect } from 'react'

const MOUSE_FOLLOWER_KEY = 'portfolio_mouse_follower_enabled'

export function useMouseFollowerState() {
  const [isEnabled, setIsEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    const saved = localStorage.getItem(MOUSE_FOLLOWER_KEY)
    return saved !== null ? saved === 'true' : true
  })

  useEffect(() => {
    localStorage.setItem(MOUSE_FOLLOWER_KEY, String(isEnabled))
  }, [isEnabled])

  const toggle = () => setIsEnabled((prev) => !prev)

  return { isEnabled, toggle }
}
