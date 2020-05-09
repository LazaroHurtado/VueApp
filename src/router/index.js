import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Restaurant from '../views/Restaurant'
import SearchRestaurants from '../views/SearchRestaurants'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile/:name',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/restaurant/:id',
    name: 'Restaurant',
    component: Restaurant
  },
  {
    path: '/restaurants/:name',
    name: 'SearchRestaurants',
    component: SearchRestaurants
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
