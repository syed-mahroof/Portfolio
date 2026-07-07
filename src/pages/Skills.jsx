// Skills.jsx — categorized elastic skill grid + certifications
import React from 'react'
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion'
import CiscoIcon from '../components/CiscoIcon'
import '../styles/Skills.css'

const categories = [
  { name: 'Languages', icon: 'fa-code', items: ['Python', 'JavaScript', 'Java', 'C', 'C++', 'SQL'] },
  { name: 'Backend / DBs', icon: 'fa-server', items: ['Django', 'Django REST', 'PostgreSQL', 'MySQL', 'SQLite'] },
  { name: 'Frontend', icon: 'fa-laptop-code', items: ['React', 'Vite', 'HTML5', 'CSS3', 'Bootstrap', 'Tailwind'] },
  { name: 'Real-Time / Async', icon: 'fa-bolt', items: ['Django Channels', 'WebSockets', 'Celery', 'Redis'] },
  { name: 'Cloud / DevOps', icon: 'fa-cloud', items: ['AWS EC2', 'AWS S3', 'AWS Amplify', 'Nginx', 'Docker'] },
  { name: 'Testing / Tools', icon: 'fa-toolbox', items: ['Postman', 'Git', 'GitHub', 'JWT Auth', 'PyCharm', 'VS Code'] }
]

const certifications = [
  { name: 'AWS Cloud Practitioner Essentials', year: '2026', icon: 'fa-aws', brand: true },
  { name: 'Google AI Essentials', year: '2026', icon: 'fa-google', brand: true },
  { name: 'Introduction to Cybersecurity', year: '2026', icon: 'cisco-svg', isCustom: true }
]

// spring config drives the "bounce" — organic overshoot
const spring = { type: 'spring', stiffness: 260, damping: 14, mass: 0.7 }

const Badge = ({ label, index, velFactor }) => {
  // reacts to scroll speed: faster scroll → slightly bigger initial displacement
  const rotate = index % 2 === 0 ? -6 : 6
  return (
    <motion.span
      className="skill-badge"
      initial={{ opacity: 0, scale: 0.4, y: 30, rotate }}
      whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ ...spring, delay: index * 0.04 }}
      whileHover={{ scale: 1.12, y: -4 }}
      style={{ y: velFactor }}
    >
      {label}
    </motion.span>
  )
}

const Skills = () => {
  // global scroll velocity → subtle skew on the whole grid while flinging
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smoothVel = useSpring(velocity, { stiffness: 300, damping: 40 })
  const skew = useTransform(smoothVel, [-2000, 0, 2000], [3, 0, -3], { clamp: true })
  const drift = useTransform(smoothVel, [-2000, 0, 2000], [10, 0, -10], { clamp: true })

  return (
    <div className="skills" id="sk-section">
      <div className="section-header">
        <span className="eyebrow">Toolbox</span>
        <h2 id="sk"><strong>Technical <span className="gradient-text">Skills</span></strong></h2>
        <p className="section-subtitle">The stack I use to design, build and ship production systems.</p>
      </div>

      <motion.div className="skills-grid" style={{ skewY: skew }}>
        {categories.map((cat, ci) => (
          <motion.div
            key={ci}
            className="skill-cat glass glass-card"
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (ci % 3) * 0.08 }}
          >
            <div className="skill-cat-head">
              <i className={`fa-solid ${cat.icon}`}></i>
              <h3>{cat.name}</h3>
            </div>
            <div className="skill-badges">
              {cat.items.map((item, i) => (
                <Badge key={i} label={item} index={i} velFactor={drift} />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="certs">
        <h3 className="certs-title">Certifications</h3>
        <div className="certs-row">
          {certifications.map((c, i) => (
            <motion.div
              key={i}
              className="cert-card glass glass-glow glass-card"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ ...spring, delay: i * 0.1 }}
            >
              {c.isCustom && c.icon === 'cisco-svg' ? (
                <i><CiscoIcon /></i>
              ) : (
                <i className={`${c.brand ? 'fa-brands' : 'fa-solid'} ${c.icon}`}></i>
              )}
              <div className="cert-body">
                <span className="cert-name">{c.name}</span>
                <span className="cert-year">{c.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Skills
