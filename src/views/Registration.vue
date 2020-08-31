<template>
    <form class="card auth-card" @submit.prevent="onSubmit">
        <div class="card-content">
          <span class="card-title">Домашняя бухгалтерия</span>
          <div class="input-field">
            <input
                :class="{invalid:$v.email.$dirty && $v.email.$error}" 
                id="email"
                type="text"
                v-model="email"
            >
            <label for="email">Электронный адрес</label>
            <div v-if="$v.email.$dirty && !$v.email.required" class="invalid-feedback" style="min-height: 18px;display: block;font-size: 12px;color: #f44336">
                Введите адрес электронной почты.
            </div>
            <div v-if="$v.email.$dirty && !$v.email.email" class="invalid-feedback" style="min-height: 18px;display: block;font-size: 12px;color: #f44336">
                  Адрес электронной почты введен некорректно.
            </div>
          </div>
          <div class="input-field">
            <input
                :class="{invalid:$v.password.$dirty && $v.password.$error}" 
                id="password"
                type="password"
                v-model="password"
            >
            <label for="password">Пароль</label>
            <div v-if="$v.password.$dirty && !$v.password.required" class="invalid-feedback" style="min-height: 18px;display: block;font-size: 12px;color: #f44336">
                Введите пароль.
            </div>
            <div v-if="$v.password.$dirty && !$v.password.minLength" class="invalid-feedback" style="min-height: 18px;display: block;font-size: 12px;color: #f44336">
                  Пароль должен состоять минимум из 6 символов.
            </div>
          </div>
          <div class="input-field">
            <input
                :class="{invalid:$v.name.$dirty && $v.name.$error}" 
                id="name"
                type="text"
                v-model="name"
            >
            <div v-if="$v.name.$dirty && !$v.name.required" class="invalid-feedback" style="min-height: 18px;display: block;font-size: 12px;color: #f44336">
                Введите имя.
            </div>
            <label for="name">Имя</label>

          </div>
          
        </div>
        <div class="card-action">
          <div>
            <button
                class="btn waves-effect waves-light auth-submit"
                type="submit"
            >
              Зарегистрироваться
              <i class="material-icons right">send</i>
            </button>
          </div>
      
          <p class="center">
            Уже есть аккаунт?
            <router-link to="/login">Нажмите здесь</router-link>
          </p>
        </div>
    </form>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      email: '',
      password: '',
      name: ''
    }
  },
  validations: {
      email: { required, email },
      password: { required, minLength: minLength(6) },
      name: { required }
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch(e) {}
    }
  }
}
</script>