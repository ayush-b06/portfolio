'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ui/ThemeToggle'
import { goTo, SECTIONS } from '@/lib/navigation'
import { onSectionChange, getSectionIndex } from '@/lib/sectionState'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [active, setActive] = useState(getSectionIndex())
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => onSectionChange(setActive), [])

  const handleNav = (idx: number) => {
    goTo(idx)
    setMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-4 left-1/2 z-50"
        style={{ transform: 'translateX(-50%)' }}
      >
        <div
          className="flex items-center gap-6 px-6 py-3 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.72)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.6)',
            boxShadow: '0 8px 32px rgba(124,58,237,0.08), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.04)',
          }}
        >
          <motion.button
            onClick={() => handleNav(0)}
            className="text-sm font-black text-[#1A1A1A] dark:text-white tracking-tight"
            whileHover={{ scale: 1.05 }}
          >
            AB<span className="text-[#60A5FA]">.</span>
          </motion.button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            <div className="w-px h-4 bg-[#E5E7EB] dark:bg-white/10 mr-2" />
            {SECTIONS.map((label, idx) => (
              <button
                key={label}
                onClick={() => handleNav(idx)}
                className="relative px-3 py-1.5 rounded-lg"
              >
                {active === idx && (
                  <motion.div
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'linear-gradient(135deg, rgba(147,197,253,0.18) 0%, rgba(249,168,212,0.18) 100%)',
                      border: '0.5px solid rgba(147,197,253,0.3)',
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <span
                  className="relative z-10 text-xs font-semibold tracking-wide transition-colors duration-200"
                  style={{ color: active === idx ? '#1A1A1A' : '#6B7280' }}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>

          <div className="hidden md:block w-px h-4 bg-[#E5E7EB] dark:bg-white/10" />
          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg text-[#6B7280]"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.88)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.6)',
                boxShadow: '0 8px 32px rgba(124,58,237,0.1), 0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              {SECTIONS.map((label, idx) => (
                <button
                  key={label}
                  onClick={() => handleNav(idx)}
                  className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-semibold transition-colors duration-150"
                  style={{ color: active === idx ? '#60A5FA' : '#1A1A1A', borderBottom: idx < SECTIONS.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}
                >
                  {label}
                  {active === idx && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F9A8D4]" />
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
