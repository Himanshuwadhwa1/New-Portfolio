import { useEffect, useMemo, useState } from 'react'
import { ThemeContext, type Theme, type ThemeContextValue } from './themeContext'

const storageKey = 'portfolio-theme'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const stored = window.localStorage.getItem(storageKey)
  if (stored === 'dark' || stored === 'light') {
    return stored
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem(storageKey, theme)

    const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement | null
    if (favicon) {
      favicon.href = theme === 'dark' ? '/favicon-dark.svg' : '/favicon-light.svg'
    }
  }, [theme])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme: () => setTheme((current) => (current === 'light' ? 'dark' : 'light')),
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

