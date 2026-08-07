import { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../../../components/ui/Button'
import { useReducedMotion } from '../../../../hooks/useReducedMotion'

// ── Tech icons as simple inline SVGs ──────────────────────────
const TECH_ICONS: { name: string; icon: ReactNode }[] = [
  {
    name: 'React',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
        <circle cx="20" cy="20" r="3.5" fill="currentColor" />
        <ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(60 20 20)" />
        <ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(120 20 20)" />
      </svg>
    ),
  },
  {
    name: 'Docker',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
        <rect x="6" y="18" width="28" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10" y="21" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.6" />
        <rect x="18" y="21" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.6" />
        <rect x="26" y="21" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.6" />
        <rect x="10" y="27" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.6" />
        <rect x="18" y="27" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.6" />
        <path d="M14 18 V12 H18 V8 H22 V12 H26 V18" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
        <rect x="4" y="4" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <text x="20" y="27" textAnchor="middle" fill="currentColor" fontSize="16" fontWeight="bold" fontFamily="JetBrains Mono, monospace">TS</text>
      </svg>
    ),
  },
  {
    name: 'Python',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
        <path d="M20 4 C12 4 12 8 12 10 V14 H20 V16 H8 C6 16 4 18 4 22 C4 26 6 28 8 28 H12 V24 C12 22 14 20 16 20 H24 C26 20 28 18 28 16 V10 C28 8 26 4 20 4Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M20 36 C28 36 28 32 28 30 V26 H20 V24 H32 C34 24 36 22 36 18 C36 14 34 12 32 12 H28 V16 C28 18 26 20 24 20 H16 C14 20 12 22 12 24 V30 C12 32 14 36 20 36Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="16" cy="9" r="1.5" fill="currentColor" />
        <circle cx="24" cy="31" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'AWS',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
        <path d="M8 26 L14 12 L20 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="10" y1="22" x2="18" y2="22" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 12 L24 26 L28 16 L32 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M6 30 C12 34 28 34 34 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M32 28 L34 30 L34 27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
        <path d="M20 4 L34 12 V28 L20 36 L6 28 V12 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <text x="20" y="24" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono, monospace">N</text>
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
        <ellipse cx="20" cy="12" rx="12" ry="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M8 12 V28 C8 31 13 33 20 33 C27 33 32 31 32 28 V12" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <ellipse cx="20" cy="20" rx="12" ry="5" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4" />
        <ellipse cx="20" cy="28" rx="12" ry="5" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4" />
      </svg>
    ),
  },
  {
    name: 'Git',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
        <path d="M36.4 18.6 L21.4 3.6 C20.6 2.8 19.4 2.8 18.6 3.6 L15 7.2 L19.2 11.4 C20 11.1 21 11.3 21.6 11.9 C22.2 12.5 22.4 13.4 22.1 14.2 L26 18.2 C26.8 17.9 27.8 18.1 28.4 18.7 C29.2 19.5 29.2 20.8 28.4 21.6 C27.6 22.4 26.3 22.4 25.5 21.6 C24.8 20.9 24.7 19.9 25.1 19.1 L21.4 15.4 V25.4 C21.6 25.5 21.8 25.7 22 25.9 C22.8 26.7 22.8 28 22 28.8 C21.2 29.6 19.9 29.6 19.1 28.8 C18.3 28 18.3 26.7 19.1 25.9 C19.3 25.7 19.6 25.5 19.9 25.4 V15.3 C19.6 15.2 19.3 15 19.1 14.8 C18.4 14.1 18.3 13 18.7 12.2 L14.6 8.1 L3.6 19.1 C2.8 19.9 2.8 21.1 3.6 21.9 L18.6 36.9 C19.4 37.7 20.6 37.7 21.4 36.9 L36.4 21.9 C37.2 21.1 37.2 19.4 36.4 18.6Z" fill="currentColor" opacity="0.15" />
        <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <line x1="20" y1="4" x2="20" y2="16" stroke="currentColor" strokeWidth="1.5" />
        <line x1="20" y1="24" x2="20" y2="36" stroke="currentColor" strokeWidth="1.5" />
        <line x1="28" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="2" fill="currentColor" />
      </svg>
    ),
  },
]

