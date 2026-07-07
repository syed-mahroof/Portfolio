/* ShinyText — CYBER highlight. Neon sheen sweeping across text. */
import React from 'react'
import './reactbits.css'
const ShinyText = ({ text, className = '', ...rest }) => (
  <span className={`rb-shiny ${className}`} {...rest}>{text}</span>
)
export default ShinyText
