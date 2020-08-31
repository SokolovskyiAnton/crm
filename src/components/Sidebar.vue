<template>
    <ul class="sidenav app-sidenav" :class="{open: value}">

        <router-link v-for="link in links" :key="link.id" tag="li" :to="link.url" active-class="active" exact> <!--перебираем массив-->
            <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
        </router-link>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            links: [
                {title: 'Счет', url: '/'},
                {title: 'История', url: '/history'},
                {title: 'Планирование', url: '/planning'},
                {title: 'Новая запись', url: '/record'},
                {title: 'Категории', url: '/categories'}
            ]
        }
    },
    props: ['value']
}
</script>