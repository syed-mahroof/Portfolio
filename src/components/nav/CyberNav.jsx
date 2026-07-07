/* CyberNav — rigid terminal / hacker top bar. Mobile: collapses to a console dropdown. */
import React, { useState } from 'react'
import { NAV_ITEMS, scrollToSection, useActiveSection } from '../../theme/navItems'
import './nav.css'

const CyberNav = () => {
  const active = useActiveSection()
  const [open, setOpen] = useState(false)
  const go = (id) => { scrollToSection(id); setOpen(false) }
  return (
    <nav className="cyber-nav" role="navigation" aria-label="Primary">
      <div className="cyber-prompt">
        <span className="cyber-dot" /> <span className="cyber-user">syed@portfolio</span>:<span className="cyber-path">~</span>$
      </div>
      <button className={`cyber-burger ${open ? 'on' : ''}`} onClick={() => setOpen(o => !o)} aria-label="Toggle menu" aria-expanded={open}>
        {open ? 'x' : '_'}
      </button>
      <ul className={`cyber-links ${open ? 'open' : ''}`}>
        {NAV_ITEMS.map(item => (
          <li key={item.id}>
            <a href={item.id} onClick={(e) => { e.preventDefault(); go(item.id) }}
               className={active === item.id ? 'active' : ''} data-text={item.label}>
              <span className="br">[</span>{item.label}<span className="br">]</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
export default CyberNav
