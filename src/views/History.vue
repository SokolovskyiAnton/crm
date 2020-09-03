<template>
    <div>
      <div class="page-title">
        <h3>История записей</h3>
      </div>
    
      <div class="history-chart">
        <canvas></canvas>
      </div>
      
      <Loader v-if="loading" />

      <p v-else-if="!records.length" class="center">Записей пока нет.</p>

      <section v-else>
        <HistoryTable :records="records"/>
      </section>
    </div>
</template>

<script>
import HistoryTable from '../components/HistoryTable'
export default {
  data() {
    return {
      loading: true,
      records: [],
      categories: []
    }
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords') 
    this.categories = await this.$store.dispatch('fetchCategories')
    this.records = records.map(record => { // создаем массив с нужными данными для таблицы истории
      return {
        ...record,
        categoryName: this.categories.find(cat => cat.id === record.recordId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход'
      }
    })
    this.loading = false
  },
  components: {
    HistoryTable
  }
}
</script>