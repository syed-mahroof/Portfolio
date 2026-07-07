/* ScrollVelocityText — FROST. Text skews/stretches with scroll velocity, then
   settles crisp (Framer Motion useVelocity). Drop-in for ReactBits ScrollVelocity. */
import React from 'react'
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion'

const ScrollVelocityText = ({ text, as: Tag = 'h1', className = '' }) => {
  const { scrollY } = useScroll()
  const v = useVelocity(scrollY)
  const sv = useSpring(v, { stiffness: 300, damping: 50 })
  const skew = useTransform(sv, [-2500, 0, 2500], [-8, 0, 8], { clamp: true })
  const scaleX = useTransform(sv, [-2500, 0, 2500], [1.06, 1, 1.06], { clamp: true })
  const MotionTag = motion[Tag] || motion.h1
  return (
    <MotionTag className={className} style={{ skewX: skew, scaleX, display: 'inline-block', transformOrigin: 'left center' }}>
      {text}
    </MotionTag>
  )
}
export default ScrollVelocityText
