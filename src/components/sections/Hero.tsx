'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import MagneticButton from '../ui/MagneticButton'

const HeroSphere = dynamic(() => import('../three/HeroSphere'), { ssr: false })

const titleWords = 'Software Engineer & Builder.'.split(' ')
const subtitleWords = 'CS @ UC Berkeley · Building with AI.'.split(' ')

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen overflow-hidden flex items-center">
      <div className="w-full max-w-6xl mx-auto px-8 flex items-center gap-12">
        {/* Text — left */}
        <div className="flex-1 z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium text-[#7C3AED] dark:text-[#A78BFA] tracking-widest uppercase mb-5"
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            className="text-6xl lg:text-7xl font-black text-[#1A1A1A] dark:text-white leading-[1.05] tracking-tight mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Ayush Bhujle
          </motion.h1>

          <div className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] dark:text-white leading-tight mb-2 flex flex-wrap gap-x-2">
            {titleWords.map((word, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}>
                {word}
              </motion.span>
            ))}
          </div>

          <div className="text-base text-[#6B7280] dark:text-gray-400 mb-10 flex flex-wrap gap-x-2">
            {subtitleWords.map((word, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.6 + i * 0.07 }}>
                {word}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton className="px-7 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-full transition-colors duration-200 text-sm">
              View my work
            </MagneticButton>
            <MagneticButton className="px-7 py-3 border border-[#E5E7EB] dark:border-white/20 text-[#1A1A1A] dark:text-white hover:border-[#7C3AED] hover:text-[#7C3AED] dark:hover:border-[#A78BFA] dark:hover:text-[#A78BFA] font-semibold rounded-full transition-all duration-200 text-sm">
              Let&apos;s connect
            </MagneticButton>
          </motion.div>
        </div>

        {/* 3D sphere — right */}
        <motion.div
          className="flex-1 h-[80vh] hidden lg:block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          <HeroSphere />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-[#6B7280] dark:text-gray-500 tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-px h-8 bg-gradient-to-b from-[#7C3AED] to-transparent" />
      </motion.div>
    </section>
  )
}
