import { ref, computed } from 'vue'

const allRocketsQuery = gql`
  query getRockets {
    rockets {
      id
      name
      first_flight
      description
      height {
        meters
      }
      diameter {
        meters
      }
      mass {
        kg
      }
      stages
      wikipedia
    }
  }
`

export function useRockets() {
  const { data, pending, error, refresh } = useAsyncQuery(allRocketsQuery)

  const rockets = computed(() => (data.value as any)?.rockets ?? [])
  const sortOrder = ref<'desc' | 'asc'>('desc')
  const searchTerm = ref('')

  const sortedRockets = computed(() => {
    const list = [...rockets.value]
    list.sort((a: any, b: any) => {
      const dateA = new Date(a.first_flight).getTime()
      const dateB = new Date(b.first_flight).getTime()
      return sortOrder.value === 'asc' ? dateA - dateB : dateB - dateA
    })
    return list
  })

  const filteredRockets = computed(() => {
    if (!searchTerm.value) {
      return sortedRockets.value
    }
    return sortedRockets.value.filter(rocket =>
      rocket.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  })

  const loading = pending

  return {
    rockets: filteredRockets, // Return filtered and sorted rockets
    loading,
    error,
    refresh,
    sortOrder,
    searchTerm,
  }
}
