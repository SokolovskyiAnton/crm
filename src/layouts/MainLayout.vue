<template>
    <div class="app-main-layout">
      <Navbar @navbar="isOpen = !isOpen"/> <!--закрытие навбара и увеличение app-content-->
      <Sidebar v-model="isOpen"/>

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
            <router-view/>
        </div>
      </main>
  
      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/categories">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import messages from '../utils/messages' // список ошибок
export default {
  name: 'main-layout',
  data() {
    return {
      isOpen: true
    }
  },
  async mounted() {
    if(!Object.keys(this.$store.getters.info).length) { // проверка на наличие геттера инфо в котором находится имя
      await this.$store.dispatch('fetchInfo')
    }
  },
  components: {
    Navbar, Sidebar
  },
  computed: {
    error() {
      return this.$store.getters.error // геттр с ошибками
    }
  },
  watch: {
    error(err) {
      this.$error(messages[err.code] || 'Что-то пошло не так') // при изменении геттера вызывается плагин эррор
    }
  }
}
</script>