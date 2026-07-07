/* CyberMatrix — CYBER background. Canvas matrix rain, density-scaled + reduced-motion aware. */
import React, { useRef, useEffect } from 'react'

const CyberMatrix = () => {
  const ref = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = ref.current, ctx = canvas.getContext('2d')
    let raf, cols, drops, fontSize
    const chars = 'アイウエオカ0123456789ABCDEF<>/{}[]#$%'.split('')
    const setup = () => {
      canvas.width = innerWidth; canvas.height = innerHeight
      fontSize = innerWidth < 640 ? 12 : 16          // lighter on mobile
      cols = Math.floor(canvas.width / fontSize)
      drops = Array(cols).fill(1)
    }
    setup()
    let last = 0
    const draw = (t) => {
      raf = requestAnimationFrame(draw)
      if (t - last < 55) return                       // throttle ~18fps for battery
      last = t
      ctx.fillStyle = 'rgba(5,2,8,0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${fontSize}px monospace`
      for (let i = 0; i < drops.length; i++) {
        const txt = chars[(Math.random() * chars.length) | 0]
        ctx.fillStyle = Math.random() > 0.975 ? '#ff2bd6' : '#00fff2'
        ctx.fillText(txt, i * fontSize, drops[i] * fontSize)
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
    }
    raf = requestAnimationFrame(draw)
    addEventListener('resize', setup)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', setup) }
  }, [])
  return <canvas ref={ref} className="bg-canvas" aria-hidden="true" style={{ opacity: 0.5 }} />
}
export default CyberMatrix
