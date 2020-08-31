<template>
    <div>
        <div class="page-title">
          <h3>Категории</h3>
        </div>
        <section>
          <Loader v-if="loading"/>
          <div v-else class="row">
            <CategoryCreate @created="addNewCategory" /> <!--при добавлении категории, в метод передаются поля title, limit и уникальный id-->

            <CategoryEdit v-if="categories.length" :categories="categories" @updated="updatedCategory" :key="categories.length + updateCount"/>
            <p v-else class="center">Категорий пока нет</p> <!--передаем в пропс массив категорий, а также слушаем событие изменения категории-->
          </div>
        </section>
    </div>
</template>

<script>
import CategoryCreate from '../components/CategoryCreate'
import CategoryEdit from '../components/CategoryEdit'

export default {
  data() {
    return {
      categories: [],
      loading: true,
      updateCount: 0
    }
  },
  components: {
    CategoryCreate, CategoryEdit
  },
  methods: {
    addNewCategory(categor) { // пушим в массив категорию
      this.categories.push(categor)
    },
    updatedCategory(category) { // обновляем категорию
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories') // получаем с firebase категории
    this.loading = false
  }
}
</script>