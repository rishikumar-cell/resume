import { useState } from 'react'

// ── CHANGE YOUR ADMIN PASSWORD HERE ──────────────────────────────────────────
// Replace 'venu@aiml2026' with your own password, then save the file.
// This is base64-encoded (not real encryption) — suitable for a personal portfolio.
const ADMIN_PW_B64 = btoa('Chittimalla@1817')
// ─────────────────────────────────────────────────────────────────────────────

const SESSION_KEY = 'aiml_admin_session'

export default function useAIMLAuth() {
  const [isAdmin, setIsAdmin] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === 'true'
  )

  /** Returns true on success, false on wrong password */
  const login = (password) => {
    if (btoa(password) === ADMIN_PW_B64) {
      sessionStorage.setItem(SESSION_KEY, 'true')
      setIsAdmin(true)
      return true
    }
    return false
  }

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setIsAdmin(false)
  }

  return { isAdmin, login, logout }
}
