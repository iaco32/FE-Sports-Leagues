import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useLeaguesStore } from '@/stores/leagues'
import * as api from '@/services/api'

// Mock the API calls
vi.mock('@/services/api', () => ({
  fetchAllLeagues: vi.fn<typeof api.fetchAllLeagues>(),
  fetchLeagueBadge: vi.fn<typeof api.fetchLeagueBadge>(),
}))

describe('Leagues Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('initializes with empty state', () => {
    const store = useLeaguesStore()
    expect(store.leagues).toEqual([])
    expect(store.badgesCache).toEqual({})
    expect(store.isLoading).toBe(false)
    expect(store.error).toBe(null)
  })

  it('fetchLeagues sets leagues data', async () => {
    const store = useLeaguesStore()
    const mockLeagues = [
      { idLeague: '1', strLeague: 'League A', strSport: 'Soccer', strLeagueAlternate: '' },
    ]

    vi.mocked(api.fetchAllLeagues).mockResolvedValue(mockLeagues)

    await store.fetchLeagues()

    expect(api.fetchAllLeagues).toHaveBeenCalledTimes(1)
    expect(store.leagues).toEqual(mockLeagues)
    expect(store.isLoading).toBe(false)
  })

  it('getBadge fetches from API and caches if not in cache', async () => {
    const store = useLeaguesStore()
    const mockBadge = 'badge.png'

    vi.mocked(api.fetchLeagueBadge).mockResolvedValue(mockBadge)

    const badge = await store.getBadge('123')

    expect(api.fetchLeagueBadge).toHaveBeenCalledWith('123')
    expect(api.fetchLeagueBadge).toHaveBeenCalledTimes(1)
    expect(badge).toBe(mockBadge)
    expect(store.badgesCache['123']).toBe(mockBadge)
  })

  it('getBadge returns from cache without calling API if already cached', async () => {
    const store = useLeaguesStore()
    const mockBadge = 'cached.png'

    store.badgesCache['123'] = mockBadge

    const badge = await store.getBadge('123')

    expect(api.fetchLeagueBadge).not.toHaveBeenCalled()
    expect(badge).toBe(mockBadge)
  })

  it('getBadge returns default null if API returns null and still caches it', async () => {
    const store = useLeaguesStore()

    vi.mocked(api.fetchLeagueBadge).mockResolvedValue(null)

    const badge = await store.getBadge('404')

    expect(badge).toBeNull()
    expect(store.badgesCache['404']).toBeNull()
  })
})
