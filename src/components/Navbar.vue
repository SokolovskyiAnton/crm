<template>
    <nav class="navbar orange lighten-1">
        <div class="nav-wrapper">
            <div class="navbar-left" @click="$emit('navbar')"> <!--закрытие навбара и увеличение app-content-->
                <a href="#">
                  <i class="material-icons black-text">dehaze</i>
                </a>
                <span class="black-text">{{date | date}}</span> <!--фильтр даты-->
            </div>
      
            <ul class="right hide-on-small-and-down">
                <li>
                    <a
                      class="dropdown-trigger black-text"
                      href="#"
                      data-target="dropdown"
                      ref="dropdown"
                    >
                    {{name.name}}
                        <i class="material-icons right">arrow_drop_down</i>
                    </a>
      
                  <ul id='dropdown' class='dropdown-content'>
                    <li>
                      <router-link to="/profile" class="black-text">
                        <i class="material-icons">account_circle</i>{{'ProfileTitle' | localize}}
                      </router-link>
                    </li>
                    <li class="divider" tabindex="-1"></li>
                    <li>
                      <a href="#" class="black-text" @click.prevent="logout">
                        <i class="material-icons">assignment_return</i>{{'Sign out' | localize}}
                      </a>
                    </li>
                  </ul>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
      interval: null,
      dropdown: null
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout') // вызываем экшн который очищает сессию
      this.$router.push('/login?message=logout') // пушим на страницу логина выводя сообщение
    }
  },
  computed: {
    name() {
      return this.$store.getters.info // получаем имя
    }
  },
  mounted() {
    this.interval = setInterval(() => { // вызов даты каждую секунду
      this.date = new Date()
    }, 1000)
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, { // инициализация выпадающего меню 
      constrainWidth: true
    })
  },
  beforeDestroy() { // утечка памяти
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy
    }
  }
}
</script>