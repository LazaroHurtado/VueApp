<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/layout/Header.vue";

export default {
  name: "app",
  components: {
    Header
  },
  created() {
    if (this.$store.getters.token) {
      this.$store
        .dispatch("fetchData")
        .then(response => {
          this.$store.dispatch("logUser", response.data);
        })
        .catch(error => {
          console.log(error);
        });
    } else if (this.$store.getters.refreshToken) {
      this.$store
        .dispatch("resetTokens")
        .then(response => {
          this.$store
            .dispatch("fetchData")
            .then(response => {
              this.$store.dispatch("logUser", response.data);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
