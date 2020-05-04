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
        }
    },
    mutations: {
        login(state, data) {
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
        fetchUser(state) {
            let token = state.userAccount.token

            const config = {
                headers: {
                    Authorization: token
                }
            }
            
            let username = jwt_decode(token)['username']

            axios.get('http://localhost:5000/find_user/'+username, config)
            .then(response => {
                store.commit("login", response.data)
            })
            .catch(error => {
                console.log(error.response)
            })
        },
        setToken(state, data) {
            Vue.$cookies.remove('refresh_token')
            Vue.$cookies.set("token", data.token, "5MIN")
            Vue.$cookies.set("refresh_token", data.refresh_token, "7d")
            state.userAccount.token = Vue.$cookies.get("token")
            state.userAccount.refreshToken = Vue.$cookies.get("refresh_token")
            store.dispatch('fetchUser')
        },
        resetTokens(state) {
            let refreshTkn = Vue.$cookies.get("refresh_token")
            let username = jwt_decode(refreshTkn)['username']
            axios.get("http://localhost:5000/refresh/"+refreshTkn+"/"+username)
            .then(response => {
                store.dispatch('setToken', response.data)
            })
            .catch(error => {
                console.log(error)
            })
        }
    },
    actions: {
        login(context, userInfo) {
            return new Promise((resolve, reject) => {
                axios.post('http://localhost:5000/login', {
                username: userInfo.username,
                password: userInfo.password,
                })
                .then(response => {
                    context.commit('login', response.data)
                    resolve(response)
                })
                .catch(error => {
                    console.log(error.response);
                    reject(error)
                })
            })
        },
        destroyToken(context) {
            context.commit('destroyToken')
        },
        fetchUser(context) {
            context.commit('fetchUser')
        },
        setToken(context, data) {
            context.commit('setToken', data)
        },
        resetTokens(context) {
            context.commit('resetTokens')
        }
    }
})