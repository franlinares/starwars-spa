<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalItems: number
  itemsPerPage: number
}>()

const emit = defineEmits<{
  (e: 'change', page: number): void
}>()

const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage)
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('change', page)
  }
}
</script>

<template>
  <div class="pagination">
    <button
      class="pagination__button"
      :disabled="props.currentPage === 1"
      @click="goToPage(props.currentPage - 1)"
      aria-label="Go to previous page"
    >
      Previous
    </button>

    <span class="pagination__info"> Page {{ props.currentPage }} of {{ totalPages }} </span>

    <button
      class="pagination__button"
      :disabled="props.currentPage === totalPages"
      @click="goToPage(props.currentPage + 1)"
      aria-label="Go to next page"
    >
      Next
    </button>
  </div>
</template>

<style scoped lang="less">
@import '@/styles/variables.less';

.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;

  &__button {
    padding: 8px 16px;
    border: 1px solid @color-border;
    background: @color-bg-card-alt;
    color: @color-text-primary;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition:
      background 0.2s ease,
      box-shadow 0.2s ease;

    &:hover:not(:disabled) {
      background: @color-bg-card;
      box-shadow: @shadow-sm;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__info {
    display: inline-flex;
    align-items: center;
    font-weight: 500;
    color: @color-text-secondary;
  }
}
</style>
