import { motion } from 'framer-motion'
import skills from '../data/skills'

const categories = [
  { key: 'frontend', label: 'Frontend', icon: '⚡', accent: '#ff6a00' },
  { key: 'backend', label: 'Backend', icon: '🔧', accent: '#3b82f6' },
  { key: 'tools', label: 'Tools & DevOps', icon: '🛠', accent: '#10b981' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const chipVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: 'easeOut' } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const headerVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

function CategoryCard({ label, icon, accent, skillList }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="relative overflow-hidden rounded-3xl bg-[#111] p-6 shadow-2xl"
    >
      {/* Glow blob */}
      <span
        className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full opacity-20 blur-3xl"
        style={{ background: accent }}
      />

      {/* Header */}
      <div className="relative flex items-center gap-3 mb-7">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-xl text-lg"
          style={{ background: `${accent}22`, border: `1px solid ${accent}55` }}
        >
          {icon}
        </span>
        <h3 className="text-lg font-semibold text-white">{label}</h3>
      </div>

      {/* Chips */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative flex flex-wrap gap-2.5"
      >
        {skillList.map((skill) => (
          <motion.span
            key={skill.name}
            variants={chipVariants}
            whileHover={{
              backgroundColor: `${accent}22`,
              borderColor: `${accent}88`,
              color: '#fff',
              transition: { duration: 0.15 },
            }}
            className="cursor-default rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition-colors duration-150"
          >
            {skill.name}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  )
}

function Skills() {
  return (
    <section
      id="skills"
      className="bg-[#fafafa] py-20"
      style={{
        backgroundImage:
          'linear-gradient(#00000008 1px, transparent 1px), linear-gradient(90deg, #00000008 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    >
      <div className="mx-auto max-w-5xl px-8">

        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col items-center text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1 text-sm text-gray-700">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff6a00]" />
            Skills
          </span>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            My Tech Stack
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-600">
            Core technologies I use to architect, build, and ship production-grade applications.
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.13 } } }}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {categories.map((cat) => (
            <CategoryCard
              key={cat.key}
              label={cat.label}
              icon={cat.icon}
              accent={cat.accent}
              skillList={skills[cat.key]}
            />
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default Skills
