import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePeopleStore } from '@/stores/peopleStore'
import * as starWarsData from '@/composables/UseStarWarsData'
import type { Person } from '@/types/Person'

beforeEach(() => {
  setActivePinia(createPinia())
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('usePeopleStore', () => {
  it('loads people successfully', async () => {
    const mockPeople: Person[] = [
      {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        homeworld: '',
        films: [],
        species: [],
        vehicles: [],
        starships: [],
        created: '',
        edited: '',
        url: '',
      },
    ]

    vi.spyOn(starWarsData, 'fetchAllResources').mockResolvedValue(mockPeople)

    const store = usePeopleStore()

    const loadPromise = store.loadPeople()
    expect(store.loading).toBe(true)

    await loadPromise

    expect(store.people).toEqual(mockPeople)
    expect(store.error).toBeNull()
    expect(store.loading).toBe(false)
  })

  it('handles fetch error', async () => {
    vi.spyOn(starWarsData, 'fetchAllResources').mockRejectedValue({
      message: 'Something went wrong',
      status: 500,
    })

    const store = usePeopleStore()

    const loadPromise = store.loadPeople()
    expect(store.loading).toBe(true)

    await loadPromise

    expect(store.people).toEqual([])
    expect(store.error).toBe('Error when loading the characters.')
    expect(store.loading).toBe(false)
  })
})
