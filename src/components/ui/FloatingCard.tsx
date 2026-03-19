'use client'

import { useRef, useState, ReactNode } from 'react'

interface FloatingCardProps {
  children: ReactNode
  className?: string
  intensity?: number
}

export default function FloatingCard({ children, className = '', intensity = 22 }: FloatingCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glow, setGlow] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width   // 0–1
    const ny = (e.clientY - r.top) / r.height    // 0–1
    setTilt({ x: (0.5 - ny) * intensity, y: (nx - 0.5) * intensity })
    setGlow({ x: nx * 100, y: ny * 100 })
  }

  const onLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{
        transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${hovered ? 16 : 0}px)`,
        boxShadow: hovered
          ? `${-tilt.y * 0.8}px ${tilt.x * 0.8 + 16}px 40px rgba(124, 58, 237, 0.22)`
          : '0 4px 20px rgba(0,0,0,0.06)',
        transition: 'transform 0.1s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.1s cubic-bezier(0.23, 1, 0.32, 1)',
        transformStyle: 'preserve-3d',
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Shine */}
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.22) 0%, transparent 65%)`,
          }}
        />
      )}
      {children}
    </div>
  )
}
