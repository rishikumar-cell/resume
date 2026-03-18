import { motion } from 'framer-motion'
function TimelineCard({ exp, index }) {
  const isLeft = exp.side === 'left'
  return (
    <div className={`relative flex w-full items-start gap-0 md:items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.1 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="w-full md:w-[calc(50%-2.5rem)] rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_4px_28px_rgba(0,0,0,0.07)]"
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold text-slate-900">{exp.role}</h3>
            <p className="mt-0.5 text-sm font-medium text-[#ff6a00]">{exp.company}</p>
          </div>
          <span className="shrink-0 rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-orange-400">
            {exp.period}
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-gray-500">{exp.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {exp.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
      {/* Center dot + connector (desktop) */}
      <div className="hidden md:flex md:w-20 md:shrink-0 md:flex-col md:items-center">
        {/* Horizontal connector line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.25 }}
          className={`h-px w-full origin-center bg-gradient-to-r ${isLeft ? 'from-transparent to-[#ff6a00]' : 'from-[#ff6a00] to-transparent'}`}
          style={{ transformOrigin: isLeft ? 'right' : 'left' }}
        />
      </div>
      {/* Mobile left line + dot */}
      <div className="absolute -left-px top-0 flex md:hidden h-full flex-col items-center">
        <div className="h-full w-px bg-gradient-to-b from-[#ff6a00]/60 to-transparent" />
      </div>
    </div>
  )
}

function Experience({ experience }) {
  const experiences = Array.isArray(experience) ? experience : []
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[#fafafa] py-20"
      style={{
        backgroundImage:
          'linear-gradient(#00000008 1px, transparent 1px), linear-gradient(90deg, #00000008 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    >
      <div className="mx-auto max-w-5xl px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1 text-sm text-gray-700">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff6a00]" />
            Experience
          </span>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            My Professional Journey
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-600">
            A timeline of my growth as a software engineer.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-16">

          {/* Central vertical line (desktop) */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="pointer-events-none absolute left-1/2 top-0 bottom-0 hidden -translate-x-1/2 md:block"
            style={{ originY: 0 }}
          >
            {/* Solid gradient line */}
            <div className="mx-auto h-full w-[3px] rounded-full bg-gradient-to-b from-[#ff6a00] via-orange-300 to-orange-100" />
          </motion.div>

          {/* Cards */}
          <div className="relative flex flex-col gap-12 pl-6 md:pl-0">
            {/* Mobile vertical line */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#ff6a00]/70 via-orange-300/50 to-transparent md:hidden" />

            {experiences.map((exp, i) => (
              <div key={exp.id} className="relative md:contents">
                <TimelineCard exp={exp} index={i} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default Experience