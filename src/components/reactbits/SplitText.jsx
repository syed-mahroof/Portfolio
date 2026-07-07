/* SplitText — AURORA. Elegant character-by-character reveal (Framer Motion).
   Drop-in compatible with ReactBits SplitText. */
import React from 'react'
import { motion } from 'framer-motion'

const SplitText = ({ text, as: Tag = 'h1', className = '', stagger = 0.035 }) => {
  const MotionTag = motion[Tag] || motion.h1
  const chars = Array.from(String(text))
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ staggerChildren: stagger }}
      style={{ display: 'inline-block' }}
    >
      {chars.map((c, i) => (
        <motion.span key={i} style={{ display: 'inline-block', whiteSpace: 'pre' }}
          variants={{ hidden: { opacity: 0, y: '0.6em', rotateX: -90 }, show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: [0.45, 0, 0.15, 1] } } }}>
          {c === ' ' ? ' ' : c}
        </motion.span>
      ))}
    </MotionTag>
  )
}
export default SplitText
