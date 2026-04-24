// Hero.jsx
import React, { useEffect, useState } from 'react'
import '../styles/Hero.css'

const roles = [
  'Backend Developer',
  'Full Stack Developer',
  'React Enthusiast',
  'Django Developer',
  'REST API Builder'
]

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    let timeout
    const current = roles[roleIndex]
    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
      } else {
        timeout = setTimeout(() => setTyping(false), 1800)
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45)
      } else {
        setRoleIndex((prev) => (prev + 1) % roles.length)
        setTyping(true)
      }
    }
    return () => clearTimeout(timeout)
  }, [displayed, typing, roleIndex])

  return (
    <div id="top" className="main">
      <div className="hero-bg">
        <div className="hero-orb orb-1"></div>
        <div className="hero-orb orb-2"></div>
        <div className="hero-grid"></div>
      </div>

      <div id="name">
        <div className="hero-greeting">Hello, I'm</div>
        <h1 className="syed"><strong>Syed</strong></h1>
        <h1 className="mah"><strong>Mahroof</strong></h1>

        <div className="typewriter-container">
          <span className="typewriter-prefix">I'm a </span>
          <span className="typewriter-text">{displayed}</span>
          <span className="typewriter-cursor">|</span>
        </div>

        <p className="hero-tagline">I design and build things on the internet</p>

        <div id="icons">
          <a href="https://www.linkedin.com/in/syed-mahroof-449074269/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i id="lin" className="fa-brands fa-linkedin"></i>
          </a>
          <a href="https://github.com/syed-mahroof" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <i id="gi" className="fa-brands fa-github"></i>
          </a>
          <a href="https://www.instagram.com/_syed.mahroof_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i id="insta" className="fa-brands fa-instagram"></i>
          </a>
          <a href="https://www.facebook.com/syed.mahroof.39" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <i id="fac" className="fa-brands fa-facebook"></i>
          </a>
          <a href="https://x.com/SyedMahroof10" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter">
            <i id="x" className="fa-brands fa-x-twitter"></i>
          </a>
        </div>

        <div className="hero-cta">
          <a href="#projects-section" className="cta-btn primary" onClick={(e) => {
            e.preventDefault()
            document.querySelector('#projects-section')?.scrollIntoView({ behavior: 'smooth' })
          }}>
            View Projects <i className="fa-solid fa-arrow-right"></i>
          </a>
          <a href="#con-section" className="cta-btn secondary" onClick={(e) => {
            e.preventDefault()
            document.querySelector('#con-section')?.scrollIntoView({ behavior: 'smooth' })
          }}>
            Contact Me
          </a>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </div>
  )
}

export default Hero