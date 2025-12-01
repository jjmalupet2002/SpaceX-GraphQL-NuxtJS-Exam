<template>
  <div class="rockets-page">
    <div class="controls-container">
      <h1>Rockets</h1>
      <div class="actions">
        <v-text-field
          v-model="searchTerm"
          label="Search Rockets"
          dense
          outlined
          dark
          class="search-field"
        ></v-text-field>
        <div class="sort-controls">
          <v-btn
            :class="{ 'active': sortOrder === 'desc' }"
            @click="sortOrder = 'desc'"
          >
            Newest
          </v-btn>
          <v-btn
            :class="{ 'active': sortOrder === 'asc' }"
            @click="sortOrder = 'asc'"
          >
            Oldest
          </v-btn>
        </div>
      </div>
    </div>

    <div v-if="loading">Loading rockets...</div>
    <div v-if="error">Error loading rockets: {{ error.message }}</div>
    <div v-if="rockets.length" class="rockets-grid">
      <RocketCard
        v-for="rocket in rockets"
        :key="rocket.id"
        :rocket="rocket"
        @click="selectRocket(rocket)"
      />
    </div>
    <div v-else-if="!loading" class="no-results">
      No rockets found.
    </div>
    <RocketDetailPanel
      :rocket="selectedRocket"
      :active="isPanelActive"
      @close="closePanel"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRockets } from '~/composables/useRockets'
import RocketCard from '~/components/RocketCard.vue'
import RocketDetailPanel from '~/components/RocketDetailPanel.vue'

const { rockets, loading, error, sortOrder, searchTerm } = useRockets()

const selectedRocket = ref<any>(null)
const isPanelActive = ref(false)

function selectRocket(rocket: any) {
  selectedRocket.value = rocket
  isPanelActive.value = true
}

function closePanel() {
  isPanelActive.value = false
}
</script>

<style scoped>
.rockets-page {
  padding: 2rem;
  background: #000;
  min-height: 100vh;
}

.controls-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.search-field {
  width: 250px;
}

.sort-controls .v-btn {
  margin-left: 0.5rem;
  background-color: #333;
  color: white;
}

.sort-controls .v-btn.active {
  background-color: #00bfff;
  color: black;
}

.rockets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.no-results {
  text-align: center;
  margin-top: 4rem;
  font-size: 1.2rem;
  color: #888;
}
</style>
