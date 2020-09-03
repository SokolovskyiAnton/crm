<template>
    <div>
      <div class="page-title">
        <h3>Профиль</h3>
      </div>
    
      <form class="form" @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            :class="{invalid:$v.name.$dirty && $v.name.$error}" 
              id="description"
              type="text"
              v-model="name"
          >
          <label for="description">Имя</label>
          <span v-if="$v.name.$dirty && !$v.name.required" class="helper-text invalid">Введите имя.</span>
        </div>
        <div class="switch" style="margin-bottom: 2rem;">
          <label>
            English
            <input type="checkbox">
            <span class="lever"></span>
            Русский
          </label>
        </div>
        
    
        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
      
    </div>

</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      name: ''
    }
  },
  mounted() {
    this.name = this.info.name
    setTimeout(() => {
      M.updateTextFields()
    })
  },
  validations: {
      name: { required }
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['updateInfo']),

    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
 
      try {
        await this.updateInfo({
          name: this.name
        })
      } catch (e) {}
  
    }
  }
}
</script>
