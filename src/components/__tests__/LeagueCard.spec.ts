import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import LeagueCard from '../LeagueCard.vue'
import { createTestingPinia } from '@pinia/testing'
import { useLeaguesStore } from '@/stores/leagues'

describe('LeagueCard.vue', () => {
  const mockLeague = {
    idLeague: '123',
    strLeague: 'Test League',
    strSport: 'Soccer',
    strLeagueAlternate: 'TL'
  }

  it('renders league information correctly', () => {
    const wrapper = mount(LeagueCard, {
      props: { league: mockLeague },
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    })
    
    expect(wrapper.text()).toContain('Test League')
    expect(wrapper.text()).toContain('Soccer')
    expect(wrapper.text()).toContain('TL')
  })

  it('calls getBadge and displays it when clicked', async () => {
    const wrapper = mount(LeagueCard, {
      props: { league: mockLeague },
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    })
    
    const store = useLeaguesStore()
    vi.mocked(store.getBadge).mockResolvedValue('badge.png')
    
    // Initially no badge image is rendered (or placeholder)
    expect(wrapper.find('img[src="badge.png"]').exists()).toBe(false)
    
    // Click the card
    await wrapper.trigger('click')
    
    expect(store.getBadge).toHaveBeenCalledWith('123')
    
    // Wait for async resolution
    await new Promise(r => setTimeout(r, 0))
    await wrapper.vm.$nextTick()
    
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('badge.png')
  })
})
