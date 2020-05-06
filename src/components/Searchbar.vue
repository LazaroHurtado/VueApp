<template>
  <div class="container">
    <button @click='searchUsers' :id="[this.userFocus ? 'activeFriends' : 'friends']">Users</button>
    <button @click='searchShops' :id="[this.shopFocus ? 'activeRes' : 'res']">Shops</button>
    <form @submit.prevent="sendSearch">
        <input type="text" class="searchbar" v-model="search">
    </form>
  </div>
</template>

<script>
export default {
    name: 'Searchbar',
    data() {
        return {
            shopFocus: true,
            userFocus: false,
            search: ''
        }
    },
    methods: {
        searchUsers() {
            this.shopFocus = false
            this.userFocus = true
        },
        searchShops() {
            this.shopFocus = true
            this.userFocus = false
        },
        sendSearch() {
            if (this.userFocus) {
                this.$router.push({path: `/profile/${this.search}`})
            } else {
                this.$router.push({path: `/profile/${this.search}`})
            }
        }
    }
}
</script>

<style scoped>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    #friends, #res {
        height: 25px;
        width: 60px;
        background: #FFD55A;
        border: 0;
    }
    
    #activeFriends, #activeRes {
        height: 25px;
        width: 60px;
        background: rgb(128, 119, 255);
        border: 0;
    }

    #friends, #activeFriends {
        border-right: 1px solid #333;
        border-radius: 10px 0px 0px 10px;
    }
    
    #res, #activeRes {
        border-left: 1px solid #333;
        border-radius: 0px 10px 10px 0px;
    }

    input {
        border: 0;
        border-radius: 10px;
        height: 22px;
        width: 300px;
        margin-left: 10px;
        text-align: center;
        outline: 0;
    }

    button:focus {
        outline:0;
    }

    button:hover {
        cursor: pointer;
    }
</style>