import { ref, computed, watch } from 'vue'

// Single query to fetch all launches — we do client-side filtering/sorting for correct UX
const allLaunchesQuery = gql`
  query getAllLaunches($limit: Int) {
    launches(limit: $limit) {
      id
      mission_name
      launch_date_local
      launch_date_utc
      details
      links {
        mission_patch_small
        flickr_images
      }
      launch_site {
        site_name
      }
      rocket {
        rocket_name
      }
    }
  }
`

export function useLaunches() {
  const itemsPerPage = ref(12)
  const currentPage = ref(1)
  const totalLaunches = ref(0)

  const selectedYear = ref<number | null>(null)
  const sortOrder = ref<'desc' | 'asc'>('desc')

  // Fetch all launches once (client-side filter/sort/paginate)
  const { data, pending, error, refresh } = useAsyncQuery(allLaunchesQuery, { limit: 1000 })
  const allLaunches = computed(() => (data.value as any)?.launches ?? [])

  const years = computed(() => {
    const s = new Set<number>()
    allLaunches.value.forEach((l: any) => {
      const d = l.launch_date_local ? new Date(l.launch_date_local) : null
      if (d) s.add(d.getFullYear())
    })
    return Array.from(s as Set<number>).sort((a: number, b: number) => b - a)
  })

  // filtered list (before pagination)
  const filteredList = computed(() => {
    let list = allLaunches.value.slice()
    if (selectedYear.value) {
      list = list.filter((l: any) => {
        const d = l.launch_date_local ? new Date(l.launch_date_local) : null
        return d ? d.getFullYear() === selectedYear.value : false
      })
    }

    list.sort((a: any, b: any) => {
      const ta = a.launch_date_utc ? new Date(a.launch_date_utc).getTime() : 0
      const tb = b.launch_date_utc ? new Date(b.launch_date_utc).getTime() : 0
      return sortOrder.value === 'asc' ? ta - tb : tb - ta
    })

    return list
  })

  // pagination (client-side)
  const launches = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    return filteredList.value.slice(start, start + itemsPerPage.value)
  })

  // Keep totalLaunches in sync with the filtered list length (pre-pagination)
  watch(filteredList, (val) => {
    totalLaunches.value = val.length
  })

  // Ensure the query refreshes when key controls change (some environments may not auto-refetch)


  const loading = pending

  return {
    launches,
    loading,
    error,
    selectedYear,
    sortOrder,
    years,
    currentPage,
    itemsPerPage,
    totalLaunches,
    refresh,
  }
}
