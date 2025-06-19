import { describe, it, expect, vi, afterEach } from 'vitest'
import axios from 'axios'
import { fetchAllResources } from '@/composables/UseStarWarsData'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('fetchAllResources', () => {
  it('returns data when API returns array directly', async () => {
    vi.spyOn(axios, 'get').mockResolvedValue({ data: [{ name: 'Luke' }] })

    const result = await fetchAllResources<{ name: string }>('people')
    expect(result).toEqual([{ name: 'Luke' }])
  })

  it('returns results when API returns { results: [] }', async () => {
    vi.spyOn(axios, 'get').mockResolvedValue({ data: { results: [{ name: 'Leia' }] } })

    const result = await fetchAllResources<{ name: string }>('people')
    expect(result).toEqual([{ name: 'Leia' }])
  })

  it('returns empty array on unexpected structure', async () => {
    vi.spyOn(axios, 'get').mockResolvedValue({ data: { test: 'test' } })

    const result = await fetchAllResources<{ name: string }>('people')
    expect(result).toEqual([])
  })

  it('returns empty array on error', async () => {
    vi.spyOn(axios, 'get').mockRejectedValue({ message: 'Something went wrong', status: 500 })

    const result = await fetchAllResources<{ name: string }>('people')
    expect(result).toEqual([])
  })
})
