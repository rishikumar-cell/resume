import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import useAIMLAuth from '../hooks/useAIMLAuth'
import useAIMLJourney from '../hooks/useAIMLJourney'

// ── Palette (matches home page) ───────────────────────────────────────────────
const ORANGE  = '#ff6a00'   // primary accent — same as portfolio
const TEAL    = '#10b981'   // completed
const AMBER   = '#f59e0b'   // in-progress
const INDIGO  = '#6366f1'   // planned / admin
const PINK    = '#ec4899'   // milestone
const SKY     = '#0ea5e9'   // framework

const STATUS_META = {
  completed:     { color: TEAL,   bg: '#f0fdf4', border: '#bbf7d0', label: 'Completed'   },
  'in-progress': { color: AMBER,  bg: '#fffbeb', border: '#fde68a', label: 'In Progress' },
  planned:       { color: INDIGO, bg: '#eef2ff', border: '#c7d2fe', label: 'Planned'     },
  start:         { color: PINK,   bg: '#fdf2f8', border: '#fbcfe8', label: 'Milestone'   },
}

const SKILL_CAT_COLOR = {
  Core:           ORANGE,
  Framework:      SKY,
  Specialization: PINK,
  GenAI:          INDIGO,
  Deployment:     TEAL,
}

const RESOURCE_ICON  = { course:'🎓', book:'📖', paper:'📄', video:'▶️', blog:'✍️' }
const MILESTONE_ICON = { start:'🚀', course:'🎓', project:'💻', achievement:'🏆', skill:'⚡' }

