import React from 'react'
import '../styles/WorkExperience.css'

const WorkExperience = () => {
  const experiences = [
    {
      title: 'Junior IT Support',
      company: 'Safecare Technology',
      location: 'Muvattupuzha, Kerala',
      duration: '05/2025 – Present',
      status: 'Present',
      description: [
        'Maintain hospital management systems, ensuring high uptime for critical IT infrastructure.',
        'Provide technical support to medical staff, resolving software and hardware issues promptly.',
        'Troubleshoot network issues and optimize system performance.',
        'Assist in database management and backup for patient data security.'
      ]
    },
    {
      title: 'Freelance Full Stack Developer',
      company: 'Self-Employed',
      location: 'Remote',
      duration: 'Ongoing',
      status: 'Part-time',
      description: [
        'Developing custom web applications for clients using modern technologies.',
        'Building responsive and user-friendly interfaces with React.js.',
        'Creating robust backend solutions with Django and Python.',
        'Managing end-to-end project delivery from requirements to deployment.'
      ]
    }
  ]

  return (
    <div className="work-experience" id="work-section">
      <h2 id="work"><strong>Work Experience</strong></h2>
      <div className="experience-container">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-card">
            <div className="experience-title">{exp.title}</div>
            <div className="experience-company">{exp.company}</div>
            {exp.location && <div className="experience-location">{exp.location}</div>}
            <div className="experience-duration">
              {exp.duration} {exp.status && <span className="status-badge">({exp.status})</span>}
            </div>
            <ul className="experience-details">
              {exp.description.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkExperience