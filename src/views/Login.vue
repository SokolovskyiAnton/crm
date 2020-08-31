<template>
    <form class="card auth-card" @submit.prevent="onSubmit" novalidate>
      <div class="card-content">
        <span class="card-title">Домашняя бухгалтерия</span>
        <div class="input-field">
          <input
              
              :class="{invalid:$v.email.$dirty && $v.email.$error}" 
              id="email"
              type="text"
              v-model="email"
          >
          <div v-if="$v.email.$dirty && !$v.email.required" class="invalid-feedback" style="min-height: 18px;display: block;font-size: 12px;color: #f44336">
                Введите адрес электронной почты.
          </div>
          <div v-if="$v.email.$dirty && !$v.email.email" class="invalid-feedback" style="min-height: 18px;display: block;font-size: 12px;color: #f44336">
                Адрес электронной почты введен некорректно.
          </div>
          <label for="email">Электронный адрес</label>

        </div>
        <div class="input-field">
          <input
              
              :class="{invalid:$v.password.$dirty && $v.password.$error}" 
              id="password"
              type="password"
              v-model="password"
          >
          <div v-if="$v.password.$dirty && !$v.password.required" class="invalid-feedback" style="min-height: 18px;display: block;font-size: 12px;color: #f44336">
                Введите пароль.
          </div>
          <div v-if="$v.password.$dirty && !$v.password.minLength" class="invalid-feedback" style="min-height: 18px;display: block;font-size: 12px;color: #f44336">
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
import { required, email, minLength } from 'vuelidate/lib/validators' // валидатор

import messages from '../utils/messages' // импорт сообщений об ошибках

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
    async onSubmit() { // проверяем есть ли невалидные поля и возвращаем 
      if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
      const formData = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('login', formData) // передаем объект с данными в экшн логин
        this.$router.push('/') // если удачно пушим в хоум
      } catch(e) {}
    }
  },
  mounted() { // если в файлах об ошибках есть logout, то выводим в плагине
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  }
}
</script>