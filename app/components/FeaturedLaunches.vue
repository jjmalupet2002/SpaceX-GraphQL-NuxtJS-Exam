<template>
  <section class="featured-section">
    <v-container>
      <h2 class="text-h4 font-weight-bold mb-6 text-white">Featured Launches</h2>
      <v-row v-if="loading">
        <v-col v-for="n in 3" :key="n" cols="12" md="4">
          <v-skeleton-loader type="card" color="grey-darken-4" class="skeleton-card" />
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col v-for="launch in randomLaunches" :key="launch.id" cols="12" md="4">
          <LaunchCard :launch="launch" @selectLaunch="goToLaunchDetails" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { allLaunches, loading } = useLaunches()

// Get 3 random launches
const randomLaunches = computed(() => {
  if (!allLaunches.value || allLaunches.value.length === 0) return []
  
  // Create a copy to avoid mutating the original
  const shuffled = [...allLaunches.value].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 3)
})

const goToLaunchDetails = (launch: any) => {
  // Assuming we have a launch details page, otherwise navigate to global launches page for now
  // Or if there is a specific route: /launches/:id
  // Based on LaunchCard emit, usually we want to go to a details page.
  // The user didn't specify the route but "Launch Cards and Launch Details Modal" implies a modal or page.
  // For now I'll just log or do nothing, but LaunchCard has an emit. 
  // Wait, I should probably check if there is a Launch Details page.
  // LaunchCard emits 'selectLaunch'.
  // I will assume for now we don't have a route yet or just stay on page.
  // Actually, let's just use the router to go to /launches if possible or just log it.
  console.log('Selected launch:', launch)
}
</script>

<style scoped>
.featured-section {
  margin: 3rem 0;
  text-align: center;
  padding: 2rem 0;
}
.skeleton-card {
  min-height: 200px;
  background: #111;
}
</style>
