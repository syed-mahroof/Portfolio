import React, { createContext, useContext, useState, useLayoutEffect, useCallback } from 'react'
import { themeConfig, THEME_ORDER, getTheme } from '../theme/themeConfig'

const ThemeContext = createContext(null)

const THEME_STORAGE_KEY = 'portfolio-theme'

/* Smart Theme Roulette — runs synchronously on the very first render only.
   Guarantees a fresh theme every visit by excluding the last-seen theme,
   while keeping the full fallback pool when localStorage is empty/cleared. */
const getInitialTheme = () => {
  const last = localStorage.getItem(THEME_STORAGE_KEY)
  // Build the candidate pool — exclude last theme only if it's valid
  const pool = (last && themeConfig[last])
    ? THEME_ORDER.filter(t => t !== last)
    : THEME_ORDER
  const selected = pool[Math.floor(Math.random() * pool.length)]
  // Persist immediately so the next visit knows what to exclude
  localStorage.setItem(THEME_STORAGE_KEY, selected)
  return selected
}

/* Back-compat: some components import { themes } from here. */
export const themes = themeConfig

export const ThemeProvider = ({ children }) => {
  // Lazy initializer: getInitialTheme runs once, synchronously, before render
  const [currentTheme, setCurrentTheme] = useState(getInitialTheme)

  // useLayoutEffect fires synchronously after DOM mutations but BEFORE the
  // browser paints — zero flash of unstyled content.
  useLayoutEffect(() => {
    const cfg = getTheme(currentTheme)
    document.documentElement.setAttribute('data-theme', currentTheme)
    document.body.setAttribute('data-theme', currentTheme)
    document.body.setAttribute('data-scroll', cfg.scroll)    // scroll-motion personality hook
    document.body.setAttribute('data-mode', currentTheme === 'frost' ? 'light' : 'dark')
    // Keep storage in sync with any manual mid-session theme changes
    localStorage.setItem(THEME_STORAGE_KEY, currentTheme)
  }, [currentTheme])

  const cycleTheme = useCallback(() => {
    setCurrentTheme(t => THEME_ORDER[(THEME_ORDER.indexOf(t) + 1) % THEME_ORDER.length])
  }, [])

  const value = {
    currentTheme,
    setCurrentTheme,
    cycleTheme,
    config: getTheme(currentTheme),    // { nav, background, heroAnim, scroll, … }
    themes: themeConfig,
    order: THEME_ORDER,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
