<template>
  <div>
    <ProfileCard v-if="this.data" :data="this.data" :favoritesArray="this.favoritesArray" />
    <h1 v-if="errorData">{{ this.errorData.message }}</h1>
  </div>
</template>

<script>
import ProfileCard from "../components/ProfileCard.vue";

export default {
  name: "Profile",
  data() {
    return {
      data: null,
      favoritesArray: null,
      errorData: null
    };
  },
  components: {
    ProfileCard
  },
  created() {
    this.getData(this.$route.params.name);
  },
  methods: {
    getData(username) {
      this.$store
        .dispatch("findUser", username)
        .then(response => {
          this.data = response.data;
          this.getFavorites()
        })
        .catch(error => {
          this.data = null;
          this.errorData = error.response.data;
          console.log(error);
        });
    },
    getFavorites() {
      this.$store
        .dispatch("getFavorites", this.data.username)
        .then(response => {
          this.favoritesArray = response.data.favorites;
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.getData(to.params.name);
    next();
  }
};
</script>
