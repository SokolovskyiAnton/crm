<template>
    <form class="card auth-card" @submit.prevent="onSubmit" novalidate>
      <div class="card-content">
        <span class="card-title">Домашняя бухгалтерия</span>
        <div class="input-field">
          <input
              @blur="$v.email.$touch()" 
              :class="{invalid: $v.email.$error}" 
              id="email"
              type="text"
              v-model="email"
          >
          <div v-if="!$v.email.required" class="invalid-feedback" style="min-height: 18px;display: block;font-size: 12px;color: #f44336">
                Введите адрес электронной почты.
          </div>
          <div v-if="!$v.email.email" class="invalid-feedback" style="min-height: 18px;display: block;font-size: 12px;color: #f44336">
                Адрес электронной почты введен некорректно.
          </div>
          <label for="email">Электронный адрес</label>

        </div>
        <div class="input-field">
          <input
              @blur="$v.password.$touch()"
              :class="{invalid: $v.password.$error}" 
              id="password"
              type="password"
              v-model="password"
          >
          <div v-if="!$v.password.required" class="invalid-feedback" style="min-height: 18px;display: block;font-size: 12px;color: #f44336">
                Введите пароль.
          </div>
          <div v-if="!$v.password.minLength" class="invalid-feedback" style="min-height: 18px;display: block;font-size: 12px;color: #f44336">
                Пароль должен состоять минимум из 6 символов.
          </div>
          <label for="password">Пароль</label>
        </div>
      </div>
      <div class="card-action">
        <div>
          <button
              class="btn waves-effect waves-light auth-submit"
              type="submit"
              :disabled="disabledBtn1"
          >
            Войти
            <i class="material-icons right">send</i>
          </button>
        </div>
    
        <p class="center">
          Нет аккаунта?
          <router-link to="/registration">Зарегистрироваться</router-link>
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
      password: ''
    }
  },
  validations: {
      email: { required, email },
      password: { required, minLength: minLength(6) }
  },
  methods: {
    onSubmit() {
      const formData = {
        email: this.email,
        password: this.password
      }
      console.log(formData);
      this.$router.push('/')
    }
  },
  computed: {
     disabledBtn1() {
      return this.$v.email.$invalid ||
      this.$v.password.$invalid 
    }
  }
}
</script>