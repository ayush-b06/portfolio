'use client'

import { motion } from 'framer-motion'
import ThemeToggle from './ui/ThemeToggle'
import { goTo, SECTIONS } from '@/lib/navigation'

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-4 left-1/2 z-50"
      style={{ transform: 'translateX(-50%)' }}
    >
      <div
        className="flex items-center gap-8 px-6 py-3 rounded-2xl"
        style={{
          background: 'rgba(255,255,255,0.72)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.6)',
          boxShadow: '0 8px 32px rgba(124,58,237,0.08), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.04)',
        }}
      >
        <motion.button
          onClick={() => goTo(0)}
          className="text-sm font-black text-[#1A1A1A] dark:text-white tracking-tight mr-2"
          whileHover={{ scale: 1.05 }}
        >
          AB<span className="text-[#7C3AED]">.</span>
        </motion.button>

        <div className="w-px h-4 bg-[#E5E7EB] dark:bg-white/10" />

        <div className="flex items-center gap-6">
          {SECTIONS.map((label, idx) => (
            <motion.button
              key={label}
              onClick={() => goTo(idx)}
              className="text-xs font-semibold text-[#6B7280] hover:text-[#7C3AED] dark:text-gray-400 dark:hover:text-[#A78BFA] transition-colors duration-200 tracking-wide"
              whileHover={{ y: -1 }}
            >
              {label}
            </motion.button>
          ))}
        </div>

        <div className="w-px h-4 bg-[#E5E7EB] dark:bg-white/10" />

        <ThemeToggle />
      </div>
    </motion.nav>
  )
}
