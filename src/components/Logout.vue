<template>
  <div class='logout'>
    <button v-on:click="logout" id='logout'>Logout</button>
  </div>
</template>

<script>
export default {
	name: 'Logout',
	methods: {
        logout() {
            this.$store.dispatch('logout')
            .then(response => {
                this.$router.push({name: 'Home'})
            }
            )
            .catch(error => {
                console.log(error)
            }
            )
        }
    }
}
</script>

<style scoped>
    .logout {
        display: flex;
        margin-top: 10px;
        margin-left: 10px;
    }

    #logout {
        color: #293250;
        text-align: center;
        font-size: 15px;
        height: 30px;
        width: 80px;
        border: 0;
        outline: 0;
        border-radius: 15px;
        background: #FFD55A;
    }

    button:hover {
        cursor: pointer;
    }
</style>
