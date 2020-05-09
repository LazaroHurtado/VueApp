<template>
  <div>
    <OneRestaurant :business="this.data" />
  </div>
</template>

<script>
import OneRestaurant from '../components/OneRestaurant'

export default {
  name: 'Restaurant',
  data() {
      return {
          data: {}
      }
  },
  components: {
    OneRestaurant
  },
  methods: {
      getData(id) {
          this.$store.dispatch('findBusiness', id)
          .then(response => {
              this.data = response.data
          })
          .catch(error => {
              console.log(error)
          })
      }
  },
  created() {
      this.getData(this.$route.params.id)
  }
}
</script>