// ── Form schema per section ───────────────────────────────────────────────────
const FORM_SCHEMA = {
  milestones: [
    { key:'date',        label:'Date (YYYY-MM)',         type:'text',     required:true, placeholder:'2026-03' },
    { key:'title',       label:'Title',                  type:'text',     required:true },
    { key:'description', label:'Description',            type:'textarea', required:true },
    { key:'type',        label:'Type',                   type:'select',   options:['start','course','project','achievement','skill'] },
    { key:'status',      label:'Status',                 type:'select',   options:['completed','in-progress','planned'] },
    { key:'tags',        label:'Tags (comma-separated)', type:'text',     isArray:true, sep:',' },
  ],
  projects: [
    { key:'title',       label:'Title',                           type:'text',     required:true },
    { key:'description', label:'Description',                     type:'textarea', required:true },
    { key:'category',    label:'Category',                        type:'text',     placeholder:'NLP, CV, GenAI…' },
    { key:'techStack',   label:'Tech Stack (comma-separated)',     type:'text',     isArray:true, sep:',' },
    { key:'status',      label:'Status',                          type:'select',   options:['completed','in-progress','planned'] },
    { key:'progress',    label:'Progress %',                      type:'number',   min:0, max:100 },
    { key:'githubUrl',   label:'GitHub URL',                      type:'text' },
    { key:'startDate',   label:'Start Date (YYYY-MM)',            type:'text' },
    { key:'endDate',     label:'End Date (blank if ongoing)',      type:'text' },
    { key:'highlights',  label:'Highlights (one per line)',        type:'textarea', isArray:true, sep:'\n' },
  ],
  skills: [
    { key:'name',     label:'Skill Name',         type:'text',   required:true },
    { key:'category', label:'Category',            type:'text',   placeholder:'Core, Framework, GenAI…' },
    { key:'level',    label:'Proficiency (0–100)', type:'number', min:0, max:100 },
  ],
  resources: [
    { key:'title',    label:'Title',             type:'text',    required:true },
    { key:'type',     label:'Type',              type:'select',  options:['course','book','paper','video','blog'] },
    { key:'provider', label:'Provider / Author', type:'text' },
    { key:'url',      label:'URL',               type:'text' },
    { key:'status',   label:'Status',            type:'select',  options:['completed','in-progress','planned'] },
    { key:'rating',   label:'Rating (1–5)',      type:'number',  min:1, max:5 },
    { key:'notes',    label:'Notes',             type:'textarea' },
  ],
  goals: [
    { key:'title',       label:'Title',                         type:'text',     required:true },
    { key:'description', label:'Description',                   type:'textarea' },
    { key:'deadline',    label:'Deadline (YYYY-MM)',            type:'text' },
    { key:'progress',    label:'Progress %',                    type:'number',   min:0, max:100 },
    { key:'status',      label:'Status',                        type:'select',   options:['in-progress','planned','completed'] },
    { key:'milestones',  label:'Sub-milestones (one per line)', type:'textarea', isArray:true, sep:'\n' },
  ],
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function daysSince(dateStr) {
  const [y, m] = dateStr.split('-').map(Number)
  return Math.max(0, Math.floor((Date.now() - new Date(y, (m || 1) - 1, 1)) / 86400000))
}
function statusMeta(s) { return STATUS_META[s] || STATUS_META.planned }

// ── Animated dot-mesh hero background (matches home Hero) ────────────────────
function DotMeshBg() {
  const nodes = [[8,15],[35,20],[62,18],[88,22],[20,55],[48,60],[75,50],[92,60],[15,82],[50,85],[80,78]]
  const edges = [[0,2],[0,1],[1,3],[2,4],[3,5],[4,5],[5,6],[6,7],[1,8],[3,9],[5,9],[9,10]]
  return (
    <>
      <div className="pointer-events-none absolute inset-0"
        style={{ backgroundImage:'radial-gradient(circle, #b8a898 1px, transparent 1px)', backgroundSize:'32px 32px', opacity:0.45 }}
      />
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
        viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {nodes.map(([cx,cy],i) => (
          <motion.circle key={i} cx={cx} cy={cy} r="1.6" fill={ORANGE}
            initial={{ opacity:0 }} animate={{ opacity:[0,1,0.4,1,0] }}
            transition={{ duration:3+i*0.3, delay:i*0.22, repeat:Infinity }} />
        ))}
        {edges.map(([a,b],i) => (
          <motion.line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
            stroke={ORANGE} strokeWidth="0.3"
            initial={{ opacity:0 }} animate={{ opacity:[0,0.5,0.15,0.5,0] }}
            transition={{ duration:4+i*0.35, delay:i*0.18, repeat:Infinity }} />
        ))}
      </svg>
    </>
  )
}

// ── AnimCounter ───────────────────────────────────────────────────────────────
function AnimCounter({ to, duration = 1.4 }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  useEffect(() => {
    if (!inView) return
    let start = 0
    const steps = 40
    const inc = Math.ceil(to / steps)
    const t = setInterval(() => {
      start += inc
      if (start >= to) { setVal(to); clearInterval(t) }
      else setVal(start)
    }, (duration * 1000) / steps)
    return () => clearInterval(t)
  }, [inView, to, duration])
  return <span ref={ref}>{val}</span>
}

// ── ProgressBar ───────────────────────────────────────────────────────────────
function ProgressBar({ value = 0, color = ORANGE }) {
  return (
    <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-100">
      <motion.div className="absolute left-0 top-0 h-full rounded-full" style={{ background: color }}
        initial={{ width: 0 }} whileInView={{ width: `${value}%` }}
        viewport={{ once: true, amount: 0.5 }} transition={{ duration: 1.2, ease: 'easeOut' }} />
    </div>
  )
}

// ── CircleProgress ────────────────────────────────────────────────────────────
function CircleProgress({ pct = 0, size = 80, stroke = 6, color = ORANGE, children }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const dash = circ - (Math.min(100, pct) / 100) * circ
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#f1f5f9" strokeWidth={stroke} />
        <motion.circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color}
          strokeWidth={stroke} strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }} whileInView={{ strokeDashoffset: dash }}
          viewport={{ once: true, amount: 0.5 }} transition={{ duration: 1.6, ease: 'easeOut' }}
          strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  )
}

