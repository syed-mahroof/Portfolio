/* BlurText — NEBULA. Ethereal word-by-word blur+rise reveal (Framer Motion).
   Drop-in compatible with ReactBits BlurText <BlurText text="" />. */
import React from 'react'
import { motion } from 'framer-motion'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const word = {
  hidden: { opacity: 0, filter: 'blur(14px)', y: 16 },
  show: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
}
const BlurText = ({ text, as: Tag = 'h1', className = '' }) => {
  const MotionTag = motion[Tag] || motion.h1
  return (
    <MotionTag className={className} variants={container} initial="hidden" animate="show" style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.25em' }}>
      {String(text).split(' ').map((w, i) => (
        <motion.span key={i} variants={word} style={{ display: 'inline-block', willChange: 'filter, transform' }}>{w}</motion.span>
      ))}
    </MotionTag>
  )
}
export default BlurText
