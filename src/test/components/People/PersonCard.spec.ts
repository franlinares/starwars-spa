import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import PersonCard from '@/components/People/PersonCard.vue'
import type { Person } from '@/types/Person'

const mockPerson: Person = {
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
}

describe('PersonCard', () => {
  it('renders person name', () => {
    const wrapper = mount(PersonCard, {
      props: { person: mockPerson },
    })
    expect(wrapper.text()).toContain('Luke Skywalker')
  })

  it('renders key attributes', () => {
    const wrapper = mount(PersonCard, {
      props: { person: mockPerson },
    })

    expect(wrapper.text()).toContain('172')
    expect(wrapper.text()).toContain('77')
    expect(wrapper.text()).toContain('blond')
    expect(wrapper.text()).toContain('fair')
    expect(wrapper.text()).toContain('blue')
    expect(wrapper.text()).toContain('19BBY')
    expect(wrapper.text()).toContain('male')
  })
})
