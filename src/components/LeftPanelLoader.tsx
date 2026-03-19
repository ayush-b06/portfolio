'use client'

import dynamic from 'next/dynamic'

const ProjectsBracket = dynamic(() => import('./three/ProjectsBracket'), { ssr: false })

export default function LeftPanelLoader() {
  return (
    <div className="w-full h-full">
      <ProjectsBracket />
    </div>
  )
}
