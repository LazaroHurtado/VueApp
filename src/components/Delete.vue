<template>
  <div class="delete">
    <button v-on:click="deleteUser" id="deletebtn">Delete Account</button>
  </div>
</template>

<script>
export default {
  name: "Delete",
  props: {
      username: String
  },
  methods: {
    deleteUser() {
      this.$store
        .dispatch("delete", this.username)
        .then(response => {
          console.log(response.data)
          this.$router.push({ path: `/` });
        })
        .catch(error => {
          console.log(error.response);
          this.$router.push({ path: `/` });
        });
    }
  }
};
</script>

<style scoped>
.delete {
  display: flex;
}

#deletebtn {
  color: #293250;
  text-align: center;
  font-size: 15px;
  height: 30px;
  padding: 0 10px;
  margin-left: 10px;
  border: 0;
  outline: 0;
  border-radius: 15px;
  background: #e04c4c;
}

button:hover {
  cursor: pointer;
}
</style>
