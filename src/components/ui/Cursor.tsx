'use client'

import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const trailRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -200, y: -200 })
  const trail = useRef({ x: -200, y: -200 })
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const raf = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      const target = e.target as HTMLElement
      setHovered(!!target.closest('a, button, [role="button"], input, textarea, select'))
    }
    const onDown = () => setClicked(true)
    const onUp = () => setClicked(false)

    const loop = () => {
      trail.current.x += (pos.current.x - trail.current.x) * 0.35
      trail.current.y += (pos.current.y - trail.current.y) * 0.35
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trail.current.x}px, ${trail.current.y}px) translate(-50%, -50%) rotate(${hovered ? 45 : 0}deg)`
      }
      raf.current = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    raf.current = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(raf.current)
    }
  }, [hovered])

  return (
    <>
      <div
        ref={trailRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{ willChange: 'transform' }}
      >
        <div
          style={{
            width: hovered ? 36 : clicked ? 16 : 24,
            height: hovered ? 36 : clicked ? 16 : 24,
            borderRadius: hovered ? '6px' : '4px',
            border: `1.5px solid ${hovered ? '#60A5FA' : 'var(--cursor-color, #1A1A1A)'}`,
            opacity: hovered ? 0.7 : clicked ? 0.9 : 0.5,
            background: hovered ? 'rgba(124,58,237,0.06)' : 'transparent',
            transition: 'width 0.2s cubic-bezier(0.23,1,0.32,1), height 0.2s cubic-bezier(0.23,1,0.32,1), border-radius 0.2s ease, border-color 0.2s ease, opacity 0.2s ease, background 0.2s ease',
          }}
        />
      </div>

      <style>{`
        :root { --cursor-color: #1A1A1A; }
        .dark { --cursor-color: #ffffff; }
      `}</style>
    </>
  )
}
