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
    }
  },
  getters: {
    error: s => s.error,
    info: s => s.info
  }
})
