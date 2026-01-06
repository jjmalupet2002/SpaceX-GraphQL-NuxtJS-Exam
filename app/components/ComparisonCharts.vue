<template>
  <v-card class="charts-card mt-4" dark>
    <v-card-title class="text-white">Performance Metrics</v-card-title>
    <v-card-text>
      <div v-if="selectedRockets.length === 0" class="text-center text-grey py-5">
        Select rockets to see metrics
      </div>
      
      <div v-else>
        <!-- Mass Chart -->
        <div class="mb-6">
          <h3 class="text-body-1 text-grey mb-3">Mass (kg)</h3>
          <div v-for="rocket in selectedRockets" :key="rocket.id + '-mass'" class="mb-2">
            <div class="d-flex align-center justify-space-between mb-1">
              <span class="text-caption text-white">{{ rocket.name }}</span>
              <span class="text-caption text-blue">{{ formatNumber(rocket.mass?.kg) }} kg</span>
            </div>
            <v-progress-linear
              :model-value="getPercentage(rocket.mass?.kg, maxMass)"
              color="blue"
              height="10"
              rounded
            ></v-progress-linear>
          </div>
        </div>

        <!-- Diameter Chart -->
        <div>
          <h3 class="text-body-1 text-grey mb-3">Diameter (m)</h3>
          <div v-for="rocket in selectedRockets" :key="rocket.id + '-dia'" class="mb-2">
            <div class="d-flex align-center justify-space-between mb-1">
              <span class="text-caption text-white">{{ rocket.name }}</span>
              <span class="text-caption text-purple">{{ rocket.diameter?.meters }} m</span>
            </div>
            <v-progress-linear
              :model-value="getPercentage(rocket.diameter?.meters, maxDiameter)"
              color="purple"
              height="10"
              rounded
            ></v-progress-linear>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRockets } from '~/composables/useRockets'
import { useComparatorStore } from '~/stores/useComparator'

const { rockets } = useRockets()
const store = useComparatorStore()

const selectedRockets = computed(() => {
  return rockets.value.filter(r => store.selectedRocketIds.includes(r.id))
})

const maxMass = computed(() => {
  if (selectedRockets.value.length === 0) return 100
  return Math.max(...selectedRockets.value.map(r => r.mass?.kg || 0))
})

const maxDiameter = computed(() => {
  if (selectedRockets.value.length === 0) return 100
  return Math.max(...selectedRockets.value.map(r => r.diameter?.meters || 0))
})

const getPercentage = (value: number, max: number) => {
  if (!value || max === 0) return 0
  return (value / max) * 100
}

const formatNumber = (num: number) => {
  return num ? num.toLocaleString() : '0'
}
</script>

<style scoped>
.charts-card {
  background-color: #1e1e1e;
  border: 1px solid #333;
}
</style>
