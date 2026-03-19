'use client'

import FloatingCard from '../ui/FloatingCard'

const experiences = [
  {
    role: 'Software Development Engineer Intern',
    company: 'Amazon',
    period: 'Summer 2026',
    note: 'Incoming',
    description: "Joining the Stores team in Seattle. Building at scale on one of the world's largest e-commerce platforms.",
    gradient: 'from-[#60A5FA] to-[#818CF8]',
    color: '#60A5FA',
  },
  {
    role: 'AI Engineer',
    company: 'Handshake',
    period: '2024 – 2025',
    note: 'Contractor',
    description: 'Led LLM evaluation pipelines and prompt engineering to improve career-matching recommendation quality.',
    gradient: 'from-[#A78BFA] to-[#7C3AED]',
    color: '#A78BFA',
  },
  {
    role: 'Technology Analyst',
    company: 'Accenture',
    period: '2024',
    description: 'Contributed to enterprise-scale digital transformation projects with cross-functional teams.',
    gradient: 'from-[#7C3AED] to-[#60A5FA]',
    color: '#7C3AED',
  },
  {
    role: 'Software Engineer',
    company: 'Project Empower',
    period: '2023 – 2024',
    description: 'Built tools to help underserved communities access educational and economic opportunities.',
    gradient: 'from-[#818CF8] to-[#F0ABFC]',
    color: '#818CF8',
  },
]

export default function Experience() {
  return (
    <section className="h-screen flex flex-col justify-center px-10 pt-16 pb-8">
      <div className="mb-5">
        <p className="text-xs font-semibold text-[#7C3AED] dark:text-[#A78BFA] tracking-widest uppercase mb-1">
          Where I&apos;ve Been
        </p>
        <h2 className="text-4xl font-black text-[#1A1A1A] dark:text-white tracking-tight">
          Experience
        </h2>
      </div>

      <div className="flex flex-col gap-3 flex-1 justify-center max-h-[68vh]">
        {experiences.map((exp) => (
          <FloatingCard key={exp.company} className="glass-card rounded-2xl flex-shrink-0">
            <div className="flex items-stretch">
              <div className={`w-1.5 rounded-l-2xl flex-shrink-0 bg-gradient-to-b ${exp.gradient}`} />
              <div className="p-4 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-sm text-[#1A1A1A] dark:text-white leading-tight">{exp.role}</h3>
                    <p className="text-xs font-semibold mt-0.5 text-[#7C3AED] dark:text-[#A78BFA]">{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-[#6B7280] dark:text-gray-500">{exp.period}</span>
                    {exp.note && (
                      <span className="text-[10px] font-semibold text-[#7C3AED] bg-[#7C3AED]/10 dark:text-[#A78BFA] dark:bg-[#A78BFA]/15 px-2 py-0.5 rounded-full">
                        {exp.note}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-1.5 leading-relaxed">{exp.description}</p>
              </div>
            </div>
          </FloatingCard>
        ))}
      </div>
    </section>
  )
}
