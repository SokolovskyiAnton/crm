import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

  const routes = [
  
  {
    path: '/login',
    meta: {layout: 'empty'},
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/registration',
    meta: {layout: 'empty', auth: true},
    name: 'registration',
    component: () => import('../views/Registration.vue')
  },
  {
    path: '/',
    meta: {layout: 'main', auth: true}, // Добавление нужного префикса макета
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/categories',
    meta: {layout: 'main', auth: true},
    name: 'categories',
    component: () => import('../views/Categories.vue')
  },
  {
    path: '/record',
    meta: {layout: 'main', auth: true},
    name: 'record',
    component: () => import('../views/Record.vue')
  },
  {
    path: '/profile',
    meta: {layout: 'main', auth: true},
    name: 'profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/planning',
    meta: {layout: 'main', auth: true},
    name: 'planning',
    component: () => import('../views/Planning.vue')
  },
  {
    path: '/history',
    meta: {layout: 'main', auth: true},
    name: 'history',
    component: () => import('../views/History.vue')
  },
  {
    path: '/detail',
    meta: {layout: 'main', auth: true},
    name: 'detail',
    component: () => import('../views/Detail.vue')
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => { //защита роутов
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(m => m.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
