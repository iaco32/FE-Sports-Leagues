import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { useTheme } from '@/composables/useTheme'

describe('useTheme composable', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  afterEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('initializes with light theme if no preference is saved', () => {
    const { isDark, initTheme } = useTheme()
    initTheme() // Manually trigger initialization for test isolation
    expect(isDark.value).toBe(false)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('reads from localStorage if available', () => {
    localStorage.setItem('theme', 'dark')
    const { isDark, initTheme } = useTheme()
    initTheme()
    expect(isDark.value).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('toggles the theme and updates localStorage and document class', () => {
    const { isDark, toggleTheme, initTheme } = useTheme()
    initTheme()

    // Test starts as light
    expect(isDark.value).toBe(false)

    toggleTheme()

    // Watcher is now flush: 'sync' so changes apply immediately
    expect(isDark.value).toBe(true)
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})
