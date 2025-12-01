<template>
  <v-footer class="footer" padless>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" class="text-center">
          <span class="footer-title">SpaceX Launch Explorer © 2025</span>
          <div class="footer-links">
            <a href="https://github.com/stephenjason89/NuxtVGP" target="_blank" class="neon-link">GitHub Repo</a>
            <span> | </span>
            <a href="https://apollosystems.io" target="_blank" class="neon-link">Apollo Systems</a>
            <span> | </span>
            <a href="https://github.com/r-spacex/SpaceX-API" target="_blank" class="neon-link">SpaceX API Docs</a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
<script setup lang="ts">
// No script needed for static footer
</script>
<style scoped>
.footer {
  background: #000;
  color: #fff;
  border-top: 1px solid #222;
  padding: 2rem 0 1rem 0;
}
.footer-title {
  font-size: 1.1rem;
  font-weight: bold;
}
.footer-links {
  margin-top: 0.5rem;
}
.neon-link {
  color: #00bfff;
  text-shadow: 0 0 8px #00bfff, 0 0 2px #fff;
  font-weight: bold;
  text-decoration: none;
}
.neon-link:hover {
  text-decoration: underline;
  color: #fff;
}
</style>
