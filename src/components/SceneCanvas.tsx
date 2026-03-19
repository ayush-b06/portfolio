'use client'

import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { View, Preload } from '@react-three/drei'

export default function SceneCanvas() {
  const [body, setBody] = useState<HTMLElement | null>(null)
  useEffect(() => { setBody(document.body) }, [])
  if (!body) return null

  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
      }}
      eventSource={body}
      eventPrefix="client"
    >
      <View.Port />
      <Preload all />
    </Canvas>
  )
}
