'use client'

import { useState, useEffect, useRef } from 'react'

export interface NowPlayingTrack {
  name: string
  artist: string
  album: string
  imageUrl: string
  trackUrl: string
  isPlaying: boolean
  playedAt?: number // unix timestamp, only when not live
}

// Module-level cache: "artist|track" → Deezer image URL (or '' if none found)
// Prevents re-hitting Deezer on every 30s poll for the same song.
const deezerCache = new Map<string, string>()

const LASTFM_BLANK = '2a96cbd8b46e442fc41c2b86b821562f'
const isValidUrl = (url: string | undefined): url is string =>
  !!url && url.trim() !== '' && !url.includes(LASTFM_BLANK)

async function getDeezerArt(artist: string, track: string): Promise<string> {
  const cacheKey = `${artist}|${track}`
  if (deezerCache.has(cacheKey)) return deezerCache.get(cacheKey)!

  try {
    const res = await fetch(
      `/api/album-art?artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(track)}`
    )
    if (!res.ok) throw new Error(`status ${res.status}`)
    const data = await res.json()
    console.log('[useNowPlaying] Deezer raw response:', data)
    const albumArt: string = data.url ?? ''
    // Only cache hits — don't cache failures so the next poll can retry
    if (albumArt) deezerCache.set(cacheKey, albumArt)
    return albumArt
  } catch (err) {
    console.warn('[useNowPlaying] Deezer fetch error:', err)
    return ''
  }
}

export function useNowPlaying() {
  const [track, setTrack] = useState<NowPlayingTrack | null>(null)
  const [loading, setLoading] = useState(true)
  const lastKnown = useRef<NowPlayingTrack | null>(null)

  const fetchTrack = async () => {
    try {
      const key = process.env.NEXT_PUBLIC_LASTFM_API_KEY
      const user = process.env.NEXT_PUBLIC_LASTFM_USERNAME
      const res = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${key}&format=json&limit=1`,
        { cache: 'no-store' }
      )
      if (!res.ok) throw new Error('bad response')

      const data = await res.json()
      const raw = data.recenttracks?.track
      if (!raw) return

      const t = Array.isArray(raw) ? raw[0] : raw
      const isPlaying = t['@attr']?.nowplaying === 'true'
      const name: string = t.name
      const artist: string = t.artist?.['#text'] ?? t.artist

      // 1. Try Last.fm image (extralarge → large → medium)
      const images: Array<{ '#text': string; size: string }> = t.image ?? []
      let imageUrl =
        images.find(i => i.size === 'extralarge' && isValidUrl(i['#text']))?.['#text'] ||
        images.find(i => i.size === 'large'      && isValidUrl(i['#text']))?.['#text'] ||
        images.find(i => i.size === 'medium'     && isValidUrl(i['#text']))?.['#text'] ||
        ''

      // 2. Deezer fallback when Last.fm has no art (common for YouTube Music scrobbles)
      if (!imageUrl) {
        console.log('[useNowPlaying] Last.fm image empty — trying Deezer for:', artist, '–', name)
        imageUrl = await getDeezerArt(artist, name)
        console.log('[useNowPlaying] Deezer result:', imageUrl || '(none)')
      }

      // 3. Empty string → UI will render gradient placeholder (no broken images)

      const result: NowPlayingTrack = {
        name,
        artist,
        album: t.album?.['#text'] ?? '',
        imageUrl,
        trackUrl: t.url ?? `https://www.last.fm/user/${user}`,
        isPlaying,
        playedAt: isPlaying ? undefined : Number(t.date?.uts ?? 0),
      }

      lastKnown.current = result
      setTrack(result)
    } catch {
      if (lastKnown.current) setTrack(lastKnown.current)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTrack()
    const id = setInterval(fetchTrack, 5_000)
    return () => clearInterval(id)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return { track, loading }
}

export function timeAgo(unix: number): string {
  const diff = Math.floor(Date.now() / 1000) - unix
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}
