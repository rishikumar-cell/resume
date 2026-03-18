/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#6366f1',
          600: '#4f46e5',
        },
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgb(15 23 42 / 0.25)',
      },
    },
  },
  plugins: [],
}
