'use client'

import { Suspense, useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Float, Environment } from '@react-three/drei'
import * as THREE from 'three'
import scrollState from '@/lib/scrollState'
import mouseState from '@/lib/mouseState'

function CelsiusCan() {
  const outerRef = useRef<THREE.Group>(null)
  const innerRef = useRef<THREE.Group>(null)
  const spinAccum = useRef(0)
  const prevProgress = useRef(0)
  const { scene } = useGLTF('/celsius-energy-drink/source/celsius.glb')
  const cloned = useMemo(() => scene.clone(), [scene])

  useEffect(() => {
    if (!innerRef.current) return
    const box = new THREE.Box3().setFromObject(innerRef.current)
    const center = box.getCenter(new THREE.Vector3())
    innerRef.current.position.sub(center)
  }, [cloned])

  useFrame(() => {
    if (!outerRef.current) return
    const delta = scrollState.progress - prevProgress.current
    if (delta > 0) spinAccum.current += delta * 2.5
    prevProgress.current = scrollState.progress
    outerRef.current.rotation.y = THREE.MathUtils.lerp(
      outerRef.current.rotation.y, mouseState.x * Math.PI * 1.2 + spinAccum.current, 0.18
    )
    outerRef.current.rotation.x = THREE.MathUtils.lerp(
      outerRef.current.rotation.x, -mouseState.y * 0.5, 0.18
    )
  })

  return (
    <Float speed={0.9} rotationIntensity={0} floatIntensity={0.3}>
      <group ref={outerRef}>
        <group ref={innerRef} scale={15.5}>
          <primitive object={cloned} />
        </group>
      </group>
    </Float>
  )
}

useGLTF.preload('/celsius-energy-drink/source/celsius.glb')

export default function ProjectsBracket() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.9} />
        <pointLight position={[4, 8, 4]} intensity={2.5} color="#ffffff" />
        <pointLight position={[-4, -2, -2]} intensity={0.8} color="#A78BFA" />
        <pointLight position={[2, -4, 3]} intensity={0.5} color="#60A5FA" />
        <Environment preset="studio" />
        <Suspense fallback={null}>
          <CelsiusCan />
        </Suspense>
      </Canvas>
    </div>
  )
}
