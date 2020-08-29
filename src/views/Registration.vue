<template>
    <form class="card auth-card">
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
            <label for="email">Электронный адрес</label>
            <div v-if="!$v.email.required" class="invalid-feedback" style="min-height: 18px;display: block;font-size: 12px;color: #f44336">
                Введите адрес электронной почты.
            </div>
            <div v-if="!$v.email.email" class="invalid-feedback" style="min-height: 18px;display: block;font-size: 12px;color: #f44336">
                  Адрес электронной почты введен некорректно.
            </div>
          </div>
          <div class="input-field">
            <input
                @blur="$v.password.$touch()"
                :class="{invalid: $v.password.$error}" 
                id="password"
                type="password"
                v-model="password"
            >
            <label for="password">Пароль</label>
            <div v-if="!$v.password.required" class="invalid-feedback" style="min-height: 18px;display: block;font-size: 12px;color: #f44336">
                Введите пароль.
            </div>
            <div v-if="!$v.password.minLength" class="invalid-feedback" style="min-height: 18px;display: block;font-size: 12px;color: #f44336">
                  Пароль должен состоять минимум из 6 символов.
            </div>
          </div>
          <div class="input-field">
            <input
                @blur="$v.name.$touch()"
                :class="{invalid: $v.password.$error}" 
                id="name"
                type="text"
                v-model="name"
            >
            <div v-if="!$v.name.required" class="invalid-feedback" style="min-height: 18px;display: block;font-size: 12px;color: #f44336">
                Введите имя.
            </div>
            <label for="name">Имя</label>

          </div>
          <p>
            <label>
              <input type="checkbox" />
              <span>С правилами согласен</span>
            </label>
          </p>
        </div>
        <div class="card-action">
          <div>
            <button
                class="btn waves-effect waves-light auth-submit"
                type="submit"
                :disabled="disabledBtn2"
            >
              Зарегистрироваться
              <i class="material-icons right">send</i>
            </button>
          </div>
      
          <p class="center">
            Уже есть аккаунт?
            <router-link to="/login">Войти!</router-link>
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
    onSubmit() {
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      this.$router.push('/')
    }
  },
  computed: {
     disabledBtn2() {
      return this.$v.email.$invalid ||
      this.$v.password.$invalid ||
      this.$v.name.$invalid 
    }
  }
}
</script>