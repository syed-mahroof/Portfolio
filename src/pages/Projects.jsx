// Projects.jsx — pinned horizontal showcase for the 3 heavy-hitters + secondary grid
import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { useUISound } from '../hooks/useUISound'
import '../styles/Projects.css'

const topProjects = [
  {
    title: 'TaskFlow',
    subtitle: 'Task & Project Management System',
    blurb: 'Real-time collaborative workspace with drag-and-drop kanban, live notifications and background job processing.',
    tech: ['React', 'Django REST', 'PostgreSQL', 'Redis', 'Celery', 'WebSockets', 'AWS S3', 'JWT'],
    details: [
      'Built a drag-and-drop kanban board with optimistic UI and JWT-secured multi-user boards.',
      'Wired real-time notifications over Django Channels + WebSockets so team updates land instantly.',
      'Offloaded heavy work (emails, exports, reminders) to Celery + Redis background workers.',
      'Stored attachments on AWS S3 with signed URLs and role-based access control.'
    ],
    links: [
      { label: 'Backend', href: 'https://github.com/MaCo-Labs/taskflow_backend', icon: 'fa-github', type: 'repo' },
      { label: 'Frontend', href: 'https://github.com/MaCo-Labs/taskflow_frontend', icon: 'fa-github', type: 'repo' }
    ]
  },
  {
    title: "Driver's Diary",
    subtitle: 'Cab Management Platform',
    blurb: 'Multi-role Admin / Driver PWA with offline capability and one-click automated payroll.',
    tech: ['React', 'Django REST', 'PostgreSQL', 'Openpyxl', 'JWT'],
    details: [
      'Shipped a multi-role Admin/Driver PWA with installable, offline-first capabilities.',
      'Boosted dashboard query performance 40% using composite PostgreSQL indexes.',
      'Automated payroll with Openpyxl-generated Excel reports straight from trip data.',
      'Secured every role boundary with JWT auth and granular permissions.'
    ],
    links: [
      { label: 'Live', href: 'https://headgreen.in', icon: 'fa-arrow-up-right-from-square', type: 'live' },
      { label: 'Backend', href: 'https://github.com/syed-mahroof/Driver-s-Diary-Backend-', icon: 'fa-github', type: 'repo' },
      { label: 'Frontend', href: 'https://github.com/syed-mahroof/Driver-s-Diary-Frontend-', icon: 'fa-github', type: 'repo' }
    ]
  },
  {
    title: 'Soorath Autos',
    subtitle: 'Used Car Dealership Platform',
    blurb: 'Production vehicle marketplace with advanced filtering and a secure admin dashboard.',
    tech: ['Django REST', 'React', 'PostgreSQL', 'AWS S3', 'JWT'],
    details: [
      'Rebuilt a fully decoupled marketplace: Django REST API + React (Vite) SPA behind Nginx.',
      'Implemented advanced multi-facet filtering and PostgreSQL trigram fuzzy search.',
      'Delivered a JWT-secured admin dashboard for inventory CRUD with AWS S3 image uploads.',
      'Added a full SEO pipeline: JSON-LD structured data, Open Graph and canonical URLs.'
    ],
    links: [
      { label: 'Live', href: 'https://soorathautos.in', icon: 'fa-arrow-up-right-from-square', type: 'live' }
    ]
  }
]

const moreProjects = [
  { title: 'Ananta Nethralaya', subtitle: 'Eye Care Center Website', tech: ['React', 'Tailwind', 'Vite'], link: 'https://www.anantanethralaya.org' },
  { title: 'Al Afzah Group', subtitle: 'Qatar Corporate Website', tech: ['React', 'Tailwind', 'Vite'], link: 'https://www.al-afzahgroup.com' },
  { title: 'HeadGreen!', subtitle: 'Solar-charged EV fleet & cab mobility platform', tech: ['React', 'Vanilla CSS', 'Vite'], link: 'https://headgreen.in' },
  { title: 'Netflix Clone', subtitle: 'Streaming UI w/ hover previews', tech: ['React', 'Redux', 'TMDB API'], link: 'https://github.com/syed-mahroof' },
  { title: 'Postgram', subtitle: 'Cyberbullying Detection (ML/NLP)', tech: ['Django', 'Python', 'ML'], link: 'https://github.com/syed-mahroof' }
]

