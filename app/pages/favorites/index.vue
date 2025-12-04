<template>
  <div class="favorites-page">
    <h1>My Favorites</h1>

    <!-- Recently Added Carousel Section -->
    <section class="recently-added-section">
      <FavoriteCarousel
        :favorites="recentFavorites"
        @selectItem="handleCarouselItemClick"
      />
    </section>

    <!-- All Favorites Section (List / Grid) -->
    <section class="all-favorites-section">
      <div class="section-header">
        <h2>All Favorites</h2>
        <div class="actions-container">
          <v-select
            v-model="filterCategory"
            :items="categoryOptions"
            label="Category"
            variant="outlined"
            density="compact"
            hide-details
            class="category-select"
            bg-color="#333"
            color="#00bfff"
            item-color="#00bfff"
            flat
          ></v-select>
          <v-select
            v-model="sortOrder"
            :items="sortOptions"
            label="Sort By"
            variant="outlined"
            density="compact"
            hide-details
            class="sort-select"
            bg-color="#333"
            color="#00bfff"
            item-color="#00bfff"
            flat
          ></v-select>
          <v-btn
            color="red"
            variant="outlined"
            @click="showClearConfirm = true"
            :disabled="sortedAllFavoritesForGrid.length === 0"
            class="ml-3"
          >
            Clear All Favorites
          </v-btn>
        </div>
      </div>

      <div v-if="sortedAllFavoritesForGrid.length === 0" class="empty-state grid-empty">
        <v-icon size="64" color="#00bfff">mdi-folder-open-outline</v-icon>
        <p>Your favorite collection is empty. Add some rockets or launches!</p>
      </div>
      <div v-else class="items-grid">
        <FavoriteCard
          v-for="item in sortedAllFavoritesForGrid"
          :key="item.id"
          :item="item"
          @selectItem="handleGridItemClick"
        />
      </div>
    </section>

    <!-- Modals for details -->
    <RocketDetailPanel
      :rocket="selectedRocket"
      :active="isRocketPanelActive"
      @close="closeRocketPanel"
    />
    <LaunchDetailsModal
      v-model="isLaunchModalActive"
      :launch="selectedLaunch"
      @viewRocket="navigateToRocketDetails"
    />

    <!-- Clear All Confirmation Dialog -->
    <v-dialog v-model="showClearConfirm" max-width="500">
      <v-card dark class="confirmation-card">
        <v-card-title class="headline">Confirm Clear Favorites</v-card-title>
        <v-card-text>
          Are you sure you want to remove all your favorite rockets and launches? This action cannot be undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" text @click="showClearConfirm = false">Cancel</v-btn>
          <v-btn color="red" text @click="clearAllConfirmed">Clear All</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFavoritesStore } from '~/stores/favorites'
import RocketDetailPanel from '~/components/RocketDetailPanel.vue'
import LaunchDetailsModal from '~/components/LaunchDetailsModal.vue'
import FavoriteCarousel from '~/components/FavoriteCarousel.vue'
import FavoriteCard from '~/components/FavoriteCard.vue'

const favoritesStore = useFavoritesStore()
const showClearConfirm = ref(false)
const router = useRouter()

const filterCategory = ref<'all' | 'rocket' | 'launch'>('all')

const categoryOptions = [
  { title: 'All', value: 'all' },
  { title: 'Rockets', value: 'rocket' },
  { title: 'Launches', value: 'launch' },
]

// Combine all favorites and add type for identification
const allFavorites = computed(() => {
  return [
    ...favoritesStore.favoriteRockets.map(item => ({ ...item, type: 'rocket' as const })),
    ...favoritesStore.favoriteLaunches.map(item => ({ ...item, type: 'launch' as const })),
  ]
})

// Sort favorites for carousel (recently added)
const recentFavorites = computed(() => {
  return [...allFavorites.value]
    .sort((a, b) => b.addedAt - a.addedAt)
    .slice(0, 5) // Display top 5 recently added in carousel
})

// Sorting for grid
const sortOrder = ref('newest') // 'newest' or 'oldest'
const sortOptions = [
  { title: 'Newest First', value: 'newest' },
  { title: 'Oldest First', value: 'oldest' },
]

const sortedAllFavoritesForGrid = computed(() => {
  let list = [...allFavorites.value]

  // Filter by category
  if (filterCategory.value !== 'all') {
    list = list.filter(item => item.type === filterCategory.value)
  }

  // Sort
  if (sortOrder.value === 'newest') {
    return list.sort((a, b) => b.addedAt - a.addedAt)
  } else {
    return list.sort((a, b) => a.addedAt - b.addedAt)
  }
})

function clearAllConfirmed() {
  favoritesStore.clearFavorites()
  showClearConfirm.value = false
}

// --- Detail Panel/Modal Logic ---
const selectedRocket = ref<any>(null)
const isRocketPanelActive = ref(false)
const selectedLaunch = ref<any>(null)
const isLaunchModalActive = ref(false)

function handleCarouselItemClick(item: any) {
  if (item.type === 'rocket') {
    selectedRocket.value = item.data
    isRocketPanelActive.value = true
  } else {
    selectedLaunch.value = item.data
    isLaunchModalActive.value = true
  }
}

function handleGridItemClick(item: any) {
  if (item.type === 'rocket') {
    selectedRocket.value = item.data
    isRocketPanelActive.value = true
  } else {
    selectedLaunch.value = item.data
    isLaunchModalActive.value = true
  }
}

function closeRocketPanel() {
  isRocketPanelActive.value = false
}

function navigateToRocketDetails(rocketName: string) {
  router.push(`/rockets?name=${rocketName}`) // Assuming rockets page can handle query params for pre-selection
}
</script>

<style scoped>
.favorites-page {
  padding: 2rem;
  background: #000;
  color: #fff;
  min-height: 100vh;
}

h1 {
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 3rem;
  text-shadow: 0 0 10px #00bfff;
}

.recently-added-section,
.all-favorites-section {
  margin-bottom: 4rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #00bfff;
  padding-bottom: 0.5rem;
}

.section-header h2 {
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
}

.actions-container {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.category-select {
  width: 150px;
}

.sort-select {
    width: 180px;
    background-color: #333 !important;
    color: white !important;
    border-radius: 4px;
}
:deep(.sort-select .v-field__input) {
    color: white !important;
}
:deep(.sort-select .v-label.v-field-label) {
  color: #00bfff !important;
}

.empty-state {
  color: #888;
  font-style: italic;
  text-align: center;
  padding: 2rem;
  border: 1px dashed #00bfff30;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.empty-state p {
    margin: 0;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.confirmation-card {
  background-color: #1a1a1a !important;
  border: 1px solid #00bfff !important;
}
.confirmation-card .headline {
  color: #00bfff !important;
}
.confirmation-card .v-card-text {
  color: #ccc !important;
}
</style>