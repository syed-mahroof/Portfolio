/* AuroraGlassNav — frosted top navbar that vanishes on scroll-down, returns on scroll-up. */
import React, { useState, useEffect, useRef } from 'react'
import { NAV_ITEMS, scrollToSection, useActiveSection } from '../../theme/navItems'
import './nav.css'

const AuroraGlassNav = () => {
  const active = useActiveSection()
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > 120 && y > lastY.current)   // hide when scrolling down past hero
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => { scrollToSection(id); setOpen(false) }
  return (
    <nav className={`aurora-nav ${hidden ? 'hidden' : ''}`} aria-label="Primary">
      <a className="aurora-logo" href="#top" onClick={(e) => { e.preventDefault(); go('#top') }}>SM</a>
      <button className="aurora-burger" onClick={() => setOpen(o => !o)} aria-label="Menu" aria-expanded={open}>
        <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'}`} />
      </button>
      <ul className={`aurora-links ${open ? 'open' : ''}`}>
        {NAV_ITEMS.map(item => (
          <li key={item.id}>
            <a href={item.id} onClick={(e) => { e.preventDefault(); go(item.id) }} className={active === item.id ? 'active' : ''}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
export default AuroraGlassNav
