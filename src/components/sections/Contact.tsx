'use client'

import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react'
import FloatingCard from '../ui/FloatingCard'

const socialLinks = [
  { icon: Github, label: 'GitHub', sub: 'ayush-b06', href: 'https://github.com/ayush-b06' },
  { icon: Linkedin, label: 'LinkedIn', sub: 'ayushbhujle', href: 'https://linkedin.com/in/ayushbhujle' },
  { icon: Mail, label: 'Email', sub: 'ayushbhujle@berkeley.edu', href: 'mailto:ayushbhujle@berkeley.edu' },
]

export default function Contact() {
  return (
    <section className="h-screen flex flex-col justify-center px-10 pt-16 pb-8">
      <div className="mb-6">
        <p className="text-xs font-semibold text-[#7C3AED] dark:text-[#A78BFA] tracking-widest uppercase mb-1">
          Get in Touch
        </p>
        <h2 className="text-4xl font-black text-[#1A1A1A] dark:text-white tracking-tight mb-2">
          Let&apos;s build<br />something.
        </h2>
        <p className="text-sm text-[#6B7280] dark:text-gray-400 max-w-xs leading-relaxed">
          Whether you have a project, a role to fill, or just want to talk tech — I&apos;m always up for a good conversation.
        </p>
      </div>

      <a
        href="mailto:ayushbhujle@berkeley.edu"
        className="self-start mb-8 px-7 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-full text-sm transition-colors duration-200"
      >
        Say hello →
      </a>

      <div className="flex flex-col gap-3">
        {socialLinks.map(({ icon: Icon, label, sub, href }) => (
          <FloatingCard key={label} className="glass-card rounded-2xl">
            <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#7C3AED]/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-[#7C3AED] dark:text-[#A78BFA]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A1A1A] dark:text-white">{label}</p>
                  <p className="text-xs text-[#6B7280] dark:text-gray-400">{sub}</p>
                </div>
              </div>
              <ArrowUpRight size={14} className="text-[#6B7280] group-hover:text-[#7C3AED] transition-colors" />
            </a>
          </FloatingCard>
        ))}
      </div>

      <p className="mt-auto pt-6 text-xs text-[#6B7280] dark:text-gray-500 border-t border-[#E5E7EB] dark:border-white/10">
        Designed &amp; built by Ayush Bhujle · 2025
      </p>
    </section>
  )
}
