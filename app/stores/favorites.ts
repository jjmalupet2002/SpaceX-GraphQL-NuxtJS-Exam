import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  // Rocket Favorites
  const favoriteRockets = ref<string[]>([])

  function toggleFavorite(rocketId: string) {
    const index = favoriteRockets.value.indexOf(rocketId)
    if (index === -1) {
      favoriteRockets.value.push(rocketId)
    } else {
      favoriteRockets.value.splice(index, 1)
    }
  }

  const isFavorite = computed(() => {
    return (rocketId: string) => favoriteRockets.value.includes(rocketId)
  })

  // Launch Favorites
  const favoriteLaunches = ref<string[]>([])

  function toggleFavoriteLaunch(launchId: string) {
    const index = favoriteLaunches.value.indexOf(launchId)
    if (index === -1) {
      favoriteLaunches.value.push(launchId)
    } else {
      favoriteLaunches.value.splice(index, 1)
    }
  }

  const isLaunchFavorite = computed(() => {
    return (launchId: string) => favoriteLaunches.value.includes(launchId)
  })

  return {
    favoriteRockets,
    toggleFavorite,
    isFavorite,
    favoriteLaunches,
    toggleFavoriteLaunch,
    isLaunchFavorite,
  }
})
