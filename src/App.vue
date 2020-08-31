<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import EmptyLayout from './layouts/EmptyLayout' // импорт макетов для форм логина/регистрации и остальных страниц
import MainLayout from './layouts/MainLayout'
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout' // подстраивание нужного макета с помощью route.meta
    }
  },
  components: {
    EmptyLayout, MainLayout
  }
}
</script>

<style>

</style>
