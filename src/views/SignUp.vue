<template>
  <div class="container">
    <h1>Create account</h1>
    <p v-if='error' id="errormsg">{{ errorMsg }}</p>
    <form @submit.prevent="signup">
        <div class="nametext">
          <p id="firstname">First Name</p>
          <p id="lastname">Last Name</p>
        </div>
        <div class="fullname">
          <input type="text" name="" placeholder="John" v-model="first_name">
          <input type="text" name="" placeholder="Doe" v-model="last_name">
        </div>
        <div class="usertext">
          <p id="username">Username</p>
          <p id="password">Password</p>
        </div>
        <div class="userinfo">
          <input type="text" name="" placeholder="John Doe" v-model="username">
          <input type="password" name="" placeholder="******" v-model="password">
        </div>
        <div class="locationtext">
          <p id="state">State</p>
          <p id="city">City</p>
        </div>
        <div class="location">
          <input type="text" name="" placeholder="Fl" v-model="state">
          <input type="text" name="" placeholder="Miami" v-model="city">
        </div>
        <div class="addresstext">
          <p id="address">Address</p>
        </div>
        <div class="address">
          <input type="text" name="" placeholder="123 Elm Street" v-model="address">
        </div>
        <input type="submit" name="" value="Sign Up" >
    </form>
  </div>
</template>

<script>
export default {
    name: 'SignUp',
    data() {
        return {
            error: false,
            errorMsg: "",
            first_name: "",
            last_name: "",
            username: "",
            password: "",
            city: "",
            state: "",
            address: "",
        }
    },
    methods: {
        checkForm() {
            let data = [this.first_name, this.last_name, this.username, this.password, this.city, this.state, this.address]
            const empty = (input) => input === ""
            this.error = data.some(empty)
            this.errorMsg = "*Please fill out all boxes"
        },
        signup() {
            this.checkForm()
            if (!this.error) {
                this.$store.dispatch('signUp', {
                    first_name: this.first_name,
                    last_name: this.last_name,
                    username: this.username,
                    password: this.password,
                    city: this.city,
                    state: this.state,
                    address: this.address,
                })
                .then( response => {
                    setTimeout(() => {
                        this.$router.push({name: "Home"})
                    }, 1000)
                })
                .catch( error => {
                    this.error = true
                    this.errorMsg = "*"+error.response.data.message
                })
            }
        }
    }
}
</script>

<style scoped>
    div .container {
        background: #FFD55A;
        width: 600px;
        height: 450px;
        border: 5px solid #6DD47E;
        border-radius: 10px;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        margin-top: 50px;
    }

    div .fullname, .userinfo, .location {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
    }

    div .nametext, .usertext, .locationtext {
      display: flex;
      flex-direction: row;
    }

    #firstname, #username, #state {
      padding-left: 40px;
    }

    #lastname {
      padding-left: 190px;
    }

    #password {
      padding-left: 195px;
    }

    #city {
      padding-left: 238px;
    }

    form p {
        color: #293250;
        font-family: 'Montserrat-SemiBold', sans-serif;
    }

    form input[type="text"], input[type="password"] {
        width: 40%;
        border: none;
        border-bottom: 1px solid #293250;
        background: transparent;
        outline: none;
    }

    form input[type="submit"]{
        margin-top: 20px;
        border: none;
        outline: none;
        height: 30px;
        background: #293250;
        color: #fff;
        font-size: 15px;
        border-radius: 5px;
        width: 100px;
    }

    h1 {
        color: #293250;
        font-family: 'Montserrat-SemiBold', sans-serif;
        font-weight: 1600px;
    }

    #errormsg {
      margin: 0;
      padding: 0;
      color: crimson;
    }

    @font-face {
        font-family: 'Montserrat-SemiBold';
        src: url('../assets/fonts/Montserrat-SemiBold.ttf');
    }
</style>