// ── Section Title ─────────────────────────────────────────────────────────────
function SectionTitle({ icon, children }) {
  return (
    <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, amount:0.4 }} transition={{ duration:0.5 }}
      className="mb-10 flex items-center gap-3"
    >
      <span className="text-xl">{icon}</span>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">{children}</h2>
      <div className="ml-4 h-px flex-1 bg-gray-200" />
    </motion.div>
  )
}

// ── Status Badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const m = statusMeta(status)
  return (
    <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold border"
      style={{ color: m.color, background: m.bg, borderColor: m.border }}>
      {m.label}
    </span>
  )
}

function Tag({ children }) {
  return <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">{children}</span>
}

// ── Admin Buttons ─────────────────────────────────────────────────────────────
function AdminButtons({ onEdit, onDelete }) {
  return (
    <div className="mt-3 flex gap-2">
      <button onClick={onEdit}
        className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 transition hover:bg-indigo-100">
        ✏️ Edit
      </button>
      <button onClick={onDelete}
        className="rounded-lg border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-500 transition hover:bg-red-100">
        🗑️ Delete
      </button>
    </div>
  )
}

function AddButton({ label, onClick }) {
  return (
    <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }} onClick={onClick}
      className="flex items-center gap-2 rounded-xl border border-dashed border-orange-300 bg-orange-50 px-4 py-2.5 text-sm font-medium text-[#ff6a00] transition hover:border-orange-400 hover:bg-orange-100">
      <span className="text-lg leading-none">+</span> {label}
    </motion.button>
  )
}

