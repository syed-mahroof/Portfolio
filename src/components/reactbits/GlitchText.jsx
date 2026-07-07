/* GlitchText — CYBER. Pure-CSS RGB-split glitch (drop-in for ReactBits/DecryptedText).
   Swap the internals with the official ReactBits GlitchText anytime — same <GlitchText text=""/> API. */
import React from 'react'
import './reactbits.css'

const GlitchText = ({ text, as: Tag = 'span', className = '', ...rest }) => (
  <Tag className={`rb-glitch ${className}`} data-text={text} {...rest}>{text}</Tag>
)
export default GlitchText
