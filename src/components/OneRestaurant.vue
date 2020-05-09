<template>
  <div>
    <div class="businessCard">
      <div class="contactCard">
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
					<div class="contact">
						<h2>{{ business.display_phone }}</h2>
					</div>
          <div class="location">
            <h2>{{ business.location.address1 }}</h2>
            <h2>{{ business.location.city}}, {{ business.location.state}}, {{ business.location.zip_code }}</h2>
          </div>
        </div>
        <div class="categoriesDiv">
          <div v-for="category in business.categories" :key="category.alias" id="cat">
            <h3>{{ category.title }}</h3>
          </div>
        </div>
      </div>
			<div class="images">
				<img v-for="(image, index) in business.photos" :key="index" :src="image" alt="business photo">
			</div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'OneRestaurant',
    props: {
        business: Object
    }
}
</script>

<style scoped>
.businessCard {
  margin: 40px auto;
  width: 70%;
}

.pricestatus {
  display: flex;
}

.contactCard {
	background: #293250;
	color: white;
  padding-bottom: 20px;
	margin-bottom: 20px;
	border-radius: 10px 10px 0px 0px;
  padding-top: 20px;
}

.images {
	border-radius: 0px 0px 10px 10px;
	background: #212944;
	padding-top: 10px;
	padding-bottom: 10px;
	display: flex;
	flex-wrap: wrap;
	align-content: stretch;
	align-items: center;
	justify-content: center;
}

.businessInfo {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	flex-direction: column;
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
	padding-bottom: 20px;
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
	box-shadow: 0px 0px 30px -4px rgba(255, 255, 255, 0.185);
	margin: 5px 5px;
  object-fit: cover;
	width: 40%;
	height: 40%;
}
</style>