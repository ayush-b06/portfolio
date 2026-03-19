'use client'

import FloatingCard from '../ui/FloatingCard'
import { ExternalLink } from 'lucide-react'

const projects = [
  {
    name: 'Lucidify',
    description: 'AI-powered web dev agency platform — project scoping, client comms, and automated deliverables.',
    stack: ['Next.js', 'Vercel', 'SCSS'],
    link: 'https://github.com/ayush-b06/lucidify',
    gradient: 'from-[#7C3AED] to-[#60A5FA]',
  },
  {
    name: 'FlamingoWatch',
    description: 'LSTM-based flamingo migration prediction with real-time satellite data. 92% accuracy.',
    stack: ['TensorFlow', 'AWS Lambda', 'Firebase'],
    gradient: 'from-[#F0ABFC] to-[#A78BFA]',
  },
  {
    name: 'CeepzRoyaleArenaHub',
    description: 'Clash Royale clan hub with real-time stats, tournament brackets, and leaderboards.',
    stack: ['React', 'TypeScript', 'Supabase'],
    link: 'https://github.com/ayush-b06',
    gradient: 'from-[#60A5FA] to-[#818CF8]',
  },
  {
    name: 'Stackbirds Invoice Agent',
    description: 'AI invoice processing agent — extracts, validates, and routes data at 99% accuracy.',
    stack: ['Python', 'LangChain', 'OpenAI'],
    gradient: 'from-[#A78BFA] to-[#7C3AED]',
  },
]

export default function Projects() {
  return (
    <section className="h-screen flex flex-col justify-center px-10 pt-16 pb-8">
      <div className="mb-5">
        <p className="text-xs font-semibold text-[#7C3AED] dark:text-[#A78BFA] tracking-widest uppercase mb-1">
          Selected Work
        </p>
        <h2 className="text-4xl font-black text-[#1A1A1A] dark:text-white tracking-tight">
          Projects
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 flex-1 max-h-[62vh]">
        {projects.map((p) => (
          <FloatingCard key={p.name} className="glass-card rounded-2xl flex flex-col h-full">
            {/* Gradient top bar */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${p.gradient} rounded-t-2xl flex-shrink-0`} />
            <div className="p-4 flex flex-col flex-1">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-base text-[#1A1A1A] dark:text-white leading-tight">{p.name}</h3>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-[#7C3AED]/10 hover:bg-[#7C3AED] transition-colors duration-200 group/lnk"
                  >
                    <ExternalLink size={11} className="text-[#7C3AED] group-hover/lnk:text-white transition-colors" />
                  </a>
                )}
              </div>
              <p className="text-xs text-[#6B7280] dark:text-gray-400 leading-relaxed line-clamp-3 flex-1 mb-3">
                {p.description}
              </p>
              <div className="flex gap-1.5 flex-wrap">
                {p.stack.map(t => (
                  <span key={t} className="text-[10px] font-medium text-[#7C3AED] dark:text-[#A78BFA] bg-[#7C3AED]/8 dark:bg-[#A78BFA]/10 px-2 py-0.5 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </FloatingCard>
        ))}
      </div>
    </section>
  )
}
