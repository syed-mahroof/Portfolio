import React from 'react'
import '../styles/Hero.css'

const Hero = () => {
  return (
    <div id="top" className="main">
      <div id="name">
        <h1 className="syed"><strong>Syed</strong></h1>
        <h1 className="mah"><strong>Mahroof</strong></h1>
        <div className="mainp">
          <span className="newp">I design and build things on internet</span>
          <div id="icons">
            <a href="https://www.linkedin.com/in/syed-mahroof-449074269/" target="_blank" rel="noopener noreferrer">
              <i id="lin" className="fa-brands fa-linkedin"></i>
            </a>
            <a href="https://github.com/syed-mahroof" target="_blank" rel="noopener noreferrer">
              <i id="gi" className="fa-brands fa-github"></i>
            </a>
            <a href="https://www.instagram.com/_syed.mahroof_/" target="_blank" rel="noopener noreferrer">
              <i id="insta" className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.facebook.com/syed.mahroof.39" target="_blank" rel="noopener noreferrer">
              <i id="fac" className="fa-brands fa-facebook"></i>
            </a>
            <a href="https://x.com/SyedMahroof10" target="_blank" rel="noopener noreferrer">
              <i id="x" className="fa-brands fa-x-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero