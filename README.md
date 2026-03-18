# Personal Portfolio (React + Vite)

Production-ready personal portfolio website built with React, Vite, Tailwind CSS, React Router, and Framer Motion.

## Tech Stack

- React 19 (compatible with React 18+ requirement)
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- gh-pages (deployment)

## Project Structure

```text
src/
 ├── assets/
 ├── components/
 │     ├── Navbar.jsx
 │     ├── Hero.jsx
 │     ├── About.jsx
 │     ├── Skills.jsx
 │     ├── Projects.jsx
 │     ├── Experience.jsx
 │     ├── Contact.jsx
 │     ├── Footer.jsx
 ├── pages/
 │     ├── Home.jsx
 │     ├── NotFound.jsx
 ├── data/
 │     ├── projects.js
 │     ├── skills.js
 ├── hooks/
 │     ├── useDarkMode.js
 ├── App.jsx
 ├── main.jsx
```

## Features Included

- Fully responsive mobile-first layout
- Professional modern UI using Tailwind utility classes only
- Framer Motion animations (fade-in, stagger, hover scaling, page transitions)
- Dark/Light mode with `localStorage` persistence via custom hook
- Smooth scrolling
- SEO-focused metadata and semantic HTML
- Sections: Hero, About, Skills, Projects, Experience, Blog (with detail popup), Certifications, Contact, Footer
- Contact form validation and console submission logging
- GitHub Pages deployment support

## Step-by-Step Setup

1. Create Vite project (if starting from scratch):
   - `npm create vite@latest portfolio -- --template react`
2. Enter project folder:
   - `cd portfolio`
3. Install dependencies:
   - `npm install`
4. Start development server:
   - `npm run dev`
5. Open browser at:
   - `http://localhost:5173`

## Tailwind Configuration

- `tailwind.config.js` uses:
  - `darkMode: 'class'`
  - content paths for `index.html` and `src/**/*`
- `postcss.config.js` includes Tailwind and Autoprefixer
- `src/index.css` includes:
  - `@tailwind base;`
  - `@tailwind components;`
  - `@tailwind utilities;`

## Dark Mode Logic

- Implemented in `src/hooks/useDarkMode.js`
- Reads stored theme from `localStorage`
- Falls back to system preference on first load
- Applies the `dark` class to `<html>`
- Toggle exposed to navbar button

## Deployment (GitHub Pages)

### 1) Update repository values

- In `vite.config.js`, set:
  - `const repoName = 'portfolio'`
  - Replace `'portfolio'` if your repository name differs.
- In `package.json`, update:
  - `"homepage": "https://your-username.github.io/portfolio"`
  - Replace `your-username` and repo path.

### 2) Push code to GitHub

- Ensure your repository exists and code is pushed.

### 3) Deploy

- Run:
  - `npm run deploy`

### 4) Configure GitHub Pages

- In repository settings, set Pages source to the `gh-pages` branch.
- Wait for deployment and open your site URL.

## Notes

- Resume button downloads `public/resume.txt` placeholder. Replace with your actual resume file.
- Update social links, project links, contact details, and personal branding before going live.
