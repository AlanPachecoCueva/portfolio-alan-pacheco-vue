import { ref, onUnmounted } from 'vue'
import { login as firebaseLogin, logout as firebaseLogout, onAuthChanged } from '@/firebase/auth.js'

const currentUser = ref(null)
let _unsubscribe = null
let _initialized = false

/**
 * Composable de autenticación.
 * El estado `currentUser` es compartido globalmente (singleton reactivo).
 */
export function useAuth() {
  if (!_initialized) {
    _initialized = true
    _unsubscribe = onAuthChanged((user) => {
      currentUser.value = user
    })
  }

  async function login(email, password) {
    return firebaseLogin(email, password)
  }

  async function logout() {
    return firebaseLogout()
  }

  return {
    currentUser,
    login,
    logout,
  }
}
