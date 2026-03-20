import { NextResponse } from 'next/server'

const USERNAME = 'ayush-b06'

interface Contribution {
  date: string
  count: number
}

function calcStreak(contributions: Contribution[]): number {
  // Sort newest-first
  const sorted = [...contributions].sort((a, b) => b.date.localeCompare(a.date))
  if (!sorted.length) return 0

  const today = new Date().toISOString().split('T')[0]

  // If today has no contributions yet (early in the day), don't penalise —
  // start counting from the most recent day that has data
  let i = sorted[0].date === today && sorted[0].count === 0 ? 1 : 0

  let streak = 0
  for (; i < sorted.length; i++) {
    if (sorted[i].count > 0) streak++
    else break
  }
  return streak
}

export async function GET() {
  try {
    const [userRes, contribRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, {
        headers: { Accept: 'application/vnd.github.v3+json' },
        next: { revalidate: 3600 },
      }),
      fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`, {
        next: { revalidate: 3600 },
      }),
    ])

    if (!userRes.ok) throw new Error(`GitHub API ${userRes.status}`)
    if (!contribRes.ok) throw new Error(`Contributions API ${contribRes.status}`)

    const userData = await userRes.json()
    const contribData = await contribRes.json()

    const contributions: Contribution[] = contribData.contributions ?? []

    // Last 365 days from today — not calendar year
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - 365)
    const cutoffStr = cutoff.toISOString().split('T')[0]
    const last365 = contributions
      .filter(c => c.date >= cutoffStr)
      .reduce((sum, c) => sum + c.count, 0)

    return NextResponse.json({
      repos: userData.public_repos as number,
      contributions: last365,
      streak: calcStreak(contributions),
    })
  } catch {
    return NextResponse.json({ error: 'unavailable' }, { status: 503 })
  }
}
