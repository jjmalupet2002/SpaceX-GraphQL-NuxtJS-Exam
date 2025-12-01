<template>
  <section class="featured-section">
    <v-container>
      <h2>Featured Rockets</h2>
      <v-row>
        <v-col v-for="n in 2" :key="n" cols="12" md="6">
          <v-card class="skeleton-card" color="black" dark>
            <v-skeleton-loader type="card" color="grey-darken-4" />
            <div class="coming-soon">Coming Soon</div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script setup lang="ts">
// Placeholder only
</script>
<style scoped>
.featured-section {
  margin: 3rem 0;
  text-align: center;
  padding: 2rem 0;
}
.skeleton-card {
  min-height: 200px;
  background: #111;
  color: #fff;
  position: relative;
}
.coming-soon {
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
  color: #00bfff;
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
