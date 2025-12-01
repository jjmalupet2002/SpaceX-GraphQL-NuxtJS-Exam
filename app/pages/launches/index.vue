<template>
  <v-container>
    <h1 class="text-center my-5">SpaceX Launches</h1>

    <!-- Filter and Sort Controls -->
    <v-row class="mb-5">
      <v-col cols="12" md="4">
        <v-select
          v-model="selectedYear"
          :items="years"
          label="Filter by Year"
          clearable
          dense
          outlined
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="searchTerm"
          label="Search by Mission"
          clearable
          dense
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn-toggle v-model="sortOrder" mandatory color="blue">
          <v-btn value="desc">
            <v-icon start>mdi-arrow-down</v-icon>
            Newest
          </v-btn>
          <v-btn value="asc">
            <v-icon start>mdi-arrow-up</v-icon>
            Oldest
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <div v-if="loading" class="text-center">
      <v-progress-circular indeterminate color="blue"></v-progress-circular>
    </div>

    <div v-else-if="error" class="text-center red--text">
      <p>Error fetching launches. Please try again later.</p>
      <pre>{{ error }}</pre>
    </div>

    <v-row v-else-if="launches.length > 0">
      <v-col
        v-for="launch in launches"
        :key="launch.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <LaunchCard :launch="launch" @selectLaunch="openLaunchDetails" />
      </v-col>
    </v-row>
    
    <v-row v-else>
      <v-col class="text-center">
        <p>No results found for the selected filters.</p>
      </v-col>
    </v-row>

    <!-- Pagination Controls -->
    <v-row v-if="totalLaunches > 0" class="mt-5">
      <v-col class="text-center">
        <v-pagination
          v-model="currentPage"
          :length="pageCount"
          :total-visible="7"
          color="blue"
        ></v-pagination>
      </v-col>
    </v-row>

    <!-- Launch Details Modal -->
    <LaunchDetailsModal
      v-model="showLaunchDetailsModal"
      :launch="selectedLaunchForModal"
    />

  </v-container>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useLaunches } from '~/composables/useLaunches'
import LaunchCard from '~/components/LaunchCard.vue'
import LaunchDetailsModal from '~/components/LaunchDetailsModal.vue'

const { launches, loading, error, selectedYear, sortOrder, years, currentPage, itemsPerPage, totalLaunches, searchTerm } = useLaunches()

const pageCount = computed(() => Math.ceil(totalLaunches.value / itemsPerPage.value))

const showLaunchDetailsModal = ref(false)
const selectedLaunchForModal = ref(null)

const openLaunchDetails = (launch: any) => {
  selectedLaunchForModal.value = launch
  showLaunchDetailsModal.value = true
}
</script>

<style scoped>
.v-btn-toggle {
  display: flex;
}
.v-btn {
  flex: 1;
}
</style>
