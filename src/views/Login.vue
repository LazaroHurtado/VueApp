<template>
  <div class="container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <p>Username</p>
      <input type="text" name placeholder="John Doe" v-model="username" />
      <p>Password</p>
      <input type="password" name placeholder="******" v-model="password" />
      <input type="submit" name value="Login" />
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          username: this.username,
          password: this.password
        })
        .then(response => {
          console.log("LOGIN VIEW");
          console.log(response);
          setTimeout(() => {
            this.$router.push({ name: "Home" });
          }, 1000);
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }
};
</script>

<style scoped>
div {
  background: #ffd55a;
  width: 500px;
  height: 350px;
  border: 5px solid #6dd47e;
  border-radius: 10px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
}

form input[type="text"],
input[type="password"] {
  width: 50%;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

form p {
  color: #293250;
  font-family: "Montserrat-SemiBold", sans-serif;
}

form input[type="text"],
input[type="password"] {
  border: none;
  border-bottom: 1px solid #293250;
  background: transparent;
  outline: none;
}

form input[type="submit"] {
  margin-top: 20px;
  border: none;
  outline: none;
  height: 30px;
  background: #293250;
  color: #fff;
  font-size: 15px;
  border-radius: 5px;
}

h1 {
  color: #293250;
  font-family: "Montserrat-SemiBold", sans-serif;
  font-weight: 1600px;
}

@font-face {
  font-family: "Montserrat-SemiBold";
  src: url("../assets/fonts/Montserrat-SemiBold.ttf");
}
</style>