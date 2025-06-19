import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Person } from '@/types/Person'
import { fetchAllResources } from '@/composables/UseStarWarsData'

export const usePeopleStore = defineStore('people', () => {
  // STATE
  const people = ref<Person[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // ACTION
  async function loadPeople() {
    loading.value = true
    error.value = null
    try {
      people.value = await fetchAllResources<Person>('people')
    } catch (err) {
      error.value = 'Error when loading the characters.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    people,
    loading,
    error,

    loadPeople,
  }
})
