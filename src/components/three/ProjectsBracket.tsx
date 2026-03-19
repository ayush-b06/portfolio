'use client'

import { Suspense, useRef, useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Float, Environment } from '@react-three/drei'
import * as THREE from 'three'
import scrollState from '@/lib/scrollState'
import mouseState from '@/lib/mouseState'
import { triggerEasterEgg } from '@/lib/easterEggState'

const CLICK_TARGET = 5

function CelsiusCan({ clickCount }: { clickCount: number }) {
  const outerRef = useRef<THREE.Group>(null)
  const innerRef = useRef<THREE.Group>(null)
  const spinAccum = useRef(0)
  const prevProgress = useRef(0)
  const clickSpin = useRef(0)
  const wobbleAccum = useRef(0)
  const prevClickCount = useRef(0)
  const { scene } = useGLTF('/celsius-energy-drink/source/celsius.glb')
  const cloned = useMemo(() => scene.clone(), [scene])

  useEffect(() => {
    if (!innerRef.current) return
    const box = new THREE.Box3().setFromObject(innerRef.current)
    const center = box.getCenter(new THREE.Vector3())
    innerRef.current.position.sub(center)
  }, [cloned])

  // On each new click: add a spin kick + wobble
  useEffect(() => {
    if (clickCount > prevClickCount.current) {
      // Spin kick proportional to progress toward easter egg
      clickSpin.current += Math.PI * 0.6
      // Escalating wobble intensity
      wobbleAccum.current = 0.25 + (clickCount / CLICK_TARGET) * 0.6
      prevClickCount.current = clickCount
    }
  }, [clickCount])

  useFrame(() => {
    if (!outerRef.current) return

    const scrollDelta = scrollState.progress - prevProgress.current
    if (scrollDelta > 0) spinAccum.current += scrollDelta * 2.5
    prevProgress.current = scrollState.progress

    // Decay click spin
    clickSpin.current *= 0.92

    const targetY = mouseState.x * Math.PI * 1.2 + spinAccum.current + clickSpin.current
    outerRef.current.rotation.y = THREE.MathUtils.lerp(outerRef.current.rotation.y, targetY, 0.18)
    outerRef.current.rotation.x = THREE.MathUtils.lerp(outerRef.current.rotation.x, -mouseState.y * 0.5, 0.18)

    // Wobble on Z axis — escalates with each click, decays over time
    if (wobbleAccum.current > 0.001) {
      outerRef.current.rotation.z = Math.sin(Date.now() * 0.02) * wobbleAccum.current * 0.15
      wobbleAccum.current *= 0.97
    } else {
      outerRef.current.rotation.z = THREE.MathUtils.lerp(outerRef.current.rotation.z, 0, 0.1)
    }
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
  const [clickCount, setClickCount] = useState(0)

  useEffect(() => setMounted(true), [])

  const handleCanvasClick = () => {
    setClickCount(prev => {
      const next = prev + 1
      if (next >= CLICK_TARGET) {
        triggerEasterEgg()
        return 0 // reset
      }
      return next
    })
  }

  if (!mounted) return null

  return (
    <div className="relative w-full h-full" onClick={handleCanvasClick} style={{ cursor: 'pointer' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.9} />
        <pointLight position={[4, 8, 4]} intensity={2.5} color="#ffffff" />
        <pointLight position={[-4, -2, -2]} intensity={0.8} color="#A78BFA" />
        <pointLight position={[2, -4, 3]} intensity={0.5} color="#60A5FA" />
        <Environment preset="studio" />
        <Suspense fallback={null}>
          <CelsiusCan clickCount={clickCount} />
        </Suspense>
      </Canvas>

      {/* Hint — shown before first click */}
      <AnimatePresence>
        {clickCount === 0 && (
          <motion.div
            className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-1 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ delay: 2.5, duration: 0.6 }}
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="text-[10px] font-semibold tracking-widest uppercase"
              style={{ color: '#F9A8D4', opacity: 0.7 }}
            >
              ↑ click me
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click progress dots — shown after first click */}
      <AnimatePresence>
        {clickCount > 0 && (
          <motion.div
            className="absolute bottom-10 left-0 right-0 flex items-center justify-center gap-1.5 pointer-events-none"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {Array.from({ length: CLICK_TARGET }).map((_, i) => (
              <motion.div
                key={i}
                className="rounded-full"
                animate={{
                  width: i < clickCount ? 8 : 5,
                  height: i < clickCount ? 8 : 5,
                  backgroundColor: i < clickCount ? '#F9A8D4' : 'rgba(249,168,212,0.25)',
                }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
