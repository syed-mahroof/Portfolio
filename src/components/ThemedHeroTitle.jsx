/* ThemedHeroTitle — STEP 4 demonstrator.
   Renders the SAME hero heading with a DIFFERENT ReactBits animation per theme.
   Add/replace mappings here; every section can follow this exact switch pattern. */
import React from 'react'
import { useTheme } from '../context/ThemeContext'
import GlitchText from './reactbits/GlitchText'
import BlurText from './reactbits/BlurText'
import SplitText from './reactbits/SplitText'
import GradientText from './reactbits/GradientText'
import ScrollVelocityText from './reactbits/ScrollVelocityText'

const ThemedHeroTitle = ({ text, className = '', as = 'span' }) => {
  const { config } = useTheme()
  switch (config.heroAnim) {
    case 'glitch':   return <GlitchText   text={text} className={className} as={as} />
    case 'blur':     return <BlurText     text={text} className={className} as={as} />
    case 'split':    return <SplitText    text={text} className={className} as={as} />
    case 'gradient': return <GradientText text={text} className={className} as={as} />
    case 'velocity': return <ScrollVelocityText text={text} className={className} as={as} />
    default:         return <span className={className}>{text}</span>
  }
}
export default ThemedHeroTitle
