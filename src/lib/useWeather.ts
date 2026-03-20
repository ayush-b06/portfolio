'use client'

import { useState, useEffect } from 'react'

export interface WeatherData {
  tempF: number
  desc: string
  emoji: string
}

const POLL_MS = 30 * 60 * 1000 // 30 minutes

// Module-level cache so remounts don't re-fetch within the window
let cache: { data: WeatherData; fetchedAt: number } | null = null

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(cache?.data ?? null)

  useEffect(() => {
    const fetch_ = async () => {
      if (cache && Date.now() - cache.fetchedAt < POLL_MS) {
        setWeather(cache.data)
        return
      }
      try {
        const res = await fetch('/api/weather')
        if (!res.ok) return // silently hide — don't break the section
        const data: WeatherData = await res.json()
        if ('error' in data) return
        cache = { data, fetchedAt: Date.now() }
        setWeather(data)
      } catch {
        // silently fail — weather row just won't render
      }
    }

    fetch_()
    const id = setInterval(fetch_, POLL_MS)
    return () => clearInterval(id)
  }, [])

  return weather
}
