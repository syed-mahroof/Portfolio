/* MagneticButton.jsx — cursor-attraction wrapper (Framer Motion springs).
   The element eases toward the pointer while it's nearby, snaps back on leave.
   Plays an optional UI sound on hover. Renders as <a> or <button>. */
import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useUISound } from '../hooks/useUISound'

const MagneticButton = ({
  as = 'a',
  strength = 0.4,
  className = '',
  children,
  onClick,
  sound = 'hover',
  ...rest
}) => {
  const ref = useRef(null)
  const { hover, click } = useUISound()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 14, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 14, mass: 0.4 })

  const handleMove = (e) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => { x.set(0); y.set(0) }

  const Comp = motion[as] || motion.a
  return (
    <Comp
      ref={ref}
      className={`magnetic-btn ${className}`}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseEnter={() => sound === 'hover' && hover()}
      onMouseLeave={reset}
      onClick={(e) => { click(); onClick?.(e) }}
      {...rest}
    >
      <span className="mag-inner">{children}</span>
    </Comp>
  )
}

export default MagneticButton
