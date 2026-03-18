import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change this value if your GitHub repository name is different.
const repoName = 'portfolio'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? `/${repoName}/` : '/',
}))
