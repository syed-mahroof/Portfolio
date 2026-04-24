import React, { useRef, useEffect, useState } from 'react'
import '../styles/Projects.css'

const Projects = () => {
  const [visibleCards, setVisibleCards] = useState([])
  const cardRefs = useRef([])

  const projects = [
    {
      title: 'SOORATH AUTOS',
      teamSize: 1,
      duration: '4 weeks',
      subtitle: 'Used Car Sales Platform — Full Rebuild',
      liveLink: 'https://soorathautos.in',
      repoFront: 'https://github.com/syed-mahroof',
      repoBack: 'https://github.com/syed-mahroof',
      isFreelance: true,
      tech: ['React', 'Django REST', 'PostgreSQL', 'AWS S3', 'JWT', 'Tailwind'],
      details: [
        'Architected a fully decoupled modern vehicle marketplace: Django REST Framework JSON API backend + React (Vite) SPA frontend, deployed with Nginx.',
        'Built a 3D vehicle carousel, Swiper.js gallery, fuzzy vehicle search using PostgreSQL pg_trgm trigram similarity, and WhatsApp inquiry integration.',
        'Implemented a secure JWT-authenticated admin dashboard for inventory CRUD, gallery image upload to AWS S3, featured/sold toggles, and dashboard stats.',
        'Added full SEO pipeline with React Helmet, JSON-LD structured data (AutoDealer + Car schemas), Open Graph tags, and canonical URLs.'
      ]
    },
    {
      title: 'ANANTA NETHRALAYA',
      teamSize: 1,
      duration: '3 weeks',
      subtitle: 'Eye Care Center Website — Live',
      liveLink: 'https://www.anantanethralaya.org',
      isFreelance: true,
      tech: ['React', 'Tailwind CSS', 'Vite'],
      details: [
        'Developed a fully responsive, WCAG-aware healthcare website for Ananta Nethralaya Eye Clinic, now live and serving patients online.',
        'Implemented smooth navigation, comprehensive service sections, doctor profiles, image gallery, and an interactive contact form.',
        'Achieved fast load times and accessibility compliance across all device sizes using React, Tailwind CSS, and Vite.'
      ]
    },
    {
      title: 'AL AFZAH GROUP',
      teamSize: 2,
      duration: '3 weeks',
      subtitle: 'Qatar Corporate Website — Live',
      liveLink: 'https://www.al-afzahgroup.com',
      isFreelance: true,
      tech: ['React', 'Tailwind CSS', 'Vite'],
      details: [
        'Built the complete frontend for Al Afzah Group WLL, a Qatari construction and MEP company — now live at al-afzahgroup.com.',
        'Collaborated with backend developers to integrate UI with server-side data, ensuring cross-browser compatibility and responsive design.',
        'Delivered a professional corporate web presence showcasing the company\'s services, projects, and team.'
      ]
    },
    {
      title: 'POSTGRAM',
      teamSize: 4,
      duration: '1 year',
      subtitle: 'Cyberbullying Detection & Prevention',
      tech: ['Django', 'Python', 'ML', 'NLP'],
      details: [
        'Created a comprehensive web application using Django for both front-end and back-end to detect and prevent cyberbullying.',
        'Implemented machine learning algorithms for text analysis, achieving high precision and recall in identifying cyberbullying instances.',
        'Designed and integrated a user-friendly interface for real-time monitoring and reporting of cyberbullying incidents.'
      ]
    },
    {
      title: 'NETFLIX CLONE',
      teamSize: 1,
      duration: '2 weeks',
      subtitle: 'Netflix-like App with Hover Video Previews',
      tech: ['React', 'Redux Toolkit', 'Django', 'TMDB API', 'Tailwind'],
      details: [
        'Built a fully functional Netflix-like web application with hover video previews, full-screen playback, and tab-based filtering.',
        'Implemented Redux Toolkit for state management; integrated TMDB API for real-time movie data with lazy loading optimization.',
        'Added keyboard shortcuts (ESC, SPACE, M), hero banner, mobile slide-out menu, and smooth fade/scale/slide animations.'
      ]
    },
    {
      title: 'BOOKICTIONARY',
      teamSize: 1,
      duration: '3 weeks',
      subtitle: 'E-Commerce Platform for Books',
      tech: ['Django', 'Bootstrap', 'SQLite3', 'Python'],
      details: [
        'Built an introductory e-commerce platform to learn web development fundamentals.',
        'Utilized HTML, CSS, Bootstrap, JavaScript, Python, Django, and SQLite3 for seamless functionality and design.'
      ]
    }
  ]

  useEffect(() => {
    const observers = cardRefs.current.map((ref, i) => {
      if (!ref) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setVisibleCards(prev => [...new Set([...prev, i])])
        },
        { threshold: 0.1 }
      )
      obs.observe(ref)
      return obs
    })
    return () => observers.forEach(obs => obs?.disconnect())
  }, [])

  return (
    <div className="projects" id="projects-section">
      <div className="section-header">
        <h2 id="projects"><strong>Projects</strong></h2>
        <p className="section-subtitle">Things I've built and shipped</p>
      </div>
      <div className="projects-container">
        {projects.map((project, index) => (
          <div
            key={index}
            ref={el => cardRefs.current[index] = el}
            className={`project-card ${visibleCards.includes(index) ? 'visible' : ''} ${project.isFreelance ? 'freelance-card' : ''}`}
            style={{ animationDelay: `${(index % 3) * 0.12}s` }}
          >
            {project.isFreelance && (
              <div className="freelance-badge">
                <i className="fa-solid fa-briefcase"></i> Freelance · Live
              </div>
            )}

            <div className="card-top-bar"></div>
            <div className="project-title">{project.title}</div>
            <div className="project-meta">
              <span className="meta-item">
                <i className="fa-solid fa-users"></i> {project.teamSize === 1 ? 'Solo' : `Team: ${project.teamSize}`}
              </span>
              <span className="meta-item">
                <i className="fa-solid fa-clock"></i> {project.duration}
              </span>
            </div>

            <div className="project-subtitle">{project.subtitle}</div>

            <ul className="project-details">
              {project.details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>

            <div className="project-tech">
              {project.tech.map((t, i) => (
                <span key={i} className="proj-tech-tag">{t}</span>
              ))}
            </div>

            {(project.liveLink || project.repoFront) && (
              <div className="project-links">
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="proj-link live">
                    <i className="fa-solid fa-arrow-up-right-from-square"></i> Live Site
                  </a>
                )}
                {project.repoFront && (
                  <a href={project.repoFront} target="_blank" rel="noopener noreferrer" className="proj-link repo">
                    <i className="fa-brands fa-github"></i> GitHub
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects