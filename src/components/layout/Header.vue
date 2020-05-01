<template>
    <div class="container">
        <header>
            <router-link to="/" id="Name">Kelp</router-link>
        </header>
        <nav>
            <router-link v-if="!this.$store.state.userAccount.username" to="/sign-up" id="signup">Sign Up</router-link>
            <router-link v-if="!this.$store.state.userAccount.username" to="/login" id="login">Login</router-link>
            <router-link v-if="this.$store.state.userAccount.username" to="/login" id="username">Welcome, {{this.$store.state.userAccount.first_name}}</router-link>
        </nav>
    </div>
</template>

<script>
export default {
    name: "Header",
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