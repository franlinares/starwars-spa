<script setup lang="ts">
import type { Planet } from '@/types/Planet'

defineProps<{
  planet: Planet
}>()
</script>

<template>
  <article class="card-base" role="region" :aria-label="`Planet card for ${planet.name}`">
    <h3 class="card-base__name">{{ planet.name }}</h3>

    <div class="card-base__row">
      <span class="card-base__label">Climate:</span>
      <span class="card-base__value">{{ planet.climate }}</span>
    </div>

    <div class="card-base__row">
      <span class="card-base__label">Terrain:</span>
      <span class="card-base__value">{{ planet.terrain }}</span>
    </div>

    <div class="card-base__row">
      <span class="card-base__label">Population:</span>
      <span class="card-base__value">{{ planet.population }}</span>
    </div>

    <div class="card-base__row">
      <span class="card-base__label">Diameter:</span>
      <span class="card-base__value">{{ planet.diameter }} km</span>
    </div>

    <div class="card-base__row">
      <span class="card-base__label">Gravity:</span>
      <span class="card-base__value">{{ planet.gravity }}</span>
    </div>

    <div class="card-base__row">
      <span class="card-base__label">Rotation Period:</span>
      <span class="card-base__value">{{ planet.rotation_period }} h</span>
    </div>
  </article>
</template>

<style scoped lang="less">
@import '@/styles/variables.less';
@import '@/styles/card-base.less';
</style>
