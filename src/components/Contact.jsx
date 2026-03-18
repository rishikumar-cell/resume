import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from 'emailjs-com'

// ── EmailJS config ── replace with your own values from emailjs.com
const EMAILJS_SERVICE_ID  = 'service_wy351da'
const EMAILJS_TEMPLATE_ID = 'template_pwb3uis'
const EMAILJS_PUBLIC_KEY  = 'QhBNFGhJ084TkULNT'

const initialFormData = { name: '', email: '', message: '' }

const leftVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const rightVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.15 } },
}

const headerVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const contactInfo = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email',
    value: 'rishikumar54020@gmail.com',
    href: 'rishikumar54020@gmail.com',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.654 1.652.243 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.216.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    label: 'GitHub',
    value: 'github.com/rishikumar-cell',
    href: 'https://github.com',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: 'LinkedIn',
    value: 'https://www.linkedin.com/in/chvenukumar',
    href: 'https://linkedin.com',
  },
]

function Contact() {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [sendError, setSendError] = useState('')

  const validateForm = () => {
    const validationErrors = {}
    if (!formData.name.trim()) validationErrors.name = 'Name is required.'
    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required.'
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      validationErrors.email = 'Enter a valid email address.'
    }
    if (!formData.message.trim()) {
      validationErrors.message = 'Message is required.'
    } else if (formData.message.trim().length < 15) {
      validationErrors.message = 'Message should be at least 15 characters.'
    }
    return validationErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setIsSending(true)
    setSendError('')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY,
      )
      setIsSubmitted(true)
      setFormData(initialFormData)
    } catch (err) {
      setSendError('Failed to send message. Please try again or email me directly.')
    } finally {
      setIsSending(false)
    }
  }

  const inputBase =
    'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#ff6a00] focus:ring-2 focus:ring-[#ff6a00]/20 placeholder:text-gray-400'

  return (
    <section
      id="contact"
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
            Contact
          </span>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Let&apos;s Work Together
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-600">
            Have a project in mind? or Want to Hire me!?. Let&apos;s connect and build something impactful.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">

          {/* Left — info */}
          <motion.div
            variants={leftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col gap-6"
          >
            {/* CTA card */}
            <div className="relative overflow-hidden rounded-3xl bg-[#111] p-8 shadow-2xl">
              <span className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[#ff6a00] opacity-20 blur-3xl" />
              <h3 className="relative text-2xl font-bold text-white">
                Lets Connect <span style={{ color: '#ff6a00' }}>Together</span>
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-gray-400">
                I&apos;m available for freelance work, full-time roles, and open-source collaborations.
                Let&apos;s discuss how I can help.
              </p>
              <div className="relative mt-6 flex flex-col gap-4">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-sm text-gray-300 transition hover:text-white"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#ff6a00]">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-xs text-gray-500">{item.label}</p>
                      <p className="font-medium text-gray-200">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="h-3 w-3 shrink-0 rounded-full bg-emerald-500"
              />
              <span className="text-sm font-medium text-slate-700">
                Available for new projects &amp; opportunities
              </span>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            variants={rightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-4 py-12 text-center"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-3xl">
                  ✅
                </span>
                <h3 className="text-xl font-semibold text-slate-900">Message Sent!</h3>
                <p className="text-sm text-gray-500">Thanks for reaching out. I&apos;ll get back to you shortly.</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2 rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Alex Johnson"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputBase}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputBase}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Tell me about your project or idea..."
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputBase} resize-none`}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1.5 text-xs text-red-500">{errors.message}</p>
                  )}
                </div>

                {sendError && (
                  <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{sendError}</p>
                )}

                <motion.button
                  whileHover={{ scale: isSending ? 1 : 1.03 }}
                  whileTap={{ scale: isSending ? 1 : 0.97 }}
                  type="submit"
                  disabled={isSending}
                  className="mt-1 flex items-center justify-center gap-3 rounded-full bg-black px-6 py-4 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Contact
