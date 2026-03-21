'use client'

import FloatingCard from '../ui/FloatingCard'
import { SectionAnimate, sectionItem } from '../ui/SectionAnimate'
import { motion } from 'framer-motion'

const courses = [
  { code: 'CS 189', name: 'Machine Learning' },
  { code: 'CS 61B', name: 'Data Structures' },
  { code: 'CS 170', name: 'Efficient Algorithms & Intractable Problems' },
  { code: 'CS 61A', name: 'Structure & Interpretation of Computer Programs' },
]

const stats = [
  { label: 'Class', value: '2027' },
  { label: 'Major', value: 'CS' },
  { label: 'School', value: 'CDSS' },
  { label: 'Celsius Cans', value: '∞' },
]

export default function Berkeley() {
  return (
    <section className="h-[100dvh] flex flex-col justify-start md:justify-center px-6 md:px-10 pt-20 md:pt-16 pb-8 overflow-y-auto md:overflow-y-visible [&::-webkit-scrollbar]:hidden">
      <SectionAnimate index={2}>
        <motion.div variants={sectionItem} className="mb-5">
          <p className="text-xs font-semibold text-[#F9A8D4] dark:text-[#F0ABFC] tracking-widest uppercase mb-1">
            UC Berkeley
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] dark:text-white tracking-tight">
            Go Bears! 🐻
          </h2>
        </motion.div>

        {/* Stats row */}
        <motion.div variants={sectionItem} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {stats.map((s) => (
            <FloatingCard key={s.label} className="glass-card rounded-2xl p-4 text-center">
              <p className="text-2xl font-black text-[#60A5FA] dark:text-[#F0ABFC]">{s.value}</p>
              <p className="text-[10px] font-semibold text-[#6B7280] dark:text-gray-400 uppercase tracking-wider mt-0.5">{s.label}</p>
            </FloatingCard>
          ))}
        </motion.div>

        {/* Courses */}
        <motion.div variants={sectionItem} className="mb-4">
          <p className="text-xs font-semibold text-[#6B7280] dark:text-gray-400 uppercase tracking-widest mb-2">Relevant Coursework</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {courses.map((c) => (
              <FloatingCard key={c.code} className="glass-card rounded-xl">
                <div className="flex items-center gap-3 p-3">
                  <span className="text-[10px] font-bold text-[#93C5FD] dark:text-[#BAE6FD] bg-[#93C5FD]/10 dark:bg-[#93C5FD]/10 px-2 py-1 rounded-lg flex-shrink-0">
                    {c.code}
                  </span>
                  <span className="text-xs font-medium text-[#1A1A1A] dark:text-white leading-tight">{c.name}</span>
                </div>
              </FloatingCard>
            ))}
          </div>
        </motion.div>

        {/* Celsius bit */}
        <motion.div variants={sectionItem}>
          <FloatingCard className="glass-card rounded-2xl">
            <div className="flex items-center gap-4 p-4">
              <div className="text-3xl">🥤</div>
              <div>
                <p className="text-sm font-bold text-[#1A1A1A] dark:text-white">/dev/random</p>
                <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5 leading-relaxed">
                  Powered by Celsius Peach Mango Green Tea and questionable sleep habits.
                </p>
              </div>
            </div>
          </FloatingCard>
        </motion.div>
      </SectionAnimate>
    </section>
  )
}
