import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const themes = {
  cyber: {
    name: 'Cyber',
    icon: '⚡',
    vars: {
      '--bg-primary': '#000000',
      '--bg-secondary': '#0a0a0a',
      '--bg-card': '#111111',
      '--accent-1': '#f86f6f',
      '--accent-2': '#11d1dc',
      '--accent-3': '#67017a',
      '--text-primary': '#f0f8ff',
      '--text-secondary': '#aaaaaa',
      '--border-color': '#f86f6f',
      '--nav-bg': 'rgba(10,10,10,0.97)',
      '--card-shadow': '0 0 30px rgba(248,111,111,0.15)',
      '--glow-1': 'rgba(248,111,111,0.4)',
      '--glow-2': 'rgba(17,209,220,0.4)',
      '--gradient-hero': 'radial-gradient(ellipse at 20% 50%, rgba(248,111,111,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(17,209,220,0.06) 0%, transparent 60%)',
    }
  },
  aurora: {
    name: 'Aurora',
    icon: '🌌',
    vars: {
      '--bg-primary': '#040b14',
      '--bg-secondary': '#071520',
      '--bg-card': '#0a1f2e',
      '--accent-1': '#00e5ff',
      '--accent-2': '#69ff47',
      '--accent-3': '#7b2ff7',
      '--text-primary': '#e8f4f8',
      '--text-secondary': '#7fb3c8',
      '--border-color': '#00e5ff',
      '--nav-bg': 'rgba(4,11,20,0.97)',
      '--card-shadow': '0 0 30px rgba(0,229,255,0.1)',
      '--glow-1': 'rgba(0,229,255,0.5)',
      '--glow-2': 'rgba(105,255,71,0.4)',
      '--gradient-hero': 'radial-gradient(ellipse at 30% 40%, rgba(123,47,247,0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(0,229,255,0.08) 0%, transparent 50%)',
    }
  },
  ember: {
    name: 'Ember',
    icon: '🔥',
    vars: {
      '--bg-primary': '#0d0500',
      '--bg-secondary': '#160a00',
      '--bg-card': '#1f1000',
      '--accent-1': '#ff6b2b',
      '--accent-2': '#ffcc00',
      '--accent-3': '#c0392b',
      '--text-primary': '#fff8f0',
      '--text-secondary': '#c4956a',
      '--border-color': '#ff6b2b',
      '--nav-bg': 'rgba(13,5,0,0.97)',
      '--card-shadow': '0 0 30px rgba(255,107,43,0.15)',
      '--glow-1': 'rgba(255,107,43,0.5)',
      '--glow-2': 'rgba(255,204,0,0.4)',
      '--gradient-hero': 'radial-gradient(ellipse at 20% 60%, rgba(192,57,43,0.15) 0%, transparent 50%), radial-gradient(ellipse at 75% 40%, rgba(255,107,43,0.08) 0%, transparent 50%)',
    }
  },
  frost: {
    name: 'Frost',
    icon: '❄️',
    vars: {
      '--bg-primary': '#f0f4f8',
      '--bg-secondary': '#e4ecf4',
      '--bg-card': '#ffffff',
      '--accent-1': '#1a73e8',
      '--accent-2': '#0f9d9d',
      '--accent-3': '#6a1b9a',
      '--text-primary': '#1a2332',
      '--text-secondary': '#546e8a',
      '--border-color': '#1a73e8',
      '--nav-bg': 'rgba(240,244,248,0.97)',
      '--card-shadow': '0 4px 20px rgba(26,115,232,0.12)',
      '--glow-1': 'rgba(26,115,232,0.3)',
      '--glow-2': 'rgba(15,157,157,0.3)',
      '--gradient-hero': 'radial-gradient(ellipse at 20% 50%, rgba(26,115,232,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(106,27,154,0.04) 0%, transparent 60%)',
    }
  }
}

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('cyber')

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme')
    if (saved && themes[saved]) setCurrentTheme(saved)
  }, [])

  useEffect(() => {
    const theme = themes[currentTheme]
    const root = document.documentElement
    Object.entries(theme.vars).forEach(([key, val]) => {
      root.style.setProperty(key, val)
    })
    localStorage.setItem('portfolio-theme', currentTheme)
    document.body.setAttribute('data-theme', currentTheme)
  }, [currentTheme])

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)