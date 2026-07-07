/* FrostDotNav — minimalist side-dot (pip) navigation tracking scroll position.
   Mobile: converts to a slim bottom pill row. */
import React from 'react'
import { NAV_ITEMS, scrollToSection, useActiveSection } from '../../theme/navItems'
import './nav.css'

const FrostDotNav = () => {
  const active = useActiveSection()
  return (
    <nav className="frost-dots" aria-label="Primary">
      {NAV_ITEMS.map(item => (
        <button key={item.id}
          className={`frost-dot ${active === item.id ? 'active' : ''}`}
          onClick={() => scrollToSection(item.id)}
          aria-label={item.label} aria-current={active === item.id}>
          <span className="frost-dot-label">{item.label}</span>
        </button>
      ))}
    </nav>
  )
}
export default FrostDotNav
