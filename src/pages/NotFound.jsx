import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-950 text-white">
      <span className="text-6xl">404</span>
      <p className="text-gray-400">Page not found.</p>
      <Link to="/" className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold hover:bg-indigo-500 transition">
        ← Back home
      </Link>
    </div>
  )
}
