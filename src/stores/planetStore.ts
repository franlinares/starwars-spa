import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Planet } from '@/types/Planet'
import { fetchAllResources } from '@/composables/UseStarWarsData'

export const usePlanetsStore = defineStore('planets', () => {
  // STATE
  const planets = ref<Planet[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // ACTION
  async function loadPlanets() {
    loading.value = true
    error.value = null
    try {
      planets.value = await fetchAllResources<Planet>('planets')
    } catch (err) {
      error.value = 'Error when loading the planets.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    planets,
    loading,
    error,
    loadPlanets,
  }
})
