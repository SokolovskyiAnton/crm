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
        <HistoryTable :records="items"/>
        <Paginate 
          :page-count="pageCount" 
          :click-handler="pageChangeHandler"
          :prev-text="'Назад'"
          :next-text="'Вперёд'"
          :container-class="'pagination'"
          :page-class="'waves-effect'"
          v-model="page"
        /><!--Пагинация с параметрами из мексина. 1. Настройка количества страниц 2. Переключение страниц-->
      </section>
    </div>
</template>

<script>
import HistoryTable from '../components/HistoryTable'
import paginationMixin from '../mixins/pagination.mixin'
export default {
  data() {
    return {
      loading: true,
      records: []
    }
  },
  mixins: [paginationMixin], // миксин с массивом данных
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords') 
    const categories = await this.$store.dispatch('fetchCategories')
    this.setupPagination(this.records.map(record => { // создаем массив с нужными данными для таблицы истории
      return {
        ...record,
        categoryName: categories.find(cat => cat.id === record.recordId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход'
      }
    }))
    this.loading = false
  },
  components: {
    HistoryTable
  }
}
</script>