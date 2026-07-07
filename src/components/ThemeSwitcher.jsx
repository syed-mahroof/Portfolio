import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useUISound } from '../hooks/useUISound'
import '../styles/ThemeSwitcher.css'

/* ── spring configs ───────────────────────────────────────────── */
const MENU_SPRING  = { type: 'spring', stiffness: 380, damping: 28, mass: 0.6 }
const ITEM_SPRING  = { type: 'spring', stiffness: 420, damping: 32, mass: 0.5 }
const SWATCH_SPRING = { type: 'spring', stiffness: 500, damping: 35 }

/* ── animation variants ──────────────────────────────────────── */
const menuVariants = {
  hidden : { opacity: 0, scale: 0.88, y: -12 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { ...MENU_SPRING, staggerChildren: 0.048, delayChildren: 0.04 }
  },
  exit   : { opacity: 0, scale: 0.92, y: -8, transition: { duration: 0.18, ease: 'easeIn' } }
}

const itemVariants = {
  hidden : { opacity: 0, x: -10, y: 4 },
  visible: { opacity: 1, x: 0,  y: 0, transition: ITEM_SPRING }
}

const swatchVariants = {
  hidden : { opacity: 0, scale: 0.5 },
  visible: (i) => ({ opacity: 1, scale: 1, transition: { ...SWATCH_SPRING, delay: i * 0.04 } })
}

const ThemeSwitcher = () => {
  const { currentTheme, setCurrentTheme, themes, order } = useTheme()
  const { click, hover } = useUISound()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  const active = themes[currentTheme]

  /* ── close on outside click ───────────────────────────────── */
  useEffect(() => {
    if (!isOpen) return
    const handleOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    const handleKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('touchstart', handleOutside)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('touchstart', handleOutside)
      document.removeEventListener('keydown', handleKey)
    }
  }, [isOpen])

  const handleSelect = (key) => {
    click()
    setCurrentTheme(key)
    setIsOpen(false)
  }

  return (
    <div className="ts-root" ref={containerRef}>

      {/* ── trigger pill ──────────────────────────────────────── */}
      <motion.button
        className="ts-trigger"
        onClick={() => { click(); setIsOpen(o => !o) }}
        onMouseEnter={hover}
        aria-label="Change theme"
        aria-expanded={isOpen}
        whileHover={{ scale: 1.04, y: -1 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <motion.span
          key={currentTheme + '-icon'}
          className="ts-trigger-icon"
          initial={{ scale: 0.6, opacity: 0, rotate: -30 }}
          animate={{ scale: 1,   opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        >
          {active.icon}
        </motion.span>

        <motion.span
          key={currentTheme + '-name'}
          className="ts-trigger-name"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
        >
          {active.name}
        </motion.span>

        <motion.span
          className="ts-trigger-chevron"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          aria-hidden="true"
        >
          ▾
        </motion.span>
      </motion.button>

      {/* ── dropdown panel ────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ts-panel"
            role="listbox"
            aria-label="Select theme"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* inner glow ring */}
            <div className="ts-panel-glow" aria-hidden="true" />

            <p className="ts-panel-heading">Choose Atmosphere</p>

            <div className="ts-options">
              {order.map((key) => {
                const theme = themes[key]
                const isActive = currentTheme === key

                return (
                  <motion.button
                    key={key}
                    className="ts-option"
                    role="option"
                    aria-selected={isActive}
                    variants={itemVariants}
                    whileHover={!isActive ? { scale: 1.02, x: 5 } : {}}
                    whileTap={{ scale: 0.97 }}
                    transition={ITEM_SPRING}
                    onClick={() => handleSelect(key)}
                    onMouseEnter={hover}
                  >
                    {/* sliding active pill — uses layoutId for fluid cross-item morph */}
                    {isActive && (
                      <motion.span
                        className="ts-active-pill"
                        layoutId="ts-active-pill"
                        transition={MENU_SPRING}
                        aria-hidden="true"
                      />
                    )}

                    {/* icon */}
                    <span className="ts-opt-icon">{theme.icon}</span>

                    {/* text meta */}
                    <span className="ts-opt-meta">
                      <span className="ts-opt-name">{theme.name}</span>
                      <span className="ts-opt-vibe">{theme.vibe}</span>
                    </span>

                    {/* color swatches */}
                    <div className="ts-opt-swatches">
                      {theme.swatch.map((c, i) => (
                        <motion.span
                          key={i}
                          className="ts-swatch"
                          style={{ background: c }}
                          custom={i}
                          variants={swatchVariants}
                        />
                      ))}
                    </div>

                    {/* checkmark */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          className="ts-check"
                          initial={{ scale: 0, opacity: 0, rotate: -45 }}
                          animate={{ scale: 1, opacity: 1, rotate: 0 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={SWATCH_SPRING}
                          aria-hidden="true"
                        >
                          ✓
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ThemeSwitcher
