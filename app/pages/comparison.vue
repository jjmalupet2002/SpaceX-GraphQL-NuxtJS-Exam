<template>
  <div>
    <RocketComparator />
  </div>
</template>

<script setup lang="ts">
import RocketComparator from '~/components/RocketComparator.vue'

useHead({
  title: 'Rocket Comparator | SpaceX Explorer',
  meta: [
    { name: 'description', content: 'Compare SpaceX rockets side-by-side.' }
  ]
})
</script>
