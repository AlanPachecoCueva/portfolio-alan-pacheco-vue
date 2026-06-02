import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '~/utils/firebase/index.js'

let _authResolved = false
let _currentUser: any = null
let _verifiedAdminUid: string | null = null

function waitForAuthReady(): Promise<any> {
  if (_authResolved) return Promise.resolve(_currentUser)
  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      unsub()
      resolve(user)
    })
  })
}

export default defineNuxtRouteMiddleware(async (to) => {
  // Don't run auth checks on server (SSG pre-render pass)
  if (process.server) return

  if (!to.path.startsWith('/admin') || to.path === '/admin/login') return

  const user = await waitForAuthReady()
  if (!user) {
    _verifiedAdminUid = null
    return navigateTo('/admin/login')
  }

  if (_verifiedAdminUid === user.uid) return

  const adminDoc = await getDoc(doc(db, 'admins', user.uid))
  if (!adminDoc.exists()) {
    _verifiedAdminUid = null
    return navigateTo('/admin/login')
  }

  _verifiedAdminUid = user.uid
})
