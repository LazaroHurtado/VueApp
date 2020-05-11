<template>
  <div v-if="this.favoritesArray" class="favoritecontainer">
    <h1 class="favorites">Favorites ({{this.favoritesArray.length}})</h1>
    <div v-if="this.noFavorites">
      <div v-for="favorite in this.favoritesArray" :key="favorite.id" class="eachFavorite">
        <Restaurants :businesses="[favorite]" />
      </div>
    </div>
    <h2 v-else>Favorite Restaurants to View Them Here</h2>
  </div>
</template>

<script>
import Restaurants from "../components/Restaurants";

export default {
  name: "Favorites",
  components: {
    Restaurants
  },
  props: {
    favoritesArray: Array
  },
  computed: {
    noFavorites() {
      if (this.favoritesArray.length < 1) {
        return false
      } else {
        return true
      }
    }
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