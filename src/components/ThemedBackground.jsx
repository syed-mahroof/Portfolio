/* ThemedBackground — STEP 3. Renders the background system for the active theme. */
import React from 'react'
import { useTheme } from '../context/ThemeContext'
import CyberMatrix from './backgrounds/CyberMatrix'
import CyberGrid from './backgrounds/CyberGrid'
import NebulaSpace from './backgrounds/NebulaSpace'
import AuroraMesh from './backgrounds/AuroraMesh'
import EmberBg from './backgrounds/EmberBg'
import FrostGrid from './backgrounds/FrostGrid'
import './backgrounds/backgrounds.css'

const BGS = { CyberMatrix, CyberGrid, NebulaSpace, AuroraMesh, EmberBg, FrostGrid }

const ThemedBackground = () => {
  const { config } = useTheme()
  const Bg = BGS[config.background] || CyberMatrix
  return <div className="themed-bg">{<Bg />}</div>
}
export default ThemedBackground
