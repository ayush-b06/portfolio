'use client'

import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'
import { useSectionActive } from '@/lib/useSectionActive'

interface Props {
  index: number
  children: ReactNode
}

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export function SectionAnimate({ index, children }: Props) {
  const active = useSectionActive(index)
  return (
    <motion.div
      key={active ? 'active' : 'idle'}
      variants={container}
      initial="hidden"
      animate={active ? 'show' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}

export { item as sectionItem }
