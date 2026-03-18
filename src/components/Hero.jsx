import { motion } from 'framer-motion'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const floatUp   = { animate: { y: [-8, 6, -8],   transition: { duration: 6,   repeat: Infinity, ease: 'easeInOut' } } }
const floatDown = { animate: { y: [6, -8, 6],     transition: { duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 1 } } }
const floatMid  = { animate: { y: [-4, 10, -4],   transition: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 } } }

function Hero({ hero }) {
  if (!hero) return <div className="text-red-500 p-8">Hero data missing</div>
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{ background: hero?.bg || '#f5f0e9' }}
    >
      {/* Dot mesh background */}
      {hero?.dotMesh !== false && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, ${hero?.meshColor || '#b8a898'} 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            opacity: 0.55,
          }}
        />
      )}
      {/* Subtle SVG wave mesh overlay */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="meshFade" cx="65%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#7c6a54" stopOpacity="1" />
            <stop offset="100%" stopColor="#7c6a54" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#meshFade)" />
      </svg>

      {/* Content */}
      <div className="relative mx-auto w-full max-w-5xl px-8 py-20">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="mb-8 flex items-center gap-3">
              <span className="h-px w-10 bg-[#ff6a00]" />
              <span className="text-xs font-bold uppercase text-gray-500">
               Computer Science Engineer
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={fadeUp} className="space-y-1">
              <p className="text-4xl font-light leading-tight tracking-tight text-slate-400 xl:text-5xl">
                Hi, I'm
              </p>
              <p className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 xl:text-5xl">
                Venu Kumar Chittimalla
    </p>
              
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-sm border-l-2 border-orange-300 pl-4 text-sm leading-relaxed text-gray-600"
            >
              Building Systems That Never Fail!
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
              <motion.a
                href="#projects"
                onClick={e => { e.preventDefault(); scrollTo('projects') }}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
                whileHover={{ scale: 1.05, backgroundColor: '#ff6a00' }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.18 }}
              >
                View My Work
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
              <motion.a
                href="#contact"
                onClick={e => { e.preventDefault(); scrollTo('contact') }}
                className="inline-flex items-center gap-2 rounded-full border border-gray-400 bg-transparent px-6 py-3 text-sm font-semibold text-slate-700"
                whileHover={{ scale: 1.05, borderColor: '#ff6a00', color: '#ff6a00' }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.18 }}
              >
                Let's Connect Together
              </motion.a>
            </motion.div>

            {/* Divider */}
            <motion.div variants={fadeUp} className="mt-10 h-px w-64 bg-gradient-to-r from-orange-300 to-transparent" />

            {/* Socials + availability */}
            <motion.div variants={fadeUp} className="mt-6 flex items-center gap-5">
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Open to work
              </span>
              <span className="h-4 w-px bg-gray-300" />
              {[
                { label: 'GitHub',   href: 'https://github.com',   d: 'M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.654 1.652.243 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.216.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z' },
                { label: 'LinkedIn', href: 'https://linkedin.com', d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
              ].map(s => (
                <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label} className="text-gray-500"
                  whileHover={{ scale: 1.2, color: '#ff6a00' }} whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.d} />
                  </svg>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT â€” quote chat cards */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-start gap-5 pl-4 lg:pl-8"
          >

            {/* Card 1 â€” Question bubble */}
            <motion.div
              variants={floatUp}
              animate="animate"
              whileHover={{ y: -4, boxShadow: '0 20px 50px rgba(0,0,0,0.12)' }}
              className="w-full max-w-[340px] self-start rounded-2xl rounded-tl-sm border border-white/80 bg-white px-5 py-4 shadow-lg"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Query</p>
              <p className="text-sm font-medium text-slate-700 leading-relaxed">
                "What makes you stand out as an Engineer?"
              </p>
            </motion.div>

            {/* Card 2 â€” Answer bubble (accent) */}
            <motion.div
              variants={floatDown}
              animate="animate"
              whileHover={{ y: -4, boxShadow: '0 20px 50px rgba(0,0,0,0.12)' }}
              className="w-full max-w-[340px] self-end rounded-2xl rounded-tr-sm border border-orange-100 bg-white px-5 py-4 shadow-lg"
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: '#ff6a00' }}>Response</p>
              <p className="text-sm leading-relaxed text-slate-600">
                I ship{' '}
                <span className="font-bold" style={{ color: '#ff6a00' }}>production-ready apps fast</span>
                {' '} clean code, smart architecture,{' '}
                <span className="font-bold" style={{ color: '#ff6a00' }}>real results</span>
                . Every line is written with purpose.
              </p>
            </motion.div>

            {/* Card 3 â€” Second question */}
            <motion.div
              variants={floatUp}
              animate="animate"
              whileHover={{ y: -4, boxShadow: '0 20px 50px rgba(0,0,0,0.12)' }}
              className="w-full max-w-[320px] self-start rounded-2xl rounded-tl-sm border border-white/80 bg-white px-5 py-4 shadow-lg"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Query</p>
              <p className="text-sm font-medium text-slate-700 leading-relaxed">
                "Can you handle the full stack ” from UI to deployment?"
              </p>
            </motion.div>

            {/* Card 4 ” Short punchy reply */}
            <motion.div
              variants={floatMid}
              animate="animate"
              whileHover={{ y: -4, boxShadow: '0 20px 50px rgba(0,0,0,0.12)' }}
              className="self-end rounded-2xl rounded-tr-sm border border-orange-100 bg-white px-5 py-4 shadow-lg"
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: '#ff6a00' }}>Response</p>
              <p className="text-sm leading-relaxed text-slate-600">
                <span className="font-bold" style={{ color: '#ff6a00' }}>React Django Cloud.</span>
                {' '}End-to-end. Always.
              </p>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Hero
