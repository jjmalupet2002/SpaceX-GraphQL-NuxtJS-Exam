<template>
  <div class="side-panel-overlay" :class="{ 'is-active': active }" @click="$emit('close')">
    <div class="side-panel" :class="{ 'is-active': active }" @click.stop>
      <button class="close-button" @click="$emit('close')">X</button>
      <div v-if="rocket">
        <div class="gallery">
          <div v-if="imagesLoading" class="loading-overlay">Loading Images...</div>
          <div v-if="!imagesLoading && rocketImages.length === 0" class="fallback-container">
            <img src="@/Assets/Images/rocket_image1.jpg" :alt="rocket.name" class="rocket-image" />
            <p class="fallback-text">No specific images found for this rocket.</p>
          </div>
          <div v-if="!imagesLoading && rocketImages.length > 0" class="slideshow">
            <img :src="rocketImages[currentImageIndex]" :alt="rocket.name" class="rocket-image" />
            <div class="controls">
              <button @click.stop="prevImage" :disabled="rocketImages.length <= 1">‹</button>
              <span>{{ currentImageIndex + 1 }} / {{ rocketImages.length }}</span>
              <button @click.stop="nextImage" :disabled="rocketImages.length <= 1">›</button>
            </div>
          </div>
        </div>
        <div class="details-section">
          <h2 class="rocket-name">{{ rocket.name }}</h2>
          <div class="divider"></div>
          <p class="description">{{ rocket.description }}</p>
          <div class="stats-grid">
            <div class="stat-card">
              <span class="label">First Flight</span>
              <span class="value">{{ formatDate(rocket.first_flight) }}</span>
            </div>
            <div class="stat-card">
              <span class="label">Height</span>
              <span class="value">{{ rocket.height.meters }}m</span>
            </div>
            <div class="stat-card">
              <span class="label">Diameter</span>
              <span class="value">{{ rocket.diameter.meters }}m</span>
            </div>
            <div class="stat-card">
              <span class="label">Mass</span>
              <span class="value">{{ rocket.mass.kg.toLocaleString() }}kg</span>
            </div>
            <div class="stat-card">
              <span class="label">Stages</span>
              <span class="value">{{ rocket.stages }}</span>
            </div>
          </div>
          <div class="divider"></div>
          <button class="favorite-button" @click="favoritesStore.toggleFavorite(rocket)">
            <span v-if="favoritesStore.isFavorite(rocket.id)">★ Remove from Favorites</span>
            <span v-else>☆ Add to Favorites</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useFavoritesStore } from '~/stores/favorites'
import { useRocketImages } from '~/composables/useRocketImages'

const props = defineProps({
  rocket: {
    type: Object,
    default: null,
  },
  active: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['close'])

const favoritesStore = useFavoritesStore()

// Image Gallery Logic
const rocketName = computed(() => props.rocket?.name || null)
const { images: rocketImages, loading: imagesLoading } = useRocketImages(rocketName)
const currentImageIndex = ref(0)

watch(rocketImages, () => {
  currentImageIndex.value = 0
})

function prevImage() {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  } else {
    currentImageIndex.value = rocketImages.value.length - 1
  }
}

function nextImage() {
  if (currentImageIndex.value < rocketImages.value.length - 1) {
    currentImageIndex.value++
  } else {
    currentImageIndex.value = 0
  }
}

function formatDate(dateString: string) {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<style scoped>
/* ... existing styles ... */
.gallery {
  width: 100%;
  height: 40vh;
  flex-shrink: 0;
  position: relative;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-overlay, .fallback-container {
  color: #ccc;
  text-align: center;
}
.fallback-text {
  margin-top: 1rem;
  font-style: italic;
}

.slideshow {
  width: 100%;
  height: 100%;
  position: relative;
}

.rocket-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slideshow .controls {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
}

.controls button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.controls button:hover {
  color: #00bfff;
}

.controls button:disabled {
  color: #555;
  cursor: default;
}
/* ... rest of the existing styles ... */
.side-panel-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 1000;
}

.side-panel-overlay.is-active {
  opacity: 1;
  visibility: visible;
}

.side-panel {
  position: fixed;
  top: 0;
  right: -60%;
  width: 60%;
  height: 100%;
  background: #000;
  border-left: 1px solid #00bfff;
  color: white;
  transition: right 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow-y: auto;
  z-index: 1001;
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .side-panel {
    width: 90%;
    right: -90%;
  }
}

.side-panel.is-active {
  right: 0;
}

.close-button {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
}

.details-section {
  padding: 2rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.rocket-name {
  font-size: 2.5rem;
  font-weight: bold;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  text-shadow: 0 0 5px #00bfff;
}

.description {
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.divider {
  border-bottom: 1px solid #00bfff;
  margin: 1.5rem 0;
  opacity: 0.5;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: #111;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #222;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.stat-card:hover {
  border-color: #00bfff;
  transform: translateY(-3px);
  box-shadow: 0 0 10px rgba(0, 191, 255, 0.5);
}

.stat-card .label {
  font-size: 0.9rem;
  color: #888;
  text-transform: uppercase;
}

.stat-card .value {
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
}

.favorite-button {
  width: 100%;
  padding: 1rem;
  background-color: transparent;
  border: 2px solid #00bfff;
  color: #00bfff;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.favorite-button:hover {
  background-color: #00bfff;
  color: #000;
  box-shadow: 0 0 20px #00bfff;
}
</style>