const EASE = [0.16, 1, 0.3, 1]

const ProjectPanel = ({ p, index }) => {
  const { click, hover } = useUISound()
  return (
    <div className="proj-panel glass glass-glow glass-card">
      <span className="proj-index metric">0{index + 1}</span>
      <div className="proj-panel-body">
        <div className="proj-head">
          <h3 className="proj-title">{p.title}</h3>
          <p className="proj-subtitle">{p.subtitle}</p>
        </div>
        <p className="proj-blurb">{p.blurb}</p>
        <ul className="proj-details">
          {p.details.map((d, i) => <li key={i}>{d}</li>)}
        </ul>
        <div className="proj-tech">
          {p.tech.map((t, i) => <span className="proj-tech-tag" key={i}>{t}</span>)}
        </div>
        <div className="proj-links">
          {p.links.map((l, i) => (
            <a key={i} href={l.href} target="_blank" rel="noopener noreferrer"
               className={`proj-link ${l.type}`} onClick={click} onMouseEnter={hover}>
              <i className={`fa-solid ${l.icon === 'fa-github' ? '' : l.icon}`}></i>
              <i className={l.icon === 'fa-github' ? 'fa-brands fa-github' : ''}></i>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

const Projects = () => {
  const trackWrapRef = useRef(null)
  const trackRef = useRef(null)
  const [distance, setDistance] = useState(0)
  const [pinned, setPinned] = useState(true)

  const shouldReduceMotion = useReducedMotion()

  // measure how far the horizontal track must travel
  useEffect(() => {
    let timeoutId;
    const measure = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const wide = window.matchMedia('(min-width: 860px)').matches
        setPinned(wide && !shouldReduceMotion)
        if (trackRef.current) {
          setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth))
        }
      }, 150)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('resize', measure)
      clearTimeout(timeoutId)
    }
  }, [shouldReduceMotion])

  const { scrollYProgress } = useScroll({ target: trackWrapRef, offset: ['start start', 'end end'] })
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const x = useSpring(rawX, { stiffness: 90, damping: 22, mass: 0.5 })
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div className="projects" id="projects-section">
      <div className="section-header">
        <span className="eyebrow">Selected Work</span>
        <h2 id="projects"><strong>Production <span className="gradient-text">Projects</span></strong></h2>
        <p className="section-subtitle">Three heavy-hitters shipped to real users — scroll to move through them.</p>
      </div>

      {pinned ? (
        <section
          className="pin-wrap"
          ref={trackWrapRef}
          style={{ height: `${Math.max(distance, 1) + window.innerHeight}px` }}
        >
          <div className="pin-sticky">
            <motion.div className="pin-track" ref={trackRef} style={{ x }}>
              {topProjects.map((p, i) => <ProjectPanel key={i} p={p} index={i} />)}
            </motion.div>
            <div className="pin-progress"><motion.span style={{ width: progressWidth }} /></div>
          </div>
        </section>
      ) : (
        <div className="pin-track stacked" ref={trackRef}>
          {topProjects.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: EASE }}>
              <ProjectPanel p={p} index={i} />
            </motion.div>
          ))}
        </div>
      )}

      <div className="more-projects">
        <h3 className="more-title">More builds</h3>
        <div className="more-grid">
          {moreProjects.map((m, i) => (
            <motion.a key={i} href={m.link} target="_blank" rel="noopener noreferrer"
              className="more-card glass glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: EASE, delay: (i % 4) * 0.06 }}>
              <div className="more-head">
                <h4>{m.title}</h4>
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </div>
              <p className="more-sub">{m.subtitle}</p>
              <div className="more-tech">{m.tech.map((t, j) => <span key={j}>{t}</span>)}</div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects
