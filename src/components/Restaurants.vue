<template>
  <div>
    <div
      v-for="business in businesses.data"
      :key="business.id"
      v-on:click="sendData(business.id)"
      class="businessCard"
    >
      <div class="image">
        <img :src="business.image_url" :alt="business.name" />
      </div>
      <div class="lowerCard">
        <div class="title">
          <h1>{{ business.name }}</h1>
          <div class="rating">
            <h2 id="rate">{{ business.rating }}</h2>
            <font-awesome-icon icon="star" id="star" />
          </div>
        </div>
        <div class="businessInfo">
          <div class="pricestatus">
            <h2 v-if="business.price">{{ business.price }}</h2>
            <h2 v-if="business.price && (business.is_closed || !business.is_closed)">-</h2>
            <h2 v-if="business.is_closed">CLOSED</h2>
            <h2 v-else>OPEN</h2>
          </div>
          <div class="address">
            <h3>{{ business.location.address1 }}</h3>
          </div>
        </div>
        <div class="categoriesDiv">
          <div v-for="category in business.categories" :key="category.alias" id="cat">
            <h3>{{ category.title }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Restaurants",
  props: {
    businesses: Object
  },
  methods: {
    sendData(id) {
      this.$router.push({ path: `/restaurant/${id}` });
    }
  }
};
</script>

<style scoped>
.businessCard {
  margin: 20px auto;
  width: 50%;
}

.lowerCard {
  background: #293250;
  color: white;
  margin-bottom: 20px;
  border-radius: 0px 0px 10px 10px;
  padding-bottom: 10px;
}

.pricestatus {
  display: flex;
  align-items: center;
  justify-content: center;
}

.businessInfo {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.image {
  border-bottom: 5px solid #6dd47e;
  margin: 0 auto;
  max-height: 400px;
  width: 100%;
  background: #6dd47e;
}

.title,
.rating {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.categoriesDiv {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

#cat {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: #6dd47e;
  margin: 5px 5px;
  color: #293250;
}

h1 {
  margin: 5px 5px;
}

h2 {
  margin-left: 10px;
  margin-bottom: 5px;
  margin-top: 5px;
}

h3 {
  margin: 5px 5px;
}

#rate {
  color: #ffd55a;
  margin-left: 10px;
  margin-bottom: 5px;
  margin-top: 5px;
}

#star {
  color: #ffd55a;
  margin-bottom: 5px;
  margin-top: 5px;
}

img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
}
</style>