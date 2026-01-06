<template>
  <v-dialog v-model="dialog" max-width="800">
    <v-card class="launch-details-card" dark>
      <template v-if="(launch.links?.flickr_images ?? []).length > 0">
        <v-carousel hide-delimiters height="300" show-arrows-on-hover>
          <v-carousel-item v-for="(img, i) in launch.links.flickr_images" :key="i">
            <v-img :src="img || launch.links?.mission_patch_small || defaultRocketImage" cover>
              <v-card-title class="text-white align-end">{{ launch.mission_name }}</v-card-title>
            </v-img>
          </v-carousel-item>
        </v-carousel>
      </template>
      <template v-else>
        <v-img
          :src="launch.links?.mission_patch_small || defaultRocketImage"
          height="300px"
          cover
        >
          <v-card-title class="text-white align-end">{{ launch.mission_name }}</v-card-title>
        </v-img>
      </template>

      <v-card-text>
        <div class="text-h6 mb-2">Launch Date: {{ launch.launch_date_local ? new Date(launch.launch_date_local).toLocaleString() : 'Unknown date' }}</div>
        <div class="text-h6 mb-2">Rocket: {{ launch.rocket?.rocket_name ?? 'Unknown rocket' }}</div>
        <div class="text-h6 mb-2">Launch Site: {{ launch.launch_site?.site_name ?? 'Unknown site' }}</div>
        <p class="mt-4">{{ launch.details ?? 'No details available for this launch.' }}</p>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue" text @click="viewRocketDetails">View Rocket Details</v-btn>
        <v-btn color="green" text @click="toggleFavorite">
          <span v-if="isFavorite">Remove from Favorites</span>
          <span v-else>Add to Favorites</span>
        </v-btn>
        <v-btn color="red" text @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useFavoritesStore } from '~/stores/favorites'
import defaultRocketImage from '~/Assets/Images/rocket_image1.jpg'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  launch: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:modelValue', 'viewRocket'])

const favoritesStore = useFavoritesStore()

const dialog = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const isFavorite = computed(() => favoritesStore.isLaunchFavorite(props.launch.id))

const closeDialog = () => {
  dialog.value = false
}

const viewRocketDetails = () => {
  emit('viewRocket', props.launch.rocket.rocket_name)
  closeDialog()
}

const toggleFavorite = () => {
  if (props.launch) { // Ensure launch object is present
    favoritesStore.toggleFavoriteLaunch(props.launch)
  }
}
</script>

<style scoped>
.launch-details-card {
  background-color: #111;
  color: #fff;
}
</style>
