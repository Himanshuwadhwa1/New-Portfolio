import { useCallback, useRef, useState } from 'react'

export function useTapCounter(targetTaps = 3, resetTimeoutMs = 3000) {
  const [tapCount, setTapCount] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleTap = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    setTapCount((prev) => {
      const nextCount = prev + 1
      if (nextCount >= targetTaps) {
        return targetTaps
      }
      return nextCount
    })

    timerRef.current = setTimeout(() => {
      setTapCount(0)
    }, resetTimeoutMs)
  }, [targetTaps, resetTimeoutMs])

  const resetTaps = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    setTapCount(0)
  }, [])

  return {
    tapCount,
    handleTap,
    resetTaps,
    isTriggered: tapCount >= targetTaps,
    isWobbling: tapCount >= 1 && tapCount < targetTaps,
  }
}
