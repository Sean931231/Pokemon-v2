import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Town from '../views/Town.vue'
import Region from '../views/Region.vue'
import Pokedex from '../views/Pokedex.vue'
import Pokemon from '../views/Pokemon.vue'
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
        path: '/pokedex',
        name: 'Pokedex',
        component: Pokedex,
      },
      {
        path: '/region',
        name: 'Region',
        component: Region
      },
      {
        path: '/town',
        name: 'Town',
        component: Town
      },
      {
        path: '/pokemon',
        name: 'Pokemon',
        component: Pokemon
      },
      {
        path: '/about',
        name: 'About',
        component: function () {
          return import(/* webpackChunkName: "about" */ '../views/About.vue')
        }
      }
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        selector: to.hash,
        behavior: 'smooth',
      };
    }
    return { x: 0, y: 0 };
  },
  routes
})

export default router
