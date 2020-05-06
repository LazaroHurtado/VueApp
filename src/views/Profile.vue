<template>
  <div>
    <ProfileCard :data='this.data' />
  </div>
</template>

<script>
import ProfileCard from '../components/ProfileCard.vue'

export default {
    name: 'Profile',
    data() {
        return {
          data:{}
        }
    },
    components: {
        ProfileCard
    },
    created() {
      this.getData(this.$route.params.name)
    },
    methods: {
      getData(username) {
        this.$store.dispatch('findUser', username)
        .then(response => {
          this.data = response.data
          console.log(this.data)
        })
        .catch(error => {
          this.data = {}
          console.log(error)
        })
      }
    },
    beforeRouteUpdate (to, from, next) {
      this.getData(to.params.name)
      next()
    }
}
</script>
