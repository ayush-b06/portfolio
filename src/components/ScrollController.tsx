'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import scrollState from '@/lib/scrollState'
import mouseState from '@/lib/mouseState'
import { registerGoTo } from '@/lib/navigation'

const PANELS = 5       // About, Berkeley, Projects, Experience, Contact
const THRESHOLD = 500
const MAX_DRAG = 55

export default function ScrollController({ children }: { children: ReactNode }) {
  const yMotion = useMotionValue(0)
  const currentIdx = useRef(0)
  const accumRef = useRef(0)
  const locked = useRef(false)

  const goTo = (idx: number) => {
    idx = Math.max(0, Math.min(idx, PANELS - 1))
    if (idx === currentIdx.current) {
      animate(yMotion, -currentIdx.current * window.innerHeight, {
        type: 'spring', stiffness: 400, damping: 40,
      })
      accumRef.current = 0
      scrollState.progress = 0
      scrollState.direction = 0
      return
    }
    locked.current = true
    currentIdx.current = idx
    accumRef.current = 0
    scrollState.progress = 0
    scrollState.direction = 0
    animate(yMotion, -idx * window.innerHeight, {
      type: 'spring', stiffness: 280, damping: 32,
      onComplete: () => { locked.current = false },
    })
  }

  useEffect(() => {
    registerGoTo(goTo)

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (locked.current) return
      accumRef.current += e.deltaY
      const dir = accumRef.current > 0 ? 1 : -1
      const progress = Math.min(Math.abs(accumRef.current) / THRESHOLD, 1)
      scrollState.progress = progress
      scrollState.direction = dir
      const drag = -(accumRef.current / THRESHOLD) * MAX_DRAG
      yMotion.set(-currentIdx.current * window.innerHeight + Math.max(-MAX_DRAG, Math.min(MAX_DRAG, drag)))
      if (Math.abs(accumRef.current) >= THRESHOLD) goTo(currentIdx.current + dir)
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseState.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseState.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'ArrowDown' || e.key === 'PageDown') && !locked.current) {
        e.preventDefault(); goTo(currentIdx.current + 1)
      }
      if ((e.key === 'ArrowUp' || e.key === 'PageUp') && !locked.current) {
        e.preventDefault(); goTo(currentIdx.current - 1)
      }
    }

    const onResize = () => yMotion.set(-currentIdx.current * window.innerHeight)

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="h-full w-full overflow-hidden">
      <motion.div style={{ y: yMotion }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  )
}
