'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function Envelope() {
  const groupRef = useRef<THREE.Group>(null)
  const { mouse } = useThree()

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.2, 0.05)
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, mouse.x * 0.1, 0.05)
  })

  return (
    <Float speed={1.4} floatIntensity={0.9}>
      <group ref={groupRef}>
        <mesh><boxGeometry args={[2.4, 1.6, 0.1]} /><meshStandardMaterial color="#60A5FA" metalness={0.2} roughness={0.3} /></mesh>
        <mesh position={[0, 0.4, 0.06]}><coneGeometry args={[1.2, 1.2, 4]} /><meshStandardMaterial color="#A78BFA" metalness={0.3} roughness={0.2} /></mesh>
        <mesh position={[0, -0.3, 0.06]} rotation={[0, 0, Math.PI]}><coneGeometry args={[0.9, 0.8, 4]} /><meshStandardMaterial color="#A78BFA" metalness={0.3} roughness={0.2} /></mesh>
        <mesh position={[-0.8, 0, 0.06]} rotation={[0, 0, Math.PI / 2]}><coneGeometry args={[0.8, 0.8, 4]} /><meshStandardMaterial color="#A78BFA" metalness={0.3} roughness={0.2} /></mesh>
        <mesh position={[0.8, 0, 0.06]} rotation={[0, 0, -Math.PI / 2]}><coneGeometry args={[0.8, 0.8, 4]} /><meshStandardMaterial color="#A78BFA" metalness={0.3} roughness={0.2} /></mesh>
      </group>
    </Float>
  )
}

export default function ContactEnvelope() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#60A5FA" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#A78BFA" />
        <Envelope />
      </Canvas>
    </div>
  )
}
