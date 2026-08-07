import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { bugHuntChallenges } from '../../../../data/bugHuntChallenges'
import { Button } from '../../../../components/ui/Button'
import { Badge } from '../../../../components/ui/Badge'
import { useReducedMotion } from '../../../../hooks/useReducedMotion'

type RoundState = 'playing' | 'correct' | 'wrong' | 'timeout'

function shuffleChallenges() {
  const shuffled = [...bugHuntChallenges]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function getTimerDuration(difficulty: 'easy' | 'medium' | 'hard'): number {
  if (difficulty === 'easy') return 15
  if (difficulty === 'medium') return 12
  return 8
}

export default function BugHunt() {
  const [challenges] = useState(shuffleChallenges)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [roundState, setRoundState] = useState<RoundState>('playing')
  const [selectedLine, setSelectedLine] = useState<number | null>(null)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(() => getTimerDuration(challenges[0]?.difficulty ?? 'easy'))
  const [totalCorrect, setTotalCorrect] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const prefersReduced = useReducedMotion()

  const challenge = useMemo(
    () => (currentIndex < challenges.length ? challenges[currentIndex] : null),
    [challenges, currentIndex],
  )
  const timerDuration = useMemo(
    () => (challenge ? getTimerDuration(challenge.difficulty) : 10),
    [challenge],
  )

  // Timer logic
  useEffect(() => {
    if (roundState !== 'playing' || !challenge) return

    setTimeLeft(timerDuration)

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.1) {
          clearInterval(timerRef.current!)
          setRoundState('timeout')
          setStreak(0)
          return 0
        }
        return Math.max(0, prev - 0.1)
      })
    }, 100)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [roundState, challenge, timerDuration])

  const handleLineClick = useCallback(
    (lineIndex: number) => {
      if (roundState !== 'playing' || !challenge) return
      if (timerRef.current) clearInterval(timerRef.current)

      setSelectedLine(lineIndex)

      if (lineIndex === challenge.buggyLineIndex) {
        setRoundState('correct')
        const newStreak = streak + 1
        setStreak(newStreak)
        setTotalCorrect((c) => c + 1)
        if (newStreak > bestStreak) setBestStreak(newStreak)
      } else {
        setRoundState('wrong')
        setStreak(0)
      }
    },
    [roundState, challenge, streak, bestStreak],
  )

  const nextChallenge = useCallback(() => {
    if (currentIndex + 1 >= challenges.length) {
      // Loop back with re-shuffle
      setCurrentIndex(0)
    } else {
      setCurrentIndex((i) => i + 1)
    }
    setRoundState('playing')
    setSelectedLine(null)
  }, [currentIndex, challenges.length])

  // Finished all — show summary
  if (!challenge) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <p className="font-[Bangers] text-2xl text-[var(--primary)]">All challenges done!</p>
        <p className="font-[JetBrains_Mono] text-sm text-[var(--muted)]">
          Best streak: {bestStreak} • Total correct: {totalCorrect}/{challenges.length}
        </p>
        <Button variant="primary" size="sm" onClick={() => { setCurrentIndex(0); setRoundState('playing'); setSelectedLine(null); setStreak(0); setTotalCorrect(0) }}>
          Play Again
        </Button>
      </div>
    )
  }

  const timerPercent = (timeLeft / timerDuration) * 100
  const timerColor = timerPercent > 40 ? 'var(--primary)' : timerPercent > 20 ? 'var(--accent-gold, var(--accent-glow, orange))' : 'var(--accent, #D6212C)'

  return (
    <div className="flex flex-col gap-5">
      {/* Header: stats + timer */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[color:var(--accent)]/15 bg-[var(--surface)] px-5 py-3">
        <div className="flex gap-5">
          <span className="font-[JetBrains_Mono] text-xs text-[var(--muted)]">
            STREAK <span className="ml-1 text-base font-bold text-[var(--primary)]">{streak}</span>
          </span>
          <span className="font-[JetBrains_Mono] text-xs text-[var(--muted)]">
            BEST <span className="ml-1 text-base font-bold text-[var(--primary)]">{bestStreak}</span>
          </span>
          <span className="font-[JetBrains_Mono] text-xs text-[var(--muted)]">
            ROUND{' '}
            <span className="ml-1 text-base font-bold text-[var(--primary)]">{currentIndex + 1}</span>
            <span className="text-[var(--muted)]">/{challenges.length}</span>
          </span>
        </div>
        <div className="flex gap-2">
          <Badge
            tone="default"
            className={
              challenge.difficulty === 'easy'
                ? '!border-green-500/30 !bg-green-500/10 !text-green-500'
                : challenge.difficulty === 'medium'
                  ? '!border-amber-500/30 !bg-amber-500/10 !text-amber-500'
                  : '!border-red-500/30 !bg-red-500/10 !text-red-500'
            }
          >
            {challenge.difficulty}
          </Badge>
          <Badge tone="accent">{challenge.language}</Badge>
        </div>
      </div>

      {/* Timer bar */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--accent)]/10">
        <motion.div
          className="h-full rounded-full"
          style={{ background: timerColor }}
          animate={{ width: `${timerPercent}%` }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </div>

      {/* Code block */}
      <div className="overflow-hidden rounded-xl border border-[color:var(--accent)]/15 bg-[var(--surface)]">
        <div className="border-b border-[color:var(--accent)]/10 px-4 py-2">
          <p className="font-[JetBrains_Mono] text-xs text-[var(--muted)]">
            Find the bug — click the line with the issue
          </p>
        </div>
        <div className="divide-y divide-[color:var(--accent)]/5">
          {challenge.lines.map((line, i) => {
            let lineStyle = ''
            const isRoundOver = roundState !== 'playing'

            if (isRoundOver && i === challenge.buggyLineIndex) {
              lineStyle =
                roundState === 'correct'
                  ? 'bg-green-500/15 border-l-2 border-l-green-500'
                  : 'bg-yellow-500/15 border-l-2 border-l-yellow-500'
            } else if (isRoundOver && i === selectedLine && roundState === 'wrong') {
              lineStyle = 'bg-red-500/15 border-l-2 border-l-red-500'
            }

            return (
              <button
                key={i}
                type="button"
                disabled={isRoundOver}
                onClick={() => handleLineClick(i)}
                className={`flex w-full items-start gap-3 px-4 py-2.5 text-left font-[JetBrains_Mono] text-sm transition-colors ${
                  isRoundOver
                    ? 'cursor-default'
                    : 'cursor-pointer hover:bg-[var(--primary)]/5'
                } ${lineStyle}`}
              >
                <span className="w-5 shrink-0 select-none text-right text-xs text-[var(--muted)]/50">
                  {i + 1}
                </span>
                <code className="whitespace-pre-wrap break-all text-[var(--text)]">{line || '\u00A0'}</code>
              </button>
            )
          })}
        </div>
      </div>

      {/* Feedback area */}
      <AnimatePresence mode="wait">
        {roundState !== 'playing' && (
          <motion.div
            key={roundState}
            initial={prefersReduced ? {} : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? {} : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className={`rounded-xl border p-5 ${
              roundState === 'correct'
                ? 'border-green-500/30 bg-green-500/10'
                : roundState === 'wrong'
                  ? 'border-red-500/30 bg-red-500/10'
                  : 'border-yellow-500/30 bg-yellow-500/10'
            }`}
          >
            <p className="font-[Bangers] text-lg text-[var(--primary)]">
              {roundState === 'correct' && '🎯 Nice catch!'}
              {roundState === 'wrong' && '✗ Wrong line'}
              {roundState === 'timeout' && "⏰ Time's up!"}
            </p>
            <p className="mt-1 font-[JetBrains_Mono] text-xs font-medium text-[var(--muted)]">
              {challenge.bugType}
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--text)]">{challenge.explanation}</p>
            <div className="mt-4">
              <Button variant="secondary" size="sm" onClick={nextChallenge}>
                Next Challenge →
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
