/* FrostGrid — FROST background. Crisp, subtle light grid (drop-in slot for ReactBits GridMotion). */
import React from 'react'
const FrostGrid = () => (
  <div className="bg-layer frost-bg" aria-hidden="true">
    {/* --- ReactBits GridMotion mounts here --- */}
    <div className="frost-grid-lines" />
  </div>
)
export default FrostGrid
