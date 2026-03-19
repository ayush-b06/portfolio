'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

const cubePositions: [number, number, number][] = [
  [0, 0, 0], [1.2, 0.8, 0.3], [-1.1, 0.6, -0.2],
  [0.5, -1.0, 0.5], [-0.6, -0.8, -0.4], [1.0, -0.5, -0.8],
]
const colors = ['#A78BFA', '#7C3AED', '#60A5FA', '#A78BFA', '#7C3AED', '#60A5FA']
const sizes: [number, number, number][] = [
  [0.8, 0.8, 0.8], [0.5, 0.5, 0.5], [0.6, 0.6, 0.6],
  [0.45, 0.45, 0.45], [0.55, 0.55, 0.55], [0.4, 0.4, 0.4],
]

function CubeCluster() {
  const groupRef = useRef<THREE.Group>(null)
  const { mouse } = useThree()

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.25
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.15, 0.05)
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, mouse.x * 0.1, 0.05)
  })

  return (
    <Float speed={1.0} floatIntensity={0.5}>
      <group ref={groupRef}>
        {cubePositions.map((pos, i) => (
          <mesh key={i} position={pos}>
            <boxGeometry args={sizes[i]} />
            <meshStandardMaterial color={colors[i]} metalness={0.3} roughness={0.2} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

export default function ExperienceCube() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#A78BFA" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#60A5FA" />
        <CubeCluster />
      </Canvas>
    </div>
  )
}
