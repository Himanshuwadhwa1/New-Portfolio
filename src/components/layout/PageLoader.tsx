import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import batmanIcon from '../../assets/icons/batman.svg'
import supermanIcon from '../../assets/icons/superman.svg'
import { useTheme } from '../../hooks/useTheme'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function PageLoader() {
  const { theme } = useTheme()
  const prefersReducedMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsVisible(false), prefersReducedMotion ? 400 : 1200)
    return () => window.clearTimeout(timeout)
  }, [prefersReducedMotion])

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.35, ease: 'easeInOut' }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[var(--bg)]"
        >
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-[color:var(--accent)]/20 bg-[var(--surface)]/70 shadow-[0_0_50px_rgba(0,0,0,0.1)]">
              {theme === 'light' ? (
                <motion.img
                  src={supermanIcon}
                  alt=""
                  className="h-20 w-20 object-contain"
                  initial={{ opacity: 0.25, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: prefersReducedMotion ? 0.2 : 0.4, ease: 'easeInOut' }}
                />
              ) : (
                <>
                  <motion.div
                    className="absolute inset-y-0 left-[-40%] w-[40%] rounded-full bg-[color:var(--accent-glow)]/80 blur-3xl"
                    initial={{ x: '-120%' }}
                    animate={{ x: prefersReducedMotion ? 0 : '120%' }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.9, ease: 'easeInOut' }}
                  />
                  <motion.img
                    src={batmanIcon}
                    alt=""
                    className="relative h-20 w-20 object-contain"
                    initial={{ opacity: 0.4, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: prefersReducedMotion ? 0.2 : 0.4, ease: 'easeInOut' }}
                  />
                </>
              )}
            </div>
            <motion.p
              className="font-[JetBrainsMono] text-sm uppercase tracking-[0.3em] text-[var(--muted)]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.25 }}
            >
              Loading interface
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
