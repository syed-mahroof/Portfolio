/* NebulaBubbleMenu — floating bottom-center bubble menu with GSAP bounce physics.
   This is a faithful, dependency-real scaffold of the ReactBits BubbleMenu:
   drop the official ReactBits BubbleMenu markup into the <ul> and keep this shell,
   or keep this working version. */
import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { NAV_ITEMS, scrollToSection, useActiveSection } from '../../theme/navItems'
import './nav.css'

const NebulaBubbleMenu = () => {
  const active = useActiveSection()
  const [open, setOpen] = useState(false)
  const itemsRef = useRef([])

  useEffect(() => {
    const els = itemsRef.current.filter(Boolean)
    if (open) {
      gsap.fromTo(els,
        { scale: 0, y: 24, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: 'back.out(2.2)', stagger: 0.05 })
    }
  }, [open])

  const go = (id) => { scrollToSection(id); setOpen(false) }
  return (
    <nav className="bubble-menu" aria-label="Primary">
      <ul className={`bubble-items ${open ? 'open' : ''}`}>
        {NAV_ITEMS.map((item, i) => (
          <li key={item.id} ref={el => itemsRef.current[i] = el} style={{ pointerEvents: open ? 'auto' : 'none' }}>
            <button className={`bubble ${active === item.id ? 'active' : ''}`} onClick={() => go(item.id)} title={item.label}>
              <i className={`fa-solid ${item.icon}`} />
            </button>
          </li>
        ))}
      </ul>
      <button className={`bubble-fab ${open ? 'on' : ''}`} onClick={() => setOpen(o => !o)} aria-label="Menu">
        <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-compass'}`} />
      </button>
    </nav>
  )
}
export default NebulaBubbleMenu
