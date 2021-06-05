import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Categorias from '../views/Categorias.vue'
import Personal from '../views/Personal.vue'
import Tickets from '../views/Tickets.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Categorias',
    name: 'Categorias',
    component: Categorias
  },
  {
    path: '/Personal',
    name: 'Personal',
    component: Personal
  },
  {
    path: '/Tickets',
    name: 'Tickets',
    component: Tickets
  },
]

const router = new VueRouter({
  routes
})

export default router
