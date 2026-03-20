import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const artist = req.nextUrl.searchParams.get('artist') ?? ''
  const track = req.nextUrl.searchParams.get('track') ?? ''

  if (!artist || !track) {
    return NextResponse.json({ url: null })
  }

  try {
    // Strip common suffixes that break Deezer lookups (slowed, remix, etc.)
    const cleanTrack = track
      .replace(/\s*\((?:slowed|sped\s*up|reverb|slowed\s*\+\s*reverb|remix|lofi|lo-fi|acoustic|live|edit|version|instrumental).*?\)/gi, '')
      .trim()

    // Deezer advanced search: artist:"X" track:"Y"
    const q = encodeURIComponent(`artist:"${artist}" track:"${cleanTrack}"`)
    const res = await fetch(`https://api.deezer.com/search?q=${q}&limit=1`, {
      next: { revalidate: 3600 }, // cache server-side for 1 hour per track
    })

    if (!res.ok) return NextResponse.json({ url: null })

    const data = await res.json()
    const url: string | null = data.data?.[0]?.album?.cover_medium ?? null

    return NextResponse.json({ url })
  } catch {
    return NextResponse.json({ url: null })
  }
}
