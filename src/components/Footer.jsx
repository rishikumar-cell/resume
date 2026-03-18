import { motion } from 'framer-motion'

const navLinks = [
  { name: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Blogs', id: 'blogs' },
  { label: 'Contact', id: 'contact' },
]


// const navLinks = [
//   { name: 'About', id: 'about' },
//   { name: 'Skills', id: 'skills' },
//   { name: 'Projects', id: 'projects' },
//   { name: 'Blogs', id: 'blog' },
//   { name: 'Experience', id: 'experience' },
//   //{ name: 'Contact', id: 'contact' },
// ]

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/rishikumar-cell' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/chvenukumar' },
  { label: 'Twitter', href: 'https://x.com/your-handle' },
  { label: 'Leetcode', href: 'https://leetcode.com/u/rishi_kumar18' },
  { label: 'GeeksForGeeks', href: 'https://www.geeksforgeeks.org/profile/rishikummhyi?tab=overview' },
]

// Decorative floating dot
function Dot({ style }) {
  return (
    <span
      className="pointer-events-none absolute h-1 w-1 rounded-full bg-white/20"
      style={style}
    />
  )
}

const dots = [
  { top: '18%', left: '8%' }, { top: '35%', left: '15%' }, { top: '60%', left: '6%' },
  { top: '75%', left: '22%' }, { top: '20%', left: '50%' }, { top: '55%', left: '45%' },
  { top: '80%', left: '55%' }, { top: '15%', left: '78%' }, { top: '45%', left: '85%' },
  { top: '70%', left: '92%' }, { top: '30%', left: '96%' },
]

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#111] pt-20 pb-10">
      {/* Decorative dots */}
      {dots.map((d, i) => (
        <Dot key={i} style={d} />
      ))}

      <div className="relative mx-auto max-w-5xl px-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand col */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <a id="home" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ff6a00]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </span>
              <span className="text-base font-semibold text-white">Chittimalla Venu kumar</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
              Building scalable software, high-performance applications, and modern digital experiences.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-wider text-gray-500">Navigation</p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors duration-150 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-wider text-gray-500">Socials</p>
            <ul className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-gray-400 transition-colors duration-150 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / CTA */}
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-wider text-gray-500">Chittimalla Venu Kumar</p>
            <p className="text-sm text-gray-400">Talent Doesn't Matter! Consistency Matters!</p>
            <motion.a
              id="contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="mt-4 inline-flex items-center gap-2.5 rounded-full bg-[#ff6a00] px-5 py-2.5 text-sm font-semibold text-white shadow-md"
            >
              Be Productive 
            
            </motion.a>
          </div>

        </div>

        {/* Divider */}
        <div className="mt-16 border-t border-white/10" />

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-gray-500">
            Copyright {new Date().getFullYear()} to Chittimalla Venu Kumar
          </p>
          <p className="text-sm text-gray-500">
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
