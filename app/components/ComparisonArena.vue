<template>
  <v-card class="arena-card" dark>
    <v-card-text
      class="arena-area d-flex align-end justify-center"
      @dragover.prevent
      @drop="onDrop"
      :class="{ 'is-empty': selectedRockets.length === 0 }"
    >
      <div v-if="selectedRockets.length === 0" class="text-center empty-state">
        <v-icon size="64" color="grey-darken-2">mdi-rocket-launch-outline</v-icon>
        <p class="text-h6 text-grey mt-4">Drag and drop rockets here to compare scale</p>
      </div>

      <div
        v-for="rocket in selectedRockets"
        :key="rocket.id"
        class="rocket-column mx-4"
        :style="{ width: '120px' }"
      >
        <div class="d-flex flex-column align-center" style="height: 100%">
           
          <!-- Rocket Height Viz -->
          <div class="rocket-visual-container d-flex align-end mb-2" style="height: 300px; width: 100%">
             <div 
                class="rocket-bar"
                :style="{ height: getRelativeHeight(rocket) + '%', width: '100%' }"
             >
                <v-img
                  :src="defaultRocketImage"
                  cover
                  class="rounded-t-lg rocket-img"
                  height="100%"
                >
                   <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height bg-grey-darken-3">
                             <v-progress-circular indeterminate color="blue"></v-progress-circular>
                        </div>
                   </template>
                </v-img>
             </div>
          </div>

          <!-- Info -->
          <div class="text-center">
            <div class="text-subtitle-2 font-weight-bold text-white text-truncate">{{ rocket.name }}</div>
            <div class="text-caption text-blue">{{ rocket.height?.meters }}m</div>
            <v-btn
              icon="mdi-close"
              size="x-small"
              variant="text"
              color="red"
              class="mt-1"
              @click="store.removeRocket(rocket.id)"
            ></v-btn>
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
import defaultRocketImage from '~/Assets/Images/rocket_image1.jpg'

const { rockets } = useRockets()
const store = useComparatorStore()

const selectedRockets = computed(() => {
  return rockets.value.filter(r => store.selectedRocketIds.includes(r.id))
})

const maxHeight = computed(() => {
  if (selectedRockets.value.length === 0) return 100
  const heights = selectedRockets.value.map(r => r.height?.meters || 0)
  return Math.max(...heights)
})

const getRelativeHeight = (rocket: any) => {
  const h = rocket.height?.meters || 0
  if (maxHeight.value === 0) return 0
  // Scale to max 100%
  return (h / maxHeight.value) * 100
}

const onDrop = (event: DragEvent) => {
  if (event.dataTransfer) {
    const rocketId = event.dataTransfer.getData('rocketId')
    if (rocketId) {
      store.addRocket(rocketId)
    }
  }
}
</script>

<style scoped>
.arena-card {
  background-color: #111;
  border: 1px dashed #333;
  min-height: 450px;
}

.arena-area {
  min-height: 450px;
  position: relative;
  transition: background-color 0.3s;
}

.is-empty {
  background-color: #1a1a1a;
}

.empty-state {
  opacity: 0.5;
}

.rocket-bar {
  transition: height 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  max-width: 80px;
  margin: 0 auto;
}

.rocket-img {
    opacity: 0.9;
    filter: brightness(0.8);
}
</style>
