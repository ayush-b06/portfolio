'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function Tower() {
  const groupRef = useRef<THREE.Group>(null)
  const { mouse } = useThree()

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mouse.x * 0.3, 0.05)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, mouse.y * 0.2, 0.05)
  })

  return (
    <Float speed={1.3} floatIntensity={0.7}>
      <group ref={groupRef}>
        <mesh position={[0, -1.5, 0]}><boxGeometry args={[1.2, 0.3, 1.2]} /><meshStandardMaterial color="#F0ABFC" metalness={0.2} roughness={0.3} /></mesh>
        <mesh position={[0, -0.5, 0]}><boxGeometry args={[0.8, 2, 0.8]} /><meshStandardMaterial color="#F0ABFC" metalness={0.2} roughness={0.3} /></mesh>
        <mesh position={[0, 0.6, 0]}><boxGeometry args={[1.0, 0.2, 1.0]} /><meshStandardMaterial color="#A78BFA" metalness={0.4} roughness={0.2} /></mesh>
        <mesh position={[0, 1.2, 0]}><boxGeometry args={[0.6, 1.2, 0.6]} /><meshStandardMaterial color="#F0ABFC" metalness={0.2} roughness={0.3} /></mesh>
        <mesh position={[0, 2.0, 0]}><boxGeometry args={[0.8, 0.2, 0.8]} /><meshStandardMaterial color="#A78BFA" metalness={0.4} roughness={0.2} /></mesh>
        <mesh position={[0, 2.7, 0]}><coneGeometry args={[0.2, 1.0, 6]} /><meshStandardMaterial color="#A78BFA" metalness={0.4} roughness={0.2} /></mesh>
        <mesh position={[0.41, -0.5, 0]}><boxGeometry args={[0.05, 0.2, 0.15]} /><meshStandardMaterial color="#A78BFA" /></mesh>
        <mesh position={[-0.41, -0.5, 0]}><boxGeometry args={[0.05, 0.2, 0.15]} /><meshStandardMaterial color="#A78BFA" /></mesh>
        <mesh position={[0.41, 0.5, 0]}><boxGeometry args={[0.05, 0.2, 0.15]} /><meshStandardMaterial color="#A78BFA" /></mesh>
        <mesh position={[-0.41, 0.5, 0]}><boxGeometry args={[0.05, 0.2, 0.15]} /><meshStandardMaterial color="#A78BFA" /></mesh>
      </group>
    </Float>
  )
}

export default function AboutTower() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#F0ABFC" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#A78BFA" />
        <Tower />
      </Canvas>
    </div>
  )
}
