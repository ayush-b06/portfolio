'use client'

import { useState, useEffect } from 'react'
import { CITY, TIMEZONE } from './location'

function formatTime(): string {
  return new Date().toLocaleTimeString('en-US', {
    timeZone: TIMEZONE,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export function useLocalTime() {
  const [time, setTime] = useState('')

  useEffect(() => {
    setTime(formatTime())
    const id = setInterval(() => setTime(formatTime()), 60_000)
    return () => clearInterval(id)
  }, [])

  return { city: CITY, time }
}
