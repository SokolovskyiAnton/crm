<template>
    <ul class="sidenav app-sidenav" :class="{open: value}">

        <router-link v-for="link in links" :key="link.id" tag="li" :to="link.url" active-class="active" exact> <!--перебираем массив-->
            <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
        </router-link>
    </ul>
</template>

<script>
import localizeFilter from '../filters/localize.filter'
export default {
    data() {
        return {
            links: [
                {title: localizeFilter('Menu_Bill'), url: '/'},
                {title: localizeFilter('Menu_History'), url: '/history'},
                {title: localizeFilter('Menu_Planning'), url: '/planning'},
                {title: localizeFilter('Menu_Record'), url: '/record'},
                {title: localizeFilter('Menu_Categories'), url: '/categories'}
            ]
        }
    },
    props: ['value']
}
</script>