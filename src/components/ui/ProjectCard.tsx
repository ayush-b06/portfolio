'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

interface ProjectCardProps {
  name: string
  description: string
  stack: string[]
  link?: string
  gradient: string
  large?: boolean
}

export default function ProjectCard({ name, description, stack, link, gradient }: ProjectCardProps) {
  return (
    <motion.div
      className="glass-card rounded-xl overflow-hidden group flex h-full"
      whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(124, 58, 237, 0.12)' }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Color accent strip */}
      <div className={`w-1.5 flex-shrink-0 ${gradient}`} />

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-bold text-sm text-[#1A1A1A] dark:text-white group-hover:text-[#7C3AED] dark:group-hover:text-[#A78BFA] transition-colors leading-tight">
            {name}
          </h3>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-[#7C3AED]/10 hover:bg-[#7C3AED] transition-colors duration-200 group/link"
            >
              <ExternalLink size={11} className="text-[#7C3AED] group-hover/link:text-white transition-colors duration-200" />
            </a>
          )}
        </div>

        <p className="text-xs text-[#6B7280] dark:text-gray-400 leading-relaxed line-clamp-2 flex-1 mb-2">
          {description}
        </p>

        <div className="flex gap-1.5 flex-wrap">
          {stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-medium text-[#7C3AED] dark:text-[#A78BFA] bg-[#7C3AED]/8 dark:bg-[#A78BFA]/10 px-2 py-0.5 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
