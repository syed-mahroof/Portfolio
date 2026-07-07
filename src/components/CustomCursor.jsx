/* CustomCursor.jsx — interactive ring cursor.
   rAF-lerped ring (springy lag) + tight dot. Morphs shape + scales on
   interactive targets (a, button, [data-cursor], .glass-card). No re-renders. */
import React, { useEffect, useRef } from 'react'

const CustomCursor = () => {
  const ring = useRef(null)
  const dot = useRef(null)

  useEffect(() => {
    // only on fine-pointer / hover-capable devices
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const target = { x: innerWidth / 2, y: innerHeight / 2 }
    const pos = { ...target }
    let raf
    let isMoving = false

    document.body.classList.add('cursor-ready')

    const loop = () => {
      const dx = target.x - pos.x
      const dy = target.y - pos.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 0.1) {
        pos.x = target.x
        pos.y = target.y
        isMoving = false
      } else {
        pos.x += dx * 0.18
        pos.y += dy * 0.18
        raf = requestAnimationFrame(loop)
      }
      
      if (ring.current) {
        const r = ring.current.offsetWidth / 2
        ring.current.style.transform = `translate3d(${pos.x - r}px, ${pos.y - r}px, 0)`
      }
    }

    const onMove = (e) => { 
      target.x = e.clientX; target.y = e.clientY
      if (dot.current) dot.current.style.transform = `translate3d(${e.clientX - 2.5}px, ${e.clientY - 2.5}px, 0)`
      if (!isMoving) {
        isMoving = true
        loop()
      }
    }
    const onDown = () => ring.current?.classList.add('is-down')
    const onUp = () => ring.current?.classList.remove('is-down')

    const interactive = 'a, button, .magnetic-btn, .glass-card, [data-cursor="hover"]'
    const onPointerOver = (e) => {
      if (e.pointerType !== 'mouse') return
      if (e.target.closest?.(interactive)) ring.current?.classList.add('is-hover')
    }
    const onPointerOut = (e) => {
      if (e.pointerType !== 'mouse') return
      if (e.target.closest?.(interactive)) ring.current?.classList.remove('is-hover')
    }

    isMoving = true
    loop()

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('pointerover', onPointerOver)
    document.addEventListener('pointerout', onPointerOut)

    return () => {
      cancelAnimationFrame(raf)
      document.body.classList.remove('cursor-ready')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('pointerover', onPointerOver)
      document.removeEventListener('pointerout', onPointerOut)
    }
  }, [])

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  )
}

export default CustomCursor
