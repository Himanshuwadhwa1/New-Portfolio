import { motion } from 'framer-motion'

export interface MouseToggleProps {
  isEnabled: boolean
  onToggle: () => void
}

export function MouseToggle({ isEnabled, onToggle }: MouseToggleProps) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors shadow-sm ${
        isEnabled
          ? 'border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]'
          : 'border-[color:var(--accent)]/20 bg-[var(--surface)]/80 text-[var(--muted)] hover:text-[var(--text)]'
      }`}
      aria-label={isEnabled ? 'Disable mouse follower' : 'Enable mouse follower'}
      title={isEnabled ? 'Mouse follower: ON' : 'Mouse follower: OFF'}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform"
      >
        {/* Mouse Icon */}
        <rect x="6" y="3" width="12" height="18" rx="6" />
        <line x1="12" y1="7" x2="12" y2="11" />
        
        {/* OFF Slash line if disabled */}
        {!isEnabled && (
          <line x1="4" y1="4" x2="20" y2="20" stroke="var(--accent)" strokeWidth="2" />
        )}
      </svg>
    </motion.button>
  )
}
