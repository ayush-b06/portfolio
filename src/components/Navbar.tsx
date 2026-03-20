'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ui/ThemeToggle'
import { goTo, NAV_LINKS } from '@/lib/navigation'
import { onSectionChange, getSectionIndex } from '@/lib/sectionState'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [active, setActive] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setActive(getSectionIndex())
    return onSectionChange(setActive)
  }, [])

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
            background: 'var(--surface)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--surface-border)',
            boxShadow: 'var(--surface-shadow)',
          }}
        >
          <motion.button
            onClick={() => handleNav(0)}
            className="text-sm font-black tracking-tight"
            style={{ color: 'var(--text-primary)' }}
            whileHover={{ scale: 1.05 }}
          >
            AB<span className="text-[#60A5FA]">.</span>
          </motion.button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            <div className="w-px h-4 bg-[#E5E7EB] dark:bg-white/10 mr-2" />
            {NAV_LINKS.map(({ label, idx }) => (
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
                      background: 'linear-gradient(135deg, rgba(147,197,253,0.22) 0%, rgba(249,168,212,0.22) 100%)',
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <span
                  className="relative z-10 text-xs font-semibold tracking-wide transition-colors duration-200"
                  style={{ color: active === idx ? 'var(--text-primary)' : 'var(--text-muted)' }}
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
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg"
            style={{ color: 'var(--text-muted)' }}
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
                background: 'var(--mobile-menu-bg)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid var(--surface-border)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              }}
            >
              {NAV_LINKS.map(({ label, idx }, i) => (
                <button
                  key={label}
                  onClick={() => handleNav(idx)}
                  className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-semibold transition-colors duration-150"
                  style={{
                    color: active === idx ? '#60A5FA' : 'var(--text-primary)',
                    borderBottom: i < NAV_LINKS.length - 1 ? '1px solid var(--divider)' : 'none',
                  }}
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
