<template>
  <div class="hero">
    <div class="overlay" />
    <div class="hero-content">
      <h1>SpaceX Launch Explorer</h1>
      <h2>Explore launches, rockets, and your favorites</h2>
      <div class="cta-buttons">
        <v-btn to="/launches" color="blue-darken-4" class="cta">View Launches</v-btn>
        <v-btn to="/rockets" color="blue-darken-4" class="cta">View Rockets</v-btn>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// No script needed for static hero
</script>
<style scoped>
.hero {
  position: relative;
  width: 100vw;
  height: 60vh;
  background: url('/Assets/Images/rocket_image1.jpg') center center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(0,0,0,0.8) 60%, rgba(0,0,0,1) 100%);
  z-index: 1;
}
.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #fff;
}
.cta-buttons {
  margin-top: 2rem;
}
.cta {
  margin: 0 1rem;
}
</style>
