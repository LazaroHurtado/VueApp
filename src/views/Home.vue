<template>
  <div>
    <Restaurants :businesses="this.data" />
  </div>
</template>

<script>
import Restaurants from "../components/Restaurants";

export default {
  name: "Home",
  components: {
    Restaurants
  },
  data() {
    return {
      data: {}
    };
  },
  methods: {
    setData(data) {
      this.data = data.data;
    }
  },
  created() {
    this.$store
      .dispatch("allRestaurants")
      .then(response => {
        this.setData(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
