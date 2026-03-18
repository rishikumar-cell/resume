

import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Experience from '../components/Experience'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { useHomeData } from '../hooks/useHomeData'
import useAIMLAuth from '../hooks/useAIMLAuth'



function Home({ theme, onToggleTheme }) {
  const { data, updateSection, updateArray, resetToDefault } = useHomeData()
  const { isAdmin, login, logout } = useAIMLAuth()
  const [showLogin, setShowLogin] = useState(false)
  const [modal, setModal] = useState(null) // { section: 'hero'|'about'|'experience' }

  useEffect(() => {
    document.title = 'Venu Kumar Chittimalla | Full Stack Developer Portfolio'
  }, [])

  // Placeholder modal for editing (to be implemented)
  function EditModal({ section, onClose }) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl border border-gray-100">
          <h3 className="mb-4 text-lg font-bold text-slate-900">Edit {section}</h3>
          <p className="text-sm text-gray-500 mb-4">(Form coming soon)</p>
          <button onClick={onClose} className="rounded-xl border border-gray-200 py-2.5 px-4 text-sm text-gray-500 hover:bg-gray-50 transition w-full">Cancel</button>
        </div>
      </div>
    )
  }

  // Simple login modal
  function LoginModal({ onLogin, onClose }) {
    const [pw, setPw] = useState('')
    const [err, setErr] = useState(false)
    const submit = (e) => {
      e.preventDefault()
      if (!onLogin(pw)) setErr(true)
    }
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl border border-gray-100">
          <div className="mb-6 text-center">
            <span className="text-3xl">🔐</span>
            <h3 className="mt-3 text-lg font-bold text-slate-900">Admin Login</h3>
            <p className="mt-1 text-sm text-gray-500">Enter the admin password to edit your home page.</p>
          </div>
          <form onSubmit={submit} className="flex flex-col gap-3">
            <input
              type="password" value={pw} onChange={e => { setPw(e.target.value); setErr(false) }}
              placeholder="Password"
              className={`rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 ${err ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:ring-orange-300'}`}
              autoFocus
            />
            {err && <p className="text-xs text-red-500">Incorrect password.</p>}
            <button type="submit" className="rounded-xl py-3 text-sm font-bold text-white transition hover:opacity-90 bg-orange-500">Unlock Admin</button>
            <button type="button" onClick={onClose} className="rounded-xl border border-gray-200 py-2.5 text-sm text-gray-500 hover:bg-gray-50 transition">Cancel</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main>
        <div className="relative">
          <Hero hero={data.hero} />
          {isAdmin && (
            <button onClick={() => setModal({ section: 'hero' })} className="absolute right-8 top-8 z-30 rounded-full bg-orange-500 px-4 py-2 text-xs font-bold text-white shadow hover:bg-orange-600">Edit Hero</button>
          )}
        </div>
        <div className="relative">
          <About about={data.about} />
          {isAdmin && (
            <button onClick={() => setModal({ section: 'about' })} className="absolute right-8 top-8 z-30 rounded-full bg-orange-500 px-4 py-2 text-xs font-bold text-white shadow hover:bg-orange-600">Edit About</button>
          )}
        </div>
        <Skills />
        <Projects />
        <div className="relative">
          <Experience experience={data.experience} />
          {isAdmin && (
            <button onClick={() => setModal({ section: 'experience' })} className="absolute right-8 top-8 z-30 rounded-full bg-orange-500 px-4 py-2 text-xs font-bold text-white shadow hover:bg-orange-600">Edit Experience</button>
          )}
        </div>
        <Contact />
      </main>
      <Footer />

      {/* Floating admin lock button */}
      {!isAdmin && (
        <button
          onClick={() => setShowLogin(true)}
          className="fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-xl bg-orange-500 hover:bg-orange-600"
          title="Admin Login"
        >
          🔒
        </button>
      )}
      {/* Admin banner */}
      {isAdmin && (
        <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-2">
          <button onClick={resetToDefault} className="rounded-lg bg-white/80 px-4 py-2 text-xs font-bold text-orange-600 border border-orange-200 shadow hover:bg-orange-100">Reset Home Data</button>
          <button onClick={logout} className="rounded-lg bg-white/80 px-4 py-2 text-xs font-bold text-gray-600 border border-gray-200 shadow hover:bg-gray-100">Logout</button>
        </div>
      )}

      {/* Modals */}
      {showLogin && <LoginModal onLogin={login} onClose={() => setShowLogin(false)} />}
      {modal && <EditModal section={modal.section} onClose={() => setModal(null)} />}
    </div>
  )
}

export default Home
