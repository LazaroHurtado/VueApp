<template>
  <div class="container">
    <h1>Login</h1>
    <form>
        <p>Username</p>
        <input type="text" name="" placeholder="John Doe">
        <p>Password</p>
        <input type="password" name="" placeholder="******">
        <input type="submit" name="" value="Login">
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style scoped>
    div {
        background: #FFD55A;
        width: 500px;
        height: 350px;
        border: 5px solid #6DD47E;
        border-radius: 10px;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        margin-top: 50px;
    }

    form input[type="text"], input[type="password"] {
        width: 50%;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    form p {
        color: #293250;
        font-family: 'Montserrat-SemiBold', sans-serif;
    }

    form input[type="text"], input[type="password"] {
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
    }

    h1 {
        color: #293250;
        font-family: 'Montserrat-SemiBold', sans-serif;
        font-weight: 1600px;
    }

    @font-face {
        font-family: 'Montserrat-SemiBold';
        src: url('../assets/fonts/Montserrat-SemiBold.ttf');
    }
</style>