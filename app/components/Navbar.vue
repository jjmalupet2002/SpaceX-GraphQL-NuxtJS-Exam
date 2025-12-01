<template>
  <v-app-bar color="black" dark flat>
    <v-toolbar-title class="font-weight-bold">SpaceX Launch Explorer</v-toolbar-title>
    <v-spacer />
    <v-btn to="/" variant="text" class="text-white">Home</v-btn>
    <v-btn to="/launches" variant="text" class="text-white">View Launches</v-btn>
    <v-btn to="/rockets" variant="text" class="text-white">View Rockets</v-btn>
    <v-btn to="/favorites" variant="text" class="text-white">Favorites</v-btn>
  </v-app-bar>
</template>
<script setup lang="ts">
// No script needed for static navbar
</script>
<style scoped>
.v-app-bar {
  background: #000 !important;
  border-bottom: 1px solid #222;
}
.text-white {
  color: #fff !important;
}
</style>
