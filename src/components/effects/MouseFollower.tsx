import { useEffect, useState } from 'react'

export interface MouseFollowerProps {
  isEnabled?: boolean
}

export function MouseFollower({ isEnabled = true }: MouseFollowerProps) {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null)
  const [rotation, setRotation] = useState<number>(0)
  const [isVisible, setIsVisible] = useState<boolean>(true)

  useEffect(() => {
    let animationFrameId: number
    let currentX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0
    let currentY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0
    let targetX = currentX
    let targetY = currentY
    let hasMoved = false
    let touchHideTimeout: ReturnType<typeof setTimeout> | null = null

    // Desktop Mouse Events
    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      if (!hasMoved) {
        currentX = targetX
        currentY = targetY
        hasMoved = true
      }
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    // Mobile / Touch Events
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetX = e.touches[0].clientX
        targetY = e.touches[0].clientY
        if (!hasMoved) {
          currentX = targetX
          currentY = targetY
          hasMoved = true
        }
        setIsVisible(true)
        if (touchHideTimeout) clearTimeout(touchHideTimeout)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetX = e.touches[0].clientX
        targetY = e.touches[0].clientY
        setIsVisible(true)
        if (touchHideTimeout) clearTimeout(touchHideTimeout)
      }
    }

    const handleTouchEnd = () => {
      if (touchHideTimeout) clearTimeout(touchHideTimeout)
      // Fade out after touch release on mobile
      touchHideTimeout = setTimeout(() => {
        setIsVisible(false)
      }, 1500)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)
    window.addEventListener('touchcancel', handleTouchEnd)

    const animate = () => {
      const dx = targetX - currentX
      const dy = targetY - currentY

      // Smooth easing factor toward target cursor/touch position
      currentX += dx * 0.1
      currentY += dy * 0.1

      setPosition({ x: currentX, y: currentY })

      // Calculate angle pointing towards target
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        const angleRad = Math.atan2(dy, dx)
        const angleDeg = (angleRad * 180) / Math.PI
        setRotation(angleDeg)
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)

      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('touchcancel', handleTouchEnd)

      if (touchHideTimeout) clearTimeout(touchHideTimeout)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  if (!isEnabled || !position) {
    return null
  }

  return (
    <div
      className={`pointer-events-none fixed z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }}
      aria-hidden="true"
    >
      <svg
        width="36"
        height="36"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md"
      >
        {/* Whiskers */}
        <path d="M 34 16 L 46 12 M 34 24 L 48 24 M 34 32 L 46 36" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Mouse Tail */}
        <path
          d="M 6 24 C 0 20, 0 28, -6 24"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          className="animate-pulse"
        />

        {/* Body */}
        <ellipse cx="22" cy="24" rx="14" ry="10" fill="var(--surface)" stroke="var(--primary)" strokeWidth="2.5" />

        {/* Outer/Inner Ears */}
        <circle cx="16" cy="13" r="6" fill="var(--surface)" stroke="var(--primary)" strokeWidth="2" />
        <circle cx="16" cy="13" r="3.5" fill="var(--accent)" />
        <circle cx="16" cy="35" r="6" fill="var(--surface)" stroke="var(--primary)" strokeWidth="2" />
        <circle cx="16" cy="35" r="3.5" fill="var(--accent)" />

        {/* Eye */}
        <circle cx="30" cy="20" r="2" fill="var(--text)" />

        {/* Cute Pink Nose at tip facing movement direction */}
        <circle cx="36" cy="24" r="2.5" fill="var(--accent)" />
      </svg>
    </div>
  )
}
