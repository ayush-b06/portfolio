'use client'

import FloatingCard from '../ui/FloatingCard'

const courses = [
  { code: 'CS 189', name: 'Machine Learning' },
  { code: 'CS 61B', name: 'Data Structures' },
  { code: 'CS 170', name: 'Efficient Algorithms & Intractable Problems' },
  { code: 'CS 61A', name: 'Structure of Computer Programs' },
]

const stats = [
  { label: 'Class', value: '2027' },
  { label: 'Major', value: 'CS' },
  { label: 'School', value: 'L&S' },
  { label: 'Cans', value: '∞' },
]

export default function Berkeley() {
  return (
    <section className="h-screen flex flex-col justify-center px-10 pt-16 pb-8">
      <div className="mb-5">
        <p className="text-xs font-semibold text-[#7C3AED] dark:text-[#A78BFA] tracking-widest uppercase mb-1">
          UC Berkeley
        </p>
        <h2 className="text-4xl font-black text-[#1A1A1A] dark:text-white tracking-tight">
          Go Bears.
        </h2>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {stats.map((s) => (
          <FloatingCard key={s.label} className="glass-card rounded-2xl p-4 text-center">
            <p className="text-2xl font-black text-[#7C3AED] dark:text-[#A78BFA]">{s.value}</p>
            <p className="text-[10px] font-semibold text-[#6B7280] dark:text-gray-400 uppercase tracking-wider mt-0.5">{s.label}</p>
          </FloatingCard>
        ))}
      </div>

      {/* Courses */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-[#6B7280] dark:text-gray-400 uppercase tracking-widest mb-2">Relevant Coursework</p>
        <div className="grid grid-cols-2 gap-2">
          {courses.map((c) => (
            <FloatingCard key={c.code} className="glass-card rounded-xl">
              <div className="flex items-center gap-3 p-3">
                <span className="text-[10px] font-bold text-[#7C3AED] dark:text-[#A78BFA] bg-[#7C3AED]/8 dark:bg-[#A78BFA]/10 px-2 py-1 rounded-lg flex-shrink-0">
                  {c.code}
                </span>
                <span className="text-xs font-medium text-[#1A1A1A] dark:text-white leading-tight">{c.name}</span>
              </div>
            </FloatingCard>
          ))}
        </div>
      </div>

      {/* Celsius bit */}
      <FloatingCard className="glass-card rounded-2xl">
        <div className="flex items-center gap-4 p-4">
          <div className="text-3xl">🥤</div>
          <div>
            <p className="text-sm font-bold text-[#1A1A1A] dark:text-white">Certified Celsius Enthusiast</p>
            <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5 leading-relaxed">
              Fueled by Celsius and late-night coding sessions. Sparkling Water Mango is non-negotiable.
            </p>
          </div>
        </div>
      </FloatingCard>
    </section>
  )
}
