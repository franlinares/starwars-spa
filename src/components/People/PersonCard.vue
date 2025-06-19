<script setup lang="ts">
import type { Person } from '@/types/Person'

defineProps<{
  person: Person
}>()
</script>

<template>
  <article class="card-base" role="region" :aria-label="`Person card for ${person.name}`">
    <h3 class="card-base__name">{{ person.name }}</h3>

    <div class="card-base__row">
      <span class="card-base__label">Height:</span>
      <span class="card-base__value">{{ person.height }} cm</span>
    </div>

    <div class="card-base__row">
      <span class="card-base__label">Mass:</span>
      <span class="card-base__value">{{ person.mass }} kg</span>
    </div>

    <div class="card-base__row">
      <span class="card-base__label">Hair Color:</span>
      <span class="card-base__value">{{ person.hair_color }}</span>
    </div>

    <div class="card-base__row">
      <span class="card-base__label">Skin Color:</span>
      <span class="card-base__value">{{ person.skin_color }}</span>
    </div>

    <div class="card-base__row">
      <span class="card-base__label">Eye Color:</span>
      <span class="card-base__value">{{ person.eye_color }}</span>
    </div>

    <div class="card-base__row">
      <span class="card-base__label">Birth Year:</span>
      <span class="card-base__value">{{ person.birth_year }}</span>
    </div>

    <div class="card-base__row">
      <span class="card-base__label">Gender:</span>
      <span class="card-base__value">{{ person.gender }}</span>
    </div>
  </article>
</template>

<style scoped lang="less">
@import '@/styles/variables.less';
@import '@/styles/card-base.less';
</style>
