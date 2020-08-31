<template>
    <div class="grey darken-1 empty-layout">
        <router-view/>
    </div>
</template>

<script>
import messages from '../utils/messages' // список ошибок
export default {
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