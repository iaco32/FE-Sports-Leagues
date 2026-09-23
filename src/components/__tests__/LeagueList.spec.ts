import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import LeagueList from '../LeagueList.vue'
import LeagueCard from '../LeagueCard.vue'
import { createTestingPinia } from '@pinia/testing'
import { useLeaguesStore } from '@/stores/leagues'

describe('LeagueList.vue', () => {
  it('renders loading state when isLoading is true', () => {
    const wrapper = mount(LeagueList, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: { leagues: { isLoading: true } },
          }),
        ],
      },
    })

    expect(wrapper.text()).toContain('Loading')
  })

  it('renders error state when error exists', () => {
    const wrapper = mount(LeagueList, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: { leagues: { error: 'Network Error' } },
          }),
        ],
      },
    })

    expect(wrapper.text()).toContain('Network Error')
  })

  it('renders empty state when no leagues match', () => {
    const wrapper = mount(LeagueList, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: { leagues: { leagues: [] } }, // Store logic handles filtering, but here we just mock the result getter if needed. Actually in pinia testing we can just override the getter.
          }),
        ],
      },
    })

    const store = useLeaguesStore()
    // Set leagues to empty so filteredLeagues computes to empty
    store.leagues = []

    expect(wrapper.text()).toContain('No leagues found')
  })

  it('renders LeagueCard components for each filtered league', () => {
    const wrapper = mount(LeagueList, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              leagues: {
                leagues: [
                  { idLeague: '1', strLeague: 'League 1', strSport: 'Soccer', strLeagueAlternate: null },
                  { idLeague: '2', strLeague: 'League 2', strSport: 'Basketball', strLeagueAlternate: null }
                ]
              }
            }
          })
        ],
      },
    })
    
    const store = useLeaguesStore()

    const cards = wrapper.findAllComponents(LeagueCard)
    expect(cards.length).toBe(2)
  })
})
