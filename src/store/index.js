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
        const uid = await dispatch('getUid') // находим подлюченого пользователя
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

      Object.keys(categories).forEach(key => { //перебираем ответ от базы данных создавая массив с индексами от 0
        cats.push({
          title: categories[key].title,
          limit: categories[key].limit,
          id: key
        })
      })
      return cats
    },
    async fetchCategoryById({dispatch,commit}, id) {
      const uid = await dispatch('getUid')
      const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {}

      
      return {
        ...category,
        id
      }
    },
    async updateCategory({dispatch, commit}, {id, title, limit}) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit}) // обновление данных
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createRecord({dispatch, commit}, record) {
      try {
        const uid = await dispatch('getUid')
        return await firebase.database().ref(`/users/${uid}/records`).push(record)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateInfo({dispatch, commit, getters}, bill) {
      try {
        const uid = await dispatch('getUid')
        const updateData = {...getters.info, ...bill} // с помощью spread оператора делаю замену поля bill
        await firebase.database().ref(`/users/${uid}/info`).update(updateData)
        commit('setInfo', updateData)
      } catch (error) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecords({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid')
        const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}

        const rec = []

        Object.keys(records).forEach(key => { //перебираем ответ от базы данных создавая массив с индексами от 0
          rec.push({
            amount: records[key].amount,
            date: records[key].date,
            description: records[key].description,
            date: records[key].date,
            recordId: records[key].recordId,
            type: records[key].type,
            id: key
          })
      })
      return rec
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecordById({dispatch, commit}, id) {
      try {
        const uid = await dispatch('getUid')
        const record = (await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val() || {}

       
        return {
          ...record,
          id
        }
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
