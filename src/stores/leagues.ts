import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { fetchAllLeagues, fetchLeagueBadge } from '@/services/api'
import type { League } from '@/types'

export const useLeaguesStore = defineStore('leagues', () => {
  const leagues = ref<League[]>([])
  const badgesCache = ref<Record<string, string | null>>({})
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Filters
  const searchQuery = ref('')
  const selectedSport = ref('')

  async function fetchLeagues() {
    isLoading.value = true
    error.value = null
    try {
      leagues.value = await fetchAllLeagues()
    } catch (err: any) {
      error.value = err.message || 'Error fetching leagues'
    } finally {
      isLoading.value = false
    }
  }

  async function getBadge(id: string): Promise<string | null> {
    // Return from cache if it exists
    if (id in badgesCache.value) {
      return badgesCache.value[id]
    }

    // Otherwise fetch and cache
    try {
      const badgeUrl = await fetchLeagueBadge(id)
      badgesCache.value[id] = badgeUrl
      return badgeUrl
    } catch (err) {
      // In case of error, we can cache null to prevent infinite retries or just return null
      badgesCache.value[id] = null
      return null
    }
  }

  const filteredLeagues = computed(() => {
    return leagues.value.filter((league) => {
      const matchesSearch =
        league.strLeague.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        (league.strLeagueAlternate &&
          league.strLeagueAlternate.toLowerCase().includes(searchQuery.value.toLowerCase()))

      const matchesSport = selectedSport.value ? league.strSport === selectedSport.value : true

      return matchesSearch && matchesSport
    })
  })

  const uniqueSports = computed(() => {
    const sports = new Set(leagues.value.map((l) => l.strSport))
    return Array.from(sports).sort()
  })

  return {
    leagues,
    badgesCache,
    isLoading,
    error,
    searchQuery,
    selectedSport,
    fetchLeagues,
    getBadge,
    filteredLeagues,
    uniqueSports,
  }
})
