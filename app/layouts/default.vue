
<template>
	<v-app class="bg-black">
		<Navbar />
		<v-main>
			<slot />
		</v-main>
		<Footer />
	</v-app>
</template>

<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
</script>

<style scoped>
.bg-black {
	background: #000;
	color: #fff;
}
</style>
