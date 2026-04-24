// src/components/Footer.jsx
import React from 'react'
import '../styles/Footer.css'

const Footer = () => {
  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    let targetPosition = 0
    if (targetId !== '#top') {
      const targetElement = document.querySelector(targetId)
      if (targetElement) targetPosition = targetElement.offsetTop - 60
    }
    window.scrollTo({ top: targetPosition, behavior: 'smooth' })
  }

  const socialLinks = [
    { href: 'https://www.linkedin.com/in/syed-mahroof-449074269/', icon: 'fa-linkedin', label: 'LinkedIn' },
    { href: 'https://github.com/syed-mahroof', icon: 'fa-github', label: 'GitHub' },
    { href: 'https://www.instagram.com/_syed.mahroof_/', icon: 'fa-instagram', label: 'Instagram' },
    { href: 'https://www.facebook.com/syed.mahroof.39', icon: 'fa-facebook', label: 'Facebook' },
    { href: 'https://x.com/SyedMahroof10', icon: 'fa-x-twitter', label: 'X' }
  ]

  const navLinks = [
    { id: '#top', label: 'Home' },
    { id: '#ab-section', label: 'About' },
    { id: '#sk-section', label: 'Skills' },
    { id: '#projects-section', label: 'Projects' },
    { id: '#work-section', label: 'Experience' },
    { id: '#con-section', label: 'Contact' }
  ]

  return (
    <footer className="footer">
      <div className="footer-glow"></div>
      <div className="footer-container">
        <div className="footer-section footer-brand">
          <div className="footer-logo">SM</div>
          <p className="footer-bio">
            Full Stack Developer based in Kerala, India. Building things for the web.
          </p>
          <div className="footer-social">
            {socialLinks.map((link, index) => (
              <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                <i className={`fa-brands ${link.icon}`}></i>
              </a>
            ))}
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={link.id} onClick={(e) => handleNavClick(e, link.id)}>
                  <i className="fa-solid fa-chevron-right"></i> {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Live Projects</h3>
          <ul className="footer-links">
            <li><a href="https://www.anantanethralaya.org" target="_blank" rel="noopener noreferrer"><i className="fa-solid fa-arrow-up-right-from-square"></i> Ananta Nethralaya</a></li>
            <li><a href="https://www.al-afzahgroup.com" target="_blank" rel="noopener noreferrer"><i className="fa-solid fa-arrow-up-right-from-square"></i> Al Afzah Group</a></li>
            <li><a href="https://soorathautos.in" target="_blank" rel="noopener noreferrer"><i className="fa-solid fa-arrow-up-right-from-square"></i> Soorath Autos</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Get in Touch</h3>
          <div className="footer-contact-items">
            <a href="tel:+917025195638" className="footer-contact-item">
              <i className="fa-solid fa-phone"></i>
              <span>+91 7025195638</span>
            </a>
            <a href="mailto:syedmahroof2002@gmail.com" className="footer-contact-item">
              <i className="fa-solid fa-envelope"></i>
              <span>syedmahroof2002@gmail.com</span>
            </a>
            <div className="footer-contact-item">
              <i className="fa-solid fa-location-dot"></i>
              <span>Muvattupuzha, Kerala, India</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-divider"></div>
      <div className="footer-credit">
        <span>© {new Date().getFullYear()} </span>
        <span className="footer-author">Syed Mahroof</span>
        <span> · Designed & Built with ❤️</span>
      </div>
    </footer>
  )
}

export default Footer