import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Town from '../views/Town.vue'
import Pokedex from '../views/Pokedex.vue'
import Generation from '../views/Generation.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    children :[
      {
        path: '/index',
        name: 'Generation',
        component: Generation
      },
      {
        path: 'pokedex',
        name: 'Pokedex',
        component: Pokedex,
      },
      {
        path: 'town',
        name: 'Town',
        component: Town
      },
      {
        path: 'about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () {
          return import(/* webpackChunkName: "about" */ '../views/About.vue')
        }
      }
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
