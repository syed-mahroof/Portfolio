// src/components/Footer.jsx
import React from 'react'
import '../styles/Footer.css'

const Footer = () => {
  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    
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

  const socialLinks = [
    { href: 'https://www.linkedin.com/in/syed-mahroof-449074269/', icon: 'fa-linkedin' },
    { href: 'https://github.com/syed-mahroof', icon: 'fa-github' },
    { href: 'https://www.instagram.com/_syed.mahroof_/', icon: 'fa-instagram' },
    { href: 'https://www.facebook.com/syed.mahroof.39', icon: 'fa-facebook' },
    { href: 'https://x.com/SyedMahroof10', icon: 'fa-x-twitter' }
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
      <div className="footer-overlay"></div>
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-heading">Thank You for Visiting! 👋</h3>
          <p>Grateful for your time exploring my portfolio — I hope it inspired you.</p>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Connect with Me</h3>
          <div className="footer-social">
            {socialLinks.map((link, index) => (
              <a key={index} href={link.href} target="_blank" rel="noopener noreferrer">
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
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Contact Info</h3>
          <p><i className="fa-solid fa-phone"></i> 7025195638</p>
          <p><i className="fa-solid fa-envelope"></i> syedmahroof2002@gmail.com</p>
        </div>
      </div>

      <div className="footer-divider"></div>
      <div className="footer-credit">
        <span>© {new Date().getFullYear()} Designed with ❤️ by </span>
        <span className="footer-author">Syed Mahroof</span>
      </div>
    </footer>
  )
}

export default Footer;
