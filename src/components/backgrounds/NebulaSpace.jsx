/* NebulaSpace — NEBULA background. Deep-space starfield + drifting orbs.
   >>> DROP-IN SLOT: replace .nebula-orbs with ReactBits <ColorBends /> or <OrbitImages />. */
import React from 'react'
const NebulaSpace = () => (
  <div className="bg-layer nebula-bg" aria-hidden="true">
    <div className="nebula-stars" />
    {/* --- ReactBits ColorBends / Orbit Images mount here --- */}
    <div className="nebula-orbs">
      <span className="ambient-orb a" /><span className="ambient-orb b" /><span className="ambient-orb c" />
    </div>
  </div>
)
export default NebulaSpace
