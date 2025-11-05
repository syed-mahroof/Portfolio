import React from 'react'
import '../styles/Projects.css'

const Projects = () => {
  const projects = [
    {
      title: 'ANANTA NETHRALAYA',
      teamSize: 1,
      duration: '3 weeks',
      subtitle: 'Modern Eye Clinic Website (Freelance)',
      details: [
        'Developed a modern, responsive website for Ananta Nethralaya Eye Clinic using React.js and Tailwind CSS as a freelance project.',
        'Implemented smooth navigation, comprehensive service sections, doctor profiles, image gallery, and an interactive contact form.',
        'Added scroll-to-top functionality and ensured mobile-first responsive design for optimal user experience across all devices.',
        'Created a clean, professional interface that effectively showcases the clinic\'s services and builds patient trust and engagement.'
      ]
    },
    {
      title: 'SOORATH AUTOS',
      teamSize: 2,
      duration: '4 weeks',
      subtitle: 'Used Car Sales Platform',
      details: [
        'Developed a full-stack web application using Django (backend) and HTML/CSS/JavaScript (frontend) to digitize operations for Soorath Autos car reselling business.',
        'Implemented secure OTP authentication, WhatsApp integration for customer support, and automated email/SMS notifications for appointment management.',
        'Designed an interactive car marketplace with advanced search filters (brand, fuel type, transmission) and real-time inventory updates when vehicles are sold.'
      ]
    },
    {
      title: 'POSTGRAM',
      teamSize: 4,
      duration: '1 year',
      subtitle: 'Cyberbullying detection and prevention Model',
      details: [
        'Created a comprehensive web application utilizing Django for both front-end and back-end to detect and prevent cyberbullying.',
        'Implemented machine learning algorithms for text analysis, achieving high precision and recall in identifying cyberbullying instances.',
        'Designed and integrated a user-friendly interface for real-time monitoring and reporting of cyberbullying incidents.'
      ]
    },
    {
      title: 'NETFLIX CLONE',
      teamSize: 1,
      duration: '2 weeks',
      subtitle: 'A Netflix-like web app with hover video previews',
      details: [
        'Built a fully functional Netflix-like web application using React.js and Django with hover video previews and full-screen playback.',
        'Implemented Redux Toolkit for state management and Tailwind CSS for responsive design across mobile, tablet, and desktop.',
        'Integrated TMDB API for real-time movie data, implemented lazy loading for performance optimization, and added keyboard shortcuts (ESC, SPACE, M) for enhanced user experience.',
        'Features include tab-based filtering, hero banner, mobile slide-out menu, and smooth animations with fade, scale, and slide effects.'
      ]
    },
    {
      title: 'BOOKICTIONARY',
      teamSize: 1,
      duration: '3 weeks',
      subtitle: 'An e-commerce website for Books',
      details: [
        'Built an introductory e-commerce platform to learn web development fundamentals.',
        'Utilized HTML, CSS, Bootstrap, JavaScript, Python, Django, and SQLite3 for seamless functionality and design.'
      ]
    },
    {
      title: 'DIGITAL CLOCK',
      teamSize: 1,
      duration: '1 week',
      subtitle: 'A real-time digital clock using React',
      details: [
        'Built a real-time digital clock to enhance React.js proficiency and deepen understanding of state management.'
      ]
    }
  ]

  return (
    <div className="projects" id="projects-section">
      <h2 id="projects"><strong>Projects</strong></h2>
      <div className="projects-container">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-title">{project.title}</div>
            <div className="project-meta">
              <span className="meta-item">
                <i className="fa-solid fa-users"></i> Team: {project.teamSize}
              </span>
              <span className="meta-divider">|</span>
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
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects;