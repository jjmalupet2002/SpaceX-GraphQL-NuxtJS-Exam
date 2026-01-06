<template>
  <v-card class="launch-card" dark @click="emit('selectLaunch', launch)">
    <v-img
      :src="launch.links?.flickr_images?.[0] || launch.links?.mission_patch_small || defaultRocketImage"
      class="align-end"
      gradient="to bottom, rgba(0,0,0,.2), rgba(0,0,0,.7)"
      height="200px"
      cover
    >
      <v-card-title class="text-white">{{ launch.mission_name }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4">
      {{ launch.launch_date_local ? new Date(launch.launch_date_local).toLocaleDateString() : 'Unknown date' }}
    </v-card-subtitle>

    <v-card-text>
      <div>{{ launch.rocket?.rocket_name ?? 'Unknown rocket' }}</div>
      <div>{{ launch.launch_site?.site_name ?? 'Unknown site' }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="blue" text>Details</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import defaultRocketImage from '~/Assets/Images/rocket_image1.jpg'

const props = defineProps({
  launch: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['selectLaunch'])
</script>

<style scoped>
.launch-card {
  background-color: #111;
  border: 1px solid #00bfff;
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 191, 255, 0.5);
  color: #fff;
}

.launch-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 20px rgba(0, 191, 255, 0.8);
}
</style>
