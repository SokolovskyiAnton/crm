<template>
    <form class="card auth-card" @submit.prevent="onSubmit">
        <div class="card-content">
          <span class="card-title">{{'Home bookkeeping' | localize}}</span>
          <div class="input-field">
            <input
                :class="{invalid:$v.email.$dirty && $v.email.$error}" 
                id="email"
                type="text"
                v-model="email"
            >
            <label for="email">{{'Email' | localize}}</label>
            <div v-if="$v.email.$dirty && !$v.email.required" class="invalid-feedback" style="min-height: 18px;display: block;font-size: 12px;color: #f44336">
                {{'Invalid_email_1' | localize}}
            </div>
            <div v-if="$v.email.$dirty && !$v.email.email" class="invalid-feedback" style="min-height: 18px;display: block;font-size: 12px;color: #f44336">
                  {{'Invalid_email_2' | localize}}
            </div>
          </div>
          <div class="input-field">
            <input
                :class="{invalid:$v.password.$dirty && $v.password.$error}" 
                id="password"
                type="password"
                v-model="password"
            >
            <label for="password">{{'Password' | localize}}</label>
            <div v-if="$v.password.$dirty && !$v.password.required" class="invalid-feedback" style="min-height: 18px;display: block;font-size: 12px;color: #f44336">
                {{'Enter password' | localize}}
            </div>
            <div v-if="$v.password.$dirty && !$v.password.minLength" class="invalid-feedback" style="min-height: 18px;display: block;font-size: 12px;color: #f44336">
                  {{'Invalid_Password_Long' | localize}}
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
                {{'Enter name' | localize}}
            </div>
            <label for="name">{{'Name' | localize}}</label>

          </div>
          
        </div>
        <div class="card-action">
          <div>
            <button
                class="btn waves-effect waves-light auth-submit"
                type="submit"
            >
              {{'Register' | localize}}
              <i class="material-icons right">send</i>
            </button>
          </div>
      
          <p class="center">
            {{'Already have an account' | localize}}
            <router-link to="/login">{{'Press here' | localize}}</router-link>
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