import { test, expect } from '@playwright/test'

test('StarWars SPA happy path: load → search → sort → paginate', async ({ page }) => {
  await page.goto('http://localhost:5173')

  await expect(page.locator('text=Star Wars Explorer')).toBeVisible()

  await expect(page.locator('.explorer__cards')).toBeVisible()

  await page.locator('.explorer__search-input').fill('luke')
  await expect(page.locator('.explorer__cards')).toContainText(/luke/i)

  await page.locator('.explorer__select').first().selectOption({ label: 'Created' })

  await page.locator('.explorer__select').nth(1).selectOption({ label: 'Descending' })

  if (await page.locator('button[aria-label="Go to next page"]').isVisible()) {
    await page.locator('button[aria-label="Go to next page"]').click()
    await expect(page).toHaveURL(/page=2/)
  }
})
