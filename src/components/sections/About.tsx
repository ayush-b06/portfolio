'use client'

import { motion } from 'framer-motion'
import { goTo } from '@/lib/navigation'
import { ArrowRight, Mail } from 'lucide-react'

const skills = ['Python', 'TypeScript', 'React', 'Next.js', 'Node.js', 'AWS', 'TensorFlow', 'Firebase', 'PostgreSQL', 'Tailwind CSS', 'Git']

export default function About() {
  return (
    <section className="h-screen flex flex-col justify-center px-10 pt-16 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      >
        <p className="text-xs font-semibold text-[#7C3AED] dark:text-[#A78BFA] tracking-widest uppercase mb-3">
          Hello, I&apos;m
        </p>

        <h1 className="text-6xl font-black text-[#1A1A1A] dark:text-white tracking-tight leading-[1.05] mb-3 whitespace-nowrap">
          Ayush Bhujle
        </h1>

        <p className="text-lg font-medium text-[#6B7280] dark:text-gray-400 mb-5 max-w-sm leading-relaxed">
          CS @ Berkeley &apos;27. I build things that are fast, smart, and actually useful — from AI agents to full-stack products. Currently incoming SDE intern at Amazon.
        </p>

        <div className="flex flex-wrap gap-2 mb-7">
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.04, ease: [0.23, 1, 0.32, 1] }}
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
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => goTo(2)}
            className="group flex items-center gap-2 px-6 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-2xl text-sm transition-all duration-200 shadow-lg shadow-[#7C3AED]/30 hover:shadow-[#7C3AED]/50 hover:-translate-y-0.5"
          >
            View my work
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
          <button
            onClick={() => goTo(4)}
            className="group flex items-center gap-2 px-6 py-3 text-[#1A1A1A] dark:text-white font-semibold rounded-2xl text-sm transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: 'rgba(255,255,255,0.75)',
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Mail size={14} className="text-[#7C3AED]" />
            Contact me
          </button>
        </div>
      </motion.div>
    </section>
  )
}
