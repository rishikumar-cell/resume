// Dynamic data for Home page (hero, about, stats, etc)
export const initialHomeData = {
  hero: {
    name: 'Venu Kumar Chittimalla',
    title: 'Full Stack Developer',
    subtitle: 'Building modern web apps, AI agents, and scalable backend systems.',
    cta: 'Contact Me',
    ctaTarget: 'contact',
    bg: '#f5f0e9',
    dotMesh: true,
    meshColor: '#b8a898',
  },
  about: {
    summary: `I am a passionate full stack developer with a focus on building robust, scalable, and user-friendly web applications. I love working with React, Node.js, Django, and modern cloud tools. My journey includes internships, hackathons, and building products from scratch.`,
    stats: [
      { value: '3+', label: 'Projects Done' },
      { value: '2', label: 'Internships Done' },
      { value: '1+', label: 'Years Experience' },
    ],
  },
  // Skills and projects are loaded from their own files for now
  experience: [
    {
      id: 1,
      role: 'Software Developer Intern',
      company: 'Infinexol Solutions PVT LTD',
      period: '2026 Feb – Present',
      description: 'Working on scalable enterprise systems, building modern React interfaces and robust backend integrations.',
      tags: ['React', 'Tailwind', 'Framer Motion'],
      side: 'left',
    },
    {
      id: 2,
      role: 'Full Stack Developer Intern',
      company: 'Ceeras IT Services PVT LTD',
      period: '2025 Feb – June',
      description: 'Developed REST APIs and implemented JWT authentication for secure, production-grade systems.',
      tags: ['MongoDB', 'Express', 'React', 'Node'],
      side: 'right',
    },
    {
      id: 3,
      role: 'SUS Hacks Hackathon',
      company: 'Vignan College, Vizag',
      period: '2024 Sep',
      description: 'Designed scalable APIs and optimized backend performance under tight hackathon deadlines.',
      tags: ['React', 'Django','PostgreSQL'],
      side: 'left',
    },
  ],
}
