import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import VueCookies from 'vue-cookies'

Vue.use(Vuex)
Vue.use(VueCookies)

export const store = new Vuex.Store({
    state: {
        userAccount: {
            token: Vue.$cookies.get("token") || null,
            refreshToken: Vue.$cookies.get("refresh_token") || null,
            data: {}
        }
    },
    getters: {
        loggedIn(state) {
            return state.userAccount.token !== null
        },
        token(state) {
            return state.userAccount.token
        },
        refreshToken(state) {
            return state.userAccount.refreshToken
        },
        username(state) {
            return state.userAccount.data.username
        },
        userLocation(state) {
            return state.userAccount.data.address
        },
        userData(state) {
            return state.userAccount.data || null
        }
    },
    mutations: {
        logUser(state, data) {
            if (data.token) {
                let tokens = data.token
                Vue.$cookies.set("token", tokens.token, "5MIN")
                Vue.$cookies.set("refresh_token", tokens.refresh_token, "7d")
                state.userAccount.token = Vue.$cookies.get("token")
                state.userAccount.refreshToken = Vue.$cookies.get("refresh_token")
            }
            state.userAccount.data = data
        },
        destroyToken(state) {
            state.userAccount.token = null
        },
        setToken(state, data) {
            Vue.$cookies.remove('refresh_token')
            Vue.$cookies.set("token", data.token, "5MIN")
            Vue.$cookies.set("refresh_token", data.refresh_token, "7d")
            state.userAccount.token = Vue.$cookies.get("token")
            state.userAccount.refreshToken = Vue.$cookies.get("refresh_token")
        },
        logout(state) {
            Vue.$cookies.remove('refresh_token')
            Vue.$cookies.remove('token')
            state.userAccount.token = null
            state.userAccount.refreshToken = null
        }
    },
    actions: {
        login(context, data) {
            return new Promise((resolve, reject) => {
                axios.post('http://localhost:5000/login', data)
                    .then(response => {
                        context.commit('logUser', response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error.response);
                        reject(error)
                    })
            })
        },
        signUp(context, data) {
            return new Promise((resolve, reject) => {
                axios.post('http://localhost:5000/create_user', data)
                    .then(response => {
                        context.commit('logUser', response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        findUser(context, username) {
            return new Promise((resolve, reject) => {
                axios.get(`http://localhost:5000/find_user/${username}`)
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        allRestaurants(context) {
            let location = "miami"
            if (store.getters.userLocation) {
                location = store.getters.userLocation
                location = location.replace(/\s/g, '');
            }
            return new Promise((resolve, reject) => {
                axios.get(`http://localhost:5000/find_businesses/${location}`)
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        fetchData(context) {
            let token = Vue.$cookies.get('token')

            let username = jwt_decode(token)['username']

            return new Promise((resolve, reject) => {
                axios.get(`http://localhost:5000/find_user/${username}`)
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error.response)
                    })
            })
        },
        resetTokens(context) {
            let refreshTkn = Vue.$cookies.get("refresh_token")
            let username = jwt_decode(refreshTkn)['username']

            return new Promise((resolve, reject) => {
                axios.get(`http://localhost:5000/refresh/${refreshTkn}/${username}`)
                    .then(response => {
                        store.commit('setToken', response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
        findBusiness(context, id) {
            return new Promise((resolve, reject) => {
                axios.get(`http://localhost:5000/find_business/${id}`)
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        searchBusiness(context, name) {
            let location = "miami"
            if (store.getters.userLocation) {
                location = store.getters.userLocation
                location = location.replace(/\s/g, '');
            }
            return new Promise((resolve, reject) => {
                axios.get(`http://localhost:5000/search_business/${name}/${location}`)
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        update(context, data) {
            let config = {
                headers: {
                    token: Vue.$cookies.get("token")
                }
            }
            return new Promise((resolve, reject) => {
                axios.put('http://localhost:5000/auth/update_user', data, config)
                .then(response => {
                    if (data.updates.username) {
                        store.dispatch('updateTokens', data.updates.username)
                    } else {
                        store.dispatch('fetchData')
                    }
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        updateTokens(context, username) {
            let refreshTkn = Vue.$cookies.get("refresh_token")
            axios.get(`http://localhost:5000/refresh/${refreshTkn}/${username}`)
            .then(response => {
                console.log(response)
                Vue.$cookies.remove('token')
                Vue.$cookies.remove('refresh_token')
                setTimeout(() => {
                    Vue.$cookies.set('token', response.data.token, "5M")
                    Vue.$cookies.set('refresh_token', response.data.refresh_token, "7d")
                  }, 500);
                this.state.dispatch('fetchData')
                .then(response => {
                    console.log(response)
                    this.store.dispatch('logUser', response.data)
                })
                .catch(error => {
                    console.log(error.response)
                })
            })
            .catch(error => {
                console.log(error.response)
            })
        },
        delete(context, username) {
            let config = {
                headers: {
                    token: Vue.$cookies.get("token")
                }
            }
            return new Promise((resolve, reject) => {
                axios.delete(`http://localhost:5000/auth/delete_user/${username}`, config)
                .then(response => {
                    Vue.$cookies.remove('token')
                    Vue.$cookies.remove('refresh_token')
                    this.state.userAccount.token = null
                    this.state.userAccount.refreshToken = null
                    this.state.userAccount.data = {}
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        checkFavorites(context, restaurantId) {
            let config = {
                headers: {
                    token: Vue.$cookies.get("token")
                }
            }
            let userFavoriteId = this.state.userAccount.data.favorites_id
            return new Promise((resolve, reject) => {
                axios.get(`http://localhost:5000/auth/check_favorites/${userFavoriteId}/${restaurantId}`, config)
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        addRestaurant(context, businessData) {
            let userFavoriteId = this.state.userAccount.data.favorites_id
            let config = {
                headers: {
                    token: Vue.$cookies.get("token")
                }
            }
            let data = {
                "favorite_id": userFavoriteId,
                "restaurant_id": businessData
            }
            return new Promise((resolve, reject) => {
                axios.put('http://localhost:5000/auth/add_favorite', data, config)
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        removeRestaurant(context, businessId) {
            let userFavoriteId = this.state.userAccount.data.favorites_id
            let config = {
                headers: {
                    token: Vue.$cookies.get("token")
                }
            }
            return new Promise((resolve, reject) => {
                axios.get(`http://localhost:5000/auth/remove_favorite/${userFavoriteId}/${businessId}`, config)
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        getFavorites(context) {
            let userFavoriteId = this.state.userAccount.data.favorites_id
            return new Promise((resolve, reject) => {
                axios.get(`http://localhost:5000/find_favorites/${userFavoriteId}`)
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        destroyToken(context) {
            context.commit('destroyToken')
        },
        setToken(context, data) {
            context.commit('setToken', data)
        },
        logout(context) {
            context.commit('logout')
        },
        logUser(context, data) {
            context.commit('logUser', data)
        }
    }
})