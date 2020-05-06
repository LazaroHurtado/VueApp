<template v-if="this.$props.data">
  <div class="container">
	<Logout v-if="ownAccount"/>
	<div class="profile">cool</div>
	<div class="userInfo">
		<h1>@{{ data.username }}</h1>
		<h2>{{ data.first_name}} {{ data.last_name }}</h2>
		<h3>{{ data.address }}</h3>
		<h3>{{ data.state }}, {{ data.city }}</h3>
	</div>
  </div>
</template>

<script>
import Logout from '../components/Logout.vue'

export default {
	name: 'ProfileCard',
	components: {
		Logout
	},
	props: {
		data: Object
	},
	computed: {
		ownAccount() {
			return this.data.username == this.$store.getters.username
		}
	}
}
</script>

<style scoped>
	* {
		color: #293250;
	}

	h1, h2, h3 {
		margin: 0;
	}

	h1, h2 {
		margin-top: 5px;
		margin-bottom: 5px;
	}

	.container {
		border-radius: 10px;
		margin-top: 25px;
		margin-left: auto;
		margin-right: auto;
		border: 5px solid #6DD47E;
		background: #293250;
		width: 500px;
		height: 800px;
		display: flex;
		flex-direction: column;
	}

	.profile {
		width: 200px;
		height: 200px;
		margin-left: auto;
		margin-right: auto;
		border-radius: 100px;
		color: black;
		background: #fff;
	}

	.userInfo {
		margin-top: 15px;
		width: 300px;
		margin-left: auto;
		margin-right: auto;
		color: black;
		background: #fff;
		border-radius: 10px;
	}
</style>
