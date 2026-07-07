import React from 'react'
import '../styles/About.css'
import profileImage from '../images/whatsAppImage2024-09-09at15.43.46_cde18e28-Photoroom.jpg'

const About = () => {
  return (
    <div className="about" id="ab-section">
      <div className="section-header">
        <h1 id="ab"><strong>About</strong></h1>
        <p className="section-subtitle">A little about who I am</p>
      </div>
      <div className="me">
        <div className="profile-image">
          <div className="img-wrapper">
            <img id="mine" src={profileImage} alt="Syed Mahroof" />
            <div className="img-ring ring-1"></div>
            <div className="img-ring ring-2"></div>
          </div>
          <div className="profile-badge">
            <span className="badge-dot"></span>
            Available for work
          </div>
        </div>
        <div className="discr">
          <p>
            I am <span id="sp">Syed Mahroof</span>, a B.Tech Computer Science graduate and a{' '}
            <span className="highlight-role">Full Stack Developer</span> currently working as a{' '}
            <span className="highlight-role">Backend Developer at Al Imtedad Solutions</span>, Trivandrum.
            <br /><br />
            I build production-grade web applications — from REST APIs and Django backends to React frontends with
            real users and live deployments. I've shipped full-stack projects for clients in Kerala and Qatar,
            and I'm always learning and building.
            <br /><br />
            <span className="spa">Age</span>: 24<br />
            <span className="spa">Location</span>: Muvattupuzha, Kerala<br />
            <span className="spa">Email</span>: syedmahroof2002@gmail.com<br />
            <span className="spa">Phone</span>: +91 7025195638
          </p>
          <div className="about-stats">
            <div className="stat-item">
              <span className="stat-num">4+</span>
              <span className="stat-label">Live Projects</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">2+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">5+</span>
              <span className="stat-label">Technologies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About