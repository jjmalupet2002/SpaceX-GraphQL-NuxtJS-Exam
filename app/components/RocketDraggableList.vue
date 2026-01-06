<template>
  <v-card class="rocket-list-card" dark>
    <v-card-title class="text-h6 text-white">Available Rockets</v-card-title>
    <v-card-text>
      <div v-if="loading" class="text-center">
        <v-progress-circular indeterminate color="blue"></v-progress-circular>
      </div>
      <v-list v-else bg-color="transparent">
        <v-list-item
          v-for="rocket in rockets"
          :key="rocket.id"
          class="rocket-item mb-2"
          :class="{ 'is-selected': isSelected(rocket.id) }"
          draggable="true"
          @dragstart="onDragStart($event, rocket)"
          @click="onClick(rocket)"
        >
          <template v-slot:prepend>
            <v-avatar rounded="0" size="40">
              <v-img :src="defaultRocketImage" cover></v-img>
            </v-avatar>
          </template>
          <v-list-item-title class="text-white font-weight-bold">{{ rocket.name }}</v-list-item-title>
          <v-list-item-subtitle class="text-grey">
            {{ isSelected(rocket.id) ? 'Selected' : 'Drag to compare' }}
          </v-list-item-subtitle>
          <template v-slot:append>
            <v-icon v-if="isSelected(rocket.id)" color="green">mdi-check</v-icon>
            <v-icon v-else color="grey">mdi-drag-variant</v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useRockets } from '~/composables/useRockets'
import { useComparatorStore } from '~/stores/useComparator'
import defaultRocketImage from '~/Assets/Images/rocket_image1.jpg'

const { rockets, loading } = useRockets()
const store = useComparatorStore()

const isSelected = (id: string) => store.isSelected(id)

const onDragStart = (event: DragEvent, rocket: any) => {
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'copy'
    event.dataTransfer.effectAllowed = 'copy'
    event.dataTransfer.setData('rocketId', rocket.id)
  }
}

const onClick = (rocket: any) => {
  if (!store.isSelected(rocket.id)) {
    store.addRocket(rocket.id)
  } else {
      // Optional: remove on click if already selected?
      // For now let's just allow add via click for accessibility
  }
}
</script>

<style scoped>
.rocket-list-card {
  background-color: #1e1e1e;
  border: 1px solid #333;
  height: 100%;
  overflow-y: auto;
}

.rocket-item {
  background-color: #2c2c2c;
  border-radius: 8px;
  cursor: grab;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.rocket-item:hover {
  background-color: #383838;
  border-color: #00bfff;
}

.rocket-item.is-selected {
  opacity: 0.6;
  cursor: default;
  border-color: #4caf50;
}
</style>
