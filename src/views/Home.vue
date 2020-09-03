<template>
    <div>
        <div class="page-title">
            <h3>{{'Menu_Bill' | localize}}</h3>
            <button class="btn waves-effect waves-light btn-small" @click="refresh">
              <i class="material-icons">refresh</i>
            </button>
        </div>
        <Loader v-if="loading"/>
        <div class="row" v-else>
          <HomeBill :rates="currency.rates"/> <!--передаем валюты в компоненты-->
          <HomeCurrency :rates="currency.rates" :date="currency.date"/>
        </div>
    </div>
</template>

<script>
import HomeBill from '../components/HomeBill'
import HomeCurrency from '../components/HomeCurrency'

export default {
  data() {
    return {
      loading: true,
      currency: null
    }
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  },
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency') // получаем курс валют
    this.loading = false // если получили, то крудок пропадает
  },
  components: {
    HomeBill, HomeCurrency
  }
}
</script>

