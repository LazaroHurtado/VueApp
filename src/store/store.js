import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        userAccount: {
            first_name: '',
            last_name: '',
            username: '',
        }
    },
    getters: {
        loggedIn(state) {
            return !state.username
        }
    },
    mutations: {
        logUser(state, data) {
            state.userAccount.first_name = data.first_name
            state.userAccount.last_name = data.last_name
            state.userAccount.username = data.username
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
                    console.log(response);
                    context.commit('logUser', response.data)
                    resolve(response)
                })
                .catch(error => {
                    console.log(error.response);
                    reject(error)
                })
            })
        }
    }
})