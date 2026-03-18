import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const navLinks = [
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Projects', id: 'projects' },
  { name: 'Blogs', id: 'blog' },
  { name: 'Experience', id: 'experience' },
  //{ name: 'Contact', id: 'contact' },
]
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
//alex
function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-sm'
          : 'bg-white border-b border-gray-100'
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-5xl items-center justify-between px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a href="#home" onClick={e => { e.preventDefault(); scrollTo('home') }} className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff6a00]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </span>
          <span className="text-base font-semibold text-slate-900 tracking-tight">Venu Kumar Chittimalla</span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.id}`}
              onClick={e => { e.preventDefault(); scrollTo(link.id) }}
              className="text-sm font-medium text-slate-600 transition-colors duration-150 hover:text-slate-900"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/aiml-journey"
            className="flex items-center gap-1.5 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-4 py-2 text-xs font-semibold text-indigo-500 transition hover:bg-indigo-500/20"
          >
            🤖 AI/ML Journey
          </Link>
   
          <motion.a
            href="#contact"
            onClick={e => { e.preventDefault(); scrollTo('contact') }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white shadow-md"
          >
            Contact
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setIsOpen((o) => !o)}
          className="flex flex-col items-center justify-center gap-1.5 rounded-lg p-2 md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-5 bg-slate-800 transition-transform duration-200 ${isOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-5 bg-slate-800 transition-opacity duration-200 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 bg-slate-800 transition-transform duration-200 ${isOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="border-t border-gray-200/60 bg-white/80 backdrop-blur-lg px-6 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.id}`}
                onClick={e => { e.preventDefault(); scrollTo(link.id); setIsOpen(false) }}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                {link.name}
              </a>
            ))}
            <Link
              to="/aiml-journey"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
            >
               AI/ML Journey
            </Link>
            <Link
              to="/synapic-ai"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-purple-600 transition hover:bg-purple-50"
            >
              SynapiC AI
            </Link>
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); scrollTo('contact'); setIsOpen(false) }}
              className="mt-2 flex items-center justify-center gap-3 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white"
            >
              Contact
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

export default Navbar
