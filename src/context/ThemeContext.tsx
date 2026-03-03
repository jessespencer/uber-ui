import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: (theme?: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue>({ theme: 'dark', toggleTheme: () => {} })

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme')
    return stored === 'light' ? 'light' : 'dark'
  })

  useEffect(() => {
    const el = document.documentElement
    el.classList.add('no-transitions')
    el.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { el.classList.remove('no-transitions') })
    })
  }, [theme])

  const toggleTheme = (value?: Theme) => setTheme(t => value ?? (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
