import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import PlanetCard from '@/components/Planets/PlanetCard.vue'
import type { Planet } from '@/types/Planet'

const mockPlanet: Planet = {
  name: 'Tatooine',
  rotation_period: '23',
  orbital_period: '304',
  diameter: '10465',
  climate: 'arid',
  gravity: '1 standard',
  terrain: 'desert',
  surface_water: '1',
  population: '200000',
  residents: [],
  films: [],
  created: '',
  edited: '',
  url: '',
}

describe('PlanetCard', () => {
  it('renders planet name', () => {
    const wrapper = mount(PlanetCard, {
      props: { planet: mockPlanet },
    })

    expect(wrapper.text()).toContain('Tatooine')
  })

  it('renders climate, terrain and population', () => {
    const wrapper = mount(PlanetCard, {
      props: { planet: mockPlanet },
    })

    expect(wrapper.text()).toContain('arid')
    expect(wrapper.text()).toContain('desert')
    expect(wrapper.text()).toContain('200000')
  })

  it('renders diameter and rotation period with units', () => {
    const wrapper = mount(PlanetCard, {
      props: { planet: mockPlanet },
    })

    expect(wrapper.text()).toContain('10465 km')
    expect(wrapper.text()).toContain('23 h')
  })
})
