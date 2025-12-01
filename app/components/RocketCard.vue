<template>
  <div class="rocket-card">
    <img src="@/Assets/Images/rocket_image1.jpg" alt="Rocket" class="rocket-image" />
    <div class="card-content">
      <h3 class="rocket-name">{{ rocket.name }}</h3>
      <p class="first-flight">First flight: {{ formatDate(rocket.first_flight) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  rocket: {
    type: Object,
    required: true,
  },
})

function formatDate(dateString: string) {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<style scoped>
.rocket-card {
  background-color: #1a1a1a;
  border: 1px solid #00bfff; /* Neon blue border */
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.rocket-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 15px #00bfff; /* Neon blue glow */
}

.rocket-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 1rem;
}

.rocket-name {
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.first-flight {
  color: #cccccc;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}
</style>
