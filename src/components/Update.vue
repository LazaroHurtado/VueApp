<template>
  <div class="update">
    <button v-on:click="update" id="updatebtn">Update</button>
  </div>
</template>

<script>
export default {
  name: "Logout",
  props: {
      data: Object,
      username: String
  },
  methods: {
    update() {
      this.$store
        .dispatch("update", {username:this.username, updates:this.data})
        .then(response => {
          this.$router.push({ path: `/profile/${this.username}` });
        })
        .catch(error => {
          console.log(error.response);
          this.$router.push({ path: `/profile/${this.username}` });
        });
    }
  }
};
</script>

<style scoped>
.update {
  display: flex;
}

#updatebtn {
  color: #293250;
  text-align: center;
  font-size: 15px;
  height: 30px;
  padding: 0 10px;
  margin-left: 10px;
  border: 0;
  outline: 0;
  border-radius: 15px;
  background: #6dd47e;
}

button:hover {
  cursor: pointer;
}
</style>
