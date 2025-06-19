import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import StarWarsList from '@/components/StarWarsList.vue'
import * as swData from '@/composables/UseStarWarsData'

vi.mock('vue-router', () => ({
  useRoute: () => ({ query: { page: '1' } }),
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

afterEach(() => {
  vi.restoreAllMocks()
})

describe('StarWarsList', () => {
  it('renders people cards after successful load', async () => {
    vi.spyOn(swData, 'fetchAllResources').mockResolvedValue([
      {
        name: 'Luke Skywalker',
        created: '',
        height: '',
        mass: '',
        hair_color: '',
        skin_color: '',
        eye_color: '',
        birth_year: '',
        gender: '',
        homeworld: '',
        films: [],
        species: [],
        vehicles: [],
        starships: [],
        edited: '',
        url: '',
      },
    ])

    const wrapper = mount(StarWarsList)

    await flushPromises()

    expect(wrapper.text()).toContain('Luke Skywalker')
    expect(wrapper.findComponent({ name: 'PersonCard' }).exists()).toBe(true)
  })

  it('renders planet cards if resource is planets', async () => {
    vi.spyOn(swData, 'fetchAllResources').mockResolvedValue([
      {
        name: 'Tatooine',
        created: '',
        rotation_period: '',
        orbital_period: '',
        diameter: '',
        climate: '',
        gravity: '',
        terrain: '',
        surface_water: '',
        population: '',
        residents: [],
        films: [],
        edited: '',
        url: '',
      },
    ])

    const wrapper = mount(StarWarsList)

    const selector = wrapper.findComponent({ name: 'ResourceSelector' })
    selector.vm.$emit('update:resource', 'planets')

    await flushPromises()

    expect(wrapper.text()).toContain('Tatooine')
    expect(wrapper.findComponent({ name: 'PlanetCard' }).exists()).toBe(true)
  })

  it('shows error message on failure', async () => {
    vi.spyOn(swData, 'fetchAllResources').mockRejectedValue(new Error('Network error'))

    const wrapper = mount(StarWarsList)

    await flushPromises()

    expect(wrapper.text()).toContain('Failed to load people')
    expect(wrapper.find('.explorer__status--error').exists()).toBe(true)
  })

  it('shows empty message if no items', async () => {
    vi.spyOn(swData, 'fetchAllResources').mockResolvedValue([])

    const wrapper = mount(StarWarsList)

    await flushPromises()

    expect(wrapper.text()).toContain('No people available')
    expect(wrapper.find('.explorer__status--empty').exists()).toBe(true)
  })
})
