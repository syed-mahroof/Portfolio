import React, { useState } from 'react'
import { useTheme, themes } from '../context/ThemeContext'
import '../styles/ThemeSwitcher.css'

const ThemeSwitcher = () => {
  const { currentTheme, setCurrentTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`theme-switcher ${isOpen ? 'open' : ''}`}>
      <button
        className="theme-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change theme"
        title="Change theme"
      >
        <span className="theme-icon">{themes[currentTheme].icon}</span>
        <span className="theme-label">{themes[currentTheme].name}</span>
        <span className="theme-chevron">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="theme-panel">
          <p className="theme-panel-title">Choose Theme</p>
          <div className="theme-options">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                className={`theme-option ${currentTheme === key ? 'active' : ''}`}
                onClick={() => { setCurrentTheme(key); setIsOpen(false) }}
              >
                <span className="t-icon">{theme.icon}</span>
                <span className="t-name">{theme.name}</span>
                <div className="t-preview">
                  <span style={{ background: theme.vars['--accent-1'] }}></span>
                  <span style={{ background: theme.vars['--accent-2'] }}></span>
                  <span style={{ background: theme.vars['--accent-3'] }}></span>
                </div>
                {currentTheme === key && <span className="t-check">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ThemeSwitcher