// ── Types ─────────────────────────────────────────────────────
interface MemoryCard {
  id: number
  techIndex: number
  isFlipped: boolean
  isMatched: boolean
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function createBoard(): MemoryCard[] {
  const indices = Array.from({ length: 8 }, (_, i) => i)
  const pairs = [...indices, ...indices]
  const shuffled = shuffleArray(pairs)
  return shuffled.map((techIndex, id) => ({
    id,
    techIndex,
    isFlipped: false,
    isMatched: false,
  }))
}

export default function MemoryMatch() {
  const [cards, setCards] = useState<MemoryCard[]>(createBoard)
  const [flippedIds, setFlippedIds] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [isChecking, setIsChecking] = useState(false)
  const prefersReduced = useReducedMotion()

  // New features: Timer, Give Up Confirmation, Gave Up State
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [timerActive, setTimerActive] = useState(true)
  const [gaveUp, setGaveUp] = useState(false)
  const [showGiveUpConfirm, setShowGiveUpConfirm] = useState<0 | 1 | 2>(0)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const matchedCount = useMemo(() => cards.filter((c) => c.isMatched).length, [cards])
  const hasWon = matchedCount === 16

  // Timer logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null
    if (timerActive && !hasWon && !gaveUp && showGiveUpConfirm === 0) {
      interval = setInterval(() => {
        setTimeElapsed((t) => t + 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timerActive, hasWon, gaveUp, showGiveUpConfirm])

  // Canvas Confetti logic
  useEffect(() => {
    if (!hasWon || prefersReduced) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    const resizeCanvas = () => {
      if (!canvas) return
      const rect = canvas.parentElement?.getBoundingClientRect()
      canvas.width = rect?.width ?? 400
      canvas.height = rect?.height ?? 400
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      color: string
      size: number
      rotation: number
      rotationSpeed: number
      opacity: number
    }

    const particles: Particle[] = []
    const colors = ['#0E4C92', '#D6212C', '#F2B705', '#E8C547', '#E6E8EC', '#3B4252']

    const spawnConfetti = () => {
      // Left fountain
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: 0,
          y: canvas.height,
          vx: Math.random() * 5 + 4,
          vy: -(Math.random() * 12 + 8),
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 6 + 6,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 6 - 3,
          opacity: 1,
        })
      }
      // Right fountain
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: canvas.width,
          y: canvas.height,
          vx: -(Math.random() * 5 + 4),
          vy: -(Math.random() * 12 + 8),
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 6 + 6,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 6 - 3,
          opacity: 1,
        })
      }
    }

    spawnConfetti()
    const spawnTimer = setTimeout(spawnConfetti, 250)

    const gravity = 0.35
    const wind = 0.01

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]

        p.x += p.vx
        p.y += p.vy
        p.vy += gravity
        p.vx += p.vx > 0 ? -wind : wind
        p.rotation += p.rotationSpeed
        p.opacity = Math.max(0, p.opacity - 0.008)

        if (p.y > canvas.height || p.opacity <= 0) {
          particles.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
        ctx.restore()
      }

      if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(render)
      }
    }

    render()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      clearTimeout(spawnTimer)
      cancelAnimationFrame(animationFrameId)
    }
  }, [hasWon, prefersReduced])

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    if (mins > 0) {
      return `${mins}m ${secs}s`
    }
    return `${secs}s`
  }

  const handleCardClick = useCallback(
    (cardId: number) => {
      if (isChecking || gaveUp || hasWon) return
      const card = cards.find((c) => c.id === cardId)
      if (!card || card.isFlipped || card.isMatched) return
      if (flippedIds.length >= 2) return

      const newFlipped = [...flippedIds, cardId]
      setFlippedIds(newFlipped)
      setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c)))

      if (newFlipped.length === 2) {
        setMoves((m) => m + 1)
        setIsChecking(true)

        const [firstId, secondId] = newFlipped
        const first = cards.find((c) => c.id === firstId)!
        const second = cards.find((c) => c.id === secondId)!

        if (first.techIndex === second.techIndex) {
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === firstId || c.id === secondId ? { ...c, isMatched: true } : c,
              ),
            )
            setFlippedIds([])
            setIsChecking(false)
          }, 600)
        } else {
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c,
              ),
            )
            setFlippedIds([])
            setIsChecking(false)
          }, 1000)
        }
      }
    },
    [cards, flippedIds, isChecking, gaveUp, hasWon],
  )

  const resetGame = useCallback(() => {
    setCards(createBoard())
    setFlippedIds([])
    setMoves(0)
    setIsChecking(false)
    setTimeElapsed(0)
    setTimerActive(true)
    setGaveUp(false)
    setShowGiveUpConfirm(0)
  }, [])

  const flipDuration = prefersReduced ? 0 : 0.4

  return (
    <div className="relative flex flex-col items-center gap-6">
      {/* Dynamic Confetti Canvas */}
      {hasWon && !prefersReduced && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 z-40 h-full w-full rounded-2xl"
        />
      )}

      {/* Stats bar */}
      <div className="flex w-full items-center justify-between rounded-xl border border-[color:var(--accent)]/15 bg-[var(--surface)] px-5 py-3">
        <div className="flex gap-4 sm:gap-6">
          <span className="font-[JetBrains_Mono] text-xs text-[var(--muted)]">
            MOVES <span className="ml-1 text-base font-bold text-[var(--primary)]">{moves}</span>
          </span>
          <span className="font-[JetBrains_Mono] text-xs text-[var(--muted)]">
            PAIRS{' '}
            <span className="ml-1 text-base font-bold text-[var(--primary)]">{matchedCount / 2}</span>
            <span className="text-[var(--muted)]">/8</span>
          </span>
          <span className="font-[JetBrains_Mono] text-xs text-[var(--muted)]">
            TIME <span className="ml-1 text-base font-bold text-[var(--primary)]">{formatTime(timeElapsed)}</span>
          </span>
        </div>
        <div className="flex gap-2">
          {!hasWon && !gaveUp && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowGiveUpConfirm(1)}
              className="!text-red-500 hover:!bg-red-500/10"
            >
              Give Up
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={resetGame}>
            Reset
          </Button>
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid w-full max-w-md grid-cols-4 gap-2.5 sm:gap-3">
        {cards.map((card) => {
          const tech = TECH_ICONS[card.techIndex]
          const isRevealed = card.isFlipped || card.isMatched || gaveUp

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => handleCardClick(card.id)}
              disabled={card.isMatched || gaveUp || isChecking || hasWon}
              aria-label={isRevealed ? `${tech.name} card` : 'Hidden card'}
              className="group relative aspect-square focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 rounded-xl"
              style={{ perspective: '600px' }}
            >
              <motion.div
                className="relative h-full w-full rounded-xl"
                animate={{ rotateY: isRevealed ? 180 : 0 }}
                transition={{ duration: flipDuration, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Card Back */}
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-xl border border-[color:var(--accent)]/20 bg-[var(--surface)] transition-colors group-hover:border-[color:var(--primary)]/40 group-hover:bg-[var(--primary)]/5"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="grid grid-cols-2 grid-rows-2 gap-1 opacity-20">
                    <div className="h-2 w-2 rounded-sm bg-[var(--primary)]" />
                    <div className="h-2 w-2 rounded-sm bg-[var(--primary)]" />
                    <div className="h-2 w-2 rounded-sm bg-[var(--primary)]" />
                    <div className="h-2 w-2 rounded-sm bg-[var(--primary)]" />
                  </div>
                </div>

                {/* Card Front (revealed) */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center gap-1.5 rounded-xl border p-2 ${
                    card.isMatched
                      ? 'border-[color:var(--primary)]/40 bg-[var(--primary)]/10'
                      : gaveUp
                        ? 'border-red-500/20 bg-red-500/5'
                        : 'border-[color:var(--accent)]/20 bg-[var(--surface)]'
                  }`}
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <div className={`text-[var(--primary)] ${card.isMatched ? 'opacity-60' : gaveUp ? 'text-red-500 opacity-60' : ''}`}>
                    {tech.icon}
                  </div>
                  <span className="hidden text-[9px] font-[JetBrains_Mono] text-[var(--muted)] sm:block">
                    {tech.name}
                  </span>
                </div>
              </motion.div>
            </button>
          )
        })}
      </div>

      {/* Win overlay */}
      {hasWon && (
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full rounded-2xl border border-[color:var(--primary)]/30 bg-[var(--primary)]/10 p-6 text-center"
        >
          <p className="font-[Bangers] text-2xl text-[var(--primary)]">🎉 You matched them all!</p>
          <p className="mt-1 font-[JetBrains_Mono] text-sm text-[var(--muted)]">
            Completed in {moves} moves • Time invested: {formatTime(timeElapsed)}
          </p>
          <div className="mt-4">
            <Button variant="primary" size="sm" onClick={resetGame}>
              Play Again
            </Button>
          </div>
        </motion.div>
      )}

      {/* Gave Up overlay */}
      {gaveUp && (
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center"
        >
          <p className="font-[Bangers] text-2xl text-red-500">Game Over — You Gave Up</p>
          <p className="mt-2 font-[JetBrains_Mono] text-sm text-[var(--muted)]">
            Time invested: {formatTime(timeElapsed)} • {moves} moves made
          </p>
          <p className="mt-2 text-xs italic text-[var(--muted)]">
            "I know you can do this, Don't give up AGAIN"
          </p>
          <div className="mt-4">
            <Button variant="primary" size="sm" onClick={resetGame}>
              Try Again
            </Button>
          </div>
        </motion.div>
      )}

      {/* Two-Stage Give Up Confirmation Prompt */}
      {showGiveUpConfirm > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-[color:var(--accent)]/20 bg-[var(--surface)] p-6 shadow-2xl text-center">
            {showGiveUpConfirm === 1 ? (
              <>
                <h3 className="font-[Bangers] text-2xl text-[var(--primary)]">Give Up?</h3>
                <p className="mt-3 text-sm text-[var(--muted)]">Do you really want to give up?</p>
                <div className="mt-6 flex justify-center gap-3">
                  <Button variant="secondary" size="sm" onClick={() => setShowGiveUpConfirm(0)}>
                    No, Continue
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setShowGiveUpConfirm(2)}
                    className="!bg-[var(--accent)]"
                  >
                    Yes, Give Up
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-[Bangers] text-2xl text-red-500">Wait a second!</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--text)] whitespace-pre-line">
                  Do you really really really want to give up?
                  {"\n"}I know you can do this, Don't give up AGAIN
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <Button variant="secondary" size="sm" onClick={() => setShowGiveUpConfirm(0)}>
                    No, Continue
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setShowGiveUpConfirm(0)
                      setGaveUp(true)
                      setTimerActive(false)
                    }}
                    className="!bg-[var(--accent)]"
                  >
                    Yes, I give up
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
