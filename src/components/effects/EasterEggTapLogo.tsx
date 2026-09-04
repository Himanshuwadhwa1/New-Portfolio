import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'
import batmanSvg from '../../assets/icons/batman.svg'
import supermanSvg from '../../assets/icons/superman.svg'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useTheme } from '../../hooks/useTheme'

export interface EasterEggTapLogoProps {
  isActive: boolean
  onComplete: () => void
}

export function EasterEggTapLogo({ isActive, onComplete }: EasterEggTapLogoProps) {
  const { theme } = useTheme()
  const prefersReducedMotion = useReducedMotion()
  const [beamAngle, setBeamAngle] = useState(280)

  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        x: `${(i % 14) * 7.5 + ((i * 3 + 1) % 5)}%`,
        scale: 0.5 + ((i * 7) % 7) / 10,
        duration: 2.0 + ((i * 3) % 15) / 10,
        delay: ((i * 2) % 10) / 10,
      })),
    [],
  )

  useEffect(() => {
    const updateBeamAngle = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const rad = Math.atan2(-h, -w)
      const cartesianDeg = rad * (180 / Math.PI)
      const conicCenter = (cartesianDeg + 90 + 360) % 360
      const startAngle = (conicCenter - 16.5 + 360) % 360
      setBeamAngle(startAngle)
    }

    updateBeamAngle()
    window.addEventListener('resize', updateBeamAngle)
    return () => window.removeEventListener('resize', updateBeamAngle)
  }, [])

  useEffect(() => {
    if (!isActive) return

    const timer = setTimeout(() => {
      onComplete()
    }, 3200)

    return () => clearTimeout(timer)
  }, [isActive, onComplete])

  if (!isActive) return null

  const isLight = theme === 'light'

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        style={{
          background: isLight
            ? 'radial-gradient(circle at center, rgba(16, 185, 129, 0.22) 0%, rgba(14, 76, 146, 0.65) 60%, rgba(11, 18, 32, 0.92) 100%)'
            : 'radial-gradient(circle at center, rgba(232, 197, 71, 0.25) 0%, rgba(20, 23, 29, 0.85) 60%, rgba(10, 12, 16, 0.96) 100%)',
          backdropFilter: 'blur(8px)',
        }}
      >
        {prefersReducedMotion ? (
          <div className="rounded-2xl border border-[color:var(--accent)]/30 bg-[var(--surface)] p-6 shadow-2xl text-center">
            <img
              src={isLight ? supermanSvg : batmanSvg}
              alt={isLight ? 'Superman Shield' : 'Bat Signal'}
              className="mx-auto mb-4 h-20 w-20 object-contain"
            />
            <h3 className="font-[Bangers] text-3xl text-[var(--primary)]">
              {isLight ? '⚡ KRYPTONITE PULSE DISCOVERED! ⚡' : '🦇 GOTHAM SIGNAL ACTIVATED! 🦇'}
            </h3>
            <p className="mt-2 font-[JetBrainsMono] text-sm text-[var(--muted)]">
              Secret Logo Tap Easter Egg Unlocked
            </p>
          </div>
        ) : isLight ? (
          /* Light Mode: Kryptonite Surge & Floating Shield */
          <div className="relative h-full w-full flex items-center justify-center">
            {/* Ambient Particles */}
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{
                  y: '100vh',
                  x: p.x,
                  opacity: 0,
                  scale: p.scale,
                }}
                animate={{
                  y: ['100vh', '-10vh'],
                  opacity: [0, 0.95, 0],
                  scale: [0.5, 1.2, 0.4],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: 'easeInOut',
                }}
                className="absolute h-10 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_#34d399]"
              />
            ))}

            <motion.div
              initial={{ scale: 0.4, opacity: 0, y: 30 }}
              animate={{ scale: [0.4, 1.15, 1], opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'backOut' }}
              className="relative z-10 flex flex-col items-center justify-center rounded-3xl border-2 border-emerald-400/40 bg-slate-950/85 px-10 py-8 text-center shadow-[0_0_60px_rgba(16,185,129,0.5)] backdrop-blur-xl max-w-md mx-4"
            >
              <div className="relative mb-4 flex h-24 w-24 items-center justify-center rounded-2xl bg-slate-900/80 p-2 shadow-inner">
                <div className="absolute inset-0 rounded-2xl bg-emerald-500/20 blur-xl animate-pulse" />
                <img src={supermanSvg} alt="Superman Emblem" className="relative h-20 w-20 object-contain drop-shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
              </div>
              <h3 className="whitespace-nowrap font-[Bangers] text-2xl tracking-wider text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.9)] min-[380px]:text-3xl sm:text-4xl md:text-5xl">
                ⚡ KRYPTONITE PULSE ⚡
              </h3>
              <p className="mt-2 font-[JetBrainsMono] text-xs text-emerald-200 sm:text-sm">
                Metropolis protocol online • Secret logo tap sequence complete
              </p>
            </motion.div>
          </div>
        ) : (
          /* Dark Mode: Vivid Conic Gradient Searchlight Spotlight from Bottom-Right to Center Modal */
          <div className="relative h-full w-full overflow-hidden flex items-center justify-center">
            {/* Main Conic Spotlight Beam from Bottom-Right corner stopped at Center Modal using radial mask */}
            <div 
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                WebkitMaskImage: 'radial-gradient(circle at 100% 100%, black 0%, black 20%, transparent 50%)',
                maskImage: 'radial-gradient(circle at 100% 100%, black 0%, black 20%, transparent 50%)',
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                  background: `conic-gradient(from ${beamAngle}deg at 100% 100%, transparent 0deg, rgba(232, 197, 71, 0.75) 10deg, rgba(255, 235, 140, 0.98) 17deg, rgba(232, 197, 71, 0.75) 22deg, transparent 33deg)`,
                }}
              />
            </div>

            {/* Diffused outer glow for searchlight atmospheric volume centered along 315deg */}
            {/* <div
              className="absolute inset-0 z-0 pointer-events-none opacity-80"
              style={{
                background: 'conic-gradient(from 29deg at 100% 100%, transparent 0deg, rgba(232, 197, 71, 0.4) 15deg, rgba(245, 214, 123, 0.5) 25deg, rgba(232, 197, 71, 0.3) 35deg, transparent 50deg)',
                filter: 'blur(30px)',
              }}
            /> */}

            {/* Projected Bat-Signal Circle & Card positioned top-left/centered gracefully for all breakpoints */}
            <motion.div
              initial={{ scale: 0.3, opacity: 0, x: 60, y: 60 }}
              animate={{ scale: [0.3, 1.1, 1], opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, ease: 'backOut' }}
              className="relative z-10 mx-4 flex max-w-lg flex-col items-center justify-center rounded-3xl border-2 border-[var(--primary)]/70 bg-[#14171D]/90 px-6 py-8 text-center shadow-[0_0_80px_rgba(232,197,71,0.5)] backdrop-blur-xl sm:px-10 sm:py-10"
            >
              {/* Circular Illuminated Bat-Signal Badge */}
              <div className="relative mb-6 flex h-28 w-28 items-center justify-center rounded-full border-4 border-[#E8C547] bg-[#0A0C10] p-3 shadow-[0_0_35px_#E8C547] sm:h-32 sm:w-32">
                <div className="absolute inset-0 rounded-full bg-[#E8C547]/30 blur-md animate-pulse" />
                <img
                  src={batmanSvg}
                  alt="Bat Signal"
                  className="relative h-20 w-20 object-contain filter drop-shadow-[0_0_12px_rgba(232,197,71,1)] sm:h-24 sm:w-24"
                />
              </div>

              {/* Text content aligned on single line */}
              <h3 className="whitespace-nowrap font-[Bangers] text-2xl tracking-wider text-[var(--primary)] drop-shadow-[0_0_16px_rgba(232,197,71,0.8)] min-[380px]:text-3xl sm:text-4xl md:text-5xl">
                🦇 GOTHAM CALLING 🦇
              </h3>
              <p className="mt-3 max-w-xs font-[JetBrainsMono] text-xs leading-relaxed text-[var(--text)] sm:max-w-sm sm:text-sm">
                Night identity active • Bat-signal projected from Gotham City
              </p>
            </motion.div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
