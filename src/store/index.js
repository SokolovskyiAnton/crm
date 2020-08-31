import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    info: {}
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    },
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    }
  },
  actions: {
    async login({dispatch, commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch(e) {
        commit('setError', e)
        throw e
      }
    },
    async register({dispatch, commit}, {email, password, name}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          name,
          bill: 10000
        })
      } catch(e) {
        commit('setError', e)
        throw e
      }
    },
    getUid() {
      const user = firebase.auth().currentUser

      return user ? user.uid : null
    },
    async logout({commit}) {
      await firebase.auth().signOut()
      commit('clearInfo')
    },
    async fetchInfo({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid')
        const info = (await (firebase.database().ref(`/users/${uid}/info`).once('value'))).val()
        commit('setInfo', info)
      } catch(e) {

      }
    
    },
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,UAH`)
      return await res.json()
    },
    async createCategory({dispatch,commit}, {title, limit}) {
      try {
        const uid = await dispatch('getUid')
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({title, limit})
        return {title, limit, id: category.key}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategories({dispatch,commit}) {
      const uid = await dispatch('getUid')
      const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}

      const cats = []

      Object.keys(categories).forEach(key => {
        cats.push({
          title: categories[key].title,
          limit: categories[key].limit,
          id: key
        })
      })
      return cats
    },
    async updateCategory({dispatch, commit}, {id, title, limit}) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit})
      } catch (e) {
        commit('setError', e)
        throw e
      }
    } 
  },
  getters: {
    error: s => s.error,
    info: s => s.info
  }
})
