'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { onSectionChange, getSectionIndex } from '@/lib/sectionState'

const TOTAL = 6

export default function TopProgressBar() {
  const [active, setActive] = useState(getSectionIndex())

  useEffect(() => onSectionChange(setActive), [])

  const pct = (active / (TOTAL - 1)) * 100

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3.5px] bg-transparent">
      <motion.div
        className="h-full origin-left"
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: 'linear-gradient(90deg, #93C5FD 0%, #C4B5FD 50%, #F9A8D4 100%)',
          boxShadow: '0 0 8px rgba(147,197,253,0.6)',
        }}
      />
    </div>
  )
}
