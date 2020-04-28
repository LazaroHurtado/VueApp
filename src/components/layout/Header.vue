<template>
    <div class="container">
        <header>
            <router-link to="/" id="Name">Kelp</router-link>
        </header>
        <nav>
            <router-link to="/login">Login</router-link>
            <router-link to="/sign-up">Sign Up</router-link>
        </nav>
    </div>
</template>

<script>
export default {
    name: "Header"
}
</script>

<style scoped>
    .container {
        background: #293250;
        border-bottom: 5px solid #6DD47E;
        overflow: hidden;
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
    }

    nav {
        display: flex;
        align-items: center;
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
        font-size: 30px;
    }

    nav a {
        padding: 10px 10px;
        color: #fff;
        text-align: center;
        text-decoration: none;
    }

    @font-face {
        font-family: 'Montserrat-BlackItalic';
        src: url('../../assets/fonts/Montserrat-BlackItalic.ttf');
    }
</style>