import { motion, useMotionValue, useTransform } from 'framer-motion'

const stats = [
  { value: '3+', label: 'Projects Done' },
  { value: '2', label: 'Internships Done' },
  { value: '1+',  label: 'Years Experience' },
]

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } },
}

/* kept for compat */
const leftVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const rightVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.15 } },
}

const statsContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
}

const statItemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

function Stat({ value, label }) {
  return (
    <motion.div
      variants={statItemVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="flex flex-col"
    >
      <span className="text-4xl font-bold text-orange-500">{value}</span>
      <span className="mt-1 text-sm text-gray-500">{label}</span>
    </motion.div>
  )
}

function About({ about }) {
  if (!about) return <div className="text-red-500 p-8">About data missing</div>
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#fafafa] py-20"
      style={{
        backgroundImage:
          'linear-gradient(#00000008 1px, transparent 1px), linear-gradient(90deg, #00000008 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    >
      <div className="mx-auto max-w-5xl px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">

          {/* ── LEFT COLUMN ── */}
          <motion.div
            variants={leftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1 text-sm text-gray-700">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff6a00]" />
              About
            </span>

            {/* Heading */}
            <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">
              I'm Chittimalla Venu Kumar.{' '}
              <span style={{ color: '#ff6a00' }}>Software Engineer</span>
            </h2>

            {/* Description */}
            <p className="mt-5 text-base leading-relaxed text-gray-600">
              {about?.summary || 'I specialize in building scalable backend systems, modern web applications, and high-performance full-stack platforms.'}
            </p>

            {/* CTA */}
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white shadow-md"
            >
              Download Resume
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 3v13m0 0l-4-4m4 4l4-4" />
                </svg>
              </span>
            </motion.a>
          </motion.div>

          {/* ── RIGHT COLUMN ── */}
          <motion.div
            variants={rightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="flex flex-col gap-6"
          >
            {/* Stats box */}
            <motion.div
              variants={statsContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              className="grid grid-cols-3 gap-6 rounded-3xl border border-gray-100 bg-white px-8 py-8 shadow-lg"
            >
              {(about?.stats || stats).map((stat) => (
                <Stat key={stat.label} {...stat} />
              ))}
            </motion.div>

            {/* Info cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-xl">
                  🎓
                </div>
                <h3 className="text-sm font-semibold text-slate-900">Education</h3>
                <p className="mt-1 text-sm font-medium text-slate-700">B.Tech in Electrical and Electronics</p>
                <p className="mt-0.5 text-xs text-gray-500">Anil Neerukonda Institute of Technology and Sciences · 2022–2026</p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-xl">
                  🎯
                </div>
                <h3 className="text-sm font-semibold text-slate-900">Focus Areas</h3>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">
                  Backend architecture · API design · Performance optimization · Machine Learning · Cloud infrastructure
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default About
