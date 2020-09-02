<template>
    <div>
      <div class="page-title">
        <h3>Планирование</h3>
        <h4>{{info.bill | currency('UAH')}}</h4>
      </div>
      <Loader v-if="loading"/>
      <p v-else-if="!categories.length" class="center">Категорий пока нет. <router-link to="/categories">Добавить новую категорию.</router-link></p>
      <section v-else>
        <div v-for="cat in categories" :key="cat.id">
          <p>
            <strong>{{cat.title}}</strong>
            {{cat.spend | currency}} из {{cat.limit | currency}}
          </p>
          <div class="progress" v-tooltip="cat.tooltip">
            <div
                class="determinate"
                :class="cat.progressColor"
                :style="{width: cat.progresPercent + '%'}"
            ></div>
          </div>
        </div>
      </section>
    </div>

</template>

<script>
import {mapGetters} from 'vuex'
import currencyFilter from '../filters/currencies.filter'
export default {
  data() {
    return {
      loading: true,
      categories: []   
    }
  },
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords') // получаем рекорд и категории из бд
    const categories = await this.$store.dispatch('fetchCategories')
    
    this.categories = categories.map(cat => { // заносим в массив categories новый массив
      const spend = records
        .filter(r => r.recordId === cat.id) // нахожим нужную категорию
        .filter(r => r.type === 'outcome') // проверяем тип траты
        .reduce((total, record) => {
          return total += +record.amount // суммируем
        }, 0)
      const percent = 100 * spend / cat.limit // процент потраченого лимита 
      const progresPercent = percent > 100 ? 100 : percent // проверка для зашиты врестки
      const progressColor = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'

      const tooltipValue = cat.limit - spend
      const tooltip = `${tooltipValue < 0 ? 'Превышение на': 'Осталось'} ${currencyFilter(tooltipValue)}`
      return {
        ...cat,
        progresPercent,
        progressColor,
        spend,
        tooltip
      }
    }) 

    this.loading = false
  }
}
</script>