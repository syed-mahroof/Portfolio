// Hero.jsx — cinematic mask-reveal hero with scroll parallax
import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import MagneticButton from '../components/MagneticButton'
import ThemedHeroTitle from '../components/ThemedHeroTitle'
import { useUISound } from '../hooks/useUISound'
import '../styles/Hero.css'

const roles = [
  'scalable full-stack apps',
  'Django REST APIs',
  'real-time WebSocket systems',
  'React experiences',
  'AWS cloud deployments'
]

const metrics = [
  { value: '40%', label: 'faster DB queries' },
  { value: '99%', label: 'production uptime' },
  { value: 'REST + WS', label: 'realtime architectures' }
]

const EASE = [0.16, 1, 0.3, 1]
const rise = {
  hidden: { y: '125%' },
  show: (i = 0) => ({ y: '0%', transition: { duration: 1.05, ease: EASE, delay: 0.2 + i * 0.09 } })
}
const fade = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: 0.7 + i * 0.08 } })
}

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)
  const heroRef = useRef(null)
  const { hover } = useUISound()

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '38%'])
  const yTag = useTransform(scrollYProgress, [0, 1], ['0%', '90%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])

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
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
      } else {
        setRoleIndex((prev) => (prev + 1) % roles.length)
        setTyping(true)
      }
    }
    return () => clearTimeout(timeout)
  }, [displayed, typing, roleIndex])

  const smoothTo = (sel) => (e) => {
    e.preventDefault()
    document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div id="top" className="main" ref={heroRef}>
      <motion.div className="hero-glow" style={{ y: glowY }} aria-hidden="true" />

      <motion.div id="name" style={{ y: yText, opacity }}>
        <motion.div
          className="hero-greeting"
          variants={fade} initial="hidden" animate="show" custom={0}
        >
          <span className="eyebrow">Battle-tested · Production-ready</span>
        </motion.div>

        <h1 className="hero-name">
          <ThemedHeroTitle text="Syed Mahroof" as="span" className="hero-name-inner" />
        </h1>

        <motion.div className="typewriter-container" variants={fade} initial="hidden" animate="show" custom={1}>
          <span className="typewriter-prefix">I build </span>
          <span className="typewriter-text">{displayed}</span>
          <span className="typewriter-cursor">|</span>
        </motion.div>

        <motion.p className="hero-tagline" variants={fade} initial="hidden" animate="show" custom={2} style={{ y: yTag }}>
          Full-Stack Developer shipping end-to-end scalable apps — Django REST &amp; React,
          heavy REST API &amp; WebSocket architectures, and robust AWS cloud deployments.
        </motion.p>

        <motion.div className="hero-metrics" variants={fade} initial="hidden" animate="show" custom={3}>
          {metrics.map((m, i) => (
            <div className="metric-chip glass" key={i}>
              <span className="metric">{m.value}</span>
              <span className="metric-label">{m.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div id="icons" variants={fade} initial="hidden" animate="show" custom={4}>
          {[
            { href: 'https://www.linkedin.com/in/syed-mahroof-449074269/', icon: 'fa-linkedin', id: 'lin', label: 'LinkedIn' },
            { href: 'https://github.com/syed-mahroof', icon: 'fa-github', id: 'gi', label: 'GitHub' },
            { href: 'https://www.instagram.com/_syed.mahroof_/', icon: 'fa-instagram', id: 'insta', label: 'Instagram' },
            { href: 'https://www.facebook.com/syed.mahroof.39', icon: 'fa-facebook', id: 'fac', label: 'Facebook' },
            { href: 'https://x.com/SyedMahroof10', icon: 'fa-x-twitter', id: 'x', label: 'X / Twitter' }
          ].map((s) => (
            <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} onMouseEnter={hover}>
              <i id={s.id} className={`fa-brands ${s.icon}`}></i>
            </a>
          ))}
        </motion.div>

        <motion.div className="hero-cta" variants={fade} initial="hidden" animate="show" custom={5}>
          <MagneticButton as="a" href="#projects-section" className="cta-btn primary" onClick={smoothTo('#projects-section')}>
            View Projects <i className="fa-solid fa-arrow-right"></i>
          </MagneticButton>
          <MagneticButton as="a" href="#con-section" className="cta-btn secondary" onClick={smoothTo('#con-section')}>
            Contact Me
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div className="scroll-indicator" style={{ opacity }}>
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </motion.div>
    </div>
  )
}

export default Hero
