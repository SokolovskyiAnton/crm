<template>
    <div class="col s12 m6">
      <div>
        <div class="page-subtitle">
          <h4>{{'Edit' | localize}}</h4>
        </div>
        <form @submit.prevent="submitHandler">
          <div class="input-field">
            <select ref="select" v-model="current">
              <option v-for="cat of categories" :key="cat.id" :value="cat.id">{{cat.title}}</option>
            </select>
            <label>{{'SelectCat' | localize}}</label>
          </div>
          <div class="input-field">
            <input
                id="name"
                type="text"
                v-model="title"
                :class="{invalid: $v.title.$dirty && !$v.title.required}"
            >
            <label for="name">{{'Name' | localize}}</label>
            <span v-if="$v.title.$dirty && !$v.title.required" class="helper-text invalid">{{'Invalid_Cat_Name' | localize}}</span>
          </div>
          <div class="input-field">
            <input
                id="limit"
                type="number"
                v-model.number="limit"
                :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
            >
            <label for="limit">{{'Limit' | localize}}</label>
            <span v-if="$v.limit.$dirty && !$v.limit.minValue" class="helper-text invalid">{{'MinLimit' | localize}}</span>
          </div>
          <button class="btn waves-effect waves-light" type="submit">
            {{'Refresh' | localize}}
            <i class="material-icons right">send</i>
          </button>
        </form>
      </div>
    </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'

  export default {
    data() {
      return {
        select: null,
        title: '',
        limit: 100,
        current: null
      }
    },
    props: ['categories'], // массив категорий
    mounted() {
      this.select = M.FormSelect.init(this.$refs.select) // иницализация селекта
      M.updateTextFields() // фикс плавающего плейсхолдера
      
    },
    created() {  // при загрузке страницы заргужаем  в option данные для отрисовки
      const {id, title, limit} = this.categories[0]
      this.current = id
      this.title = title
      this.limit = limit
    },
    methods: {
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        try {
          const categoryData = {
            id: this.current,
            title: this.title,
            limit: this.limit
          }
          await this.$store.dispatch('updateCategory', categoryData) // обновляем категорию
          this.$message('Категория успешно обновлена.')
          this.$emit('updated', categoryData) // передаем на слушатель события объект
        } catch (e) {
          
        }
      }
    },
    watch: {
      current(catId) { // следит за изменением id и меняет поля
        const {title, limit} = this.categories.find(c => c.id === catId)
        this.title = title
        this.limit = limit
      }
    },
    validations: {
      title: {required},
      limit: {minValue: minValue(10)}
    },
    destroyed() { // утечка памяти
      if (this.select && this.select.destroy) {
        this.select.destroy()
      }
    }
  }
</script>

<style scoped>
</style>