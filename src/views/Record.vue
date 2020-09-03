<template>
    <div>
      <div class="page-title">
        <h3>{{'NewRecord' | localize}}</h3>
      </div>
      <Loader v-if="loading"/>
      <p v-else-if="!categories.length" class="center">{{'NoCategories' | localize}}. <router-link to="/categories">{{'AddNewCategory' | localize}}</router-link></p>
      <form v-else class="form" @submit.prevent="submitHandler">
        <div class="input-field" >
          <select ref="select" v-model="current">
            <option v-for="cat of categories" :key="cat.id" :value="cat.id">{{cat.title}}</option>
          </select>
          <label>{{'SelectCat' | localize}}</label>
        </div>
    
        <p>
          <label>
            <input
                class="with-gap"
                name="type"
                type="radio"
                value="income"
                v-model="type"
            />
            <span><strong>{{'Income' | localize}}</strong></span>
          </label>
        </p>
    
        <p>
          <label>
            <input
                class="with-gap"
                name="type"
                type="radio"
                value="outcome"
                v-model="type"
            />
            <span><strong>{{'Outcome' | localize}}</strong></span>
          </label>
        </p>
    
        <div class="input-field">
          <input
              id="amount"
              type="number"
              v-model.number="amount"
              :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
          >
          <label for="amount">{{'Sum' | localize}}</label>
          <span v-if="$v.amount.$dirty && !$v.amount.minValue" class="helper-text invalid">{{'MinLimit' | localize}}</span>
        </div>
    
        <div class="input-field">
          <input
              id="description"
              type="text"
              v-model="description"
              :class="{invalid: $v.description.$dirty && !$v.description.required}"
          >
          <label for="description">{{'Description' | localize}}</label>
          <span v-if="$v.description.$dirty && !$v.description.required" class="helper-text invalid">{{'DescriptionInvalid' | localize}}</span>
        </div>
    
        <button class="btn waves-effect waves-light" type="submit">
          {{'Create' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex' // импорт геттера

export default {
  data() {
    return {
      loading: true,
      categories: [],
      select: null,
      current: null,
      type: 'outcome',
      amount: 10,
      description: ''
    }
  },
  computed: {
    ...mapGetters(['info']), // получение геттера
    canCreateRecord() { // проверка на наличие счета
      if(this.type === 'income') {
        return true
      }
      return this.info.bill >= this.amount
      debugger
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
          this.$v.$touch()
          return
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            recordId: this.current,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })
          const bill = this.type === 'income' // если доход, то добавить деньги к счете и наоборот
            ? this.info.bill + this.amount
            : this.info.bill - this.amount

          await this.$store.dispatch('updateInfo', {bill})

          this.$message('Запись успешно создана.')
          this.$v.$reset()
          this.amount = 10
          this.description = ''

        } catch (e) {}
      } else {
        this.$message(`Недостаточно средств на счете - ${this.amount - this.info.bill} грн.`)
      }
    }
  },
    validations: {
      description: {required},
      amount: {minValue: minValue(10)}
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    
    if (this.categories.length) {
      this.current = this.categories[0].id
    }
    
    setTimeout(() => {  // хак позволяющий подгузить плагин селекта
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)
  },
  destroyed() { // утечка памяти
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>