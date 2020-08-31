<template>
  <div class="col s12 m6 l8">
  <div class="card orange darken-3 bill-card">
        <div class="card-content white-text">
          <div class="card-header">
            <span class="card-title">Курс валют</span>
          </div>
          <table>
            <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс</th>
              <th>Дата</th>
            </tr>
            </thead>

            <tbody>
            <tr>
              <td>{{currencies[1]}}</td>
              <td>{{eur}}</td>
              <td>{{date}}</td>
            </tr>
            <tr>
              <td>{{currencies[2]}}</td>
              <td>{{usd}}</td>
              <td>{{date}}</td>
            </tr>
            </tbody>
          </table>
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
    props: ['rates', 'date'], // валюты и дата
    computed: {
      usd() {
        const usd = this.eur/this.rates.USD // получаю курс гривна/доллар
        return usd.toFixed(2) // оставляю две цифры после запятой
      },
      eur() {
        const eur = this.rates.EUR*this.rates.UAH // получаю курс гривна/евро
        return eur.toFixed(2)
      }
    }
  }
</script>

<style scoped>
</style>