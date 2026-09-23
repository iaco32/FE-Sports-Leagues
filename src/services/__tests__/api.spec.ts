import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchAllLeagues, fetchLeagueBadge } from '@/services/api'

describe('API Service', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('fetchAllLeagues should fetch and return leagues data', async () => {
    const mockResponse = {
      leagues: [
        { idLeague: '1', strLeague: 'League 1', strSport: 'Soccer', strLeagueAlternate: 'L1' },
      ],
    }

    global.fetch = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    } as unknown as Response)

    const data = await fetchAllLeagues()

    expect(global.fetch).toHaveBeenCalledWith(
      'https://www.thesportsdb.com/api/v1/json/3/all_leagues.php',
    )
    expect(data).toEqual(mockResponse.leagues)
  })

  it('fetchLeagueBadge should fetch and return a badge URL if seasons exist', async () => {
    const mockBadgeUrl = 'https://example.com/badge.png'
    const mockResponse = {
      seasons: [
        { strSeason: '2023', strBadge: mockBadgeUrl },
        { strSeason: '2022', strBadge: 'other.png' },
      ],
    }

    global.fetch = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    } as unknown as Response)

    const badge = await fetchLeagueBadge('123')

    expect(global.fetch).toHaveBeenCalledWith(
      'https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=123',
    )
    expect(badge).toBe(mockBadgeUrl)
  })

  it('fetchLeagueBadge should return null if seasons is null', async () => {
    global.fetch = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => ({ seasons: null }),
    } as unknown as Response)

    const badge = await fetchLeagueBadge('999')
    expect(badge).toBeNull()
  })

  it('throws an error when fetch fails', async () => {
    global.fetch = vi.fn<typeof fetch>().mockResolvedValue({
      ok: false,
      status: 500,
    } as unknown as Response)

    await expect(fetchAllLeagues()).rejects.toThrow('Failed to fetch leagues')
  })
})
