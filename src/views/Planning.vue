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
          <div class="progress" >
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
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    
    this.categories = categories.map(cat => {
      const spend = records
        .filter(r => r.recordId === cat.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          return total += +record.amount
        }, 0)
      const percent = 100 * spend / cat.limit
      const progresPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'
      return {
        ...cat,
        progresPercent,
        progressColor,
        spend
      }
    }) 

    console.log(this.categories);
    this.loading = false


  }
}
</script>