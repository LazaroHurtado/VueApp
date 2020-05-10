<template>
  <div v-if="this.favoritesArray" class="favoritecontainer">
    <h1 class="favorites">Favorites</h1>
    <div v-for="favorite in this.favoritesArray" :key="favorite.id" class="eachFavorite">
        <Restaurants :businesses="[favorite]" />
    </div>
  </div>
</template>

<script>
import Restaurants from "../components/Restaurants";

export default {
  name: "Favorites",
  components: {
    Restaurants
  },
  data() {
      return {
          favoritesArray: null,
      }
  },
  methods: {
      getFavorites() {
          this.$store.dispatch('getFavorites')
          .then(response => {
              console.log(response.data)
              this.favoritesArray = response.data.favorites
          })
          .catch(error => {
              console.log(error.response)
          })
      }
  },
  created() {
      this.getFavorites()
  }
};
</script>

<style scoped>
.favoritecontainer {
  border-radius: 10px;
  margin-top: 25px;
  margin-left: auto;
  margin-right: auto;
  border: 5px solid #6dd47e;
  background: #fff7e1;
  width: 50%;
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
}

.favorites {
    color: #293250;
    margin: 0;
    border-bottom: 5px solid #6dd47e;
}

</style>