import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Loader from './components/Loader.vue'
import messagePlugin from './utils/message.plugin'
import tooltipDirective from './directives/tooltip.directive'
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currencies.filter'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min'
import './assets/index.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false
Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective) // регистрация тултипа глобально
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate) // компонент пагинации страниц
 
firebase.initializeApp({
  apiKey: "AIzaSyDuF4c29-voe_kx0yzkc61qA7LzXZw2bfg",
  authDomain: "vue-crm-system-d8620.firebaseapp.com",
  databaseURL: "https://vue-crm-system-d8620.firebaseio.com",
  projectId: "vue-crm-system-d8620",
  storageBucket: "vue-crm-system-d8620.appspot.com",
  messagingSenderId: "336763096732",
  appId: "1:336763096732:web:24e3b7faecbe244923a759"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
