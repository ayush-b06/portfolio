'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import scrollState from '@/lib/scrollState'
import mouseState from '@/lib/mouseState'
import { registerGoTo } from '@/lib/navigation'
import { setSectionIndex } from '@/lib/sectionState'

const PANELS = 6       // About, Currently, Berkeley, Projects, Experience, Contact
const THRESHOLD = 320
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
    setSectionIndex(idx)
    animate(yMotion, -idx * window.innerHeight, {
      type: 'spring', stiffness: 280, damping: 32,
      onComplete: () => { locked.current = false },
    })
  }

  const touchStartY = useRef(0)
  const touchStartX = useRef(0)

  useEffect(() => {
    registerGoTo(goTo)

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (locked.current) return
      const dir = e.deltaY > 0 ? 1 : -1
      if (dir === -1 && currentIdx.current === 0) return
      if (dir === 1 && currentIdx.current === PANELS - 1) return
      accumRef.current += e.deltaY
      const progress = Math.min(Math.abs(accumRef.current) / THRESHOLD, 1)
      scrollState.progress = progress
      scrollState.direction = accumRef.current > 0 ? 1 : -1
      const drag = -(accumRef.current / THRESHOLD) * MAX_DRAG
      yMotion.set(-currentIdx.current * window.innerHeight + Math.max(-MAX_DRAG, Math.min(MAX_DRAG, drag)))
      if (Math.abs(accumRef.current) >= THRESHOLD) goTo(currentIdx.current + dir)
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (locked.current) return
      const dy = touchStartY.current - e.changedTouches[0].clientY
      const dx = touchStartX.current - e.changedTouches[0].clientX
      // Only trigger on predominantly vertical swipes of 50px+
      if (Math.abs(dy) < 50 || Math.abs(dy) < Math.abs(dx)) return
      goTo(currentIdx.current + (dy > 0 ? 1 : -1))
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
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
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
