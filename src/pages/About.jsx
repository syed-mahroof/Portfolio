import React from 'react'
import '../styles/About.css'
import profileImage from '../images/whatsAppImage2024-09-09at15.43.46_cde18e28-Photoroom.jpg'

const About = () => {
  return (
    <div className="about" id="ab-section">
      <h1 id="ab"><strong>About</strong></h1>
      <div className="me">
        <div className="profile-image">
          <img id="mine" src={profileImage} alt="Profile Image" />
        </div>
        <div className="discr">
          <p>
            I am <span id="sp">Syed Mahroof</span>, a graduate in B.tech Computer Science and Engineering & an Aspiring Full Stack Developer with a strong enthusiasm for web development. You can explore my portfolio website to learn more about my journey and projects in the field of web development. As a newcomer in the industry, I am eager to showcase my skills and creativity through my work.
            <br /><br />
            <span className="spa">Age</span>: 23
            <br />
            <span className="spa">Contact</span>: 7025195638
            <br />
            <span className="spa">Email</span>: syedmahroof2002@gmail.com
          </p>
        </div>
      </div>
    </div>
  )
}

export default About