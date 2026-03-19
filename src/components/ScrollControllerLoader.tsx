'use client'

import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

const ScrollController = dynamic(() => import('./ScrollController'), { ssr: false })

export default function ScrollControllerLoader({ children }: { children: ReactNode }) {
  return <ScrollController>{children}</ScrollController>
}
