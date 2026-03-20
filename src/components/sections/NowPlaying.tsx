'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Music } from 'lucide-react'
import { SectionAnimate, sectionItem } from '../ui/SectionAnimate'
import { useNowPlaying, timeAgo } from '@/lib/useNowPlaying'

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
          transition={{
            duration: bar.duration,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function AlbumArt({ src, alt }: { src: string; alt: string }) {
  console.log('[NowPlaying] AlbumArt rendering with src:', src || '(empty — using fallback)')

  if (!src) return <AlbumArtFallback />

  return (
    <div
      className="flex-shrink-0 rounded-xl"
      style={{ width: 88, height: 88, flexShrink: 0 }}
    >
      {/* Plain <img> — no Next.js optimizer, no domain config, no absolute positioning quirks */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={88}
        height={88}
        style={{
          width: 88,
          height: 88,
          objectFit: 'cover',
          borderRadius: 12,
          display: 'block',
        }}
        onError={(e) => {
          console.warn('[NowPlaying] Image failed to load:', src)
          const img = e.currentTarget
          img.style.display = 'none'
          const fallback = img.parentElement
          if (fallback) {
            fallback.style.background = 'linear-gradient(135deg, #A78BFA 0%, #F9A8D4 100%)'
            fallback.style.borderRadius = '12px'
            fallback.style.display = 'flex'
            fallback.style.alignItems = 'center'
            fallback.style.justifyContent = 'center'
            fallback.innerHTML = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" opacity="0.7"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`
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
        width: 88,
        height: 88,
        background: 'linear-gradient(135deg, rgba(167,139,250,0.2) 0%, rgba(249,168,212,0.2) 100%)',
        border: '1px solid var(--card-border)',
      }}
    >
      <Music size={26} style={{ color: '#F9A8D4', opacity: 0.6 }} />
    </div>
  )
}

export default function NowPlaying() {
  const { track, loading } = useNowPlaying()

  // Don't render section if there's genuinely nothing to show
  if (!loading && !track) return null

  return (
    <section className="h-screen flex flex-col justify-center px-6 md:px-10 pt-16 pb-8">
      <SectionAnimate index={4}>
        <motion.div variants={sectionItem}>
          <p className="text-xs font-semibold text-[#F9A8D4] dark:text-[#F0ABFC] tracking-widest uppercase mb-2">
            Music
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>
            What I&apos;m hearing.
          </h2>
          <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
            Live from YouTube Music - updated every 5s.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {loading && !track ? (
            <motion.div
              key="skeleton"
              variants={sectionItem}
              exit={{ opacity: 0 }}
              className="flex items-center gap-4"
            >
              {/* Skeleton */}
              <div
                className="flex-shrink-0 rounded-xl animate-pulse"
                style={{ width: 88, height: 88, background: 'var(--card-bg)' }}
              />
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
              className="group flex items-center gap-5 p-5 rounded-2xl"
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
                <p
                  className="text-base font-bold leading-snug truncate"
                  style={{ color: 'var(--text-primary)' }}
                >
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

      </SectionAnimate>
    </section>
  )
}
