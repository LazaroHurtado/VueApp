<template>
  <div class="container">
    <h1>{{ username }}</h1>
  </div>
</template>

<script>
export default {
	name: 'ProfileCard',
	computed: {
		username() {
			return this.$store.getters.username
		}
	}
}
</script>

<style scoped>
	.container {
		margin-top: 25px;
		margin-left: auto;
		margin-right: auto;
		border: 5px solid #6DD47E;
		background: #293250;
		width: 80%;
		height: 800px;
	}
</style>
