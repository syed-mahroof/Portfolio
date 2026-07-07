/* useUISound.jsx — clean native Web Audio micro-interaction engine.
   No audio assets: clicks / swooshes / hums are synthesised on the fly.
   One shared AudioContext, unlocked on first user gesture, with a mute toggle. */
import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react'

const SoundCtx = createContext(null)

export const SoundProvider = ({ children }) => {
  const ctxRef = useRef(null)
  const [muted, setMuted] = useState(false)

  const ac = () => {
    if (typeof window === 'undefined') return null
    if (!ctxRef.current) {
      const AC = window.AudioContext || window.webkitAudioContext
      if (AC) ctxRef.current = new AC()
    }
    if (ctxRef.current?.state === 'suspended') ctxRef.current.resume()
    return ctxRef.current
  }

  // unlock on first interaction (browser autoplay policy)
  useEffect(() => {
    const unlock = () => ac()
    window.addEventListener('pointerdown', unlock, { once: true })
    window.addEventListener('keydown', unlock, { once: true })
    return () => {
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
    }
  }, [])

  const envGain = (ctx, peak, dur) => {
    const g = ctx.createGain()
    const t = ctx.currentTime
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(peak, t + 0.006)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    return g
  }

  // low-frequency organic mechanical click (theme toggle / open repo)
  const click = useCallback(() => {
    if (muted) return
    const ctx = ac(); if (!ctx) return
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(220, t)
    osc.frequency.exponentialRampToValueAtTime(90, t + 0.05)
    const g = envGain(ctx, 0.18, 0.11)
    osc.connect(g).connect(ctx.destination)
    osc.start(t); osc.stop(t + 0.12)
  }, [muted])

  // ultra-subtle haptic tick (hover / nav nodes)
  const hover = useCallback(() => {
    if (muted) return
    const ctx = ac(); if (!ctx) return
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(520, t)
    const g = envGain(ctx, 0.05, 0.05)
    osc.connect(g).connect(ctx.destination)
    osc.start(t); osc.stop(t + 0.06)
  }, [muted])

  // acoustic swoosh (filter changes / section jumps) — filtered noise burst
  const swoosh = useCallback(() => {
    if (muted) return
    const ctx = ac(); if (!ctx) return
    const t = ctx.currentTime
    const dur = 0.32
    const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length)
    const src = ctx.createBufferSource(); src.buffer = buf
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.setValueAtTime(380, t)
    bp.frequency.exponentialRampToValueAtTime(2200, t + dur)
    bp.Q.value = 0.8
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(0.12, t + 0.05)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    src.connect(bp).connect(g).connect(ctx.destination)
    src.start(t); src.stop(t + dur)
  }, [muted])

  const toggleMute = useCallback(() => setMuted(m => !m), [])

  return (
    <SoundCtx.Provider value={{ click, hover, swoosh, muted, toggleMute }}>
      {children}
    </SoundCtx.Provider>
  )
}

export const useUISound = () => {
  const ctx = useContext(SoundCtx)
  // graceful no-op fallback if used outside provider
  return ctx || { click(){}, hover(){}, swoosh(){}, muted:false, toggleMute(){} }
}
