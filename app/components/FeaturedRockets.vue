<template>
  <section class="featured-section">
    <v-container>
      <h2 class="text-h4 font-weight-bold mb-6 text-white">Featured Rockets</h2>
      <v-row v-if="loading">
        <v-col v-for="n in 2" :key="n" cols="12" md="6">
          <v-skeleton-loader type="card" color="grey-darken-4" class="skeleton-card" />
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col v-for="rocket in randomRockets" :key="rocket.id" cols="12" md="6">
          <v-card class="rocket-card" dark>
            <v-img
              :src="rocket.flickr_images?.[0] || defaultRocketImage"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.2), rgba(0,0,0,.7)"
              height="250px"
              cover
            >
              <v-card-title class="text-white">{{ rocket.name }}</v-card-title>
            </v-img>
            <v-card-text class="pt-4">
              <div class="text-subtitle-1 mb-2">First Flight: {{ rocket.first_flight }}</div>
              <div>{{ rocket.description?.substring(0, 150) }}...</div>
            </v-card-text>
            <v-card-actions>
              <v-btn :href="rocket.wikipedia" target="_blank" color="blue" text>
                Learn More
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import defaultRocketImage from '~/Assets/Images/rocket_image1.jpg'

const { rockets, loading } = useRockets()

const randomRockets = computed(() => {
  if (!rockets.value || rockets.value.length === 0) return []
  // Get 2 random rockets
  const shuffled = [...rockets.value].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 2)
})
</script>

<style scoped>
.featured-section {
  margin: 3rem 0;
  text-align: center;
  padding: 2rem 0;
}
.skeleton-card {
  min-height: 250px;
  background: #111;
}
.rocket-card {
  background-color: #111;
  border: 1px solid #ff00ff;
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(255, 0, 255, 0.3);
}
.rocket-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.6);
}
</style>
