'use client'

import { Mail, GitBranch, Link2, ArrowUpRight } from 'lucide-react'
import { SectionAnimate, sectionItem } from '../ui/SectionAnimate'
import { motion } from 'framer-motion'

const socialLinks = [
  { icon: GitBranch, label: 'GitHub', sub: 'ayush-b06', href: 'https://github.com/ayush-b06' },
  { icon: Link2, label: 'LinkedIn', sub: 'ayush-bhujle', href: 'https://www.linkedin.com/in/ayush-bhujle-4323b9279/' },
  { icon: Mail, label: 'Email', sub: 'ayush_b@berkeley.edu', href: 'mailto:ayush_b@berkeley.edu' },
]

export default function Contact() {
  return (
    <section className="h-screen flex flex-col justify-center px-6 md:px-10 pt-16 pb-8">
      <SectionAnimate index={4}>
        <motion.div variants={sectionItem}>
          <p className="text-xs font-semibold text-[#F9A8D4] dark:text-[#F0ABFC] tracking-widest uppercase mb-2">
            Get in Touch
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] dark:text-white tracking-tight mb-3">
            Let&apos;s build something.
          </h2>
          <p className="text-sm text-[#6B7280] dark:text-gray-400 max-w-full md:max-w-xs leading-relaxed mb-5">
            Whether you have a project, a role to fill, or just want to talk tech — I&apos;m always up for a good conversation.
          </p>
        </motion.div>

        {/* Social cards */}
        <div className="flex flex-col gap-2.5 w-full">
          {socialLinks.map(({ icon: Icon, label, sub, href }) => (
            <motion.a
              key={label}
              variants={sectionItem}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-4 rounded-2xl transition-all duration-200 hover:scale-[0.97] active:scale-95"
              style={{
                background: 'rgba(255,255,255,0.72)',
                border: '1px solid rgba(255,255,255,0.6)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)',
                backdropFilter: 'blur(14px)',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#60A5FA]/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={15} className="text-[#60A5FA] dark:text-[#F0ABFC]" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-[#1A1A1A] dark:text-white">{label}</p>
                  <p className="text-xs text-[#6B7280] dark:text-gray-400">{sub}</p>
                </div>
              </div>
              <ArrowUpRight size={14} className="text-[#6B7280] group-hover:text-[#60A5FA] transition-colors" />
            </motion.a>
          ))}
        </div>

        <motion.p variants={sectionItem} className="mt-6 text-xs text-[#6B7280] dark:text-gray-500">
          Designed &amp; built by Ayush Bhujle · 2026
        </motion.p>
      </SectionAnimate>
    </section>
  )
}
