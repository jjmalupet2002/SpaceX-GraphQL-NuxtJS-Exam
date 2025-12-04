<template>
  <div class="favorite-carousel-container">
    <v-carousel
      v-if="favorites.length > 0"
      hide-delimiters
      show-arrows="hover"
      :cycle="true"
      :interval="5000"
      height="350px"
      class="favorite-carousel"
    >
      <v-carousel-item
        v-for="(item, i) in favorites"
        :key="item.id"
        @click="emit('selectItem', item)"
      >
        <v-sheet height="100%" tile color="#1a1a1a">
          <div class="d-flex fill-height justify-center align-center carousel-slide-content">
            <v-img
              :src="getItemImage(item)"
              class="carousel-image"
              cover
            >
              <div class="carousel-overlay">
                <v-card-title class="text-h5 text-white font-weight-bold">
                  {{ getItemTitle(item) }}
                </v-card-title>
                <v-card-subtitle class="text-white">
                  {{ item.type === 'rocket' ? '🚀 Rocket' : '🛰️ Launch' }}
                  - Added: {{ formatDate(item.addedAt) }}
                </v-card-subtitle>
              </div>
            </v-img>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

    <div v-else class="empty-carousel-state">
      <v-icon size="64" color="#00bfff">mdi-star-off</v-icon>
      <p>No recently added favorites yet. Your carousel will appear here.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import rocketImageDefault from '@/Assets/Images/rocket_image1.jpg'

const props = defineProps({
  favorites: {
    type: Array as () => { id: string; addedAt: number; data: any | null; type: 'rocket' | 'launch' }[],
    default: () => [],
  },
})

const emit = defineEmits(['selectItem'])

// Safe getters using item.data
const getItemImage = (item: any) => {
  const data = item?.data
  if (!data) return rocketImageDefault

  if (item.type === 'rocket') {
    return data.flickr_images?.[0] || data.image || rocketImageDefault
  } else {
    return data.links?.flickr_images?.[0] || data.links?.mission_patch_small || rocketImageDefault
  }
}

const getItemTitle = (item: any) => {
  const data = item?.data
  if (!data) return item.type === 'rocket' ? 'Unknown Rocket' : 'Unknown Launch'

  return item.type === 'rocket' ? data.name || 'Unknown Rocket' : data.mission_name || 'Unknown Launch'
}

const formatDate = (timestamp: number) => {
  if (!timestamp) return 'N/A'
  return new Date(timestamp).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<style scoped>
.favorite-carousel-container {
  margin-bottom: 3rem;
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.3);
  border-radius: 8px;
  overflow: hidden;
}

.favorite-carousel {
  background-color: #000;
}

.carousel-slide-content {
  position: relative;
  cursor: pointer;
}

.carousel-image {
  filter: brightness(70%);
  transition: filter 0.3s ease;
}

.carousel-slide-content:hover .carousel-image {
  filter: brightness(100%);
}

.carousel-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0));
  padding: 1rem;
  text-align: center;
}

.text-h5 {
  letter-spacing: 0.5px;
}

.empty-carousel-state {
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1a1a1a;
  border: 1px dashed #00bfff30;
  border-radius: 8px;
  color: #ccc;
  font-style: italic;
  gap: 1rem;
}
</style>
