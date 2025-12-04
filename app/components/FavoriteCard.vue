<template>
  <v-card class="favorite-card" dark @click="emit('selectItem', item)">
    <v-img
      :src="getItemImage(item)"
      class="align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.6)"
      height="120px"
      cover
    >
      <v-card-title class="text-white card-title">{{ getItemTitle(item) }}</v-card-title>
    </v-img>

    <v-card-text>
      <div class="card-subtitle">
        {{ item.type === 'rocket' ? '🚀 Rocket' : '🛰️ Launch' }}
      </div>
      <div class="text-grey-lighten-1">Added: {{ formatDate(item.addedAt) }}</div>
    </v-card-text>

    <v-card-actions class="d-flex justify-end">
      <v-btn
        icon="mdi-delete"
        variant="text"
        color="red"
        size="small"
        @click.stop="removeItem"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { useFavoritesStore } from '~/stores/favorites'
import rocketImageDefault from '@/Assets/Images/rocket_image1.jpg'

const props = defineProps({
  item: {
    type: Object as () => { id: string, addedAt: number, data: any | null, type: 'rocket' | 'launch' },
    required: true,
  },
})

const emit = defineEmits(['selectItem'])
const favoritesStore = useFavoritesStore()

const getItemImage = (item: any) => {
  const data = item?.data
  if (!data) return rocketImageDefault

  if (item.type === 'rocket') {
    return data.flickr_images?.[0] || data.image || rocketImageDefault
  } else {
    return data.links?.flickr_images?.[0] || data.links?.mission_patch_small || rocketImageDefault
  }
}

const getItemTitle = (item: any) => {
  const data = item?.data
  if (!data) return 'Unknown'

  return item.type === 'rocket' ? data.name : data.mission_name || 'Unnamed Launch'
}

const formatDate = (timestamp: number) => {
  if (!timestamp) return 'N/A'
  return new Date(timestamp).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const removeItem = () => {
  const data = props.item?.data
  if (!data) return

  if (props.item.type === 'rocket') {
    favoritesStore.toggleFavorite(data)
  } else {
    favoritesStore.toggleFavoriteLaunch(data)
  }
}
</script>

<style scoped>
.favorite-card {
  background-color: #1a1a1a;
  border: 1px solid #00bfff20;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.favorite-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 10px rgba(0, 191, 255, 0.5);
}

.v-card-title {
  font-size: 1rem;
  line-height: 1.2;
  white-space: normal;
  word-break: break-word;
  padding-bottom: 0.25rem;
}

.card-subtitle {
  font-size: 0.85rem;
  color: #00bfff;
  margin-bottom: 0.5rem;
}

.text-grey-lighten-1 {
  font-size: 0.75rem;
  color: #ccc;
}

.v-card-actions {
  margin-top: auto;
}
</style>
