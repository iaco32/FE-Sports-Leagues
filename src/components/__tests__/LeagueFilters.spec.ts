import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import LeagueFilters from '../LeagueFilters.vue'
import { createTestingPinia } from '@pinia/testing'
import { useLeaguesStore } from '@/stores/leagues'

describe('Filters.vue', () => {
  it('renders search input and select dropdown', () => {
    const wrapper = mount(LeagueFilters, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    })
    
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('select').exists()).toBe(true)
  })

  it('binds input to store searchQuery', async () => {
    const wrapper = mount(LeagueFilters, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    })
    const store = useLeaguesStore()
    
    const input = wrapper.find('input[type="text"]')
    await input.setValue('Premier')
    
    expect(store.searchQuery).toBe('Premier')
  })

  it('binds select to store selectedSport', async () => {
    const wrapper = mount(LeagueFilters, {
      global: {
        plugins: [createTestingPinia({ 
          createSpy: vi.fn,
          initialState: {
            leagues: { uniqueSports: ['Soccer', 'Basketball'] }
          }
        })],
      },
    })
    const store = useLeaguesStore()
    
    const select = wrapper.find('select')
    const options = select.findAll('option')
    expect(options.length).toBe(3) // All Sports + Soccer + Basketball
    
    await select.setValue('Soccer')
    expect(store.selectedSport).toBe('Soccer')
  })
})
