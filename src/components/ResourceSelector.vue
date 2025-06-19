<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  resource: 'planets' | 'people'
}>()

const emit = defineEmits<{
  (e: 'update:resource', value: 'planets' | 'people'): void
  (e: 'update:search', value: string): void
  (e: 'update:sortBy', value: 'name' | 'created'): void
  (e: 'update:sortOrder', value: 'asc' | 'desc'): void
}>()

const currentResource = ref(props.resource)
const search = ref('')
const sortBy = ref<'name' | 'created'>('name')
const sortOrder = ref<'asc' | 'desc'>('asc')
// Emit initial values
watch(currentResource, (newValue) => {
  emit('update:resource', newValue)
})
// Watch for changes in the resource prop
watch(
  () => props.resource,
  (newVal) => {
    if (newVal !== currentResource.value) {
      currentResource.value = newVal
    }
  },
)
// Search functionality
watch(search, (val) => {
  emit('update:search', val)
})
// Sorting functionality
watch(sortBy, (val) => {
  emit('update:sortBy', val)
})
watch(sortOrder, (val) => {
  emit('update:sortOrder', val)
})
</script>
<template>
  <div class="explorer">
    <div class="explorer__filters">
      <button
        :class="['explorer__tab', { 'explorer__tab--active': currentResource === 'people' }]"
        @click="currentResource = 'people'"
        role="button"
        :aria-pressed="currentResource === 'people'"
      >
        🧑‍🚀 People
      </button>
      <button
        :class="['explorer__tab', { 'explorer__tab--active': currentResource === 'planets' }]"
        @click="currentResource = 'planets'"
        role="button"
        :aria-pressed="currentResource === 'planets'"
      >
        🌌 Planets
      </button>
    </div>

    <div class="explorer__search-sort">
      <input
        v-model="search"
        class="explorer__search-input"
        :placeholder="`Search ${currentResource}...`"
      />
      <select v-model="sortBy" class="explorer__select">
        <option value="name">Name</option>
        <option value="created">Created</option>
      </select>
      <select v-model="sortOrder" class="explorer__select">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  </div>
</template>

<style lang="less" scoped>
.explorer {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }

  &__filters {
    display: flex;
    gap: 12px;

    @media (max-width: 768px) {
      justify-content: center;
    }
  }

  &__tab {
    padding: 8px 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #f9f9f9;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.2s ease;

    &--active {
      background: #e0e0e0;
      border-color: #999;
    }
  }

  &__search-sort {
    display: flex;
    gap: 8px;
    flex-grow: 1;
    justify-content: flex-end;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: stretch;
      width: 100%;
    }
  }

  &__search-input {
    flex: 1;
    min-width: 200px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }

  &__select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 6px;
    min-width: 120px;
  }
}
</style>
