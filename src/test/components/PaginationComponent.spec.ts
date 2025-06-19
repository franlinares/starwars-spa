import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PaginationComponent from '@/components/PaginationComponent.vue'

describe('PaginationComponent', () => {
  it('renders current and total pages correctly', () => {
    const wrapper = mount(PaginationComponent, {
      props: {
        currentPage: 2,
        totalItems: 50,
        itemsPerPage: 10,
      },
    })

    expect(wrapper.text()).toContain('Page 2 of 5')
  })

  it('disables previous button on first page', () => {
    const wrapper = mount(PaginationComponent, {
      props: {
        currentPage: 1,
        totalItems: 50,
        itemsPerPage: 10,
      },
    })

    const prevButton = wrapper.get('button[aria-label="Go to previous page"]')
    expect(prevButton.attributes('disabled')).toBeDefined()
  })

  it('disables next button on last page', () => {
    const wrapper = mount(PaginationComponent, {
      props: {
        currentPage: 5,
        totalItems: 50,
        itemsPerPage: 10,
      },
    })

    const nextButton = wrapper.get('button[aria-label="Go to next page"]')
    expect(nextButton.attributes('disabled')).toBeDefined()
  })

  it('emits change event with correct page when previous is clicked', async () => {
    const wrapper = mount(PaginationComponent, {
      props: {
        currentPage: 3,
        totalItems: 50,
        itemsPerPage: 10,
      },
    })

    const prevButton = wrapper.get('button[aria-label="Go to previous page"]')
    await prevButton.trigger('click')

    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')![0]).toEqual([2])
  })

  it('emits change event with correct page when next is clicked', async () => {
    const wrapper = mount(PaginationComponent, {
      props: {
        currentPage: 3,
        totalItems: 50,
        itemsPerPage: 10,
      },
    })

    const nextButton = wrapper.get('button[aria-label="Go to next page"]')
    await nextButton.trigger('click')

    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')![0]).toEqual([4])
  })

  it('does not emit change when clicking prev on first page', async () => {
    const wrapper = mount(PaginationComponent, {
      props: {
        currentPage: 1,
        totalItems: 50,
        itemsPerPage: 10,
      },
    })

    const prevButton = wrapper.get('button[aria-label="Go to previous page"]')
    await prevButton.trigger('click')

    expect(wrapper.emitted('change')).toBeFalsy()
  })

  it('does not emit change when clicking next on last page', async () => {
    const wrapper = mount(PaginationComponent, {
      props: {
        currentPage: 5,
        totalItems: 50,
        itemsPerPage: 10,
      },
    })

    const nextButton = wrapper.get('button[aria-label="Go to next page"]')
    await nextButton.trigger('click')

    expect(wrapper.emitted('change')).toBeFalsy()
  })
})
