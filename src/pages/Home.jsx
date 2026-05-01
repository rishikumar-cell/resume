

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

  // Hero edit modal
  function HeroModal({ hero, onSave, onClose }) {
    const [form, setForm] = useState({ ...hero })
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
        <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
          <h3 className="mb-6 text-lg font-bold text-slate-900">Edit Hero</h3>
          <div className="flex flex-col gap-4">
            {[['Name', 'name'], ['Title', 'title'], ['CTA Button', 'cta'], ['CTA Target (section id)', 'ctaTarget']].map(([label, key]) => (
              <label key={key} className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-500">{label}</span>
                <input className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-300" value={form[key]} onChange={e => set(key, e.target.value)} />
              </label>
            ))}
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-gray-500">Subtitle</span>
              <textarea rows={2} className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-300 resize-none" value={form.subtitle} onChange={e => set('subtitle', e.target.value)} />
            </label>
            <div className="flex gap-4">
              <label className="flex flex-col gap-1 flex-1">
                <span className="text-xs font-semibold text-gray-500">Background Color</span>
                <div className="flex items-center gap-2">
                  <input type="color" className="w-10 h-10 rounded cursor-pointer border-0" value={form.bg} onChange={e => set('bg', e.target.value)} />
                  <span className="text-sm text-gray-500">{form.bg}</span>
                </div>
              </label>
              <label className="flex flex-col gap-1 flex-1">
                <span className="text-xs font-semibold text-gray-500">Mesh Color</span>
                <div className="flex items-center gap-2">
                  <input type="color" className="w-10 h-10 rounded cursor-pointer border-0" value={form.meshColor} onChange={e => set('meshColor', e.target.value)} />
                  <span className="text-sm text-gray-500">{form.meshColor}</span>
                </div>
              </label>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button onClick={() => { onSave(form); onClose() }} className="flex-1 rounded-xl bg-orange-500 py-3 text-sm font-bold text-white hover:bg-orange-600 transition">Save</button>
            <button onClick={onClose} className="flex-1 rounded-xl border border-gray-200 py-3 text-sm text-gray-500 hover:bg-gray-50 transition">Cancel</button>
          </div>
        </div>
      </div>
    )
  }

  // About edit modal
  function AboutModal({ about, onSave, onClose }) {
    const [summary, setSummary] = useState(about.summary)
    const [stats, setStats] = useState(about.stats.map(s => ({ ...s })))
    const updateStat = (i, k, v) => setStats(arr => arr.map((s, idx) => idx === i ? { ...s, [k]: v } : s))
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
        <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
          <h3 className="mb-6 text-lg font-bold text-slate-900">Edit About</h3>
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-gray-500">Summary</span>
              <textarea rows={5} className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-300 resize-none" value={summary} onChange={e => setSummary(e.target.value)} />
            </label>
            <div>
              <span className="text-xs font-semibold text-gray-500">Stats</span>
              <div className="mt-2 flex flex-col gap-3">
                {stats.map((s, i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <input className="w-20 rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-300 text-center font-bold" value={s.value} onChange={e => updateStat(i, 'value', e.target.value)} placeholder="Value" />
                    <input className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-300" value={s.label} onChange={e => updateStat(i, 'label', e.target.value)} placeholder="Label" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button onClick={() => { onSave({ summary, stats }); onClose() }} className="flex-1 rounded-xl bg-orange-500 py-3 text-sm font-bold text-white hover:bg-orange-600 transition">Save</button>
            <button onClick={onClose} className="flex-1 rounded-xl border border-gray-200 py-3 text-sm text-gray-500 hover:bg-gray-50 transition">Cancel</button>
          </div>
        </div>
      </div>
    )
  }

  // Experience edit modal
  function ExperienceModal({ experience, onSave, onClose }) {
    const [items, setItems] = useState(experience.map(e => ({ ...e, tagsStr: e.tags.join(', ') })))
    const update = (i, k, v) => setItems(arr => arr.map((item, idx) => idx === i ? { ...item, [k]: v } : item))
    const addItem = () => setItems(arr => [...arr, { id: Date.now(), role: '', company: '', period: '', description: '', tagsStr: '', side: 'left' }])
    const removeItem = (i) => setItems(arr => arr.filter((_, idx) => idx !== i))
    const save = () => {
      const cleaned = items.map(({ tagsStr, ...rest }) => ({ ...rest, tags: tagsStr.split(',').map(t => t.trim()).filter(Boolean) }))
      onSave(cleaned)
      onClose()
    }
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
        <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
          <h3 className="mb-6 text-lg font-bold text-slate-900">Edit Experience</h3>
          <div className="flex flex-col gap-6">
            {items.map((item, i) => (
              <div key={item.id} className="rounded-xl border border-gray-100 p-4 bg-gray-50 flex flex-col gap-3 relative">
                <button onClick={() => removeItem(i)} className="absolute top-3 right-3 text-xs text-red-400 hover:text-red-600 font-bold">✕ Remove</button>
                {[['Role', 'role'], ['Company', 'company'], ['Period', 'period']].map(([label, key]) => (
                  <label key={key} className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-gray-500">{label}</span>
                    <input className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-300 bg-white" value={item[key]} onChange={e => update(i, key, e.target.value)} />
                  </label>
                ))}
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-gray-500">Description</span>
                  <textarea rows={2} className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-300 resize-none bg-white" value={item.description} onChange={e => update(i, 'description', e.target.value)} />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-gray-500">Tags (comma-separated)</span>
                  <input className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-300 bg-white" value={item.tagsStr} onChange={e => update(i, 'tagsStr', e.target.value)} />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-gray-500">Side</span>
                  <select className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-300 bg-white" value={item.side} onChange={e => update(i, 'side', e.target.value)}>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </label>
              </div>
            ))}
            <button onClick={addItem} className="rounded-xl border-2 border-dashed border-orange-300 py-3 text-sm text-orange-500 hover:bg-orange-50 transition">+ Add Entry</button>
          </div>
          <div className="mt-6 flex gap-3">
            <button onClick={save} className="flex-1 rounded-xl bg-orange-500 py-3 text-sm font-bold text-white hover:bg-orange-600 transition">Save</button>
            <button onClick={onClose} className="flex-1 rounded-xl border border-gray-200 py-3 text-sm text-gray-500 hover:bg-gray-50 transition">Cancel</button>
          </div>
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
      {modal?.section === 'hero' && <HeroModal hero={data.hero} onSave={v => updateSection('hero', v)} onClose={() => setModal(null)} />}
      {modal?.section === 'about' && <AboutModal about={data.about} onSave={v => updateSection('about', v)} onClose={() => setModal(null)} />}
      {modal?.section === 'experience' && <ExperienceModal experience={data.experience} onSave={v => updateArray('experience', v)} onClose={() => setModal(null)} />}
    </div>
  )
}

export default Home