// ── Login Modal ───────────────────────────────────────────────────────────────
function LoginModal({ onLogin, onClose }) {
  const [pw, setPw]       = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (onLogin(pw)) { onClose() }
    else { setError(true); setShake(true); setTimeout(() => setShake(false), 500) }
  }
  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={onClose}>
      <motion.div
        initial={{ scale:0.93, opacity:0, y:20 }}
        animate={shake ? { scale:1, opacity:1, y:0, x:[-8,8,-6,6,0] } : { scale:1, opacity:1, y:0, x:0 }}
        exit={{ scale:0.93, opacity:0, y:20 }}
        transition={{ duration: shake ? 0.35 : 0.28, ease:'easeOut' }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl"
      >
        <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-orange-200/50 blur-3xl" />
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50 text-3xl">🔐</div>
        </div>
        <h2 className="mb-1 text-center text-xl font-bold text-slate-900">Admin Access</h2>
        <p className="mb-6 text-center text-sm text-gray-500">Enter your password to manage the journey</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input type="password" value={pw} autoFocus
              onChange={e => { setPw(e.target.value); setError(false) }}
              placeholder="Password"
              className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 outline-none transition focus:ring-2 ${
                error ? 'border-red-300 bg-red-50 focus:ring-red-200' : 'border-gray-200 bg-gray-50 focus:border-orange-300 focus:ring-orange-100'
              }`}
            />
            {error && <p className="mt-1.5 text-xs text-red-500">Incorrect password. Try again.</p>}
          </div>
          <motion.button type="submit" whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
            className="w-full rounded-xl py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
            style={{ background: ORANGE }}>
            Unlock Admin Mode
          </motion.button>
          <button type="button" onClick={onClose}
            className="w-full rounded-xl py-2 text-sm text-gray-400 transition hover:text-gray-600">
            Cancel
          </button>
        </form>
      </motion.div>
    </motion.div>
  )
}

// ── Item Form Modal ───────────────────────────────────────────────────────────
function ItemFormModal({ section, item, onSave, onClose }) {
  const schema = FORM_SCHEMA[section] || []
  const isEdit = !!item
  const initState = () => {
    const s = {}
    schema.forEach(({ key, type, isArray, sep, options, min }) => {
      const raw = item?.[key]
      if (isArray) s[key] = Array.isArray(raw) ? raw.join(sep === '\n' ? '\n' : ', ') : (raw || '')
      else if (type === 'number') s[key] = raw ?? (min ?? 0)
      else if (type === 'select') s[key] = raw || options?.[0] || ''
      else s[key] = raw || ''
    })
    return s
  }
  const [form, setForm]     = useState(initState)
  const [errors, setErrors] = useState({})
  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    schema.forEach(({ key, required }) => { if (required && !String(form[key]||'').trim()) errs[key] = 'Required' })
    if (Object.keys(errs).length) { setErrors(errs); return }
    const finalData = {}
    schema.forEach(({ key, type, isArray, sep }) => {
      if (isArray) {
        const raw = String(form[key] || '')
        finalData[key] = raw.split(sep === '\n' ? /\r?\n/ : ',').map(s => s.trim()).filter(Boolean)
      } else if (type === 'number') finalData[key] = Number(form[key])
      else finalData[key] = form[key]
    })
    onSave(finalData); onClose()
  }
  const LABELS = { milestones:'Milestone', projects:'Project', skills:'Skill', resources:'Resource', goals:'Goal' }
  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={onClose}>
      <motion.div initial={{ scale:0.94, opacity:0, y:24 }} animate={{ scale:1, opacity:1, y:0 }}
        exit={{ scale:0.94, opacity:0, y:24 }} transition={{ duration:0.28, ease:'easeOut' }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-gray-200 bg-white p-7 shadow-2xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{isEdit ? '✏️ Edit' : '＋ Add'} {LABELS[section]}</h3>
            <p className="text-xs text-gray-400 mt-0.5">Fields marked * are required</p>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {schema.map(({ key, label, type, required, options, placeholder, min, max }) => (
            <div key={key}>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                {label}{required && <span className="ml-0.5 text-red-500">*</span>}
              </label>
              {type === 'select' ? (
                <select value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100">
                  {options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : type === 'textarea' ? (
                <textarea value={form[key]} placeholder={placeholder} rows={3}
                  onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                  className={`w-full resize-none rounded-xl border px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 ${errors[key] ? 'border-red-300 bg-red-50 focus:ring-red-100' : 'border-gray-200 bg-gray-50 focus:border-orange-300 focus:ring-orange-100'}`} />
              ) : (
                <input type={type} value={form[key]} min={min} max={max} placeholder={placeholder}
                  onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                  className={`w-full rounded-xl border px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 ${errors[key] ? 'border-red-300 bg-red-50 focus:ring-red-100' : 'border-gray-200 bg-gray-50 focus:border-orange-300 focus:ring-orange-100'}`} />
              )}
              {errors[key] && <p className="mt-1 text-xs text-red-500">{errors[key]}</p>}
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <motion.button type="submit" whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
              className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-white transition hover:opacity-90" style={{ background: ORANGE }}>
              {isEdit ? 'Save Changes' : 'Add Entry'}
            </motion.button>
            <button type="button" onClick={onClose}
              className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm text-gray-500 hover:text-slate-900 transition">
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, color }) {
  return (
    <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, amount:0.4 }} transition={{ duration:0.5 }}
      whileHover={{ y:-4, transition:{ duration:0.2 } }}
      className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
    >
      <span className="pointer-events-none absolute -top-6 -right-6 h-20 w-20 rounded-full opacity-10 blur-2xl" style={{ background: color }} />
      <span className="mb-3 block text-2xl">{icon}</span>
      <p className="text-3xl font-bold text-slate-900 tabular-nums"><AnimCounter to={value} /></p>
      <p className="mt-1 text-xs text-gray-500">{label}</p>
    </motion.div>
  )
}

// ── Timeline Section ──────────────────────────────────────────────────────────
function TimelineSection({ milestones, isAdmin, onEdit, onDelete, onAdd }) {
  const sorted = [...milestones].sort((a, b) => a.date.localeCompare(b.date))
  return (
    <section className="mb-20">
      <SectionTitle icon="🗓️">Learning Timeline</SectionTitle>
      <div className="relative ml-4">
        <div className="absolute left-4 top-0 h-full w-px bg-gray-200" />
        <div className="space-y-7">
          {sorted.map((ms, idx) => {
            const m = statusMeta(ms.status)
            const icon = MILESTONE_ICON[ms.type] || '📌'
            return (
              <motion.div key={ms.id}
                initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true, amount:0.3 }} transition={{ duration:0.5, delay: idx * 0.06 }}
                className="relative pl-12"
              >
                <motion.div initial={{ scale:0 }} whileInView={{ scale:1 }} viewport={{ once:true }}
                  transition={{ duration:0.35, delay: idx * 0.06 + 0.15 }}
                  className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm bg-white shadow-sm"
                  style={{ borderColor: m.color }}>
                  {icon}
                </motion.div>
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-gray-400">{ms.date}</span>
                    <StatusBadge status={ms.status} />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">{ms.title}</h3>
                  <p className="mt-1 text-sm text-gray-500 leading-relaxed">{ms.description}</p>
                  {ms.tags?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">{ms.tags.map(t => <Tag key={t}>{t}</Tag>)}</div>
                  )}
                  {isAdmin && <AdminButtons onEdit={() => onEdit(ms)} onDelete={() => onDelete(ms.id)} />}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
      {isAdmin && <div className="mt-6 ml-12"><AddButton label="Add Milestone" onClick={onAdd} /></div>}
    </section>
  )
}

// ── Skills Section ────────────────────────────────────────────────────────────
function SkillsSection({ skills, isAdmin, onEdit, onDelete, onAdd }) {
  const [activeTab, setActiveTab] = useState('All')
  const categories = ['All', ...Array.from(new Set(skills.map(s => s.category))).sort()]
  const filtered = activeTab === 'All' ? skills : skills.filter(s => s.category === activeTab)
  return (
    <section className="mb-20">
      <SectionTitle icon="💡">Skills Arsenal</SectionTitle>
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveTab(cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${activeTab === cat ? 'text-white shadow-md' : 'border border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-slate-900'}`}
            style={activeTab === cat ? { background: ORANGE } : {}}>
            {cat}
          </button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((sk, idx) => {
          const col = SKILL_CAT_COLOR[sk.category] || ORANGE
          return (
            <motion.div key={sk.id}
              initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, amount:0.3 }} transition={{ duration:0.4, delay: idx * 0.04 }}
              className="rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{sk.name}</p>
                  <p className="text-xs font-medium" style={{ color: col }}>{sk.category}</p>
                </div>
                <span className="text-sm font-bold" style={{ color: col }}>{sk.level}%</span>
              </div>
              <ProgressBar value={sk.level} color={col} />
              {isAdmin && <AdminButtons onEdit={() => onEdit(sk)} onDelete={() => onDelete(sk.id)} />}
            </motion.div>
          )
        })}
      </div>
      {isAdmin && <div className="mt-6"><AddButton label="Add Skill" onClick={onAdd} /></div>}
    </section>
  )
}

