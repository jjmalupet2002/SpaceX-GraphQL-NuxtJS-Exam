import { ref, watch, type Ref } from 'vue'

const getLaunchImagesForRocketQuery = gql`
  query getLaunchImagesForRocket($rocketName: String) {
    launches(find: { rocket_name: $rocketName }, limit: 1) {
      links {
        flickr_images
      }
    }
  }
`

export function useRocketImages(rocketName: Ref<string | null>) {
  const images = ref<string[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const { result, load, loading: queryLoading, onError } = useLazyQuery(
    getLaunchImagesForRocketQuery
  )

  onError(err => {
    error.value = err
  })

  watch(rocketName, async (newName) => {
    images.value = [] // Reset images
    error.value = null
    if (newName) {
      await load(undefined, { rocketName: newName })
      const launchImages = result.value?.launches?.[0]?.links?.flickr_images
      if (launchImages && launchImages.length > 0) {
        images.value = launchImages
      }
    }
  })

  watch(queryLoading, (newLoading) => {
    loading.value = newLoading
  })

  return {
    images,
    loading,
    error,
  }
}
