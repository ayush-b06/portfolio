'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { onSectionChange, getSectionIndex } from '@/lib/sectionState'
import { goTo } from '@/lib/navigation'

const SECTIONS = ['About', 'Berkeley', 'Projects', 'Experience', 'Contact']

export default function SectionDots() {
  const [active, setActive] = useState(getSectionIndex())
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => onSectionChange(setActive), [])

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3">
      {SECTIONS.map((label, i) => (
        <button
          key={label}
          onClick={() => goTo(i)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          className="relative flex items-center justify-end group"
          style={{ width: 80, height: 20 }}
          aria-label={`Go to ${label}`}
        >
          {/* Label */}
          <AnimatePresence>
            {hovered === i && (
              <motion.span
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="absolute right-6 text-[11px] font-semibold tracking-wide whitespace-nowrap"
                style={{ color: active === i ? '#93C5FD' : '#6B7280' }}
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Dot */}
          <motion.div
            animate={
              active === i
                ? { width: 24, height: 6, borderRadius: 99 }
                : { width: 6, height: 6, borderRadius: 99 }
            }
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={
              active === i
                ? { background: 'linear-gradient(90deg, #93C5FD, #F9A8D4)', flexShrink: 0 }
                : { background: hovered === i ? '#93C5FD' : 'rgba(107,114,128,0.45)', flexShrink: 0, transition: 'background 0.2s' }
            }
          />
        </button>
      ))}
    </div>
  )
}
