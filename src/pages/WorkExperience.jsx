import React, { useRef, useEffect, useState } from 'react'
import '../styles/WorkExperience.css'

const WorkExperience = () => {
  const [visibleCards, setVisibleCards] = useState([])
  const cardRefs = useRef([])

  const experiences = [
    {
      title: 'Trainee Backend Developer (Python)',
      company: 'Al Imtedad Solutions',
      location: 'Trivandrum, Kerala',
      duration: 'Dec 2025 – Present',
      status: 'Current',
      statusColor: 'green',
      badge: '🟢 Active',
      description: [
        'Developed and maintained backend admin modules for IPTV and Digital Signage platforms, supporting day-to-day content management operations.',
        'Integrated REST APIs with TV front-end UIs, verifying that channel data, digital signage content, and schedule payloads rendered correctly on target display devices.',
        'Conducted API testing using Postman to verify request/response accuracy, status codes, and payload structure across all exposed endpoints.',
        'Performed manual functional and regression testing on backend modules, identifying and documenting defects before production release.',
        'Collaborated with senior developers to debug backend issues and deliver fixes within defined sprint timelines.'
      ],
      tech: ['Python', 'Django', 'REST API', 'Postman', 'IPTV']
    },
    {
      title: 'IT Support Engineer',
      company: 'Safecare Technology',
      location: 'Muvattupuzha, Kerala',
      duration: 'May 2025 – Nov 2025',
      status: 'Completed',
      statusColor: 'gray',
      badge: '⚪ Completed',
      description: [
        'Provided IT support for hospital management software across multiple departments, maintaining uninterrupted daily operations.',
        'Diagnosed and resolved system and application issues, reducing downtime and ensuring workflow continuity.',
        'Assisted in system monitoring, scheduled backups, and issue documentation to enable faster future resolutions.'
      ],
      tech: ['IT Support', 'Hardware', 'Networking', 'Documentation']
    },
    {
      title: 'Full Stack Web Developer',
      company: 'Freelance',
      location: 'Remote',
      duration: '2024 – Present',
      status: 'Ongoing',
      statusColor: 'blue',
      badge: '🔵 Ongoing',
      description: [
        'Architected and delivered Soorath Autos — a live vehicle marketplace using React (Vite), Django REST Framework, PostgreSQL, and AWS S3.',
        'Built Ananta Nethralaya Eye Care Center website — a fully responsive healthcare site using React and Tailwind CSS, now live at anantanethralaya.org.',
        'Developed Al Afzah Group WLL corporate website — built the complete frontend for a Qatari MEP company, live at al-afzahgroup.com.',
        'Implemented JWT authentication, role-based access control, PostgreSQL fuzzy search, and full SEO pipelines across client projects.'
      ],
      tech: ['React', 'Django REST', 'PostgreSQL', 'AWS S3', 'JWT', 'Tailwind CSS']
    }
  ]

  useEffect(() => {
    const observers = cardRefs.current.map((ref, i) => {
      if (!ref) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => [...new Set([...prev, i])])
          }
        },
        { threshold: 0.15 }
      )
      obs.observe(ref)
      return obs
    })
    return () => observers.forEach(obs => obs?.disconnect())
  }, [])

  return (
    <div className="work-experience" id="work-section">
      <div className="section-header">
        <h2 id="work"><strong>Work Experience</strong></h2>
        <p className="section-subtitle">My professional journey so far</p>
      </div>

      <div className="experience-timeline">
        {experiences.map((exp, index) => (
          <div
            key={index}
            ref={el => cardRefs.current[index] = el}
            className={`experience-card ${visibleCards.includes(index) ? 'visible' : ''}`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className="card-accent"></div>

            <div className="exp-header">
              <div>
                <div className="experience-title">{exp.title}</div>
                <div className="experience-company">
                  <i className="fa-solid fa-building"></i> {exp.company}
                </div>
                {exp.location && (
                  <div className="experience-location">
                    <i className="fa-solid fa-location-dot"></i> {exp.location}
                  </div>
                )}
              </div>
              <div className="exp-meta-right">
                <span className={`status-badge status-${exp.statusColor}`}>{exp.badge}</span>
                <div className="experience-duration">
                  <i className="fa-solid fa-calendar"></i> {exp.duration}
                </div>
              </div>
            </div>

            <ul className="experience-details">
              {exp.description.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>

            <div className="tech-stack">
              {exp.tech.map((t, i) => (
                <span key={i} className="tech-tag">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkExperience