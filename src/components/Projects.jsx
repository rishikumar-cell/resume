import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import projects from '../data/projects'



const blogs = [
  {
    id: 1,
    title: 'How AI Transforms Business',
    excerpt: 'Artificial Intelligence (AI) is no longer an experimental technology reserved for research labs.',
    content:'It has become a core driver of modern business transformation. Organizations across industries are using AI to automate processes, improve decision-making, enhance customer experiences, and create entirely new business models. Companies that effectively adopt AI gain significant advantages in efficiency, speed, and competitiveness.',
    
    date: 'Jan 2026',
  },

]

// ─── variants ────────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: 'easeOut' } },
}

const headerVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// ─── sub-components ──────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const step = String(index + 1).padStart(2, '0')
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="relative flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
    >
      {/* Project image */}
      <div className="relative h-44 w-full shrink-0 overflow-hidden bg-gray-100">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          onError={e => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.nextElementSibling.style.display = 'flex'
          }}
        />
        {/* Fallback placeholder */}
        <div
          className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-slate-100 to-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        {/* Step badge */}
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-gray-500 shadow-sm backdrop-blur-sm">
          {step}
        </span>
      </div>

      <div className="flex flex-col p-6">

      <h3 className="mt-2 text-xl font-semibold text-slate-900">{project.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">{project.description}</p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <li
            key={tech}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex gap-5 text-sm font-semibold">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-slate-800 transition hover:text-[#ff6a00]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.654 1.652.243 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.216.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </a>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-slate-800 transition hover:text-[#ff6a00]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Live Demo
        </a>
      </div>
      </div>
    </motion.article>
  )
}

// ─── main component ───────────────────────────────────────────────────────────
function Projects() {
  const [activeBlog, setActiveBlog] = useState(null)

  return (
    <>
      {/* ── Projects ── */}
      <section
        id="projects"
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
              Projects
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              What I&apos;ve Built?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-600">
              A quick overview of selected projects that demonstrate clean engineering, product
              thinking, and strong execution.
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Blog ── */}
      <section id="blog" className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1 text-sm text-gray-700">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff6a00]" />
              Blog
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Notes & Insights
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-600">
              Notes on frontend architecture, performance, and engineering craftsmanship.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-12 grid gap-6 sm:grid-cols-3"
          >
            {blogs.map((blog) => (
              <motion.article
                key={blog.id}
                variants={cardVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[#ff6a00]">
                  {blog.date}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{blog.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{blog.excerpt}</p>
                <button
                  type="button"
                  onClick={() => setActiveBlog(blog)}
                  className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-slate-800 transition hover:text-[#ff6a00]"
                >
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Blog modal ── */}
      <AnimatePresence>
        {activeBlog && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveBlog(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="blog-modal-title"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-8 shadow-xl"
            >
              <h3 id="blog-modal-title" className="text-xl font-semibold text-slate-900">
                {activeBlog.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{activeBlog.content}</p>
              <button
                type="button"
                onClick={() => setActiveBlog(null)}
                className="mt-6 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Projects
