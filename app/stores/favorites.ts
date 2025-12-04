import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface FavoriteItem<T> {
  id: string
  addedAt: number
  type: 'rocket' | 'launch'
  data: T
}


export const useFavoritesStore = defineStore('favorites', () => {
  // Rocket Favorites
  const favoriteRockets = ref<FavoriteItem<any>[]>([])

  function toggleFavorite(rocket: any) {
    const index = favoriteRockets.value.findIndex(item => item.id === rocket.id)
    if (index === -1) {
      favoriteRockets.value.push({ id: rocket.id, addedAt: Date.now(), type: 'rocket', data: rocket })
    } else {
      favoriteRockets.value.splice(index, 1)
    }
  }

  const isFavorite = computed(() => {
    return (rocketId: string) => favoriteRockets.value.some(item => item.id === rocketId)
  })

  // Launch Favorites
  const favoriteLaunches = ref<FavoriteItem<any>[]>([])

  function toggleFavoriteLaunch(launch: any) {
    const index = favoriteLaunches.value.findIndex(item => item.id === launch.id)
    if (index === -1) {
      favoriteLaunches.value.push({ id: launch.id, addedAt: Date.now(), type: 'launch', data: launch })
    } else {
      favoriteLaunches.value.splice(index, 1)
    }
  }

  const isLaunchFavorite = computed(() => {
    return (launchId: string) => favoriteLaunches.value.some(item => item.id === launchId)
  })
  
  // Clear All
  function clearFavorites() {
    favoriteRockets.value = []
    favoriteLaunches.value = []
  }

  return {
    favoriteRockets,
    toggleFavorite,
    isFavorite,
    favoriteLaunches,
    toggleFavoriteLaunch,
    isLaunchFavorite,
    clearFavorites,
  }
}, {
  persist: true,
})
