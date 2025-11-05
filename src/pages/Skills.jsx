import React from 'react'
import '../styles/Skills.css'
import htmlIcon from '../images/html-5(1).png'
import cssIcon from '../images/css-3(1).png'
import bootstrapIcon from '../images/bootstrap(1).png'
import jsIcon from '../images/java-script(1).png'
import pythonIcon from '../images/python(1).png'
import djangoIcon from '../images/django.png'
import reactIcon from '../images/react.png'
import cIcon from '../images/c-.png'
import cppIcon from '../images/c-logo.png'
import javaIcon from '../images/java(1).png'
import mysqlIcon from '../images/mysql(1).png'
import vscodeIcon from '../images/logo.png'
import pycharmIcon from '../images/pycharm-icon.png'
import gitIcon from '../images/git.png'
import githubIcon from '../images/github.png'
import discordIcon from '../images/discord.png'
import figmaIcon from '../images/figma(1).png'

const Skills = () => {
  const skills = [
    { src: htmlIcon, alt: 'HTML' },
    { src: cssIcon, alt: 'CSS' },
    { src: bootstrapIcon, alt: 'Bootstrap' },
    { src: jsIcon, alt: 'JavaScript' },
    { src: pythonIcon, alt: 'Python' },
    { src: djangoIcon, alt: 'Django' },
    { src: reactIcon, alt: 'React' },
    { src: cIcon, alt: 'C' },
    { src: cppIcon, alt: 'C++' },
    { src: javaIcon, alt: 'Java' },
    { src: mysqlIcon, alt: 'MySQL' },
    { src: vscodeIcon, alt: 'VS Code' },
    { src: pycharmIcon, alt: 'PyCharm' },
    { src: gitIcon, alt: 'Git' },
    { src: githubIcon, alt: 'GitHub' },
    { src: discordIcon, alt: 'Discord' },
    { src: figmaIcon, alt: 'Figma' }
  ]

  return (
    <div className="skills" id="sk-section">
      <h2 id="sk"><strong>Skills</strong></h2>
      <div className="sbox">
        {skills.map((skill, index) => (
          <img key={index} className="skill-icon" src={skill.src} alt={skill.alt} />
        ))}
      </div>
    </div>
  )
}

export default Skills