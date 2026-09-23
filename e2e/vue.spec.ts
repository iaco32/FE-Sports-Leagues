import { test, expect } from '@playwright/test'

test.describe('Sports Leagues App E2E', () => {
  
  test.beforeEach(async ({ page }) => {
    // Mock the main API call to avoid flakiness and network dependency during tests
    await page.route('**/all_leagues.php', async (route) => {
      await route.fulfill({
        json: {
          leagues: [
            { idLeague: '1', strLeague: 'Premier League', strSport: 'Soccer', strLeagueAlternate: 'EPL' },
            { idLeague: '2', strLeague: 'NBA', strSport: 'Basketball', strLeagueAlternate: 'National Basketball Association' },
            { idLeague: '3', strLeague: 'Serie A', strSport: 'Soccer', strLeagueAlternate: 'Italian Serie A' },
          ]
        }
      })
    })

    await page.goto('/')
  })

  test('loads the app and displays mocked leagues', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Sports Leagues')
    
    // Check if the 3 mocked leagues are rendered
    const cards = page.locator('.group.flex.flex-col') // our LeagueCard container
    await expect(cards).toHaveCount(3)
    await expect(page.getByRole('heading', { name: 'Premier League' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'NBA' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Serie A' })).toBeVisible()
  })

  test('toggles dark mode', async ({ page }) => {
    const html = page.locator('html')
    const themeBtn = page.getByRole('button', { name: 'Toggle Dark Mode' })
    
    // Initially should not have dark class (or depends on system, but let's force light via click)
    await themeBtn.click()
    
    // It should toggle. Let's just check if the class changes
    const hasDark = await html.evaluate(node => node.classList.contains('dark'))
    await themeBtn.click()
    const hasDarkAfter = await html.evaluate(node => node.classList.contains('dark'))
    
    expect(hasDark).not.toBe(hasDarkAfter)
  })

  test('persists dark mode across page reloads', async ({ page }) => {
    const html = page.locator('html')
    const themeBtn = page.getByRole('button', { name: 'Toggle Dark Mode' })
    
    // Turn dark mode on
    await themeBtn.click()
    await expect(html).toHaveClass(/dark/)
    
    // Reload the page
    await page.reload()
    
    // Verify it remains dark after reload
    await expect(html).toHaveClass(/dark/)
  })

  test('filters leagues by search query', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search leagues...')
    await searchInput.fill('Serie')
    
    const cards = page.locator('.group.flex.flex-col')
    await expect(cards).toHaveCount(1)
    await expect(page.getByRole('heading', { name: 'Serie A' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Premier League' })).toBeHidden()
  })

  test('filters leagues by sport dropdown', async ({ page }) => {
    const select = page.locator('select')
    await select.selectOption('Basketball')
    
    const cards = page.locator('.group.flex.flex-col')
    await expect(cards).toHaveCount(1)
    await expect(page.getByRole('heading', { name: 'NBA' })).toBeVisible()
  })

  test('shows empty state when no matches found', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search leagues...')
    await searchInput.fill('Golf League')
    
    await expect(page.locator('text=No leagues found')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Clear Filters' })).toBeVisible()
  })

  test('simulates 500 API error via debug tool', async ({ page }) => {
    const errorBtn = page.locator('[title="Simulate API Error"]')
    await errorBtn.click()
    
    await expect(page.locator('text=Oops! Something went wrong')).toBeVisible()
    await expect(page.locator('text=Simulated 500 Internal Server Error')).toBeVisible()
    
    // Reset
    await page.locator('[title="Reset State to Normal"]').click()
    await expect(page.getByRole('heading', { name: 'Premier League' })).toBeVisible()
  })

  test('loads badge on card click', async ({ page }) => {
    // Mock the badge API call
    await page.route('**/search_all_seasons.php*', async (route) => {
      await route.fulfill({
        json: {
          seasons: [{ strBadge: 'https://example.com/badge.png' }]
        }
      })
    })

    const premierCard = page.locator('.group.flex.flex-col').first()
    
    // Initially should say "Tap to load"
    await expect(premierCard.locator('text=Tap to load')).toBeVisible()
    
    // Click card
    await premierCard.click()
    
    // Image should eventually appear
    const img = premierCard.locator('img')
    await expect(img).toBeVisible()
    await expect(img).toHaveAttribute('src', 'https://example.com/badge.png')
  })
})
