'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Music, Folder, GitCommitHorizontal } from 'lucide-react'
import { SectionAnimate, sectionItem } from '../ui/SectionAnimate'
import { useNowPlaying, timeAgo } from '@/lib/useNowPlaying'
import { useLocalTime } from '@/lib/useLocalTime'
import { useWeather } from '@/lib/useWeather'
import { useGitHubStats } from '@/lib/useGitHubStats'
import { useSectionActive } from '@/lib/useSectionActive'
import { TIMEZONE } from '@/lib/location'
import { useEffect, useRef, useState } from 'react'

function CountUp({ to, active }: { to: number; active: boolean }) {
  const [val, setVal] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!active || started.current || to === 0) return
    started.current = true
    const steps = 32
    const interval = 600 / steps
    let step = 0
    const id = setInterval(() => {
      step++
      setVal(Math.round((step / steps) * to))
      if (step >= steps) clearInterval(id)
    }, interval)
    return () => clearInterval(id)
  }, [active, to])

  return <>{to === 0 ? 0 : val}</>
}

function isNighttime(): boolean {
  const hour = Number(new Date().toLocaleString('en-US', { timeZone: TIMEZONE, hour: 'numeric', hour12: false }))
  return hour >= 19 || hour < 6
}

function EqualizerBars() {
  const bars = [
    { height: [4, 20, 8, 16, 4], duration: 0.9 },
    { height: [16, 6, 22, 10, 16], duration: 1.1 },
    { height: [8, 18, 4, 20, 8], duration: 0.8 },
    { height: [20, 8, 14, 6, 20], duration: 1.0 },
  ]
  return (
    <div className="flex items-end gap-[2.5px]" style={{ height: 18 }}>
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full"
          style={{ background: '#F9A8D4' }}
          animate={{ height: bar.height }}
          transition={{ duration: bar.duration, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

function AlbumArt({ src, alt }: { src: string; alt: string }) {
  if (!src) return <AlbumArtFallback />
  return (
    <div className="flex-shrink-0 rounded-xl" style={{ width: 88, height: 88 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={88}
        height={88}
        style={{ width: 88, height: 88, objectFit: 'cover', borderRadius: 12, display: 'block' }}
        onError={(e) => {
          const img = e.currentTarget
          img.style.display = 'none'
          const parent = img.parentElement
          if (parent) {
            parent.style.background = 'linear-gradient(135deg, #A78BFA 0%, #F9A8D4 100%)'
            parent.style.borderRadius = '12px'
            parent.style.display = 'flex'
            parent.style.alignItems = 'center'
            parent.style.justifyContent = 'center'
            parent.innerHTML = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" opacity="0.7"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`
          }
        }}
      />
    </div>
  )
}

function AlbumArtFallback() {
  return (
    <div
      className="flex-shrink-0 rounded-xl flex items-center justify-center"
      style={{
        width: 88, height: 88,
        background: 'linear-gradient(135deg, rgba(167,139,250,0.2) 0%, rgba(249,168,212,0.2) 100%)',
        border: '1px solid var(--card-border)',
      }}
    >
      <Music size={26} style={{ color: '#F9A8D4', opacity: 0.6 }} />
    </div>
  )
}

export default function Currently() {
  const { track, loading } = useNowPlaying()
  const { city, time } = useLocalTime()
  const weather = useWeather()
  const github = useGitHubStats()
  const isActive = useSectionActive(1)
  const weatherEmoji = weather ? (weather.emoji === '☀️' && isNighttime() ? '🌙' : weather.emoji) : null

  if (!loading && !track) return null

  return (
    <section className="h-screen flex flex-col justify-start md:justify-center px-6 md:px-10 pt-20 md:pt-16 pb-8 overflow-y-auto md:overflow-y-visible [&::-webkit-scrollbar]:hidden">
      <SectionAnimate index={1}>
        <motion.div variants={sectionItem}>
          <p className="text-xs font-semibold text-[#F9A8D4] dark:text-[#F0ABFC] tracking-widest uppercase mb-6">
            Currently
          </p>
        </motion.div>

        <motion.div variants={sectionItem}>
          <h2 className="text-2xl font-black tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
            Listening
          </h2>
        </motion.div>

        {/* Now Playing card — identical to original */}
        <AnimatePresence mode="wait">
          {loading && !track ? (
            <motion.div
              key="skeleton"
              variants={sectionItem}
              exit={{ opacity: 0 }}
              className="flex items-center gap-4"
            >
              <div className="flex-shrink-0 rounded-xl animate-pulse" style={{ width: 88, height: 88, background: 'var(--card-bg)' }} />
              <div className="flex flex-col gap-2.5 flex-1">
                <div className="h-4 rounded-full animate-pulse" style={{ width: '55%', background: 'var(--card-bg)' }} />
                <div className="h-3 rounded-full animate-pulse" style={{ width: '35%', background: 'var(--card-bg)' }} />
                <div className="h-3 rounded-full animate-pulse" style={{ width: '25%', background: 'var(--card-bg)' }} />
              </div>
            </motion.div>
          ) : track ? (
            <motion.div
              key={track.name + track.artist}
              variants={sectionItem}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-5 p-5 rounded-2xl"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                boxShadow: 'var(--card-shadow)',
                backdropFilter: 'blur(16px)',
                maxWidth: 480,
              }}
            >
              <AlbumArt src={track.imageUrl} alt={`${track.name} by ${track.artist}`} />

              <div className="flex flex-col gap-1.5 min-w-0">
                <p className="text-base font-bold leading-snug truncate" style={{ color: 'var(--text-primary)' }}>
                  {track.name}
                </p>
                <p className="text-sm font-medium truncate" style={{ color: 'var(--text-muted)' }}>
                  {track.artist}
                </p>
                {track.album && (
                  <p className="text-xs truncate" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
                    {track.album}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-1">
                  {track.isPlaying ? (
                    <>
                      <EqualizerBars />
                      <span className="text-[11px] font-semibold tracking-wide" style={{ color: '#F9A8D4' }}>
                        Now playing
                      </span>
                    </>
                  ) : (
                    <>
                      <Music size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                      <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                        Last played · {track.playedAt ? timeAgo(track.playedAt) : '—'}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Location · Time · Weather chips */}
        <motion.div
          variants={sectionItem}
          className="flex flex-wrap items-center gap-2 mt-5"
          style={{ maxWidth: 480 }}
        >
          {/* Location + time */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ background: 'var(--pill-bg)', border: '1px solid var(--pill-border)', color: 'var(--text-muted)' }}
          >
            <span>📍</span>
            <span>{city}</span>
            {time && (
              <>
                <span style={{ opacity: 0.4 }}>·</span>
                <span className="font-mono tabular-nums">{time}</span>
              </>
            )}
          </div>

          {/* Weather */}
          {weather && (
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ background: 'var(--pill-bg)', border: '1px solid var(--pill-border)', color: 'var(--text-muted)' }}
            >
              <span>{weatherEmoji}</span>
              <span className="tabular-nums">{weather.tempF}°F</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{weather.desc}</span>
            </div>
          )}
        </motion.div>

        {/* GitHub stat cards */}
        {github && (
          <motion.div variants={sectionItem} className="mt-5" style={{ maxWidth: 480 }}>
            <h2 className="text-2xl font-black tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
              GitHub
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {([
                { Icon: Folder,              value: github.repos,         label: 'Repositories' },
                { Icon: GitCommitHorizontal, value: github.contributions, label: 'Contributions · 1yr' },
              ] as const).map(({ Icon, value, label }) => (
                <div
                  key={label}
                  className="flex flex-col gap-3 p-4 rounded-2xl"
                  style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    boxShadow: 'var(--card-shadow)',
                    backdropFilter: 'blur(16px)',
                  }}
                >
                  <Icon size={15} style={{ color: 'var(--text-muted)', opacity: 0.6 }} />
                  <div>
                    <p
                      className="text-2xl font-black tabular-nums leading-none mb-1"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <CountUp to={value} active={isActive} />
                    </p>
                    <p className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </SectionAnimate>
    </section>
  )
}
