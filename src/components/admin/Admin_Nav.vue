<template>
  <nav class="admin-nav">
    <div class="admin-nav-brand">Admin Panel</div>
    <div class="admin-nav-links">
      <router-link :to="{ name: 'AdminProjects' }">Proyectos</router-link>
      <router-link :to="{ name: 'AdminAchievements' }">Logros</router-link>
      <router-link :to="{ name: 'AdminImages' }">Imágenes</router-link>
      <router-link :to="{ name: 'AdminAlbums' }">Álbumes</router-link>
    </div>

    <!-- Aviso de inactividad -->
    <div v-if="showWarning" class="inactivity-warning">
      Sesión expira en {{ warningCountdown }}s
    </div>

    <button class="admin-nav-logout" @click="handleLogout">Cerrar sesión</button>
  </nav>
</template>

<script>
import { useAuth } from '@/composables/useAuth.js'

const INACTIVE_LIMIT = 3 * 60 * 60 * 1000   // 3 horas en ms
const WARNING_BEFORE  = 60 * 1000             // aviso 60s antes

export default {
  name: 'Admin_Nav',
  setup() {
    return useAuth()
  },
  data() {
    return {
      inactivityTimer: null,
      warningTimer: null,
      countdownInterval: null,
      showWarning: false,
      warningCountdown: 60,
    }
  },
  mounted() {
    this.startInactivityWatch()
  },
  beforeUnmount() {
    this.clearAllTimers()
    this.removeActivityListeners()
  },
  methods: {
    // ── Logout ────────────────────────────────────────────────────────────
    async handleLogout(reason = 'manual') {
      this.clearAllTimers()
      this.removeActivityListeners()
      await this.logout()
      if (reason === 'inactivity') {
        this.$router.push({ name: 'AdminLogin', query: { reason: 'inactivity' } })
      } else {
        this.$router.push({ name: 'AdminLogin' })
      }
    },

    // ── Inactividad ───────────────────────────────────────────────────────
    startInactivityWatch() {
      this._activityHandler = this.resetTimer.bind(this)
      ;['mousemove', 'click', 'keydown', 'touchstart', 'scroll'].forEach((evt) => {
        window.addEventListener(evt, this._activityHandler, { passive: true })
      })
      this.resetTimer()
    },
    removeActivityListeners() {
      if (!this._activityHandler) return
      ;['mousemove', 'click', 'keydown', 'touchstart', 'scroll'].forEach((evt) => {
        window.removeEventListener(evt, this._activityHandler)
      })
    },
    resetTimer() {
      this.clearAllTimers()
      this.showWarning = false
      this.warningCountdown = 60

      // Timer para mostrar el aviso 60s antes del cierre
      this.warningTimer = setTimeout(() => {
        this.showWarning = true
        this.warningCountdown = 60
        this.countdownInterval = setInterval(() => {
          this.warningCountdown -= 1
        }, 1000)
      }, INACTIVE_LIMIT - WARNING_BEFORE)

      // Timer para el cierre de sesión
      this.inactivityTimer = setTimeout(() => {
        this.handleLogout('inactivity')
      }, INACTIVE_LIMIT)
    },
    clearAllTimers() {
      clearTimeout(this.inactivityTimer)
      clearTimeout(this.warningTimer)
      clearInterval(this.countdownInterval)
    },
  },
}
</script>

<style scoped>
.admin-nav {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 14px 28px;
  background: #1a1a1a;
  border-bottom: 1px solid #2a2a2a;
  flex-wrap: wrap;
}

.admin-nav-brand {
  font-weight: bold;
  font-size: 1.1em;
  color: #f39c12;
  margin-right: 16px;
}

.admin-nav-links {
  display: flex;
  gap: 16px;
  flex: 1;
}

.admin-nav-links a {
  color: #aaa;
  text-decoration: none;
  font-size: 0.95em;
  padding: 4px 8px;
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;
}

.admin-nav-links a.router-link-active,
.admin-nav-links a:hover {
  color: #fff;
  background: #2a2a2a;
}

.inactivity-warning {
  padding: 5px 12px;
  background: #7a2a00;
  border: 1px solid #e74c3c;
  border-radius: 6px;
  color: #ff8a65;
  font-size: 0.82em;
  font-weight: bold;
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.6; }
}

.admin-nav-logout {
  padding: 7px 16px;
  background: transparent;
  border: 1px solid #444;
  border-radius: 6px;
  color: #aaa;
  cursor: pointer;
  font-size: 0.9em;
  transition: border-color 0.2s, color 0.2s;
}

.admin-nav-logout:hover {
  border-color: #e74c3c;
  color: #e74c3c;
}
</style>
