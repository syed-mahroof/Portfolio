/* EmberOverlayNav — bold hamburger opens a full-screen overlay that slams down. */
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_ITEMS, scrollToSection, useActiveSection } from '../../theme/navItems'
import './nav.css'

const EmberOverlayNav = () => {
  const active = useActiveSection()
  const [open, setOpen] = useState(false)
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])
  const go = (id) => { setOpen(false); setTimeout(() => scrollToSection(id), 150) }

  return (
    <>
      <div className="ember-bar">
        <span className="ember-logo">SM<span className="ember-slash">/</span></span>
        <button className={`ember-burger ${open ? 'on' : ''}`} onClick={() => setOpen(o => !o)} aria-label="Menu" aria-expanded={open}>
          <span /><span /><span />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="ember-overlay"
            initial={{ y: '-100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}>
            <ul>
              {NAV_ITEMS.map((item, i) => (
                <motion.li key={item.id}
                  initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.12 + i * 0.06, type: 'spring', stiffness: 400, damping: 22 }}>
                  <button className={active === item.id ? 'active' : ''} onClick={() => go(item.id)}>
                    <span className="ember-num">0{i + 1}</span>{item.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
export default EmberOverlayNav
