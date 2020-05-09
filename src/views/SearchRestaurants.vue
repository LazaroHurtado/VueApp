<template>
  <div>
    <Restaurants :businesses="this.data" />
  </div>
</template>

<script>
import Restaurants from "../components/Restaurants";

export default {
  name: "SearchRestaurant",
  data() {
    return {
      data: {},
      errorData: {}
    };
  },
  components: {
    Restaurants
  },
  methods: {
    getData(name) {
      this.$store
        .dispatch("searchBusiness", name)
        .then(response => {
          this.data = response;
        })
        .catch(error => {
          this.data = null;
          this.errorData = error.response.data;
          console.log(error);
        });
    }
  },
  created() {
    this.getData(this.$route.params.name);
  },
  beforeRouteUpdate(to, from, next) {
    this.getData(to.params.name);
    next();
  }
};
</script>