// ── Projects Section ──────────────────────────────────────────────────────────
function ProjectsSection({ projects, isAdmin, onEdit, onDelete, onAdd }) {
  const [filter, setFilter] = useState('All')
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category))).sort()]
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)
  return (
    <section className="mb-20">
      <SectionTitle icon="🚀">AI/ML Projects</SectionTitle>
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${filter === c ? 'text-white shadow-md' : 'border border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-slate-900'}`}
            style={filter === c ? { background: ORANGE } : {}}>
            {c}
          </button>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((proj, idx) => {
          const m = statusMeta(proj.status)
          return (
            <motion.div key={proj.id}
              initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, amount:0.2 }} transition={{ duration:0.5, delay: idx * 0.08 }}
              whileHover={{ y:-5, transition:{ duration:0.2 } }}
              className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.07)]"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <p className="text-xs font-semibold mb-1" style={{ color: ORANGE }}>{proj.category}</p>
                  <h3 className="text-base font-bold text-slate-900">{proj.title}</h3>
                </div>
                <StatusBadge status={proj.status} />
              </div>
              <p className="mb-4 flex-1 text-sm text-gray-500 leading-relaxed">{proj.description}</p>
              <div className="mb-4">
                <div className="mb-1.5 flex justify-between text-xs text-gray-400">
                  <span>Progress</span><span style={{ color: m.color }}>{proj.progress}%</span>
                </div>
                <ProgressBar value={proj.progress} color={m.color} />
              </div>
              <div className="mb-4 flex flex-wrap gap-1.5">
                {proj.techStack?.map(t => <Tag key={t}>{t}</Tag>)}
              </div>
              {proj.highlights?.length > 0 && (
                <ul className="mb-4 space-y-1">
                  {proj.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                      <span className="mt-0.5 shrink-0 text-emerald-500">✓</span>{h}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-400">{proj.startDate}{proj.endDate ? ` → ${proj.endDate}` : ' → Present'}</span>
                {proj.githubUrl && (
                  <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600 transition hover:border-gray-300 hover:text-slate-900">
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                    GitHub
                  </a>
                )}
              </div>
              {isAdmin && <AdminButtons onEdit={() => onEdit(proj)} onDelete={() => onDelete(proj.id)} />}
            </motion.div>
          )
        })}
      </div>
      {isAdmin && <div className="mt-6"><AddButton label="Add Project" onClick={onAdd} /></div>}
    </section>
  )
}

// ── Resources Section ─────────────────────────────────────────────────────────
function ResourcesSection({ resources, isAdmin, onEdit, onDelete, onAdd }) {
  return (
    <section className="mb-20">
      <SectionTitle icon="📚">Learning Resources</SectionTitle>
      <div className="space-y-3">
        {resources.map((res, idx) => (
          <motion.div key={res.id}
            initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, amount:0.3 }} transition={{ duration:0.4, delay: idx * 0.06 }}
            className="flex flex-wrap items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:flex-nowrap"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 text-xl">
              {RESOURCE_ICON[res.type] || '📌'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-sm font-semibold text-slate-900">{res.title}</h3>
                <StatusBadge status={res.status} />
              </div>
              <p className="text-xs text-gray-400">{res.provider}</p>
              {res.notes && <p className="mt-1.5 text-xs text-gray-500 italic">"{res.notes}"</p>}
              {isAdmin && <AdminButtons onEdit={() => onEdit(res)} onDelete={() => onDelete(res.id)} />}
            </div>
            <div className="flex shrink-0 flex-col items-end gap-2">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <span key={s} className={`text-sm ${s <= (res.rating||0) ? 'text-amber-400' : 'text-gray-200'}`}>★</span>
                ))}
              </div>
              {res.url && (
                <a href={res.url} target="_blank" rel="noopener noreferrer"
                  className="text-xs underline-offset-2 hover:underline transition" style={{ color: ORANGE }}>
                  View ↗
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      {isAdmin && <div className="mt-6"><AddButton label="Add Resource" onClick={onAdd} /></div>}
    </section>
  )
}

// ── Goals Section ─────────────────────────────────────────────────────────────
function GoalsSection({ goals, isAdmin, onEdit, onDelete, onAdd }) {
  return (
    <section className="mb-20">
      <SectionTitle icon="🎯">Goals & Roadmap</SectionTitle>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal, idx) => {
          const m = statusMeta(goal.status)
          return (
            <motion.div key={goal.id}
              initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, amount:0.2 }} transition={{ duration:0.5, delay: idx * 0.1 }}
              whileHover={{ y:-5, transition:{ duration:0.2 } }}
              className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.07)]"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <StatusBadge status={goal.status} />
                  <h3 className="mt-2 text-base font-bold text-slate-900 leading-snug">{goal.title}</h3>
                </div>
                <CircleProgress pct={goal.progress} size={72} stroke={6} color={m.color}>
                  <span className="text-xs font-bold" style={{ color: m.color }}>{goal.progress}%</span>
                </CircleProgress>
              </div>
              <p className="mb-4 flex-1 text-sm text-gray-500 leading-relaxed">{goal.description}</p>
              {goal.deadline && (
                <p className="mb-3 text-xs text-gray-400">🗓 Target: <span className="font-medium text-gray-600">{goal.deadline}</span></p>
              )}
              {goal.milestones?.length > 0 && (
                <ul className="mt-auto space-y-1.5 border-t border-gray-100 pt-3">
                  {goal.milestones.map((sub, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                      <span className="mt-0.5 shrink-0 text-orange-400">◇</span>{sub}
                    </li>
                  ))}
                </ul>
              )}
              {isAdmin && <AdminButtons onEdit={() => onEdit(goal)} onDelete={() => onDelete(goal.id)} />}
            </motion.div>
          )
        })}
      </div>
      {isAdmin && <div className="mt-6"><AddButton label="Add Goal" onClick={onAdd} /></div>}
    </section>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AIMLJourney() {
  useEffect(() => { document.title = 'AI/ML Journey — Venu Kumar Chittimalla' }, [])

  const { isAdmin, login, logout } = useAIMLAuth()
  const { data, addItem, editItem, deleteItem, resetToDefault } = useAIMLJourney()

  const [showLogin, setShowLogin] = useState(false)
  const [editModal, setEditModal] = useState(null)
  const [addModal, setAddModal]   = useState(null)

  const openEdit = (section, item) => setEditModal({ section, item })
  const openAdd  = (section)       => setAddModal({ section })
  const handleDelete = (section, id) => { if (window.confirm('Delete this entry?')) deleteItem(section, id) }
  const handleSave = (section, item, formData) => {
    if (item) editItem(section, item.id, formData)
    else addItem(section, formData)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* Admin banner */}
      <AnimatePresence>
        {isAdmin && (
          <motion.div initial={{ opacity:0, y:-40 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-40 }}
            className="sticky top-0 z-40 flex items-center justify-between border-b border-orange-200 bg-orange-50 px-6 py-2 text-xs font-medium text-orange-700">
            <span>🛡️ Admin Mode Active — you can add, edit and delete entries</span>
            <div className="flex gap-3">
              <button onClick={() => { if (window.confirm('Reset all data to defaults?')) resetToDefault() }}
                className="rounded-lg border border-orange-300 bg-white px-3 py-1 text-orange-600 transition hover:bg-orange-50">
                Reset Data
              </button>
              <button onClick={logout}
                className="rounded-lg border border-orange-300 bg-white px-3 py-1 text-orange-600 transition hover:bg-orange-50">
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top bar */}
      <div className="sticky top-0 z-30 border-b border-gray-100 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-slate-900">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7-7 7 7 7"/>
            </svg>
            Back to Portfolio
          </Link>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-gray-400">Live Journey Tracker</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden py-24 text-center" style={{ background: '#f5f0e9' }}>
        <DotMeshBg />
        {['Machine Learning','NLP','Deep Learning','Computer Vision','LLMs','GenAI'].map((tag, i) => (
          <motion.span key={tag}
            className="pointer-events-none absolute hidden rounded-full border border-orange-200 bg-white/70 px-3 py-1 text-xs text-gray-500 shadow-sm md:block"
            style={{ top:`${15+(i%3)*26}%`, left: i<3 ? `${4+i*7}%` : undefined, right: i>=3 ? `${3+(i-3)*9}%` : undefined }}
            initial={{ opacity:0 }} animate={{ opacity:[0,0.9,0.6,0.9], y:[0,-5,0,-5,0] }}
            transition={{ duration:4+i*0.5, delay:i*0.4, repeat:Infinity }}>
            {tag}
          </motion.span>
        ))}
        <div className="relative mx-auto max-w-3xl px-6">
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-semibold text-[#ff6a00]">
              🤖 AI/ML Engineer in the Making
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              My{' '}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${ORANGE}, ${PINK})` }}>
                AI/ML
              </span>{' '}
              Journey
            </h1>
            <p className="mt-4 text-lg text-gray-600">{data.meta.subtitle}</p>
            <p className="mt-2 text-sm italic text-gray-400">{data.meta.tagline}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {[
                { label:'Days Learning',  value: daysSince(data.meta.startDate), color: ORANGE },
                { label:'Milestones Hit', value: data.milestones.filter(m=>m.status==='completed').length, color: TEAL },
                { label:'ML Projects',    value: data.projects.length, color: PINK },
              ].map(({ label, value, color }) => (
                <div key={label} className="rounded-2xl border border-gray-200 bg-white px-6 py-3 text-center shadow-sm">
                  <p className="text-2xl font-bold" style={{ color }}><AnimCounter to={value} /></p>
                  <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats row */}
      <section className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard icon="🚀" label="Total Projects"      value={data.projects.length}                                    color={ORANGE} />
          <StatCard icon="💡" label="Skills Tracked"      value={data.skills.length}                                      color={TEAL}   />
          <StatCard icon="📚" label="Resources Completed" value={data.resources.filter(r=>r.status==='completed').length} color={PINK}   />
          <StatCard icon="🎯" label="Active Goals"        value={data.goals.filter(g=>g.status==='in-progress').length}   color={AMBER}  />
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-6 pb-24">
        <TimelineSection  milestones={data.milestones} isAdmin={isAdmin}
          onEdit={item => openEdit('milestones', item)} onDelete={id => handleDelete('milestones', id)} onAdd={() => openAdd('milestones')} />
        <SkillsSection    skills={data.skills}         isAdmin={isAdmin}
          onEdit={item => openEdit('skills', item)}     onDelete={id => handleDelete('skills', id)}     onAdd={() => openAdd('skills')} />
        <ProjectsSection  projects={data.projects}     isAdmin={isAdmin}
          onEdit={item => openEdit('projects', item)}   onDelete={id => handleDelete('projects', id)}   onAdd={() => openAdd('projects')} />
        <ResourcesSection resources={data.resources}   isAdmin={isAdmin}
          onEdit={item => openEdit('resources', item)}  onDelete={id => handleDelete('resources', id)}  onAdd={() => openAdd('resources')} />
        <GoalsSection     goals={data.goals}           isAdmin={isAdmin}
          onEdit={item => openEdit('goals', item)}      onDelete={id => handleDelete('goals', id)}      onAdd={() => openAdd('goals')} />
      </div>

      {/* Floating admin lock */}
      {!isAdmin && (
        <motion.button
          initial={{ opacity:0, scale:0 }} animate={{ opacity:1, scale:1 }}
          transition={{ delay:1.2, duration:0.4, type:'spring' }}
          whileHover={{ scale:1.1 }} whileTap={{ scale:0.95 }}
          onClick={() => setShowLogin(true)} title="Admin login"
          className="fixed bottom-8 right-8 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-xl shadow-lg transition hover:border-orange-300 hover:shadow-xl">
          🔒
        </motion.button>
      )}

      {/* Modals */}
      <AnimatePresence>
        {showLogin && <LoginModal onLogin={login} onClose={() => setShowLogin(false)} />}
        {(editModal || addModal) && (
          <ItemFormModal
            section={(editModal || addModal).section}
            item={editModal?.item || null}
            onSave={formData => handleSave((editModal || addModal).section, editModal?.item || null, formData)}
            onClose={() => { setEditModal(null); setAddModal(null) }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
