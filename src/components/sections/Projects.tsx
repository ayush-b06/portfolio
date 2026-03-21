'use client'

import FloatingCard from '../ui/FloatingCard'
import { SectionAnimate, sectionItem } from '../ui/SectionAnimate'
import { motion } from 'framer-motion'
import { GitBranch, ExternalLink } from 'lucide-react'

const projects = [
  {
    name: 'Lucidify',
    description: 'AI-powered web dev agency platform - automated project scoping and client deliverables.\n\nBuilt end-to-end as founder. Shipped to real clients.',
    stack: ['Next.js', 'Vercel', 'SCSS'],
    github: 'https://github.com/ayush-b06/lucidify',
    live: 'https://lucidify.vercel.app',
    gradient: 'from-[#7C3AED] to-[#60A5FA]',
  },
  {
    name: 'FlamingoWatch',
    description: 'LSTM-based flamingo migration prediction using real-time satellite data.\n\n92% prediction accuracy. Full ML pipeline from ingestion to dashboard.',
    stack: ['TensorFlow', 'AWS Lambda', 'Firebase'],
    gradient: 'from-[#F0ABFC] to-[#A78BFA]',
  },
  {
    name: 'CeepzRoyaleArenaHub',
    description: 'Clash Royale clan hub - real-time stats, brackets, and leaderboards.\n\nCustom serverless proxy to bypass API IP-binding restrictions.',
    stack: ['React', 'TypeScript', 'Supabase'],
    github: 'https://github.com/ayush-b06/ceepz-royale-arena-hub',
    live: 'https://ceepz-royale.vercel.app',
    gradient: 'from-[#60A5FA] to-[#818CF8]',
  },
  {
    name: 'Stackbirds Invoice Agent',
    description: 'AI-powered invoice processing - extracts, validates, and routes automatically.\n\n99% accuracy across multi-format documents.',
    stack: ['Python', 'LangChain', 'OpenAI'],
    github: 'https://github.com/ayush-b06/stackbirds-invoice-agent',
    gradient: 'from-[#A78BFA] to-[#7C3AED]',
  },
]

export default function Projects() {
  return (
    <section className="h-[100dvh] flex flex-col justify-start md:justify-center px-6 md:px-10 pt-20 md:pt-16 pb-8 overflow-y-auto md:overflow-y-visible [&::-webkit-scrollbar]:hidden">
      <SectionAnimate index={3}>
      <motion.div variants={sectionItem} className="mb-5">
        <p className="text-xs font-semibold text-[#F9A8D4] dark:text-[#F0ABFC] tracking-widest uppercase mb-1">
          Selected Work
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] dark:text-white tracking-tight">
          Projects
        </h2>
      </motion.div>

      <motion.div variants={sectionItem} className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 max-h-[65vh] md:max-h-[52vh] overflow-y-auto md:overflow-visible [&::-webkit-scrollbar]:hidden">
        {projects.map((p) => (
          <FloatingCard key={p.name} intensity={8} className="rounded-2xl flex flex-col h-full" style={{
            background: 'var(--card-bg)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--card-border)',
            boxShadow: 'var(--card-shadow)',
          }}>
            <div className={`h-1 md:h-1.5 w-full bg-gradient-to-r ${p.gradient} rounded-t-2xl flex-shrink-0`} />
            <div className="p-3 md:p-4 flex flex-col flex-1">
              <h3 className="font-bold text-[13px] md:text-[15px] text-[#1A1A1A] dark:text-white leading-tight mb-1 md:mb-1.5">{p.name}</h3>

              <p className="text-[11.5px] md:text-[12.5px] text-[#6B7280] dark:text-gray-400 leading-relaxed flex-1 mb-2 md:mb-3 whitespace-pre-line">
                {p.description}
              </p>

              <div className="flex items-end justify-between gap-1.5">
                <div className="flex gap-1.5 flex-wrap">
                  {p.stack.map(t => (
                    <span key={t} className="text-[10px] md:text-[11px] font-semibold px-2 md:px-2.5 py-0.5 md:py-1 rounded-lg"
                      style={{ background: 'var(--tag-bg)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid var(--tag-border)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', color: 'var(--text-primary)' }}>
                      {t}
                    </span>
                  ))}
                </div>

                {(p.github || p.live) && (
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        title="GitHub"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
                        style={{ background: 'var(--pill-bg)', border: '1px solid var(--pill-border)', boxShadow: 'var(--pill-shadow)', color: 'var(--text-primary)' }}
                      >
                        <GitBranch size={11} className="text-[#93C5FD]" />
                        <span className="text-[11px] font-semibold">Code</span>
                      </a>
                    )}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        title="Live site"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
                        style={{ background: 'var(--pill-bg)', border: '1px solid var(--pill-border)', boxShadow: 'var(--pill-shadow)', color: 'var(--text-primary)' }}
                      >
                        <ExternalLink size={11} className="text-[#F9A8D4]" />
                        <span className="text-[11px] font-semibold">Live</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </FloatingCard>
        ))}
      </motion.div>
      </SectionAnimate>
    </section>
  )
}
