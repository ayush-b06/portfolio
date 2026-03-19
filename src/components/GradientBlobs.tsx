'use client'

import { useEffect, useRef } from 'react'
import { onSectionChange, getSectionIndex } from '@/lib/sectionState'

// Each section shifts the background to a different position
const POSITIONS = [
  { x: 0,   y: 0   },   // 0 About
  { x: 40,  y: -60 },   // 1 Berkeley
  { x: -50, y: -120 },  // 2 Projects
  { x: 30,  y: -180 },  // 3 Experience
  { x: -30, y: -240 },  // 4 Contact
]

export default function GradientBlobs() {
  const containerRef = useRef<HTMLDivElement>(null)
  const currentX = useRef(0)
  const currentY = useRef(0)
  const targetX = useRef(0)
  const targetY = useRef(0)

  useEffect(() => {
    // Set initial target from current section
    const idx = getSectionIndex()
    const pos = POSITIONS[idx] ?? POSITIONS[0]
    targetX.current = pos.x
    targetY.current = pos.y

    const unsub = onSectionChange((idx) => {
      const pos = POSITIONS[idx] ?? POSITIONS[0]
      targetX.current = pos.x
      targetY.current = pos.y
    })

    let raf: number
    const loop = () => {
      currentX.current += (targetX.current - currentX.current) * 0.04
      currentY.current += (targetY.current - currentY.current) * 0.04

      if (containerRef.current) {
        containerRef.current.style.transform =
          `translate(${currentX.current.toFixed(2)}px, ${currentY.current.toFixed(2)}px)`
      }
      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      unsub()
    }
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-100 dark:opacity-40">
      <div ref={containerRef} className="absolute inset-0" style={{ willChange: 'transform' }}>
        {/* Large purple-blue glow — left, behind celsius */}
        <div style={{
          position: 'absolute', top: '-10%', left: '-15%',
          width: '65vw', height: '65vw', borderRadius: '50%',
          background: 'radial-gradient(circle, #C4B5FD 0%, #818CF8 40%, transparent 70%)',
          filter: 'blur(70px)', opacity: 0.45,
          animation: 'blob 9s ease-in-out infinite',
        }} />
        {/* Sky-blue glow — top right */}
        <div style={{
          position: 'absolute', top: '-5%', right: '-10%',
          width: '50vw', height: '50vw', borderRadius: '50%',
          background: 'radial-gradient(circle, #BAE6FD 0%, #7DD3FC 50%, transparent 70%)',
          filter: 'blur(80px)', opacity: 0.4,
          animation: 'blob 11s ease-in-out infinite',
          animationDelay: '2s',
        }} />
        {/* Pink-purple glow — bottom center */}
        <div style={{
          position: 'absolute', bottom: '-10%', left: '30%',
          width: '55vw', height: '55vw', borderRadius: '50%',
          background: 'radial-gradient(circle, #F0ABFC 0%, #C084FC 50%, transparent 70%)',
          filter: 'blur(90px)', opacity: 0.3,
          animation: 'blob 13s ease-in-out infinite',
          animationDelay: '4s',
        }} />
        {/* Small blue accent — middle right */}
        <div style={{
          position: 'absolute', top: '40%', right: '5%',
          width: '30vw', height: '30vw', borderRadius: '50%',
          background: 'radial-gradient(circle, #A5F3FC 0%, #67E8F9 60%, transparent 70%)',
          filter: 'blur(60px)', opacity: 0.25,
          animation: 'blob 8s ease-in-out infinite',
          animationDelay: '1s',
        }} />
      </div>
    </div>
  )
}
