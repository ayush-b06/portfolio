import { NextResponse } from 'next/server'

// Open-Meteo — free, no API key, reliable
// Coordinates hardcoded to Berkeley, CA
const LAT = 37.8716
const LON = -122.2727

function fromWMO(code: number): { desc: string; emoji: string } {
  if (code === 0)                       return { desc: 'Clear',        emoji: '☀️' }
  if (code <= 3)                        return { desc: 'Partly Cloudy', emoji: '⛅' }
  if (code <= 48)                       return { desc: 'Foggy',         emoji: '🌫️' }
  if (code <= 67)                       return { desc: 'Rain',          emoji: '🌧️' }
  if (code <= 77)                       return { desc: 'Snow',          emoji: '❄️' }
  if (code <= 82)                       return { desc: 'Showers',       emoji: '🌦️' }
  if (code <= 99)                       return { desc: 'Thunderstorm',  emoji: '⛈️' }
  return                                       { desc: 'Unknown',       emoji: '🌡️' }
}

export async function GET() {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`,
      { next: { revalidate: 1800 } } // server-side cache for 30 minutes
    )

    if (!res.ok) throw new Error(`open-meteo ${res.status}`)

    const data = await res.json()
    const current = data.current
    if (!current) throw new Error('no current data')

    const { desc, emoji } = fromWMO(Number(current.weather_code))

    return NextResponse.json({
      tempF: Math.round(Number(current.temperature_2m)),
      desc,
      emoji,
    })
  } catch {
    return NextResponse.json({ error: 'unavailable' }, { status: 503 })
  }
}
