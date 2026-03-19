'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { onEasterEgg } from '@/lib/easterEggState'

const FACTS = [
  { label: 'Favorite game', value: 'Katana Zero' },
  { label: 'Fuel of choice', value: 'Celsius Peach Mango Green Tea' },
  { label: 'Debugging strategy', value: 'rubber duck + panic' },
  { label: 'Current vibe', value: 'building things at 2am' },
]

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

function GlitchText({ text }: { text: string }) {
  return (
    <div className="relative inline-block">
      <motion.h1
        className="relative text-3xl md:text-4xl font-black tracking-tight"
        style={{ fontFamily: 'monospace', color: '#FF006E' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* cyan RGB-split layer */}
        <span
          aria-hidden
          className="absolute inset-0 select-none"
          style={{ color: '#00F5FF', clipPath: 'inset(25% 0 55% 0)', transform: 'translateX(-4px)', opacity: 0.85 }}
        >{text}</span>
        {/* pink RGB-split layer */}
        <span
          aria-hidden
          className="absolute inset-0 select-none"
          style={{ color: '#FF006E', clipPath: 'inset(60% 0 15% 0)', transform: 'translateX(4px)', opacity: 0.85 }}
        >{text}</span>
        {/* main text — periodic x-shift glitch only (skewX removed for FM compat) */}
        <motion.span
          className="relative"
          style={{ display: 'inline-block' }}
          animate={{ x: [0, -3, 4, -1, 0] }}
          transition={{ duration: 0.35, repeat: Infinity, repeatDelay: 2.5 }}
        >{text}</motion.span>
      </motion.h1>
    </div>
  )
}

export default function EasterEgg() {
  const [active, setActive] = useState(false)
  const [glitching, setGlitching] = useState(false)
  const konamiIdx = useRef(0)
  const glitchTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const trigger = useCallback(() => {
    if (active || glitching) return
    setGlitching(true)
    glitchTimer.current = setTimeout(() => {
      setGlitching(false)
      setActive(true)
    }, 600)
  }, [active, glitching])

  useEffect(() => {
    return () => { if (glitchTimer.current) clearTimeout(glitchTimer.current) }
  }, [])

  useEffect(() => onEasterEgg(trigger), [trigger])

  // Konami code listener
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === KONAMI[konamiIdx.current]) {
        konamiIdx.current++
        if (konamiIdx.current === KONAMI.length) {
          konamiIdx.current = 0
          trigger()
        }
      } else {
        konamiIdx.current = 0
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [trigger])

  // Auto-dismiss after 10s
  useEffect(() => {
    if (!active) return
    const t = setTimeout(() => setActive(false), 10000)
    return () => clearTimeout(t)
  }, [active])

  return (
    <>
      {/* VHS glitch flash — always mounted, shown via opacity to avoid AnimatePresence/keyframe race */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9998 }}
        animate={{ opacity: glitching ? 1 : 0 }}
        transition={{ duration: 0 }}
      >
        <motion.div
          className="absolute inset-0"
          animate={glitching ? {
            opacity: [0, 1, 0, 0.8, 0, 1, 0],
          } : { opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          style={{ background: '#FF006E' }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 6px, rgba(0,245,255,0.45) 6px, rgba(0,245,255,0.45) 7px)',
            opacity: glitching ? 1 : 0,
          }}
        />
      </motion.div>

      {/* Main overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center px-8"
            style={{ zIndex: 9997, background: '#05050A', cursor: 'pointer' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActive(false)}
          >
            {/* Scanlines */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.35) 3px, rgba(0,0,0,0.35) 4px)',
                zIndex: 1,
              }}
            />
            {/* CRT vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.75) 100%)', zIndex: 2 }}
            />
            {/* CRT flicker */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'rgba(0,245,255,0.012)', zIndex: 3 }}
              animate={{ opacity: [1, 0.96, 1, 0.98, 1, 0.94, 1] }}
              transition={{ duration: 0.2, repeat: Infinity }}
            />

            {/* Content */}
            <div className="relative z-10 text-center max-w-md w-full">
              <GlitchText text="You found the void." />

              <motion.p
                className="text-sm font-mono mt-3 mb-10"
                style={{ color: '#00F5FF', letterSpacing: '0.05em' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Zero died. Time to rewind.
              </motion.p>

              <div className="flex flex-col gap-3 text-left">
                {FACTS.map((f, i) => (
                  <motion.div
                    key={f.label}
                    className="flex gap-3"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + i * 0.18 }}
                  >
                    <span className="text-xs font-mono flex-shrink-0" style={{ color: '#FF006E' }}>
                      ▶ {f.label}:
                    </span>
                    <span className="text-xs font-mono" style={{ color: '#E2E8F0' }}>
                      {f.value}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.p
                className="text-[10px] font-mono mt-10"
                style={{ color: '#00F5FF', opacity: 0.35 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.35 }}
                transition={{ delay: 2.5 }}
              >
                [ click anywhere or wait to escape ]
              </motion.p>

              {/* Progress bar — uses scaleX (not width %) to avoid FM string interpolation error */}
              <div className="mt-4 mx-auto h-px overflow-hidden" style={{ width: 200, background: 'rgba(255,0,110,0.2)' }}>
                <motion.div
                  className="h-full origin-left"
                  style={{ background: '#FF006E', width: '100%' }}
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: 10, ease: 'linear' }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
