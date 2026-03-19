'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { goTo } from '@/lib/navigation'
import { ArrowRight, Mail } from 'lucide-react'
import { onSectionChange, getSectionIndex } from '@/lib/sectionState'

const skills = ['Python', 'TypeScript', 'React', 'Next.js', 'Node.js', 'AWS', 'TensorFlow', 'Firebase', 'PostgreSQL', 'Tailwind CSS', 'Git']
const NAME = 'Ayush Bhujle'
const BIO = "CS @ Berkeley '27. I build things that are fast, smart, and actually useful - from AI agents to full-stack products."

export default function About() {
  const [typed, setTyped] = useState('')
  const [typedBio, setTypedBio] = useState('')
  const [showNameCursor, setShowNameCursor] = useState(true)
  const [showBioCursor, setShowBioCursor] = useState(false)
  const [nameDone, setNameDone] = useState(false)
  const [bioDone, setBioDone] = useState(false)
  const [atHero, setAtHero] = useState(getSectionIndex() === 0)

  // Type name
  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i++
      setTyped(NAME.slice(0, i))
      if (i >= NAME.length) {
        clearInterval(interval)
        setNameDone(true)
        setTimeout(() => setShowNameCursor(false), 400)
      }
    }, 65)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => onSectionChange(idx => setAtHero(idx === 0)), [])

  // Type bio after name finishes
  useEffect(() => {
    if (!nameDone) return
    setShowBioCursor(true)
    let i = 0
    const interval = setInterval(() => {
      i++
      setTypedBio(BIO.slice(0, i))
      if (i >= BIO.length) {
        clearInterval(interval)
        setTimeout(() => {
          setShowBioCursor(false)
          setBioDone(true)
        }, 400)
      }
    }, 18)
    return () => clearInterval(interval)
  }, [nameDone])

  return (
    <section className="relative h-screen flex flex-col justify-center px-6 md:px-10 pt-16 pb-8">
      <motion.p
        className="text-xs font-semibold text-[#F9A8D4] dark:text-[#F0ABFC] tracking-widest uppercase mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        Hello, I&apos;m
      </motion.p>

      <h1 className="text-4xl md:text-6xl font-black text-[#1A1A1A] dark:text-white tracking-tight leading-[1.05] mb-3">
        {typed}
        {showNameCursor && (
          <span className="inline-block w-[3px] h-[0.85em] bg-[#F9A8D4] ml-1 align-middle animate-pulse" />
        )}
      </h1>

      <p className="text-base md:text-lg font-medium text-[#6B7280] dark:text-gray-400 mb-5 max-w-full md:max-w-sm leading-relaxed min-h-[4rem] md:min-h-[3.5rem]">
        {typedBio}
        {showBioCursor && (
          <span className="inline-block w-[2px] h-[1em] bg-[#93C5FD] ml-0.5 align-middle animate-pulse" />
        )}
      </p>

      <motion.div
        className="flex flex-wrap gap-2 mb-5 md:mb-7"
        initial={{ opacity: 0 }}
        animate={{ opacity: bioDone ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        {skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: bioDone ? 1 : 0, y: bioDone ? 0 : 8 }}
            transition={{ duration: 0.35, delay: i * 0.04, ease: 'easeOut' }}
            whileHover={{ y: -3, transition: { duration: 0.15 } }}
            className="text-xs font-semibold text-[#374151] dark:text-white/80 px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.75)',
              border: '1px solid rgba(124,58,237,0.12)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>

      <motion.div
        className="flex flex-wrap gap-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: bioDone ? 1 : 0, y: bioDone ? 0 : 12 }}
        transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
      >
        <button
          onClick={() => goTo(2)}
          className="group relative flex items-center gap-2.5 px-6 py-3 text-sm font-bold rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
          style={{ background: '#1A1A1A', color: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
        >
          <span className="relative z-10 flex items-center gap-2.5">
            View my work
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </span>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'linear-gradient(135deg, #93C5FD 0%, #F9A8D4 100%)' }} />
        </button>
        <button
          onClick={() => goTo(4)}
          className="group flex items-center gap-2 px-6 py-3 font-semibold rounded-xl text-sm transition-all duration-200 hover:-translate-y-0.5"
          style={{ color: '#1A1A1A', background: 'transparent', border: '1.5px solid rgba(0,0,0,0.15)' }}
        >
          <Mail size={14} className="text-[#F9A8D4]" />
          Contact me
        </button>
      </motion.div>
      {/* Scroll indicator */}
      <AnimatePresence>
        {bioDone && atHero && (
          <motion.div
            className="absolute bottom-8 left-6 md:left-10 flex items-center gap-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
          >
            {/* Animated scroll line */}
            <div className="relative flex flex-col items-center gap-1">
              <motion.div
                className="w-[1.5px] h-5 rounded-full"
                style={{ background: 'linear-gradient(to bottom, #93C5FD, #F9A8D4)' }}
                animate={{ scaleY: [1, 0.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-[#F9A8D4]"
                animate={{ y: [0, 4, 0], opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            <span className="text-[11px] font-semibold text-[#6B7280] dark:text-gray-500 tracking-widest uppercase">
              Scroll
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
