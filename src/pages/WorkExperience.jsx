// WorkExperience.jsx — living SVG timeline that draws to scroll position
import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import '../styles/WorkExperience.css'

const experiences = [
  {
    title: 'Junior Backend Developer (Python)',
    company: 'Al Imtedad Solutions',
    location: 'Trivandrum, Kerala',
    duration: 'Dec 2025 – Apr 2026',
    badge: '🟢 Recent',
    statusColor: 'green',
    description: [
      'Built 6+ admin modules with full CRUD backing IPTV / Digital Signage content operations.',
      'Designed and integrated IPTV / EPG endpoints, verifying schedule and channel payloads on target devices.',
      'Drove a 25% defect reduction through systematic Postman regression testing across all endpoints.',
      'Delivered fixes inside Agile sprint timelines, pairing with senior developers on backend debugging.'
    ],
    tech: ['Python', 'Django', 'REST API', 'IPTV / EPG', 'Postman', 'Agile']
  },
  {
    title: 'IT Support Engineer',
    company: 'Safecare Technology',
    location: 'Muvattupuzha, Kerala',
    duration: 'May 2025 – Nov 2025',
    badge: '⚪ Completed',
    statusColor: 'gray',
    description: [
      'Maintained 99% hospital software uptime across multiple departments and daily clinical workflows.',
      'Cut average resolution time by 30% by building repeatable, automated troubleshooting playbooks.',
      'Ran system monitoring, scheduled backups and issue documentation for faster future recovery.'
    ],
    tech: ['System Support', 'Automation', 'Monitoring', 'Networking', 'Documentation']
  },
  {
    title: 'Full-Stack Web Developer (Freelance)',
    company: 'Remote / Multi-Client',
    location: 'Remote',
    duration: '2025 – Present',
    badge: '🔵 Ongoing',
    statusColor: 'blue',
    description: [
      "Built Driver's Diary PWA — a multi-role Admin/Driver platform with offline capability and automated payroll.",
      'Achieved 40% dashboard query performance gains using composite PostgreSQL indexes.',
      'Decoupled and rebuilt Soorath Autos on Django REST + React, deployed with AWS S3 and Nginx.',
      'Shipped JWT auth, role-based access and full SEO pipelines across production client projects.'
    ],
    tech: ['React', 'Django REST', 'PostgreSQL', 'AWS S3', 'Nginx', 'JWT']
  }
]

const EASE = [0.16, 1, 0.3, 1]

const TimelineNode = ({ exp, index }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'center 55%'] })
  const glow = useTransform(scrollYProgress, [0, 1], [0, 1])
  const side = index % 2 === 0 ? 'left' : 'right'

  return (
    <div className={`tl-row ${side}`} ref={ref}>
      <motion.span className="tl-node" style={{ scale: useTransform(glow, [0, 1], [0.6, 1]), opacity: useTransform(glow, [0, 1], [0.35, 1]) }}>
        <motion.span className="tl-node-aura" style={{ opacity: glow, scale: useTransform(glow, [0, 1], [0.5, 1.8]) }} />
      </motion.span>

      <motion.article
        className="exp-card glass glass-glow glass-card"
        initial={{ opacity: 0, y: 40, x: side === 'left' ? -30 : 30 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <header className="exp-header">
          <div>
            <h3 className="exp-title">{exp.title}</h3>
            <div className="exp-company"><i className="fa-solid fa-building"></i> {exp.company}</div>
            <div className="exp-location"><i className="fa-solid fa-location-dot"></i> {exp.location}</div>
          </div>
          <div className="exp-meta-right">
            <span className={`status-badge status-${exp.statusColor}`}>{exp.badge}</span>
            <div className="exp-duration"><i className="fa-solid fa-calendar"></i> {exp.duration}</div>
          </div>
        </header>
        <ul className="exp-details">
          {exp.description.map((d, i) => <li key={i}>{d}</li>)}
        </ul>
        <div className="exp-tech">
          {exp.tech.map((t, i) => <span key={i} className="exp-tech-tag">{t}</span>)}
        </div>
      </motion.article>
    </div>
  )
}

const WorkExperience = () => {
  const trackRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 80%', 'end 60%'] })
  const drawn = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <div className="work-experience" id="work-section">
      <div className="section-header">
        <span className="eyebrow">Career Timeline</span>
        <h2 id="work"><strong>Work <span className="gradient-text">Experience</span></strong></h2>
        <p className="section-subtitle">A production-tested journey across backend, support and full-stack delivery.</p>
      </div>

      <div className="timeline" ref={trackRef}>
        <div className="tl-axis">
          <div className="tl-axis-bg" />
          <motion.div className="tl-axis-fill" style={{ scaleY: drawn }} />
        </div>
        {experiences.map((exp, i) => <TimelineNode key={i} exp={exp} index={i} />)}
      </div>
    </div>
  )
}

export default WorkExperience
