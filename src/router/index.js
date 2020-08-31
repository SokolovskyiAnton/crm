import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    meta: {layout: 'main'}, // Добавление нужного префикса макета
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    meta: {layout: 'empty'},
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/registration',
    meta: {layout: 'empty'},
    name: 'registration',
    component: () => import('../views/Registration.vue')
  },
  {
    path: '/categories',
    meta: {layout: 'main'},
    name: 'categories',
    component: () => import('../views/Categories.vue')
  },
  {
    path: '/record',
    meta: {layout: 'main'},
    name: 'record',
    component: () => import('../views/Record.vue')
  },
  {
    path: '/profile',
    meta: {layout: 'main'},
    name: 'profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/planning',
    meta: {layout: 'main'},
    name: 'planning',
    component: () => import('../views/Planning.vue')
  },
  {
    path: '/history',
    meta: {layout: 'main'},
    name: 'history',
    component: () => import('../views/History.vue')
  },
  {
    path: '/detail',
    meta: {layout: 'main'},
    name: 'detail',
    component: () => import('../views/Detail.vue')
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
