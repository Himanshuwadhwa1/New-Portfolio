import { useEffect, useState } from 'react'
import batSymbolIcon from '../../assets/icons/bat-symbol.svg'
import shieldIcon from '../../assets/icons/shield.svg'
import { useTheme } from '../../hooks/useTheme'

// Background image locations (place your JPGs in `public/`)
const LIGHT_BG = '/bg-light.jpg'
const DARK_BG = '/bg-dark.jpg'

export function AmbientSymbol() {
  const { theme } = useTheme()
  
  const [imageLoaded, setImageLoaded] = useState(false)
  const imagePath = theme === 'light' ? LIGHT_BG : DARK_BG

  // Attempt to preload the theme-specific background image. If it loads, we'll
  // render a full-bleed photographic background with blending; otherwise fall
  // back to the abstract SVG symbol already in assets.
  useEffect(() => {
    let mounted = true
    setImageLoaded(false)

    const img = new Image()
    img.src = imagePath
    img.onload = () => {
      if (mounted) setImageLoaded(true)
    }
    img.onerror = () => {
      if (mounted) setImageLoaded(false)
    }

    return () => {
      mounted = false
    }
  }, [imagePath])


  const icon = theme === 'light' ? shieldIcon : batSymbolIcon

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {imageLoaded ? (
        // Fixed, responsive image that is centered on small screens and
        // aligned to the right on large screens (desktop). Uses Tailwind
        // responsive utilities alongside a clamp-based width for fluid sizing.
        <div className="absolute inset-0 flex items-start justify-center pointer-events-none">
          <img
            src={imagePath}
            alt=""
            className={`fixed ${theme === 'dark' ? 'top-[22vh] lg:top-[8vh]' : 'top-[35vh] lg:top-[16vh]'} left-1/2 -translate-x-1/2 lg:left-auto lg:right-8 lg:translate-x-0 select-none`}
            style={{
              width: 'clamp(180px, 36vw, 760px)',
              height: 'auto',
              maxHeight: `${theme === 'dark' ? '90vh' : '80vh'}`,
              objectFit: 'contain',
              opacity: 0.92,
              filter: `saturate(0.94) contrast(0.96) ${theme === 'dark' ? 'brightness(2.43)' : ''}`,
              pointerEvents: 'none',
            }}
            draggable={false}
          />
        </div>
      ) : (
        // SVG fallback: fixed and responsive similar to the image
        <div className="absolute inset-0 flex items-start justify-center pointer-events-none">
          <div className="fixed top-[12vh] left-1/2 -translate-x-1/2 lg:left-auto lg:right-8 lg:translate-x-0" style={{ width: 'clamp(140px, 34vw, 680px)', pointerEvents: 'none' }}>
            <img src={icon} alt="" className="w-full h-auto object-contain opacity-60 select-none" />
          </div>
        </div>
      )}

      {/* subtle overlay to ensure foreground text remains readable */}
      <div
        className="absolute inset-0"
        style={{
          background: theme === 'light' ? 'rgba(245,247,250,0.30)' : 'rgba(10,12,16,0.36)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
