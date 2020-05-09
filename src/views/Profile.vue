<template>
  <div>
    <ProfileCard v-if="this.data" :data="this.data" />
    <h1 v-else>{{ this.errorData.message }}</h1>
  </div>
</template>

<script>
import ProfileCard from "../components/ProfileCard.vue";

export default {
  name: "Profile",
  data() {
    return {
      data: {},
      errorData: {}
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
          console.log(this.data);
        })
        .catch(error => {
          this.data = null;
          this.errorData = error.response.data;
          console.log(error);
        });
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.getData(to.params.name);
    next();
  }
};
</script>
