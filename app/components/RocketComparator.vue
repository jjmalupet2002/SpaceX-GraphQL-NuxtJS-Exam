<template>
  <v-container fluid class="rocket-comparator-container pa-0">
    <v-row no-gutters>
      <!-- Sidebar List -->
      <v-col cols="12" md="3" lg="2" class="sidebar-col">
        <RocketDraggableList />
      </v-col>
      
      <!-- Main Arena Area -->
      <v-col cols="12" md="9" lg="10" class="main-col pa-4">
        <div class="d-flex align-center justify-space-between mb-4">
          <h1 class="text-h4 font-weight-bold text-white">Rocket Comparator</h1>
          <v-btn
            v-if="store.selectedRocketIds.length > 0"
            color="red"
            variant="text"
            size="small"
            @click="store.clearSelection"
          >
            Clear All
          </v-btn>
        </div>
        
        <ComparisonArena />
        <ComparisonCharts />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useComparatorStore } from '~/stores/useComparator'
import RocketDraggableList from './RocketDraggableList.vue'
import ComparisonArena from './ComparisonArena.vue'
import ComparisonCharts from './ComparisonCharts.vue'

const store = useComparatorStore()
</script>

<style scoped>
.rocket-comparator-container {
  min-height: calc(100vh - 64px); /* Adjust for navbar height */
  background-color: #000;
}

.sidebar-col {
  border-right: 1px solid #333;
  height: calc(100vh - 64px);
  overflow-y: auto;
}

@media (max-width: 960px) {
  .sidebar-col {
    height: auto;
    border-right: none;
    border-bottom: 1px solid #333;
    max-height: 300px;
  }
}

.main-col {
  height: calc(100vh - 64px);
  overflow-y: auto;
}

@media (max-width: 960px) {
  .main-col {
    height: auto;
  }
}
</style>
