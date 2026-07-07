/* navItems.js — shared navigation model + smooth scroll used by ALL 5 navs,
   so switching navigation components never changes the destinations. */
export const NAV_ITEMS = [
  { id: '#top', label: 'Home', icon: 'fa-house' },
  { id: '#ab-section', label: 'About', icon: 'fa-user' },
  { id: '#sk-section', label: 'Skills', icon: 'fa-code' },
  { id: '#projects-section', label: 'Work', icon: 'fa-folder-open' },
  { id: '#work-section', label: 'Experience', icon: 'fa-briefcase' },
  { id: '#con-section', label: 'Contact', icon: 'fa-envelope' },
]

export const scrollToSection = (id, offset = 72) => {
  if (id === '#top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
  const el = document.querySelector(id)
  if (el) window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' })
}

/* scroll-spy hook: returns the currently active section id */
import { useEffect, useState } from 'react'
export const useActiveSection = () => {
  const [active, setActive] = useState('#top')
  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + 120
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = NAV_ITEMS[i].id === '#top' ? { offsetTop: 0 } : document.querySelector(NAV_ITEMS[i].id)
        if (el && el.offsetTop <= pos) { setActive(NAV_ITEMS[i].id); break }
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return active
}
