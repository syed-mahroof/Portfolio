import React, { useState, useEffect } from 'react'
import '../styles/Navbar.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('#top')

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // Update active section based on scroll position
      const sections = ['#top', '#ab-section', '#sk-section', '#projects-section', '#work-section', '#con-section']
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.querySelector(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    closeMenu()
    
    let targetPosition = 0
    if (targetId !== '#top') {
      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        targetPosition = targetElement.offsetTop - 60
      }
    }
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    })
  }

  const navItems = [
    { id: '#top', label: 'Home', icon: 'fa-house' },
    { id: '#ab-section', label: 'About', icon: 'fa-user' },
    { id: '#sk-section', label: 'Skills', icon: 'fa-code' },
    { id: '#projects-section', label: 'Projects', icon: 'fa-folder-open' },
    { id: '#work-section', label: 'Experience', icon: 'fa-briefcase' },
    { id: '#con-section', label: 'Contact', icon: 'fa-envelope' }
  ]

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && <div className="navbar-overlay" onClick={closeMenu}></div>}
      
      <nav className={`nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-content">
          <div className="nav-left">
            <a href="#top" onClick={(e) => handleNavClick(e, '#top')} className="logo-link">
              <button id="symbol" type="button" aria-label="Home">
                <span className="logo-text">SM</span>
                <span className="logo-ripple"></span>
              </button>
            </a>
          </div>

          <div className={`navbar ${isMenuOpen ? 'active' : ''}`}>
            <div className="navbar-content">
              <div className="mobile-header">
                <div className="mobile-logo">
                  <span className="logo-text-mobile">SM</span>
                  <span className="logo-subtitle">Portfolio</span>
                </div>
                <button className="close-menu" onClick={closeMenu} aria-label="Close menu">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              
              <ul className="nav-list">
                {navItems.map((item) => (
                  <li key={item.id} className="nav-item">
                    <a 
                      href={item.id} 
                      onClick={(e) => handleNavClick(e, item.id)}
                      className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                    >
                      <i className={`fa-solid ${item.icon} nav-icon`}></i>
                      <span className="nav-text">{item.label}</span>
                      <span className="nav-indicator"></span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mobile-footer">
                <a 
                  href="https://drive.google.com/file/d/1pCzJs95gVXa7WeTc51vFkdDJxIRd3jTm/view?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mobile-resume-link"
                >
                  <button id="mobile-resume-btn" type="button">
                    <i className="fa-solid fa-download"></i>
                    Download Resume
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div className="nav-right">
            <a 
              href="https://drive.google.com/file/d/1pCzJs95gVXa7WeTc51vFkdDJxIRd3jTm/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="resume-link"
            >
              <button id="resume-btn" type="button">
                <i className="fa-solid fa-download resume-icon"></i>
                <span>Resume</span>
              </button>
            </a>
            
            <button 
              className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Spacer to prevent content jump */}
      <div className="nav-spacer"></div>
    </>
  )
}

export default Navbar