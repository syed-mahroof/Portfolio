/* ThemedNav — STEP 3. Renders the navigation component mapped to the active theme. */
import React from 'react'
import { useTheme } from '../context/ThemeContext'
import CyberNav from './nav/CyberNav'
import NebulaBubbleMenu from './nav/NebulaBubbleMenu'
import AuroraGlassNav from './nav/AuroraGlassNav'
import EmberOverlayNav from './nav/EmberOverlayNav'
import FrostDotNav from './nav/FrostDotNav'

const NAVS = { CyberNav, NebulaBubbleMenu, AuroraGlassNav, EmberOverlayNav, FrostDotNav }

const ThemedNav = () => {
  const { config } = useTheme()
  const Nav = NAVS[config.nav] || CyberNav
  return <Nav />
}
export default ThemedNav
