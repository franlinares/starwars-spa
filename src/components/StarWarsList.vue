<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchAllResources } from '@/composables/UseStarWarsData'
import type { Planet } from '@/types/Planet'
import type { Person } from '@/types/Person'
import ResourceSelector from '@/components/ResourceSelector.vue'
import PersonCard from '@/components/People/PersonCard.vue'
import PlanetCard from '@/components/Planets/PlanetCard.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'

const currentResource = ref<'planets' | 'people'>('people')

const loading = ref(false)
const error = ref<string | null>(null)
const items = ref<(Planet | Person)[]>([])
const route = useRoute()
const router = useRouter()
const searchTerm = ref('')
const sortBy = ref<'name' | 'created'>('name')
const sortOrder = ref<'asc' | 'desc'>('asc')
const itemsPerPage = 10

const currentPage = computed(() => {
  const page = parseInt(route.query.page as string)
  return isNaN(page) || page < 1 ? 1 : page
})

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredItems.value.slice(start, start + itemsPerPage)
})

const filteredItems = computed(() => {
  const search = searchTerm.value.toLowerCase()

  return items.value
    .filter((item) => {
      if ('name' in item) {
        return item.name.toLowerCase().includes(search)
      }
      return false
    })
    .sort((a, b) => {
      const getValue = (item: Planet | Person): string => {
        if (sortBy.value === 'name' && 'name' in item) {
          return item.name.toLowerCase()
        }
        if (sortBy.value === 'created' && 'created' in item) {
          return item.created
        }
        return ''
      }

      const aVal = getValue(a)
      const bVal = getValue(b)

      return sortOrder.value === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
    })
})

const onPageChange = (page: number) => {
  router.push({ query: { ...route.query, page: page.toString() } })
}

async function loadData() {
  loading.value = true
  error.value = null

  try {
    items.value =
      currentResource.value === 'planets'
        ? await fetchAllResources<Planet>('planets')
        : await fetchAllResources<Person>('people')
  } catch (err) {
    error.value = `Failed to load ${currentResource.value}.`
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(loadData)
watch(currentResource, () => {
  router.push({ query: { page: '1' } })
  loadData()
})
</script>

<template>
  <section class="explorer">
    <header class="explorer__header">
      <h1 class="explorer__title">Star Wars Explorer</h1>
      <p class="explorer__subtitle">Discover the galaxy's inhabitants and worlds</p>
    </header>

    <!-- <ResourceSelector v-model:resource="currentResource" @update:search="searchTerm = $event" /> -->
    <ResourceSelector
      v-model:resource="currentResource"
      @update:search="searchTerm = $event"
      @update:sortBy="sortBy = $event"
      @update:sortOrder="sortOrder = $event"
    />

    <div v-if="loading" class="explorer__status">Loading {{ currentResource }}...</div>

    <div v-else-if="error" class="explorer__status explorer__status--error">
      {{ error }}
    </div>

    <div v-else-if="items.length === 0" class="explorer__status explorer__status--empty">
      No {{ currentResource }} available
    </div>

    <div v-else-if="currentResource === 'people'" class="explorer__cards">
      <PersonCard
        v-for="person in paginatedItems as Person[]"
        :key="person.name"
        :person="person"
      />
    </div>

    <div v-else-if="currentResource === 'planets'" class="explorer__cards">
      <PlanetCard
        v-for="planet in paginatedItems as Planet[]"
        :key="planet.name"
        :planet="planet"
      />
    </div>
  </section>

  <PaginationComponent
    v-if="filteredItems.length > itemsPerPage"
    :currentPage="currentPage"
    :totalItems="filteredItems.length"
    :itemsPerPage="itemsPerPage"
    @change="onPageChange"
  />
</template>

<style lang="less" scoped>
@import '@/styles/variables.less';

.explorer {
  padding: 32px;

  &__header {
    text-align: center;
    margin-bottom: 32px;
  }

  &__title {
    font-size: @font-size-title;
    font-weight: bold;
    margin: 0;
  }

  &__subtitle {
    font-size: @font-size-subtitle;
    color: @color-text-secondary;
  }

  &__cards {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 24px;
    justify-content: center;
  }

  &__status {
    text-align: center;
    font-weight: 500;
    padding: 16px;
    color: @color-text-muted;

    &--error {
      color: @color-error;
      background: @color-error-bg;
      border: 1px solid @color-error-border;
      border-radius: 6px;
    }

    &--empty {
      color: @color-empty;
    }
  }
}
</style>
