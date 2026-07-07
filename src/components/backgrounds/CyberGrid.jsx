/* CyberGrid — CYBER background v2 (replaces matrix rain, which was too noisy).
   Aesthetic-first: a subtle perspective horizon grid gliding forward, two soft
   coral/cyan glow fields, and one slow scanline. Pure CSS = GPU-cheap, and
   content stays perfectly readable on top. */
import React from 'react'

const CyberGrid = () => (
  <div className="bg-layer cybergrid-bg" aria-hidden="true">
    <div className="cg-glow cg-glow-coral" />
    <div className="cg-glow cg-glow-cyan" />
    <div className="cg-floor" />
    <div className="cg-scanline" />
    <div className="cg-vignette" />
  </div>
)
export default CyberGrid
