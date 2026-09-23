import type { AllLeaguesResponse, BadgeResponse, League } from '@/types'

const API_BASE = 'https://www.thesportsdb.com/api/v1/json/3'

export async function fetchAllLeagues(): Promise<League[]> {
  const response = await fetch(`${API_BASE}/all_leagues.php`, {
    cache: 'no-store', // Bypasses the browser's HTTP cache
  })
  if (!response.ok) {
    throw new Error('Failed to fetch leagues')
  }
  const data: AllLeaguesResponse = await response.json()
  return data.leagues || []
}

export async function fetchLeagueBadge(id: string): Promise<string | null> {
  const response = await fetch(`${API_BASE}/search_all_seasons.php?badge=1&id=${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch badge')
  }
  const data: BadgeResponse = await response.json()

  if (data.seasons && data.seasons.length > 0) {
    // Return the first season's badge as requested in requirements
    return data.seasons[0]?.strBadge || null
  }
  return null
}
