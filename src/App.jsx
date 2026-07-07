// src/App.jsx — theme-driven shell
import React from 'react'
import { MotionConfig } from 'framer-motion'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { SoundProvider, useUISound } from './hooks/useUISound'
import ThemedNav from './components/ThemedNav'
import ThemedBackground from './components/ThemedBackground'
import ThemeSwitcher from './components/ThemeSwitcher'
import CustomCursor from './components/CustomCursor'
import Hero from './pages/Hero'
import About from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import WorkExperience from './pages/WorkExperience'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import './App.css'

// navs docked to the top need content offset; bottom/side navs don't
const TOP_DOCKED = ['CyberNav', 'AuroraGlassNav', 'EmberOverlayNav']

const SoundToggle = () => {
  const { muted, toggleMute, click } = useUISound()
  return (
    <button className={`sound-toggle ${muted ? 'muted' : ''}`}
      onClick={() => { if (muted) toggleMute(); else { click(); toggleMute() } }}
      aria-label={muted ? 'Unmute interface sounds' : 'Mute interface sounds'} title={muted ? 'Sound off' : 'Sound on'}>
      <i className={`fa-solid ${muted ? 'fa-volume-xmark' : 'fa-volume-high'}`}></i>
    </button>
  )
}

const Shell = () => {
  const { config } = useTheme()
  const topDock = TOP_DOCKED.includes(config.nav)
  return (
    <>
      <ThemedBackground />
      <CustomCursor />
      <ThemedNav />
      <div className="theme-switch-dock"><ThemeSwitcher /></div>

      <div className={`App ${topDock ? 'has-top-nav' : ''}`}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <WorkExperience />
        <Contact />
        <Footer />
      </div>

      <SoundToggle />
    </>
  )
}

const App = () => (
  <MotionConfig reducedMotion="user">
    <ThemeProvider>
      <SoundProvider>
        <Shell />
      </SoundProvider>
    </ThemeProvider>
  </MotionConfig>
)
export default App
