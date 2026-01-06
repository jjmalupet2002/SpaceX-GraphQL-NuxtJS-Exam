import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useComparatorStore = defineStore('comparator', () => {
    const selectedRocketIds = ref<string[]>([])

    const addRocket = (rocketId: string) => {
        if (!selectedRocketIds.value.includes(rocketId)) {
            if (selectedRocketIds.value.length < 4) {
                selectedRocketIds.value.push(rocketId)
            } else {
                // Optional warning or replace logic could go here
            }
        }
    }

    const removeRocket = (rocketId: string) => {
        selectedRocketIds.value = selectedRocketIds.value.filter(id => id !== rocketId)
    }

    const clearSelection = () => {
        selectedRocketIds.value = []
    }

    const isSelected = (rocketId: string) => selectedRocketIds.value.includes(rocketId)

    return {
        selectedRocketIds,
        addRocket,
        removeRocket,
        clearSelection,
        isSelected
    }
}, {
    persist: true,
})
