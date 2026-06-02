import { onUnmounted } from 'vue'
import { login as firebaseLogin, logout as firebaseLogout, onAuthChanged } from '~/utils/firebase/auth.js'

let _unsubscribe = null
let _initialized = false

export function useAuth() {
  // useState is SSR-safe: shared state across server/client
  const currentUser = useState('auth-user', () => null)

  if (process.client && !_initialized) {
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
