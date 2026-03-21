'use client'

import { SectionAnimate, sectionItem } from '../ui/SectionAnimate'
import { motion } from 'framer-motion'

const experiences = [
  {
    role: 'SDE Intern',
    company: 'Amazon',
    period: 'Summer 2026',
    note: 'Incoming',
    description: 'Stores team, Seattle. Building at scale on the world\'s largest e-commerce platform.',
    gradient: 'from-[#60A5FA] to-[#818CF8]',
    color: '#60A5FA',
  },
  {
    role: 'AI Engineer (Contract)',
    company: 'Handshake',
    period: 'Spring 2026',
    description: 'Evaluating LLM performance across production codebases — Azure SDK, Google Cloud SDK, Svelte. 70+ engineering tasks weekly exposing model hallucinations.',
    gradient: 'from-[#A78BFA] to-[#7C3AED]',
    color: '#A78BFA',
  },
  {
    role: 'Technology Intern',
    company: 'Accenture',
    period: 'Summer 2024',
    description: 'Built automated Python pipelines for web accessibility on high-traffic sites like Walmart. Cut manual review time by 40% with AI-driven semantic tagging.',
    gradient: 'from-[#7C3AED] to-[#60A5FA]',
    color: '#7C3AED',
  },
  {
    role: 'Software Engineer Intern',
    company: 'Project Empower',
    period: 'Spring 2024',
    description: 'Built an internal coordination tool with Next.js, TypeScript, and Firebase. Implemented real-time updates and custom role logic with the founding engineers.',
    gradient: 'from-[#818CF8] to-[#F0ABFC]',
    color: '#818CF8',
  },
]

export default function Experience() {
  return (
    <section className="h-screen flex flex-col justify-start md:justify-center px-6 md:px-10 pt-20 md:pt-16 pb-8 overflow-y-auto md:overflow-y-visible [&::-webkit-scrollbar]:hidden">
      <SectionAnimate index={4}>
        <motion.div variants={sectionItem} className="mb-0">
          <p className="text-xs font-semibold text-[#F9A8D4] dark:text-[#F0ABFC] tracking-widest uppercase mb-1">
            Where I&apos;ve Been
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] dark:text-white tracking-tight">
            Experience
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3 mt-4 max-h-[68vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">
          {experiences.map((exp) => (
            <motion.div key={exp.company} variants={sectionItem}>
              <div className="glass-card rounded-2xl flex-shrink-0">
                <div className="flex items-stretch">
                  <div className={`w-1.5 rounded-l-2xl flex-shrink-0 bg-gradient-to-b ${exp.gradient}`} />
                  <div className="p-4 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-sm text-[#1A1A1A] dark:text-white leading-tight">{exp.role}</h3>
                        <p className="text-xs font-semibold mt-0.5 text-[#F9A8D4] dark:text-[#F0ABFC]">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-[#6B7280] dark:text-gray-500">{exp.period}</span>
                        {exp.note && (
                          <span className="text-[10px] font-semibold text-[#F9A8D4] bg-[#F9A8D4]/10 dark:text-[#F0ABFC] dark:bg-[#F0ABFC]/15 px-2 py-0.5 rounded-full">
                            {exp.note}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-1.5 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionAnimate>
    </section>
  )
}
