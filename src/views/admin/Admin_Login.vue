<template>
  <div class="admin-login">
    <div class="login-card">
      <h1>Admin Login</h1>
      <p v-if="inactivityMsg" class="info">{{ inactivityMsg }}</p>
      <form @submit.prevent="handleLogin">
        <div class="field">
          <label>Email</label>
          <input v-model="email" type="email" required autocomplete="email" />
        </div>
        <div class="field">
          <label>Password</label>
          <input v-model="password" type="password" required autocomplete="current-password" />
        </div>
        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Ingresando...' : 'Ingresar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuth } from '@/composables/useAuth.js'

export default {
  name: 'Admin_Login',
  setup() {
    return useAuth()
  },
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      errorMsg: '',
      inactivityMsg: this.$route.query.reason === 'inactivity'
        ? 'Tu sesión fue cerrada por 3 horas de inactividad.'
        : '',
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true
      this.errorMsg = ''
      try {
        await this.login(this.email, this.password)
        this.$router.push({ name: 'AdminProjects' })
      } catch (err) {
        if (err.message === 'No autorizado') {
          this.errorMsg = 'No tienes permisos de administrador.'
        } else if (
          err.code === 'auth/wrong-password' ||
          err.code === 'auth/user-not-found' ||
          err.code === 'auth/invalid-credential'
        ) {
          this.errorMsg = 'Email o contraseña incorrectos.'
        } else if (err.code === 'permission-denied') {
          this.errorMsg = 'Error de permisos en Firestore. Configura las Security Rules.'
        } else {
          this.errorMsg = `Error (${err.code || 'unknown'}): ${err.message}`
        }
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.admin-login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #111;
}

.login-card {
  background: #1e1e1e;
  padding: 40px;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

h1 {
  color: #fff;
  margin-bottom: 28px;
  font-size: 1.5em;
}

.field {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  color: #aaa;
  font-size: 0.85em;
}

input {
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #333;
  background: #2a2a2a;
  color: #fff;
  font-size: 1em;
  outline: none;
}

input:focus {
  border-color: #f39c12;
}

button {
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background: #f39c12;
  color: #111;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: #e74c3c;
  font-size: 0.85em;
  margin-top: 8px;
}

.info {
  color: #f39c12;
  font-size: 0.85em;
  margin-bottom: 16px;
  padding: 8px 12px;
  background: #2a1f00;
  border-radius: 6px;
  border-left: 3px solid #f39c12;
}
</style>
