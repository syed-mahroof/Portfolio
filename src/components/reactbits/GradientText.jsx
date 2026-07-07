/* GradientText — EMBER. Animated orange/red/yellow gradient fill with a hard
   spring pop-in (Framer Motion). Drop-in for ReactBits GradientText/TrueFocus. */
import React from 'react'
import { motion } from 'framer-motion'
import './reactbits.css'

const GradientText = ({ text, as: Tag = 'h1', className = '' }) => {
  const MotionTag = motion[Tag] || motion.h1
  return (
    <MotionTag
      className={`rb-gradient ${className}`}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: 'spring', stiffness: 420, damping: 16 }}
    >
      {text}
    </MotionTag>
  )
}
export default GradientText
