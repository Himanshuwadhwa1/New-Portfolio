import { motion } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import shieldIcon from '../../assets/icons/superman.svg'
import batIcon from '../../assets/icons/batman.svg'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle Superman/Batman theme"
      aria-pressed={theme === 'dark'}
      className="flex items-center justify-center rounded-full border border-[color:var(--accent)]/20 bg-[var(--surface)]/80 p-2 text-[var(--primary)] shadow-sm transition-colors"
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <motion.span
        key={theme}
        className="relative flex h-8 w-8 items-center justify-center"
        initial={false}
        animate={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: [0.8, 1.05, 1], rotate: theme === 'dark' ? 8 : -8 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <img src={theme === 'dark' ? batIcon : shieldIcon} alt="" className="h-10 w-10" />
      </motion.span>
      <span className="sr-only">Toggle theme</span>
    </motion.button>
  )
}
