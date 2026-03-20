'use client'

import { useState, useEffect } from 'react'

export interface GitHubStats {
  repos: number
  contributions: number
  streak: number
}

// Module-level cache — fetch once per page load, no polling needed
let cache: GitHubStats | null = null

export function useGitHubStats(): GitHubStats | null {
  const [stats, setStats] = useState<GitHubStats | null>(cache)

  useEffect(() => {
    if (cache) { setStats(cache); return }
    fetch('/api/github-stats')
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (data && !data.error) {
          cache = data
          setStats(data)
        }
      })
      .catch(() => {})
  }, [])

  return stats
}
