import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

const ThemeProviderContext = createContext({ theme: "system", setTheme: (theme: Theme) => {} })

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "ui-theme" }: any) {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeProviderContext)