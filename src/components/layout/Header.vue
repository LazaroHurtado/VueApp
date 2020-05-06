<template>
    <div class="container">
        <header>
            <router-link to="/" id="Name">Kelp</router-link>
        </header>
        <div>
            <Searchbar/>
        </div>
        <nav>
            <router-link v-if="!loggedIn" to="/sign-up" id="signup">Sign Up</router-link>
            <router-link v-if="!loggedIn" to="/login" id="login">Login</router-link>
            <router-link v-if="loggedIn" :to="{path: `/profile/${username}`}" id="username">Welcome, {{username}}</router-link>
        </nav>
    </div>
</template>

<script>
import Searchbar from '../Searchbar.vue'

export default {
    name: "Header",
    components: {
        Searchbar
    },
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn
        },
        username() {
            return this.$store.getters.username
        }
    }
}
</script>

<style scoped>
    .container {
        background: #293250;
        border-bottom: 5px solid #6DD47E;
        overflow: hidden;
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: space-between;
    }

    nav {
        display: flex;
        align-items: center;
        padding-right: 10px;
    }

    header {
        display: flex;
        align-items: center;
        padding-right: 10px;
    }

    header a{
        font-family: 'Montserrat-BlackItalic', sans-serif;
        color: #fff;
        margin: 0px;
        float: left;
        text-align: center;
        padding-left: 10px;
        text-decoration: none;
        font-size: 35px;
    }

    nav a {
        padding: 8px 10px;
        color: #fff;
        text-align: center;
        text-decoration: none;
    }

    #login {
        border: 2px solid #FFD55A;
    }

    @font-face {
        font-family: 'Montserrat-BlackItalic';
        src: url('../../assets/fonts/Montserrat-BlackItalic.ttf');
    }
</style>