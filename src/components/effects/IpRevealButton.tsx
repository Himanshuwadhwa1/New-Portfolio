import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useFirstInteraction } from '../../hooks/useFirstInteraction'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Modal } from '../ui/Modal'

interface IpData {
  ip: string
  city?: string
  region?: string
  country_name?: string
  org?: string
}

export function IpRevealButton() {
  const hasInteracted = useFirstInteraction()
  const prefersReducedMotion = useReducedMotion()
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [ipData, setIpData] = useState<IpData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleOpen = async () => {
    setIsOpen(true)
    if (ipData || loading) return

    setLoading(true)
    setError(null)
    try {
      const response = await fetch('https://ipapi.co/json/')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setIpData({
        ip: data.ip || 'Unknown',
        city: data.city,
        region: data.region,
        country_name: data.country_name,
        org: data.org,
      })
    } catch (err) {
      console.error('Failed to fetch IP details:', err)
      setError('Could not retrieve IP details. Network request blocked or rate limited.')
    } finally {
      setLoading(false)
    }
  }

  if (!hasInteracted) return null

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <button
            type="button"
            onClick={handleOpen}
            aria-label="Inspect connection details"
            title="Inspect Client IP Details"
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--accent)]/30 bg-[var(--surface)] text-[var(--primary)] shadow-lg transition-all duration-200 hover:scale-105 hover:border-[var(--primary)] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          >
            <svg
              className="h-6 w-6 transition-transform duration-300 group-hover:rotate-45"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="3" x2="12" y2="21" />
              <line x1="3" y1="12" x2="21" y2="12" />
            </svg>
          </button>
        </motion.div>
      </AnimatePresence>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="System Diagnostics // Client Telemetry">
        <div className="font-[JetBrainsMono] text-sm">
          <p className="mb-4 text-[var(--muted)]">
            Here is what your browser silently exposes to every endpoint you visit across the web:
          </p>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
              <span className="ml-3 text-[var(--muted)]">Querying client IP telemetry...</span>
            </div>
          ) : error ? (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
              {error}
            </div>
          ) : ipData ? (
            <div className="space-y-3 rounded-xl border border-[color:var(--accent)]/20 bg-[color:var(--surface)]/40 p-4">
              <div className="flex justify-between border-b border-[color:var(--accent)]/10 pb-2">
                <span className="text-[var(--muted)]">Public IP:</span>
                <span className="font-bold text-[var(--primary)]">{ipData.ip}</span>
              </div>
              <div className="flex justify-between border-b border-[color:var(--accent)]/10 pb-2">
                <span className="text-[var(--muted)]">Location:</span>
                <span className="text-[var(--text)]">
                  {[ipData.city, ipData.region, ipData.country_name].filter(Boolean).join(', ') || 'Unknown'}
                </span>
              </div>
              {ipData.org ? (
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Network / ISP:</span>
                  <span className="text-[var(--text)] truncate max-w-[200px]" title={ipData.org}>
                    {ipData.org}
                  </span>
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-[var(--bg)] transition-opacity hover:opacity-90"
            >
              Acknowledge & Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
