<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{'Currencies' | localize}}</span>
        <p class="currency-line" v-for="cur in currencies" :key="cur.id">
          <span>{{getCurrency(cur) | currency(cur)}}</span> <!--фильтр добавляет иконку валюты-->
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currencies: ['UAH', 'EUR', 'USD'] // ключи этого массива и кличи массива rates совпадают
      }
    },
    props: ['rates'], // валюты
    computed: {
      base() {
        return this.$store.getters.info.bill / (this.rates['UAH'] / this.rates['EUR']) // получение общей суммы в евро
      }
    },
    methods: {
      getCurrency(currency) {
        return Math.floor(this.base * this.rates[currency]) // получение суммы в usd and eur 
      }
    }
  }
</script>

<style scoped>
</style>